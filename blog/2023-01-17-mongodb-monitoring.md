---
slug: mongodb-monitoring
title: How to monitor and troubleshoot MongoDB
description: Monitoring and troubleshooting MongoDB.
authors: shyam
tags: [how-to, monitor, troubleshoot, mongodb,  database, nosql, data store]
keywords: [how-to, monitor, troubleshoot, mongodb,  database, nosql, data store]
image: https://user-images.githubusercontent.com/24860547/212873204-5082b40d-7be0-4a08-ae72-0895b840837b.png

---

Find out how to effectively and easily monitor and troubleshoot MongoDB using Netdata

<!--truncate-->
## What is MongoDB

[MongoDB](https://www.mongodb.com/) is an open source, cross-platform, document-oriented NoSQL database system. It is designed for scalability and performance and is used to store data in collections of documents. MongoDB supports advanced features such as file storage, full-text search, and data replication. It is commonly used in web applications and cloud computing applications.

## Monitoring MongoDB with Netdata

The prerequisites for monitoring MongoDB with Netdata are to have MongoDB and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for MongoDB monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/mongodb).

You should now see the MongoDB section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What MongoDB metrics are important to monitor?

### Operations
 - The total number of operations performed by the MongoDB server per second. The following operations are displayed as separate dimensions: insert, query, update, delete, getmore, command. Monitoring this metric can help identify the usage patterns of the server and potential performance issues.

### Operations latency
 - The latencies of reads, writes and commands operations performed by the MongoDB server. High latencies may indicate performance issues with the server or the components interacting with it.

### Connections
 - The total number of connections to the MongoDB server. Current connections and available connections are displayed separately. Monitoring this metric can help identify the usage patterns of the server and potential performance issues.

### Connections by Rate
 - The rate of connections created per second to the MongoDB server. Monitoring this metric can help identify the usage patterns of the server and potential performance issues.

### Connections by State
 - The distribution of connection states for the MongoDB server. The following states are displayed as separate dimensions: active, threaded, exhaustIsMaster, exhaustHello, awaiting_topology_changes. Monitoring this metric can help identify if there are issues with the server or the components interacting with it.

### Network IO 
 - The amount of network IO performed by the MongoDB server. 

### Network requests
 - The number of requests per second to the MongoDB server. 

### Page faults
 - The number of page faults encountered by the MongoDB server per second. 

### TCMalloc generic
 - The usage of the TCMalloc generic allocator by the MongoDB server. The size of the heap and currently allocated bytes are monitored.

### TCMalloc
 - The usage of the TCMalloc allocator by the MongoDB server. The usage in bytes for each of the following is monitored: 
	- pageheap_free
	- pageheap_unmapped 
	- total_threaded_cache
	- free
	- pageheap_committed
	- pageheap_total_commit
	- pageheap_decommit
	- pageheap_reserve

### Asserts
 - The number of asserts encountered by the MongoDB server per second. The following assert types are monitored: 
	- regular
	- warning
	- msg
	- user
	- tripwire
	- rollovers
	
### Current transactions
 - The number of current transactions on the MongoDB server. The following transaction types are monitored: 
	- Active
	- Inactive
	- Open
	- Prepared

### Shard commit types
 - The distribution of commit types for sharded collections on the MongoDB server. The following types are monitored:
	- no_shard_init
	- no_shard_successful
	- single_shard_init
	- single_shard_successful
	- shard_write_init
	- shard_write_successful
	- two_phase_init
	- two_phase_successful

### Active clients
 - The number of active clients (readers and writers) connected to the MongoDB server. 

### Queued readers and writers
 - The number of clients (readers and writers) currently queued because of a lock on the MongoDB server. 

### Locks
 - The distribution of locks held by the MongoDB server. The following locks are monitored global_read, global_write, database_read, database_write, collection_read, collection_write.
 
### Flow control timings
 - The timings of flow control events (acquiring and lagged) on the MongoDB server. 

### WiredTiger metrics
WiredTiger is the default storage engine starting in MongoDB 3.2. It is well-suited for most workloads and is recommended for new deployments. WiredTiger provides a document-level concurrency model, checkpointing, and compression, among other features. In MongoDB Enterprise, WiredTiger also supports Encryption at Rest.

