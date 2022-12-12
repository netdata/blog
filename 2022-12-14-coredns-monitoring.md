---
slug: coredns-monitoring
title: How to monitor and troubleshoot CoreDNS
description: Monitoring and troubleshooting CoreDNS.
authors: Netdata
tags: [how-to, monitor, troubleshoot, coredns,  dns server, domain name server, DNS management]
keywords: [how-to, monitor, troubleshoot, coredns,  dns server, domain name server, DNS management]
image:  ![download](https://user-images.githubusercontent.com/24860547/207034349-ee1bbed6-4c89-43ab-bd06-5a3daa0c2c6c.png)


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
![image](https://user-images.githubusercontent.com/24860547/207034333-c43ed338-a876-4146-ad0c-c2cd433b1f5c.png)

### dns_responses_count_total
 - The total number of DNS responses sent by CoreDNS. This can be useful for understanding overall system load and potential bottlenecks.
![image](https://user-images.githubusercontent.com/24860547/207034410-b03e16d9-a44a-4bcb-846e-6605ed2051de.png)

### dns_request_count_total_per_status
 - Number of processed and dropped DNS requests
![image](https://user-images.githubusercontent.com/24860547/207034456-e430228c-0bfa-4383-a885-23e9058c9ab1.png)

### dns_no_matching_zone_dropped_total
 - The total number of DNS requests dropped by CoreDNS because no matching zone was found. This can be useful for identifying potential configuration issues.
![image](https://user-images.githubusercontent.com/24860547/207034654-fbb986b6-67c8-4bdb-aba0-972b20fc6aa6.png)

### dns_panic_count_total
 - The total number of panics that occurred in CoreDNS. This can be useful for identifying potential issues or bugs in the system.
 ![image](https://user-images.githubusercontent.com/24860547/207034688-79828ea6-bf11-4140-8a03-cda0cfb0eb4c.png)

### dns_requests_count_total_per_proto
 - Number of DNS requests per transport protocol
![image](https://user-images.githubusercontent.com/24860547/207034779-1ac1fb6c-0d34-43d4-9e6d-83888d4e0b49.png)

### dns_requests_count_total_per_ip_family
 - Number of DNS requests per IP family
 ![image](https://user-images.githubusercontent.com/24860547/207034858-5f1a7e32-b699-4913-96d3-79ca4ad83ca9.png)

### dns_requests_count_total_per_per_type
 - Number of DNS requests per DNS message type
 ![image](https://user-images.githubusercontent.com/24860547/207034934-b3609b31-d8de-4c25-b282-365ed76f28b9.png)

### dns_responses_count_total_per_rcode
 - Number of DNS responses per Rcode
 ![image](https://user-images.githubusercontent.com/24860547/207034983-45e9711e-aa29-4c40-8a96-204db2c15329.png)

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
