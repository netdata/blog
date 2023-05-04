---
slug: understanding-huge-pages
title: Understanding Huge Pages
authors: satya
tags: [memory, ram, huge-pages, monitoring]
keywords: [memory, ram, huge-pages, monitoring]
image: ./img/stacked-netdata.png
---

![stacked-netdata](./img/stacked-netdata.png)

Huge pages are a memory management technique used in modern computer systems to improve performance by using larger memory blocks than the default page size. They help reduce the pressure on the Translation Lookaside Buffer (TLB) and lower the overhead of managing memory in systems with large amounts of RAM.

To understand what they are and how they improve performance, we first need to understand how modern computers use their physical memory.

<!-- truncate -->

## Virtual Memory and Paging

Virtual memory and paging are two concepts that work together to manage memory efficiently and provide an abstraction layer between physical memory and applications.


### Virtual memory

Virtual memory is a technique that provides an abstraction layer between the physical memory (RAM) and the applications running on a computer. It allows each process to have its own private address space, which is isolated from the address spaces of other processes. This ensures that one process cannot directly access the memory of another process, providing security and stability.

Virtual memory also allows a computer to use more memory than is physically installed by using disk storage as an extension of the physical memory. This is achieved through a technique called "swapping" or "paging" (discussed below), where portions of memory are temporarily stored on disk and loaded back into RAM when needed.

The main benefits of virtual memory include:



- **Isolation:** 
Each process has its own address space, preventing accidental or malicious access to another process's memory.

- **Efficient memory utilization:** 
Processes only need to have their active portions in physical memory, allowing the system to run more applications concurrently.

- **Simplified memory management:**
The operating system can provide a consistent view of memory to applications, regardless of the underlying physical memory layout.



### Paging

Paging is the mechanism that enables virtual memory to work. It involves dividing the virtual memory address space into fixed-size units called pages, and the physical memory into fixed-size units called frames. The size of a page is typically the same as that of a frame (e.g., 4KB on x86 systems). The operating system maintains a mapping between virtual pages and physical frames, called the **page table**.

When an application accesses memory, it uses virtual addresses. The operating system, with the help of the CPU's memory management unit (MMU), translates these virtual addresses into physical addresses using the page table. This translation is called "paging" or "page translation."

