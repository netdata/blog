---
title: Bringing rich and real-time infrastructure monitoring to Netdata Cloud
subtitle: 
date: 2020-10-22
author: 
related: ["", "", ""]
tags: 
  [
    "",
  ]
image: "."."""/img/blog/Correlation_charts.png.png".png".png".png".png"""""
---
<img class="alignnone size-large wp-image-16578" src="/img/wp-archive/uploads/2022/03/Correlation_charts-1200x830.png" alt="" width="1200" height="830" />

The Netdata Agent is well-equipped to solve monitoring and troubleshooting challenges for single nodes. We love that the Agent is so valuable to our users, but Netdata Cloud is designed for infrastructure monitoring. That’s why we’re working so hard to offer even more capabilities and help users monitor and troubleshoot infrastructures of all sizes, entirely for free!

With the new Cloud Overview, you get every real-time chart and metric you need to understand the status of your infrastructure, explore, and troubleshoot, in a single view. We designed the Overview on one existing and beloved feature and another entirely new one that we’re very excited to launch for the first time.

The Overview uses the Agent dashboard, the one our users love, as its foundation, but is even more powerful with <i>composite charts</i> that visualize metrics from <i>all nodes belonging to a War Room</i>, or a configurable subset. Better yet, every composite chart is immediately available and requires zero configuration.

<img class="alignnone size-large wp-image-16580" src="/img/wp-archive/uploads/2022/03/95912630-e75ed600-0d57-11eb-8a3b-49e883d16833-2-1200x734.png" alt="" width="1200" height="734" />

With the Overview, you can:
<ul>
 	<li>Focus on nodes of interest with rich node filtering by hostname, OS, and service.</li>
 	<li>Have a “helicopter view” for all your infrastructure’s metrics, with composite charts grouped by dimensions across the nodes of interest.</li>
 	<li>Navigate through the well-known Netdata menu to the charts you want to analyze, change how a chart is defined, and see which charts and nodes participate.</li>
</ul>
You can have both a helicopter view of your infrastructure and all of Netdata’s granular deep-dive features in a matter of seconds. <a href="https://learn.netdata.cloud/docs/agent/packaging/installer/update">Update the Netdata Agent</a> on your nodes to <a href="https://github.com/netdata/netdata/releases/tag/v1.26.0" target="_blank" rel="noopener noreferrer">v1.26</a>, then see their metrics in real-time composite charts.
<h2>Focus on troubleshooting, not on organizing your metrics</h2>
With other monitoring tools, you need to focus on building dashboards. You need to know exactly what you want to monitor beforehand, have a plan, and do a lot of manual and automated work. After days, and even weeks, of focused work, you’ll finally arrive at a position where you can rely <i>a bit</i> on your IT monitoring.

<strong>Netdata Cloud does all this work for you, right now, for free.</strong>

Netdata Cloud automatically categorizes and organizes thousands of collected metrics, then presents them hundreds of composite charts on a single screen. It’s all the information you need to explore further, investigate, and analyze.

Don’t worry about creating dashboards. Don’t worry about setting everything up. Don’t worry about the scalability of your monitoring stack. Netdata Cloud takes care of everything for you.
<blockquote>Your metric data remains within your infrastructure, on the nodes that collected them. Netdata Cloud does not store your metrics.</blockquote>
The Overview, and its composite charts, is one critical step towards democratizing monitoring, as everybody can have the luxury to understand what’s happening within their infrastructure:
<ul>
 	<li>SREs and DevOps engineers can focus on troubleshooting.</li>
 	<li>Startups and small-medium enterprises can monitor and troubleshoot without an entire IT operations department.</li>
 	<li>Software development teams are one step closer to becoming DevOps engineers, with all this monitoring and troubleshooting support out-of-the-box.</li>
 	<li>Enterprises don’t need to rely solely on the ability of operational, SRE, and DevOps teams to set up monitoring systems, which gives them more time and flexibility to focus on critical business objectives.</li>
</ul>
<img class="alignnone size-large wp-image-16582" src="/img/wp-archive/uploads/2022/03/composite-aggregation-3-1200x501.png" alt="" width="1200" height="501" />
<h2>How can you use Netdata Cloud’s infrastructure monitoring tools?</h2>
We’re excited to see how you use the Overview and composite charts. While some of the features supporting these use cases are already available, others are coming soon. Stay tuned!
<ul>
 	<li><strong>Have a helicopter view over your infrastructure.</strong> You can have a full overview of your infrastructure and then navigate numerous charts created with data from all the nodes in your War Rooms. Use these rich visualizations to spot unexpected patterns and continue the investigation by checking a subset of your infrastructure with filtering.</li>
 	<li><strong>Explore charts.</strong> Netdata Cloud offers some smart, pre-configured defaults for how each composite chart aggregates metrics, but if you’re the curious type, you can always change these settings. For example, if you expect your filtered nodes to have low/high values for certain metrics, you can change the aggregation functions, see the max/min, and figure out if you want to take a closer look. When you spot a strange pattern, you can drill down with grouping metrics by nodes.</li>
 	<li><strong>Dive deeper with Metric Correlations.</strong> When you spot an unexpected pattern in a particular node, you can run Metric Correlations to find all the correlated metrics. You’re now one automated step closer to finding the root cause of issues.</li>
 	<li><strong>See what happened during incidents.</strong> First, set your nodes’ <a href="https://learn.netdata.cloud/guides/longer-metrics-storage">metrics retention</a> to store metrics for a few days. The next time you have an incident on your infrastructure, select a custom timeframe, and see what exactly happened and how your nodes were affected. In the future, with child-parent support on Cloud, you will get even more visibility into the performance of every node.</li>
 	<li><strong>Get monitoring data related to blue-green deployments with the use of dashboards.</strong> Add composite charts to a dashboard and watch how important metrics relate to each group of nodes after a deployment. With this focused, custom view, you can understand how the deployed code affects system and application performance.</li>
 	<li><strong>Investigate after receiving alarm notifications.</strong> We’re working hard on centralized alarm dispatch via email. When you receive a notification from Netdata Cloud about a node’s health, use the Overview to see how charts on other nodes with a similar purpose behave during the same timeframe.</li>
</ul>
<img class="alignnone size-large wp-image-16584" src="/img/wp-archive/uploads/2022/03/96297655-09e62e80-0fa6-11eb-8066-b07d28e11981-4-1200x490.png" alt="" width="1200" height="490" />
<h2>What’s next for composite charts?</h2>
Soon, we’ll offer new capabilities around composite charts, some of which we described above:
<ul>
 	<li><strong>The ability to drill down with grouping metrics by node.</strong> For example, if you see a spike in CPU usage across your infrastructure, you can find the problematic node, jump to its single-node dashboard, and find the root cause.</li>
 	<li><strong>Composite charts in new dashboards you design.</strong></li>
 	<li><strong>Integration with Metric Correlations.</strong> When you see abnormal patterns, you can use Metric Correlations to find out any other metrics and charts that have a similar pattern.</li>
</ul>
To get started with the Overview, just sign in to Netdata Cloud, click on the War Room’s dropdown, and select Overview. You’ll instantly have a “helicopter” view of your infrastructure, without wasting time on configuration, with all of the power to drill down in a handful of clicks.

Make your infrastructure monitoring easier with Netdata Cloud’s composite charts. They’re available right now, for free, for every infrastructure.

&nbsp;
