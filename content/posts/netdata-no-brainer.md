---
title: "13 reasons why Netdata is a no-brainer for health and performance monitoring"
date: 2019-06-12
author: "Joel Hans"
cover: ""
tags: ["Why Netdata"]
categories: []
draft: true
---

We think Netdata is rad. You should too.

<!--more-->

## 1. It's free and open-source (FOSS) software

Ever since Costa first released Netdata's monitoring agent into the world it's been free and open-source (FOSS) softare, and always will be. That means you can head over to the [Netdata repository](https://github.com/netdata/netdata) and see all the code there for yourself. According to our [GNU General Public License v3.0 (GPLv3+)](https://github.com/netdata/netdata/blob/master/LICENSE) licensing, you can also freely modify the source code and redistribute it under the same license.

For most people, however, FOSS software means you can download as many copies of Netdata's monitoring agent as you'd like without ever spending a penny. That's part of the reason we think it's so powerful—it's trivial to install Netdata on dozens or even hundreds of machines entirely for free. And get a ton of value out of the real-time metrics, again, entirely for free.

Of course, we're talking about more than price when we say *free*:

> When we speak of free software, we are referring to freedom, not
price. Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

<iframe style="display: block; margin: 0 auto;" src="https://giphy.com/embed/6901DbEbbm4o0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/freedom-braveheart-musical-theater-6901DbEbbm4o0">via GIPHY</a></p>

## 2. You can use it commercially for free

As part of the GPLv3 license, businesess are also allowed to use Netdata for business use without paying for the privilege. In fact, we even have people working at companies like Amazon, Google, IBM, Microsoft, and Nvidia using Netdata regularly to monitor their systems and applications. If you're a system administrator or DevOps engineer who's looking for better ways to keep tabs on your company's systems, you can give Netdata a try without any risk.

## 3. It's distributed in nature

We designed Netdata to run without a centralized database for collecting data and analyzing the results. In fact, we consider that distributed nature one of its biggest benefits. Because each monitoring agent runs independently of any other, you can collect far more real-time metrics without spending a fortune on a third-party database that stores all the data in a single location.

It's cheaper, easier to manage, and offers more detail than a centralized solution, although it's certainly compatible with [time-series databases](https://github.com/netdata/netdata/tree/master/backends) like Prometheus and Graphite, if that's of interest to you.

## 4. A no-fuss installation

Our developers and the Netdata community at large has worked hard to make installation as simple as possible on as many systems as possible. It's currently compatible with Linux, OS X, Docker, KUbernetets, FreeBSD, pfSense, FreeNAS, and more. There's even dozens of volunteer [package maintainers](https://github.com/netdata/netdata/tree/master/packaging/maintainers) for even more systems.

Here's how to install it on Linux systems:

```
$ bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

This script downloads everything it needs, installs dependencies, and starts up a web server with all your dashboards at `http://localhost:19999`. Doesn't get much easier than that.

## 5. No configuration necessary to collect thousands of metrics

We've done the hard work to pre-configure Netdata with connections to pretty much every metric that compatible systems put out. That collecting means up to 10,000 metrics per system without touching a single configuration file.

And if you'd like to monitor *even more*, you can use the [plugin API]([Plugin](https://github.com/netdata/netdata/blob/master/collectors/plugins.d)) to write new collectors just about anything in Bash, Python, Perl, Node.JS, Go, Ruby, and more. You can even write a plugin to monitor your custom application.

## 6. Unlimited real-time metrics with 1s granularity

Netdata works its magic by collecting *every* metric it can get its hands on and then converts those metrics into hundreds of visualizations that constantly update with more real-time data. That's thousands of points of data, collected and refreshed every second. That 1s granularity means you get 10X more insight into the health and performance of your systems and applications without all the complexity of a centralized solution.

## 7. Netdata doesn't disrupt the system's core function

Netdata uses a highly-efficient database engine to store vast quantities of data, much of it in the system's memory, without disrupting the system as a whole. And since it's not loading or saving anything, it's extremely gentle on your system's disks.

How efficient is Netdata? We're talking 1% CPU utilization of a single core and 25MB of RAM. That's a trivial amount of usage even for small VMs in the cloud, especially when it's collecting thousands of metrics every single second.





To prove netdata scalability, check issue #1323 where netdata collects 95.000 metrics per second, with 12% CPU utilization of a single core!

And if it's not as lightweight as you'd like, we have plenty of other ways to [reduce usage](https://github.com/netdata/netdata/blob/2c01d9f5165e6c0a37414bf53898f9027dd2b5c4/docs/Performance.md) even further.

## 8. Netdata works with Docker and Kubernetes containers

We're fully aware that more complex systems are running on complex container orchestrations using ephemeral nodes or distributed networks of IoT devices. THat's why we designed Netdata to work 



We built Netdata to work independently of the exact system or the applications it's running. Basically, 

We're particularly excited by developments in containers and Internet of Things (IoT)/edge, and responded in turn to

## 9. And it's fully compatible with IoT deployments

https://github.com/netdata/netdata/blob/362165d2eb660f77f4bba08be20d0e5ff0746f96/docs/netdata-for-IoT.md