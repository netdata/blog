---
slug: data-collection-strategies/
title: Data Collection Strategies for Infrastructure Monitoring – Troubleshooting Specifics
authors: alex
tags: [infrastructure-monitoring, machine-learning, product, systems, troubleshooting]
---
<!--truncate-->
Monitoring and troubleshooting; unfortunately, these terms are still used interchangeably, which can lead to misunderstandings about data collection strategies.

In this article we aim to clarify some important definitions, processes, and common data collection strategies for monitoring solutions. We will specify the limitations of the described strategies, as well as key benefits which can potentially be also used for troubleshooting needs. 

<strong>IT infrastructure monitoring</strong> is a business process of collecting and analyzing data over a period of time to improve business results.

<strong>Troubleshooting</strong> is a form of problem solving, often applied to repair failed products, services, or processes on a machine or a system. The main purpose of troubleshooting is to identify the source of a problem in order to solve it.

In short, <strong>monitoring</strong> is used to observe the current/historical state while <strong>troubleshooting</strong> is employed to isolate the specific cause or causes of the symptom.

The boundary between the definitions of the terms <strong>monitoring</strong> and <strong>troubleshooting</strong> is clear; however, in the context of currently available monitoring solutions on the market for software engineers, SRE, DevOps, etc., the boundary has become a bit blurry.

The basic monitoring system can be built on top of “The Three Pillars of Observability” (<a href="https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html">Sridharan, 2018</a>): Logs, metrics, and traces. All of them together have the ability to provide visibility into the health of your systems, behavior of your services as well as some business metrics. You would be able to understand the impact of changes you make or change in the users traffic patterns.

The main focus in this article is going to be on metrics rather than on logs or traces.

Metrics represent the measurements of resource usage or behavior - for example, low-level usage summaries provided by your operating system (CPU load, Memory usage, Disk space, etc) or higher-level summaries provided by a specific process currently running on your system.

Many applications and services nowadays provide their own metrics, which can be collected and displayed to the end-user.

Metrics are perfectly suited to building dashboards that display key performance indicators (KPI) over time, using numbers as a data type that is optimized for transmission, compression, processing, and storage as well as easier querying. 

## Incident management KPIs

Let's review a series of indicators designed to help tech companies to understand how often incidents occur, to predict how quickly incidents are going to be acknowledged and resolved, and to clarify later on how they are affected by different data collection strategies.

<b>Mean Time Before Failure (MTBF): </b>MTBF is the average time between repairable failures. The higher the time between failure, the more reliable the system

<b>Mean Time To Acknowledge (MTTA): </b>MTTA is the average time it takes from when an alert is triggered to when work begins on the issue. This metric is useful for tracking your team’s responsiveness and your alert system’s effectiveness.

<b>Mean Time To Recovery (MTTR): </b>MTTR is the average time it takes to repair a system and return to a fully functional state. This time includes not only repair time, but testing time and the time spent ensuring that the failure won’t happen again. The lower the time to recovery, the more efficient the troubleshooting process (root cause analysis) as well as the issues resolution process.
## Troubleshooting
Intermittent issues within your infrastructure interrupt your flow of work, frustrate users, and can wreak havoc on your business. The higher the MTBF, the longer a system is likely to work before failing.

A working system will not fail breakdown and understanding why your services may be failing is your first line of defense against the serious consequences of unplanned downtime.

The best way is to identify the issue and resolve it ASAP, before users will notice it and make a buzz around it within the user’s company, or worse, in the community or social networks.

Configuring an alert is a very good way to indicate some abnormalities based on metrics going above or below specified thresholds or based on changes in the pattern of the data compared to the previous time periods (<a href="https://netdata.cloud/how-netdatas-machine-learning-works/">machine learning (ML)-powered anomaly detection</a>). This type of work will allow you to reduce MTTA, however, it will require to have as many metrics collected as possible to configure an alert for all of them. 

On top of reduced MTTA, you also want to have as low MTTR as possible, which is why monitoring solutions should not just notify about an issue, but also help to identify the root cause of those issues and highlight the affected part of your infrastructure.

On the individual server, as well as in dynamic environments services are started, stopped, or just moved around between nodes at any given time. Therefore, it is important to have a way to automatically discover changes in running processes on the node to start and stop collecting relevant metrics with the fine granularity (this will also improve your MTTA and MTTR).

