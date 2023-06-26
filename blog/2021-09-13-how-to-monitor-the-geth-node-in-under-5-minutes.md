---
slug: how-to-monitor-the-geth-node-in-under-5-minutes
title: "How to monitor the Geth node in under 5 minutes"
description: "How to monitor the Geth node in under 5 minutes"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/How-Geth-affect-the-CPU-charts.png
tags: [engineering,community,geth]
keywords: [netdata,engineering,community]
authors: team
---

<!--truncate-->


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/How-Geth-affect-the-CPU-charts-1200x629.png" alt="" class="wp-image-16229"/></figure>



This piece is a blog post version of a workshop I gave at <a href="https://ethcc.io/" target="_blank" rel="noreferrer noopener">EthCC</a> about monitoring an Ethereum Node using Netdata.



<strong>Disclaimer:</strong> Although we use Netdata, this guide is generic. We talk about metrics that can be surfaced by many other tools, such as Prometheus/Grafana or Datadog.



The contents are as follows:



<ul><li class="">Introduction to Ethereum Nodes</li><li class="">What is Netdata</li><li class="">How to monitor a system that runs go-ethereum (Geth)</li><li class="">How to monitor go-ethereum (Geth)</li></ul>



## Ethereum Nodes



Running a node is no small feat, as it requires increasingly more and more resources to store the state of the blockchain and quickly process new transactions.



Nodes are useful for both those who develop on Ethereum (dapp developers) and users.



For users, it’s crucial so that they can verify, independently, the state of the chain. Moreover, using their own node, they can both send transactions and read the current state of the blockchain more efficiently. This is important, as a range of activities require the lowest of latencies (e.g MEV).



For developers, it’s important to run a Node so that they can easily look through the state of the blockchain.



Given this reality, services like <a href="https://infura.io/" target="_blank" rel="noreferrer noopener">Infura</a> or <a href="https://www.alchemy.com/" target="_blank" rel="noreferrer noopener">Alchemy</a> have been created to offer “Ethereum Node-as-a-Service”, so that a developer or user can use their Ethereum Node to read the chain or send transactions.



This is not ideal, as users and developers need both the speed of their own node and the lack of dependency on an external actor who can go offline at any time.



## Running the Ethereum Node



Thus, running an Ethereum Node is not as a fringe activity as one outsider would expect, but rather common practice for experienced users and developers. On top of that, running an Ethereum node is one of the core principles of decentralization. If it becomes very hard or complex, the system becomes increasingly centralized, as fewer and fewer parties will have the capital and expertise required to run a node.



Geth is the most widely-used implementation of the Ethereum Node, written in Go.



## The Netdata Agent



The <a href="https://github.com/netdata/netdata" target="_blank" rel="noreferrer noopener">Netdata Agent</a> was released back in 2016 as an open-source project and since then it has gathered over 55K GitHub ✨.



TL;DR of netdata monitoring:



<ol><li class="">You run a single command to install the agent.</li><li class="">Netdata will auto-configure itself and detect <strong>all</strong> available data sources. It will also create sane default alarms for them.</li><li class="">It will gather every metric, every second.</li><li class="">It will produce, instantly, stunning charts about those metrics.</li></ol>



In other words, you don’t have to setup



<ul><li class="">a) A dashboard agent</li><li class="">b) A time series database (TSDB)</li><li class="">c) An alert system.</li></ul>



<strong>Netdata is all three.</strong>



## How to monitor your Ethereum Node


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/joker-1200x500.gif" alt="" class="wp-image-16231"/></figure>



EthCC was a blast, not only for the energy of the ecosystem, but also for how our workshop was received by node operators from a dozens of projects.



I was stunned to see how many professionals are struggling with monitoring their infrastructure, often using some outdated Grafana Dashboard or the default monitoring system of a cloud provider.



Let’s get right into it.



### Preparation



The first order of business is to install netdata on a machine that is already running Geth.



<strong>Note:</strong> Make sure you run Geth with the <code>--metrics</code> flag. Netdata expects the metric server to live in port <code>6060</code> and be accessible by <code>localhost</code>. If you have modifed that, we will need to make a configuration change in the collector so that we point it to your custom port.



To install Netdata, run:


```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```


Visit the Netdata dashboard at <code><node_ip>:19999</code>.



