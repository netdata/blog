---
slug: 7-types-of-redis-latency
title: "7 types of Redis latency and how to fix it"
description: "7 types of Redis latency and how to fix it"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/thumbnail.png
tags: [community]
keywords: [netdata,community]
authors: shyam
---

Redis is designed to be fast. In most cases, it is. However, there are times when Redis may be slow, due to network issues, disk latency, or other factors. When this happens, it is important to be able to detect the slow down and investigate the cause of Redis latency.

<!--truncate-->

## Redis & latency

Latency is the maximum delay between the time a client issues a command and the time the reply to the command is received by the client. Redis has strict requirements on average and worst case latency.

Let’s take a look at the different forms of latency that can affect a Redis deployment and suggestions on how you can fix any potential latency issues that may arise:

## The 7 types of Redis latency

### 1. Intrinsic latency

This is latency that is inherently part of the environment where Redis is running. It is induced by the operating system kernel or, if you are using virtualization, by the hypervisor you are using.

To measure intrinsic latency, Redis provides a CLI command (The argument 100 indicates the number of seconds the test should run). However this test is CPU intensive and is likely to saturate a single CPU core.

```bash
$ ./redis-cli --intrinsic-latency 100
Max latency so far: 1 microseconds.
Max latency so far: 26 microseconds.
Max latency so far: 53 microseconds.
Max latency so far: 73 microseconds.
```

<b>How to fix it? </b>The best option to minimize intrinsic latency is to avoid virtualized environments, especially those with high load or noisy neighbors. 

### 2. Network latency

As the name suggests this is the latency introduced by the network and hardware for relaying the messages between the client and server. The typical latency of a 1 Gbit/s network is about 200 us, while the latency with a Unix domain socket can be as low as 30 us.

<b>How to fix it? </b>If you think network latency is a problem in your environment and want to optimize it, here are some guidelines:
<ul>
 	<li>Use a client that supports several commands to be pipelined together</li>
 	<li>If possible prefer a physical machine to a VM to host the server</li>
 	<li>If client and server are on the same host, then use unix domain sockets</li>
 	<li>Keep your connections as long lived as possible.</li>
</ul>

### 3. Command latency

Redis serves all the requests using a single thread in a sequential manner. This means when a request is slow to serve all the other clients will need to wait. Commands operating on many elements, such as <a href="https://redis.io/commands/sort">SORT</a>, <a href="https://redis.io/commands/lrem">LREM</a>, <a href="https://redis.io/commands/sunion">SUNION</a> or taking the intersection of two big sets can take a considerable amount of time. 

The CPU consumption of the main Redis process is a good indicator whether you have a slow command problem - if CPU is high when traffic is low the likely culprits are slow commands.

The Redis <a href="https://redis.io/commands/slowlog">Slow Log feature</a> allows you to get into the details of slow commands.

<b>How to fix it? </b>Avoid using slow commands against values composed of many elements, or run a Redis replica where you run all your slow queries so it does not affect other queries.

### 4. Fork latency

Redis forks background processes in order to generate RDB files in the background or rewrite AOF files if persistence is enabled. This fork operation which runs on the main thread can cause latency as well.

This latency could be problematic in scenarios where you have a large Redis instance running on a VM, where allocation and initialization of large memory chunks that are required for BGSAVE could be problematic.
<ul>
 	<li>Linux VM on EC2 (old instance type)   -&gt; 239.3 milliseconds per GB</li>
 	<li>Linux VM on EC2 (new instance type) -&gt; 10 milliseconds per GB</li>
</ul>
<b>How to fix it? </b>Avoid VMs running on <a href="https://xenproject.org/">Xen</a>, and if you are using EC2 use <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/virtualization_types.html">modern HVM based instances</a>. 

### 5. Transparent huge pages latency

If the Linux kernel has <a href="https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html">transparent huge pages</a> enabled, Redis incurs a big latency and memory usage penalty every time the fork call is used to persist on disk. 

<b>How to fix it? </b>Disable transparent huge pages using the following command:

```bash
echo never > /sys/kernel/mm/transparent_hugepage/enabled
```

### 6. Swapping latency

If a Redis page is moved by the kernel from memory to the swap, while Redis is using data stored in this page then the kernel will stop the Redis process in order to move the page back to main memory. 

This is obviously much slower than accessing a page already in memory - and could result in latency spikes being experienced by the Redis client.

<b>How to fix it? </b><b> </b>Lower the memory pressure in your system, by adding more RAM or avoiding running other memory hungry processes in the same system.

### 7. Disk I/O latency

The Redis AOF (Append Only File) persistence mechanism uses <a href="https://man7.org/linux/man-pages/man2/write.2.html">write(2)</a> and <a href="https://linux.die.net/man/2/fdatasync">fdatasync(2)</a> to write data to the append only file and flush the kernel buffer on disk. Both these system calls can induce latency, especially <a href="https://linux.die.net/man/2/fdatasync">fdatasync(2)</a> which can take anywhere from a few milliseconds to a few seconds to complete if there are other processes doing heavy I/O on the same system. 

<b>How to fix it? </b>Avoid running other processes that do I/O on the same system, use an SSD.

## Let us hear from you

If you haven’t already, <a href="https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=redis-latency">sign up now for a free Netdata account!</a> Feel free to check out the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/redis/overview/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=redis-latency">Redis demo room </a>to explore and interact with Netdata.

For details on all the Redis metrics that Netdata monitors, check out <a href="https://www.netdata.cloud/blog/redis-monitoring/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=redis-latency">the comprehensive Redis monitoring blog post</a>. 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github. </a>

Happy Troubleshooting!
