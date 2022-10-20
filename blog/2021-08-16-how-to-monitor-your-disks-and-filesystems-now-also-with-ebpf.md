---
slug: how-to-monitor-your-disks-and-filesystems-now-also-with-ebpf
title: "How to monitor your disks and filesystems, now also with eBPF"
description: "How to monitor your disks and filesystems, now also with eBPF"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/eBPF-monitoring-1536x932-1.png
tags: [engineering,product]
keywords: [netdata,engineering,product]
authors: team
---

<!--truncate-->

<div class="et_pb_module et_pb_text et_pb_text_0 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

<img class="alignnone size-medium wp-image-16371" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/eBPF-monitoring-1536x932-1-600x364.png" alt="" width="600" height="364" />

## Introduction to eBPF

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_1 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Current IT monitoring software lacks the necessary metrics for minimizing downtime for systems and applications. Most provide system and application metrics but there is much more than this required for properly monitoring your infrastructure. With <a title="eBPF" href="https://ebpf.io/" target="_blank" rel="noopener">eBPF</a> there is a technological advancement that allows monitoring software to provide rich information from the Linux kernel and present it. eBPF monitoring, specifically, provides a better understanding of what exactly is occurring on internal systems, which helps to identify where performance improvements can be made.

At Netdata we are in the position to leverage the power of eBPF to enable your team to :
<ul>
 	<li aria-level="1">Get the most out of the Linux kernel to offer monitoring insights based on data directly gathered from the Linux kernel that’s been never seen before.</li>
 	<li aria-level="1">Have improved monitoring coverage from new, additional metrics and charts that have richer information about areas such as hard disks, filesystems, and more.</li>
 	<li aria-level="1">Enrich alerts with a new set of use cases, based on the new eBPF charts,</li>
 	<li aria-level="1">Have more information about the Linux kernel and its hidden, but lucrative secrets.</li>
</ul>
As a base, we’re using code originally developed by <a title="IOvisor" href="https://www.iovisor.org/" target="_blank" rel="noopener">IOvisor</a> with the <a title="BCC tools" href="https://github.com/iovisor/bcc" target="_blank" rel="noopener">BCC tools</a> and <a title="Cloudflare" href="https://www.cloudflare.com/" target="_blank" rel="noopener">Cloudflare</a> with the <a title="eBPF exporter" href="https://github.com/cloudflare/ebpf_exporter" target="_blank" rel="noopener">eBPF exporter</a>; we are extremely thankful for their contribution and we intend to increase the reach of their work by distributing the value that can be derived from these tools to all of you.

Netdata will be a superset of all eBPF tools out there. Furthermore, we’re simplifying the whole process before you visualize this information by eliminating overhead on configuration. With Netdata, you can install our monitoring Agent with a single command, connect it to a <a title="Space" href="https://learn.netdata.cloud/docs/cloud/spaces" target="_blank" rel="noopener">Space</a> in <a title="Cloud" href="https://app.netdata.cloud/?utm_source=website&amp;utm_content=get_netdata_button1" target="_blank" rel="noopener">Cloud</a> and get out-of-the-box eBPF monitoring, avoiding the complexity of finding eBPF tools that require compiling, running, collecting, and storing output plus configuration required for developing visualizations for troubleshooting. We take care of all this complexity for you. Simply, <a title="enable the eBPF on your agents" href="https://learn.netdata.cloud/docs/agent/collectors/ebpf.plugin" target="_blank" rel="noopener">enable the eBPF on your agents</a> and you’re good to go!

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_2 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h3>Disk monitoring and alerting</h3>
<img class="alignnone size-medium wp-image-16373" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-11.44.30-AM-2-600x340.png" alt="" width="600" height="340" />
<div class="et_pb_module et_pb_text et_pb_text_3 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Netdata monitors all your Disks by offering many charts out-of-the-box on ready-made dashboards. This data includes, but is not limited to:
<ul>
 	<li aria-level="1"><b><i>Disk I/O Bandwidth</i></b><i>:</i> how much data is transferred to and from disk</li>
 	<li aria-level="1"><b><i>Amount of Discarded Data</i></b><i>:</i> the number of sectors read from, written to, or <a title="discard" href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/managing_storage_devices/discarding-unused-blocks_managing-storage-devices" target="_blank" rel="noopener">discard</a> from this block device. To configure discarding, visit this <a title="documentation" href="https://wiki.gentoo.org/wiki/SSD" target="_blank" rel="noopener">documentation</a> and for more information on using discarding and Netdata dashboards, you can refer to the <a title="article" href="https://lwn.net/Articles/347511/" target="_blank" rel="noopener">article</a> to learn more.</li>
 	<li aria-level="1"><b><i>Disk Completed I/O Operations</i></b><i>:</i> total number of reads or writes completed successfully</li>
 	<li aria-level="1"><b><i>Disk Completed Extended I/O Operations</i></b><i>:</i> the number of discarded blocks and flushes after an I/O operation is completed</li>
 	<li aria-level="1"><b><i>Disk Current I/O Operations</i></b><b> with I/O: </b>operations currently in progress.</li>
 	<li aria-level="1"><b><i>Disk Backlog:</i></b> the duration of pending disk operations</li>
 	<li aria-level="1"><b><i>Disk Busy Time</i></b> measuring the amount of time the disk was busy</li>
 	<li aria-level="1"><b><i>Disk Utilization Time </i></b></li>
 	<li aria-level="1"><b><i>Average Completed I/O Operation Time</i></b> for reads and writes that were completed successfully</li>
 	<li aria-level="1"><b><i>Average Completed Extended I/O Operation Time</i></b> with Discards and Flushes time</li>
 	<li aria-level="1"><b><i>Average Completed I/O Operation Bandwidth </i></b></li>
 	<li aria-level="1"><b><i>Average Amount of Discarded Data</i></b></li>
 	<li aria-level="1"><b><i>Average Service Time for completed I/O operations</i></b></li>
 	<li aria-level="1"><b><i>Disk Merged Operations</i></b> as Reads and writes which are adjacent to each other may be merged for efficiency</li>
 	<li aria-level="1"><b><i>Disk Merged Discard Operations </i></b><i>with </i>total I/O time of all completed I/O operations</li>
 	<li aria-level="1"><b>Disk Total I/O Time</b> for Extended Operations per flush, discard</li>