For illustration purposes, we run a public test Geth server at <a href="http://163.172.166.66:19999/" target="_blank" rel="noreferrer noopener">http://163.172.166.66:19999</a>.



### Action plan



We will not cover every single metric that is surfaced by Netdata. Instead, we will focus on a few important ones.



For these metrics, we will:



<ol><li class="">Talk about what the particular system metric means in general.</li><li class="">Discuss how to read these system metrics, no matter the workload.</li><li class="">Analyze how Geth affects these system metrics.</li></ol>



### How to read the dashboard



The dashboard is organized into 4 main areas:



<ul><li class="">The top utility bar. Particularly important to access the time picker and running alerts.</li><li class="">The main section is where the charts are displayed.</li><li class="">The right menu organizes our charts into sections and submenus. For example, the system overview section has many different submenus (e.g cpu) and each submenu has different charts.</li><li class="">The left menu concerns <a href="https://app.netdata.cloud/" target="_blank" rel="noreferrer noopener">Netdata Cloud</a>.</li></ul>



## System Overview section


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/System-overview-section-1-1200x417.png" alt="" class="wp-image-16233"/></figure>



First, we take a look at the System Overview section.



### Top-level Gauges



It has a nice review of the whole system. During the sync, we expect to see elevated <code>Disk Read/Write</code> and <code>Net inbound/outbound</code>. <code>CPU</code> usage will be elevated only if there is high use of Geth’s RPC server.



### CPU utilization chart

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/CPU-utilization-chart-2-1200x230.png" alt="" class="wp-image-16235"/></figure>


<strong>IOwait dimension</strong> It’s the time that the CPU waits for an IO operation to complete. It could be running other things, but it doesn’t.



<strong>How do I read this?</strong> High <code>iowait</code> means that the system is <code>iowait</code> constrained. Usually, this is related to Hard Disk work, but it could be other hardware as well. If I see a consistently low value, that means that I use the CPU efficiently.



<strong>softirq dimension</strong>



It’s the time spent on <a href="https://en.wikipedia.org/wiki/Interrupt_handler#:~:text=Interrupt%20handlers%20are%20initiated%20by,is%20the%20hardware%20interrupt%20handler." target="_blank" rel="noreferrer noopener">hardware interrupts handlers</a>. For example, network code is very <code>softirq</code> heavy, as the CPU spends time in <code>kernel</code> mode to handle the network packets.



<strong>How do I read this?</strong> It should be very low. Consistently high values mean that the system is not able to keep up with (probably) the network traffic.



### CPU Pressure Stall Information (PSI) chart

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/CPU-chart-3-1200x230.png" alt="" class="wp-image-16237"/></figure>



In the abstract, it’s a measure of how much time is spent waiting for a resource to become available. The CPU could run other tasks, but can’t find an available CPU core.



This is only available on Linux systems. FreeBSD and MacOS don’t support this, thus you won’t find this chart on these systems.



<strong>How do I read this?</strong> If you are not utilizing 100% of your CPU, this should be zero. Keep track of this for a couple of days to see the whole range of the “expected” spikes. You can set a new alert for a spike beyond the highest spike under normal load, that way you will know when an abnormal load is detected.



### CPU Load chart

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/CPU-load-chart-4-1200x196.png" alt="" class="wp-image-16239"/></figure>



It’s the running average of the processes that are waiting for resource availability. Historically, it has been the only measure of CPU performance issues.



The difference with <strong>CPU PSI</strong>:



<strong>Load</strong> measures how <em>many</em> processes are waiting for resource availability, while PSI measures <em>how much time</em> applications are waiting for resource availability.



Generally speaking, we care more about <code>PSI</code> than <code>Load</code>. If we are going to use <code>Load</code>, we should keep track of <code>load1</code> because by the time the other running averages are high, then it’s already too late. The system is already throttled.



A rule of thumb is to set an alarm for the following value: <code>8(or 16)*number_of_cpu_cores</code>. Note that this can greatly vary (even 4 times could be too high) and it’s possible that by the time the alert is raised, that you can’t interact with the system due to the load.



### How Geth affect the CPU charts



Regarding the <code>CPU utilization chart</code>, I see <code>iowait</code> at about ~17%. It’s the first evidence that something is not right in my Geth server. Either the network or disks are throttling my system. I see <code>softirq</code> almost non-existent, so disk becomes even more suspicious.



