---
slug: postgresql-database-bloat
title: "How to monitor and fix Database bloats in PostgreSQL?"
description: "How to troubleshoot database bloats and fix them on PostgreSQL?"
image: https://user-images.githubusercontent.com/96257330/198544117-4672f54e-0f72-43f7-b295-cd71a2a5a830.png
tags: [how-to,infrastructure-monitoring,monitoring,postgresql,bloat]
keywords: [how-to,infrastructure-monitoring,monitoring,postgresql,database,bloat]
authors: satya
---

Database bloat is disk space that was used by a table or index and is available for reuse by the database but has not been reclaimed. Bloat is created when deleting or updating tables and indexes. Here's how to deal with it!

<!--truncate-->

## What is Database bloat?

Database bloat is disk space that was used by a table or index and is available for reuse by the database but has not been reclaimed. Bloat is created when deleting or updating tables and indexes.

Because Database heap tables use the PostgreSQL Multiversion Concurrency Control (MVCC) storage implementation, a deleted or updated row is logically deleted from the database, but a non-visible image of the row remains in the table. These deleted rows, also called expired rows, are tracked in a free space map. Running VACUUM marks the expired rows as free space that is available for reuse by subsequent inserts.

It is normal for tables that have frequent updates to have a small or moderate amount of expired rows and free space that will be reused as new data is added. But when the table is allowed to grow so large that active data occupies just a small fraction of the space, the table has become significantly bloated. Bloated tables require more disk storage and additional I/O that can slow down query execution.

Database bloat occurs in heap tables, append-optimized tables, indexes, and system catalogs and affects database performance and disk usage. You can detect database bloat and remove it from the database.


## Detecting Bloat

The statistics collected by the ANALYZE statement can be used to calculate the expected number of disk pages required to store a table. The difference between the expected number of pages and the actual number of pages is a measure of bloat. The PostgreSQL contrib package provides a package called pgstattuple to diagnose table bloat. :

```bash
postgres=# CREATE EXTENSION pgstattuple; 
CREATE EXTENSION
```

You can use a query like the one below to show the dead tuples (or table bloat) for every single table / index in your Database.

```bash
postgres=# SELECT relname, pgstattuple(oid) FROM pg_class WHERE relkind = 'r';
```

With the right sorting applied to the query, you can narrow down the top tables / indexes that are experiencing a bloat.

```
-[ RECORD 1 ]------+-------------

relname | pg_statistic
table_len | 147456
tuple_count | 387
tuple_len | 115800
tuple_percent | 78.53
dead_tuple_count | 27
dead_tuple_len | 8161
dead_tuple_percent | 5.53
free_space | 19840
free_percent | 13.45
 
-[ RECORD 2 ]------+-------------
 
relname | pg_type
table_len | 73728
tuple_count | 357
tuple_len | 61965
tuple_percent | 84.05
dead_tuple_count | 20
dead_tuple_len | 3440
dead_tuple_percent | 4.67
free_space | 4828
free_percent | 6.55
 
-[ RECORD 3 ]------+-------------
 
relname | pg_authid
table_len | 8192
tuple_count | 3
tuple_len | 324
tuple_percent | 3.96
dead_tuple_count | 0
dead_tuple_len | 0
dead_tuple_percent | 0
free_space | 7816
free_percent | 95.41
```
 
The results include only tables with moderate or significant bloat. Moderate bloat is reported when the ratio of actual to expected pages is greater than four and less than ten. Significant bloat is reported when the ratio is greater than ten.
The gp_toolkit.gp_bloat_expected_pages view lists the actual number of used pages and expected number of used pages for each database object.

```bash
gpadmin=# SELECT * FROM gp_toolkit.gp_bloat_expected_pages LIMIT 5;
 btdrelid | btdrelpages | btdexppages 
----------+-------------+-------------
    10789 |           1 |           1
    10794 |           1 |           1
    10799 |           1 |           1
     5004 |           1 |           1
     7175 |           1 |           1
(5 rows)
```

