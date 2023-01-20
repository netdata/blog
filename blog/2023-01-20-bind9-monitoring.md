---
slug: bind9-monitoring
title: How to monitor and troubleshoot BIND 9
description: Monitoring and troubleshooting BIND 9.
authors: shyam
tags: [how-to, monitor, troubleshoot, bind9, isc,  dns-server, domain-name-server, DNS-management, remote-control]
keywords: [how-to, monitor, troubleshoot, bind9, isc,  dns-server, domain-name-server, DNS-management, remote-control]
image: https://user-images.githubusercontent.com/24860547/213658626-e7e6d84a-11d9-43ff-aa95-17d2486a4cc3.png

---

Find out how to effectively and easily monitor and troubleshoot BIND 9 using Netdata

<!--truncate-->
## What is BIND 9?

BIND 9 is a flexible, full-featured open source DNS system. 

## Monitoring BIND 9 with Netdata

The prerequisites for monitoring [BIND 9](https://www.isc.org/bind/) with Netdata are to have BIND and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for BIND 9 monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/bind).

You should now see the `bind` section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What BIND 9 metrics are important to monitor?

### Clients

**Recursive Clients**

Recursive Clients measures the number of clients who are making DNS queries to the BIND 9 DNS server. Normal value ranges for this metric will depend on the type of DNS server, the number of domains it is managing, and the number of clients making requests.

![image](https://user-images.githubusercontent.com/24860547/213658901-614c5024-2cc1-4880-9f2e-31b2e37f37ed.png)

### Requests

**Received Requests**

Received Requests monitors the number of requests that the DNS server has received from clients. By monitoring this metric, it is possible to detect spikes in the number of requests and identify any potential issues, such as an unusually large number of requests due to a distributed denial-of-service attack. It is also possible to detect any potential misconfigurations in the DNS server's settings, such as a low limit on the number of requests that can be handled, which can cause the server to become unresponsive. Normal values for this metric depend on the size of the network and the type of requests being made, but typically should range from tens to hundreds of requests per second.

![image](https://user-images.githubusercontent.com/24860547/213658985-88f41673-5925-4bfa-970d-ca3f6ecc82d2.png)

**Incoming Requests by OPCODE**

This chart measures the number of incoming DNS requests and organizes them by the type of request (OPCODE). Normal values for this metric will vary depending on the type of DNS server and its configuration. Generally, a majority of incoming requests should be QUERY requests, as they are used for name resolution. Other requests, such as UPDATE, NOTIFY and IXFR, should be present but in much lower numbers. Any significant deviation from the expected request ratios may indicate a problem and should be investigated.

![image](https://user-images.githubusercontent.com/24860547/213661152-de582345-2f2d-4197-8055-29202a57ad68.png)

**Incoming Requests by Query Type**

This chart shows the number of requests that the DNS server receives, broken down by the type of query. This metric can be used to identify any potential issues with the DNS server, such as if the server is overloaded with requests, if the server is being targeted by malicious actors, or if the server is being misconfigured. Knowing the breakdown of requests by query type can also be useful for performance tuning and optimization. 

Typical values for this metric can vary based on the specific use case, but typically the majority of requests are A and AAAA records, with a much smaller number of other types of requests.

![image](https://user-images.githubusercontent.com/24860547/213661394-7ca872af-58bd-4bc7-b28e-272693074b4d.png)

### Queries

**Successful Queries**

This chart measures the rate at which DNS queries are successfully answered. This metric is important to monitor because it indicates the response time of the DNS server and the overall health of the DNS system. Any decrease in the rate of successful queries may be indicative of a performance issue that should be investigated further. Additionally, if the rate of successful queries is too high, it could indicate a potential attack or malicious activity.

![image](https://user-images.githubusercontent.com/24860547/213659208-62b4b6c1-d08c-4275-bf1a-167ab266a989.png)

**Queries by IP Protocol**

This chart monitors the number of queries made to a DNS server by IP protocol.

![image](https://user-images.githubusercontent.com/24860547/213659273-c7394e4f-4ca9-435e-8fad-024f8225c328.png)

**Queries Analysis**

This chart provides a deeper dive analysis into queries. 

![image](https://user-images.githubusercontent.com/24860547/213659352-7c0878ee-c3a5-4840-ba2f-57194f4049fd.png)

- The AuthAns dimension measures the number of successful authoritive answers sent to the client. A high AuthAns value indicates that the server is responding quickly and accurately to queries.
- The NXDOMAIN dimension measures the number of queries that received an authoritative answer of “no such domain”. A high NXDOMAIN value may indicate a misconfigured DNS zone or incorrect DNS records.
- The NoAuthAns dimension measures the number of queries that received a non-authoritative answer. A high NoAuthAns value may indicate that the server is unable to find the necessary authoritative name servers for a given query.
- The Recursion dimension measures the number of queries that received a recursive response from the server. A high Recursion value may indicate that the client is performing inefficient or excessive DNS lookups.
- The Nxrset dimension measures the number of queries that received a non-existent domain (NXDOMAIN) response from the server. A high Nxrset value may indicate that the server is unable to find the necessary authoritative name servers for a given query.
- The Dropped dimension measures the number of queries that were dropped because the server was unable to respond in a timely manner. A high Dropped value may indicate an overloaded server or a network problem.
- The Duplicate dimension measures the number of queries that received a duplicate response from the server. A high Duplicate value may indicate that the server is caching responses incorrectly.
- The FORMERR dimension measures the number of queries that received a format error response from the server. A high FORMERR value may indicate that the server is receiving requests with an incorrect format.
- The Referral dimension measures the number of queries that received a referral (redirect) response from the server. A high Referral value may indicate that the server is sending requests to the wrong name server.
- The SERVFAIL dimension measures the number of queries that received a server failure response from the server. A high SERVFAIL value may indicate a problem with the server configuration or a network problem.

### Updates

**Received Updates**

Received Updates are metrics related to the performance of the BIND 9 DNS server. These metrics measure the number of updates that were received, accepted, rejected, forwarded, failed, or had a bad pre-requisite.

Monitoring these metrics is important because it gives insight into how the server is performing. It can indicate problems with the server configuration, availability of other DNS servers, or potential malicious activity. Knowing the number of rejected updates can help to pinpoint potential malicious activity. Keeping track of the number of forwarded updates can be useful for troubleshooting issues related to networking, such as if a server is unable to reach a remote DNS server.

Normal values would depend on the nature of the DNS traffic on the server, so it is recommended to establish baselines and alerting thresholds based on the observed traffic patterns.

![image](https://user-images.githubusercontent.com/24860547/213659413-5aaef273-a4dd-4957-9d6e-9d6c072c52ac.png)

### Failures

**Query Failures**

Query Failures are an indicator of the number of failed DNS queries per second. It is important to monitor this metric as it can show underlying DNS problems that may impact the reliability of the system. Some potential causes of Query Failures may include issues with server configuration, networking problems, DNS cache poisoning, and problems with DNS record updates. Generally, a low number of Query Failures per second is desired, and an increase in this metric can indicate a potential issue.

![image](https://user-images.githubusercontent.com/24860547/213659499-44b93ebc-311a-4a1b-9f28-7a440f12a313.png)

**Query Failure Analysis**

Query Failure Analysis is a metric that measures the number of queries that are rejected due to authentication or recursion failure. By monitoring this metric, you can identify any potential issues with the DNS server, such as misconfiguration, or a server that is being overloaded with requests. Additionally, it can be used to identify malicious activity, such as DDoS attempts that target your DNS server.

The AuthQryRej attribute measures the number of queries rejected due to authentication failures, while the RecQryRej attribute measures the number of queries rejected due to recursion failures. Typically, these values should be low, as any high values could indicate an issue with the DNS server or malicious activity.

![image](https://user-images.githubusercontent.com/24860547/213659563-55da9b28-43d2-41fa-ba2a-4845bb999f51.png)

### Statistics

**Server Statistics**

The Server Statistics attribute of ISC BIND 9 provides insight into the performance of the DNS server. It is important to monitor this metric because it will give visibility into the health of the DNS server and can help to identify any potential issues or bottlenecks. 

![image](https://user-images.githubusercontent.com/24860547/213659641-adeb7142-2b0a-45fb-ae00-dc5fc38bd267.png)

- DNS64: This is the number of DNS64 queries that the server has received. 
- ExpireOpt: This is the number of expired options that the server has received. 
- NSIDOpt: This is the number of NSID options that the server has received. 
- OtherOpt: This is the number of other options that the server has received.
- RPZRewrites: This is the number of RPZ rewrites that the server has performed. 
- RateDropped: This is the rate of dropped queries that the server has received. 
- RateSlipped: This is the rate of slipped queries that the server has received. 
- ReqBadEDNSVer: This is the number of bad EDNS version requests that the server has received. 
- ReqBadSIG: This is the number of bad SIG requests that the server has received. 
- ReqEdns0: This is the number of EDNS0 requests that the server has received. 
- ReqSIG0: This is the number of SIG0 requests that the server has received. 
- ReqTCP: This is the number of TCP requests that the server has received. 
- ReqTSIG: This is the number of TSIG requests that the server has received.
- RespEDNS0: This is the number of EDNS0 responses that the server has sent. 
- RespSIG0: This is the number of SIG0 responses that the server has sent. 
- RespTSIG: This is the number of TSIG responses that the server has sent. 
- Response: This is the number of responses that the server has sent. 
- SitBadSize: This is the number of bad size responses that the server has sent. 

## Troubleshooting BIND 9 with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=bind_rndc-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
