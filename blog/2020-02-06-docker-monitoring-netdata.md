---
slug: docker-monitoring-netdata
title: "Docker container monitoring with Netdata"
description: "Docker container monitoring with Netdata"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/docker-monitoring-netdata.png
tags: [product]
keywords: [netdata,product]
authors: team
---

<!--truncate-->

<img class="alignnone size-full wp-image-16812" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/docker-monitoring-netdata.png" alt="" width="1200" height="600" />

Properly monitoring the health and performance of Docker containers is an essential skill for solo developers and large teams alike. As your infrastructure grows in complexity, it’s important to streamline every facet of the performance of your apps/services. Plus, it’s essential that the tools you use to make those performance decisions work across teams, and allow for complex scaling architectures.

Netdata does all that, and thanks to our Docker container collector, you can now monitor the health and performance of your Docker containers in real-time.

With Docker container monitoring enabled via cgroups, you get real-time, interactive charts showing key CPU, memory, disk I/O, and networking of entire containers. Plus, you can use other collectors to monitor the specific applications or services running <em>inside</em> Docker containers.

With these per-second metrics at your fingertips, you can get instant notifications about outages, performance hiccups, or excessive resource usage, visually identify the anomaly, and fix the root cause faster.

<img class="alignnone size-full wp-image-16814" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/73307848-48e81000-41dc-11ea-8480-8388d5c095ca.png" alt="" width="1071" height="600" />
<h2>What is Docker?</h2>
<a href="https://www.docker.com/">Docker</a> is a virtualization platform that helps developers deploy their software in reproducible and isolated packages called containers. These containers have everything the software needs to run properly, including libraries, tools, and their application’s source code or binaries. And because these packages contain everything the application needs, it runs <em>everywhere</em>, isolating problems where code works in testing, but not production.

Docker containers are a popular platform for distributing software via <a href="https://hub.docker.com/">Docker Hub</a>, as we do for <a href="https://hub.docker.com/r/netdata/netdata">Netdata itself</a>. But perhaps more importantly, containers are now being “orchestrated” with programs like <a href="https://docs.docker.com/compose/">Docker Compose</a>, and platforms like <a href="https://kubernetes.io/">Kubernetes</a> and <a href="https://docs.docker.com/engine/swarm/">Docker Swarm</a>. DevOps teams also use containers to orchestrate their microservices architectures, making them a fundamental component of scalable deployments.
<h2>How Netdata monitors Docker containers</h2>
Netdata uses control groups—most often referred to as <strong><a href="https://learn.netdata.cloud/docs/agent/collectors/cgroups.plugin/#cgroupsplugin">cgroups</a></strong>—to monitor Docker containers. cgroups is a Linux kernel feature that limits and tracks the resource usage of a collection of processes. When you combine resource limits with process isolation (thanks, namespaces!), you get what we commonly refer to as containers.

Linux uses virtual files, usually placed at <code>/sys/fs/cgroup/</code>, to report the existing containers and their resource usage. Netdata scans these files/directories every few seconds (configurable via <code>check for new cgroups every</code> in <code>netdata.conf</code>) to find added or removed cgroups.

The best part about monitoring Docker containers with Netdata is that it’s zero-configuration. If you have Docker containers running when you install Netdata, it’ll auto-detect them and start monitoring their metrics. If you spin up Docker containers <em>after</em> installing Netdata, restart it with <code>sudo service netdata restart</code> or the <a href="https://learn.netdata.cloud/docs/agent/getting-started/#start-stop-and-restart-netdata">appropriate variant for your system</a>, and you’ll be up and
running!

Read more about Netdata’s cgroup collector in our
<a href="https://learn.netdata.cloud/docs/agent/collectors/cgroups.plugin/">documentation</a>.
<h2>View many containers at-a-glance</h2>
Netdata auto-detects running containers and auto-populates the right-hand menu with their IDs or container names, based on the configuration of your system. This interface is expandable to any number of Docker containers you want to monitor with Netdata, whether it’s 1, 100, or 1,000.

<img class="alignnone size-full wp-image-16816" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/73222300-27295300-4120-11ea-8f1e-87cc7b8b08fa.png" alt="" width="647" height="780" />

Netdata also uses its <a href="https://learn.netdata.cloud/docs/agent/why-netdata/meaningful-presentation/">meaningful presentation</a> to organize CPU and memory charts into families, so you can quickly understand which containers are using the most CPU, memory, disk I/O, or networking, and begin correlating that with other metrics from your system.
<h2>Get alarms when containers go awry</h2>
Netdata comes with pre-configured CPU and memory alarms for every running Docker container. Once Netdata auto-detects a Docker container, it initializes three alarms: RAM usage, RAM+swap usage, and CPU utilization for the cgroup. These alarms calculate their usage based on the cgroup limits you set, so they’re completely dynamic to any Docker setup.

You can, of course, edit your <code>health.d/cgroups.conf</code> file to modify the existing alarms or create new ones entirely.

<img class="alignnone size-full wp-image-16818" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/73206909-11f0fc00-4101-11ea-9b9b-66fb7c9f9caf.png" alt="" width="944" height="952" />
<h2>Dive into real-time metrics for containerized apps and services</h2>
Netdata’s Docker monitoring doesn’t stop with entire containers—it’s also fully capable of monitoring the apps/services running <em>inside those containers</em>. This way, you’ll get more precise metrics for your mission-critical web servers or databases, plus all the pre-configured alarms that come with that collector!

You can monitor specific metrics for any of the <a href="https://learn.netdata.cloud/docs/agent/collectors">200+ apps/services</a> like MySQL, Nginx, or Postgres, with little or no configuration on your part. Just set the service up using the recommended method, and Netdata will auto-detect it.

For example, here are some real-time charts for an Nginx web server, running inside of a Docker container, while it’s undergoing a stress test.

<img class="alignnone size-large wp-image-16820" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/73222673-0c0b1300-4121-11ea-9ff2-aaa654519e71-1200x648.png" alt="" width="1200" height="648" />

Visit our <a href="https://learn.netdata.cloud/">documentation</a> and use the search bar at the top to figure out how to monitor favorite <em>containerized</em> service.
<h2>What’s next?</h2>
To get started monitoring Docker containers with Netdata, <a href="https://learn.netdata.cloud/docs/get">install Netdata</a> on any system running the Docker daemon. Netdata will auto-detect your cgroups and begin monitoring the health and performance of any running Docker containers.

If you already have Netdata installed and want to enable Docker monitoring, <a href="https://learn.netdata.cloud/docs/agent/getting-started/#start-stop-and-restart-netdata">restart Netdata</a> using the appropriate command for your system.

Netdata handles ephemeral Docker containers without complaint, so don’t worry about situations where you’re scaling up and down on any given system. As soon as a new container is running, Netdata dynamically attaches all the relevant alarms, and you can see new charts after refreshing the dashboard.

For a more thorough investigation of Netdata’s Docker monitoring capabilities, read our <a href="https://learn.netdata.cloud/docs/agent/collectors/cgroups.plugin/">cgroups collector</a> documentation and our <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/docker_engine/">Docker Engine</a> documentation. You can also learn about <a href="https://hub.docker.com/r/netdata/netdata">running Netdata inside of a container</a> in your ongoing efforts to containerize everything.