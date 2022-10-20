---
slug: how-to-monitor-windows-systems-with-netdata
title: "How to monitor Windows systems with Netdata"
description: "How to monitor Windows systems with Netdata"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Monitoring-Windows-with-Netdata-Header.png
tags: [product,engineering]
keywords: [netdata,product,engineering]
authors: team
---

<!--truncate-->

<div class="et_pb_module et_pb_text et_pb_text_0  et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

<img class="alignnone size-full wp-image-16596" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Monitoring-Windows-with-Netdata-Header.png" alt="" width="683" height="512" />

Whether you’re a site reliability engineer (SRE), DevOps engineer, or any other role that plays a part in maintaining uptime for your company’s infrastructure, it’s critical to have visibility into all of your systems, regardless of their operating system. This includes monitoring Windows systems, which is a popular use case for Netdata’s community.

Here’s the caveat: Netdata has no native Windows monitoring agent. We decided to focus our engineering efforts on creating the best single-node and infrastructure monitoring tool for the vast majority of production systems. If we split our resources between UNIX and Windows, the result would be two worse products competing for our valuable engineers’ time.

And despite the lack of native support, we’ve developed a few unique and fully-capable ways to help you get visibility into system- and application-level metrics from your Windows machines.

To monitor Windows systems with Netdata, you must <a title="install" href="https://learn.netdata.cloudu/docs/get" target="_blank" rel="noopener noreferrer">install</a> the open-source <a title="Netdata Agent" href="https://github.com/netdata/netdata" target="_blank" rel="noopener noreferrer">Netdata Agent</a> on a compatible system, which you will use to remotely collect the exposed metrics from your Windows hosts and the applications they run. You have a few options:
<ul>
 	<li>A separate node running Linux or a different supported operating system.</li>
 	<li>A VM running a supported operating system on your Windows host.</li>
</ul>
Once you have this separate system running the Netdata Agent, you have three options for collecting metrics from Windows systems and applications, based on your needs:
<ul>
 	<li>Collect system metrics (CPU, memory, and so on), using the <a title="WMI collector" href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/wmi/" target="_blank" rel="noopener noreferrer">WMI collector</a> and the windows_exporter program.</li>
 	<li>Collect application metrics
<ul>
 	<li>Collect application metrics from any <a title="supported application" href="https://learn.netdata.cloud/docs/agent/collectors/collectors#service-and-application-collectors" target="_blank" rel="noopener noreferrer">supported application</a> running on Windows, such as a MySQL database or Java Springboot 2 application, using the associated collector.</li>
 	<li>Collect application metrics from any <a title="supported Prometheus endpoint" href="https://github.com/netdata/go.d.plugin/blob/master/config/go.d/prometheus.conf" target="_blank" rel="noopener noreferrer">supported Prometheus endpoint</a> using our generic Prometheus collector.</li>
</ul>
</li>
</ul>
Most users are just looking to monitor CPU and memory utilization for Windows systems. If this sounds like you, the WMI collector and windows_exporter will have you more than covered. Monitoring applications takes a bit more work, but both our supported collectors and Prometheus support bring native-like monitoring to your Windows systems.
<h3>Monitor Windows health and performance using windows_exporter</h3>
To monitor your Windows machines with Netdata, you can leverage <a title="windows_exporter" href="https://github.com/prometheus-community/windows_exporter" target="_blank" rel="noopener noreferrer">windows_exporter</a>, a well-known exporter supported by the Prometheus community, and <a title="Netdata’s WMI collector" href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/wmi#configuration" target="_blank" rel="noopener noreferrer">Netdata’s WMI collector</a>. This method will provide you with meaningful charts on your systems’ health metrics, including CPU, memory, disk utilization, network traffic, and more, which you can use to troubleshoot anomalies or downtime on your Windows systems.

