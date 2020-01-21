---
title: "Monitor Docker with Netdata"
summary: "t/k"
date: 2019-01-28
author: "Joel Hans"
cover: ""
tags: ["Integrations"]
categories: []
draft: false
---

[Docker](https://www.docker.com/) is a virtualization platform that helps developers deploy their software in
reproducable and isolated packages called containers. These containers have everything the software needs to run
properly, including libraries, tools, and their application's source code or binaries. In short, it solves this exact
problem:

!["It works on my machine"
meme](https://user-images.githubusercontent.com/1153921/72571339-9085a800-387c-11ea-8cb7-88e8d13411c2.png)

Docker containers are a popular platform for distributing software via [Docker Hub](https://hub.docker.com), as we do
for [Netdata itself](https://hub.docker.com/r/netdata/netdata). But perhaps more importantly, containers are now being
"orchestrated" with platforms like [Kubernetes](https://kubernetes.io/) and [Docker
Swarm](https://docs.docker.com/engine/swarm/). Properly monitoring the health and performance of Docker containers, and
the applications/services they're tasked with running—is an essential skill for DevOps, SRE, and operations teams.

Thanks to Netdata's tight integration with Docker, montioring all kinds of containerized software is a cinch.

**image**

## How Docker monitoring with Netdata works



## View many containers at-a-glance

## Get alarms when containers go awry

## Dive into specific containerized apps and services

https://docs.netdata.cloud/collectors/apps.plugin/#linux-capabilities-in-containers

## What's next?

To get started monitoring Docker containers with Netdata, simply [install
Netdata](https://docs.netdata.cloud/packaging/installer/) on any system running the Docker daemon. Netdata will
auto-detect the running Daemon and begin monitoring the health and performance of any running containers.

If you already have Netdata installed and want to enable Docker monitoring, simply [restart
Netdata](https://docs.netdata.cloud/docs/getting-started/#start-stop-and-restart-netdata) using the appropriate command
for your system.

Netdata handles ephemeral Docker containers without complaint, so don't worry about situations where you're scaling up
and down on any given machine. As soon as a new container is running, Netdata dynamically attaches all the relevant
alarms and updates the dashboard.

For a more thorough investigation of Netdata's Docker monitoring capabilities, read our [cgroups
collector](https://docs.netdata.cloud/collectors/cgroups.plugin/) documentation and our [Docker
Engine](https://docs.netdata.cloud/collectors/go.d.plugin/modules/docker_engine/) documentation.
