---
slug: dnsmasq-monitoring
title: How to monitor and troubleshoot Dnsmasq DNS Forwarder
description: Achieve comprehensive Dnsmasq monitoring with Netdata, optimizing DNS and DHCP services for your IT infrastructure. Enhance your knowledge in our blog.
authors: satya
tags: [how-to, monitor, troubleshoot, dnsmasq,  dns, domain-name-server, DNS-management, dhcp, network-management]
keywords: [how-to, monitor, troubleshoot, dnsmasq,  dns, domain-name-server, DNS-management, dhcp, network-management]
image: https://user-images.githubusercontent.com/96257330/207541929-5857a8fe-393e-492f-bc24-410ca76f0d9b.png

---

Find out how to effectively and easily monitor and troubleshoot Dnsmasq DNS Forwarder using Netdata

![logo](https://user-images.githubusercontent.com/96257330/207541929-5857a8fe-393e-492f-bc24-410ca76f0d9b.png)

<!--truncate-->

## What is Dnsmasq?

[Dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html) is an open-source, lightweight, DNS caching and forwarding server. It is designed to provide DNS resolution for small and home networks. Dnsmasq provides local DNS caching, forwarding, and recursive lookups, as well as DHCP, TFTP, and other related services. It also has support for DNS and DHCPv6, as well as various other features such as DNS-over-TLS and IPv6 privacy extensions. Dnsmasq is a versatile and highly configurable tool that is simple to use.

You can find more details on [DHCP monitoring](https://blog.netdata.cloud/dnsmasq-dhcp-monitoring/) with Dnsmasq.

## Monitoring Dnsmasq with Netdata

The prerequisites for monitoring Dnsmasq with Netdata are to have Dnsmasq and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those services it doesn't discover, you can turn on manual discovery with a one line configuration. For more information on configuring Netdata for Dnsmasq monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/dnsmasq).

You should now see the dnsmasq section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What Dnsmasq metrics are important to monitor?

### servers_queries
 - The number of queries forwarded to the upstream server.
   - **failed** - Number of failed queries.
   - **success** - Number of successful queries. 

![Server Queries](https://user-images.githubusercontent.com/96257330/207544287-8a6a1a75-7d35-4210-9c62-b5267a968cec.png)


### cache_size
 - The DNS Cache size refers to the number of cached entries and can be configured for optimised performance.
   - **size** - Number of cached entries.

![Cache Size](https://user-images.githubusercontent.com/96257330/207544593-fa07ee42-10e5-4f0e-b7e7-59dc0ae77208.png)
 

### cache_operations
 - The cache operations rate.
   - **evictions** - Rate of cached entry evictions.
   - **Insertions** - Rate of cached entry insertions.

![Cache Operations](https://user-images.githubusercontent.com/96257330/207545216-e52db916-d7d6-4541-902e-e9c700547fb4.png)

### cache_performance
 - The rate of cache hits.
   - **hits** - Rate of cache hits
   - **misses** - Rate of cache misses

![Cache Performance](https://user-images.githubusercontent.com/96257330/207546243-fb76b8c1-8fea-4e44-a91d-057429c0b766.png)


## Troubleshooting Dnsmasq with Netdata

### Alerts
Netdata has built-in alerts to reduce the monitoring burden for you. 

If you would like to update the alert thresholds for any of these alerts or want to create your own alert for another metric – please follow the [instructions here](https://learn.netdata.cloud/docs/monitor/configure-alarms).

By default you will receive email notifications whenever an alert is triggered – if you would not like to receive these notifications you can turn them off from your profile settings.
### Anomaly Advisor
Anomaly Advisor lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

To learn more about how to use Anomaly Advisor to troubleshoot your Apache web server check out the [documentation](https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor) or visit the [anomalies tab](https://app.netdata.cloud/spaces/netdata-demo/rooms/apache/anomalies) in the demo space to play with it right now.
### Metric Correlations 
[Metric Correlations](https://learn.netdata.cloud/docs/cloud/insights/metric-correlations) lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

## Let us hear from you
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=dnsmasq-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