The WMI collector collects only a subset of the metrics that windows_exporter offers, as shown in the <a title="WMI documentation" href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/wmi#configuration" target="_blank" rel="noopener noreferrer">WMI documentation</a>.

To get started, download and install <a title="windows_exporter" href="https://github.com/prometheus-community/windows_exporter#installation" target="_blank" rel="noopener noreferrer">windows_exporter</a> on your Windows system(s). Once you run it, it starts exposing metrics on port 9182. Now hop back over to the node running the Netdata Agent and configure the WMI collector.

If you’re new to configuring the Netdata Agent, see our <a title="node configuration" href="https://learn.netdata.cloud/docs/configure/nodes" target="_blank" rel="noopener noreferrer">node configuration</a> doc.

&nbsp;

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_1  et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

The WMI collector can collect data from any number of Windows systems running windows_exporter. In the WMI configuration file, define a separate job for each system, with a unique name and the appropriate URL.

&gt; Keep in mind that windows_exporter exposes metrics in plain HTTP. If this is a concern for you, you may want to secure the exposed metrics using a VPN or allowing only connections from the local network. See the <a title="windows_exporter project" href="https://github.com/prometheus-community/windows_exporter" target="_blank" rel="noopener noreferrer">windows_exporter project</a> for details.

The configuration below collects metrics on CPU, memory, disk, networking, and more, from two unique Windows systems.

<img class="alignnone size-large wp-image-16598" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/configuration-for-metrics-on-CPU-memory-disk-networking-and-more-1-1200x215.png" alt="" width="1200" height="215" />

Once you have configured the WMI collector, and you have started both windows_exporter and the Netdata Agent, you should be able to monitor and troubleshoot the core components of your Windows machine(s).

<img class="alignnone size-large wp-image-16600" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Monitor-and-troubleshoot-the-core-components-of-your-Windows-machines-2-1200x616.png" alt="" width="1200" height="616" />
<h3>Monitor Windows applications using Netdata’s collectors</h3>
Netdata is entirely capable of collecting and visualizing metrics from applications running on your Windows systems, in the same manner that it was able to collect data from the windows_exporter. As we outline in our <a title="documentation" href="https://learn.netdata.cloud/docs/agent/collectors/collectors" target="_blank" rel="noopener noreferrer">documentation</a>, various Windows applications expose their metrics via HTTP endpoints, which can be reached by Netdata collectors even if Netdata is installed in a different system.

You will need to configure these collectors, just as you might have configured WMI in the section above. For example, let’s say you have a MySQL database with a root password of my-secret-pw running on a Windows system with the IP address 203.0.113.0. First, open up the <a title="MySQL collector" href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/mysql" target="_blank" rel="noopener noreferrer">MySQL collector</a>’s configuration file. If you’re not sure how to do that, follow the below steps, or check out our doc on <a title="enabling or configuring a collector" href="https://learn.netdata.cloud/docs/collect/enable-configure" target="_blank" rel="noopener noreferrer">enabling or configuring a collector</a>.

<img class="alignnone size-large wp-image-16602" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Enabling-or-configuring-a-collector-3-1200x90.png" alt="" width="1200" height="90" />

Configure the MySQL collector by creating a job that looks for a MySQL database at 203.0.113.0:3306, with your completely secure and totally un-guessable password.

<img class="alignnone size-large wp-image-16604" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Configure-the-MySQL-collector-4-1200x129.png" alt="" width="1200" height="129" />

You can apply this exact logic to any of our <a title="supported collectors" href="https://learn.netdata.cloud/docs/agent/collectors/collectors" target="_blank" rel="noopener noreferrer">supported collectors</a> and applications running on your Windows systems. By configuring jobs, you can effectively monitor your Windows-based infrastructure using Netdata, despite our lack of native Windows support.

