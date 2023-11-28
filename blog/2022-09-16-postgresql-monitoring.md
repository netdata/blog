---
slug: postgresql-monitoring
title: PostgreSQL Monitoring
authors: shyam
tags: [how-to, PostgreSQL,postgres,postgresql]
---

![Netdata's PostgreSQL guide offers setup, continuous metric collection, and tools for efficient database monitoring and advanced troubleshooting. Learn more!](https://wiki.postgresql.org/images/9/9a/PostgreSQL_logo.3colors.540x557.png)

<!--truncate-->

## What's PostgreSQL and why monitor it?

PostgreSQL is a popular open source object-relational database system designed to work for a wide range of workloads from single machines to data warehouses to web services with many concurrent users. PostgreSQL runs on all major operating systems and is used by teams and organizations across the world, including Netdata. 

If you are using PostgreSQL in production, it is crucial that you monitor it for potential issues. And the more comprehensive the monitoring the better! 

PostgreSQL, just like any other service, impacts the resources of the host upon which it is installed. This means that host metrics such as CPU, Memory, Disk Space and Network influence and are influenced by PostgreSQL performance. These basic host metrics are often treated as a first step before the user embarks on a deeper troubleshooting journey into more advanced database specific metrics.

PostgreSQL automatically aggregates many of the key metrics internally so you just need to query predefined statistics views – such as <i>pg_stat_database</i>, <i>pg_stat_user_tables</i>, <i>pg_stat_bgwriter </i>and others – to understand what’s going on with your databases. However, there are a host of other important metrics that need to be explicitly collected. 

Comprehensive monitoring also means you also need to collect these metrics continuously, not just as a one off check. Database issues could occur at any time, and it is important that enough monitoring data is available for early detection and understanding what is triggering the issue and how best to resolve it. 

Netdata is a fundamentally faster, easier way to monitor your infrastructure and anything that’s part of it. Including PostgreSQL! 

So let’s first walk through how to set up Netdata monitoring (spoiler: it’s really easy) and then dive deeper into the world of PostgreSQL metrics – what they are, why they matter, and what to do with them. Or feel free to use the links below to jump to the section you need!

## How to collect PostgreSQL metrics with Netdata

For the purpose of this guide, we will presume that you already have a working PostgreSQL cluster. The following prerequisites should be met in order for Netdata to monitor your PostgreSQL cluster:
<ul>
 	<li>PostgreSQL v9.4+</li>
 	<li>User with granted pg_monitor or pg_read_all_stat <a href="https://www.postgresql.org/docs/current/predefined-roles.html">built-in role</a>.</li>
 	<li>If you would like to monitor all replication and WAL metrics super user privileges to postgres is required.</li>
</ul>
If these requirements are met, installing Netdata is as easy as it gets; just <a href="https://learn.netdata.cloud/docs/cloud/get-started">follow these steps</a> to sign up for a free Netdata account and install the open source agent.

Netdata automatically discovers the PostgreSQL service and starts monitoring it with the default PostgreSQL user. You should now see a <b>PostgreSQL</b> section on the <b>Overview</b> tab that’s already populated with charts about all the metrics you care about!

And as long as you are using the default Postgres user, that’s it! 

If you’d like to configure a different user or modify any other configuration, the PostgreSQL collector <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/postgres#configuration">reference documentation</a> has got you covered.

## PostgreSQL monitoring with Netdata

The metrics that Netdata collects are organized into subsections within the PostgreSQL section for easier navigation. Each metric is represented by a composite chart that aggregates the data across multiple nodes/databases/tables/etc. 

Netdata collects 100+ PostgreSQL metrics and visualizes these across 60+ different composite charts. See the <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/postgres">reference documentation </a>for the full list of metrics.

Clicking on the <b>PostgreSQL </b>section takes you to the summary dashboard which gives you a quick overview of your database cluster. Scrolling down further allows you to explore PostgreSQL metrics to your heart's content - you can also click on a particular section to get to where you want quicker. 

<img class="size-medium wp-image-17541" src="/img/wp-archive/uploads/2022/09/image-10-600x97.png" alt="Netdata PostgreSQL summary" width="600" height="97" />

Each composite chart (see the example below) can be grouped by dimension, database, schema, table, or other group-by options. You can also filter the chart by a particular condition (a database or a table, for example). You also have the option to change the default aggregation and interpolation methods, change the chart type, add the chart to a custom dashboard or view it in full screen. 

<img class="alignnone size-medium wp-image-17543" src="/img/wp-archive/uploads/2022/09/image4-600x154.png" alt="Composite chart" width="600" height="154" />

## Connections
A connection is an established line of communication between a client and the PostgreSQL server. Each connection adds to the load on the PostgreSQL server.

Observing the number of connections to your database over time and connections currently in use, can help you optimize your application's system architecture and determine the right settings to maximize your throughput while limiting overhead.

### Total Connection utilization

To guard against running out of memory or overloading the database the max_connections parameter (default = 100) defines the maximum number of concurrent connections to the database server. A separate parameter, superuser_reserved_connections (default = 3), defines the quota for superuser connections (so that superusers can connect even if all other connection slots are blocked).

Total connection utilization across all databases is measured as a percentage of (max_connections - superuser_reserved_connections). If the utilization is 100%, then no more new connections will be accepted (superuser connections will still be accepted if superuser quota is available).

<img class="alignnone size-medium wp-image-17575" src="/img/wp-archive/uploads/2022/09/connutil-600x163.png" alt="PostgreSQL connection utilization" width="600" height="163" />

### Total Connection usage

Connections usage across all databases. The maximum number of concurrent connections to the database server is (max_connections - superuser_reserved_connections). As a general rule, if you need more than 200 connections it is advisable to use connection pooling.
<ul>
 	<li><b>Available:</b> indicates new connections allowed. </li>
 	<li><b>Used:</b> indicates connections currently in use.</li>
</ul>

### Connection state

Connection count visualized per current state of the connection. The state of a connection can be idle, active, disabled, idle in transaction, idle in transaction (aborted) and fastpath function call. 

This information helps you better manage your connection count. The state of a connection can be: 
<ul>
 	<li><b>active</b>: backend is executing a query</li>
 	<li><b>idle</b>: backend is not currently in use and is waiting for a new client command</li>
 	<li><b>idle in transaction</b>: backend is in a transaction, but is currently waiting and not executing a query </li>
 	<li><b>idle in transaction (aborted)</b>: Similar to idle in the transaction but has since been aborted due to one of the statements in the transaction causing an error </li>
 	<li><b>fastpath function call</b>: backend is executing a fast-path function</li>
 	<li><b>disabled</b>: This state is reported if track_activities is disabled in this backend.</li>
</ul>

If you see a high count of idle connections it is worth exploring a connection pooling solution such as PgBouncer. If you find that you have some stale transactions hanging around for days, hours, or even just a few minutes, you may want to set a default to end those transactions. To help with this, Postgres has a nice feature of a statement_timeout.

<img class="alignnone size-medium wp-image-17559" src="/img/wp-archive/uploads/2022/09/connstate-600x161.png" alt="PostgreSQL connection state" width="600" height="161" />

### Connection utilization per database

Connection utilization per database. Utilization is measured as a percentage of CONNECTION   LIMIT per database (if set) or max_connections (if CONNECTION LIMIT is not set).

### Connection usage per database

Represents the current number of connections per database.

## Transactions

### Observed transaction time

This is an histogram representing the transaction duration. The bins are specified as consecutive, non-overlapping intervals. The value is the number of observed transactions that fall into each interval.

### Percentage of committed/rollback transactions.

Commit ratio is the ratio between committed transactions (xact_commit) and rolled back transactions (xact_rollback). It indicates the amount of successful operations. Changes made by transactions may be aborted (rollback) or committed. Single queries that have failed outside the transactions are also accounted as rollbacks. So, in general, using the commit ratio we can estimate the amount of errors in a particular database. 

Values closer to 100 mean that your database is healthy and has very few errors. If the commit ratio is below 90, it is a good idea to investigate further by enabling additional logs and analyzing them to build a list of the most common errors. 

### Transactions per second

The actual count of transactions per second, per database. 
<ul>
 	<li><b>Committed:</b> Number of committed transactions/s. </li>
 	<li><b>Rollback:</b> Number of rolled back transactions/s. </li>
</ul>

## Queries

### Observed active query running time 

This is an histogram representing the active query execution time. The bins are specified as consecutive, non-overlapping intervals. The value is the number of observed active queries that fall into each interval.

Use this chart to identify if you have a slow query problem - if you consistently see values in the bins representing longer duration it is worth enabling slow query logging to investigate further. 

<img class="alignnone size-medium wp-image-17567" src="/img/wp-archive/uploads/2022/09/queries-600x161.png" alt="Query duration histogram" width="600" height="161" />

## Throughput

### Rows fetched ratio (Rows fetched vs Rows returned)

The rows fetched ratio is the percentage of rows that contain data needed to execute the query (rows fetched), out of the total number of rows scanned (rows returned). A high value indicates that the database is executing queries efficiently, while a low value indicates that the database is performing extra work by scanning a large number of rows that aren't required to process the query.

If this value is consistently and significantly low then it is likely to be due to missing indexes or inefficient queries. Consider creating indexes on frequently accessed columns to improve this ratio.  
<b></b>

<img class="alignnone size-medium wp-image-17571" src="/img/wp-archive/uploads/2022/09/fetchrowratio-600x162.png" alt="PostgreSQL Rows Fetched Ratio" width="600" height="162" />

### Rows read

Monitoring the blocks read from disk or found in cache helps you understand if a disk read was required or if the data was found in the buffer cache and a read was prevented.
<ul>
 	<li><b>Fetched</b>: Rows that contained data needed to execute the query</li>
 	<li><b>Returned</b>: Total rows that were were scanned </li>
</ul>

### Rows written

Monitoring the number of rows inserted, updated or deleted helps you understand how write-heavy your current workload is and allows you to tune your database to optimize your application’s performance. 
<ul>
 	<li><b>Inserted</b>: Rows inserted in to the database</li>
 	<li><b>Deleted</b>: Rows deleted from the database</li>
 	<li><b>Updated</b>:  Rows updated in the database</li>
</ul>

### Temp files created

Number of temporary files created by queries. Complex queries may require more memory than is available (specified by work_mem). When this happens, Postgres reverts to using temporary files that are actually stored on disk, but only exist for the duration of the request. After the request returns, the temporary files are deleted. Usage of temp files also typically indicates long-running queries, so these are queries that are likely to be slow to return anyway, and may cause slowdowns on your application.<b></b>

### Temp files data

Amount of data written to temporary files by queries. The best way to reduce temp files and their impacts is to increase your query efficiency and/or decrease your query complexity. You can do this by:
<ul>
 	<li>Making sure your schema is well-defined to reduce unnecessary joins</li>
 	<li>Using indexes appropriately</li>
 	<li>Only including the information you need in your SELECT statements</li>
</ul>

### Table throughput

Write queries throughput. If you see a large number of updated and deleted rows, keep an eye on the number of dead rows, as a high percentage of dead rows can slow down your queries.

### Table hot updates ratio

Percentage of HOT (Heap Only Tuple) updated rows. HOT updates are much more efficient than ordinary updates:  less write operations, less WAL writes, vacuum operation has less work to do, increased read efficiency (helps to limit table and index bloat).<b></b>

### Table hot updates

Number of HOT (Heap Only Tuple) updated rows.

### Table scans

Number of scans initiated on this table. If you see that your database regularly performs more sequential scans over time, you can improve its performance by creating an index on data that is frequently accessed.
<ul>
 	<li><b>Index</b>: relying on an index to point to the location of specific rows. </li>
 	<li><b>Sequential</b>: have to scan through each row of a table sequentially. Typically take longer than index scans.</li>
</ul>

### Table scan rows

Number of live rows fetched by scans.

## Cache Performance

### Database buffer cache miss ratio

PostgreSQL uses a shared buffer cache to store frequently accessed data in memory, and avoid slower disk reads. This metric represents the miss ratio (percentage of time PostgreSQL had to do disk reads vs memory buffer reads) and the closer to zero it is the better. 

If you are seeing performance issues, consider increasing the <a href="https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-SHARED-BUFFERS">shared_buffers</a> size or tuning <a href="https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-EFFECTIVE-CACHE-SIZE">effective_cache_size</a>.

<img class="alignnone size-medium wp-image-17577" src="/img/wp-archive/uploads/2022/09/cachemiss-600x161.png" alt="Buffer cache miss ratio" width="600" height="161" />

### Database reads

Amount of data read from shared buffer cache or from disk per database.
<ul>
 	<li><b>Disk</b>: data read from disk. </li>
 	<li><b>Memory</b>: data read from buffer cache (this only includes hits in the PostgreSQL buffer cache, not the operating system's file system cache).</li>
</ul>

### Table cache miss ratio

The cache miss ratio measured per table per database is useful to identify table inefficiency. Similar to database buffer cache miss ratio the lower the better. 

<img class="alignnone size-medium wp-image-17563" src="/img/wp-archive/uploads/2022/09/tablecachemiss-600x162.png" alt="Table cache miss ratio" width="600" height="162" />

### Table reads

Amount of data read from shared buffer cache or from disk per table.

### Index cache miss ratio

Represents what percentage of index reads are from cache (memory) vs disk. The lower the better.

### Index reads

Amount of data read during index reads from shared buffer cache or from disk.

## Size

### Database size

Actual on-disk usage of the database's data directory and any associated tablespaces.

### Table size

Actual on-disk size of table(s).

### Index size

Actual on-disk size of index(es).

## Bloat

### Table bloat size percentage 

PostgreSQL uses Multi-Version Concurrency Control (MVCC) in order to maintain ACID compliance and is characterized by the generation of dead-tuples. Over time, the accumulation of these dead rows increases both the table and index sizes, and is known as bloat. 

This chart represents the estimated percentage of bloat in the table. It is normal for tables that are updated frequently to have a small to moderate amount of bloat.

<img class="alignnone wp-image-17565 size-medium" src="/img/wp-archive/uploads/2022/09/tablebloat-600x162.png" alt="PostgreSQL table bloat" width="600" height="162" />

### Table bloat size

Disk space that was used by the table and is available for reuse by the database but has not been reclaimed. 

Bloat lowers performance by increasing the amount of table space. Recovering the space is normally managed by the AUTOVACUUM daemon or by tuning the autovacuum table storage parameters. Alternatively a more aggressive approach is to "repack" the bloated relations using pg_repack.

### Index bloat size percentage 

This chart represents the estimated percentage of bloat in table indexes. It is normal for tables that are updated frequently to have a small to moderate amount of bloat.

### Index bloat size

Disk space that was used by the index and is available for reuse by the database but has not been reclaimed. Bloat slows down your database and eats up more storage than needed. To recover the space from indexes, recreate them using the <a href="https://www.postgresql.org/docs/current/sql-reindex.html">REINDEX </a>command.

## Locks

### Deadlocks

Rate of deadlocks detected per second per database. When a transaction cannot acquire the requested lock within a certain amount of time (configured by deadlock_timeout) it triggers a deadlock. 

### Locks held

Locks held per database, categorized by type of lock being held. Some of these lock modes are acquired by PostgreSQL automatically before statement execution, while others are provided to be used by applications. All lock modes acquired in a transaction are held for the duration of the transaction. 
<img class="alignnone size-medium wp-image-17569" src="/img/wp-archive/uploads/2022/09/locksheld-600x162.png" alt="PostgreSQL Locks held" width="600" height="162" />

### Locks awaited

Locks awaited by database, categorized by type of lock being awaited.

It indicates that some transaction is currently waiting to acquire a lock, which implies that some other transaction is holding a conflicting lock mode on the same lockable object. 

## Vacuum & Analyze

PostgreSQL databases require periodic maintenance known as vacuuming. For many installations, it is sufficient to let vacuuming be performed by the autovacuum daemon. For more information see <a href="https://www.postgresql.org/docs/current/static/routine-vacuuming.html#AUTOVACUUM">The Autovacuum Daemon</a>.

### Autovacuum workers count

Count the vacuum and analyze workers by type.

### Time since last manual vacuum

Time elapsed since this table was last manually vacuumed (not counting VACUUM FULL).

### Time since last auto vacuum

Time elapsed since this table was last automatically vacuumed.

<img class="alignnone size-medium wp-image-17579" src="/img/wp-archive/uploads/2022/09/autovacuumsince-600x161.png" alt="Time since last autovacuum " width="600" height="161" />

### Time since last manual analyze

Time elapsed since this table was manually analyzed.

### Time since last auto analyze

Time elapsed this table was analyzed by the autovacuum daemon.

## Maintenance

### Checkpoints

Number of checkpoints that have been performed. Checkpoints are periodic maintenance operations the database performs to make sure that everything it's been caching in memory has been synchronized with the disk. Ideally checkpoints should be time-driven (scheduled) as opposed to load-driven (requested).
<ul>
 	<li><b>Scheduled</b>: checkpoints triggered as per schedule when time elapsed from the previous checkpoint is greater than <a href="https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-CHECKPOINT-TIMEOUT"><i>checkpoint_timeout</i></a>. </li>
 	<li><b>Requested</b>: checkpoints triggered due to WAL updates reaching the <a href="https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-MAX-WAL-SIZE"><i>max_wal_size</i></a> before the <i>checkpoint_timeout</i> is reached.</li>
</ul>

### Checkpoint time

Checkpoint timing information. An important indicator of how well checkpoint I/O is performing is the amount of time taken to sync files to disk.
<ul>
 	<li>Write: amount of time spent writing files to disk during checkpoint processing. </li>
 	<li>Sync: amount of time spent synchronizing files to disk during checkpoint processing.</li>
</ul>

### Background writer scan halts

The number of times the background writer stopped a cleaning scan because it had written too many buffers (exceeding the value of <a href="https://www.postgresql.org/docs/current/runtime-config-resource.html#RUNTIME-CONFIG-RESOURCE-BACKGROUND-WRITER">bgwriter_lru_maxpages</a>).

### Buffers written rate

Amount of data flushed from memory to disk.
<ul>
 	<li><b>Checkpoint</b>: buffers written during checkpoints. </li>
 	<li><b>Backend</b>: buffers written directly by a backend. It may happen that a dirty page is requested by a backend process. In this case the page is synched to disk before the page is returned to the client.</li>
 	<li><b>BgWriter</b>: buffers written by the background writer. PostgreSQL may clear pages with a low usage count in advance. The process scans for dirty pages with a low usage count so that they could be cleared if necessary. Buffers written by this process increment the counter.</li>
</ul>

### Buffers allocated rate

Allocated and re-allocated buffers. If a backend process requests data, it is either found in a block in the shared buffer cache or the block has to be allocated (read from disk). This metric represents the rate of occurrences where the block had to be allocated.

### Backend fsync calls

Number of times a backend had to execute its own fsync call (normally the background writer handles those even when the backend does its own write). Any values above zero can indicate problems with storage when the fsync queue is completely filled.

### Oldest transaction ID

Represents the value of the oldest transaction ID. If for some reason autovacuum fails to clear old XIDs from a table, the system will begin to emit warning messages when the database's oldest XIDs reach eleven million transactions from the wraparound point.

To bring the highest XID age value back down one option is to force a vacuum on the entire database cluster. If this is not possible, vacuuming specific tables where the problem is concentrated is the other option.

### Percent towards Transaction ID wraparound

This is a critical metric and indicates how close to the point of exhaustion and transaction ID wraparound the database is. If exhaustion is ever reached, the database could be forced to shut down. There is a small buffer since the upper boundary is 2 billion exactly, which is less than the actual max integer value that causes the exhaustion. Regardless, this metric hitting 100% should be acted upon immediately. For more information see <a href="https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND">Preventing Transaction ID Wraparound Failures</a>.

### Percent towards emergency autovacuum

This metric tells you how close to <i>autovacuum_freeze_max_age </i>the database’s highest transaction ID value has reached. <i>autovacuum_freeze_max_age </i>is a user configurable parameter (default value = 200 million), when any table's highest transaction ID value reaches it, a higher priority autovacuum kicks in on that table.

It is especially important to monitor in systems where this has not been monitored previously. 

### Dead rows ratio

The ratio of dead rows to live rows measured per database, per table.

An increase in dead rows indicates a problem with VACUUM processes, which can slow down your queries.

<img class="alignnone size-medium wp-image-17573" src="/img/wp-archive/uploads/2022/09/deadrows-600x161.png" alt="PostgreSQL dead rows ratio" width="600" height="161" />

### Table row count

The total count of rows (live and dead) measured per database, per table

When you do an UPDATE or DELETE, the row is not actually physically deleted. For a DELETE, the database simply marks the row as unavailable for future transactions, and for UPDATE, under the hood it is a combined INSERT then DELETE, where the previous version of the row is marked unavailable.
<ul>
 	<li><b>Live</b>:  rows that are currently in use and can be queried. </li>
 	<li><b>Dead</b>: deleted rows that will later be reused for new rows from INSERT or UPDATE.</li>
</ul>

### Table NULL column count

Count of table columns which are always NULL - in other words this is a count of table columns that may be useless and unnecessary. This metric is measured per database and per table. Once you identify the table with always NULL columns you will have to manually query the table to identify which columns are always NULL.

### Index usage status

Count of indexes by usage status. An index is considered unused if no scans have been initiated on that index. Use this metric to monitor if you consistently have unused indexes.

<img class="alignnone size-medium wp-image-17561" src="/img/wp-archive/uploads/2022/09/unusedindexes-600x162.png" alt="PostgreSQL unused indexes" width="600" height="162" />

## Replication

### Replication standby lag

Replication lag measured in seconds per lag type. This metric is measured per standby instance.
<ul>
 	<li><b>WriteLag</b>: time elapsed between flushing recent WAL locally and receiving notification that the standby server has written it, but not yet flushed it or applied it. </li>
 	<li><b>FlushLag</b>: time elapsed between flushing recent WAL locally and receiving notification that the standby server has written and flushed it, but not yet applied it. </li>
 	<li><b>ReplayLag</b>: time elapsed between flushing recent WAL locally and receiving notification that the standby server has written, flushed and applied it.</li>
</ul>

### Replication standby delta

Replication lag measured in bytes per lag type.This metric is measured per standby instance.
<ul>
 	<li><b>SentLag</b>: lag in bytes sent over the network. </li>
 	<li><b>WriteLag</b>: lag in bytes written to disk. </li>
 	<li><b>FlushLag</b>: lag in bytes flushed to disk. </li>
 	<li><b>ReplayLag</b>: lag in bytes replayed into the database.</li>
</ul>

### Replication slot files

Replication slot files. For more information see <a href="https://www.postgresql.org/docs/current/static/warm-standby.html#STREAMING-REPLICATION-SLOTS">Replication Slots</a>.
<ul>
 	<li><b>WalKeep</b>: WAL files retained by the replication slot. </li>
 	<li><b>PgReplslotFiles</b>: files present in pg_replslot.</li>
</ul>

### Conflicts

Number of queries canceled due to conflict with recovery on standby servers. To minimize query cancels caused by cleanup records consider configuring <a href="https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY-FEEDBACK"><i>hot_standby_feedback</i></a>.

This view will only contain information on standby servers, since conflicts do not occur on master servers.<b></b>

### Conflict statistics

Statistics about queries canceled due to various types of conflicts on standby servers.
<ul>
 	<li><b>Tablespace</b>: queries that have been canceled due to dropped tablespaces. </li>
 	<li><b>Lock</b>: queries that have been canceled due to lock timeouts. </li>
 	<li><b>Snapshot</b>: queries that have been canceled due to old snapshots. </li>
 	<li><b>Bufferpin</b>: queries that have been canceled due to pinned buffers. </li>
 	<li><b>Deadlock</b>: queries that have been canceled due to deadlocks.</li>
</ul>

## WAL (write ahead logging)

Write-Ahead Logging (WAL) ensures data integrity by ensuring that changes to data files (where tables and indexes reside) are written only after log records describing the changes have been flushed to permanent storage.<b></b>

### WAL writes

Data written to WAL per second.<b></b>

### WAL files

Number of WAL logs stored in the directory pg_wal under the data directory.
<ul>
 	<li><b>Written</b>: generated log segments files. </li>
 	<li><b>Recycled</b>: old log segment files that are no longer needed. Renamed to become future segments in the numbered sequence to avoid the need to create new ones.</li>
</ul>

### WAL archive files

Statistics about WAL file archiving.
<ul>
 	<li><b>Ready</b>: WAL files waiting to be archived. A non-zero value can indicate archive_command is in error, see <a href="https://www.postgresql.org/docs/current/static/continuous-archiving.html">Continuous Archiving and Point-in-Time Recovery</a>. </li>
 	<li><b>Done</b>: WAL files successfully archived.</li>
</ul>

## Catalog<b></b>

### Database Count

The count of PostgreSQL databases being monitored by this Netdata job.

### Catalog relation count

The count of different catalog relations.

### Catalog relation size

The size of different catalog relations.

## Uptime

### Uptime

The time elapsed since the Postgres process was started.

## Troubleshooting PostgreSQL using Netdata 

Metrics and visualizations on their own do not mean much if you don’t know what you should be looking at, or whether something is worth investigating in the first place.

Netdata is a powerful troubleshooting tool and we’ll walk through some of the troubleshooting features that help you understand which metrics need your attention and get to the root cause of your PostgreSQL troubles quickly. And the quicker you get there the less risk of down time.

## Alerts

Netdata has a built-in health watchdog that comes with pre configured alerts to reduce the monitoring burden for you. 

If you would like to update the alert thresholds or configuration or want to create your own alert - please follow the <a href="https://learn.netdata.cloud/docs/monitor/configure-alarms">instructions here</a>.

By default you will receive email notifications whenever an alert is triggered - if you would not like to receive these notifications you can turn them off from your profile settings.

<img class="alignnone size-medium wp-image-17545" src="/img/wp-archive/uploads/2022/09/image-11-600x382.png" alt="PostgreSQL Alerts" width="600" height="382" />

## Anomaly Advisor

<a href="https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor">Anomaly Advisor</a> lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

In the screenshot below you can see that the spike in overall anomaly rate was triggered by multiple metrics among which are several postgreSQL metrics including the locks awaited by the database.

To learn more about how to use Anomaly Advisor to troubleshoot your PostgreSQL cluster check out the documentation or visit the demo space.

<img class="alignnone size-medium wp-image-17547" src="/img/wp-archive/uploads/2022/09/image3-600x346.png" alt="PostgreSQL Anomaly Advisor" width="600" height="346" />

## Metric Correlations

<a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations">Metric Correlations</a> lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

In the screenshot below, you can see that running Metric Correlations filters the charts by those which are correlated to the selected time frame, in this particular example there is a correlation between checkpoint information and what BGwriter is doing - as you would expect. 

To learn more about how to use Metric Correlations to troubleshoot your PostgreSQL cluster check out the documentation or visit the demo space.

<img class="alignnone size-medium wp-image-17549" src="/img/wp-archive/uploads/2022/09/image5-600x412.png" alt="PostgreSQL Metric Correlations" width="600" height="412" />

## Netdata PostgreSQL monitoring demo 

Netdata has a public demo space where you can explore different monitoring use-cases. 

Check out the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/postgresql/overview#chartName=menu_postgres">PostgreSQL room</a> to explore and interact with the charts and metrics described in this guide.

## Conclusion

In this guide we explored how to use Netdata to collect PostgreSQL metrics, visualize them intuitively and how to troubleshoot your PostgreSQL cluster using real time alerts, anomaly advisor and metrics correlation. 

We also introduced you to Netdata demo space where you can explore PostgreSQL monitoring at your own pace. 

Hope you are ready and excited to start your PostgreSQL monitoring journey with Netdata. 

If you haven't already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you - if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>. 

Happy Troubleshooting!