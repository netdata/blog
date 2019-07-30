---
title: "Our new DB Engine: It's super great"
summary: "t/k"
date: 2019-08-06
author: "Joel Hans"
cover: "how-to-netdata-cloud.png"
tags: ["How Netdata works"]
categories: []
draft: false
---

We've built a lot of amazing things into the open-source [Netdata](https://github.com/netdata/netdata) monitoring system, but no matter how far we've come, we're always proud of how little RAM it uses.

By default, Netdata holds metrics in the system's RAM with a ridiculously efficient database, which even includes a [custom-built 32-bit number](https://docs.netdata.cloud/libnetdata/storage_number/), and only saves or loads historical metrics from disk on restart. 

If you collect 1,000 metrics every second, and only need an hour's worth of historical data, you'll use up 14.4MB of RAM. If you want to collect a day data on 1,000 metrics, you'll need 345MB of RAM. Or, you can really push Netdata to its limits and [collect 100,000 metrics](https://github.com/netdata/netdata/issues/1323) for an hour and use a *mere 1.7GB of RAM*.

{{< figure src="/img/db-engine_server.png" alt="A screenshot of the Netdata dashboard with a server collecting 100,000 metrics" position="center" style="border-radius: 4px;" caption="And use only 9% CPU on a single core while you're at it!" captionPosition="center" >}}

Given that many of today's desktop/laptop systems have 32GB of RAM, and servers in data centers have much more than that, 345MB of RAM doesn't seem like too much of a burden.

But what if you want to store weeks of metrics data at one-second granularity? Or months? Or **years**?

Enter our new database engine.

## Sleek, smart, and even more efficient

The new DB engine gives Netdata users the option to store compressed metrics data for longer periods than the RAM-only database can possibly offer. We released the first version on May 22, 2019, with the [v1.15.0 release](https://github.com/netdata/netdata/releases/tag/v1.15.0) of Netdata.

It works like a traditional database by using a certain amount of RAM for data caching and indexing, while then sending the rest of the data to disk in a compressed format. Because the DB engine sends historical metrics data to disk, it can help you store a much larger dataset than the amount of RAM your system has.

How much? Let's take a look at some examples.

With a typical compression ratio of 80%, each metric (when collected every second), will require 25MiB **for an entire year**. The more random metrics are, the less compressible they are. Really random metrics will take up 135MiB/metric/year, again at that 1 second granularity.

Given a machine collecting 1,000 metrics every second, you'd need 25,000MiB (2.44GiB) of disk space to hold an entire year's worth of data.

Or, let's say you have a large server, and Netdata is collecting 2,000 metrics every second. Given an average 80% compression ratio, the default 256MiB of disk space will hold about two day's worth of metrics.

The real-life memory and disk space considerations are a little more complicated than that, but those are ballparks based on all our real-world testing. The DB engine doesn't just allow you to collect thousands of highly granular metrics in perpetuity, but it's still really exciting new territory for the Netdata team.

> If you want to read all about the dirty details, check our our [documentation on the DB engine](https://docs.netdata.cloud/database/engine/).

## How will the DB engine help you?

If you already use a [backend](https://docs.netdata.cloud/backends/) to archive your metrics data for long-term storage or backup, you may be able to use the DB engine instead. That simplifies your monitoring stack and allows you to use a single web dashboard to compare today's metrics with yesterday's or last month's.

If you use Netdata standalone, you should be able to store more metrics data without taking up too much RAM. That's pretty neat, too.

That's the beauty of the new DB engine—it simply makes Netdata better, no matter who's using it.

## The shining future of the DB engine

Right now, the new DB engine is just one of the many [memory mode options](https://docs.netdata.cloud/database/#memory-modes). While `save` is the current default, we plan on making `dbengine` the default in the future.

The first item on the priority list is reducing the memory footprint even further while making the engine more robust in complex use cases.

Currently, you can't change your data collection frequency without losing some or all of the metrics data that's currently being stored. DB engine may lose some of its accuracy, and other memory modes discard it entirely. We're workign to change that with an upcoming release.

Since your collection requirements might change over the course of a year, we want to ensure you can always access the metrics you collected before but aren't currently. Right now, Netdata can only query metrics that are *actively* being collected, but we're working on queries for ephemeral or obsolete metrics. 

And for those large servers with lots of metrics, we're developing a way to progressively thin your data by aggregating the oldest metrics and reducing their frequency. Thinning and tiering should reduce disk space requirements and help you cover even longer time periods.

And while those features are still being worked on, the DB engine is fully functional *right now*. If you'd like to try it out on your Netdata agent, you can set the `memory mode` in `netdata.conf`:

```
[global]
    memory mode = dbengine
```



https://github.com/netdata/blog/issues/30
https://docs.netdata.cloud/database/engine/