Use real-time visualizations to troubleshoot anomalies, or <a title="claim the node(s)" href="https://learn.netdata.cloud/docs/get#claim-your-node-on-netdata-cloud" target="_blank" rel="noopener noreferrer">claim the node(s)</a> you use to monitor Windows to your Space in Netdata Cloud for <a title="Windows infrastructure monitoring" href="https://learn.netdata.cloud/docs/quickstart/infrastructure" target="_blank" rel="noopener noreferrer">Windows infrastructure monitoring</a>. And if you don’t see the Windows application you’re interested, perhaps our generic Prometheus collector can be of service.
<h3>Monitor applications with Prometheus endpoints</h3>
Our previous monitoring method is a great way to get visibility into your Windows applications’ health and performance, but only works for Netdata’s officially supported collectors. What about all the other Windows applications?

We <a title="recently introduced" href="https://staging-www.netdata.cloud/blog/release-1-24/" target="_blank" rel="noopener noreferrer">recently introduced</a> a new method to collect metrics in order to support even a wider array of applications, by leveraging the already existing Prometheus endpoints and scraping them with our very own Prometheus collector.

Using the <a title="Prometheus exposition format" href="https://prometheus.io/docs/instrumenting/exposition_formats/" target="_blank" rel="noopener noreferrer">Prometheus exposition format</a>, a simple, text-based standard for exposing metrics, you get meaningful visualizations all in real-time. The generic Prometheus collector auto-detects metrics from over <a title="600 Prometheus endpoints" href="https://github.com/netdata/go.d.plugin/blob/master/config/go.d/prometheus.conf" target="_blank" rel="noopener noreferrer">600 Prometheus endpoints</a> to instantly generate new charts with the same high-granularity, per-second frequency as other collectors. Once configured, Netdata will produce one or more charts for every metric collected via a Prometheus endpoint. The number of charts is based on the number of exposed metrics.

Let’s say you want to monitor Microsoft SQL Server with Netdata. You can use <a title="sql_exporter" href="https://github.com/free/sql_exporter" target="_blank" rel="noopener noreferrer">sql_exporter</a> to expose its metrics, then configure the Netdata Agent node to capture its metrics using the Prometheus collector. Get started by opening the prometheus.conf file.

<img class="alignnone size-large wp-image-16606" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Configure-the-Netdata-Agent-node-to-capture-its-metrics-using-the-Prometheus-collector-5-1200x100.png" alt="" width="1200" height="100" />

Then, edit the sql_exporter_local job to point to the URL where sql_exporter exposes your SQL server’s metrics.

<img class="alignnone size-large wp-image-16608" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Edit-the-sql_exporter_local-job-to-point-to-the-URL-where-sql_exporter-exposes-your-SQL-servers-metrics-6-1200x130.png" alt="" width="1200" height="130" />

Once you restart the Netdata Agent, you can view real-time metrics from your Windows application.

While this functionality allows you to collect metrics and view visualizations for Windows systems and/or applications, you may need to configure filtering and grouping. These configuration features help you add the same layer of meaningful presentation to Prometheus metrics that you would find with one of Netdata’s native collectors. For full instructions, visit our <a title="documentation" href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/prometheus" target="_blank" rel="noopener noreferrer">documentation</a> and our latest <a title="Agent release" href="https://staging-www.netdata.cloud/blog/release-1-25/" target="_blank" rel="noopener noreferrer">Agent release</a>.

Feedback on Windows-based infrastructure monitoring

We’re confident these Windows monitoring strategies will work for a vast majority of users and their infrastructure, and we’re committed to building monitoring solutions that are flexible and dynamic enough to seamlessly integrate anywhere.

As we continue to develop an interoperable and extensible monitoring agent, we’d like to hear your feedback on Windows support. Are you using Netdata to monitor Windows? Do one of the above solutions work for you? Jump into our <a title="community forum" href="https://community.netdata.cloud/" target="_blank" rel="noopener noreferrer">community forum</a> and let us know what you think. We’ll use your use case and results to shape our future support and development for Windows systems and applications.

Happy (Windows) monitoring!

</div>
</div>