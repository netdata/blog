---
title: "Release 1.13"
date: 2019-03-21
author: "Chris Akritidis"
url: "/posts/release-1.13"
cover: "release-1-13.png"
tags: ["Release"]
categories: []
draft: false
---

Release 1.13 contains 14 bug fixes and 8 improvements.

Netdata has taken the first step into the world of Kubernetes, with a beta version of a [Helm chart](https://github.com/netdata/helmchart) for deployment to a k8s cluster and [proper naming](https://github.com/netdata/netdata/pull/5576) of the cgroup containers. We have [big plans](https://github.com/netdata/netdata/issues/5392) for Kubernetes, so stay tuned!

A [major refactoring of the python.d plugin](https://github.com/netdata/netdata/pull/5552) has resulted in a dramatic decrease of the required memory, making netdata even more resource efficient.

We also added charts for IPC shared memory segments and total memory used.

<!--more-->

### Acknowledgements:

- [varyumin](https://github.com/varyumin), who graciously shared the original Kubernetes Helm chart and is still helping improve it
- [p-thurner](https://github.com/p-thurner) for his great work on the SSL certificate expiration module. 
- [Ferroin](https://github.com/Ferroin) for his priceless insights and assistance
- [Jaxmetalmax](https://github.com/Jaxmetalmax) for graciously helping us identify and fix postgress connection issues

### Improvements

- Kubernetes: Helm chart (https://github.com/netdata/helmchart) and proper cgroup naming [\#5576](https://github.com/netdata/netdata/pull/5576) ([cakrit](https://github.com/cakrit))
- python.d.plugin: Reduce memory usage with separate process for initial module checking [\#5552](https://github.com/netdata/netdata/pull/5552) ([ilyam8](https://github.com/ilyam8)) and  loaders cleanup [\#5602](https://github.com/netdata/netdata/pull/5602) ([ilyam8](https://github.com/ilyam8))
- IPC shared memory charts [\#5522](https://github.com/netdata/netdata/pull/5522) ([vlvkobal](https://github.com/vlvkobal))
- mysql module add ssl connection support [\#5610](https://github.com/netdata/netdata/pull/5610) ([ilyam8](https://github.com/ilyam8))
- FreeIPMI: Have the debug option apply the internal freeipmi debug flags [\#5548](https://github.com/netdata/netdata/pull/5548) ([cakrit](https://github.com/cakrit))
- Prometheus backend: Support legacy metric names for source=avg [\#5531](https://github.com/netdata/netdata/pull/5531) ([cakrit](https://github.com/cakrit))
- Registry: Allow deleting the host we are looking at [\#5537](https://github.com/netdata/netdata/pull/5537) ([cakrit](https://github.com/cakrit))
- SpigotMC:  Use regexes for parsing. [\#5507](https://github.com/netdata/netdata/pull/5507) ([Ferroin](https://github.com/Ferroin))

### Bug Fixes

- Postgres: fix connection issues [\#5618](https://github.com/netdata/netdata/pull/5618) ([Jaxmetalmax](https://github.com/Jaxmetalmax)), [\#5617](https://github.com/netdata/netdata/pull/5617) ([ilyam8](https://github.com/ilyam8))
- Proxmox container: Fix cgroup naming [\#5612](https://github.com/netdata/netdata/pull/5612) ([vlvkobal](https://github.com/vlvkobal)) and use total\_\* memory counters for cgroups [\#5592](https://github.com/netdata/netdata/pull/5592) ([vlvkobal](https://github.com/vlvkobal))
- proc.plugin and plugins.d: Fix memory leaks [\#5604](https://github.com/netdata/netdata/pull/5604) ([vlvkobal](https://github.com/vlvkobal))
- SpigotMC: Fix UnicodeDecodeError  [\#5598](https://github.com/netdata/netdata/pull/5598) ([ilyam8](https://github.com/ilyam8)) and py2 compatibility fix [\#5593](https://github.com/netdata/netdata/pull/5593) ([ilyam8](https://github.com/ilyam8))
- Fix non-obsolete dimension deletion [\#5563](https://github.com/netdata/netdata/pull/5563) ([vlvkobal](https://github.com/vlvkobal))
- UI: Fix incorrect icon for the streaming master \#5560 [\#5561](https://github.com/netdata/netdata/pull/5561) ([gmosx](https://github.com/gmosx))
- Docker container names: Retry renaming when a name is not found [\#5557](https://github.com/netdata/netdata/pull/5557) ([vlvkobal](https://github.com/vlvkobal))
- apps.plugin: Don't send zeroes for empty process groups [\#5540](https://github.com/netdata/netdata/pull/5540) ([vlvkobal](https://github.com/vlvkobal))
- go.d.plugin: Correct sha256sum check [\#5539](https://github.com/netdata/netdata/pull/5539) ([cakrit](https://github.com/cakrit))
- Unbound module: Documentation corrected with troubleshooting section. [\#5528](https://github.com/netdata/netdata/pull/5528) ([Ferroin](https://github.com/Ferroin))
- Streaming: Prevent UI issues upon GUID duplication between master and slave netdata instances [\#5511](https://github.com/netdata/netdata/pull/5511) ([paulkatsoulakis](https://github.com/paulkatsoulakis))
- Linux power supply module: Fix missing zero dimensions  [\#5395](https://github.com/netdata/netdata/pull/5395) ([vlvkobal](https://github.com/vlvkobal))
- Minor fixes around plugin\_directories initialization [\#5536](https://github.com/netdata/netdata/pull/5536) ([paulkatsoulakis](https://github.com/paulkatsoulakis))