Troubleshooting requires not only an organized and logical approach to eliminate variables and identify causes of problems in a systematic order, but also enriched data, helping you verify your assumptions or drive your investigation process.

The troubleshooting process steps are as follows:
<ol>
 	<li>Gather available information.</li>
 	<li>Describe the problem.</li>
 	<li>Establish a theory of probable cause.</li>
 	<li>Test the theory to determine the cause.</li>
 	<li>Create a plan of action to resolve the problem and test a solution.</li>
 	<li>Implement the solution.</li>
 	<li>Test the full system functionality and, if applicable, implement preventive measures.</li>
 	<li>Document findings, actions, and outcomes.</li>
</ol>
In many cases the first three steps are the most challenging, so let’s go deeper into steps 1-3 only.

### Gather available information

This is the beginning of your investigation process, therefore, limited information can lead to the wrong theory of probable cause of the issue.

The solution for this challenge: - have all possible metrics collected automatically for you without manual intervention (only if you want to tune it) - have the highest possible granularity (per second) - have all data automatically visualized (without prior manual configuration)

### Describe the problem

The best way to describe the problem is to list side effects identified based on the Alert, and also understand how other parts of your system are affected. For example: an issue with a particular service generated more logs than usual, and as a side effect the free space has been exhausted on the storage attached.

### Establish a theory of probable cause

Monitoring solutions should be able to not only expose metrics for investigation purposes, but to suggest correlation in between them. A good theory should take into account all aspects of the problem, including all anomalies that occur during the time of the investigation period or before that. In many cases, alerts are triggered based on symptoms and not on the actual cause of the issue. The extended data retention policy is a good addition for your investigation. 

## Granularity and retention

Every monitoring solution should provide the current state of the system, but the real power comes with the historical data.

A rich history of data can help you understand patterns and trends over time. In the ideal world, it would be good to have all raw metrics data stored indefinitely. However, the cost of data storage and the cost of processing data requires applying a data retention policy.

A data retention policy empowers system administrators to maintain compliance and optimize storage; it clarifies what data should be available in the hot storage, archived, or deleted, and what granularity should be used.

An example of a common data retention policy for time series metrics is presented in the following table:
<table>
<tbody>
<tr>
<td><b>Retention Period</b></td>
<td><b>Data Granularity</b></td>
</tr>
<tr>
<td>0 - 1 weeks</td>
<td>1 minute</td>
</tr>
<tr>
<td>1 week - 1 month</td>
<td>5 minutes</td>
</tr>
<tr>
<td>1 month - 1 year</td>
<td>1 hour</td>
</tr>
<tr>
<td>up to 2 years</td>
<td>1 day</td>
</tr>
</tbody>
</table>
Alternatively, a data retention policy can work with a tiering mechanism (providing multiple tiers of data with different granularity on metrics), as exemplified in the following table:
<table>
<tbody>
<tr>
<td><b>Tier       </b></td>
<td><b>Retention Period</b></td>
<td><b>Data Granularity</b></td>
</tr>
<tr>
<td>Tier 0</td>
<td>0 - 1 month</td>
<td>1 sec</td>
</tr>
<tr>
<td>Tier 1</td>
<td>0 - 6 months</td>
<td>1 minute</td>
</tr>
<tr>
<td>Tier 2</td>
<td>0 - 3 year</td>
<td>1 hour</td>
</tr>
</tbody>
</table>
In this tiered example, every second tier is sampling the data every 60 points of the previous tier.

When calculating the required storage size for metrics, it is important to remember that for aggregated tiers for a single counter, usually more data is going to be stored, such as the following:
<ul>
 	<li>The sum of the points aggregated.</li>
 	<li>The min of the points aggregated.</li>
 	<li>The max of the points aggregated.</li>
 	<li>The count of the points aggregated.</li>
</ul>

## Data collection strategies

MTTA is highly dependent on the data collection strategy.

Data collection isn’t always as straightforward as it might seem. There are plenty of opportunities to stumble in this stage, some of which could affect the accuracy of your metrics or even prevent a timely analysis.

There are a few different data collection strategies currently available on the market.

Let’s focus the most common, which are as follows: 
<ul>
 	<li>Transfer all the data to a third party - Cloud Monitoring Service Provider (CMSP) </li>
 	<li>Keep all the data inside your infrastructure - On-Premises Monitoring Solution (OPMS)</li>
 	<li>Hybrid, distributed solution (OPMS + CMSP)</li>
