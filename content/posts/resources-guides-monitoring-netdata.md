---
title: "Our favorite resources on monitoring, alerting, and observability (plus Netdata!)"
date: 2019-07-17
summary: "Need to better understand what all the visualizations in Netdata actually mean? Dive into our favorite resources to broaden your insights."
author: "Joel Hans"
cover: "resources-guides-monitoring-netdata.jpg"
tags: ["tutorials", "monitoring"]
categories: []
draft: true
---

Someday, whether via this very blog or over at the [Netdata documentation](https://docs.netdata.cloud/), we're going to build a comprehensive resource for helping developers, sysadmins, and DevOps engineers learn more with every time they load up their Netdata dashboard. We're actively planning courses, in-depth tutorials, videos, and more. And we promise it's going to be fantastic.

We just need more time — a lot more.

And until we've put the finishing touches on all those resources, we realize Netdata's users will need to look elsewhere to learn more about monitoring, alerting, and observability. That's why we've compiled some of our favorite resources, guides, and tutorials on the world of monitoring (plus a few on Netdata specifically) to whet your appetite and help you learn more from the data you see on your Netdata dashboards.

<!--more-->

## Lists and big-picture resources
**<span style="color: #17CE8A;">Measure Anything, Measure Everything</span>**  -> [link](https://codeascraft.com/2011/02/15/measure-anything-measure-everything/)

{{< figure src="/img/resources-guides-monitoring-netdata_statsd.png" alt="A Graphite graph made using statsd" position="center" caption="statsd and Graphite working together. Game-changer." captionPosition="center" >}}

It's one of the foundational documents of today's monitoring landscape, and the moment when [statsd](https://github.com/statsd/statsd) walked out onto the main stage. This idea of *measuring everything* is fundamental to how we've built Netdata's [open-source monitoring agent](https://github.com/netdata/netdata) to collect and store thousands of real-time metrics, at a 1s granularity, with almost no overhead.

A must-read for anyone new to monitoring.

**<span style="color: #17CE8A;">Awesome Site Reliability Engineering</span>**  -> [link](https://github.com/dastergon/awesome-sre)

Yes, it's another `awesome` list. While awesome lists might seem a bit overplayed by now, the SRE list is being actively updated and is full of excellent articles and other resources to help you get a better grasp on monitoring, observability, and overall culture around site reliability engineering (SRE).

**<span style="color: #17CE8A;">Observability: the new wave or buzzword?</span>** -> [link](https://medium.com/@dlite/observability-the-new-wave-or-buzzword-fc23a68abf72)

You might have heard the *observability* word yourself, but do you understand how it fits alongside monitoring, debugging, and alerting?

{{< figure src="/img/resources-guides-monitoring-netdata_observability.png" alt="A photograph of two pyramid charts showing the increase in reliance on debugging over the last 5 years" position="center" caption="Just one way to perceive the 'observability iceberg'." captionPosition="center" >}}

All in all, it's a pretty fascinating look into the future of soft-failing software, where application code is at the center of why we monitor, get alerts, and hope we can respond fast enough.

**<span style="color: #17CE8A;">Monitoring and Observability</span>** -> [link](https://medium.com/@copyconstruct/monitoring-and-observability-8417d1952e1c)

Still not sure what observability is? This post from Cindy Sridharan is a comprehensive look into the definitions (and motivations) behind *monitoring* vs. *observability*, *white-box* vs. *black-box*, building *monitorable* systems, and how debugging fits into this already complex equation.

**<span style="color: #17CE8A;">Monitoring distributed systems</span>** -> [link](https://www.oreilly.com/ideas/monitoring-distributed-systems)

This case study from O'Reilly is a fascinating look into how an incredibly complex organization like Google handles SRE and monitoring.

> In general, Google has trended toward simpler and faster monitoring systems, with better tools for post hoc analysis. We avoid "magic" systems that try to learn thresholds or automatically detect causality. 

## Tutorials on monitoring

**<span style="color: #17CE8A;">Introduction to Monitoring and Logging: How to Know When Things Go Wrong</span>** -> [link](https://dev.to/kylegalbraith/introduction-to-monitoring-and-logging-how-to-know-when-things-go-wrong-535j)

While this post never talks about Netdata specifically, it's a great rundown of the concepts behind *why* we should be monitoring our systems and applications.

> How do we know when things fail? Or even better, how can we know when things are beginning to fail? There is an important distinction here.

**<span style="color: #17CE8A;">For the Love of Bleep! Building a Scalable Monitoring System</span>** -> [link](https://dev.to/molly_struve/for-the-love-of-bleep-building-a-scalable-monitoring-system-520)

Molly Struve, one of the Site Reliability Engineers at [Kenna](https://www.kennasecurity.com/careers/), has some compelling thoughts on consolidating monitoring software, making alerts actionable, knowing when to mute, and more. The end result? A scalable monitoring system that's more than worth the effort she put into it.


## Blogs worth following

**<span style="color: #17CE8A;">The Netdata Blog</span>** -> [link](https://blog.netdata.cloud/)

Yes, you're already here. But since we'll be publishing new content on monitoring every week for the long haul, I think you'll want to come back.

If you're an RSS fan, be sure to subscribe to our [RSS](https://blog.netdata.cloud/index.xml) or [JSON](https://blog.netdata.cloud/feed.json) feeds.

**<span style="color: #17CE8A;">Brendan Gregg's Blog</span>** -> [link](http://www.brendangregg.com/blog/index.html)

From a technical analysis into how wrong your perception of CPU utilization is, to figuring out Linux load averages, Brendan has you covered. Once you've read up on his latest thoughts, feel free to dig through his 10-year archive of posts.

**<span style="color: #17CE8A;">High Scalability</span>** -> [link](http://highscalability.com/)

*High Scalability* has been helping people build scalable websites since 2007. It's devolved a bit into weekly summaries of scalability resources/links, but it's still a good addition to your RSS reader to make sure you're on top of the newest trends.

**<span style="color: #17CE8A;">rachelbythebay</span>** -> [link](https://rachelbythebay.com/w/)

"Software, technology, sysadmin war stories, and more." Rachel has seen it all, and reliably delivers intelligent thoughts on *all* the aspects of being a sysadmin.

**<span style="color: #17CE8A;">Joel on Software</span>** -> [link](https://www.joelonsoftware.com/)

Does Joel Spolsky need an introduction? Maybe not, but here's a brief one: He's one of the co-founders of Stack Overflow. Over the past 16 years, he's written more than 1,000 articles on software development and how software engineers can improve their station in always-changing industries.

**<span style="color: #17CE8A;">Coding Horror</span>** -> [link](https://blog.codinghorror.com/)

And a blog written by the *other* co-founder of Stack Overflow, Jeff Atwood. Recent pieces include an examination of how to enable [DNS-level adblocking](https://blog.codinghorror.com/an-exercise-program-for-the-fat-web/) with a Raspberry Pi running Pi-Hole and [running your own "cloud"](https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/) with a co-located mini PC.


## Netdata-specific tutorials

**<span style="color: #17CE8A;">Graphing systems metrics with netdata, Prometheus, and Grafana</span>** -> [link](https://medium.com/vimeo-engineering-blog/graphing-systems-metrics-with-netdata-prometheus-and-grafana-29ba9ec6bc98)

Louis DeLosSantos, a member of the Vimeo engineering team, posted a comprehensive tutorial on how to use Netdata to collect real-time metrics about a system and then connect them to two other complimentary monitoring solutions to round out a complete system. You get real-time data, powerful charting, and the ability to downsample data for long-term storage in a time-series database. The best of all worlds! And a great reminder that we have *complimentary systems, not competitors*.

{{< figure src="/img/resources-guides-monitoring-netdata_grafana.png" alt="A screenshot of a graph in Grafana being powered by Netdata" position="center" caption="A 'complete systems monitoring stack' (his words!) after connecting Netdata, Prometheus, and Grafana." captionPosition="center" >}}

**<span style="color: #17CE8A;">How to Set Up Real-Time Performance Monitoring with Netdata on Ubuntu 16.04</span>** -> [link](https://www.digitalocean.com/community/tutorials/how-to-set-up-real-time-performance-monitoring-with-netdata-on-ubuntu-16-04)

Leave it to the Digital Ocean community to write a pretty timeless and detailed tutorial on the process of installing Netdata on Ubuntu 16.04.

While we do have a [simpler installation](https://github.com/netdata/netdata#quick-start) option available now, which requires no configuration to get going, this tutorial walks you through deciding how much data you'd like to retain (aka how much RAM you want Netdata to use), and uses Nginx to host the dashboard and make it more secure.

It's a great introduction to Netdata's flexibility. And recent comments on the tutorial suggest it's just as relevant now as it was when it was first written in 2016.

**<span style="color: #17CE8A;">Tutorial: Installing Net Data For Real Time Linux Performance and Health Monitoring</span>** -> [link](https://www.youtube.com/watch?v=Si14b8-XvRw)

Prefer to get your tutorials in visual form? Lawrence Systems has a great YouTube video that shows you not only how to install Netdata, but also gives some real-life examples of how they're using Netdata to monitor their [UniFi](https://unifi-sdn.ui.com/) networked cameras. 

A great resource for understanding how businesses can get practical benefits from their Netdata monitoring agents.

## Moving forward

We're just getting started in writing and curating the best resources in monitoring. Have anything that you'd like to see us cover in a future post, or even add to this post? [Send me an email](mailto:joel@netdata.cloud) and I'll take a look. The Netdata community has always been about sharing meaningful information and helping each other create more extraordinary infrastructures, and we're excited to make this very blog a significant part of that effort.