If the required page is not present in the physical memory (a "page fault"), the operating system fetches the page from disk storage (if it was swapped out) or allocates a new page in memory (if it's a new allocation). Then, the page table is updated with the new mapping, and the application can continue executing.


## Translation Lookaside Buffers (TLB)

When a CPU accesses memory using a virtual address, it needs to translate that address into a physical address. This translation process involves looking up the virtual address in the page table, which contains mappings between virtual pages and physical frames. However, accessing the page table can be slow, as it resides in the main memory (RAM) and can span multiple levels (e.g., in multi-level paging).

To speed up address translation, the CPU uses a TLB to cache recent virtual-to-physical address translations. The TLB is much faster than main memory because it's a small, specialized cache built within the CPU. When the CPU needs to translate a virtual address, it first checks the TLB for the translation. If the translation is found in the TLB (a "TLB hit"), the CPU can quickly access the corresponding physical memory.

If the translation is not found in the TLB (a "TLB miss"), the CPU must access the page table in main memory to perform the translation. This process is called a "page table walk" and can be time-consuming. After the translation is obtained from the page table, the CPU updates the TLB with the new translation, so future accesses to the same virtual address can benefit from the TLB cache.


## Huge Pages

As the amount of physical memory increases, the number of TLB entries required to manage the memory also increases, leading to more TLB misses and reduced performance.

Huge pages address this issue by using larger memory blocks (e.g., 2MB or 1GB) that can be mapped using a single TLB entry. By using huge pages, more memory can be managed with fewer TLB entries, resulting in fewer TLB misses.

This improves performance for memory-intensive applications in the following ways:



1. **Reduced TLB pressure:**
As huge pages are larger than regular pages, fewer TLB entries are required to manage the same amount of memory. This leads to fewer TLB misses and better performance for memory-intensive applications.

2. **Lower memory management overhead:**
With fewer pages to manage, the operating system spends less time updating and maintaining page tables.

3. **Reduced memory fragmentation:**
Large memory allocations are more likely to be contiguous when using huge pages, reducing internal and external fragmentation.



## HugeTLBfs

Linux provides a feature called HugeTLBfs, which allows applications to explicitly use huge pages.

HugeTLBfs requires application developers to make changes to their code to use huge pages (e.g., using `mmap()` with the `MAP_HUGETLB` flag or `shmget()` with the `SHM_HUGETLB` flag). So, HugeTLBfs can only be used if the application has been developed to make use of it.


## Transparent HugePages (THP)

On the other hand, THP is a Linux kernel feature that automatically backs virtual memory with huge pages, without requiring any changes to the application code.

THP monitors memory usage and can promote smaller pages to huge pages when it's beneficial, or demote them back to smaller pages when it's not. THP works with anonymous memory mappings (memory not backed by files on disk) and tmpfs/shmem (temporary file systems in memory). THP aims to provide the benefits of huge pages with minimal effort from developers and system administrators.

### Pros of Transparent HugePages (THP):


1. **Improved performance:**
THP can improve performance for memory-intensive applications by reducing TLB misses and lowering memory management overhead. This is particularly beneficial for systems with large amounts of RAM.

2. **Automatic management:**
THP automatically manages the promotion and demotion of page sizes, requiring no modifications to application code or explicit huge page allocations. This simplifies the process of using huge pages and makes it accessible to a wider range of applications.

3. **Works with anonymous memory and tmpfs/shmem:**
THP supports anonymous memory mappings (memory not backed by files on disk) and tmpfs/shmem (temporary file systems in memory), which are common use cases for memory-intensive applications.

4. **Configurable:**
THP behavior can be tuned through the sysfs interface or kernel boot parameters, allowing system administrators to control aspects such as allocation policies and defragmentation.

### Cons of Transparent HugePages (THP):



1. **Suboptimal memory usage:**
THP may promote smaller pages to huge pages even when it is not beneficial, which can lead to increased memory usage. This can be particularly problematic for applications with irregular or unpredictable memory access patterns.

2. **Latency spikes:**
The process of promoting and demoting pages can introduce latency spikes, especially during memory compaction and defragmentation. This can negatively impact the performance of latency-sensitive applications.

3. **Limited control:**
While THP simplifies huge page usage by automating it, this can also limit the control that developers have over memory allocation. For applications that require fine-grained control over huge page allocations, the HugeTLBfs interface may be more suitable.

4. **Compatibility issues:**
Some applications may not work well with THP or may encounter performance regressions due to the automatic management of page sizes. In such cases, it might be necessary to disable THP for specific applications or system-wide.

5. **Fragmentation:**
In some cases, THP might cause memory fragmentation, which can make it more difficult to allocate huge pages during runtime. This can lead to suboptimal performance or even allocation failures.

6. **Overhead of background processes:**
THP introduces additional background processes, such as `khugepaged`, which is responsible for promoting smaller pages to huge pages. In some cases, the overhead of these processes might outweigh the performance benefits of using THP.

7. **Difficulty in monitoring:**
When using THP, memory statistics and usage may become more difficult to understand and monitor. For example, the total amount of memory used by huge pages might not be immediately apparent from standard memory statistics.

## Recommendations by popular application developers

There are some well-known applications that have recommendations regarding HugePages usage based on their specific memory access patterns and performance characteristics. 

Here are a few examples:

1. **MongoDB:** 
[The MongoDB documentation recommends disabling THP](https://www.mongodb.com/docs/manual/tutorial/transparent-huge-pages/) due to potential performance issues. MongoDB's memory usage pattern can lead to suboptimal memory allocation when using THP, which may result in reduced performance.

2. **Redis:**
[The Redis documentation also suggests disabling THP](https://redis.io/docs/management/optimization/latency/). It states that THP may have a negative impact on Redis performance due to the increased latency caused by memory defragmentation during the allocation of huge pages.

3. **PostgreSQL:**
PostgreSQL does not have an official recommendation regarding THP usage. However, [PostgreSQL has added support for HugePages for shared buffers](https://www.postgresql.org/docs/current/kernel-resources.html#LINUX-HUGE-PAGES), meaning that it can use them when requested, without THP enabled.

4. **MySQL:**
There is no official recommendation from MySQL regarding THP usage. However, [MySQL has added support for HugePages for InnoDB](https://dev.mysql.com/doc/refman/8.0/en/large-page-support.html), meaning that it can use them when requested, without THP enabled.

5. **Oracle Database:**
[Oracle recommends disabling THP](https://docs.oracle.com/en/database/oracle/oracle-database/19/ladbi/disabling-transparent-hugepages.html), due to memory allocation delays during runtime.

6. **Apache Cassandra:**
[Apache Cassandra documentation recommends disabling THP](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/install/installRecommendSettings.html), due to noticeable performance problems when Linux tries to defrag 2MB pages.

7. **Elasticsearch:**
Elasticsearch does not have an official recommendation regarding THP usage. However, there is a [discussion where the core developers of Elasticsearch made tests and they experienced a degradation of performance by 7%](https://github.com/elastic/elasticsearch/issues/26551).

8. **Java Virtual Machine (JVM):**
The use of THP with JVM-based applications (such as Apache Tomcat, Hadoop, or Spark) can have mixed results. Some users have reported performance improvements with THP enabled, while others have experienced performance regressions or increased garbage collection (GC) pauses.

9. **KVM/QEMU (Virtualization):**
For virtualization platforms such as KVM and QEMU, the benefits of using THP can vary depending on the workloads running on the virtual machines. Some users have reported improved performance with THP enabled, while others have experienced performance regressions.
For KVM/QEMU environments, [Suse has observed a 1000x decrease in page faults](https://documentation.suse.com/sles/15-SP1/single-html/SLES-vt-best-practices/index.html) when running synthetic workloads with contiguous memory access patterns. However, as they comment, workloads with sparse memory access patterns (like databases) may perform poorly with THP, so it needs to be disabled.

Although these recommendations and experiences are not that promising and have led many users to disable THP globally, it seems that this technology plays a crucial role in the future of memory management in Linux systems. The 4k TLB just cannot keep up with the current needs of computing. As [this user says](https://lwn.net/Articles/929492/), currently (April 2023) Meta on its 64GB servers observes close to 20% of the execution cycles to be handling TLB misses, making THP a necessity for common applications.

There is currently a lot of activity around THP. More and more kernel patches, (check also [this one](https://lwn.net/Articles/817905/)), claim that the problem of latency spikes due to defragmentation is greatly improved in their tests, so the Linux community is probably very close to a breakthrough in this area.


## How can Netdata help?

In the “Memory” section of the dashboard, the “hupegapes” subsection will automatically appear if THP is enabled on a system.

The first chart shows the current THP memory. In this specific instance, we see how THP compacts small 4KB pages into 2MB huge pages over time. This process is totally transparent to the applications running.

![mem-thp](./img/mem-thp.png)

Next to it, there are 3 charts that show THP memory allocations. There are 3 kinds of allocations THP does, on page fault, mapped file allocations and huge zero page allocations:

![mem-thp-faults](./img/mem-thp-faults.png)

After the allocation charts, there are 2 charts that present how THP a) collapses 4KB pages into 2MB pages and b) splits 2MB pages into 4KB pages:

![mem-thp-collapse](./img/mem-thp-collapse.png)


And finally, there is a chart that presents the compaction process of THP. In this chart, there is a dimension called `stall`, which shows the number of times an application was stalled during a memory allocation, due to THP trying to compact memory to make room for a huge page. In our tests, we couldn’t make it trigger, probably because this requires memory to be severely fragmented to happen.

![mem-thp-compact](./img/mem-thp-compact.png)

## Checking memory fragmentation

Memory fragmentation is exposed via debugfs in Linux. To check the current memory fragmentation, execute:


```
sudo cat /sys/kernel/debug/extfrag/extfrag_index
```

The output looks like this:

```
Node 0, zone      DMA -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 
Node 0, zone    DMA32 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 
Node 0, zone   Normal -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 -1.000 
```


When the index is closer to 0, the more the memory allocation is likely to fail due to insufficient memory. When the index is closer to 1000, the more the allocation is likely to fail due to excessive external fragmentation. An index of -1 means that allocations will not fail.


## Disabling THP

To view the current THP configuration:

```
cat /sys/kernel/mm/transparent_hugepage/enabled
```

If the value is `always`, execute the following commands:

```
echo never > /sys/kernel/mm/transparent_hugepage/enabled
echo never > /sys/kernel/mm/transparent_hugepage/defrag
```