I see about 1-2% of <code>PSI</code>. It should be zero, as the CPU is at about 30% of utilization, but it’s not a bottleneck. Most probably, it means that Geth could be more optimized.



As soon as I start spamming my Geth node with RPC requests, I see a considerable bump in both the <code>CPU utilization</code> gauge and the <code>PSI</code> chart. By stress-testing my node, I can set sensible alerts.



In the following image, we can easily identify the time at which I started the <code>RPC request</code> spam to my Geth node.


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Disk-charts-5-1200x708.png" alt="" class="wp-image-16241"/></figure>



## Disk Charts

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Network-charts-7-1200x374.png" alt="" class="wp-image-16243"/></figure>



### Disk IO chart



The first chart measures the DiskIO. It’s necessary to run Disk benchmarks to truly find the peak of your system and set the alerts accordingly.



<strong>How do I read this?</strong> First I run my benchmarks to understand the peak performance of the disks. If I observe that during normal load the disk consistently reaches near the peak performance, then what I do is probably disk io bound and I need to upgrade my disk.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#PageIO-chart"></a>PageIO chart



It measures the data that is pulled from memory. Usually, it’s close to DiskIO.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#Disk-PSI-chart"></a>Disk PSI chart



Conceptually, it’s the same as CPU PSI. The amount of time that processes are waiting in order to be able to perform DiskIO.



<strong>How do I read this?</strong> The charts should be zero most of the time. If they are consistently non-zero, then the disk is a limiting factor on the system and we need to upgrade it.



<strong>Important Note</strong> Viewing your Netdata dashboard is actually heavy in Disk IO, as data is being streamed directly from the system to your browser. That means that you will need to look at this chart at a time when you weren’t viewing the dashboard.



### How Geth affect the Disk charts



This is the most clear indication that something is off with my disks.



The <code>Disk PSI</code> is about 30%, which means that for about 1/3 of the time, some tasks are waiting for Disk resources to be available. That means that my Disks are simply not fast enough.



To verify the correlation with Geth, I can simply stop the process and see the PSI decreasing considerably.



### RAM charts

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/RAM-charts-6-1200x548.png" alt="" class="wp-image-16245"/></figure>



### RAM utilization chart



It’s the absolute physical memory in use.



<strong>How do I read this?</strong> Ideally, I don’t want to see anything listed as <code>free</code>. If I have a lot of free memory, that means that I have more memory than I need. <code>used</code> should be approximately a bit above <code>50%</code> and it shouldn’t be a lot larger than <code>cached</code>.



<code>cached</code> is memory that is used by the kernel to cache disk files for faster access. It is not <code>used</code>, as the kernel will use that memory if a process requires it.



If <code>buffers</code> are very high, that means that the system is under heavy network load. Even in a large server, <code>buffered</code> should be a couple of hundred MBs. <code>buffers</code> are used to store network packets to be processed by the CPU.



<strong>Note</strong> A system where the main application is taking care of memory caching (instead of the system) could have a lot of <code>used</code> and almost no <code>cached</code>. This is very rare and probably does not concern most of us.



### RAM PSI chart



Conceptually, this is the same metric as CPU PSI.



<strong>How do I read this?</strong> If RAM PSI is consistently above zero, then the speed of my memory modules is a limiting factor. I need to get faster (not bigger) RAM.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#RAM-swap-usage-chart"></a>RAM swap usage chart



When the system can’t find the memory it needs, it creates files on the hard disk and uses them as a sort of <em>very</em> slow memory.



<strong>Note 1:</strong> It’s worth noting that mac, Linux, and FreeBSD have an unintuitive use of swap. They will remove the swap files when no running process is referencing them, <strong>not</strong> when memory is free. That means that a long-running process will continue to use swap files even if there is available memory.



To solve this, we should either reboot the system, restart the processes, or disable and enable swap.



<strong>Note 2:</strong> If you don’t see the swap chart, that means that the machine has no swap enabled. Netdata will not show charts that have zero values.



### How Geth affect the Ram charts



Geth is really gentle on RAM, consuming what we define in as command line argument. Since there is no swap, we can safely assume that we don’t need more RAM with the current configuration.



Moreover, since the <code>RAM PSI</code> is about 3%, I can safely assume that my RAM is fast enough for this workload.



## Network charts


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Network-charts-7-1-1200x374.png" alt="" class="wp-image-16247"/></figure>



