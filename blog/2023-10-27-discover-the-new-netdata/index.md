---
slug: discover-the-new-netdata
title: "Discover The New Netdata!"
description: |
  Discover the new features we have added to Netdata. systemd journal logs, machine learning features and so much more
authors: costa
tags: [monitoring, observability, netdata, systemd journal, logs, ML]
keywords: [monitoring, observability, systemd journal, logs, machine learning, netdata agent]
image: https://github.com/netdata/blog/assets/139226121/6cdf202e-b654-42e8-889c-d401fbeae3fa
---
![The New Netdata](https://github.com/netdata/blog/assets/139226121/6cdf202e-b654-42e8-889c-d401fbeae3fa)

Missed the last **Netdata** updates? Here is what is new:

# Explore your systemd-journal logs with Netdata

![systemd-journal-logs](https://github.com/netdata/blog/assets/139226121/7d2779c9-0efb-4491-8fe3-aedce1dc72fb)

Netdata [got a `systemd`-journal logs explorer](https://learn.netdata.cloud/docs/logs/systemd-journal/?utm_source=IL&utm_medium=internallinking&utm_campaign=new_netada) to analyze your `systemd`-journal logs, directly on their sources. By just installing **Netdata** on any systemd based system, Netdata automatically finds all the **journal sources** and presents a powerful dashboard to explore, search, filter and analyze your **logs**. It works on both individual servers and journal centralization servers.

[Watch a quick video](https://www.youtube.com/watch?v=-PLUjVXwC4Q) on how to monitor `systemd` journal logs with Netdata.

Need more details? Check our [release meetup video](https://www.youtube.com/watch?v=YRTDQ1CsE3Y&t=9s), where Netdata’s founder Costa Tsaousis deep dives on this feature and explains how it works, how you can utilize the power of `systemd` journal and how you can build a secure logs management system based on `systemd`-journal.

## New Dashboard, New Charts, New UI

<img width="1149" alt="Screenshot 2023-10-27 at 9 47 27 AM" src="https://github.com/netdata/blog/assets/139226121/885611a7-6d94-4425-8267-c337e63d6211">


Completely new charts and dashboards, to explore, slice and dice any dataset without learning a query language.

The new **Netdata charts** follow the NIDL (Nodes, Instances, Dimensions, Labels) framework to provide:

- Clarity on which metrics and components are integrated into any chart.
- Advanced filtering capabilities, for slicing the data in all possible ways.
- Advanced re-grouping capabilities, for dicing the data to observe the data from different angles.

The **new Netdata UI** offers amazing flexibility, directly from the UI, without any prior knowledge about the metrics and their sources, allowing even first-comers to perform advanced queries on Netdata dashboards. This is a **unique feature of Netdata**, unlike most other monitoring solutions that require learning a query language for customizing the charts.

[Check our comprehensive video to learn more!](https://www.youtube.com/watch?v=T5N_03NV9Ac&t=14s)

### Netdata Parents now offer multi-node dashboards

![multi-node dashboards](https://github.com/netdata/blog/assets/139226121/dccc1a10-a9b9-42b9-8450-91f2452c9de7)

The New **Netdata UI** offers **multi-node, infrastructure level dashboards**, when it is used on metrics centralization points (Netdata Parents).

Netdata Parents are Netdata Agents (same open-source software), which are configured to accept streaming connections from multiple other Netdata Agents.

Several improvements have been made to this functionality:

- New SSL layer for secure streaming connections
- Reliable compression using LZ4
- Significantly faster, more reliable and more memory efficient than before
- Amazing support for labels cardinality when used in kubernetes setups

**Netdata Parents** now offer unbeatable vertical **scalability**, allowing the centralization of **millions of metrics (per second) to a single Netdata Parent**.

#### Netdata ML: unsupervised anomaly detection

![anomaly detection](https://github.com/netdata/blog/assets/139226121/03d5f903-8508-4027-bad7-af8c919a0a2b)


Every Netdata Agent has, by default, the ML-engine enabled. These agents will begin producing an **"Anomaly Bit"** every second in addition to raw metric values. This anomaly bit will be 1 when the trained **ML models** consider recent raw data for a metric to look anomalous or 0 when things look 'normal'. 

This “Anomaly Bit” has been added to each raw metric value, with no extra storage overhead and typically negligible CPU cost.

When you start aggregating anomaly bits beyond 1 second (to 5, 10 second etc), you will get  an **“Anomaly Rate” (AR)** for every metric out of the box.

This anomaly related information is provided on Netdata dashboards to speed-up your troubleshooting journey. You can find it:
- Directly on each chart, the AR ribbon that flags potential areas to focus on
- Additional information on the Table of Contents (ToC), by clicking on the AR% button you’ll get an aggregated value of the AR across the charts that are inside that specific section
- “Anomaly Advisor” tab, here you can surface potentially anomalous metrics and charts related to a particular highlight window of interest 
- ML based anomaly alerts, Netdata’s alert engine can use the AR information to be used as the trigger conditions for the alerts

With this approach Netdata tries to bring you **[ML-capable features](https://blog.netdata.cloud/our-first-ml-based-anomaly-alert/)** together with what you’re looking at on the **dashboards.**

#### Netdata Integrations Marketplace: 800+ integrations

[Integrations MarketPlace](https://github-production-user-asset-6210df.s3.amazonaws.com/139226121/278617020-c4d534d7-779b-47ca-b8d8-e10f7ee4fb90.png)

With the **Integrations Marketplace** available on the **Netdata UI**, you immediately get all the information you need about a given integration, this includes. You will find integrations for:

- **Deployment**: what are the available deployment options you have
- **Data Collection**: all the available applications and devices you can monitor with Netdata
- **Exporters**: available exporting options to where you can send the collected data
- **Notifications**: what notifications mechanisms you can use to receive your alert notifications

On each integration card you can find information from: Overview, Metrics, Alerts, Setup and Troubleshooting.

No more need to fiddle around with the documentation, everything is available at your fingertips!
