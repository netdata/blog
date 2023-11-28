---
slug: dns-query-response-time
title: "How to monitor DNS query response time"
description: "Master DNS query response time monitoring with Netdata, ensuring fast and reliable name resolution for your infrastructure. Find out more in our blog."
image: /img/wp-archive/uploads/2022/10/DNS-1.png
tags: [how-to,infrastructure-monitoring,dns]
keywords: [netdata,how-to,infrastructure-monitoring]
authors: shyam
---
DNS (Domain Name System) servers translate standard language web addresses to their actual IP addresses for network access.

[**DNS Lookup Journey**](https://xiaolishen.medium.com/the-dns-lookup-journey-240e9a5d345c)
![](/img/wp-archive/uploads/2022/10/DNS-1.png)


<!--truncate-->

DNS response time is the time it takes a Domain Name Server to receive the request for a domain name’s IP address, process it, and return the IP address to the browser or application requesting it. When it comes to DNS response times, the lower the better, and generally values less than 100ms are considered to be in the acceptable range (depending on the application).

To understand how DNS response times affect the performance of your application it is important to monitor it continually along with other metrics of application and infrastructure performance. This will help you to correlate where the problem is triggered by DNS latency and where it isn't. 

DNS response times can be optimized by (among other things) choosing the right DNS provider. There are many factors which influence the response times of a particular DNS provider, such as the geographic location of the server or how much traffic it receives. The default DNS server in use may not always be the best choice. There are many DNS options available today offering free, fast and secure DNS services. 

Using Netdata you can quickly probe and compare DNS query response times across multiple DNS servers. Let's see how to do this using the primary DNS server IPs from 5 of the most popular DNS providers.

<ol>
 	<li>Google (8.8.8.8)</li>
 	<li>Cloudflare (1.1.1.1)</li>
 	<li>Quad9 (9.9.9.9)</li>
 	<li>OpenDNS (208.67.222.222)</li>
 	<li>AdGuard DNS (94.140.14.14)</li>
</ol>

As a prerequisite you need to sign up for a free <a href="https://app.netdata.cloud/">Netdata cloud account</a> and install the open source Netdata agent on the client from which you want to monitor DNS query response times. Then just go to the <a href="https://learn.netdata.cloud/docs/configure/nodes#the-netdata-config-directory">Netdata configuration directory</a> (usually `/etc/netdata`) and run `./edit-config go.d/dns_query.conf`. After entering the domains you want to use in your query and the DNS server IPs just <a href="https://learn.netdata.cloud/docs/configure/start-stop-restart">restart netdata</a> and the DNS query charts should be visible within seconds.

Here’s a sample configuration to monitor the query latency from the 5 DNS providers we mentioned previously. 

```yaml
update_every: 10
jobs:
 - name: latency
   record_types:
     - A
     - AAAA
   domains:
     - google.com
     - github.com
     - reddit.com
     - netdata.cloud
   servers:
     - 8.8.8.8
     - 9.9.9.9
     - 1.1.1.1
     - 208.67.222.222
     - 94.140.14.14
 ```

The DNS query response time should now be visible for monitoring on your Netdata overview tab. You can see the results in the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/dns-query/overview#chartName=menu_dns_query">Netdata Demo Space</a>. In this particular case you can see that most of the time the DNS response times stay within a 25ms to 75ms range but there are instances where the primary DNS from Quad9 (9.9.9.9) and AdGuard (94.140.14.14) spike significantly above 100ms. 

!["DNS Query Spike"](/img/wp-archive/uploads/2022/10/DNS-Query-Response-Time-2.png)

Monitoring these values over a longer period of time, and exercising finer grain control by choosing the base protocol (UDP or TCP or TLS) that you want the DNS probing to use or selecting the DNS record types (A, AAAA, TXT, CNAME, SRV etc.) to be used as per your use-case will allow you to maximize the value you get from DNS query response monitoring.

You can modify the <strong>Group by</strong> or <strong>Filtered by</strong> chart options to drill down into the view that helps you find what you need. 

You can compare how query times differ across different DNS record types, the example below shows A vs AAAA DNS query times. 

!["DNS Query 3"](/img/wp-archive/uploads/2022/10/DNS-Query-Respone-Time-3.png)

In addition to the query latency chart, there’s also a chart that gives you a quick idea if any of the DNS servers have failures. Network errors and DNS errors are called out separately.

!["DMS Response Time 4"](/img/wp-archive/uploads/2022/10/DNS-Query-Response-Time-4.png)

What if you want to be notified when the DNS response times are consistently above a threshold of your choosing? Well, you can define a <a href="https://learn.netdata.cloud/docs/monitor/configure-alarms">custom alert</a> to do exactly this. Here’s how you would define an alert to warn you if the average DNS query round trip time over the last 10 seconds exceeds 500ms and notify you with a critical alert if it exceeds 1 second.

```yaml
template: dns_query_time_query_time
       on: dns_query_time.query_time
    class: Latency
     type: DNS
component: DNS
    hosts: *
   lookup: average -10s unaligned foreach *
    units: ms
    every: 10s
     warn: $this &gt; 500
     crit: $this &gt; 1000
    delay: up 20s down 5m multiplier 1.5 max 1h
     info: average DNS query round trip time over the last 10 seconds
       to: sysadmin
```

If the conditions defined in the alert are triggered, you will be notified (for representational purposes in the below screenshot a critical alert was triggered at > 50ms) 

!["DNS Query Response Time"](/img/wp-archive/uploads/2022/10/DNS-Query-Response-Time-5.png)

If your monitoring use-case is different or more sophisticated such as monitoring a DNS server, the way to do this would be different. If you’re using <a href="https://coredns.io/">CoreDNS,</a> then Netdata <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/coredns">collects and visualizes 25+ metrics</a> that help you monitor the performance of your CoreDNS instances.

Happy Troubleshooting!