</ul>

### Data Collection Strategy Option 1: Transfer all the data to the third party

CMSP requires sending all the collected data to the cloud. Users do not need to run the monitoring-specific infrastructure.

In this case, CMSP is following the principle “Fire and Forget.”

Examples: <a href="https://www.datadoghq.com">Datadog</a>, <a href="https://newrelic.com">Newrelic</a>, <a href="https://dynatrace.com">Dynatrace</a>

#### Installation and configuration

<ol>
 	<li>Install data collector.</li>
 	<li>Configure data collector for the following: 
<ol>
 	<li>Define what metrics you would like to collect.</li>
 	<li>Specify granularity for each metric.</li>
</ol>
</li>
 	<li>All collected data will be transferred to the CMSP.</li>
 	<li>CMSP will store aggregated data on their side.</li>
 	<li>Based on the pricing plan, a predefined retention policy will be applied.</li>
</ol>

#### Usage Requirements

<ol>
 	<li>Data available only via CMSP webapp</li>
 	<li>You have some predefined dashboards for specific integrations</li>
 	<li>In order to visualize metrics data, you have to configure the chart by performing the following: 
<ol>
 	<li>Select the specific metric. </li>
 	<li>Configure the visualization options.</li>
</ol>
</li>
</ol>

#### Most common cost structure and limitations

<ol>
 	<li>Pricing plan (usually based on number of nodes or number of metrics)</li>
 	<li>Extra data ingestion (outside of your plan)</li>
 	<li>Extra data processing (outside of your plan)</li>
 	<li>Machine learning as an extra or part of the most expensive plan</li>
 	<li>Limited data retention (restricted by your plan)</li>
 	<li>Limited number of containers monitoring (restricted by your plan)</li>
 	<li>Limited number of metrics (restricted by your plan)</li>
 	<li>Limited number of events (restricted by your plan)</li>
 	<li>Cost of sending email notifications usually included in your plan</li>
 	<li>Low maintenance cost</li>
 	<li>High networking cost (data transfer, usually Cloud Service Providers charge for outgoing traffic)</li>
 	<li>In the end, the most expensive option</li>
</ol>

#### Key Benefits

<ol>
 	<li>Well-rounded features set</li>
 	<li>Ease of use</li>
 	<li>Extensive number for integrations driven by the CMSP</li>
</ol>

### Data Collection Strategy Option 2: Keep all the data inside your infrastructure

This option is usually available for On-Premises Monitoring Solutions (OPMS), mainly open-sourced based.

OPMS allows you to keep all collected data on premises and have full control of your data. Users have to run and support the monitoring specific infrastructure.

Example: <a href="https://prometheus.io">Prometheus</a>, <a href="https://grafana.com">Grafana</a>, <a href="https://www.zabbix.com">Zabbix</a>, <a href="https://www.dynatrace.com/support/help/setup-and-configuration/dynatrace-managed">Dynatrace Managed</a>, <a href="https://github.com/netdata/netdata">Netdata Agent Only</a>

#### Installation and configuration

<ol>
 	<li>Install data collector.</li>
 	<li>Configure data collector for the following:
<ol>
 	<li>Define what metrics you would like to collect </li>
 	<li>Specify granularity for each metric</li>
</ol>
</li>
 	<li>Install storage</li>
 	<li>Configure storage for the following: 
<ol>
 	<li>You can keep all collected data within your network </li>
 	<li>Flexible retention policy, you can use defaults of define your own.</li>
</ol>
</li>
 	<li>Configure your Email Service Provider (ESP)</li>
 	<li>Install visualization tool 
<ul>
 	<li>Usually available as part of the chosen OPMS </li>
 	<li>Might be used another open-source solution</li>
</ul>
</li>
</ol>

#### Usage Requirements

<ol>
 	<li>In order to visualize metrics data, you have to configure the chart for the following:
<ol>
 	<li>Define data source </li>
 	<li>Select specific metric </li>
 	<li>Configure the visualization options</li>
</ol>
</li>
 	<li>Support monitoring infrastructure</li>
</ol>

#### Most common cost structure and limitations

