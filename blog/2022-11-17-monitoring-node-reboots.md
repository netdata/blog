---
slug: monitoring-node-reboots
title: "How to monitor node reboots?"
description: "How to monitor node reboots?"
image: https://user-images.githubusercontent.com/96257330/202475049-22838a0b-73b1-485b-8416-5fd49d6ccb53.png
tags: [how-to,infrastructure-monitoring,reboots,nodes,shutdown,crash]
keywords: [how-to,infrastructure-monitoring,reboots,nodes,shutdown,crash]
authors: satya
---
One of the most critical tasks of monitoring an infrastructure is to check the health of its servers / nodes.

<!--truncate-->

## How to monitor node reboots?

One of the most critical tasks of monitoring an infrastructure is to check the health of its servers / nodes. In most cases this results in setting up a "Hardware manager" from the hardware vendor delivering these servers or setting up an SNMP (or similar) agent to continuously monitor the availability of the server and report when there is a reboot / failure.

As important as these steps are, they are heavily infrastructure dependent - Bare metal / Cloud hosted servers, Linux / Windows OS, Hosted applications etc. And each of these come with their own monitoring software / tool:

- Hardware Manager - Delivered and maintained by the hardware vendor.
- Cloud Monitoring tools - Delivered and maintained by the Cloud provider and sometimes requires additional licenses to gain access to these tools.
- Software embedded tools - Delivered and maintained by the product house creating the product (integration with Zabbix, Prometheus or in-house software)

In a complex infrastructure setup, there is a necessity to have a single pane view for monitoring all the components of your infrastructure: hardware, OS, Cloud Infrastructure, applications, etc. With Netdata we strive to achieve this!

## Uptime for monitoring node reboots

 
Uptime is the duration of time that a system / node has been up and running.

Netdata provides a system.uptime metric which continuously monitors the uptime of all the nodes in your infrastructure. The uptime for any node that reboots will instantly roll back to 0. The default setting of the chart shows the average time for which all the nodes in your infrastructure have been up - but this is not really too helpful when you have hundreds of nodes.

![Uptime Default View](https://user-images.githubusercontent.com/96257330/202476244-d5506164-63ba-4f31-8e5d-8a082e59398d.png)

 
If you change the group by option by "node", you can see a nice stacked graph showing you the uptimes of all your nodes.

![Uptime Group by node](https://user-images.githubusercontent.com/96257330/202476730-e726f590-723b-4c06-b834-c0ca547b36a8.png)

If any of the nodes reboot, you will instantly see a change in the uptime metric specific to the node. For example in the example below, the node "satya-vm" was up and running for 34 days and a bit before it was rebooted and you can instantly see the metric dropping.

![Uptime on reboot](https://user-images.githubusercontent.com/96257330/202477156-40780c6f-8844-4f61-aecb-f3626622e2ed.png)

This is all good if you are going to monitor your system 24/7 but in reality you want to be notified when a node reboots and you can write a simple custom alert by monitoring the system.uptime metric.

```yaml
   alarm: system_uptime
      on: system.uptime
      os: linux
  lookup: min -1s
   hosts: *
   units: seconds
   every: 1m
    crit: $this < 300
   delay: down 15m multiplier 1.5 max 1h
    info: system uptime (time from last system reboot)
```

![Sample Alert](https://user-images.githubusercontent.com/96257330/202478871-0744e859-21c3-4551-99b8-a6a6b03d3622.png)

The sample alert above monitors the "system.uptime" context, looks up the minimum value in the last 1 second and raises a critical alert when the time since last reboot is less than 5 minutes, and the alert will remain active for 20 minutes (5 + the 15 minute down in the delay hysteresis) unless it is rebooted within this interval.

In case of ephemeral environments that spin up and terminate hosts constantly, it can be challenging to distinguish new hosts from rebooted hosts. You can use placeholder alerts in your alert definition to only alert when the uptime of an existing host goes down.

```yaml
    alarm: last_uptime_val
       on: system.uptime
   lookup: max -1s at -300s unaligned
     calc: $this
    every: 15s

   alarm: system_uptime
      on: system.uptime
      os: linux
  lookup: min -1s
   hosts: *
   units: seconds
   every: 1m
    crit: $this < $last_uptime_val AND $last_uptime_val != nan
   delay: down 15m multiplier 1.5 max 1h
    info: system uptime (time from last system reboot)
```

Additionally, you can also monitor the reachability notifications which indicate a connection lost between the Netdata agent and the cloud and in some cases indicate a node being rebooted / down - [Read more](https://www.netdata.cloud/blog/how-to-monitor-host-reachability).

## Let us hear from you

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>.

Happy Troubleshooting!
