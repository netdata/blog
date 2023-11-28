---
slug: mongodb-monitoring
title: How to monitor and troubleshoot MongoDB
description: Effortlessly monitor your MongoDB databases using Netdata, ensuring optimal performance and reliability for your NoSQL data. Learn more in our blog.
authors: shyam
tags: [how-to, monitor, troubleshoot, mongodb,  database, nosql, data store]
keywords: [how-to, monitor, troubleshoot, mongodb,  database, nosql, data store]
image: https://user-images.githubusercontent.com/24860547/212873204-5082b40d-7be0-4a08-ae72-0895b840837b.png

---

Find out how to effectively and easily monitor and troubleshoot MongoDB using Netdata

![logo](https://user-images.githubusercontent.com/24860547/212873204-5082b40d-7be0-4a08-ae72-0895b840837b.png)

<!--truncate-->
## What is MongoDB

[MongoDB](https://www.mongodb.com/) is an open source, cross-platform, document-oriented NoSQL database system. It is designed for scalability and performance and is used to store data in collections of documents. MongoDB supports advanced features such as file storage, full-text search, and data replication. It is commonly used in web applications and cloud computing applications. 

With [Netdata](https://www.netdata.cloud/), DevOps and SRE teams can effectively monitor MongoDB performance and gain insight into their distributed system quickly and easily.

## Monitoring MongoDB with Netdata

The prerequisites for monitoring MongoDB with Netdata are to have MongoDB and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services and can be configured for manual discovery with a simple one line configuration. For more information on configuring Netdata for MongoDB monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/mongodb).

You should now see the MongoDB section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What MongoDB metrics are important to monitor?

### Operations

 - **Operations by type**: The total number of operations per type performed by the MongoDB server per second. 
 
Monitoring operations by type will help to identify the types of operations that are causing the most strain on the system and can help to identify any potential areas of optimization. Additionally, it can help to ensure that the system is not overburdened and that the resources are being allocated appropriately. Monitoring this metric will also help to identify any bottlenecks or unexpected spikes in the workload, which can prevent unplanned downtime or performance degradation.
 
![image](https://user-images.githubusercontent.com/24860547/212875959-01f4a957-03e0-4d1c-bc42-66062755e3ca.png)

 - **Operations Lantecy**: The latencies of reads, writes and command operations performed by the MongoDB server. High latencies may indicate performance issues with the server or the components interacting with it.
 
High latencies may be caused by a number of different factors, such as inadequate hardware resources, inefficient queries, or contention between concurrent operations. By monitoring this metric, it is possible to quickly identify any potential performance issues and take appropriate corrective action. Monitoring this metric can help to avoid any unexpected downtime or performance degradation.

![image](https://user-images.githubusercontent.com/24860547/212876030-46a49c5a-8d7b-4cc2-b040-60638cdd043a.png)

### Connections
 - **Connections Count**: The total number of connections to the MongoDB server. Current connections and available connections are displayed as separate dimensions. 

![image](https://user-images.githubusercontent.com/24860547/212876099-6ceed111-9663-4cb6-89db-76d3c33bcf25.png)

 - **Connections by Rate**: The rate of connections created per second to the MongoDB server. 

This metric provides insight into the traffic that is coming in to the MongoDB server. This will help identify spikes in traffic that could be caused by malicious activity or a sudden surge in usage from legitimate users. By monitoring this metric, you can identify potential bottlenecks or issues before they become problematic. Additionally, it can help you identify when you need to scale your MongoDB server to accommodate additional traffic. By monitoring this metric, you can prevent slowdowns and other issues related to an overloaded server.

 - **Connections by State**: The distribution of connection states for the MongoDB server. The following states are displayed as separate dimensions: active, threaded, exhaustIsMaster, exhaustHello, awaiting_topology_changes. 

This is an important metric to monitor for MongoDB servers, as it can help in understanding the overall connection health of the server. In particular, by monitoring the distribution of active, threaded, awaiting_topology_changes, exhaustIsMaster, and exhaustHello states, you can identify any connection issues that may be affecting the performance of the server. For example, if the active connection count is too high, it may indicate that the server is overburdened and needs to be scaled up. Similarly, if the exhaustHello and exhaustIsMaster states are too high, it may suggest that the server is receiving too many requests and needs to be optimized. By monitoring these connection states, you can identify potential issues before they become too severe and take preventive action.

### Network 
 - **Network IO**: The amount of network IO performed by the MongoDB server. 
 
Network IO refers to the amount of data being transferred over the network when running MongoDB. This metric should be monitored closely as it can help identify network related performance issues such as slow queries, unresponsive nodes, or excessive network traffic. If the network IO usage is too high, it could lead to poor performance and even outages. Monitoring this metric helps to ensure that MongoDB is performing optimally and that the system resources are used efficiently. Network IO can also help detect potential security issues, such as malicious traffic or attempts to access sensitive data. Monitoring network IO can also help identify any problems with the network configuration or hardware, and prevent them from becoming a major issue.
 
![image](https://user-images.githubusercontent.com/24860547/212876199-30a3df8e-7277-4baf-927a-31eb3f6b2390.png)

 - **Network Requests**: The number of requests per second to the MongoDB server. 
 
If the number of requests is too high, it can cause the database to become overloaded and degrade performance. Conversely, if the number of requests is too low, it could indicate that the server isn't being utilized efficiently. By monitoring the number of requests per second, you can ensure that the server is operating at an optimal level and identify any discrepancies in usage patterns. 

For example, if the number of requests suddenly increases, it could be indicative of a problem with the database or a spike in usage. If the number of requests drops suddenly, it could mean that the database is not being utilized or that the application is experiencing an issue. By monitoring network requests, you can quickly identify any issues and take the necessary steps to rectify them.
 
![image](https://user-images.githubusercontent.com/24860547/212876243-f96fae2a-b5c1-4ecc-b425-8a9dbd38424b.png)

### Memory
 - **Page Faults**: The number of page faults encountered by the MongoDB server per second. 

Page faults occur when the MongoDB server needs to access parts of data that are not currently in the memory. As the dataset size increases, more page faults will occur unless the working set of data can be kept in memory. Monitoring page faults helps to identify when MongoDB is not able to keep the working set in memory. If the page faults are too high, it may indicate that the dataset size is too large for the available memory, and the server should be upgraded or the data should be partitioned.

In addition, monitoring page faults can help identify if the dataset is not being accessed in an optimal way. If the page faults are too high, it may indicate that the queries are not using the correct indexes or that a sufficient number of indexes are not used to cover the query.

Page faults can also help identify if the MongoDB server is being overloaded. If the page faults are too high and cannot be attributed to dataset size, indexing, or query optimization, it may indicate that the server is not configured correctly or that there are too many connections for the server to handle.

 - **TCMalloc**: The usage of the TCMalloc allocator by the MongoDB server. The usage in bytes for each of the following is monitored: 
	- pageheap_free
	- pageheap_unmapped 
	- total_threaded_cache
	- free
	- pageheap_committed
	- pageheap_total_commit
	- pageheap_decommit
	- pageheap_reserve
	

TCMalloc is a thread-local storage allocator that is used by MongoDB to allocate memory for various operations. It is important to monitor the usage of TCMalloc as it can help prevent memory-related issues and performance bottlenecks. By monitoring the usage of TCMalloc, you can identify when more memory is needed, when the memory is not being released back to the operating system, and when memory fragmentation is occurring.

For example, if the pageheap_free metric is consistently low and pageheap_unmapped is consistently high, it could indicate that memory is not being released back to the operating system, resulting in memory fragmentation. This can cause performance issues and lead to out-of-memory errors.

Monitoring the total_threaded_cache metric can help identify when more memory is needed, as it shows the total amount of memory allocated by TCMalloc in bytes. If this metric is consistently high, it could indicate that more memory is needed to handle the workload.

Monitoring the free metric can also help indicate when more memory is needed, as it shows the amount of free memory available to TCMalloc in bytes. If this metric is consistently low, it could indicate that more memory is needed to handle the workload. 

![image](https://user-images.githubusercontent.com/24860547/212876358-78cd4505-4188-4b78-a524-5bf8b697ebf6.png)

 - **TCMalloc Generic**: The usage of the TCMalloc generic allocator by the MongoDB server. The size of the heap and currently allocated bytes are monitored.
 
TCMalloc Generic is an allocator that is used by MongoDB to manage memory use within the server. It helps to improve the performance of MongoDB by allowing for more efficient memory management. By monitoring the size of the heap, as well as the currently allocated bytes, it is possible to identify memory leaks, fragmentation, and other issues that may be causing performance problems. By monitoring this metric, it is possible to identify these issues before they become too severe, and take corrective action to address them. This can help to ensure that MongoDB performance remains optimal, and that any potential issues are quickly and efficiently addressed.
 
![image](https://user-images.githubusercontent.com/24860547/212876295-61b834aa-97e9-4b4d-9e60-4520a807a5e7.png)

### Asserts
 - **Asserts**: The number of asserts encountered by the MongoDB server per second. The following assert types are monitored: 
	- regular
	- warning
	- msg
	- user
	- tripwire
	- rollovers

Asserts are MongoDB's way of detecting errors within the system. They are essentially checks that the system performs to ensure that data is being handled properly. Asserts can be caused by things such as incorrect data formats, incorrect user input, or a bug in the code. By monitoring the number of asserts encountered, it is possible to identify potential problems before they cause a disruption to service.

For example, if the number of regular asserts increases significantly over a short period of time, it could indicate a bug in the code, or a data format issue. If this is the case, further investigation should be done in order to identify the root cause of the problem and prevent it from causing any service disruptions.

### Transactions
 - **Current Transactions** The number of current transactions on the MongoDB server. The following transaction types are monitored: 
	- Active
	- Inactive
	- Open
	- Prepared

Poorly designed or overloaded transactions can cause the server to become unresponsive, resulting in application errors or unavailability. Monitoring the number of current transactions can help to identify potential bottlenecks and allow for adjustments to be made in order to improve performance. It can also help to identify rogue transactions that may be consuming excessive resources. By monitoring current transactions, administrators can make informed decisions about how to optimize their environment and prevent potential issues. 

### Clients
 - **Active Clients**: The number of active clients (readers and writers) connected to the MongoDB server. 
 
Monitoring this metric can help to identify when it is time to scale up the server to meet the demands of the workload. It can also help to identify any potential issues that may arise due to an overload of clients. For example, if the number of active clients is too high, it can result in requests timing out and errors being returned. By monitoring this metric, these issues can be identified and addressed quickly.
  
![image](https://user-images.githubusercontent.com/24860547/212876432-d8038c56-1381-478b-9cf1-bb7c8ef78950.png)

 - **Queued Clients**: The number of clients (readers and writers) currently queued because of a lock on the MongoDB server. 

### Locks
 - **Acquired Locks**: The distribution of locks acquired and held by the MongoDB server. The following locks are monitored global_read, global_write, database_read, database_write, collection_read, collection_write.
 ![image](https://user-images.githubusercontent.com/24860547/212876511-50384d07-98f0-4e37-8112-63634604903d.png)
 
 - **Flow control events**: The timings of flow control events (acquiring and lagged) on the MongoDB server. 
 
Flow control events are triggered when the server cannot keep up with the incoming requests and starts to fall behind. If these events happen often, it can indicate that the server is overburdened and needs to be scaled up. Monitoring the flow control events can help prevent performance bottlenecks and latency issues. For example, if your application is performing an operation that requires a lot of disk I/O, flow control events can be used to identify when the disk I/O is too slow and can be scaled up to improve performance.

### WiredTiger
WiredTiger is the default storage engine starting in MongoDB 3.2. It is well-suited for most workloads and is recommended for new deployments. WiredTiger provides a document-level concurrency model, checkpointing, and compression, among other features. In MongoDB Enterprise, WiredTiger also supports Encryption at Rest.

 - **WiredTiger Block Manager**:  The size of blocks, in bytes, across each of the following dimensions on the MongoDB server is monitored:
	- Read
	- Read_via_memory_map_api
	- Read_via_system_call_api
	- Written
	- Written_for_checkpoint
	- Written_via_memory_map_api
	
The WiredTiger block manager subsystem manages the reading and writing of data from the disk. It is designed to facilitate high performance, economic use of disk space and customizability. A block is a chunk of data that is stored on the disk and operated on as a single unit. Each WiredTiger data file is made up of these blocks.
	
![image](https://user-images.githubusercontent.com/24860547/212876650-79cb1239-56ac-4a70-8fe3-c6fa2b793b8d.png)

 - **WiredTiger Cache**: The WiredTiger cache is memory used to hold copies of recently accessed or modified data. This WiredTiger cache usage on the MongoDB server is monitored across the following dimensions:
	- allocated_for_updates
	- read_into_cache
	- written_from_cache
![image](https://user-images.githubusercontent.com/24860547/212876712-ebf647e2-8218-4337-8226-5d2ec3a434a5.png)

 - **WiredTiger Capacity**: The capacity of the WiredTiger cache on the MongoDB server. 

If the WiredTiger cache is not large enough, it can cause serious performance issues and affect the overall performance of the MongoDB server. Effective monitoring of WiredTiger Capacity can help prevent issues related to insufficient memory, as well as identify any potential bottlenecks or contention in the database. Additionally, monitoring WiredTiger Capacity can help identify trends that can be used to plan for potential capacity changes, such as increasing the amount of RAM available to the MongoDB server.

 - **WiredTiger Connections**: The number of connections currently open in the WiredTiger storage engine on the MongoDB server. 
![image](https://user-images.githubusercontent.com/24860547/212876782-9337c17b-68b5-43f0-8f1a-8b0e5915dad5.png)

 - **WiredTiger Cursor**: The number of cursors currently open in the WiredTiger storage engine on the MongoDB server. 
 
WiredTiger Cursors are a type of pointer that allow MongoDB to iterate through and read data from collections of documents. Monitoring the number of active cursors is important to ensure that MongoDB can respond quickly to database queries. If the number of active cursors is too high, it can lead to increased disk I/O, as each cursor requires its own disk space. It can also lead to database latency and decreased throughput, as the server must wait for each cursor to finish its work before it can process the next query. 

By monitoring the number of active cursors, you can identify when the database is overburdened and needs additional resources. This can prevent bottlenecks, allowing MongoDB to process queries more quickly and efficiently. Monitoring can also help identify when the database is being overused and needs to be scaled up to handle the load.
 
![image](https://user-images.githubusercontent.com/24860547/212876856-2c826a69-9386-41fe-9f5f-6f29192d8730.png)

 - **WiredTiger Lock Acquisition**: The number of locks currently held in the WiredTiger storage engine on the MongoDB server. 
 
WiredTiger Lock Acquisition is an important MongoDB metric to monitor, as it provides insight into the number of locks being acquired by the storage engine. This is especially important in multi-user environments, where multiple users or applications may be attempting to access the same data. Monitoring this metric can also help detect potential concurrency issues, as a sudden spike in lock acquisition can indicate that an operation is taking longer than expected and may be causing contention. Additionally, long-term trends in lock acquisition can indicate increasing contention, which can be addressed proactively by optimizing queries or increasing the number of connections allowed. Monitoring this metric can also help detect potential deadlocks, as a sudden decrease in lock acquisition can indicate that operations are waiting for locks to be released.
 
![image](https://user-images.githubusercontent.com/24860547/212876934-c79a8581-366a-4d16-8782-7f6e94a3ac54.png)

 - **WiredTiger Lock Duration**: The duration of locks held in the WiredTiger storage engine on the MongoDB server. 

If the lock duration is too long, it can indicate that the database may be trying to access or modify data that is locked by another thread, leading to a deadlock. This can result in degraded query performance, or even data corruption.

One way to prevent this issue is to regularly monitor the lock duration on the server. If the lock duration is too long, it can indicate an issue that needs to be addressed. Additionally, increasing the WiredTiger cache size can help reduce the lock duration by allowing more data to be stored in memory, which can reduce the amount of disk I/O required.

 - **WiredTiger Log Operations**: The number of operations written to the WiredTiger log on the MongoDB server. 
 
Keeping an eye on the number of operations written to the WiredTiger log is important as it can indicate how much disk space is being used, and if it is increasing excessively it can suggest that there is an issue with disk space or with the database configuration. For example, if the log operations are rapidly increasing it could suggest that the database is not being properly indexed or that queries are not being optimised, resulting in an increase in disk usage.
 
 ![image](https://user-images.githubusercontent.com/24860547/212877037-64b89f38-3323-4daf-b267-f38d4414dbc7.png)

  - **WiredTiger Log Operations Size**: The size of operations written to the WiredTiger log on the MongoDB server. 
  
![image](https://user-images.githubusercontent.com/24860547/212877086-61fffbf7-2254-45c8-bb07-8ad5bf2601d0.png)

 - **WiredTiger Transactions**:The number of transactions currently open in the WiredTiger storage engine on the MongoDB server. 
 
Issues that can be prevented through effective monitoring of this metric include identifying slow queries, detecting potential deadlocks, and identifying any transactions that are taking longer than expected to commit.

![image](https://user-images.githubusercontent.com/24860547/212877136-bc34c31f-827a-4366-9a5c-8907b9a5de82.png)

### Database 
 - **Database Collections**: The number of collections in the specified database on the MongoDB server. 

Monitoring the number of collections in a database can help identify potential issues such as excessive fragmentation and duplication of data, which can lead to slower response times, degraded performance, and higher resource utilization. Additionally, monitoring the number of collections in a database can also help identify and prevent potential security vulnerabilities, as collections with sensitive data should be carefully monitored. 

 - **Database Indexes**: The number of indexes in the specified database on the MongoDB server. 

Monitoring the number of indexes in a database can help ensure that the most efficient indexes are being used, which can improve performance and reduce query latency. 

 - **Database Views**: The number of views in the specified database on the MongoDB server. 

Monitoring the number of views in a database can help identify potential issues such as excessive duplication of data, which can lead to slower response times, degraded performance, and higher resource utilization. Additionally, monitoring the number of views can also help identify and prevent potential security vulnerabilities, as views with sensitive data should be carefully monitored. 

 - **Database Documents**: The number of documents in the specified database on the MongoDB server. 

Monitoring the number of documents in a database can help identify potential issues such as excessive fragmentation and duplication of data, which can lead to slower response times, degraded performance, and higher resource utilization.

 - **Database Storage Size**: The storage size of the specified database on the MongoDB server. 

Monitoring the storage size of a database can help identify potential issues such as excessive fragmentation and duplication of data, which can lead to slower response times, degraded performance, and higher resource utilization

### Replication 
 - **Replication Lag**: The amount of lag in replication on the MongoDB server. 

Replication lag is the amount of delay between the primary and secondary nodes in a MongoDB replica set. It is an important metric to monitor because it indicates the health of the replica set and helps ensure that the data is correctly replicated across all nodes. If the lag is too high, it can lead to inconsistencies in data, or even data loss in the event of an outage.

Monitoring replication lag can also help prevent issues such as replica set elections, where the primary node may become unavailable and a new primary must be elected. If the lag is too high, it may take too long for the new primary to catch up and cause a disruption in service.

 - **Replication Heartbeat Latency**: The latencies of replication heartbeats on the MongoDB server. 

Replication heartbeats are messages that are transmitted between MongoDB servers in a replica set in order to ensure that they are in sync with each other. The latency of these heartbeats is an important metric to monitor as it can help identify problems with replication. High latency can lead to data inconsistency, which can have serious implications for data integrity and availability. For example, if a server fails, the replica set may not have the most up-to-date data, leading to data loss or corruption. By monitoring replication heartbeat latency, any potential issues with replication can be quickly identified and addressed.

 - **Replication Node Ping**: The latencies of pings to replication nodes on the MongoDB server. 

High ping latencies can indicate a problem with the server’s network connection or the replication nodes themselves. If these latencies become too high, it can lead to delays in replication and replication errors. Monitoring Replication Node Ping allows a MongoDB administrator to identify any issues before they become serious problems, so the issues can be addressed quickly and the system can perform optimally.

### Shards
 - **Shard**: The number of nodes in the specified shard on the MongoDB server. 

 - **Shard Database Status**: The status of the databases in the specified shard on the MongoDB server. 
 
Shards are a way to horizontally scale the data stored in MongoDB. By sharding, the data can be spread across multiple servers for better performance, scalability, and redundancy. In order to ensure that the shard is always available and can handle the workload, it is important to monitor the number of nodes within the shard. If the number of nodes is too low, the shard may not be able to handle the required workload and could lead to poor performance or even an outage. If the number of nodes is too high, it could lead to increased overhead and an inefficient use of resources. By monitoring the number of nodes in a shard, any issues with the shard can be identified quickly and addressed before they become a problem. Examples of issues that may be identified through effective monitoring include insufficient or excessive node counts, slow performance, or failed operations.

 - **Shard Commit Types**: The distribution of commit types for sharded collections on the MongoDB server. The following types are monitored:
	- no_shard_init
	- no_shard_successful
	- single_shard_init
	- single_shard_successful
	- shard_write_init
	- shard_write_successful
	- two_phase_init
	- two_phase_successful

Shard Commit Types are important metrics to monitor in order to ensure successful write operations on MongoDB. In a sharded cluster, MongoDB splits the data across multiple shards, and each shard may require multiple steps to initiate or complete a write operation. If any of these steps fail, the write operation will fail. Monitoring the distribution of shard commit types allows you to identify any potential issues with write operations and take corrective action before those issues become more serious.

For example, if you notice that the number of failed no_shard_init commits is increasing, it could indicate an issue with the configuration of your sharded cluster. This could lead to reduced performance and possibly data loss. If you monitor this metric regularly, you can quickly identify and address the issue before it becomes a major problem.

 - **Chunks**: The number of chunks in the specified shard on the MongoDB server. 

Chunks are the basic unit of database storage in MongoDB. As the database grows, MongoDB automatically splits it into smaller chunks to optimize performance and storage space. Monitoring the number of chunks is critical for understanding the overall performance of your database. Too few chunks can lead to performance issues as data is transferred across the system, while too many chunks can reduce performance due to increased overhead for managing them. You should monitor the number of chunks to ensure that the correct number is allocated for the amount of data stored in the database. Additionally, by monitoring the number of chunks you can detect any imbalance in the data distribution, which can indicate fragmentation, or a need for rebalancing.

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
By monitoring MongoDB with Netdata, you gain access to charts about all the key metrics of interest, making it easy to identify and address performance issues. Start using Netdata to monitor MongoDB today and gain the insight you need to understand and improve your deployment.

If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=mongodb-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
