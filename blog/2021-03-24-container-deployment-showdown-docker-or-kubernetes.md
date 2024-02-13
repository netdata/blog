---
title: Container deployment showdown
subtitle: 
date: 2021-03-24
author: 
related: ["", "", ""]
tags: 
  [
    "",
  ]
image: "."."""/img/blog/Kubernetes_vs_Docker.png.png".png".png".png".png"""""
---
<div class="et_pb_module et_pb_text et_pb_text_0 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

<img class="alignnone wp-image-16433 size-large" src="/img/wp-archive/uploads/2022/03/Kubernetes_vs_Docker-1200x828.png" alt="" width="1200" height="828" />

Monitoring the current state and performance of applications is critical for IT Ops and DevOps teams alike. Understanding the health of an application is one of the most effective ways of anticipating potential bottlenecks or slowdowns, yet it’s one of the largest challenges faced by many organizations that build and deploy software. This is largely due to applications’ distributed and diversified nature. A single outage has the potential to interrupt entire processes that, at times, can interfere with business as a whole and result in a negative effect on the bottom line.

To mitigate the many challenges of monitoring which range from availability to performance, and deployments, software engineering teams use containers to act as orchestrators for handling all the services and servers involved. With so many variables and complexities with containers, we’ve created this post for you to understand the basics of containers including what containers are and the benefits they have to offer. We’ll cover Kubernetes and Docker containers, and dive into how you can implement Netdata as your core container monitoring solution.

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_1 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h2><strong>Containers 101</strong></h2>
<h3>What is a container?</h3>
A container is a standardized unit of software that packages code and its dependencies for development, shipment, and deployment. More specifically, a containerized environment provides the ability to package an application together using libraries and other dependencies, enabling isolated environments for running software services.

The main role of containers in software development is running the same piece of software, the same way, with consistent results, regardless of the underlying operating system (OS). Moreover, containers provide a way of running multiple applications on the same OS without worrying about one affecting the other. Both can be done with VMs, but containers are much more performative, so you can run hundreds of containers over the same machine, while hundreds of VMs are demanding in terms of computational resources. This functionality in which applications can be abstracted from one environment to another enables developers to deploy more easily, regardless of whether the environment is a private data center, a public cloud, or even a solo developers’ personal laptop. This is also known as <i>containerization</i>, a way for development teams to move fast to deploy software efficiently, and at scale.
<h3>Why use containers?</h3>
If you have experience with virtualized environments, you can draw comparisons between containers and virtual machines (VMs). If you’re unfamiliar with VMs, they act as a guest operating system, like Linux or Windows, running on top of a host’s operating system with virtualized access to the underlying hardware. Every VM runs an entire operating system, including the Linux kernel, which takes considerable system resources compared to containers. Similar to VMs, containers provide the ability to package an application together with libraries and other dependencies. As covered earlier, this produces isolated environments for running software services

Although there are parallels between VMs and containers, the similarities end at this point. Below you can visualize how containers offer more benefits, mainly as a much more lightweight solution for software development teams.

<img class="alignnone wp-image-16437 size-large" src="/img/wp-archive/uploads/2021/03/kubernetes-monitoring-troubleshooting-1200x828.png" alt="" width="1200" height="828" />
<div class="et_pb_module et_pb_text et_pb_text_2 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Containers virtualize at the operating system (OS) level, with multiple containers running on top of the OS kernel. This approach is lightweight; by sharing the OS kernel, there’s a faster start that uses a fraction of the memory in comparison to an entire OS. Docker and Kubernetes are both container formats available, both of which you can monitor using Netdata. Let’s dive into what they are, the differences, and how you can leverage Netdata for your container monitoring.

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_3 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h2>Docker</h2>
<h3>What is Docker?</h3>
As <a title="described by Docker" href="https://www.docker.com/resources/what-container" target="_blank" rel="noopener">described by Docker</a>, a container image is a “lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings.” Docker containers tie everything in an application together including dependencies, libraries, and configurations. They have the ability to extract from any environment, regardless of whether they’re physical or virtual. This method allows for running code consistently across environments, from development to staging to production, without retooling.

Docker quickly became a leading solution for container platforms because it allowed developers to easily have parity between their various environments, from their laptop to production and anything in between. This provides streamlining for workflows; rather than building an entire server to run a service or application, Docker enables common, programmable environments between local, staging, and production.

Docker containerization is very advantageous in the current era of DevOps, cloud architectures, and distributed computing environments, all of which has led to mass adoption.
<h2>Kubernetes</h2>
<h3>What is Kubernetes?</h3>
<a title="Kubernetes" href="https://kubernetes.io/" target="_blank" rel="noopener">Kubernetes</a>, also known as K8s, is an open-source solution and, along with Docker, is one of the most notable technologies for deploying and scaling containerized applications. This open-source software is a graduated CNCF project and <a title="holds the claim" href="https://www.cncf.io/blog/2017/02/27/measuring-popularity-kubernetes-using-bigquery/" target="_blank" rel="noopener">holds the claim</a> of one of the “highest development velocity projects in the history of open source.” The software was originally developed at Google, named <a title="Borg" href="https://research.google/pubs/pub43438/" target="_blank" rel="noopener">Borg</a>, and later was established as an open-source tool for container orchestration.

