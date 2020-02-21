---
title: "Release 1.20: Kernel monitoring 'superpowers' and infrastructure-wide labels" 
date: 2020-02-21
summary: "Version 1.20.0 of Netdata introduces Linux eBPF monitoring and host labels that help you organize your infrastructure, in addition to CockroachDB monitoring and brand-new documentation to make learning about Netdata easier." 
author: "Joel Hans" 
cover: "release-1.20.0.png" 
tags: ["Release"]
---

In Netdata's first major release of 2020, we're introducing two new features on the opposite ends of the monitoring
spectrum.

On one hand, we're releasing an eBPF collector, which lets you collect, monitor, and visualize incredibly precise
metrics straight from the Linux kernel. On the other, we added the ability to label agents to help you organize entire
infrastructures and see _every_ important piece of information about streaming nodes in one place.

<!--more-->

While disparate in scope and purpose, both of these features were inspired by our community, and will have enormous
impact on the way people use Netdata to gather insights about their systems. In that sense, they are not opposites at
all, but rather two more major steps in our effort to [democratize
monitoring](https://blog.netdata.cloud/posts/redefining-monitoring-netdata/) and provide the _best high-resolution
monitoring_ tools through free and open-source (FOSS) software.

Beyond eBPF monitoring and host labels, this release comes with 3 new collectors, 53 bug fixes, 88 improvements, and 38
documentation updates. Let's get into the details.

## Give yourself a Linux 'superpower' with eBPF monitoring

With this release, we're introducing the alpha version of our new **eBPF collector**. eBPF ([extended Berkeley Packet
Filter](https://lwn.net/Articles/740157/)) is a virtual bytecode machine, built directly into the Linux kernel, that you
can use for advanced monitoring and tracing.

With this release, the eBPF collector monitors system calls inside your kernel to help you understand and visualize the
behavior of your file descriptors, virtual file system (VFS) actions, and process/thread interactions. You can already
use it for debugging applications and better understanding how the Linux kernel handles I/O and process management.

<figure>
  <img src="https://user-images.githubusercontent.com/1153921/74746434-ad6a1e00-5222-11ea-858a-a7882617ae02.png" alt="An example of VFS charts, made possible by the eBPF collector plugin">
  <figcaption>An example of VFS charts, made possible by the eBPF collector plugin</figcaption>
</figure>

The eBPF collector is in a technical preview, and doesn't come enabled out of the box. But, given that eBPF has been
called a ["superpower"](http://www.brendangregg.com/blog/2016-03-05/linux-bpf-superpowers.html) for Linux observability,
who wouldn't want to give it a shot?

Right now, the eBPF collector can track open/closed file descriptors, VFS I/O and bytes read/written, process threads,
and exited tasks. These can all be used for application monitoring, debugging, and better understanding how the Linux
kernel handles the software you've written.

If you'd like to learn more about _why_ eBPF metrics are such an important addition to Netdata, see our [companion post:
_Linux eBPF monitoring with Netdata_](https://blog.netdata.cloud/posts/linux-ebpf-monitoring-netdata/). When you're
ready to get started, enable the eBPF collector by following the steps in our
[documentation](https://docs.netdata.cloud/collectors/ebpf_process.plugin/#enable-the-ebpf-plugin).

## Organize entire infrastructures with host labels

This release also introduces **host labels**, a powerful new way of organizing your Netdata-monitored systems. Netdata
automatically creates a handful of labels that group essential information, but you can supplement the defaults by
segmenting your systems based on their location, purpose, operating system, or even when they went live.

You can use host labels to create alarms that apply only to systems with specific labels, or apply labels to metrics you
archive to other databases with our exporting engine. Because labels are streamed from slave to master systems, you can
now find critical information about your entire infrastructure directly from the master system.

Our [host labels tutorial](https://docs.netdata.cloud/docs/tutorials/using-host-labels/) will walk you through creating
your first host labels and putting them to use in Netdata's other features.

## Dogfooding CockroachDB metrics collection

Because we use CockroachDB internally, we wanted a better way of keeping tabs on the health and performance of our
databases _using our own monitoring product_. CockroachDB by [Cockroach Labs](https://www.cockroachlabs.com/), is a cloud-native database for distributed SQL, that's designed for you to deploy your applications and services anywhere.

Given how popular CockroachDB is right now, we know we're not alone, and are excited to share this collector with our
community.

<figure>
  <img src="https://user-images.githubusercontent.com/1153921/73564467-d7e36b00-441c-11ea-9ec9-b5d5ea7277d4.png" alt="CPU utilization charts from a CockroachDB database monitored by Netdata">
  <figcaption>CPU utilization charts from a CockroachDB database monitored by Netdata</figcaption>
</figure>

See our [tutorial on monitoring CockroachDB metrics](https://docs.netdata.cloud/docs/tutorials/monitor-cockroachdb/) for
set-up details.

## What else?

While some of these changes have been live for weeks or months, this is a good opportunity to talk about improvements to
our documentation.

Most recently, we **revamped our [collectors documentation](https://docs.netdata.cloud/collectors/)** to
simplify how users learn about metrics collection. You can now view a [collectors
quickstart](https://docs.netdata.cloud/collectors/quickstart/) to learn the process of enabling collectors and
monitoring more applications and services with Netdata, and see everything Netdata collects in our [supported collectors
list](https://docs.netdata.cloud/collectors/collectors/).

In January, we **overhauled [installation documentation](https://docs.netdata.cloud/packaging/installer/)** to provide
more concise installation instructions for most users. We also split instructions into multiple files to help you find
exactly the right process for your system.

Back in December 2019, we published a [**10-part tutorial**](https://docs.netdata.cloud/docs/step-by-step/step-00/) to
guide new users through every essential facet Netdata's features, and how they immediately get the most value from
monitoring their systems. If you're dipping your toes in to health monitoring and performance troubleshooting, there's
no better place to start.

Our collectors have seen some important changes in this release. We added a new [**squid access log
collector**](https://docs.netdata.cloud/collectors/go.d.plugin/modules/squidlog/#squid-logs-monitoring-with-netdata)
that parses and visualizes requests, bandwidth, responses, and much more. Our [**apps.plugin
collector**](https://docs.netdata.cloud/collectors/apps.plugin/) has new and improved way of processing groups together,
and our [**cgroups collector**](https://docs.netdata.cloud/collectors/cgroups.plugin/) is better at LXC (Linux
container) monitoring.

Special thanks go out to the following contributors: [k0ste](https://github.com/k0ste),
[DefauIt](https://github.com/DefauIt), [gmeszaros](https://github.com/gmeszaros), [blaines](https://github.com/blaines),
[stevenh](https://github.com/stevenh), [lassebm](https://github.com/lassebm), [yasharne](https://github.com/yasharne),
[candrews](https://github.com/candrews), [Jiab77](https://github.com/Jiab77), [amishmm](https://github.com/amishmm),
[tnyeanderson](https://github.com/tnyeanderson), [yasharne](https://github.com/yasharne),
[schneiderl](https://github.com/schneiderl), [lucasRolff](https://github.com/lucasRolff),
[Ehekatl](https://github.com/Ehekatl), [wonsangki](https://github.com/wonsangki),
[candrews](https://github.com/candrews), [kkoomen](https://github.com/kkoomen),
[vzDevelopment](https://github.com/vzDevelopment), [hexchain](https://github.com/hexchain),
[nabijaczleweli](https://github.com/nabijaczleweli), and [rex4539](https://github.com/rex4539).

There's a lot more in v1.20 than this blog post, so be sure to check out the [release
notes](https://github.com/netdata/netdata/releases/) on GitHub for the full story.

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