<ol>
 	<li>Compute cost based on your usage.</li>
 	<li>Database cost based on your usage.</li>
 	<li>High installation cost (time spent by SRE/DevOps to have the solution running).</li>
 	<li>High maintenance cost.</li>
 	<li>Cost of sending emails via ESP (Note: this is not required).</li>
 	<li>Machine learning usually is not available.</li>
</ol>

#### Benefits

<ol>
 	<li>Monitoring-focused features set.</li>
 	<li>Extensive number of integrations driven by the open-source community.</li>
 	<li>Full management of monitoring cost structure.</li>
</ol>

### Data Collection Strategy Option 3: Hybrid, distributed solution

The third option is a mixed approach, allowing you to take advantage of the best of both options 1 and 2 by allowing an extensive feature set from CMSP as well as having flexibility of your data retention and low cost from OPMS.

Due to the distributed nature of this solution, users are able to collect and store data on their premises (in other words: have full control of collected data).

In this scenario, CMSP is playing the role of the orchestrator, as a result, only the metadata needs to be shared with CMSP for the request routing purposes.

In this option, the following metadata can be shared:
<ul>
 	<li>Nodes topology </li>
 	<li>The list of metrics collected </li>
 	<li>The retention information for each metric</li>
</ul>
Example: <a href="https://netdata.cloud?utm_source=blog">Netdata</a>

Netdata can be classified as a hybrid solution because it has two components - open-source Agent and the cloud-based Netdata solution.

#### Primary responsibilities of the Agent

<ul>
 	<li>Collect metrics data for the Node, where the agent is running on. More than 2k collectors are currently supported.</li>
 	<li>Store collected metrics. <a href="https://learn.netdata.cloud/docs/agent/database?utm_source=blog">Various</a> database modes are supported: dB engine, ram, save, map, alloc, none.</li>
 	<li>Store data for other Nodes (in case agent playing a role of a “Parent” and collects data from other Agents, called “Children”). <a href="https://learn.netdata.cloud/docs/agent/streaming?utm_source=blog">Streaming and replication</a>.</li>
</ul>

#### Primary responsibilities of the Netdata Cloud solution

<ul>
 	<li>Visualize data collected from multiple Agents. Data requests routed to the very specific Agents. Routing information build based on the metadata received from Agents.</li>
 	<li>Provide Infrastructure level view data representation</li>
 	<li>Keep alerts state changes from all Nodes</li>
 	<li>Dispatching alerts notifications.</li>
</ul>

#### Installation and configuration

<ol>
 	<li>Log in in to <a href="https://app.netdata.cloud/?utm_source=blog">Netdata.</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/get-started">Install the Agent</a> (includes data collectors with auto-discovery and storage; data collectors are already preconfigured with 1 sec granularity.</li>
</ol>

#### Usage Requirements

<ol>
 	<li>There is no need to install a visualization tool. Netdata's cloud solution is already there for you.</li>
 	<li>There is no need to configure charts. Every single metric is already associated to the chart.</li>
 	<li>You just need to log in in to <a href="https://app.netdata.cloud">Netdata</a> to see various dashboards (infrastructure Overview, individual Nodes, Alerts, Machine Learning, etc.) as well as individual charts associated with Alerts.</li>
</ol>

#### Most common cost structure and limitations

<ol>
 	<li>Compute cost based on your usage (inside your infrastructure)</li>
 	<li>Database cost based on your usage (inside your infrastructure)</li>
 	<li>Low installation cost (one-line installation command for manual installations or <a href="https://learn.netdata.cloud/guides/deploy/ansible">Ansible</a> playbook for automation)</li>
 	<li>Low maintenance cost (<a href="https://learn.netdata.cloud/docs/agent/packaging/installer/update#control-automatic-updates">Agent automatically updated</a>)</li>
 	<li>Netdata will send all emails for free</li>
 	<li><a href="https://learn.netdata.cloud/docs/agent/ml">Machine learning enabled by default</a> on the Agent, visualized for free within the Netdata</li>
 	<li>Free Nodes reachability alerts from Netdata</li>
 	<li>Stated plainly, this is the cheapest option.</li>
</ol>

#### Benefits

<ol>
 	<li>Mainly troubleshooting-focused features set.</li>
 	<li>Ease of installation and maintenance</li>
 	<li>Extensive number for integrations driven by the open-source community</li>
 	<li>Data immediately available for querying</li>
</ol>

## Summary