### WiredTiger Block Manager
 - The WiredTiger block manager subsystem manages the reading and writing of data from the disk. It is designed to facilitate high performance, economic use of disk space and customizability. A block is a chunk of data that is stored on the disk and operated on as a single unit. Each WiredTiger data file is made up of these blocks.
 - The size of blocks, in bytes, across each of the following dimensions on the MongoDB server is monitored:
	- Read
	- Read_via_memory_map_api
	- Read_via_system_call_api
	- Written
	- Written_for_checkpoint
	- Written_via_memory_map_api

### WiredTiger Cache
 - The WiredTiger cache is memory used to hold copies of recently accessed or modified data.
 - This WiredTiger cache usage on the MongoDB server is monitored across the following dimensions:
	- allocated_for_updates
	- read_into_cache
	- written_from_cache

### WiredTiger Capacity
 - The capacity of the WiredTiger cache on the MongoDB server. 

### WiredTiger Connection
 - The number of connections currently open in the WiredTiger storage engine on the MongoDB server. 

### WiredTiger Cursor
 - The number of cursors currently open in the WiredTiger storage engine on the MongoDB server. 

### WiredTiger Lock Aquisitions
 - The number of locks currently held in the WiredTiger storage engine on the MongoDB server. 

### WiredTiger Lock Duration
 - The duration of locks held in the WiredTiger storage engine on the MongoDB server. 

### WiredTiger Log Operations
 - The number of operations written to the WiredTiger log on the MongoDB server. 
 
 ### WiredTiger Log Operations Size
 - The size of operations written to the WiredTiger log on the MongoDB server. 

### WiredTiger Transactions
 - The number of transactions currently open in the WiredTiger storage engine on the MongoDB server. 

### Database Collections
 - The number of collections in the specified database on the MongoDB server. Monitoring this metric can help identify the usage patterns of the database and potential performance issues.

### Database Indexes
 - The number of indexes in the specified database on the MongoDB server. Monitoring this metric can help identify the usage patterns of the database and potential performance issues.

### Database Views
 - The number of views in the specified database on the MongoDB server. Monitoring this metric can help identify the usage patterns of the database and potential performance issues.

### Database Documents
 - The number of documents in the specified database on the MongoDB server. Monitoring this metric can help identify the usage patterns of the database and potential performance issues.

### Database Storage Size
 - The storage size of the specified database on the MongoDB server. Monitoring this metric can help identify if the database is using an appropriate amount of storage.

### Replication Lag
 - The amount of lag in replication on the MongoDB server. Monitoring this metric can help identify if the server is experiencing performance issues related to replication.

### Replication Heartbeat Latency
 - The latencies of replication heartbeats on the MongoDB server. Monitoring this metric can help identify if the server is experiencing performance issues related to replication.

### Replication Node Ping
 - The latencies of pings to replication nodes on the MongoDB server. Monitoring this metric can help identify if the server is experiencing performance issues related to replication.

### Shard Nodes Count
 - The number of nodes in the specified shard on the MongoDB server. Monitoring this metric can help identify the usage patterns of the shard and potential performance issues.

### Shard Databases Status
 - The status of the databases in the specified shard on the MongoDB server. Monitoring this metric can help identify if there are issues with the databases in the shard.

### Chunks
 - The number of chunks in the specified shard on the MongoDB server. Monitoring this metric can help identify the usage patterns of the shard and potential performance issues.


## Troubleshooting MongoDB with Netdata

### Alerts
Netdata has built-in alerts to reduce the monitoring burden for you. 

If you would like to update the alert thresholds for any of these alerts or want to create your own alert for another metric – please follow the [instructions here](https://learn.netdata.cloud/docs/monitor/configure-alarms).

By default you will receive email notifications whenever an alert is triggered – if you would not like to receive these notifications you can turn them off from your profile settings.
### Anomaly Advisor
Anomaly Advisor lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

To learn more about how to use Anomaly Advisor to troubleshoot your Apache web server check out the [documentation](https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor) or visit the [anomalies tab](https://app.netdata.cloud/spaces/netdata-demo/rooms/apache/anomalies) in the demo space to play with it right now.
### Metric Correlations 
[Metric Correlations](https://learn.netdata.cloud/docs/cloud/insights/metric-correlations) lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

## Let us hear from you
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=mongodb-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
