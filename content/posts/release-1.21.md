---
title: "Release 1.21: Creative collectors, extravagant exporters, and " 
date: 2020-04-06
summary: "t/k" 
author: "Joel Hans" 
cover: "release-1.21.0.png" 
tags: ["Release"]
---

We're in the middle of a scary, uncertain time, and we hope those of you reading are staying safe and healthy.

Despite the current challenges, the 40+ members of the [remote-first Netdata team](/posts/netdata-remote-working/) have
been hard at work on the next version of the Netdata Agent: v1.21.0. 

This release is _foundational_ in nature: While we do have awesome new collectors and three new ways to export your
metrics for long-term storage, many of the most important changes aren't even those you'll notice. While they may be
beneath the hood, they're going to power some amazing new features, UX improvements, and design overhauls.

<!--more-->

## New collectors to support our infrastructure

We added two important collectors in v1.21: **Apache Pulsar** and **VerneMQ**. We use both of these systems in the
infrastructure for Netdata Cloud (more on that soon!), and are excited to bring sophisticated real-time health
monitoring and performance troubleshooting to these two complex systems.

[Apache Pulsar](http://pulsar.apache.org/) is an open-source distributed pub-sub messaging system that comes with
geo-replication, multi-tenency, great scalability, and a lot more. Our [Pulsar
collector](https://docs.netdata.cloud/collectors/go.d.plugin/modules/pulsar/) auto-detects your installation and
instantly generates two dozen charts on messages/second, throughput rate, storage size, topic
producers/subscriptions/consumers, and much more.

You can always [configure the
collector](https://docs.netdata.cloud/collectors/go.d.plugin/modules/pulsar/#configuration) based on your unique setup.

[VerneMQ](https://vernemq.com/) is an open-source MQTT broker designed to connect devices in low bandwidth,
high-latency, or unreliable networks. The new [VerneMQ
collector](https://docs.netdata.cloud/collectors/go.d.plugin/modules/vernemq/) produces a sizeable **61 charts** that
cover everything from sockets, queues, subscriptions, bandwidth, and even the Erlang VM that powers it.

You can start monitoring the health of your VerneMQ installations in a matter of minutes with this new collector, which
is also [entirely configurable](https://docs.netdata.cloud/collectors/go.d.plugin/modules/vernemq/#configuration) to
your infrastructure.

## Export to Prometheus remote write, MongoDB, and AWS Kinesis Data Streams

Our _experimental_ exporting engine is coming along nicely. As of v1.21, you can now export and archive the real-time,
per-second metrics your Agent collects to more than 20 different eternal storage providers.

Why would you want to export your metrics outside of the Agent? It already has long-term metrics storage with the
[database engine](https://docs.netdata.cloud/docs/tutorials/longer-metrics-storage/), after all. The exporting engine is
part of our mission to be as extensible, flexible, and compatible as possible. You might want to export your metrics to:

-   Reduce the Agent's resource usage via the `dbengine disk space` setting.
-   Correlate data between otherwise siloed monitoring systems.
-   Create custom dashboards to search for long-term trends in your infrastructure.
-   Store metrics from a master and its slaves in a centralized location.
-   Backup metrics in a separate system/location.

Plus, the exporting engine lets you archive to multiple enpoints simultaneously.

Our new exporting connectors include **[Prometheus remote
write](https://docs.netdata.cloud/exporting/prometheus/remote_write/)**,
**[MongoDB](https://docs.netdata.cloud/exporting/mongodb/)**, and **[AWS Kinesis Data
Streams](https://docs.netdata.cloud/exporting/aws_kinesis/)**. Read the [exporting
documentation](https://docs.netdata.cloud/exporting/) for more details on setting it up.

## What else?

The Netdata dashboard was completely re-written in React. You shouldn't notice any difference between the new, but with
React at the dashboard's core, we'll be able to work faster and better resource our talented engineers.

Our community asked for support for TLS 1.3 certificates, and we delivered. You can now specify which TLS version and
TLS ciphers you want to enable HTTPS on dashboard streaming connections. Read the
[documentation](https://docs.netdata.cloud/web/server/#enabling-tls-support) for details on configuring a TLS 1.3
certificate.

Our eBPF collector is still in a _technical preview_, but we've enabled compatibility with more Linux systems. We now
support 13 different kernel versions that cover a broad spectrum of distributions and their versions. Plus, we've proven
that the collector is extremely fast via a [host of benchmarks](https://github.com/netdata/netdata/issues/8195).

There's a lot more in v1.21 than what you can see in this blog post, so be sure to check out the [release
notes](https://github.com/netdata/netdata/releases/) on GitHub for the full story.

And before we go, a special thanks those in our community who helped make v1.21 possible, even in these difficult times:
[Jiab77](https://github.com/Jiab77), [SamK](https://github.com/SamK), [kevenwyld](https://github.com/kevenwyld),
[WoozyMasta](https://github.com/WoozyMasta), [paulmezz](https://github.com/paulmezz),
[ManuelPombo](https://github.com/ManuelPombo), [anayrat](https://github.com/anayrat),
[Default](https://github.com/DefauIt), [bceylan](https://github.com/bceylan), [peroxy](https://github.com/peroxy),
[toadjaune](https://github.com/toadjaune), [grinapo](https://github.com/grinapo), [m-rey](https://github.com/m-rey), and
[YorikSar](https://github.com/YorikSar)!

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
