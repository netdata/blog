---
slug: systemd-service-liveness
title: "How to monitor systemd service liveness"
description: "How to monitor systemd service liveness"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Systemmd-Service-Liveness-e1666366169680.png
tags: [how-to,infrastructure-monitoring,monitoring,systemd,systemd-services]
keywords: [how-to,infrastructure-monitoring,monitoring]
authors: chris
---

The life of a sysadmin or SRE is often difficult, but occasionally very simple things can make a huge difference. Basic monitoring of your systemd services is one of those simple things, which we sometimes overlook. The simplest question one would want to know is if the thing that’s supposed to be running is actually running at all. If you use systemd services, you can guarantee an answer to that question within minutes using Netdata. 

<!--truncate-->

The Netdata <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/systemdunits">systemd units state collector</a> can continuously monitor any systemd service and notify you if it crashes. In fact, it can <em>monitor any systemd unit</em>, including systemd sockets, systemd paths etc.

After signing up in <a href="https://app.netdata.cloud">https://app.netdata.cloud</a> and installing netdata, you just follow the instructions <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/systemdunits">here</a> to enable the collector and tell it what units you are interested in monitoring. 

The quickest thing you can do is have a single job for all services, as follows:

```yaml
jobs:
  - name: service-units
    include:
      - '*.service'
```

Or maybe you just want to monitor a single service:

```yaml
jobs:
  - name: my-specific-service-unit
    include:
      - 'my-specific.service'
```

The “include” directive utilizes the <a href="https://golang.org/pkg/path/filepath/#Match">shell file name pattern syntax</a>.

Whatever you specify will result in a time series for each data collection job, showing the health of the matching systemd units, and <a href="https://github.com/netdata/netdata/blob/master/health/health.d/systemdunits.conf">automated health checks</a> that trigger alerts if a systemd unit goes into the “failed” state. 

!["Systemmd Service Liveness"](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Systemmd-Service-Liveness.png)

If you want to ensure a service is running no matter what, you could add your own alerts for the “inactive” state as well. 

e.g. when you <code>./edit-config health.d/systemdunits.conf</code> you can make a copy of the following…

```yaml
## Service units
 template: systemd_service_unit_failed_state
       on: systemd.service_unit_state
    class: Errors
     type: Linux
component: Systemd units
     calc: $failed
    units: state
    every: 10s
     warn: $this != nan AND $this == 1
    delay: down 5m multiplier 1.5 max 1h
     info: systemd service unit in the failed state
       to: sysadmin
```
… and change the new copy to:

```yaml
## Service units
 template: <b>systemd_service_unit_inactive_state</b>
       on: systemd.service_unit_state
    class: Errors
     type: Linux
component: Systemd units
     calc: <b>$inactive</b>
    units: state
    every: 10s
     warn: $this != nan AND $this == 1
    delay: down 5m multiplier 1.5 max 1h
     info: systemd service unit in the <b>inactive </b>state
       to: sysadmin
```

You could even automatically execute a script other than the default alarm-notify.sh every time an alert changes state, by providing a custom <a href="https://learn.netdata.cloud/docs/agent/health/reference#alarm-line-exec">exec option to the alert configuration</a>. That script could, for example, attempt to start a monitored service again.

There’s nothing else to it really. The collector has a few more options like how frequently to check the state, but you really don’t need much more than a simple configuration. With Netdata, you can start receiving notifications for failed systemd services in just a few minutes!

So f you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>. 

Happy Troubleshooting!