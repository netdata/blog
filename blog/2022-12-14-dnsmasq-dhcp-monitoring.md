---
slug: dnsmasq-dhcp-monitoring
title: How to monitor and troubleshoot Dnsmasq for DHCP?
description: Monitoring and troubleshooting Dnsmasq for DHCP.
authors: satya
tags: [how-to, monitor, troubleshoot, dnsmasq,  dns, domain-name-server, DNS-management, dhcp, network-management]
keywords: [how-to, monitor, troubleshoot, dnsmasq,  dns, domain-name-server, DNS-management, dhcp, network-management]
image: https://user-images.githubusercontent.com/96257330/207592157-9ec046b1-2ad0-46b8-87d1-c3e91b7dbb35.png


---

Find out how to effectively and easily monitor and troubleshoot Dnsmasq for DHCP using Netdata

<!--truncate-->
## What is Dnsmasq for DHCP?

[Dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html) is an open-source, lightweight, DNS caching and forwarding server. It is designed to provide DNS resolution for small and home networks. Dnsmasq provides local DNS caching, forwarding, and recursive lookups, as well as DHCP, TFTP, and other related services. It also has support for DNS and DHCPv6, as well as various other features such as DNS-over-TLS and IPv6 privacy extensions. Dnsmasq is a versatile and highly configurable tool that is simple to use.
DNSMasq_DHCP is a feature of DNSMasq that provides a combined server to serve both DNS (Domain Name System) and DHCP (Dynamic Host Configuration Protocol) requests. It is a fast and lightweight DHCP server with support for both IPv4 and IPv6, and can be used to serve IP addresses to hosts on a LAN. DNSMasq_DHCP also offers features such as DNS and DHCP performance tuning, DHCP address range management, and support for multiple DNS domains.

This article specifically deals with monitoring dhcp. For more information on Dnsmasq, check [DNS monitoring](https://blog.netdata.cloud/dnsmasq-monitoring/).

## Monitoring Dnsmasq for DHCP with Netdata

The prerequisites for monitoring Dnsmasq for DHCP with Netdata are to have Dnsmasq DHCP and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for DnsmasqDHCP monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/dnsmasq_dhcp).

You should now see the **dnsmasq dhcp** section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What Dnsmasq DHCP metrics are important to monitor?

### dhcp_ranges
 - Number of DHCP ranges in the network.
   - **ipv4** - Number of DHCP ranges on IPV4.
   - **ipv6** - Number of DHCP ranges on IPV6 

### dhcp_hosts
 - Number of DHCP hosts in the network.
   - **ipv4** - Number of DHCP hosts on IPV4.
   - **ipv6** - Number of DHCP hosts on IPV6 

### dhcp_range_utilization
 - Utilisation of IP addresses in a DHCP range.
   - **used** - % of IP addresses utilised within the DHCP range.

![DHCP Range](https://user-images.githubusercontent.com/96257330/207595472-33e3ae55-611f-4134-9bd8-bc9450fd664e.png)

<details>
    <summary>This metric has a built-in alert. Expand to learn more</summary>

~~~

 template: dnsmasq_dhcp_dhcp_range_utilization
       on: dnsmasq_dhcp.dhcp_range_utilization
    class: Utilization
     type: DHCP
component: Dnsmasq
    every: 10s
    units: %
     calc: $used
     warn: $this > ( ($status >= $WARNING ) ? ( 80 ) : ( 90 ) )
     crit: $this > ( ($status == $CRITICAL) ? ( 90 ) : ( 95 ) )
    delay: down 5m
     info: DHCP range utilization
       to: sysadmin
~~~

</details>

### dhcp_range_allocated_leases
- Number of allocated DHCP leases.
  - **leases** - Number of allocated leases

![Allocated Leases](https://user-images.githubusercontent.com/96257330/207598743-0b18c9ae-eedd-44e8-9172-de0ae5bcec9c.png)

 
## Troubleshooting DnsmasqDHCP with Netdata

### Alerts
Netdata has built-in alerts to reduce the monitoring burden for you. 

If you would like to update the alert thresholds for any of these alerts or want to create your own alert for another metrics, please follow the [instructions here](https://learn.netdata.cloud/docs/monitor/configure-alarms).

By default, you will receive email notifications whenever an alert is triggered;if you would not like to receive these notifications you can turn them off from your profile settings.

### Anomaly Advisor
Anomaly Advisor lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

To learn more about how to use Anomaly Advisor to troubleshoot your Apache web server, check out the [documentation](https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor) or visit the [anomalies tab](https://app.netdata.cloud/spaces/netdata-demo/rooms/apache/anomalies) in the demo space to play with it right now.
### Metric Correlations 
[Metric Correlations](https://learn.netdata.cloud/docs/cloud/insights/metric-correlations) lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

## Let us hear from you
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=dnsmasq_dhcp-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
