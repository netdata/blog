---
slug: monitoring-disks-understanding-workload-performance-utilisation-saturation-latency
title: "Monitoring Disks: Understanding Workload, Performance, Utilization, Saturation, and Latency"
authors: satya
tags: [disks, monitoring, workloads, performance, utilisation, saturation, latency]
keywords: [disks, monitoring, workloads, performance, utilisation, saturation, latency]
image: ./img/stacked-netdata.png
---

![stacked-netdata](./img/stacked-netdata.png)

Netdata provides a comprehensive set of charts that can help you understand the workload, performance, utilization, saturation, latency, responsiveness, and maintenance activities of your disks.
In this blog we will focus on monitoring disks as block devices, not as filesystems or mount points. 

<!-- truncate -->

The `Disks` section in the `Overview` tab contains all the charts that are mentioned in this blog post.
![Disks-Overview](./img/disks-overview.png)

## Disk Workload and Performance

Netdata charts for monitoring the workload and the throughput of your disks:


* **Disk I/O Bandwidth** (`disk.io`): Displays the amount of data transferred to and from the disk. You can monitor read and write operations individually. 

* **Disk Completed I/O Operations** (`disk.ops`): Shows the number of completed disk I/O operations. 

* **Disk Merged Operations** (`disk.mops`): Shows the number of merged disk operations. 

* **Disk Total I/O Time** (`disk.iotime`): Displays the sum of the duration of all completed I/O operations, useful for understanding the overall workload on your disks. 

* **Average Completed I/O Operation Bandwidth** (`disk.avgsz`): Shows the average I/O operation size. 



### Merging of operations in Linux

The Linux kernel has a mechanism to optimize disk I/O performance by merging adjacent I/O operations before they are issued to the disk. This is particularly beneficial for HDDs, which have longer seek times compared to SSDs.

When the kernel receives multiple I/O operations, it first sorts them by their logical block addresses to minimize seek time. Then, it checks if any of the operations are adjacent or overlapping. If they are, the kernel combines them into a single, larger operation. By merging adjacent operations, the kernel can reduce the total number of I/O operations, decreasing the overhead of initiating individual I/O requests and improving overall disk performance.

Even in the case of SSDs, merging operations can help reduce the total number of I/O requests, which in turn can decrease the overhead associated with initiating individual I/O operations. It can also help distribute write operations more evenly across the SSD's memory cells, which can be beneficial for the SSD's wear leveling algorithms and overall lifespan.


### How does the `disk.ops` chart relate to the IOPS commitment we get from a cloud provider?

The `disk.ops` chart in Netdata shows the number of completed disk I/O operations per second for reads and writes. While this chart can give you a general sense of your disk's I/O activity, it might not provide a direct measure of the IOPS commitment you get from your cloud provider.

Cloud providers often define their IOPS commitment as the maximum number of input/output operations per second that a storage volume can handle. This commitment may be subject to factors such as storage type, size, and configuration, as well as the I/O characteristics of the workloads running on the volume.

To verify if you're getting the IOPS commitment from your cloud provider, you should consider monitoring the following aspects:



1. **Peak IOPS 
**Monitor the peak IOPS your storage volume achieves during periods of high I/O activity. You can compare these peaks to the IOPS commitment from your cloud provider to ensure you're receiving the performance you paid for. The `disk.ops` chart can help you identify peak IOPS, but remember that you need to aggregate the read and write operations to get a total IOPS value. 

2. **Sustained IOPS** 
Ensure that your storage volume can sustain the committed IOPS level over an extended period during high I/O activity. This may require observing the `disk.ops` chart over a longer time frame to find the average IOPS during high activity periods. 

3. **Latency** 
High IOPS commitments should be accompanied by low latency, as high IOPS performance with high latency can negatively impact the responsiveness of your applications. You can use Netdata's `disk.await` chart to monitor the average time for I/O requests issued to the device to be served (beware, it includes both the time spent in the queue and the time spent servicing the requests).

While the `disk.ops` chart can provide useful insights into your disk's I/O activity, you may need to supplement it with additional monitoring and analysis to verify that you're getting the IOPS commitment from your cloud provider. Comparing peak and sustained IOPS values and monitoring latency can help you ensure that you're receiving the performance you paid for.


## Disk Utilization and Saturation

Netdata provides the following charts for disk utilization and saturation:



* **Disk Utilization Time** (`disk.util`): Measures the amount of time the disk was busy with something, expressed as a percentage of the total working time. High utilization (near 100%) can be an indication of congestion, but not necessarily. This metric only indicates the percentage of time the disk was busy. Many disks, especially SSD and NVMe, may still be able to process additional requests in parallel. See below for a detailed discussion on parallelism.
* **Disk Busy Time** (`disk.busy`): measures the amount of time that a disk was busy with I/O operations. 

* **Disk Current I/O Operations **(`disk.qops`): Shows the number of I/O operations currently in progress, giving you a snapshot of the current workload on your disks. A high number of concurrent I/O operations could indicate that your storage system is struggling to keep up with demand.
* **Disk Backlog** (`disk.backlog`): Provides an indication of the duration of pending disk operations. By monitoring this metric, you can estimate the expected completion time for operations in progress and identify potential bottlenecks in your storage system. High backlog values may signal that your disks are saturated and unable to process I/O operations quickly enough. 



### Parallelism, Utilization and Saturation

High disk utilization (near 100%) can be an indication of congestion, especially for HDDs, which have mechanical limitations and longer seek times.

For SSDs and NVMe drives, high utilization (in `disk.util`) may not necessarily indicate congestion due to their parallelism capabilities, which allow them to handle multiple I/O requests simultaneously.

Parallelism is a feature of modern storage devices that enables them to process multiple I/O operations concurrently. This is achieved through multiple memory chips and I/O queues, allowing the storage device to manage a higher workload without impacting performance significantly.

When interpreting the `disk.util` chart, consider the following:



* For HDDs, high utilization could be a sign of congestion and an indication that the disk is struggling to handle the workload. Monitoring other metrics like latency (`disk.await`) and completed I/O operations (`disk.ops`) can provide additional insights into the HDD's performance under various workloads.
* For SSDs and NVMe drives, high utilization may not immediately signal congestion due to their parallelism capabilities. However, consistently high percentages should be monitored closely, as they could indicate that the storage device is nearing its maximum capacity to service I/O requests in parallel. In these cases, also consider monitoring latency (`disk.await`), completed I/O operations (`disk.ops`), and current I/O operations (`disk.qops`) to gain a comprehensive understanding of the storage device's performance.
* For NAS or cloud-provided network storage, high utilization can be influenced by both the underlying storage technology and the network infrastructure. In these scenarios, it is crucial to monitor additional network-related metrics like latency, bandwidth usage, and congestion, along with storage-specific metrics, to gain a complete view of the storage system's performance and potential bottlenecks.


## Disk Latency and Responsiveness

Netdata provides the following charts for disk latency and responsiveness:



* **Average Completed I/O Operation Time** (`disk.await`): This chart measures the average time it takes for I/O requests issued to the device to be served, including the time spent in the queue and the time spent servicing the requests. 

* **Average Service Time** (`disk.svctm`): This metric represents the average service time for completed I/O operations. It is calculated using the total busy time of the disk and the number of completed operations. Note that if the disk is capable of executing multiple parallel operations, the reported average service time might be misleading (lower than the actual), as it does not account for parallelism.

Generally SSD and NVMe disks have lower latency. For NAS or cloud-provided network storage, the latency and responsiveness can be influenced by both the underlying storage technology and the network infrastructure.

If you notice consistently high latency values, consider investigating other performance metrics, such as disk utilization (`disk.util`), completed I/O operations (`disk.ops`), and current I/O operations (`disk.qops`), to determine if the disk is experiencing performance issues or approaching its maximum capacity to service I/O requests in parallel.


## Disk Maintenance and Housekeeping Operations

The Linux disk subsystem performs two main maintenance and housekeeping operations on disks: discards and flushes.


### Discard Operations

Discard operations, also known as TRIM, are an important maintenance activity for storage devices that use flash memory technology, such as SSDs, NVMe devices, USB sticks, and SD cards. Discard operations ensure that the storage device always has a pool of pre-erased blocks ready to use, which can significantly improve write performance and reduce unnecessary wear and tear on the drive.

In Linux, discard operations are issued by the filesystem when a file is deleted or truncated, or when a block of data is moved from one location to another. When a discard operation is issued by the filesystem, the device driver forwards the command to the disk, which then marks the blocks that were freed as "available", and puts them into a pool of blocks that can be immediately written to in the future.

By using discard operations, disks can avoid the time-consuming process of erasing blocks when new data needs to be written. This can significantly improve the write performance of the device, especially in cases where small amounts of data need to be written to the device at a time. It also reduces the overall wear and tear on the drive, because it reduces the amount of data that needs to be written to the same blocks repeatedly.


