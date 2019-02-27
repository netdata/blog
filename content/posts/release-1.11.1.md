---
title: "Release 1.11.1"
date: 2018-11-22
author: "Costa Tsaousis"
cover: "release-1.11.1.png"
tags: ["Release", "Patch"]
categories: []
draft: false
---

This is a patch - bug fix release of netdata. Our work to move all the documentation inside the repo is still in progress. Everything has been moved, but still we need to refactor a lot of the pages to be more meaningful. The README file on netdata home has been rewritten. [Check it here](https://github.com/netdata/netdata#netdata----).

## Improved internal database

Overflown incremental values (counters) do not show a zero point at the charts. Netdata detects the width (8bit, 16bit, 32bit, 64bit) of each counter and properly calculates the delta when the counter overflows. The internal database format has been extended to support values above 64bit.

## New data collection plugins

1. `openldap`, to collect performance statistics from OpenLDAP servers.
2. `tor`, to collect traffic statistics from Tor.
3. `nvidia_smi` to monitor NVIDIA GPUs.

## Improved data collection plugins

- **BUG FIX**: network interface names with colon (`:`) in them were incorrectly parsed and resulted in faulty data collection values.
- **BUG FIX**: `smartd_log` has been refactored, has better python v2 compatibility, and now supports SCSI smart attributes
- `cpufreq` has been re-written in C - since this module if common, we decided to convert to an internal plugin to lower the pressure on the python ones. There are a few more that will be transitioned to C in the next release.
- **BUG FIX**: `sensors` got some compatibility fixes and improved handling for `lm-sensors` errors.

## Health monitoring

- **BUG FIX**: max network interface speed data collection was faulty, which resulted in false-positive alarms on systems with multiple interfaces using different speeds (the speed of the first network interface was used for all network interfaces). Now the interface speed is shown as a badge:

![image](https://user-images.githubusercontent.com/2662304/48292282-610e2b00-e482-11e8-95e6-478094160f4f.png)

- `alerta.io` notifications got a few improvements

- **BUG FIX**: `conntrack_max` alarm has been restored (was not working due to an invalid variable name referenced)

## Registry (`my-netdata` menu)

It has been refactored a bit to reveal the URLs known for each node and now it supports deleting individual URLs.

## Packaging

- `openrc` service definition got a few improvements
