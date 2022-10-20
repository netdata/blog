---
title: How to monitor host reachability
description: This post describes how to use Netdata to monitor the reachability of your servers.
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-2.png
tags: [how-to,fping,ping,reachability,monitoring]
keywords: [how-to,fping,ping,reachability,monitoring]
authors: chris
slug: how-to-monitor-host-reachability
---

Most sysadmins and developers have at some point used a few of the popular <a href="https://www.tecmint.com/linux-networking-commands" target="_blank" rel="noopener">Linux networking commands</a> or their Windows equivalents to answer the common questions of host reachability - that is, whether a host or service is reachable and how fast it responds.

<!--truncate-->

## Common approaches to reachability

One of the simplest, common checks, is to simply `ping` a host to verify that it’s reachable from where you issue the command, and to see the total time it takes for the host to receive your request. 

However, to go from a simple manual check executed once on a given node, to proactively monitoring host reachability, you need a proper monitoring tool. Netdata Cloud has the capability to send reachability notifications for any Netdata node that loses its connection to the cloud. You just need to change the notification settings of your personal profile to <strong>All Alerts and unreachable</strong> for every room you want to receive such notifications from:

![host reachability - All Alerts and unreachable](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitor-unreachable-host-1.png)

But, of course, this isn’t really monitoring the reachability of the host itself. 

Netdata monitors various components involved in the availability and performance of any service reached via a network protocol, such as <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/dnsquery" target="_blank" rel="noopener">name resolution</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/proc.plugin#monitoring-network-interfaces" target="_blank" rel="noopener">network interfaces</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/proc.plugin" target="_blank" rel="noopener">TCP/UDP packets</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/proc.plugin" target="_blank" rel="noopener">IPv4/IPv6 usage</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/nfacct.plug">Netfilter statistics</a>, <a href="https://learn.netdata.cloud/docs/agent/collectors/tc.plugin" target="_blank" rel="noopener">QoS,</a> and more. Of course, it monitors host reachability and total network latency as well, utilizing <a href="https://github.com/schweikert/fping#fping" target="_blank" rel="noopener">fping</a>.

<code>fping</code> is a Linux command line tool very similar to <code>ping</code>, but with better performance characteristics when monitoring multiple hosts. <code>fping</code> is also unique in that it can expose the results of its ICMP requests in the <a href="https://learn.netdata.cloud/docs/agent/collectors/plugins.d#external-plugins-api" target="_blank" rel="noopener">Netdata external plugins API format</a>. Netdata utilizes this capability, which is properly available only from <code>fping</code> v5.1 and above, so you will probably need to install this tool manually, as most package managers have a much older version. 

The instructions to install and configure the collector are available in the <a href="https://learn.netdata.cloud/docs/agent/collectors/fping.plugin" target="_blank" rel="noopener">collector’s documentation</a>, so let’s just dive into the benefits of this plugin. 

## Example using fping

In the example below, I’ve configured the <code>fping</code> plugin to monitor just two “hosts”, from a single location. The hosts I configured are “<a href="https://www.netdata.cloud">www.netdata.cloud</a>” and “app.netdata.cloud." The choice of the specific hostnames is not ideal, as each one resolves to several IP addresses. For host reachability specifically, we would want to either provide in the configuration the IP itself, or enter in the `/etc/hosts` of the node where Netdata is running some arbitrary aliases for each of the IP addresses. There’s also another reason that “app.netdata.cloud” should not have been chosen, which you will see immediately.

The first chart we see in the infrastructure overview screen is the network latency.

![Host Reachability - Network Latency Chart](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-2.png)

The default configuration of the chart is telling us that we’re seeing a grouping by dimension of metrics coming from two instances in one Node. Two hostnames monitored, so the instances make sense. But what you see here in the dimensions are average, maximum and minimum latencies for the request of all the ICMP request timings within the time frame depicted by that point. If we zoom in far enough, we’ll see that even when each point shows a single second, we still have different values for min, max and average. The reason we have so many values is that by default, the Netdata fping collector issues 5 ICMP requests per second, per host! Do take note of that: if your latency is too high to accommodate so many requests per second, you’ll need to modify the <code>ping_every</code> in <code>fping.conf.</code>

