---
title: Linux eBPF monitoring with Netdata
subtitle: 
date: 2020-02-21
author: 
related: ["", "", ""]
tags: 
  [
    "",
  ]
image: "."."""/img/blog/linux-ebpf-monitoring-netdata.png.png".png".png".png".png"""""
---
<img class="alignnone size-full wp-image-16799" src="/img/wp-archive/uploads/2022/03/linux-ebpf-monitoring-netdata.png" alt="" width="1200" height="600" />

Your application isn’t finished when you’ve closed the last <code>if</code> block and you lined up all the brackets. There’s a whole other world of testing, debugging, and optimization that you haven’t even touched yet.

To help you more safely step into that complex phase of making your application <em>even better</em>, we’ve just released a brand-new eBPF collector in <a href="https://staging-www.netdata.cloud/blog/product/release-1.20/">v1.20 of Netdata</a>. With this collector enabled, you can monitor real-time metrics of Linux kernel functions and actions from the very same monitoring and troubleshooting dashboard you use for watching entire systems, or even entire infrastructures.

With per-second metrics on system calls, file descriptors, virtual file system I/O, and process management, you can debug faster, get smarter about performance optimization, and save some of your valuable time.

<img class="alignnone size-full wp-image-16801" src="/img/wp-archive/uploads/2022/03/linux-ebpf-monitoring-netdata_01-1024x545-2.png" alt="" width="1024" height="545" />
<h6>An example of virtual file system (VFS) charts, made possible by the eBPF collector plugin</h6>
<h2>What is eBPF?</h2>
eBPF (extended Berkeley Packet Filter) is a virtual bytecode machine built into the Linux kernel that can be used for advanced monitoring and tracing. With eBPF, you can get detailed metrics about I/O and filesystem latency, CPU usage by process, and network performance, all while executing code in a safe and fast sandbox. You don’t need to recompile your kernel after building a custom module, and with eBPF, there’s no risk of crashing the kernel.

You can use eBPF to analyze how and when a process accesses files, when it makes system calls, whether it’s leaking memory or creating zombie processes, and a whole lot more. Several eBPF programs already exist, such as <code>bpftrace</code> and <code>bcc-tools</code>, and other well-known tools like <code>tcpdump</code> are converted into eBPF programs to return data.

Brendan Gregg of Netflix has called eBPF a <a href="https://www.brendangregg.com/blog/2016-03-05/linux-bpf-superpowers.html">“superpower”</a> and claims <a href="https://www.brendangregg.com/blog/2019-01-01/learn-ebpf-tracing.html">“eBPF does to Linux what JavaScript does to HTML”</a>.
<h2>How Netdata monitors eBPF metrics</h2>
Thanks to the new <a href="https://learn.netdata.cloud/docs/agent/collectors/ebpf.plugin/">eBPF collector</a> released in <a href="https://staging-www.netdata.cloud/blog/product/release-1.20/">v1.20</a> of Netdata, you now have access to this superpower!

To enable eBPF metrics collection, we wrote two custom eBPF programs for Netdata. The default, called <code>entry</code>, monitors calls to a variety of kernel functions, such as <code>do_sys_open</code>, <code>__close_fd</code>, <code>vfs_read</code>, <code>vfs_write</code>, <code>_do_fork</code>, and more. The <code>return</code> program also monitors the return of each kernel functions (aka errors) to give even more visibility into your system.

The eBPF collector then performs some calculations on the volume of these calls to update Netdata’s charts every second. Right now, the eBPF collector can track a number of valuable metrics:
<ul>
 	<li>Open/closed file descriptors</li>
 	<li>Virtual file systems: deleted objects, IO calls, and bytes read/written</li>
 	<li>Processes and threads created</li>
 	<li>Exited tasks, including possible zombie processses</li>
</ul>
These can all be used for application monitoring, debugging, and better understanding how the Linux kernel handles the software you’ve written. If you’d like to get started right away, load up your dashboard to find eBPF charts and read our <a href="https://learn.netdata.cloud/docs/agent/collectors/ebpf.plugin/">eBPF collector documentation</a> for details. Otherwise, let’s dive into some of the interesting things you can find about your systems and applications via eBPF monitoring.
<h2>Troubleshoot application performance with eBPF</h2>
In the <strong>Files</strong> section, Netdata monitors how many files various processes open and close during each second-long interval. If you enable the <code>return</code> eBPF program, which does require a little more resources, you can also view errors returned on calls to <code>do_sys_open</code> and <code>__close_fd</code>.

Let’s say you’re building an application and notice that after running it for an extended time, the host system slows down. There could be a lot of reasons for this, but one could be that your application is opening files but not properly closing them after an appropriate time. In this case, you would see the two lines in the first chart diverge, as there are more open descriptors than closed.