</ul>
</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_4 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Now, with eBPF you also get the following additional metrics:
<ul>
 	<li aria-level="1"><strong>Disk Latency (eBPF): </strong>Latency chart showing histogram with the time necessary for read and write data.</li>
 	<li aria-level="1"><strong>Synchronization (eBPF): </strong>When data is moved from memory page cache to hard disk.</li>
 	<li aria-level="1"><strong>Page cache (eBPF): </strong>How data is changed in real-time on your host.</li>
 	<li aria-level="1"><strong>Mount point monitoring (eBPF): </strong>When partitions/disks are removed and inserted on your host</li>
</ul>
</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_5 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

We provide prebuilt alarms for:
<ul>
 	<li aria-level="1">Disk utilization</li>
 	<li aria-level="1">Inode utilization, you can find more information on Disk Inode <a title="here" href="https://en.wikipedia.org/wiki/Inode" target="_blank" rel="noopener">here</a>.</li>
 	<li aria-level="1">Disk backlog</li>
 	<li aria-level="1">Latency</li>
</ul>
For each Mountpoint Netdata offers:

<b>Disk Space Usage</b>

Disk space utilization. reserved for root is automatically reserved by the system to prevent the root user from getting out of space.

<b>Disk Files (inodes) Usage</b> – Running out of available inodes (or index nodes) can cause issues so new files cannot be created

inodes (or index nodes) are filesystem objects (e.g. files and directories). On many types of file system implementations, the maximum number of inodes is fixed at filesystem creation, limiting the maximum number of files the filesystem can hold. It is possible for a device to run out of inodes. When this happens, new files cannot be created on the device, even though there may be free space available.

<b>Mount syscalls (eBPF)</b>
<ul>
 	<li>Monitor, when syscalls mount and unmount, are called.</li>
 	<li>When a device is inserted or removed from a computer, this can be a hardware issue, security issues.</li>
</ul>
There is also a <a title="plugin for S.M.A.R.T" href="https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/smartd_log" target="_blank" rel="noopener">plugin for S.M.A.R.T</a> but we do not recommend using it as your data might be harmed. It is not enabled by default.

&nbsp;

&nbsp;

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_6 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h3>File System Monitoring</h3>
Netdata monitors different filesystems such as:
<ul>
 	<li aria-level="1">Virtual File System (eBPF)
<ul>
 	<li aria-level="2">Remove files – Monitor the frequency that files are deleted on Linux;</li>
 	<li aria-level="2">Calls to IO – Count the number of events to write (input) and  to read (output) from/to hard disk</li>
 	<li aria-level="2">Bytes written and read – a complement for the previous chart, but instead to measure calls, it measures the number of bytes.</li>
 	<li aria-level="2">Calls to vfs_fsync – Monitor when operate system calls file synchronization to store changed pages on memory to disk.</li>
 	<li aria-level="2">Calls to vfs_open – Calls to open a file</li>
 	<li aria-level="2">Calls to vfs_create – calls to function that creates new file</li>
</ul>
</li>
 	<li aria-level="1">EXT4, XFS, BTRFS, ZFS Latency (eBPF)
<ul>
 	<li aria-level="2">latency to read requests with time necessary to read  data from ext4 filesystem.</li>
 	<li aria-level="2">latency to write requests with time necessary to execute a write event.</li>
 	<li aria-level="2">latency to open requests with time necessary to execute an open event.</li>
 	<li aria-level="2">latency to sync requests time necessary to execute a synchronization.</li>
