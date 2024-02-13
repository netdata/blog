---
title: How to monitor and troubleshoot Memcached
subtitle: 
date: 2023-01-19
author: 
related: ["", "", ""]
tags: 
  [
    "",
  ]
image: "."."""/img/blog/213391620-fdab50bf-4766-4c6d-abe5-76c569c19ff4.png.png".png".png".png".png"""""
---
Find out how to effectively and easily monitor and troubleshoot Memcached using Netdata

![logo](https://user-images.githubusercontent.com/24860547/213391620-fdab50bf-4766-4c6d-abe5-76c569c19ff4.png)


## What is Memcached

[Memcached](https://memcached.org/) is an open source, high-performance, distributed memory object caching system. It is used to store data in memory to improve the performance and scalability of applications. Memcached is designed to be highly reliable and provides features such as replication, mirroring, sharding, and garbage collection. 

It is often used to speed up dynamic database-driven websites by caching data and objects in RAM to reduce the number of times an external data source (such as a database or API) must be read. 

## Monitoring Memcached with Netdata

The prerequisites for monitoring Memcached with Netdata are to have Memcached and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for Memcached monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/memcached).

You should now see the Memcached section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What Memcached metrics are important to monitor?

### Cache

The cache size in bytes used and bytes available is used to track the size of the memory cache. This allows you to monitor how much memory is currently being used by the system. Knowing how much of the available memory is used can help you determine if there are any potential issues with the system or if more memory needs to be allocated to the system.

![image](https://user-images.githubusercontent.com/24860547/213392746-09bcec8e-7328-47d3-af1d-3488d365bf09.png)

This metric  is crucial to continuously monitor and has built-in Netdata alerts associated with it to reduce the monitoring burden for you. 

**Cache Memory Utilization**
  - Checks the current cache memory utilization.
  - If the value is greater than 80% a warning is raised, and a critical alert is raised if this value is above 90%.
  
**Out of Cache Space Time**
  - Calculates the estiamted time the cache will run out of space if the system continues to add data at the same rate as past hour.
  - If the calculated value is less than 48 hours a warning alert is raised.
  - If the calculated value is less than 24 hours a critical alert is raised. 
  
If you would like to update the alert thresholds for any of these alerts or want to create your own alert for another metric – please follow the [instructions here](https://learn.netdata.cloud/docs/monitor/configure-alarms) and update the [memcached alerts configuration file](https://github.com/netdata/netdata/blob/master/health/health.d/memcached.conf).

By default you will receive email notifications whenever an alert is triggered – if you would not like to receive these notifications you can turn them off from your profile settings.

### Network

The amount of network traffic received by a memcached server. It includes the number of bytes received from clients and the number of bytes sent to clients. Monitoring this metric can help to identify potential issues with client connections and help to prevent performance bottlenecks.

In terms of normal values, it is typical to see a few hundred kilobytes of traffic per second, but this can vary greatly depending on the size of the memcached cluster and the amount of traffic it is receiving. A sudden spike in network traffic may indicate that the memcached cluster is overloaded and needs to be scaled up or that the underlying network infrastructure is not capable of handling the traffic. Monitoring this metric can help to identify and resolve these issues before they become critical.

![image](https://user-images.githubusercontent.com/24860547/213392800-6b50ea3e-263f-449a-bbc6-c65ea2997e1b.png)

### Connections

The current connections depicts the number of current (active) connections, rejected connections shows the total number of connections which were rejected due to the server being too busy and total connections depicts the total number of connections made to the server (both successful and rejected).

Effective monitoring of this metric can be used to ensure that the memcached server is not overloaded and that the server is running optimally. If the current connections metric is consistently high, it could indicate that the memcached server is under too much load and needs to be scaled up or optimized to handle the increased load. Similarly, if the rejected connections metric is consistently high, it could indicate that the server is not able to handle the load and needs to be scaled up or optimized.

Typically, an acceptable range for current connections is between 0 and 200. Rejected connections should be kept to a minimum, ideally 0. The total connections metric could vary depending on the usage of the memcached server.

### Items

**Current and Total**
- Measures the amount of items stored in a memcached instance, both currently and in total. This metric is important to monitor as it provides insight into the size of the memcached instance, and can help identify any potential issues with the system.

**Evicted and Reclaimed**
- Items evicted and reclaimed refer to the number of items that are removed from the cache due to memory constraints and then restored to the cache after memory is freed up. This metric is important to monitor because it provides insight into the memory usage of the memcached server and how efficiently it is managing the memory. If the number of evicted and reclaimed items is too high, it could indicate that the server is trying to store too many items in the cache and is unable to manage the memory effectively. This can lead to decreased performance and even a crash if the memory usage becomes too high. Normal value ranges for these metrics should be relatively low, with a maximum of a few hundred items evicted and reclaimed in a given time period.

### Get 

Memcached operations metrics refer to the performance of various operations that Memcached can perform. The most common operations are Get and Set, which are used to store and retrieve data from the cache. The Get operation is used to retrieve data from the cache.

**Cache Usage** 
- Get hits and misses metrics for Memcached provide insight into how efficiently your application is using the cache. A high number of misses in relation to hits indicates that there is an issue with the application or cache configuration. This could be due to the application not properly utilizing the cache or the cache not being properly configured.
- A hit implies data was retrieved from the cache, and a miss implies data was found not in the cache.

**Request Rate**
- Rate of get requests received per second.

### Set 

The Set operation is used to store data in the cache.

**Request Rate**
- Rate of set requests received per second.

### Check And Set

Check and set operation requests are used to manage data stored in a memcached server. These requests check the data stored in the memcached server and then set the value of that data if it has changed. Monitoring these requests is important to ensure that the memcached server is functioning properly. By monitoring the number of bad values, hits, and misses, one can identify issues such as slow response times, memory leaks, and incorrect data values.

Normal value ranges for bad values, hits, and misses vary depending on the server and the application but, in general, the number of bad values should be close to zero, the number of hits should be significantly higher than the number of misses, and the number of misses should remain relatively low.

### Delete 

Delete Op requests are requests that a memcached client sends to a server to delete a key-value pair in the memory cache. Monitoring these requests is important to gain insight into the usage and effectiveness of the memcached system. Hits indicate the number of requests that were successful in deleting the key-value pair, while misses indicate the number of requests that failed to delete the key-value pair. Monitoring these requests can help identify any issues with the system, such as slow performance or memory leaks. It can also help to identify any misconfigurations or bugs that may be causing the delete requests to fail. Additionally, monitoring delete requests can help to identify any potential security risks, such as maliciously deleting key-value pairs. Normal value ranges for hits and misses will vary depending on the usage of the memcached system.

### Increment 

The increments operation, increments a numeric item's value by the specified offset. If the item's value is not numeric, an error will result. This operation will set the item to the `initial_value` parameter if the key doesn't exist.

The hits and misses dimensions indicate if the item to be incremented is present in the cache or not.

### Decrement 

Similarly, the decrements operation, decrements a numeric item's value by the specified offset. If the item's value is not numeric, an error will result. This operation will set the item to the `initial_value` parameter if the key doesn't exist.

The hits and misses dimensions indicate if the item to be decremented is present in the cache or not.

### Touch 

This chart measures the number of requests that the caching system receives, with hits indicating successful requests to the cache and misses indicating unsuccessful requests. 

## Troubleshooting Memcached with Netdata

### Anomaly Advisor
Anomaly Advisor lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

To learn more about how to use Anomaly Advisor to troubleshoot your Apache web server check out the [documentation](https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor) or visit the [anomalies tab](https://app.netdata.cloud/spaces/netdata-demo/rooms/apache/anomalies) in the demo space to play with it right now.
### Metric Correlations 
[Metric Correlations](https://learn.netdata.cloud/docs/cloud/insights/metric-correlations) lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

## Let us hear from you
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=memcached-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
