---
title: Exploring systemd journal logs with Netdata
subtitle: 
date: 2023-10-12
author: shyam
related: ["", "", ""]
tags: 
  [
    "systemd-journal",
    "logs",
    "log",
    "infrastructure-monitoring",
    "syslog",
    "journalctl",
    "devops",
  ]
image: "https://github.com/netdata/blog/assets/139226121/bde464b5-e380-4528-93f6-bdc41414f314"
---
Today, we released our `systemd` **journal plugin for Netdata**, allowing you to explore, view, search, filter and analyze `systemd` journal logs.

Like most things about Netdata, this is a **zero-configuration plugin**. You don’t have to do anything apart from **installing Netdata** on your systems.This is key design direction for Netdata, since we want Netdata to be able to help even if you install it mid-crisis, while you have an incident at hand.

Netdata will automatically detect `persistent` (on disk) and `volatile` (on `tmpfs`) journals, `system` journals, `user` journals, journal `namespaces` and `remote` journals. The Netdata UI offers the ability to select any of these journal categories or work on all of them, as if they were one. When you work on all of them together, logs are multiplexed from all log streams, in the same view.

Netdata will also work on the **journal logs** of individual servers, but also on infrastructure-wide **log centralization** servers based on `systemd` journal. Below we give you configuration instructions on how to build such servers in your infrastructure.

There is a plethora of additional features, like **full text search** on all journal fields, **filtering** based on any key and value, **coloring** of the logs similarly to `journalctl`, **tailing** the journals for new log entries (emulating `journalctl -f`, we call this PLAY mode), identifying all **system boots** that happened in the visible timeframe, and many more.


## Comparing Netdata with `journalctl`

From a user perspective, the Netdata UI is like an explorer of the logs available in the journal files, while `journalctl` is more like a query tool.

So, by using Netdata you don’t need to know beforehand what you are looking for. Netdata will help you find it. In the `journalctl` case, you need to have prior knowledge of the exact fields you are interested in querying, which can be hard given the vast amount of fields available.

Netdata will also automatically calculate the frequency fields and their values appear within a given timeframe. It will use this, to present a **histogram of log fields** and values over time, giving a complete view of how **log entries** evolved. This is a feature that is usually found in log management systems, but is missing from `systemd` journal. So, **Netdata calculates this on the fly, while you are working with the journal logs**.

Also, Netdata builds more complex queries behind the scenes. Queries that the <code>journalctl</code> command line does not support building.

From a performance standpoint, Netdata is about **25-30 times faster** than `journalctl` on **multi-journal queries** (most of them are, since multiple files are created for each stream of logs), over longer time-frames.

During the development of this plugin, we submitted to `systemd` a number of patches to improve `journalctl` performance by a factor of 14 ([this](https://github.com/systemd/systemd/pull/29365), [this](https://github.com/systemd/systemd/pull/29366) and [this](https://github.com/systemd/systemd/pull/29261)). However, even after these patches are merged, `journalctl` will still be 2x slower than Netdata on multi-journal queries. The reason lies in the way `libsystemd` handles such queries. To overcome this problem, Netdata queries each file individually and then it merges the results.