### Total Bandwidth chart



It’s the total actual data that is being sent and received by the system.



<strong>How do I read this?</strong> You need a baseline to read this. If you have consistently more traffic than expected, then something is off.



<strong>Important Note</strong> Viewing your Netdata dashboard is actually heavy in network usage, as data is being streamed directly from the system to your browser. That means that you will need to look at this chart at a time when you weren’t viewing the dashboard.



### How Geth affects the Network charts



We should care about these charts only if they go out of the ordinary (e.g DDoS attack). Observe the baseline of the system (e.g mine is about 1-2 megabit/s) and set the alerts for above the highest spike.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#Softnet-chart"></a>Softnet chart



It counts network receive interrupts processed by the kernel.



<strong>How do I read this?</strong> We mainly care about 2 dimensions that should be zero most of the time. If you can’t see them, that’s a good thing, as Netdata will not display dimensions that are 0.



<ul><li class=""><code>dropped</code> should always be zero, if it is non-zero your system is having serious issues keeping up with network traffic.</li><li class=""><code>squeezed</code> should be zero, or no more than single digit. If it’s in the double digits or higher the system is having trouble keeping up, but not to the point of losing packets.</li></ul>



Personal computers that have been converted to homelab servers usually have non-zero dimensions, as they are not designed to handle a lot of network bandwidth.



### How Geth affects the Softnet chart



In reality, it is the other way around. If we see a high number of <code>dropped</code> or <code>squeezed</code> packets, that could explain strange Geth behavior. It simply is not receiving packets that it should!



### Disk Operations chart


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Disk-Operations-chart-8-1200x154.png" alt="" class="wp-image-16249"/></figure>



The number of completed operations on the disks.



This is important because it’s more taxing on the system to read/write the same amount of data in a high number of small operations, rather in a few larger ones.



The disk may be able to keep up with the write/read IO bandwidth, but not with the amount of operations that are being requested to perform that particular IO bandwidth.



### IO backlog chart

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Disk-Operations-chart-8-1-1200x154.png" alt="" class="wp-image-16251"/></figure>



The backlog is an indication of the duration of pending disk operations



<strong>How to read this?</strong> On an ideal system, this should be zero. In practice, this sill is non-zero every now and then, simply because of the IO that the system has.



It’s relevant to the baseline of the system. You want to see observe the graph for a specific period and set your alerts <strong>above</strong> the peaks that you see.



Note that if you run backups, these are particularly taxing on IO, so you will need to take those peaks into consideration.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#How-Geth-affects-the-Disks-charts"></a>How Geth affects the Disks charts



The first order of business is to locate the disk that is used by Geth to store it’s data.



We first see an increased utilization. If that utilization is approaching 100%, that is a clear indication that the Disk can’t handle the traffic that is being sent by Geth.



This will most likely result in <strong>Geth not syncing</strong>.



Continuing, we go to <code>IO backlog</code> and we see what we expected. There is about <code>100ms</code> constant IO backlog. Our Disk simply can’t perform fast enough. It’s good that the backlog is constant, that means that the Disk can keep up (but not fast enough for Geth to sync). If the backlog was ever increasing, it means that the Disk can’t keep up.



Now that we are sure of the bottleneck, we can observe the other charts to understand better <em>why</em> Geth is hammering our Disks. From what I see the <code>Read/Write IO bandwidth</code> is not terribly high.



A closer examination will bring us to the chart <code>disk_ops</code>, which shows the number of operations/s that the Disks performs. It does about 500 operations per second on the test machine, which would explain why the disk can’t keep up.



It’s not a matter of how much data is read/written on disk, but rather in how many operations that data is read/written. <strong>Geth does a lot of small operations that can be taxing on the disk.</strong>


## Networking Stack Section

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Networking-Stack-section-10-1200x262.png" alt="" class="wp-image-16257"/></figure>



### tcp chart



It shows TCP connection aborts.



<strong>How do I read this?</strong>



All the dimensions of this chart should be zero. If there are non-zero dimensions, that means that there is <em>something</em> in the network, that is not behaving well (e.g a router, the network card on the system, etc.) Consistently high numbers point to a bad network card and you will need to change that.



High numbers of <strong>connection aborts</strong> mean that your system can’t handle the number of connections, probably due to low available memory.



