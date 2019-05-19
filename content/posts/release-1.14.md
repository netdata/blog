---
title: "Release 1.14"
date: 2019-04-26
author: "Chris Akritidis"
cover: "release-1-14.png"
tags: ["Release"]
categories: []
draft: false
---

Release 1.14 contains 14 bug fixes and 24 improvements.

The release introduces major additions to Kubernetes monitoring, with tens of new charts for Kubelet, kube-proxy and coredns metrics, as well as significant improvements to the netdata helm chart.

Two new collectors were added, to monitor Docker hub and Docker engine metrics.

Finally, v1.14 adds support for version 2 cgroups, OpenLDAP over TLS, NVIDIA SMI free and per process memory and configurable syslog facilities.

<!--more-->

### Acknowledgements

Our contributors kicked the ball out of the park this time. Our thanks go to the following people:

- @ekartsonakis for the excellent addition of TLS support to the OpenLDAP collector
- @Wing924 whose cat apparently leaves him enough time to help us with springboot2 and a lot more!
- @huww98 for his contribution to the NVIDIA SMI plugin.
- @varyumin for his help on the Kubernetes helm chart.
- @skrzyp1 for the very significant addition of cgroup v2 support
- @hsegnitz for his contribution to the web server log plugin.
- @archisgore for the quick fixes to the Polyverse-enabled docker image.
- @tctovsli for his Rocket Chat notifications improvements.
- @JoeWrightss and @vinyasmusic for not letting us get away with spelling mistakes.
- @andvgal for the addition to the MongoDB collector.
- @piiiggg for the apache proxy documentation fix
- @Ferroin for general awesomeness.

### Improvements