### Flush Operations

A flush operation is another type of maintenance activity that is used by the Linux disk subsystem to ensure that data is written to a storage device in a timely and efficient manner.

When data is written to a storage device in Linux, it is first written to a cache in memory called the buffer cache. Once data is in the buffer cache, it is considered to be in a "dirty" state, meaning that it has been modified and needs to be written to the storage device. However, the kernel does not immediately write the data to the storage device. Instead, it waits until one of several conditions is met:



* The dirty writeback timeout expires 

* The amount of dirty data in the buffer cache exceeds a certain threshold 

* The amount of free memory in the system falls below a certain threshold 


When one of these conditions is met, the kernel begins a process called "writeback", which involves writing all dirty data in the buffer cache to the storage device. Writeback is triggered automatically by the disk subsystem, but it can also be triggered manually by the user or an application.

During writeback, the kernel walks through the list of dirty buffers in the buffer cache and writes each buffer to the appropriate location on the storage device. Once all dirty data has been written, the kernel updates the appropriate metadata on the storage device to reflect the changes.

Flush operations are a specific type of writeback operation that is triggered explicitly by the user or an application. A flush operation forces all dirty data in the buffer cache to be written to the storage device immediately, without waiting for the dirty writeback timeout to expire or for other conditions to be met.

Because flush operations involve writing data to the storage device, they are counted as write operations in the disk statistics, along with other types of write operations, such as when an application writes data directly to the storage device.

With a better understanding of discards and flushes, let's now explore the relevant metrics for monitoring these maintenance activities using Netdata:



* **Disk Completed Extended I/O Operations** (`disk.ext_ops`): This metric measures the number (after merges) of completed discard and flush requests. The `disk.ext_ops` chart has two dimensions: discards and flushes. Monitoring this metric can help you understand how frequently your storage device performs these maintenance activities. 

* **Amount of Discarded Data** (`disk.ext_io`): This metric measures the amount of discarded data that is no longer in use by a mounted file system. 

* **Disk Merged Discard Operations** (`disk.ext_mops`): This metric measures the number of merged discard operations. 

* **Disk Total I/O Time for Extended Operations** (`disk.ext_iotime`): This metric measures the sum of the duration of all completed discard and flush operations. Monitoring this metric can help you understand the overall time spent on these maintenance activities. 

* **Average Completed Extended I/O Operation Time** (`disk.ext_await`): This chart measures the average time for discard/flush requests issued to the device needed to be served. This includes the time spent by the requests in queue and the time spent servicing them. 

* **Average Amount of Discarded Data** (`disk.ext_avgsz`): Shows the average discard operation size. 



## Alerts related to disks

Netdata comes pre-configured with 2 alerts that are automatically attached to all disk block devices. Both of them are silent alerts, meaning that they don’t trigger alert notifications, but they pop-up notifications while viewing the dashboard.


### 10min_disk_utilization

This alert triggers a warning when the average disk utilization during the last 10 minutes is above or equal to 98%. Once it triggers it will automatically be cleared if the disk utilization over the last 10 minutes falls below 70%.


### 10min_disk_backlog

This alert triggers a warning when the average disk backlog during the last 10 minutes is above or equal to 5000ms. Once it triggers it will automatically be cleared if the disk backlog over the last 10 minutes falls below 3500 ms.

Related to disk block devices, Netdata can also monitor:



* Disk S.M.A.R.T. (Self-Monitoring, Analysis, and Reporting Technology) hardware attributes. Check [this](https://learn.netdata.cloud/docs/data-collection/monitor-anything/hardware/s.m.a.r.t.-attributes) for additional information. 

* Disk temperatures. Check [this](https://learn.netdata.cloud/docs/data-collection/monitor-anything/hardware/hard-drive-temperature) for additional information.

The Linux disk subsystem is packed with a wealth of additional advanced features, including software RAID arrays, compression, encryption, caching, and an array of filesystems. Netdata is already designed to monitor most of these features, providing real-time, low-latency insights into their activity.

With Netdata's automatic discovery process, all your disks are automatically detected, and you can easily access a fully automated visualization that provides a rapid and comprehensive overview of your disk and system performance. Whether you're looking to optimize your disk utilization, prevent congestion, or ensure that you're receiving the performance you paid for from your cloud provider, Netdata can help monitor, analyze, and optimize your disks with ease.