High numbers of <strong>time-outs</strong> mean that there is some error in the network path between your systems and the system with which you are having the connections.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#How-Geth-is-affecting-the-tcp-charts"></a>How Geth is affecting the tcp charts



Geth is a highly networked application, with peers connecting and disconnecting all the time. It’s expected to have some <code>baddata</code>, but it shouldn’t be worrying. If you observe elevated values, and it originates from Geth (e.g it lowers when Geth isn’t running), it’s good that you open a GitHub issue on the <a href="https://github.com/ethereum/go-ethereum" target="_blank" rel="noreferrer noopener">GitHub repository</a> of Geth.



## Applications Section


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Applications-section-11-1200x437.png" alt="" class="wp-image-16255"/></figure>



Interestingly, this section has the same group of metrics that are available in the <strong>System Overview Sectio</strong>n. The difference is that they are grouped in a per application group basis.



The application groups are defined in the <a href="https://github.com/netdata/netdata/blob/master/collectors/apps.plugin/apps_groups.conf" target="_blank" rel="noreferrer noopener">apps_groups.conf</a>.



The user can customize it by running the following command. We assume that the netdata configuration lives in <code>/etc/netdata</code>. Depending on the installation method, this can vary.



<code>/etc/netdata/edit-config apps_groups.conf</code>



The reason we group different processes into <code>application groups</code> is that the user cares about the “functionality” of a certain application, more than they care about the implementation details.



We care about the “web server”, not if it’s nginx or appache.



Moreover, the user could care about the aggregate behaviour all the “databases” that live in the system.



<strong>How do I read this?</strong>



Again, we use a baseline. We let the system running under normal load to define our baseline metrics. All the readings afterward will be against that baseline. Generally, we start from a general observation about the system (e.g high RAM usage) and then move to the <strong>applications section</strong> to identify which application is misbehaving.



## eBPF charts



Netdata offers a handful of eBPF charts out-of-the-box. With eBPF we can see in a per-application basis how the application is directly interacting with the Operating System (e.g how many <code>syscalls</code> it does to <code>do_fork</code>).



Although they are not particularly useful for Node Operators, they are <strong>very</strong> useful to Developers. Using Netdata, they can verify for example that their application is not having a memory leak or that it’s not forgetting to close a file that it opened.



If you are a developer in a Ethereum client, please do check out the eBPF charts. We would be grateful for you to try them in your workflow and share any feedback you may have over <a href="https://discord.gg/mPZ6WZKKG2" target="_blank" rel="noreferrer noopener">Discord</a> or our <a href="https://community.netdata.cloud/" target="_blank" rel="noreferrer noopener">Community Forums</a>.



Although I won’t go into the metrics themselves, here are some resources about eBPF as a technology:



<ul><li class=""><a href="https://ebpf.io/what-is-ebpf/" target="_blank" rel="noreferrer noopener">Documentation – What is eBPF</a></li><li class=""><a href="https://brendangregg.com/blog/2019-01-01/learn-ebpf-tracing.html" target="_blank" rel="noreferrer noopener">Blog-post – Learn eBPF Tracing: Tutorial and Examples</a></li><li class=""><a href="https://youtu.be/CiztMr3cFfA?t=8954" target="_blank" rel="noreferrer noopener">Youtube – eBPF + Netdata</a></li></ul>



## Geth section



As already mentioned, I have created a proof of concept integration between Geth and Netdata. It’s a collector that automatically detects a running Geth instance, it gathers metrics and it creates charts for them.



The Geth collector uses the Prometheus endpoint of the Geth node, available at <code>node:6060/debug/metrics/prometheus</code>. To activate the endpoint, we must start Geth with the CLI arguments <code>--metrics</code>.<code>./geth --metrics.addr 0.0.0.0 --metrics</code>Read more about it on the <a href="https://geth.ethereum.org/docs/interface/metrics" target="_blank" rel="noreferrer noopener">Geth docs</a>.



If you access the above path with your browser, you will see all the metrics that are exposed by Geth.



For example:

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/carbon-13-539x1200.png" alt="" class="wp-image-16259"/></figure>



This is a sample. You can find a full list of the available metrics on the <a href="http://163.172.166.66:6060/debug/metrics/prometheus" target="_blank" rel="noreferrer noopener">prometheus endpoint</a> of my test server.



