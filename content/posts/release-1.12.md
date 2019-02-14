---
title: "Release 1.12"
date: 2019-02-14
author: "Costa Tsaousis"
cover: "release-1-12.png"
tags: ["Release"]
categories: []
draft: false
---

## At a glance

Release 1.12 is made out of 211 pull requests and 22 bug fixes.
The key improvements are:

- Introducing `netdata.cloud`, the free netdata service for all netdata users
- High performance plugins with go.d.plugin (data collection orchestrator written in Go)
- 7 new data collectors and 11 rewrites of existing data collectors for improved performance
- A new management API for all netdata servers
- Bind different functions of the netdata APIs to different ports
- Improved installation and updates

## netdata.cloud

`netdata.cloud` is a free service for all netdata users. Currently it replaces the old netdata registry, while providing single sign on with GitHub and Google accounts.

Using `netdata.cloud` we plan to provide the following features:

- distributed authentication (password protection) for all netdata installations
- network view for all nodes
- cross node custom dashboard editor, storage and sharing
- centralized health monitoring and alarm notifications

and many more.

Read more about `netdata.cloud` [here](https://netdata.cloud/about).

## Bind API functions to different ports

netdata can now bind its API functions to different ports.

The following API functions can be isolated:

- `dashboard` for access the dashboard
- `badges` for generating badges
- `streaming` for receiving streamed metrics from remote netdata servers
- `management` for receiving management commands
- `registry` for accessing the netdata registry
- `netdata.conf` for downloading the current configuration

To bind API functions to different ports, append `=function|function|...` to the port definition, like this:

```
[web]
   bind to = *:19999=dashboard|netdata.conf *:20000=streaming
```

The above will bind netdata:

- on all IPs (`*`) at port `19999` for dashboard access and access to `netdata.conf`
- on all IPs (`*`) at port `20000` for receiving streamed data from remote netdata servers

For more information about binding API functions to different ports, [check this](https://docs.netdata.cloud/web/server/#binding-netdata-to-multiple-ports).

## Management API

Netdata now has a management API. We plan to provide a full set of configuration commands using this API.

In this release, the management API supports disabling or silencing alarms during maintenance periods.

For more information about the management API, check [this](https://docs.netdata.cloud/web/api/health/#health-management-api).

## Anonymous statistics

Anonymous usage information is collected by default and sent to Google Analytics. The statistics calculated from this information will be used for:

1. **Quality assurance**, to help us understand if netdata behaves as expected and help us identify repeating issues for certain distributions or environment.

2. **Usage statistics**, to help us focus on the parts of netdata that are used the most, or help us identify the extend our development decisions influence the community.

Information is sent to Netdata via two different channels:
- Google Tag Manager is used when an agent's dashboard is accessed.
- The script `anonymous-statistics.sh` is executed by the Netdata daemon, when Netdata starts, stops cleanly, or fails.

Both methods are controlled via the same [opt-out mechanism](https://docs.netdata.cloud/docs/anonymous-statistics/#opt-out).
 
For more information, [check this](https://docs.netdata.cloud/docs/anonymous-statistics/).

## Data collection

This release introduces a new Go plugin orchestrator. This plugin has its own [github repo](https://github.com/netdata/go-orchestrator). It is open-source, using the same license and we welcome contributions. The orchestrator can also be used to build custom data collection plugins written in Go. We have used the orchestrator to write many new Go plugins in our [go.d plugin github repo](https://github.com/netdata/go.d.plugin). For more information, [check this](https://github.com/netdata/go-orchestrator#go-orchestrator-wip).

New data collectors:

-   Activemq (Go)   
-   Consul (Go)
-   Lighttpd2 (Go)
-   Solr (Go)
-   Springboot2 (Go)
-   mdstat - nonredundant arrays (C)
-   CUPS printing system (C)

High performance versions of older data collectors:

-   apache (Go)
-   dns_query (Go)
-   Freeradius (Go)
-   Httpcheck (Go)
-   Lighttpd (Go)
-   Portcheck (Go)
-   Nginx (Go)
-   cpufreq (C)
-   cpuidle (C)
-   mdstat (C)
-   power supply (C)

Other improved data collectors:

-   Fix the python plugin clock (collectors falling behind).
-   adaptec_raid: add to python.d.conf.
-   apcupsd: Detect if UPS is online.
-   apps: Fix process statistics collection for FreeBSD.
-   apps: Properly lookup docker container name when running in ECS.
-   fail2ban: Add 'Restore Ban' action.
-   go_expavar: Don't check for duplicate expvars.
-   hddtemp: Don't use disk model as dim name.
-   megacli: add to python.d.conf.
-   nvidia_smi: handle `N/A` values.
-   postgres: Fix integer out of range error on Postgres 11, fix locks count.
-   proc: Don't show zero charts for ZFS filesystem.
-   proc; Fix cached memory calculation.
-   sensors: Don't ignore 0 RPM fans on start.
-   smartd_log: check() unhandled exception: list index out of range.
-   SNMP: Gracefully ignore the offset if the value is not a number.

## Packaging and Installation

-   Upload nightly builds to Google Cloud. Use the nightlies in new installations and updates.
-   Improved uninstaller.
-   Scramble packages in docker images with polymorphic Linux. 
-   Building RPMs: Fix permissions for log files, remove rolling version suffix.

## Health Monitoring

-   Add Prowl notifications for iOS users.
-   Show count of active alarms per state in email notifications.
-   Show evaluated expression and expression variable values in email notifications.
-   Improve support for slack recipients (channels/users).
-   Custom notifications: Fix bug with alarm role recipients.

## Dashboards

-   Server filtering in `my-netdata` menu when signed in to `netdata.cloud`
-   All units are now IEC-compliant abbreviations (KiB, MiB etc.).
-   GUI: Make entire row clickable in the registry menu showing the list of servers.

## Backends
-   Do not report stale metrics to prometheus.

## Other
    
-   Deprecated multi-threaded and single-threaded web servers, in preparation for Windows support.
-   Documentation improvements.
-   Treat `DT_UNKNOWN` files as regular files.
-   API: Stricter rules for URL separators.