With Kubernetes, <a title="container orchestration" href="https://thenewstack.io/what-is-container-orchestration/" target="_blank" rel="noopener">container orchestration</a> reduces issues with scaling containers and applications. The tool automates deployment, management, and scaling of containerized applications. The automation aspect is key for Kubernetes; K8s makes orchestration of hundreds upon thousands of containers digestible and manageable for ensuring services are always available.
<h2>Kubernetes vs Docker</h2>
Although Docker and Kubernetes are both container solutions, they’re not necessarily competitors or an either-or tooling solution. They contain some fundamental differences including how Docker’s ecosystem is built, which includes deployment/orchestration tools like <a title="docker-compose" href="https://docs.docker.com/compose/" target="_blank" rel="noopener">docker-compose</a> and <a title="Docker Swarm" href="https://docs.docker.com/engine/swarm/" target="_blank" rel="noopener">Docker Swarm</a>, the latter of which functions as an alternative to Kubernetes.

Docker provides the containerization aspect of isolating environments, while Kubernetes provides orchestration when scaling surges by systematically scheduling and automating deployment across IT environments.

Deciding whether to use Docker or Kubernetes will largely depend on the use case. For example, in use cases that strictly use containers only for test or development environments, Docker may be sufficient. However, when companies advance to scaling their infrastructure and require larger containerized workflows in production, Kubernetes may be the most viable option.

Another consideration for deciding amongst these two container solutions is Kubernetes’ recent announcement that they are <a title="deprecating Docker" href="https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md#deprecation" target="_blank" rel="noopener">deprecating Docker</a>. Although the change has yet to go into effect, when it does, those running Kubernetes clusters may need to make some adjustments, more on that from Kubernetes directly, <a title="here" href="https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/" target="_blank" rel="noopener">here</a>.

Ultimately, deciding on your container solution will depend on the question of what combination of tools your team needs to meet your IT infrastructure.
<h2>Container monitoring with Netdata</h2>
<h3>Monitor Docker containers with Netdata</h3>
Thanks to our <a title="Docker container collector" href="https://learn.netdata.cloud/docs/agent/packaging/docker" target="_blank" rel="noopener">Docker container collector</a>, you can monitor the health and performance of all your containers in real-time. Our Docker container monitoring works via cgroups, enabling you access to interactive charts on your key metrics like CPU, memory, disk, and container networking. For those new to <a title="cgroups" href="https://learn.netdata.cloud/docs/agent/collectors/cgroups.plugin/#cgroupsplugin" target="_blank" rel="noopener">cgroups</a>, it’s a Linux kernel feature that limits and tracks resource usage of processes. You also have the ability to monitor specific applications and services running inside your containers.

What makes Netdata’s container monitoring unique is that it’s zero-configuration, which means Netdata autodetects and starts monitoring metrics from any Docker containers running on your system. If you’ve already installed Netdata, you can easily start monitoring your containers by restarting it with sudo service Netdata restart.

For a deeper dive into how Netdata monitors Docker containers, visit our <a title="blog post" href="https://staging-www.netdata.cloud/blog/docker-monitoring-netdata/" target="_blank" rel="noopener">blog post</a> to get started!
<h3>Monitor Kubernetes containers with Netdata</h3>
Netdata also offers Kubernetes monitoring that alleviates complexities—including cost—while being both simple and powerful. With our K8s monitoring, you can get all your data on your Kubernetes clusters in real-time. This data is streamed to <a title="Netdata Cloud" href="https://staging-www.netdata.cloud/cloud/" target="_blank" rel="noopener">Netdata Cloud</a>, providing you with full visibility on the performance of your clusters. Our distributed architecture, built for streaming data, lets you scale to meet any size of deployment.

<iframe loading="lazy" title="YouTube video player" src="https://www.youtube.com/embed/JUtSpGNIBYo" width="854" height="480" frameborder="0" allowfullscreen=""></iframe>

<div class="et_pb_module et_pb_text et_pb_text_4 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">

Netdata’s Kubernetes monitoring is also focused on creating a simple experience with robust insights. Once you deploy the Netdata monitoring Agent on your Kubernetes clusters, using our Helm chart, it will automatically register the appropriate number of pods and start collecting metrics. Everything is done through auto-discovery, enabling you to get up and running within minutes. For full details on how Netdata’s Kubernetes monitoring works and how to get started, check out our blog post on <a title="Kubernetes monitoring and troubleshooting made simple" href="https://staging-www.netdata.cloud/blog/kubernetes-monitoring-troubleshooting/" target="_blank" rel="noopener">Kubernetes monitoring and troubleshooting</a>.

</div>
</div>
<div class="et_pb_module et_pb_text et_pb_text_5 et_pb_text_align_left et_pb_bg_layout_light">
<div class="et_pb_text_inner">
<h2><strong>Get started container monitoring with Netdata</strong></h2>
<strong>Regardless if you are running Kubernetes or Docker, we have a simplistic, easily configurable solution for you that provides deep insights. Our container monitoring solutions are available to any user today, entirely free of charge. If you’re new to Netdata or a current Agent user who hasn’t signed into Cloud, the next steps will be to <a href="https://app.netdata.cloud/sign-up?cloudRoute=/spaces">sign up</a>.</strong>

</div>
</div>
</div>
</div>
</div>
</div>