To find the source code where the metrics are defined, you can do a <a href="https://github.com/search?q=org%3Aethereum+metrics.NewRegisteredMeter &type=code" target="_blank" rel="noreferrer noopener">GitHub search</a> in the codebase. It will help you understand what each metric means.



Before continuing with the metrics that I chose for the PoC, it’s important to note two things:



<ul><li>I am not a Node Operator, thus my expertise on the Geth-specific metrics is very limited. As you see, I only make a small comment about each chart, without offering any advice on <strong>how</strong> to read the chart.</li><li><strong>Geth actually exposes a lot of metrics</strong>. The selection below is only a small subset that I was able to identify as helpful. I assume that there are more metrics that would make sense to surface, but I may have missed them.</li></ul>



## Chaindata session total read/write chart


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Chaindata-session-total-readwrite-chart-15-1200x1047.png" alt="" class="wp-image-16261"/></figure>



Total data that has been written/read during the session (since Geth’s last restart).



Charts for both LevelDB and AncientDB.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#Chaindata-rate-chart"></a>Chaindata rate chart



Rate of data that are being written/read. Charts for both LevelDB and AncientDB



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#Chaindata-size-chart"></a>Chaindata size chart



The size of the Ancient and LevelDB databases. Useful to gauge how much storage you need.



### <a href="https://hackmd.io/48N0Ah1QRNOOsonoL5fj3w?view#Chainhead-chart"></a>Chainhead chart

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Chainhead-chart-16-1200x266.png" alt="" class="wp-image-16263"/></figure>



It shows the number of the block of the <code>header</code> and <code>block</code>. <code>header</code> is the latest block that your node is aware of. <code>block</code> is the latest block that has been processed and added to the local blockchain.



If these two dimensions are not the same, then the node is not synced.



<strong>Tip</strong>



A good addition to this chart is the <code>header</code> dimension from another node (or perhaps some service). Having the view of another node in the network can help us understand if our node is seeing what the majority of nodes are seeing.



### P2P bandwidth  & peers charts

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/P2P-bandwidth-and-peer-charts-17-1200x712.png" alt="" class="wp-image-16265"/></figure>



The number of peers that your node has and the bandwidth between your node and its peers.



In general, the optimum number of peers is around 30. This can be set as a command line argument when running Geth.



### Reorgs charts

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Reorg-charts-18-1200x464.png" alt="" class="wp-image-16267"/></figure>



With all the recent talk about reorgs, these charts will show the number of <code>reorgs</code> that have been executed in our node, as also the number of blocks that were added and dropped.



### TX pool charts

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Tx-pool-charts-19-1200x662.png" alt="" class="wp-image-16269"/></figure>



Metrics about the <code>tx pool</code> of our Geth node are not particularly actionable, but rather informational about the kind of transactions that are happening.



### Goroutines chart


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Goroutines-chart-1-20-1200x262.png" alt="" class="wp-image-16271"/></figure>



The number of <code>goroutines</code> is particularly important. With ~50 peers, you should expect about 500 <code>goroutines</code>, while with ~100 you can expect around 1,500. If you have considerably more, there is some bug in the Geth software and you should raise an issue on GitHub.



### RPC chart

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/RPC-chart-21-1200x256.png" alt="" class="wp-image-16273"/></figure>



For now, it simply shows how many succesful/failed <code>rpc calls</code> are performed in our node per-second.



A sudden increase in <code>rpc calls</code> can indicate a malicious activity (e.g DDoS). Note that a high number of RPC calls can strain the system considerably and a sudden increase in <code>CPU utilization</code> and <code>CPU PSI</code> will be immediately shown.



## Default Alerts

<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Default-alert-22-1200x713.png" alt="" class="wp-image-16275"/></figure>



When monitoring a system, it’s <strong>crucial</strong> that you setup alerts. The best monitoring system is the one where you never have to open the dashboard, except for a warning alert of an impeding incident.



The good news is that Netdata comes with a slew of default alerts, so most probably you will not have to set anything up.



To get a sense of the default alerts, visit the <a href="http://163.172.166.66:19999/" target="_blank" rel="noreferrer noopener">test server</a> I mentioned above and click on the alert button.



## How Geth affects the default alert


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Default-alert-22-1-1200x713.png" alt="" class="wp-image-16277"/></figure>



Geth affects the default alerts in 2 ways:



