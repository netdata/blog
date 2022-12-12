---
slug: coredns-monitoring
title: How to monitor and troubleshoot CoreDNS
description: Monitoring and troubleshooting CoreDNS.
authors: Netdata
tags: [how-to, monitor, troubleshoot, coredns,  dns server, domain name server, DNS management]
keywords: [how-to, monitor, troubleshoot, coredns,  dns server, domain name server, DNS management]
image:  

---

Find out how to effectively and easily monitor and troubleshoot CoreDNS using Netdata

<!--truncate-->
## What is CoreDNS

Coredns is an open source DNS server written in Go that is designed to be fast, secure, and modular. It supports all of the core features of a DNS server, including recursive lookups, forwarding, and caching. CoreDNS also offers features such as request rewriting and load balancing, as well as a plugin system to provide advanced features for custom deployments. CoreDNS provides high performance and scalability with support for low-latency and low-memory usage. It is secure by default, with support for DNSS

## Monitoring CoreDNS with Netdata

The prerequisites for monitoring CoreDNS with Netdata are to have CoreDNS and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for CoreDNS monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/coredns).

You should now see the CoreDNS section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What CoreDNS metrics are important to monitor?

### dns_request_count_total
 - The total number of DNS requests handled by CoreDNS. This can be useful for understanding overall system load and potential bottlenecks.


### dns_responses_count_total
 - The total number of DNS responses sent by CoreDNS. This can be useful for understanding overall system load and potential bottlenecks.

### dns_request_count_total_per_status
 - 

### dns_no_matching_zone_dropped_total
 - The total number of DNS requests dropped by CoreDNS because no matching zone was found. This can be useful for identifying potential configuration issues.

### dns_panic_count_total
 - The total number of panics that occurred in CoreDNS. This can be useful for identifying potential issues or bugs in the system.

### dns_requests_count_total_per_proto
 - 

### dns_requests_count_total_per_ip_family
 - 

### dns_requests_count_total_per_per_type
 - 

### dns_responses_count_total_per_rcode
 - 

### server_dns_request_count_total
 - 

### server_dns_responses_count_total
 - 

### server_dns_responses_count_total
 - 

### server_request_count_total_per_status
 - 

### server_requests_count_total_per_proto
 - 

### server_requests_count_total_per_ip_family
 - 

### server_requests_count_total_per_per_type
 - 

### server_responses_count_total_per_rcode
 - 

### zone_dns_request_count_total
 - 

### zone_dns_responses_count_total
 - 

### zone_dns_responses_count_total
 - 

### zone_requests_count_total_per_proto
 - 

### zone_requests_count_total_per_ip_family
 - 

### zone_requests_count_total_per_per_type
 - 

### zone_responses_count_total_per_rcode
 - 

## Troubleshooting CoreDNS with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=coredns-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
