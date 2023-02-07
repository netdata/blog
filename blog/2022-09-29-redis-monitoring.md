---
slug: redis-monitoring
title: Redis Monitoring
authors: shyam
tags: [how-to, Redis]
---

![logo](https://redis.com/wp-content/uploads/2021/08/redis-logo.png?&auto=webp&quality=85,75&width=500)

<!--truncate-->

## What is Redis?

Redis is a popular open-source, in-memory data store used across industries by a variety of companies, including Github, Stack Overflow, Twitter and Netdata!

Redis supports multiple use-cases including:
<ul>
 	<li><strong>Real time data store</strong>: <b></b>The versatile in-memory data structures supported by Redis enable building data infrastructure for real-time applications that require low latency and high-throughput.<b></b></li>
 	<li><strong>Caching &amp; session storage</strong>: <b></b>The high speed data access enabled by Redis makes it ideal for caching database queries, complex computations, API calls, and session state.<b></b></li>
 	<li><strong>Streaming &amp; messaging</strong>: The stream data type enables high-rate data ingestion, messaging, event sourcing, and notifications.</li>
</ul>

## Redis + Netdata

Netdata makes monitoring and troubleshooting Redis simple, effective and powerful. 

The prerequisite to this guide is that you have Redis &amp; Netdata installed and running.

Installing Netdata is as easy as it gets; just follow <a href="https://learn.netdata.cloud/docs/cloud/get-started">these steps</a> to sign up for a free Netdata account and install the open source agent. 

Netdata automatically discovers the Redis service and starts monitoring it, if it is accessible on the localhost on port 6379 (the default port), or via one of the following unix sockets. 

<img class="aligncenter wp-image-17629 size-full" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/jobs.png" alt="Reddit Unit Sockets" width="512" height="291" />

If your Redis service is configured differently or is password protected, you will need to <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/redis#configuration">configure the collector</a>.

You should now see a Redis section on the Overview tab that’s already populated with charts about all the metrics you care about!

## Redis demo room

Netdata has a public demo space where you can explore different monitoring use-cases. 

Check out the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/redis/overview#chartName=menu_redis">Redis demo room </a>to explore and interact with the charts and metrics described in this guide.

## Monitoring Redis metrics with Netdata

High fidelity monitoring of Redis enables you to understand the performance of your Redis datastore, whether it is configured optimally or not and also identify any problems that may arise. 

This section of the guide explains what metrics are key to understanding Redis and how to make sense of them. All of these metrics are collected by Netdata.

### Connections

Redis accepts clients’ connections on the configured listening TCP port and on the Unix socket, if enabled. Redis is capable of handling many active connections, up to a threshold of <i>maxclients</i>, which describes the maximum number of clients that can connect to Redis. The default value is 10,000 client connections. If your system does not have sufficient file descriptors to comply with the <i>maxclients </i>configuration then Redis will use the number of available file descriptors as the limit.
<ul>
 	<li><b>Accepted connections:</b>  Client connection attempts that are accepted per second.</li>
 	<li><b>Rejected connections</b>: Client connection attempts that are rejected due to <i>maxclients </i>limit being exceeded or due to scarcity of available file descriptors. </li>
</ul>
<img class="aligncenter size-full wp-image-17632" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-2.png" alt="Current State Redis Monitoring" width="512" height="139" />

The current state of the clients connected to or attempting to connect to Redis are monitored in a separate chart.<b></b>
<ul>
 	<li><strong>Connected</strong>: Client connected to Redis</li>
</ul>
<ul>
 	<li><b>Blocked: </b>Client blocked from connecting to Redis</li>
</ul>
<ul>
 	<li><b>In the timeout table: </b>Clients in the timeout table due to be disconnected. </li>
</ul>
<ul>
 	<li><b>Tracking: </b>Clients for which <a href="https://redis.io/commands/client-tracking/">client tracking</a> is enabled</li>
</ul>

### Performance

These metrics are the key indicators of Redis performance and overall system health.<b></b>

#### Latency

<ul>
 	<li>Latency is the average time it takes from a client request to the server response.</li>
 	<li>Monitoring latency allows you to quickly detect variations in Redis performance. Redis is single-threaded and a single long response could cause a cascade effect on subsequent requests.</li>
 	<li>High latency could be caused by a number of factors including (but not limited to) slow commands, over utilized network links or a high backlog in the command queue.</li>
 	<li>For more information on diagnosing latency issues read the <a href="https://redis.io/docs/reference/optimization/latency/">guide</a> from Redis.</li>
</ul>

#### Processed commands per second

<ul>
 	<li>Total number of commands processed per second</li>
 	<li>A significant shift in the number (or pattern) of the commands processed is something to watch out for. </li>
 	<li>In the example given in the following image, the periodic drops in the number of commands is normal expected behavior - but in abnormal scenarios a drop could be caused by slow commands and enabling the Redis slowlog is a potential way to troubleshoot this.</li>
</ul>
<img class="aligncenter size-full wp-image-17634" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-3.png" alt="Number of commands drop Redis" width="512" height="138" />

#### Lookup hitrate

<ul>
 	<li>Lookup hitrate or cache hit ratio is the percentage of successful reads or hits out of all read operations. In other words:</li>
</ul>
<pre>     Lookup Hitrate = (Keyspace hits / (Keyspace hits + Keyspace misses))</pre>
<ul>
 	<li>This is an important metric to track as lower hitrates result in larger latency due to a greater reliance on disk reads. In normal conditions this value should be greater than 80%</li>
 	<li>Note that this metric is meaningful for an application that has been running for some time - for new applications it may be prudent to ignore this number for a while.</li>
 	<li>A low lookup hitrate could be caused by a number of factors such as keys getting evicted, keys expiring too soon or keys that simply do not exist.</li>
</ul>
<img class="aligncenter size-full wp-image-17636" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-4.png" alt="low lookup hitrate Redis" width="512" height="138" />

### Memory

#### Memory Usage

<ul>
 	<li>Monitoring memory usage is a crucial part of understanding Redis performance</li>
 	<li>This chart represents how much memory is consumed by Redis across different components (dataset, lua, max, peak, rss, scripts, used)</li>
</ul>
<img class="aligncenter size-full wp-image-17638" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-5.png" alt="Redis Consumed Memory" width="512" height="137" />

#### Memory fragmentation

<ul>
 	<li>The ratio of memory allocated by the operating system to memory requested by Redis, or in other words (<i>used_memory_rss/used_memory</i>)</li>
 	<li>Ratio &gt; 1.5 indicates excessive fragmentation. (Restarting Redis instance will allow the operating system to recover memory previously unusable due to fragmentation)</li>
 	<li>Ratio &lt; 1 indicates Redis needs more memory than is available on your system, which leads to swapping. Swapping to disk will cause significant increases in latency.</li>
 	<li>Ratio of equal to 1 or slightly greater is generally considered ideal.</li>
</ul>
<img class="aligncenter size-full wp-image-17640" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-6.png" alt="Redis Memory" width="512" height="136" />

#### Evicted keys

<ul>
 	<li>This metric is only meaningful to monitor when Redis is used as a cache</li>
 	<li>When Redis is used as a cache, it is often convenient to let it automatically evict old data as you add new data. </li>
 	<li>To find out more about how the key eviction process and different eviction policies please read the excellent <a href="https://redis.io/docs/manual/eviction/">documentation </a>from Redis.   </li>
</ul>

### Network

#### Bytes received and sent
<ul>
 	<li>Bytes received and sent per second by Redis</li>
</ul>
<img class="aligncenter size-full wp-image-17642" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-7.png" alt="Redis Byte Monitoring" width="512" height="138" />

### Replication

Redis supports failover and high availability with asynchronous replication. <b></b>

#### Connected replicas

<ul>
 	<li>The number of replicas connected to the primary Redis server</li>
 	<li>A sudden drop in the number of connected replicas could indicate a host going down or a problem with the replica instance.</li>
</ul>

#### Time since last interaction

<ul>
 	<li>Time in seconds since last interaction between replica and primary</li>
 	<li>A long time interval without communication could indicate a problem on the primary Redis server or on the replica or in the link between them. </li>
 	<li>When a replica connects (or reconnects) to a master it sends a SYNC command which may cause a latency spike on the primary Redis server.</li>
</ul>

#### Time since link down

<ul>
 	<li>Time in seconds since link between replica and primary went down</li>
 	<li>This metric is only available when the connection between a primary and its replica has been lost. Any non zero value for this metric is cause for alarm.</li>
</ul>

### Persistence

Redis writes data to disk (durable storage) for persistence. There are multiple persistence options including RDB (Redis database) persistence performance point in time snapshots at specified intervals, AOF (Append only file) persistence logs every write operation received by the server, that will be played again at server startup, reconstructing the original dataset, a mix of the two approaches and also an option to choose no persistence.

If you are using Redis as a cache then persistence may not be necessary. For further information on Redis persistence refer to the official <a href="https://redis.io/docs/manual/persistence/">documentation</a>.

#### Changes

<ul>
 	<li>Operations that produced changes since the last SAVE or BGSAVE</li>
 	<li>This metric gives you an understanding of data volatility, a longer interval to the next SAVE is less consequential if the data is less volatile.</li>
</ul>
<img class="aligncenter size-full wp-image-17646" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-8-a.png" alt="Redis Changes" width="512" height="138" />

#### Current BGSAVE time

<ul>
 	<li>Duration of the ongoing RDB save if any (in seconds)</li>
</ul>

#### Status of last RDB BGSAVE

<ul>
 	<li>Status of the last RDB BGSAVE, 0 if OK, 1 if error</li>
</ul>

#### RDB last SAVE time

<ul>
 	<li>The timestamp of the last RDB SAVE.</li>
</ul>
<h3>AOF file size</h3>
<ul>
 	<li>The AOF file size.</li>
</ul>

### Commands

#### Commands by type

<ul>
 	<li>The total commands per seconds by command type.</li>
 	<li>This chart lets you quickly identify the most common commands being processed.</li>
</ul>
<img class="aligncenter size-full wp-image-17644" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-8.png" alt="Redis commands by type" width="512" height="139" />

#### Total CPU time consumed by commands

<ul>
 	<li>The total CPU time consumed by each command type, measured in microseconds.</li>
 	<li>This chart lets you quickly identify which command type consumes the most CPU time in total, in the example below it is clear that <i>LRANGE </i>is the outlier in terms of CPU time consumed.</li>
</ul>
<img class="aligncenter size-full wp-image-17650" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-9.png" alt="Redis CPU Consumed by Commands" width="512" height="138" />

#### Avg CPU time consumed per command execution

<ul>
 	<li>The average CPU time consumed by each command type, measured in microseconds</li>
 	<li>This is distinct from the previous chart since it shows you the variance between the average time per command to total time per all instances of a command being processed.</li>
 	<li>The below chart is collected from the same Redis instance as the previous one and while <i>LRANGE </i>was the command that consumed the greatest amount of total time, <i>INFO </i>is the command that consumes the most time in average.</li>
</ul>
<img class="aligncenter size-full wp-image-17652" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/Redis-10.png" alt="Redis CPU time consumed per command execution" width="512" height="140" />

### Keyspace

#### Expired keys

<ul>
 	<li>Measures the number of expired keys per second</li>
 	<li>Normally Redis keys are created without an associated TTL (time to live) and the key will live forever unless explicitly removed by the user.</li>
 	<li>However the EXPIRE command can be used to associate an expire to a given key which tells Redis to make sure the key is removed after the specified amount of time has elapsed.</li>
</ul>

#### Keys per database

<ul>
 	<li>Measures the number of total keys per database</li>
</ul>

#### Keys with expiration per database

<ul>
 	<li>Measures the number of keys with an expiration per database. Note that this is distinct from the expired keys metric which measures the keys actually expiring.</li>
</ul>

### Uptime

#### Uptime
<ul>
 	<li>The duration of time in seconds since the Redis server became operational.</li>
</ul>

## Troubleshooting Redis with Netdata

### Alerts

Netdata has a built-in health watchdog that comes with pre configured alerts to reduce the monitoring burden for you. 

If you would like to update the alert thresholds for any of these alerts or want to create your own alert for another metric – please follow the <a href="https://learn.netdata.cloud/docs/monitor/configure-alarms">instructions here</a>.

By default you will receive email notifications whenever an alert is triggered – if you would not like to receive these notifications you can turn them off from your profile settings.

### Anomaly Advisor

Anomaly Advisor lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

To learn more about how to use Anomaly Advisor to troubleshoot your Redis cluster check out the <a href="https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor">documentation </a>or visit the demo space.

### Metric Correlations

<a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations">Metric Correlations</a> lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

Hope you are ready and excited to start your Redis monitoring journey with Netdata. 

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>. 

Happy Troubleshooting!