- go.d.plugin [v0.4.0](https://github.com/netdata/go.d.plugin/releases/tag/v0.4.0) : Docker Hub and k8s coredns collectors, springboot2 URI filters support.
- go.d.plugin [v0.3.1](https://github.com/netdata/go.d.plugin/releases/tag/v0.3.1) : Add default job to run k8s_kubelet.conf, k8s_kubeproxy, activemq modules 
- go.d.plugin [v0.3.0](https://github.com/netdata/go.d.plugin/releases/tag/v0.3.0) : Docker engine, kubelet and kub-proxy collectors. x509check module reading certs from file support
- Added unified cgroup support that includes v2 cgroups [\#5407](https://github.com/netdata/netdata/pull/5407) ([skrzyp1](https://github.com/skrzyp1))
- Disk stats: Added preferred disk id pattern, so that users can see the id they prefer, when multiple ids appear for the same device [\#5779](https://github.com/netdata/netdata/pull/5779) ([vlvkobal](https://github.com/vlvkobal))
- NVIDIA SMI: Added memory free and per process memory usage charts to the collector [\#5796](https://github.com/netdata/netdata/pull/5796) ([huww98](https://github.com/huww98))
- OpenLDAP: Added TLS support, to allow monitoring of LDAPS.  [\#5859](https://github.com/netdata/netdata/pull/5859) ([ekartsonakis](https://github.com/ekartsonakis))
- PHP-FPM: Add health check to raise alarms when the phpfm server is unreachable [\#5836](https://github.com/netdata/netdata/pull/5836) ([ilyam8](https://github.com/ilyam8))
- PostgreSQL: Our configuration options to connect to a DB did not support all possible option. Added option to connect to a PostreSQL instance by defining a connection string (URI). [\#5758](https://github.com/netdata/netdata/pull/5758) ([ilyam8](https://github.com/ilyam8))
- python.d.plugin: There was no way to delete obsolete dimensions in charts created by the python.d plugin. The plugin can now delete dimension at runtime. [\#5795](https://github.com/netdata/netdata/pull/5795) ([ilyam8](https://github.com/ilyam8))
- netdata supports sending its logs to Syslog, but the facility was hard-coded. We now support configurable Syslog facilities in `netdata.conf`. [\#5792](https://github.com/netdata/netdata/pull/5792) ([thiagoftsm](https://github.com/thiagoftsm))
- We encountered sporadic failures of our kickstart installation scripts after nightly releases. We add  integrity tests to our pipeline to ensure we prevent faulty scripts from getting deployed. [\#5778](https://github.com/netdata/netdata/pull/5778) ([paulkatsoulakis](https://github.com/paulkatsoulakis))
- [Kubernetes Helm Chart](https://github.com/netdata/helmchart/) improvements: ([cakrit](https://github.com/cakrit)) and ([varyumin](https://github.com/varyumin)).
  - Added serviceName in statefulset spec to align with the k8s documentation 
  - Added preStart command to persist slave machine GUIDs, so that pod deletion/addition during upgrades doesn't lose the slave history.
  - Disabled non-essential master netdata collector plugins to avoid duplicate data
  - Added preStop command to wait for netdata to exit gracefully before removing the container
  - Extended configuration file support to provide more control from the helm command line
  - Added option to disable Role-based access control
  - Added liveness and readiness probes.

### Bugs

- Fixed cases where the netdata version produced by the binary or the configure tools of the source code was wrong. Instead of getting something like `netdata-v1.14.0-rc0-39a9sf9g` we would get a `netdata-39a9sf9g`.  [\#5860](https://github.com/netdata/netdata/pull/5860) ([paulkatsoulakis](https://github.com/paulkatsoulakis))
- Fixed unexpected crashes of the python plugin on macOS, caused by new security changes made in High Sierra. [\#5838](https://github.com/netdata/netdata/pull/5838) ([ilyam8](https://github.com/ilyam8))
- Fixed problem autodetecting failed jobs in python.d plugin. It now properly restarts jobs that are being rechecked, as soon as they are able to run.  [\#5837](https://github.com/netdata/netdata/pull/5837) ([ilyam8](https://github.com/ilyam8))
- CouchdDB monitoring would stop sometimes with an exception. Fixed the unhandled exception causing the issue. [\#5833](https://github.com/netdata/netdata/pull/5833) ([ilyam8](https://github.com/ilyam8))
- The netdata api deliberately returned http error 400 when netdata ran in memory mode none. Modified the behavior to return responses, regardless of the memory mode [\#5819](https://github.com/netdata/netdata/pull/5819) ([cakrit](https://github.com/cakrit))
- The python.d plugin sometimes does not receive `SIGTERM` when netdata exits, resulting in zombie processes. Added a heartbeat so that the process can exit on `SIGPIPE`.  [\#5797](https://github.com/netdata/netdata/pull/5797) ([ilyam8](https://github.com/ilyam8))
- The new SMS Server Tools notifications did not handle errors well, resulting in cryptic error messages. Improved error handling. [\#5770](https://github.com/netdata/netdata/pull/5770) ([cakrit](https://github.com/cakrit))
- The installers would crash on some FreeBSD systems, because `sha256sum` used by the installers is not available on all FreeBSD installations. Modified the installers to properly support FreeBSD. [\#5760](https://github.com/netdata/netdata/pull/5760) ([paulkatsoulakis](https://github.com/paulkatsoulakis))
- Running netdata behind a proxy in FreeBSD did not work, when using UNIX sockets. Added special handling of UNIX sockets for FreeBSD. [\#5756](https://github.com/netdata/netdata/pull/5756) ([vlvkobal](https://github.com/vlvkobal))
- Fixed sporadic build failures of our Docker image, due to dependencies on the Polyverse package ( APK broken state). [\#5751](https://github.com/netdata/netdata/pull/5751) ([archisgore](https://github.com/archisgore))
- Fix segmentation fault in streaming, when two dimensions had similar names. [\#5882](https://github.com/netdata/netdata/pull/5882) ([vlvkobal](https://github.com/vlvkobal))
- Kubernetes Helm Chart: Fixed incorrect use of namespaces in ServiceAccount and ClusterRoleBinding  [RBAC fixes](https://github.com/netdata/helmchart/pull/11) ([varyumin](https://github.com/varyumin)).
- Elastic search: The option to enable HTTPS was not included in the config file, giving the erroneous impression that HTTPS was not supported. The option was added. [\#5834] (https://github.com/netdata/netdata/pull/5834) ([ilyam8](https://github.com/ilyam8))
- RocketChat notifications were not being sent properly. Added default recipients for roles in the health alarm notification configuration. [\#5545](https://github.com/netdata/netdata/pull/5545) ([tctovsli](https://github.com/tctovsli))
