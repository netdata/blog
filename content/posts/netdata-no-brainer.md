---
title: "13 reasons why Netdata is a no-brainer for health and performance monitoring"
summary: "It's free, fast, lightweight, and instantly valuable. But if you're still not convinced, here's 13 more reasons to get real-time health and performance monitoring data."
date: 2019-06-18
author: "Joel Hans"
cover: "netdata-no-brainer.png"
tags: ["Why Netdata"]
categories: []
draft: true
---

Netdata is the best real-time health and performance monitoring solution out there. And we have the numbers to back that claim up.

Being the third-most starred project (**38,600** as of June 1, 2019, and counting) in the [Cloud Native Computing Foundation (CNCF) landscape](https://landscape.cncf.io/format=card-mode&grouping=no&sort=stars), behind only Kubernetes and Elastic, is a good indicator.

So is 400,000 daily pulls of our [Docker image](https://hub.docker.com/r/netdata/netdata/).

And thousands of new machines added every day. ![A badge of the new servers added in the last 24 hours](https://registry.my-netdata.io/api/v1/badge.svg?chart=netdata.registry_entries&dimensions=machines&group=incremental-sum&after=-86400&options=unaligned&label=servers%20added%20today&units=null&value_color=orange&precision=0&v42)

Not to mention a [daily userbase](https://registry.my-netdata.io/#menu_netdata_submenu_registry) of more than a million people. ![A badge of the daily userbase](https://registry.my-netdata.io/api/v1/badge.svg?chart=netdata.registry_entries&dimensions=persons&label=user%20base&units=M&value_color=blue&precision=2&divide=1000000&v43)

But if those numbers aren't enough, here's 13 other—and perhaps more valuable—reasons why Netdata is a no-brainer for monitoring your systems and applications in real-time.

<!--more-->

## 1. It's free and open-source (FOSS) software

Ever since [Costa](https://github.com/ktsaou) first released Netdata's monitoring agent into the world, it's been free and open-source (FOSS) software, and always will be. That means you can head over to the [Netdata repository](https://github.com/netdata/netdata) and see all the code there for yourself. According to our [GNU General Public License v3.0 (GPLv3+)](https://github.com/netdata/netdata/blob/master/LICENSE) licensing, you can also freely modify the source code and redistribute it under the same license.

For most people, however, FOSS software means you can download as many copies of Netdata's monitoring agent as you'd like without ever spending a penny. That's part of the reason we think it's so powerful—it's trivial to install Netdata on dozens or even hundreds of machines entirely for free. And get a ton of value out of the real-time metrics, again, entirely for free.

Of course, we're talking about more than price when we say *free*:

> When we speak of free software, we are referring to freedom, not price. Our General Public Licenses are designed to make sure that you have the freedom to distribute copies of free software (and charge for them if you wish), that you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free programs, and that you know you can do these things.

<iframe style="display: block; margin: 0 auto;" src="https://giphy.com/embed/6901DbEbbm4o0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

## 2. You can use it commercially for free

As part of the GPLv3 license, businesses are also allowed to use Netdata for business use without paying for the privilege. We even have people working at companies like Amazon, Google, IBM, Microsoft, and Nvidia using Netdata regularly to monitor their systems and applications. If you're a system administrator or DevOps engineer who's looking for better ways to keep tabs on your company's systems, you can give Netdata a try without any risk.

## 3. Netdata is distributed in nature

We designed Netdata to run without a centralized database for collecting data and analyzing the results. We consider that distributed nature one of its most significant benefits. Because each monitoring agent runs independently of any other, you can collect far more real-time metrics without spending a fortune on a third-party database that stores all the data in a single location.

It's cheaper, easier to manage, and offers more detail than a centralized solution, although it's certainly compatible with [time-series databases](https://github.com/netdata/netdata/tree/master/backends) like Prometheus and Grafana, if that's of interest to you.

## 4. A no-fuss installation

Our developers and the Netdata community at large has worked hard to make installation as simple as possible on as many systems as possible. It's currently compatible with Linux, OS X, Docker, KUbernetets, FreeBSD, pfSense, FreeNAS, and more. There's even dozens of volunteer [package maintainers](https://github.com/netdata/netdata/tree/master/packaging/maintainers) for even more systems.

Here's how to install it on Linux systems:

```bash
$ bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

This script downloads everything it needs, installs dependencies, and starts up a web server with all your dashboards at `http://localhost:19999`. Doesn't get much easier than that.

## 5. No configuration necessary to collect thousands of metrics

We've done the hard work to pre-configure Netdata with connections to pretty much every metric that compatible systems put out. That collecting means up to 10,000 metrics per system without touching a single configuration file.

And if you'd like to monitor *even more*, you can use the [plugin API]([Plugin](https://github.com/netdata/netdata/blob/master/collectors/plugins.d)) to write new collectors just about anything in Bash, Python, Perl, Node.JS, Go, Ruby, and more. You can even write a plugin to monitor your custom application.

## 6. Unlimited real-time metrics with 1s granularity

Netdata works its magic by collecting *every* metric it can get its hands on and then converts those metrics into hundreds of visualizations that continuously update with more real-time data. That's thousands of points of data, collected and refreshed every second. That 1s granularity means you get 10X more insight into the health and performance of your systems and applications without all the complexity of a centralized solution.

Plus, all those metrics get pushed into rich visualizations that help you make smarter, faster decisions about your systems. And they're interactive, too:

![A gif of the Netdata dashboard in action](/img/netdata-no-brainer_visualization.gif)

## 7. You learn more about your systems by using Netdata

One of our foundational principles is that you shouldn't have to be an expert in system administration to get value from real-time metrics from your systems and applications.

Other monitoring solutions assume that you know exactly where to look for information about an anomaly or outage. Netdata assumes that you might need some guidance to find the right information. That's what we call **meaningful presentation**.

That's why we've included detailed explanations of critical metrics alongside visualizations. And that's why we've grouped specific metrics so you can more easily move from one visualization to the next in your effort to pinpoint what's going wrong.

## 8. It reduces your reliance on sophisticated console tools

To get the information you get on the standard, no-configuration Netdata dashboard, you'd need to use dozens of console tools. Those tools would only give you a snapshot of your system's status, and by the time you've gone through them to get the information you need, it's entirely out of date.

Here's an example: You can use `df` to get information about disk space utilization on your system, but by the time you've figured out how much disk space `274749192` actually is (hint: roughly `282GB`), the information is outdated. Instead, you could use Netdata's disk utilization graphs to track the ups and downs in real-time.

## 9. Netdata doesn't disrupt the system's core function

Netdata uses a highly-efficient database engine to store vast quantities of data in the system's memory without disrupting the system as a whole. And since it's not loading or saving anything, it's gentle on your system's disks.

How efficient is Netdata? We're talking 1% CPU utilization of a single core and 25MB of RAM. That's a trivial amount of usage even for small VMs in the cloud, especially when it's collecting thousands of metrics every single second.

We've even gotten reports from a real user on [servers with 144 cores/288 threads](https://github.com/netdata/netdata/issues/1323) collecting 100,000 metrics per second while only using 9% CPU on a single core.

And if it's not as lightweight as you'd like, we have plenty of other ways to [reduce usage](https://docs.netdata.cloud/docs/performance/) even further.

## 10. Netdata works with Docker and Kubernetes containers

We're fully aware that more complex systems are running on complex container orchestrations using ephemeral nodes or distributed networks of IoT devices. That's why we designed Netdata to work with containerized environments.

You can run Netdata's monitoring agent inside of a Docker container, or you can include Netdata in your `Dockerfile` to ensure that you have instant access to real-time monitoring data from your production-ready container(s). An instance of Netdata running on the host machine can also track the number of running, healthy, and unhealthy containers.

With v.1.13.0 of Netdata, we introduced Kubernetes monitoring into Netdata. We now have a [beta Helm chart](https://github.com/netdata/helmchart) that bootstraps a Netdata deployment on a Kubernetes cluster, with slaves operating as headless collecters to forward metrics to the master Netdata agent. Persistent volumes store metrics, handle alarm notifications, and more. We've also introduced charts for `Kubelet`, `kube-proxy` and `coredns` metrics, and have a lot more planned for the near future.

## 11. Works beautifully with auto-scaling and ephemeral nodes

Whether you're running Docker, Kubernetes, or some other VM orchestration system, auto-scaling is the new frontier for deploying services on the web. A load balancer detects when your infrastructure needs additional resources and then creates new fully-configured ephemeral nodes on demand. This way, the service can scale horizontally when needed and then shut down the extra VMs when demand drops.

But because these ephemeral nodes might only "live" for a few hours, and all the scaling happens automatically, there's no time to install a Netdata monitoring agent on each new VM manually. You can configure a `master` instance of Netdata that collects real-time metrics from any number of ephemeral nodes. The `master` instance then creates real-time dashboards for all the ephemeral nodes and sends aggregated alarm notifications for any issues.

Here's an example of how it looks in action:

{{< figure src="/img/netdata-no-brainer_auto-scaling.png" alt="A diagram showing how Netdata can monitor an auto-scaling infrastructure with ephemeral nodes" position="center" style="border-radius: 8px;" caption="" captionPosition="center" >}}

To learn more, read our [comprehensive guide to monitoring ephemeral nodes](https://docs.netdata.cloud/streaming/#monitoring-ephemeral-nodes) with Netdata.

## 12. Netdata is perfect for IoT/edge deployments

Because of its distributed nature and ultra-lightweight database, Netdata is almost tailor-made for Internet of Things and edge deployments that rely on many low-power devices in remote places. The ability to collect thousands of metrics per second with just 1% CPU utilization is an invaluable asset in mission-critical deployments, like industrial controllers or sensors.

{{< figure src="/img/netdata-no-brainer_rpi.png" alt="A diagram showing how Netdata can monitor an auto-scaling infrastructure with ephemeral nodes" position="center" style="border-radius: 8px;" caption="A Raspberry Pi, just one of the many IoT devices that Netdata is fully compatible with" captionPosition="center" >}}

As with the ephemeral node setup, you can configure Netdata agents on IoT/edge devices to not maintain a database or serve dashboards to keep RAM usage as low as 5MB. You can even [configure Netdata](https://github.com/netdata/netdata/blob/master/docs/Performance.md#running-netdata-in-embedded-devices) to further improve its performance on weak IoT devices.

## 13. People love it. Really love it.

{{< figure src="https://user-images.githubusercontent.com/2662304/48305662-9de82980-e537-11e8-9f5b-aa1a60fbb82f.png" alt="A collage of Tweets from happy Netdata users" position="center" style="border-radius: 8px;" caption="Just of the few happy messages we get at @linuxnetdata on a regular basis" captionPosition="center" >}}

## Are you ready for unlimited real-time metrics?

If so, getting started with Netdata's open-source, free monitoring agent takes a few seconds. You'll instantly get access to valuable information about your systems and applications, all without spending a minute diving into configuration files or setting up alarms.

So, get to it—use our quick start script on any Linux machine:

```bash
$ bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Or head on over to the [Netdata repository](https://github.com/netdata/netdata#is-it-any-good) for more information.

And while you're looking at your own metrics pour in, have you found any other numbers that will help us explain just how good Netdata really is? Hit us up on Twitter [@linuxnetdata](https://twitter.com/linuxnetdata) and share your wisdom.