<ul><li class="">There is a default alert for Geth, that checks if Geth is synced or not, by simply comparing <code>chainhead_block</code> with <code>chainhead_header</code>. This alert will be raised until the Geth node is synced.</li><li class="">Geth may impose abnormal load on the disk. If Geth is functioning normally and a Netdata alert is raised, that means that we need to change the alert to a new default. Not all workloads are the same, and Netdata uses sane defaults that might not be suitable for some workloads.</li></ul>



### How to change a default alert



My test server is constantly triggering the <code>disk_space</code> alert. Let’s assume that we want to change that.



From the raised alert, we can see the <code>source</code> field. From that field, I get three pieces of information:



<ol><li class="">Netdata’s configuration lives in <code>/etc/netdata</code> (it can live in other places, depending on the installation method).</li><li class="">The configuration file that I care about is <code>health.d/disks.conf</code>.</li><li class="">The alert starts at <code>line 12</code> of the source file.</li></ol>



To change the alert:



<ol><li class="">ssh into the machine: <code>ssh root@163.172.166.66</code>.</li><li class="">run <code>sudo /etc/netdata/edit-config health.d/disks.conf</code>.</li><li class="">Find <code>line 12</code>.</li></ol>



<code>template: disk_space_usage</code>



<code>on: disk.space</code>


<div class="wp-block-group has-background-color has-foreground-background-color has-text-color has-background">
<pre class="wp-block-preformatted">class: Utilization
     type: System
 component: Disk
       os: linux freebsd
    hosts: *
 families: !/dev !/dev/* !/run !/run/* *
     calc: $used * 100 / ($avail + $used)
    units: %
    every: 1m
     warn: $this > (($status >= $WARNING ) ? (80) : (90))
     crit: $this > (($status == $CRITICAL) ? (90) : (98))
    delay: up 1m down 15m multiplier 1.5 max 1h
     info: disk $family space utilization
       to: sysadmin</pre>
</div>


The above is the current running alert. I can either comment out the entire alert definition by adding <code>#</code> in front of every line, or change the values.



The alert syntax is out of the scope of this blog post, but our <a href="https://learn.netdata.cloud/docs/agent/health/reference" target="_blank" rel="noreferrer noopener">documentation</a> should offer everything you need.



## Extending the Geth-Netdata integration



It’s trivial to extend the integration between Geth and Netdata. Be it with more charts and alerts or for other Ethereum Clients.



## More Netdata goodies

If you have reached thus far, you might be interested in other Netdata collectors, relevant to the operation of a Geth Node:



<ul><li class=""><a href="https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/smartd_log" target="_blank" rel="noreferrer noopener">smartd monitoring</a> with NVME capabilities being implemented by our community as we speak.</li><li class=""><a href="https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/nvidia_smi" target="_blank" rel="noreferrer noopener">Nvidia GPU monitoring</a></li><li class=""><a href="https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/anomalies" target="_blank" rel="noreferrer noopener">Experimental – automatic Anomaly detection</a></li><li class=""><a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations" target="_blank" rel="noreferrer noopener">Metric Correlations</a></li></ul>



## In conclusion


System and performance monitoring is an extremely complex subject, as there is a high number of interdependencies between the system and the workload. A single issue may surface in a dozen different places, from system metrics to logs and user-facing issues.



Geth in particular is a critical piece of infrastructure, and any possible downtime may have serious repercussions to both the operator and the end user.



For this reason, I want to dig more into the matter and publish more content that helps users and node operators in understanding their systems and work proactively.



<strong>I need you!</strong>



If you are a Node Operator, I would love to talk to you and learn more about the challenges that you are facing. My goal is to install Netdata on large nodes in production and observe the effects that Geth’s incidents have on the underlying systems.



By understanding the deeper interdependencies that Geth has with the underlying system, I hope to educate more users and operators in monitoring their systems and avoiding incidents.



You can find me on the <a href="https://discord.gg/mPZ6WZKKG2" target="_blank" rel="noreferrer noopener">Netdata Discord</a>, our <a href="https://community.netdata.cloud/" target="_blank" rel="noreferrer noopener">netdata community forums</a> and on <a href="https://twitter.com/odysseas_lam" target="_blank" rel="noreferrer noopener">twitter</a>!



## Kudos



I want to give some kudos to my fellow colleagues @ilyam8, @ferroin and, @kkaskavelis for making all this work possible 🚀