This chart may be useful if I’m monitoring the reachability of many instances of the same service perhaps, but more often than not, I’d want to see how each host responds. So let’s change the view to <strong>Group by instance</strong>.

![Host reachability - Group by instance view](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-3.png)

Now, the dimension names look funny. That’s because our front-end does some funky things to keep the length of each dimension within a certain width. When you hover over the chart as done in the image, you see the fully expanded dimension names. 

Looking closely at the options of this chart on the top line, we can see that it’s showing the <strong>sum of ABS</strong> of <strong>All dimensions</strong>. What that means is that it takes all “dimensions” (avg, max, min), adds their absolute values together, and shows  the result. For this specific use case, this addition makes no sense. So I just click on <strong>All dimensions</strong> and select to see only the <strong>average</strong>.

![Host reachability > All dimensions > Average](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-4.png)

Now, wait one minute. What’s wrong with app.netdata.cloud? There’s a constant 0ms response time, obvious by the fact that there’s no green line anywhere to be seen! For an explanation, let’s move on to the next chart now, <strong>quality</strong>:

![Host reachability - Quality](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-5.png)

With the default settings, this chart is telling us that only 50% of the total issued requests were successful. Changing the view to <strong>Group by instance</strong>, makes it obvious that app.netdata.cloud isn’t responding. 

![Host reachability - Group by Instance](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-6.png)

The final chart that shows packets sent vs packets received can also be used here to show us the same thing, but in absolute numbers, instead of percentages. 

So do we panic? Well, if we were careful in the beginning, we wouldn’t have to. In reality, ICMP is disabled on the nodes that serve app.netdata.cloud, so it was never going to work. But the mistake is useful, because we can see the predefined alerts in action!

Going to the alerts tab, we see two critical alerts raised-one coming from the latency chart and the other from the quality chart:

![Host reachability - Two critical alerts](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-7.png)

The chart coming from the latency chart is smart enough to not tell me there’s a latency issue, but a reachability issue. Let’s see what other alarms are preconfigured and what the conditions are for each:

![host reachability - preconfigured alerts](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-8.png)

The alert configurations tab shows that a total of four alert templates are being used on each of the two instances (i.e.  eight checks are running). The third item, <strong>last_collected_secs</strong>, is a standard alert for all Netdata collectors, triggered if the collector is having trouble getting the metrics. Let’s take a look at <strong>fping_host_reachable</strong>, which is one of the two alerts that was automatically raised. I need a couple of clicks to bring up the specific configuration of the check that caused the alert, but then I see the following:

![Alert configurations](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Monitoring-Reachable-Host-9.png)

So what the collector does is raise a critical alarm, if there are no average latency values (<code>nan </code>is the same as <code>null</code>).

You can see the exact configuration of all alerts in [/netdata/netdata/health/health.d/fping.conf](https://github.com/netdata/netdata/blob/master/health/health.d/fping.conf), or by going to your netdata config directory and running <code>/edit-config health.d/fping.conf</code>. One alert you may want to customize based on your use case is the latency one, and specifically the number of msec that would trigger the alert. The default is shown below and has values exceeding 500 ms (avg last 10sec) to go to warning and 1000ms to turn critical. That may either be too strict, or too loose for your use case.

```yaml
 template: fping_host_latency
 families: *
       on: fping.latency
    class: Latency
     type: Other
component: Network
   lookup: average -10s unaligned of average
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

So, if your hosts do permit ICMP requests, Netdata’s <em>fping</em> plugin has everything you need. But you still need to think about where you will be running such tests from. The obvious answer is to run them from a management node somewhere in your infrastructure. But, this is certainly not what your users will experience if your service is public. Ideally, you’d want to set up probes in many different places, depending on where your customers are. 

With Netdata, it’s very easy to do that very cheaply, as it can be configured to utilize very limited resources. So you could get very cheap nodes and run a Netdata agent on each one of them. You might not even want to store the collected metrics locally on those nodes, but stream those metrics to a parent Netdata node. A parent child setup is always a good idea for production deployments anyway, for data replication.

## Let us hear from you

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>.

Happy Troubleshooting!