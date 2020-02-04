---
title: "Docker container monitoring with Netdata" 
summary: "Use Netdata's Docker container collector to monitor the health and performance of your Docker containers in real-time."
date: 2019-02-04
author: "Joel Hans" 
cover: ""
tags: ["Collectors", "Docker"] 
categories: [] 
draft: false
---

Properly monitoring the health and performance of Docker containers is an essential skill for solo developers and large
teams alike. As your infrastructure grows in complexity, it's important to streamline every facet of the performance of
your apps/services. Plus, it's essential that the tools you use to make those performance decisions work across teams,
and allow for complex scaling architectures.

Netdata does all that, and thanks to our Docker container collector, you can now monitor the health and performance of
your Docker containers in real-time. With Docker container monitoring enabled, you get real-time, interactive charts
showing key CPU, memory, disk I/O, and networking of entire containers. Plus, you can use other collectors to monitor
the specific applications or services running _inside_ Docker containers.

With these per-second metrics at your fingertips, you can get instant notifications about outages, performance hiccups,
or excessive resource usage, visually identify the anomaly, and fix the root cause faster.

![Screenshot_20200128_144036](https://user-images.githubusercontent.com/1153921/73307848-48e81000-41dc-11ea-8480-8388d5c095ca.png)

## What is Docker?

[Docker](https://www.docker.com/) is a virtualization platform that helps developers deploy their software in
reproducible and isolated packages called containers. These containers have everything the software needs to run
properly, including libraries, tools, and their application's source code or binaries. And because these packages
contain everything the application needs, it runs _everywhere_, isolating problems where code works in testing, but not
production.

Docker containers are a popular platform for distributing software via [Docker Hub](https://hub.docker.com), as we do
for [Netdata itself](https://hub.docker.com/r/netdata/netdata). But perhaps more importantly, containers are now being
"orchestrated" with programs like [Docker Compose](), and platforms like [Kubernetes](https://kubernetes.io/) and [Docker
Swarm](https://docs.docker.com/engine/swarm/). DevOps teams also use containers to orchestrate their microservices
architectures, making them a fundamental component of scalable deployments.

## How Netdata monitors Docker containers

Netdata uses control groups—most often referred to as
**[cgroups](https://docs.netdata.cloud/collectors/cgroups.plugin/#cgroupsplugin)**—to monitor Docker containers. cgroups
is a Linux kernel feature that limits and tracks the resource usage of a collection of processes. When you combine
resource limits with process isolation (thanks, namespaces!), you get what we commonly refer to as containers.

Linux uses virtual files, usually placed at `/sys/fs/cgroup/`, to report the existing containers and their resource
usage. Netdata scans these files/directories every few seconds (configurable via `check for new cgroups every` in
`netdata.conf`) to find added or removed cgroups.

The best part about monitoring Docker containers with Netdata is that it's zero-configuration. If you have Docker
containers running when you install Netdata, it'll auto-detect them and start monitoring their metrics. If you spin up
Docker containers _after_ installing Netdata, restart it with `sudo service netdata restart` or the [appropriate variant
for your system](https://docs.netdata.cloud/docs/getting-started/#start-stop-and-restart-netdata), and you'll be up and
running!

Read more about Netdata's cgroup collector in our
[documentation](https://docs.netdata.cloud/collectors/cgroups.plugin/).

## View many containers at-a-glance

Netdata auto-detects running containers and auto-populates the right-hand menu with their IDs or container names, based
on the configuration of your system. This interface is expandable to any number of Docker containers you want to monitor
with Netdata, whether it's 1, 100, or 1,000.

![The Netdata menu as it monitors multiple Docker
containers](https://user-images.githubusercontent.com/1153921/73222300-27295300-4120-11ea-8f1e-87cc7b8b08fa.png)

Netdata also uses its [meaningful presentation](https://docs.netdata.cloud/docs/why-netdata/meaningful-presentation/) to
organize CPU and memory charts into families, so you can quickly understand which containers are using the most CPU,
memory, disk I/O, or networking, and begin correlating that with other metrics from your system.

## Get alarms when containers go awry

Netdata comes with pre-configured CPU and memory alarms for every running Docker container. Once Netdata auto-detects a
Docker container, it initializes three alarms: RAM usage, RAM+swap usage, and CPU utilization for the cgroup. These
alarms calculate their usage based on the cgroup limits you set, so they're completely dynamic to any Docker setup.

You can, of course, edit your `health.d/cgroups.conf` file to modify the existing alarms or create new ones entirely.

![Individual CPU and memory alarms for each running
container](https://user-images.githubusercontent.com/1153921/73206909-11f0fc00-4101-11ea-9b9b-66fb7c9f9caf.png)

## Dive into real-time metrics for containerized apps and services

Netdata's Docker monitoring doesn't stop with entire containers—it's also fully capable of monitoring the apps/services
running _inside those containers_. This way, you'll get more precise metrics for your mission-critical web servers or
databases, plus all the pre-configured alarms that come with that collector!

You can monitor specific metrics for any of the [200+
apps/services](https://docs.netdata.cloud/docs/add-more-charts-to-netdata/) like MySQL, Nginx, or Postgres, with little
or no configuration on your part. Just set the service up using the recommended method, and Netdata will auto-detect it.

For example, here are some real-time charts for an Nginx web server, running inside of a Docker container, while it's
undergoing a stress test.

![Netdata charts for a containerized Nginx
server](https://user-images.githubusercontent.com/1153921/73222673-0c0b1300-4121-11ea-9ff2-aaa654519e71.png)

Visit our [documentation](https://docs.netdata.cloud/) and use the search bar at the top to figure out how to monitor
favorite _containerized_ service.

![Using the search bar on
docs.netdata.cloud](https://user-images.githubusercontent.com/1153921/73279550-90ee3f00-41aa-11ea-9271-9d70b130cecd.gif)

## What's next?

To get started monitoring Docker containers with Netdata, [install
Netdata](https://docs.netdata.cloud/packaging/installer/) on any system running the Docker daemon. Netdata will
auto-detect your cgroups and begin monitoring the health and performance of any running Docker containers.

If you already have Netdata installed and want to enable Docker monitoring, [restart
Netdata](https://docs.netdata.cloud/docs/getting-started/#start-stop-and-restart-netdata) using the appropriate command
for your system.

Netdata handles ephemeral Docker containers without complaint, so don't worry about situations where you're scaling up
and down on any given system. As soon as a new container is running, Netdata dynamically attaches all the relevant
alarms, and you can see new charts after refreshing the dashboard.

For a more thorough investigation of Netdata's Docker monitoring capabilities, read our [cgroups
collector](https://docs.netdata.cloud/collectors/cgroups.plugin/) documentation and our [Docker
Engine](https://docs.netdata.cloud/collectors/go.d.plugin/modules/docker_engine/) documentation. You can also learn
about [running Netdata inside of a container](https://hub.docker.com/r/netdata/netdata) in your ongoing efforts to
containerize everything.
