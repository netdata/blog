---
slug: unlock-the-secrets-of-kernel-memory-usage
title: Unlock the Secrets of Kernel Memory Usage
authors: satya
tags: [kernel, memory, vmalloc, slab,operating-system-monitoring]
keywords: [kernel, memory, vmalloc, slab]
image: ./img/stacked-netdata.png
---

![stacked-netdata](./img/stacked-netdata.png)

The `mem.kernel` chart in Netdata provides insight into the memory usage of various kernel subsystems and mechanisms. By understanding these dimensions and their technical details, you can monitor your system's kernel memory usage and identify potential issues or inefficiencies. Monitoring these dimensions can help you ensure that your system is running efficiently and provide valuable insights into the performance of your kernel and memory subsystem.

![mem-kernel](./img/mem-kernel.png)

<!-- truncate -->

## Slab

The [slab allocator](https://en.wikipedia.org/wiki/Slab_allocation) is a memory management mechanism introduced by Jeff Bonwick in 1994 to manage memory allocation for kernel objects. The main purpose of the slab allocator is to reduce memory fragmentation and improve the speed of memory allocation/deallocation. The slab allocator groups objects of the same size into "slabs" and caches the objects to speed up future allocations.

The slab allocator consists of three main components:



- **Cache**: A cache is a collection of slabs that store objects of the same type and size.

- **Slab**: A slab is a contiguous block of memory that contains multiple instances of the same object type. It can be in one of three states: full (no free objects), partial (some free objects), or empty (all objects are free).

- **Object**: An object is an instance of a kernel data structure, such as inode, dentry, or buffer_head.

When the kernel requires a new object, it checks if there is a free object in the corresponding cache. If not, it allocates a new slab and populates it with objects.


### How to interpret Slab patterns

- A steady or moderate increase in Slab memory usage is normal, as the kernel caches data structures for better performance.

- A sudden spike or continuous growth in Slab memory usage might indicate a memory leak or excessive caching, which could impact system performance or cause out-of-memory issues.


### Physical servers, VMs and containers


- Hardware devices and drivers may require kernel objects, which can increase Slab memory usage.

- In VMs, hardware emulation and additional drivers may lead to increased Slab memory usage compared to physical systems.

- When running containers, keep in mind they use kernel objects for various purposes, such as network or storage management, which can increase Slab memory usage.


## VmallocUsed

The [vmalloc (virtual memory allocator)](https://www.kernel.org/doc/html/latest/core-api/memory-allocation.html) is a kernel mechanism that allows allocation of non-contiguous physical memory regions that are mapped into a contiguous virtual address space. The main purpose of vmalloc is to allocate large memory regions when there is not enough contiguous physical memory available.

Vmalloc uses a technique called "paging" to map non-contiguous physical memory to a contiguous virtual address space. It breaks the memory into fixed-size chunks called "pages" and uses page tables to keep track of the mapping between virtual and physical addresses. When the kernel requests memory via vmalloc, it searches for available physical pages, allocates them, and maps them to contiguous virtual addresses.


### How to interpret VmallocUsed patterns?


- A low to moderate VmallocUsed value is normal for most systems, as the kernel typically uses vmalloc for specific purposes when contiguous memory is not available.

- A high VmallocUsed value, especially if it grows continuously, could indicate an issue with memory fragmentation, a memory leak, or excessive use of non-contiguous memory allocations.


### Physical servers, VMs and containers

- Hardware with large address spaces, such as NUMA systems, may require more extensive use of vmalloc, impacting the VmallocUsed metric.

- VMs may have different memory allocation characteristics, which could affect the usage of vmalloc. For example, the hypervisor may have limited contiguous memory available, causing the kernel to use vmalloc more frequently.

- Container runtimes or the workloads running inside the containers might allocate large memory regions, increasing VmallocUsed. Also host systems running containers with limited contiguous memory might lead to increased VmallocUsed.


## KernelStack

A kernel stack is a memory region allocated for each task (or thread) executed by the kernel. When the kernel is executing a task, it uses the kernel stack to store temporary data, function call information, and local variables. Each task has its own kernel stack, which is usually of a fixed size (e.g., 4KB, 8KB, or 16KB).

Kernel stacks are essential for task management and context switching. When the kernel switches from one task to another, it saves the current task's state (including register values and stack pointer) and loads the state of the next task. This allows the kernel to resume the execution of the next task from where it left off.


### How to interpret KernelStack patterns


- KernelStack memory usage depends on the number of tasks or threads the kernel is managing. In general, a moderate and stable KernelStack value is normal.

- A sudden increase or continuous growth in KernelStack memory usage might suggest an issue with task management, such as too many threads being spawned or a memory leak in the kernel stacks.


### Physical servers, VMs and containers

- The number of kernel tasks and threads depends on the hardware and the workload. A system with more CPU cores or devices may require more kernel threads, increasing KernelStack memory usage.

- In VMs, the hypervisor and additional virtual devices may generate more kernel tasks and threads, leading to increased KernelStack memory usage.

- Container runtimes and the workloads running inside the containers might generate additional kernel tasks and threads, increasing KernelStack memory usage. Also, running multiple containers on a single host might increase the number of kernel tasks and threads, impacting KernelStack memory usage.



## PageTables

[Page tables](https://en.wikipedia.org/wiki/Page_table) are hierarchical data structures used by the Memory Management Unit (MMU) in a processor to translate virtual addresses into physical memory addresses. The MMU uses a technique called "paging" to break memory into fixed-size chunks called "pages". Page tables keep track of the mapping between virtual and physical addresses for each page.

There are usually multiple levels of page tables, with each level containing a set of entries pointing to the next level. The final level contains the actual mapping between virtual and physical addresses. The number of levels depends on the architecture and the size of the virtual address space.

In x86-64 architecture, there are four levels of page tables: PGD (Page Global Directory), PUD (Page Upper Directory), PMD (Page Middle Directory), and PTE (Page Table Entry). Each entry in the page table contains information about the corresponding page, such as its physical address, access permissions, and status flags.

### How to interpret PageTables patterns

- PageTables memory usage is related to the number of mappings between virtual and physical memory addresses. A moderate and stable value is normal.

- A sudden increase or continuous growth in PageTables memory usage could indicate an issue with memory mapping, such as a large number of small memory allocations or a memory leak in the page table entries.


### Physical servers, VMs and containers

- Hardware with larger address spaces or more devices may require more extensive memory mapping, affecting PageTables memory usage.

- VMs running on hypervisors with hardware-assisted virtualization (e.g., Intel EPT or AMD NPT) may have different memory mapping behavior, impacting PageTables memory usage.

- Running containers with isolated memory namespaces may increase the number of memory mappings, affecting PageTables memory usage. Also, container runtimes or workloads with a large number of small memory allocations might increase PageTables memory usage.


## PerCPU

Per-CPU allocations are a mechanism used by the Linux kernel to allocate memory that is specific to a particular CPU core. This is useful for optimizing performance in multi-core systems, as it reduces the need for synchronization between cores and minimizes cache contention. Per-CPU allocations are primarily used for frequently accessed data structures, counters, and buffers.

The per-CPU allocator provides each CPU core with its own copy of a variable or data structure. This allows each core to access and modify its copy without needing to lock or synchronize with other cores. As a result, the performance impact of cache coherency and contention is reduced, leading to better scalability in multi-core systems.

When you create a per-CPU variable, the kernel allocates memory for each CPU core in the system, usually from a dedicated per-CPU memory pool. The size of the allocated memory depends on the size of the variable or data structure, as well as any padding required to ensure proper alignment for cache line boundaries. The PerCPU dimension in the mem.kernel chart represents the amount of memory allocated to the per-CPU allocator, excluding the cost of metadata.


### How to interpret PerCPU patterns


- PerCPU memory usage depends on the number of CPU cores and the amount of per-CPU data structures allocated. A stable and proportional value relative to the number of cores is normal.

- A sudden increase or continuous growth in PerCPU memory usage might suggest an issue with per-CPU data structures, such as a memory leak or excessive per-CPU allocations.


### Physical servers, VMs and containers

- Systems with more CPU cores will have higher PerCPU memory usage due to the per-CPU data structures allocated for each core. \

- In VMs, the number of virtual CPU cores and the underlying physical CPU cores may affect PerCPU memory usage. Additionally, the hypervisor's handling of per-CPU data structures may influence this metric.

### Conclusion

In conclusion, the `mem.kernel` chart in [Netdata](https://app.netdata.cloud/) provides valuable insights into the memory usage of various kernel subsystems and mechanisms. By understanding the technical details of each dimension - Slab, VmallocUsed, KernelStack, PageTables, and PerCPU - you can effectively monitor your system's kernel memory usage and identify potential issues or inefficiencies.

Interpreting these metrics requires considering the specific context of your system, including the hardware, the environment (such as running on a VM or in a Kubernetes cluster), and the expected behavior. In general, look for the following patterns:

- Sudden spikes or drops in any of these dimensions, which could indicate an issue or an unexpected change in the system's behavior.

- Continuous growth in any of these dimensions, which might suggest a memory leak or excessive resource usage.

- Disproportionately high values compared to the system's hardware resources, workload, or historical trends, which could indicate inefficiencies that need to be investigated further.