The following summarizes what is important for troubleshooting purposes: 
<ul>
 	<li>You should be able to collect as many metrics as you want </li>
 	<li>Metrics should be collected automatically with high granularity (1 sec) </li>
 	<li>You need to retain as much data as you want at the minimum cost</li>
 	<li>You need to provide an ability to contribute (i.e. create your own collector) </li>
 	<li>You should be able to easily visualize all metrics (no need to configure chart for every metric) </li>
 	<li>You need fast access to data metrics (data should be available ASAP, ideally next second) </li>
 	<li>You should be able to automatically identify anomalies and suggest correlations across all collected metrics</li>
</ul>
With these in mind, let’s come back to our data collection strategies

### Option 1: Transfer all the data to the third party (CMSP)

This option is good for generic monitoring purposes, with limited troubleshooting capabilities due to designed data flow. It is also the most expensive option, leaving you to deal with the following: 
<ul>
 	<li>Manual intervention to enable and configure data collectors </li>
 	<li>High cost for data transfer, processing and storage leads to low granularity of data and limited number of metrics to be collected </li>
 	<li>Manual chart configuration, requires a prior knowledge of available metrics </li>
 	<li>Making assumptions based on the experience, rather than on data available (you need to know what metric you would like to check) </li>
 	<li>Significant lag before data will be available for querying (due to data flow design)</li>
</ul>

### Option 2: Keep all the data inside your infrastructure (OPMS)

This option is cheap, but the least helpful solution for troubleshooting needs. It has the same limitations as Option 1, due to aggregation needs, plus you will be saddled with the following: 
<ul>
 	<li>Lower number of metrics and low granularity usually are the suggested way </li>
 	<li>Limited number of features available; for example, an ML-based charts suggestion mechanism will not be available.</li>
 	<li>Burden of complete ownership of the monitoring/troubleshooting infrastructure on the user.</li>
</ul>

### Option 3: Hybrid, distributed solution

This option is the best case for troubleshooting purposes, as this solution allows you to have highest granularity with a significant number of metrics automatically collected for you. 
<ul>
 	<li>Full control of cost </li>
 	<li>No need to pay for outgoing traffic. Similar to Option 2, data is stored inside your own infrastructure that does not need transferred outside of your network (no need to pay for the outgoing traffic/ </li>
 	<li>Data immediately available for querying, no need to wait for data transfer and processing.</li>
</ul>
It is worth paying attention to the free infrastructure monitoring solution focusing on troubleshooting in the first place:  <a href="https://netdata.cloud">Netdata</a>.

The Netdata Agent is free by its open-source definition (license GNU GPL v3).

The Netdata cloud solution is the close-source software; however, it is able to provide a free orchestration service for everyone (only metadata is going to be transferred to the Netdata Hub and not actual data, this is why the cost of the service is negligible and can be provided free of charge by Netdata).

In the future, you will be able to get a paid support plan in case you would like to get extra help on top of the free community support. Netdata also plans to offer Managed Data Centralization Points (Netdata parents, to keep not only the metadata, but the actual data as well) at additional cost. More details are available <a href="https://www.netdata.cloud/pricing">here</a>.

On top of the already-described benefits of the Hybrid solution, Netdata is able to automatically show charts relevant to the highlighted area across all collected metrics (every single metric automatically has a chart representation). Netdata is also able to show metric anomalies based on Machine Learning (running on the Netdata Agent - client side and not on the CMSP).

## Questions? Ideas? Comments? Learn more or contact us!

Feel free to dive deeper into the Netdata knowledge and community using any of the following resources:
<ul>
 	<li><a href="https://learn.netdata.cloud/">Netdata Learn</a>: Find documentation, guides, and reference material for monitoring and troubleshooting your systems with Netdata.</li>
 	<li><a href="https://github.com/netdata/netdata/issues">Github Issues</a>: Make use of the Netdata repository to report bugs or open a new feature request.</li>
 	<li><a href="https://github.com/netdata/netdata/discussions">Github Discussions</a>: Join the conversation around the Netdata development process and be a part of it.</li>
 	<li><a href="https://community.netdata.cloud/">Community Forums</a>: Visit the Community Forums and contribute to the collaborative knowledge base.</li>
 	<li><a href="https://discord.gg/2eduZdSeC7">Discord</a>: Jump into the Netdata Discord and hangout with like-minded sysadmins, DevOps, SREs and other troubleshooters. More than 1100 engineers are already using it!</li>
</ul>