</ul>
</li>
 	<li aria-level="1">NFS (eBPF)
<ul>
 	<li aria-level="2">NFS latency to read request with time necessary to execute a read event.</li>
 	<li aria-level="2">NFS latency to write request with time necessary to execute a write event.</li>
 	<li aria-level="2">NFS latency to open request with time necessary to execute an open event.</li>
 	<li aria-level="2">NFS latency to getattr request with time necessary to execute a getattr request</li>
</ul>
</li>
 	<li aria-level="1">Mounting filesystems (eBPF)
<ul>
 	<li aria-level="2">Netdata is monitoring when filesystems are mounted and unmounted on the operating system.</li>
</ul>
</li>
</ul>
</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_7 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h3>Synchronization</h3>
<ul>
 	<li aria-level="1">Synchronization (eBPF): Netdata monitors six different syscalls (fsync, fdatasync,  msync, sync, syncfs, and syncfilerange) responsible for synchronizing data  from page cache to disk.</li>
 	<li aria-level="1">Page Cache (eBPF): Netdata monitors access and changes on page cache that are synchronized to disk.</li>
</ul>
<img class="alignnone size-medium wp-image-16375" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-11.57.31-AM-3-600x124.png" alt="" width="600" height="124" />

<img class="alignnone size-medium wp-image-16377" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-11.57.43-AM-4-600x361.png" alt="" width="600" height="361" />
<div class="et_pb_module et_pb_text et_pb_text_8 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

We now offer more enhanced metrics for monitoring Virtual File System (<a title="VFS" href="https://en.wikipedia.org/wiki/Virtual_file_system" target="_blank" rel="noopener">VFS</a>) and also offer monitoring for the latency that some file systems need to execute actions  to open files, write data on disk, read data from disk,delete files and synchronization, and more.

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_9 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h3>Integration of eBPF with apps.plugin</h3>
Some of the charts present filesystem and memory sections and are also shown per application when the integration with apps.plugin is enabled. Thanks to this integration, you can see how specific applications are using the hard disk.

<img class="alignnone size-medium wp-image-16379" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-12.42.42-PM-5-600x231.png" alt="" width="600" height="231" />

Apps integration

<img class="alignnone size-medium wp-image-16381" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-12.44.50-PM-6-600x240.png" alt="" width="600" height="240" />
<div class="et_pb_module et_pb_text et_pb_text_11 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Let’s look at an example:

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_12 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Latency is the time it takes for an event to be completed. Netdata calculates the difference between the function call and its return. The final result is stored per interval of time.

Each hard disk has its own latency to execute read and write actions, to correctly set your alarms, we suggest you take a look at your hard disk manual.

<img class="alignnone size-medium wp-image-16383" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-11.57.31-AM-7-600x124.png" alt="" width="600" height="124" />

To compliment information provided for hard disks, Netdata also monitors latency for specific actions on filesystem.

<img class="alignnone size-medium wp-image-16385" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2021/08/Screen-Shot-2021-08-13-at-12.55.30-PM-8-600x259.png" alt="" width="600" height="259" />
<div class="et_pb_module et_pb_text et_pb_text_14 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h3>Summary</h3>
</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_15 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Thanks for stopping by and learning how to monitor your Disks and File Systems with Netdata! For a rich experience, sign up for  <a title="Netdata Cloud" href="https://app.netdata.cloud/sign-in?cloudRoute=spaces?utm_source=email&amp;utm_content=ebpf_blog" target="_blank" rel="noopener">Netdata Cloud</a> for free (if you haven’t already) and get access to:
<ul>
 	<li aria-level="1">Metrics from multiple nodes aggregated into a single chart. To do so, simply create an account, connect your nodes to a Space and go to the Overview exploring your metrics</li>
 	<li aria-level="1">Run intelligent functions like <a title="metric correlations" href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations" target="_blank" rel="noopener">metric correlations</a> to correlate usage patterns on  specific metrics that have the same pattern across all the metrics Netdata collects for your systems</li>
</ul>
Lastly, remember to <a title="enable the eBPF on your agents" href="https://learn.netdata.cloud/docs/agent/collectors/ebpf.plugin" target="_blank" rel="noopener">enable the eBPF on your agents</a>! We offer the most comprehensive, real-time monitoring experience for Disk and Filesystem monitoring. Just join and happy monitoring!

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_16 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

If you’re new to Netdata, make sure to download the Agent! If you already have the Agent, sign up for Netdata Cloud.

<a href="https://learn.netdata.cloud/#installation" target="_blank" rel="noopener"><button> Get Netdata Agent</button></a><a href="https://app.netdata.cloud/sign-in?cloudRoute=spaces?utm_source=email&amp;utm_content=ebpf_blog" target="_blank" rel="noopener"> <button> Get Netdata Cloud</button></a>

</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>