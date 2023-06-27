---
slug: how-to-extend-the-geth-collector
title: "How to extend the Geth collector"
description: "How to extend the Geth collector"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Geth-collector-diagram-1.png
tags: [engineering,geth]
keywords: [netdata,engineering]
authors: team
---

<!--truncate-->


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Geth-collector-diagram-1-1200x796.png" alt="" class="wp-image-16282"/></figure>



This is the the last of a 2-part blog post series regarding Netdata and Geth. If you missed the first, be sure to check it out <a href="https://hackmd.io/J1x1WA-bR0a8gQeAmVdLFw" target="_blank" rel="noreferrer noopener">here</a>.



Geth is short for Go-Ethereum and is the official implementation of the Ethereum Client in Go. Currently it’s one of the most widely used implementations and a core piece of infrastructure for the Ethereum ecosystem.



With this proof of concept I wanted to showcase how easy it really is to gather data from any Prometheus endpoint and visualize them in Netdata. This has the added benefit of leveraging all the other features of Netdata, namely it’s per-second data collection, automatic deployment and configuration and superb system monitoring.



The most challenging aspect is to make sense of the metrics and organize them into meaningful charts. In other words, the expertise that is required to understand what each metric means and if it makes sense to surface it for the user.



Note that some metrics would make sense for some users, and other metrics for others. We want to surface <strong>all metrics that make sense</strong>. When developping an application, you need much lower level metrics (e.g <a href="https://containerjournal.com/topics/container-management/using-ebpf-monitoring-to-know-what-to-measure-and-why/" target="_blank" rel="noreferrer noopener">eBPF</a>), than when operating the application.



Let’s get down to it.



## A note on collectors



First, let’s do a very brief intro to what a collector is.



In Netdata, every collector is composed of a plugin and a module. The plugin is an orchestrator process that is responsible for running jobs, each job is an instance of a module.



When we are “creating” a collector, in essence, we select a plugin and we develop a module for that plugin.



For Geth, since we are using the Prometheus Endpoint, it’s easier to use our Golang Plugin, as it has internal libraries to gather data from Prometheus endpoints.



The following image is useful:



<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Geth-collector-diagram-2-1200x796.png" alt="" class="wp-image-16284"/></figure>



If you want to dive into the Netdata Collector framework:



<ul><li class=""><a href="https://community.netdata.cloud/docs?topic=1189" target="_blank" rel="noreferrer noopener">FAQ: What are collectors and how do they work?</a></li><li class=""><a href="https://learn.netdata.cloud/docs/agent/collectors/plugins.d" target="_blank" rel="noreferrer noopener">External plugins overview</a></li></ul>



## Geth collector structure



So, in essence, the Geth collector is the Geth module of the Go.d.plugin.



As you can see on <a href="https://github.com/netdata/go.d.plugin/tree/master/modules/geth" target="_blank" rel="noreferrer noopener">GitHub</a>, the module is composed of four files:



<ul><li class=""><code>charts.go</code>: Chart definitions</li><li class=""><code>collect.go</code>: Actual data collection, using the metric variables defined in <code>metrics.go</code></li><li class=""><code>geth.go</code>: Main structure, mostly boilerplate.</li><li class=""><code>metrics.go</code>: Define metric variables to the corresponding Prometheus values</li></ul>



## How to extend the Geth collector with a new metric



It’s very simply, really.



Open your Prometheus endpoint and find the metrics that you want to visualize with Netdata.



e.g <code>p2p_ingress_eth_65_0x08</code>



Open <code>metrics.go</code> and define a new variable



e.g <code>const p2pIngressEth650x08 = "p2p_ingress_eth_65_0x08"</code>



Open <code>collect.go</code> and create a new function, identical to the one that already exist. Although it doesn’t really makes a difference in our case, we strive to organize the metrics into sensible functions (e.g gather all <code>p2pEth65</code> metrics in one function). This is the function that we will do any computation on the raw value that we gather.



Note that Netdata will automatically take care of units such as <code>bytes</code> and will show the most human readable unit in the dashboard (e.g MB, GB, etc.)



e.g



<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/carbon-1-3-1200x565.png" alt="" class="wp-image-16286"/></figure>



We also need to add the function in the central function that is called by the module at the defined interval.



<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/carbon-2-4-1200x558.png" alt="" class="wp-image-16288"/></figure>



Lastly, now that we have the value inside the module, we need to create the chart for that value. We do that in <code>charts.go</code>:



<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/carbon-4-5-1200x1093.png" alt="" class="wp-image-16290"/></figure>



Let’s explain the fields of the structure:



<ul><li class=""><code>ID</code>: The unique identification for the chart.</li><li class=""><code>Title</code>: A human readable title for the front-end.</li><li class=""><code>Units</code>: The units for the dimension. Notice that Netdata can automatically scale certain units, so that the raw collector value stays in <code>bytes</code> but the user sees <code>Megabytes</code> on the dashboard. You can find a list of supported “automatically scaled” units on this <a href="https://github.com/netdata/dashboard/blob/068bbbb975db7871920406be56af5a641c79a08e/src/utils/units-conversion.ts" target="_blank" rel="noreferrer noopener">file</a>.</li><li class=""><code>Fam</code>: The submenu title, used to group multiple charts together.</li><li class=""><code>Ctx</code>: The identifier for the particular chart, kinda like id. Use the convention <code>&lt;collector_name&gt;.&lt;chart_id&gt;</code>.</li><li class=""><code>Type</code>: <code>Line</code> (Default) or <code>Area</code> or <code>Stacked</code>. <code>Area</code> is best used with dimensions that signify “bandwidth”. <code>Stacked</code> when it make sense to visually observe the <code>sum</code> of dimensions. (e.g the<code>system.ram</code> chart is stacked).</li><li class=""><code>Dims</code>:<ul><li class=""><code>ID</code>: The variable name for that dimension.</li><li class=""><code>Name</code>: human readable name for the dimension.</li><li class=""><code>Algorithm</code>:<ul><li class=""><code>absolute</code>: Default (if omitted) is <code>absolute</code>. Netdata will show the value that it gets from the collector.</li><li class=""><code>incremental</code>: Netdata will show the per-second rate of the value. It will automatically take the delta between two data collections, find the per-second value and show it.</li><li class=""><code>percentage</code>: Netdata will show the percentage of the dimension in relation to the <code>sum</code> of all the dimensions of the chart. If four dimensions have value = <code>1</code>, it will show <code>25%</code>.</li><li class=""><code>Mul</code>: Multiply value by some integer.</li><li class=""><code>Div</code>: Divide value by some integer.</li></ul></li></ul></li></ul>



## A final note on extending Geth



The prometheus endpoint is not the only way to monitor Geth, but it’s the simplest.



If you feel adventurous, you can try to implement a collector that also uses Geth’s RPC endpoint to pull data (e.g show charts about specific contracts in real time) or even Geth’s logs.



To use Geth’s RPC endpoint with Golang, take a look at <a href="https://geth.ethereum.org/docs/dapp/native" target="_blank" rel="noreferrer noopener">Geth’s documentation</a>.



To monitor Geth’s logs, you can use our <a href="https://github.com/netdata/go.d.plugin/tree/ec9980149c3d32e4a90912826edd344dfb0413ac/modules/weblog" target="_blank" rel="noreferrer noopener">weblog collector</a> as a template. It monitors Apache and NGINX servers by parsing their logs.



## Add alerts to Geth charts



Now that we have defined the new charts, we may want to define alerts for them. The full alert syntax is out-of-scope for this tutorial, but it shouldn’t be difficult once you get the hang of it.



For example, here is a simple alarm that tells me if Geth is synced or not, based on whether <code>header</code> and <code>block</code> values are the same:



<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/carbon-5-6-1200x616.png" alt="" class="wp-image-16292"/></figure>



<strong>You can read the above example as follows:</strong> On the charts that have the context <code>geth.chainhead</code> (thus all the Geth nodes that we may monitor with a single Netdata Agent), every 10s, caluclate the difference between the dimensions <code>chain_head_block</code> and <code>chain_head_header</code>. If it’s not 0, then raise alert to <code>warn</code>. If it’s more than 5, then raise to <code>critical</code>.



Some useful resources to get you up to speed quickly with creating alerts for our Geth node:



Note that if you create an alert and it works for you, a great idea is to make a PR into the main <code>netdata/netdata</code> <a href="https://github.com/netdata/netdata" target="_blank" rel="noreferrer noopener">repository</a>. That way, the alert definition will exist in every netdata installation, and you will help countless other Geth users.



Here are some useful resources to create new alerts:



<ul><li class=""><a href="https://www.youtube.com/watch?v=aWYj9VT8I5A" target="_blank" rel="noreferrer noopener">Youtube – Creating your first health alarm in Netdata</a></li><li class=""><a href="https://learn.netdata.cloud/docs/monitor/configure-alarms" target="_blank" rel="noreferrer noopener">Docs – Configure health alert</a></li><li class=""><a href="https://learn.netdata.cloud/docs/agent/health/reference" target="_blank" rel="noreferrer noopener">Docs – alert configuration reference</a></li><li class=""><a href="https://learn.netdata.cloud/docs/monitor/enable-notifications" target="_blank" rel="noreferrer noopener">Docs – Enable alert notifications</a></li></ul>



## Extend Geth collector for other clients



The beauty of this solution is that it’s <strong>trivial</strong> to duplicate the collector and gather metrics from all Ethereum clients that support the Prometheus endpoint:



<ul><li class=""><a href="https://docs.nethermind.io/nethermind/ethereum-client/metrics/setting-up-local-metrics-infrastracture" target="_blank" rel="noreferrer noopener">Nethermind</a>,</li><li class=""><a href="https://besu.hyperledger.org/en/stable/HowTo/Monitor/Metrics/" target="_blank" rel="noreferrer noopener">Besu</a></li><li class=""><a href="https://github.com/ledgerwatch/erigon" target="_blank" rel="noreferrer noopener">Erigon</a></li></ul>



The only difference between a Geth collector and a <a href="https://nethermind.io/client" target="_blank" rel="noreferrer noopener">Nethermind</a> collector is that they might expose different metrics or the same metrics with different “Prometheus metrics names”. So, we just need to change the Prometheus metrics names in the <code>metrics.go</code> source file and propagate any change to the other source files as well.



The logic that I described above stays exactly the same.



## In conclusion



Extending Geth for more metrics is trivial.



As you may suspect, this guide is applicable for any data source that is exposing it’s metrics using the Prometheus format.
