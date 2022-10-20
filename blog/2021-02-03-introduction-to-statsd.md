---
slug: introduction-to-statsd
title: "Introduction to StatsD"
description: "Introduction to StatsD"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/StatsD.png
tags: [engineering,product]
keywords: [netdata,engineering,product]
authors: team
---

<!--truncate-->

<img class="alignnone size-medium wp-image-16449" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/StatsD-600x414.png" alt="" width="600" height="414" />

StatsD is an industry-standard technology stack for monitoring applications and instrumenting any piece of software to deliver custom metrics. The StatsD architecture is based on delivering the metrics via UDP packets from any application to a central statsD server. Although the original StatsD server was written in Node.js, there are many implementations today, with Netdata being one of them.

StatsD makes it easier for you to instrument your applications, delivering value around three main pillars: open-source, control, and modularity. That’s a real windfall for full-stack developers who need to code quickly, troubleshoot application issues on the fly, and often don’t have the necessary background knowledge to use complex monitoring platforms.

First and foremost, StatsD is an open-source standard, meaning that vendor lock-in is simply not possible. With most of the monitoring solutions offering a StatsD server, you know that your instrumentation will play nicely with any solution you might want to use in the future.

The second is that you have absolute control over the data you send, since the StatsD server just listens for metrics. You can choose how, when, or why to send data from any application you build, whether it’s in aggregate or as highly cardinal data points. You also don’t need to spend any time configuring the StatsD server, since it will accept any metrics in any form you choose via your instrumentation.

Finally, there is a complete decoupling of each component of the stack. The client doesn’t care about the implementation of the server, and the server is agnostic about the backend. You can mix and match any combination of client, server, and backend that works best for you, or migrate between them as your needs change.

Historically, it has always been easier to measure and collect metrics about systems and networks than applications. In 2011, Erik Kasten developed StatsD while working at Etsy, to collect metrics from instrumented code. The original implementation, in Node.JS, listened on a UDP port for incoming metrics data, extracted it, and periodically sent batches of metrics to Graphite. Since then, countless applications have StatsD already implemented and can be configured to send their metrics to any StatsD server, while the number of available libraries makes it trivial to use the protocol in any language.
<h2><strong>How does StatsD work?</strong></h2>
The architecture of StatsD is divided into 3 main pieces: client, server, and backend.

&nbsp;
<ul>
 	<li>The <b>client</b> is what creates and delivers metrics. In most cases, this is a <a href="https://github.com/statsd/statsd/wiki#client-implementations">StatsD library</a>, added to your application, that <i>pushes</i> metrics at specific points where you add the relevant code.</li>
 	<li>The <b>server</b> is a daemon process responsible for listening for metric data as it’s pushed from the client, batching them, and sending them to the backend.</li>
 	<li>The <b>backend</b>, which is where metrics data is stored for analysis and visualization.&nbsp;

StatsD uses UDP packets because the client/server both reside on the same host, where packet loss is minimal and you can get the maximum throughput with the least amount of overhead. TCP is also an option, in case the client/server implementations reside on different hosts and the deliverability of metrics is a primary concern; in that case, the metrics collection speed will be lower due to the overhead of TCP.

In case you are wondering about the difference between TCP and UDP, this image is most illustrative:
</li>
</ul>
<img class="alignnone size-medium wp-image-16451" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/tcp-vs-udp-600x268.webp" alt="" width="600" height="268" />

<a href="https://ydevern.wordpress.com/2018/09/26/ccna-udp-vs-tcp/" target="_blank" rel="noopener">Source</a>

More often than not, an HTTP-based connection is used to send the metrics from the server to the backend, and because the backend is stored for long-term analysis and storage, it often resides in a different host than the server/clients.
<h2><strong>StatsD in Netdata</strong></h2>
<strong>Netdata is a fully featured <a href="https://learn.netdata.cloud/docs/agent/collectors/statsd.plugin">StatsD server</a>, meaning it collects formatted metrics from any application that you instrumented with your library of choice. Netdata is also its own backend implementation, as it offers instant visualization and long-term storage using the embedded time-series database (TSDB). When you install Netdata, you immediately get a fully functional StatsD implementation running on port 8125.</strong>

<img class="alignnone size-medium wp-image-16453" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Netdata-Diagramds-Page-3-593x600.png" alt="" width="593" height="600" />

Since StatsD uses UDP or TCP to send instrumented metrics, either across <strong>localhost</strong> or between separate nodes, you’re free to deploy your application in whatever way works best for you, and it can still connect to Netdata’s server implementation. As soon as your application exposes metrics and starts sending packets on port 8125, Netdata turns the incoming metrics into charts and visualizes them in a meaningful fashion.