The btdrelid is the object ID of the table. The btdrelpages column reports the number of pages the table uses; the btdexppages column is the number of pages expected. Again, the numbers reported are based on the table statistics, so be sure to run ANALYZE on tables that have changed.

![image1](https://user-images.githubusercontent.com/96257330/198570109-7b2928c0-0756-49b5-83f2-75d5528e8fa4.png)

## Removing Bloat from Database Tables

The VACUUM command adds expired rows to the free space map so that the space can be reused. When VACUUM is run regularly on a table that is frequently updated, the space occupied by the expired rows can be promptly reused, preventing the table file from growing larger. It is also important to run VACUUM before the free space map is filled. For heavily updated tables, you may need to run VACUUM at least once a day to prevent the table from becoming bloated.

When a table accumulates significant bloat, running the VACUUM command is insufficient. For small tables, running VACUUM FULL <table_name> can reclaim space used by rows that overflowed the free space map and reduce the size of the table file. However, a VACUUM FULL statement is an expensive operation that requires an ACCESS EXCLUSIVE lock and may take an exceptionally long and unpredictable amount of time to finish for large tables. You should run VACUUM FULL on tables during a time when users and applications do not require access to the tables being vacuumed, such as during a time of low activity, or during a maintenance window.

**Warning**: When a table is significantly bloated, it is better to run VACUUM before running ANALYZE. Analyzing a severely bloated table can generate poor statistics if the sample contains empty pages, so it is good practice to vacuum a bloated table before analyzing it.

### Removing Bloat from Indexes

The VACUUM command only recovers space from tables. To recover the space from indexes, recreate them using the REINDEX command.

To rebuild all indexes on a table run REINDEX table_name;. To rebuild a particular index, run REINDEX index_name;. REINDEX sets the reltuples and relpages to 0 (zero) for the index, To update those statistics, run ANALYZE on the table after reindexing.

### Removing Bloat from System Catalogs

Database system catalog tables are heap tables and can become bloated over time. As database objects are created, altered, or dropped, expired rows are left in the system catalogs. 

Bloat in the system catalogs increases the time required to scan the tables, for example, when creating explain plans. System catalogs are scanned frequently and if they become bloated, overall system performance is degraded.

It is recommended to run VACUUM on system catalog tables nightly and at least weekly. At the same time, running REINDEX SYSTEM removes bloat from the indexes. Alternatively, you can reindex system tables using the reindexdb utility with the -s (--system) option. After removing catalog bloat, run ANALYZE to update catalog table statistics.

These are Database system catalog maintenance steps:

1. Perform a REINDEX on the system catalog tables to rebuild the system catalog indexes. This removes bloat in the indexes and improves VACUUM performance.
**Note**: When performing REINDEX on the system catalog tables, locking will occur on the tables and might have an impact on currently running queries. You can schedule the REINDEX operation during a period of low activity to avoid disrupting ongoing business operations.
2. Perform a VACUUM on system catalog tables. If you need intensive system catalog maintenance, stop all catalog activity before step 1 and replace the VACUUM with the VACUUM FULL command.
3. Perform an ANALYZE on the system catalog tables to update the table statistics.
4. If the system catalogs become significantly bloated, you must run VACUUM FULL during a scheduled downtime period. During this period, stop all catalog activity on the system; VACUUM FULL takes ACCESS EXCLUSIVE locks against the system catalog. Running VACUUM regularly on system catalog tables can prevent the need for this more costly procedure.


**Note**: The system catalog table pg_attribute is usually the largest catalog table. If the pg_attribute table is significantly bloated, a VACUUM FULL operation on the table might require a significant amount of time and might need to be performed separately. The presence of both of these conditions indicate a significantly bloated pg_attribute table that might require a long VACUUM FULL time.

## Let us hear from you

If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=database-bloat)!

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/). 

Happy Troubleshooting!


 
