---
title: The Future of Monitoring is Automated and Opinionated
subtitle: 
date: 2023-05-09
author: costa
related: ["", "", ""]
tags: 
  [
    "monitoring",
    "infrastructure-monitoring,deployment-strategies",
  ]
image: "../img/stacked-netdata.png"
---
So, you think you monitor your infra?

<!-- truncate -->

As humanity increasingly relies on technology, the need for reliable and efficient infrastructure monitoring solutions has never been greater.

However, most businesses don't take this seriously. They make poor choices that soon trap their best talent, the people who should be propelling them ahead of their competition.

Consider this: most of the world believes that each company needs to dedicate time, talent, and money to configure and set up the monitoring of their web servers and database servers from scratch!

You didn’t get it? Let me explain: we are all using the same web servers and database servers, e.g., Nginx, Apache, PostgreSQL, MySQL, etc. And we all run them on very similar servers, VMs, or containers.

Yet somehow, industry leaders, experts, and influencers have convinced us all that we need to have a deep understanding of each and every metric, learn a query language, and go through the painstaking process of manually configuring dashboards and alerts chart by chart, metric by metric, and alert by alert, to have our software properly monitored!

I'm sure they also expect that all companies worldwide can magically manage to do it properly and enjoy a holistic view of their systems and applications!

How probable is that? 1%? 2%? 5%? It cannot be more… (and to be honest, unless you work for Netflix, you're likely not in that 5%).

Interestingly, most developers have been convinced that it's to their benefit to learn these technologies. So today, engineers suggest these technologies to their bosses as the best solutions for the task.

Isn’t the world amazing?

Of course, I don't underestimate the value of developers having a basic understanding of monitoring concepts that can help them create better software and identify issues earlier in the development process. And I do believe businesses must have a good grasp of the metrics they need to run their infrastructure and services. But at the same time, I find that the current setup is a waste of resources on a global scale and does not promote quality of service.

Certainly, automation has its drawbacks and limitations. Many may argue that automated monitoring systems may not be able to account for all the unique factors and nuances of a particular business's infrastructure and may not provide the same level of customization and control as a manual approach.

However, I know that for 99% of the companies out there, the manual approach to monitoring is more of a problem than a benefit.

Let's take an example.

At Netdata, we now release our new visualization engine. Each chart on our fully automated dashboards can now tell a full story about each and every metric. Along with the metric data, hidden in little ribbons and menus around the graph, you can find:

- The anomaly rate of all the metrics presented.

- For each Node, Instance, Dimension, and Label (we call this NIDL) involved in the query, its anomaly rate, its volume contribution to the graph, the min, avg, and max value of the points aggregated into the query.

- Annotations to inform you if any point presented has partial data (not all metrics contributed data to it), or if any metric has overflowed.

- The ability to pivot the data, grouping it and filtering it in any way imaginable, without a query language.

So, in Netdata, each query is actually a sophisticated algorithm providing much more insights than just the data requested, helping users instantly gain a clear understanding of what each metric is and what data is used behind the scenes. How much time would you need to configure this manually? And would you ever do it? How much time would you save at 3am while troubleshooting with all this available at your fingertips?

In the next version, we are going to release an expanded version of the charts that utilize our **metrics scoring engine**, providing three additional tools:

1. The ability to **drill down** into the chart to find which of the aggregated metrics, instances, nodes, and labels has the spike, dive, or anomaly rate you see on the graph.

2. The ability to **compare** the visible graph with its past to reveal how it compares, for example, with the same time yesterday, last week, or when in the past it had a similar behavior to the one you see on the graph.

3. The ability to **find correlations** with metrics not included in the chart by revealing other metrics that look similar or show the same trend or pattern.

Combine all the above with **auto-discovery** for most metrics and **fully automated dashboards and alerts** that are instantly available the moment you install Netdata on your servers.

While it's difficult to predict exactly how the monitoring industry will evolve, one thing is clear: monitoring needs to become simpler, more intuitive, and even enjoyable to use. By harnessing the power of cutting-edge technology, we can create systems that handle the heavy lifting of pinpointing crucial insights, detecting anomalies, finding similarities, and correlating metrics. Our relentless pursuit of these goals will not only enhance the monitoring experience but also contribute to a smoother and more efficient global infrastructure. Ultimately, we're working tirelessly to shape a future where advanced monitoring solutions enable us to optimize the way the world operates.