Your applications can be deployed in a variety of ways and still be able to easily surface monitoring data to Netdata. Moreover, Netdata accepts StatsD packets by default, meaning that as soon as your application starts sending data to Netdata, Netdata will create charts and visualize them as accurately as it can. Since there are a myriad of different setups, Netdata offers a robust server implementation that can be configured to organize the metrics in charts that make sense, so you can easily improve the visualization by making some simple modifications.

Because StatsD is a robust, mature technology, developers have built libraries to easily instrument applications in most popular languages.

&nbsp;
<ul>
 	<li>Python:  <a title="https://github.com/jsocol/pystatsd" href="https://github.com/jsocol/pystatsd" target="_blank" rel="noopener noreferrer">https://github.com/jsocol/pystatsd</a></li>
 	<li>Python Django: <a title="https://github.com/WoLpH/django-statsd" href="https://github.com/WoLpH/django-statsd" target="_blank" rel="noopener noreferrer">https://github.com/WoLpH/django-statsd</a></li>
 	<li>Java: <a href="https://github.com/tim-group/java-statsd-client">https://github.com/tim-group/java-statsd-client</a></li>
 	<li>Clojure: <a href="https://github.com/pyr/clj-statsd">https://github.com/pyr/clj-statsd</a></li>
 	<li>Nodes/Javascript: <a href="https://github.com/sivy/node-statsd">https://github.com/sivy/node-statsd</a></li>
</ul>
&nbsp;

Taking the example from <strong>python-statsd</strong>, you only need a reachable Netdata Agent (locally or over the internet) and a couple of lines of code. This <strong>hello_world</strong> example illustrates just how simple it is to send any metric you care about to Netdata and instantly visualize it.

Even with no configuration at all, Netdata automatically creates charts for you. Netdata, being a robust monitoring agent, is also capable of organizing incoming metrics in any way you find most meaningful.

<img class="alignnone size-medium wp-image-16455" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Screenshot-2021-01-27-at-2.12.37-PM-600x483.png" alt="" width="600" height="483" />
<div class="et_pb_module et_pb_text et_pb_text_3  et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<div class="et_pb_module et_pb_text et_pb_text_3  et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<pre>import statsd
c = statsd.StatsClient('localhost', 8125)
c.incr('foo') # Increment the 'foo' counter.
for i in range(100000000):
   c.incr('bar')
   c.incr('foo')
   if i % 3:
       c.decr('bar')
       c.timing('stats.timed', 320) # Record a 320ms 'stats.timed'.</pre>
</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_4  et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner"></div>
</div>
</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_4  et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Netdat’s StatsD server is also quite performant, which means you can monitor applications where they run without concerns over bottlenecks or restricting resources:
<blockquote>Netdata StatsD is fast. It can collect more than 1.200.000 metrics per second on modern hardware, more than 200Mbps of sustained statsd traffic, using 1 CPU core</blockquote>
Netdata does this on top of gathering metrics from other data sources. Netdata monitors an application’s full stack, from hardware to operating system to underlying services, organized automatically into meaningful categories. Every available metric is nicely organized automatically into a single dashboard.
<h2><strong>Ready to get started?</strong></h2>
In the next part of the StatsD series, we are going to illustrate how to configure Netdata to organize the metrics of any application, using <a href="https://k6.io/" target="_blank" rel="noopener noreferrer">K6</a> as our use case.

This guide, <a href="https://learn.netdata.cloud/guides/monitor/statsd" target="_blank" rel="noopener"><em>How to use any StatsD data source with Netdata</em>,</a> walks you through the process of creating the right charts based on the metrics your application exposes.

To engage with other Netdata users about StatsD, join our <a href="https://community.netdata.cloud/t/netdata-and-statsd/871" target="_blank" rel="noopener noreferrer">Community Forums</a> where we have kickstarted a discussion around this very topic.

Here are a couple of interesting resources to get you started with StatsD:
<ul>
 	<li>StatsD GitHub <a href="https://github.com/statsd/statsd" target="_blank" rel="noopener noreferrer">repository</a></li>
 	<li><a href="https://medium.com/@DoorDash/scaling-statsd-84d456a7cc2a" target="_blank" rel="noopener noreferrer">Scaling StatsD in DoorDash</a></li>
 	<li><strong>Netdata StatsD reference <a href="https://learn.netdata.cloud/docs/agent/collectors/statsd.plugin" target="_blank" rel="noopener noreferrer">documentation</a></strong></li>
</ul>
</div>
</div>