<img class="alignnone size-full wp-image-16803" src="/img/wp-archive/uploads/2022/03/linux-ebpf-monitoring-netdata_02-980x311-1.png" alt="" width="980" height="311" />
<h6>See how the green (open) line is generally larger than the red (close) line? This discrepancy could reveal bugs in your application.</h6>
Too many open files <em>could</em> be responsible for slowing down the system. It may not be the root cause of your application’s performance troubles, but you can use this valuable information to debug your application by focusing on where it opens and closes files using functions like <code>open(2)</code>, <code>openat(2)</code>, and <code>close(2)</code>.
<h2>Combine Netdata’s real-time metrics with eBPF tools</h2>
Having real-time eBPF metrics on hand can help guide you to the next stage in troubleshooting anomalies with your applications and services. For example, the <code>ebpf.io</code> chart shows the volume of calls to the <code>vfs_read</code> function. Is that number is suspiciously high all of a sudden? Maybe it’s to move to the command line.

<img class="alignnone size-full wp-image-16805" src="/img/wp-archive/uploads/2022/03/linux-ebpf-monitoring-netdata_03-1024x242-1.png" alt="" width="1024" height="242" />
<h6>Detailed I/O information from the kernel can help you decide where to go next in your debugging journey.</h6>
You can use <code>bpftrace</code> to produce a histogram of <code>vfs_read</code> latency for a program running on a certain PID. In this case, a Netdata agent running on PID 1499.

```
bpftrace -e 'kretprobe:vfs_read / 
pid == 1499 / 
{ @bytes = hist(retval); }
'Attaching 1 probe...^C@bytes: 
[0]                 5690 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|[1]         78 |                                                    |[2, 4)               325 |@@                                                  |[4, 8)               477 |@@@@                                                |[8, 16)             2983 |@@@@@@@@@@@@@@@@@@@@@@@@@@@                         |[16, 32)            1190 |@@@@@@@@@@                                          |[32, 64)             429 |@@@                                                 |[64, 128)            123 |@                                                   |[128, 256)           224 |@@                                                  |[256, 512)          1995 |@@@@@@@@@@@@@@@@@@                                  |[512, 1K)           1244 |@@@@@@@@@@@                                         |[1K, 2K)             155 |@                                                   |[2K, 4K)             373 |@@@                                                 |[4K, 8K)              95 |                                                    |
```

If a tool like <code>bpftrace</code> reveals that your application is making too many small-byte reads, maybe there’s an opportunity to optimize it and improve overall performance. By correlating Netdata’s real-time metrics with other eBPF tools, you can more quickly determine which next steps you should take to troubleshoot and resolve a performance anomaly in your applications.
<h2>Find and eliminate the zombies</h2>
In the <strong>Process</strong> group, the <code>ebpf.exit</code> chart monitors two cruical moments in the lifecycle of a process or thread. First, with the green <code>process</code> dimension, when the process/thread tells the kernel it’s ready to be stopped. Second, with the orange <code>task</code> dimension, when the process is stopped and removed from the queue. But what if these events do not happen in sequence, as expected?

<em>A zombie process is born.</em>

And that is exactly what the <code>ebpf.process_status</code> chart is for: It shows both the difference between processes and threads created via the <code>process</code> dimension, but also the number of possible zombie processes running on the system. For example, if you create a few thousand zombie processes with a <a href="https://www.refining-linux.org/archives/7-Dr.-Frankenlinux-or-how-to-create-zombie-processes.html">“zombie factory” program</a>:

<img class="alignnone size-full wp-image-16807" src="/img/wp-archive/uploads/2022/03/linux-ebpf-monitoring-netdata_04-1024x195-1.png" alt="" width="1024" height="195" />
<h6>Zombie processes galore! With eBPF, you know exactly when your system fails to stop tasks and spawns yet another zombie.</h6>
Knowing when your system creates zombie processes can be invaluable in diagnosing why your software isn’t working the way you expect.
<h2>What’s next?</h2>
Our eBPF collector is by no means finished. Future releases will include dramatic improvements to which eBPF metrics you can collect, how they’re visualized on Netdata’s dashboard, and more content about how you can use these real-time kernel metrics for tracing and debugging all things Linux kernels. Until then, we encourage you to poke around and <a href="https://github.com/netdata/netdata/issues/new?labels=bug%2C+needs+triage&amp;template=bug_report.md">let us know</a> if you have ideas about how we could improve it in further releases.

New installations of the Nedata Agent will have eBPF monitoring installed and enabled by default, so go ahead and download the Agent. Then, navigate to <code>http://localhost:19999</code> or <code>http://NODE:19999</code>to see real-time eBPF metrics on your dashboard!

<a href="https://learn.netdata.cloud/docs/get" target="_blank" rel="noopener"><button>Get Netdata Agent</button></a> <a href="https://learn.netdata.cloud/docs/agent/collectors/ebpf.plugin/" target="_blank" rel="noopener"><button>Learn more about eBPF monitoring</button></a>
