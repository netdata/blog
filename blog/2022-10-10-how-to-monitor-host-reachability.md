---
title: How to monitor host reachability
description: This post describes how to use Netdata to monitor the reachability of your servers.
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-2.png
tags: [how-to,ping,reachability,monitoring]
keywords: [how-to,ping,reachability,monitoring]
authors: chris
slug: how-to-monitor-host-reachability/
---

Most sysadmins and developers have at some point used a few of the popular <a href="https://www.tecmint.com/linux-networking-commands" target="_blank" rel="noopener">Linux networking commands</a> or their Windows equivalents to answer the common questions of host reachability - that is, whether a host or service is reachable and how fast it responds.

<!--truncate-->

## Common approaches to reachability

One of the simplest, common checks, is to simply `ping` a host to verify that it’s reachable from where you issue the command, and to see the total time it takes for the host to receive your request. 

However, to go from a simple manual check executed once on a given node, to proactively monitoring host reachability, you need a proper monitoring tool. Netdata Cloud has the capability to send reachability notifications for any Netdata node that loses its connection to the cloud. You just need to change the notification settings of your personal profile to <strong>All Alerts and unreachable</strong> for every room you want to receive such notifications from:

![host reachability - All Alerts and unreachable](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitor-unreachable-host-1.png)

But, of course, this isn’t really monitoring the reachability of the host itself. 

Netdata monitors various components involved in the availability and performance of any service reached via a network protocol, such as <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/dnsquery" target="_blank" rel="noopener">name resolution</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/proc.plugin#monitoring-network-interfaces" target="_blank" rel="noopener">network interfaces</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/proc.plugin" target="_blank" rel="noopener">TCP/UDP packets</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/proc.plugin" target="_blank" rel="noopener">IPv4/IPv6 usage</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/nfacct.plug">Netfilter statistics</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/tc.plugin" target="_blank" rel="noopener">QoS,</a> and more. Of course, it monitors host reachability and total network latency as well, utilizing ping.

<code>ping</code> is a Linux command line tool that monitors host reachability and measures round-trip time and packet loss by sending ping messages to network hosts.

The instructions to install and configure the collector are available in the <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/ping" target="_blank" rel="noopener">collector’s documentation</a>, so let’s just dive into the benefits of this plugin. 

## Example using ping

In the example below, I’ve configured the <code>ping</code> plugin to monitor just two “hosts”, from a single location. The hosts configured can be IP addresses or the hostname itself, london.netdata.rocks and 10.20.128.1.

The first chart we see in the ping section is the ping latency.

![Host Reachability - Network Latency Chart](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-2.png)

The default configuration of the chart is telling us that we’re seeing a grouping by dimension of metrics coming from two instances in one Node. Two hostnames monitored, so the instances make sense. But what you see here in the dimensions are average, maximum and minimum latencies for the request of all the ICMP request timings within the time frame depicted by that point. If we zoom in far enough, we’ll see that even when each point shows a single second, we still have different values for min, max and average. The reason we have so many values is that by default, the Netdata ping collector issues 5 ICMP requests with a 100ms interval, per host! Do take note of that: if your latency is too high to accommodate so many requests per second, you’ll need to modify the <code>interval</code> or <code>packets</code> in <code>ping.conf.</code>

This chart may be useful if I’m monitoring the reachability of many instances of the same service perhaps, but more often than not, I’d want to see how each host responds. So let’s change the view to <strong>Group by host</strong>.

![image](https://user-images.githubusercontent.com/24860547/200533928-dfcc026b-63a9-4e70-8c81-260a5f32ea21.png)

Now you can see separate charts for each of the hosts which clearly show you the ping latency patterns for each host you are interested in. 

![image](https://user-images.githubusercontent.com/24860547/200534178-0f00f591-1327-42a1-a069-7cc30f955b09.png)

Now, if instead of avg, min and max you just want to see the values for one of those dimensions (Eg: max) you can filter the chart to this effect as well. This might be useful in scenarios where you want to keep an eye on potential spikes in latency from certain hosts.

![image](https://user-images.githubusercontent.com/24860547/200534369-9be7f1aa-65b0-43ba-af46-226a56644346.png)

If more than the raw values of the ping latency itself you are interested in variations form the norm, there's another chart for you which is focused on the standard deviation in Ping RTT.

![image](https://user-images.githubusercontent.com/24860547/200534517-40cdaf1a-fbe6-48f2-9664-1f9675dd8f84.png)

If any of the ping packets that you send do not reach their destination and are dropped along the network path, it contributes to packet loss. Packet loss can be caused by network congestion, hardware issues, software bugs, and a number of other factors.

![image](https://user-images.githubusercontent.com/24860547/200534895-68a98995-3865-4c9d-b592-f5d5df9c8b5a.png)

The final chart that shows packets sent vs packets received can show us the absolute number of ping packets being sent and received per second. 

## Alert configurations

The Netdata ping plugin comes with built in alerts for the following conditions: 
- Host unreachable
- Ping packet loss exceeds threshold
- Ping latency exceeds threshold

You can see the exact configuration of all alerts in [/netdata/netdata/health/health.d/ping.conf](https://github.com/netdata/netdata/blob/master/health/health.d/ping.conf), or by going to your netdata config directory and running <code>/edit-config health.d/ping.conf</code>. One alert you may want to customize based on your use case is the latency one, and specifically the number of milliseconds that triggers the alert. The default is shown below and has values exceeding 500 ms (avg last 10sec) to go to warning and 1000ms to turn critical. That may either be too strict, or too lenient for your use case.

```yaml
 template: ping_host_latency
 families: *
       on: ping.host_rtt
    class: Latency
     type: Other
component: Network
   lookup: average -10s unaligned of avg
    units: ms
    every: 10s
    green: 500
      red: 1000
     warn: $this > $green OR $max > $red
     crit: $this > $red
    delay: down 30m multiplier 1.5 max 2h
     info: average latency to the network host over the last 10 seconds
       to: sysadmin
```

So, if your hosts do permit ICMP requests, Netdata’s <em>ping</em> plugin has everything you need. But you still need to think about where you will be running such tests from. The obvious answer is to run them from a management node somewhere in your infrastructure. But, this is certainly not what your users will experience if your service is public. Ideally, you’d want to set up probes in many different places, depending on where your customers are. 

With Netdata, it’s very easy to do that very cheaply, as it can be configured to utilize very limited resources. So you could get very cheap nodes and run a Netdata agent on each one of them. You might not even want to store the collected metrics locally on those nodes, but stream those metrics to a parent Netdata node. A parent child setup is always a good idea for production deployments anyway, for data replication.

## Let us hear from you

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>.

Happy Troubleshooting!
