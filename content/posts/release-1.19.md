---
title: "Release 1.19: More efficient DevOps with web log parsing and unit testing" 
date: 2019-11-27
summary: "Version 1.19 of Netdata is all about efficiency. Essential collectors are now faster and more intelligently parse essential files, and unit testing " 
author: "Joel Hans" 
cover: "release-1.19.0.png" 
tags: ["Release"]
---

Network monitoring is complex, which is why we're developing a monitoring tool that will drastically increase DevOps
productivity. This release is all about improving Netdata's day-in, day-out performance. We're working hard to make
deploy enhancements that help engineers make faster, smarter decisions about their systems.

v1.19 of Netdata delivers a vastly improved way to collect, parse, and understand the health and performance of any
service or application that runs through an Apache or Nginx web server.

And, perhaps more importantly, this improvement lands us one step closer to a generic application log parser for
Netdata.

Web log parsing comes on top of 19 bug fixes, 17 improvements, and 18 documentation updates. Let's jump in.

<!--more-->

## Go-based web log parsing

We completed a major rewrite of our web log collector to improve its flexibility and performance dramatically. The new
collector, written entirely in Go, can parse and chart logs from Nginx and Apache web servers, and contains numerous
improvements. 

Netdata now supports the LTSV log format, creates charts for TLS and cipher usage, and is amazingly fast—in a test using
SSD storage, it parsed the logs for 200,000 requests in about 200ms, using 30% of a single core. We want to do more
performance testing in real-world environments, but the initial results are promising.

This Go-based collector also has powerful custom log parsing capabilities, which means we're **one step closer to a
generic application log parser for Netdata**. We're continuing to work on this parser to support more application log
parsing in the future.

We have a new tutorial on [enabling the Go web log
collector](https://docs.netdata.cloud/docs/tutorials/collect-apache-nginx-web-logs/) and using it with Nginx and/or
Apache access logs with minimal configuration.

Thanks to [Wing924](https://github.com/Wing924) for starting the Go rewrite!

## Introducing cmocka testing for Netdata's agent

In this release, we've done lots of unit testing work on top of the project that began in v1.18. We're testing how
Netdata's internal web server processes HTTP requests—the first step to improve the quality of code throughout the
entire Netdata project, reduce bugs, and make refactoring easier.

We chose cmocka because it supports our pure C codebase, is easy enough to use, and doesn't have external dependencies.

But, as you might have expected, building a responsive and powerful unit testing framework didn't come that easy. To
efficiently test thousands of separate cases, we'd have to write thousands of unique tests. Instead, we build a layer on
top of cmocka to use parametric unit tests, which give us the best of all worlds.

With this new framework in place, we began to test how the internal web API responds to some rather unique situations.
As we continue to apply unit testing across our code base, we'll create a more robust, bug-free monitoring agent for
your systems.

Read all about our process of testing and selecting cmocka on our blog post: [Building an agile team's 'safety harness'
with cmocka and FOSS](https://blog.netdata.cloud/agile-team-cmocka-foss/).

## Better, faster metrics for Unbound DNS servers

Netdata's Unbound collector was also completely rewritten in Go to improve how it collects and displays metrics. This
new version can get dozens of metrics, including details on queries, cache, uptime, and even show per-thread metrics.

We relied heavily on our community for this rewrite, with their [valuable
suggestions](https://github.com/netdata/netdata/issues/7124) driving how our engineers prioritized and worked on this
collector.

Want to monitor your Unbound server in about 10 minutes? See our [new
tutorial](https://docs.netdata.cloud/docs/tutorials/collect-unbound-metrics/) on enabling the new collector via
Netdata's amazing auto-detection feature.

# What else?

We [fixed an error](https://github.com/netdata/netdata/pull/7220) where invalid spikes appeared on certain charts by
improving the incremental counter reset/wraparound detection algorithm.

Netdata can now send [**health alarm notifications to IRC
channels**](https://docs.netdata.cloud/health/notifications/irc/) thanks to [Strykar](https://github.com/Strykar)!

And, Netdata can now monitor [**AM2320 sensors**](https://docs.netdata.cloud/collectors/python.d.plugin/am2320/), thanks
to hard work from [Tom Buck](https://github.com/tommybuck).

We have a ton of people to thank, so be sure to check out the [full release
notes](https://github.com/netdata/netdata/releases/tag/v1.19.0) on GitHub.

---

**Want to get the latest from us in email form?** Register for our email newsletter for more tips, updates, and news
about our latest features:

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
    portalId: "4567453",
    formId: "6a20deb5-a1e6-4312-9c4d-f6862f947fe0"
});
</script>