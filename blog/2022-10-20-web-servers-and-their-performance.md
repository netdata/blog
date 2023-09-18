---
slug: web-servers-and-their-performance
title: "How to monitor web servers and their performance"
description: "How to monitor web servers and their performance"
image: /img/wp-archive/uploads/2022/10/Web-Servers-2.png
tags: [how-to,infrastructure-monitoring,apache,nginx,web-servers]
keywords: [how-to,infrastructure-monitoring]
authors: satya
---

<!--truncate-->

## Why monitor Web servers?
Web servers are among the most important components in modern IT infrastructures. They host the websites, web services, and web applications that we use on a daily basis. Social networking, media streaming, software as a service (SaaS), and other activities wouldn’t be possible without the use of web servers. And with the advent of cloud computing and the movement of more services online, web servers and their monitoring are only becoming more important. Given the extensive usage of Web servers, Sysadmins and SREs should monitor web servers as a key aspect for performance. 

!["Working of Web Servers"](/img/wp-archive/uploads/2022/10/Web-Servers-2.png)

## What to monitor on Web Servers?
There are dozens of web servers, but the two most popular are Apache and NGINX. And irrespective of the web server in use, apart from the host metrics on which the web server is hosted like - <b><i>Uptime, CPU Usage, Memory Usage, Cache, Threads</i></b> etc - you will need to monitor metrics related to the Web server connections themselves and some of the more important ones are:
<ul>
 	<li><b>Request rate</b>: The number of requests that the server receives over time. High request rates could indicate a recent increase in traffic.</li>
 	<li><b>Response rate / Error codes: </b>The number of requests that the server is able to handle and respond over time and to monitor any errors in response.</li>
 	<li><b>Response time</b>: The time to send a response to a request. High response times could indicate problems with the web server, host, or website resources, and result in frustrated users.</li>
 	<li><b>Response size / Bandwidth</b>: The amount of data delivered with each response (typically measured in bytes). Smaller responses use less network bandwidth and load faster for users, especially over limited and mobile connections.</li>
 	<li><b>Active connections</b>: The number of requests currently being fulfilled. Too many active connections can exhaust the host’s available network ports, preventing new users from connecting.</li>
</ul>

## Web Server Log Collector in Netdata

Both Apache and NGINX report internal metrics via an HTML page. Apache has the mod_status module, and NGINX has the ngx_http_stub_status_module module. The Netdata plugins for <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/nginx">NGINX Monitoring</a> and <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/apache">Apache Monitoring</a> generate metrics and alerts from these pages. But if you can provide Netdata access to their log files, you can get even more insights via the generic <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/weblog">Web Server Log Monitoring</a> collector.

Once the collector is set up, it comes with default summary charts (which can be modified on the custom dashboards in the future) and gives a high level indication of how the web server(s) are performing.

!["Web Log"](/img/wp-archive/uploads/2022/10/Web-Servers-3.png)

<b>Request Rate: </b>Now, going into the individual metrics let us look at the most important ones and the rate of “requests” being handled by the Web servers determines the load and an indication of whether sufficient computing resources are allocated to the service if the cpu, memory, etc. are showing signs of exhaustion. 

!["Requests"](/img/wp-archive/uploads/2022/10/Web-Servers-4.png)

If you are monitoring multiple Web servers, you can further group by “instance” to see the requests being handled by each of your web servers. Now, the dimension names look funny. That’s because our front-end does some funky things to keep the length of each dimension within a certain width. When you hover over the chart, you see the fully expanded dimension names. 
!["requests 2"](/img/wp-archive/uploads/2022/10/Web-Servers-5.png)

<b>Response rate / Error Codes: </b>The next important metric to monitor is the “response” rate to compare if the request and response rates are in order. And in addition the error codes on responses will provide a good idea of any issues in serving the requests.

!["Response Rate"](/img/wp-archive/uploads/2022/10/Web-Servers-6.png)

<b>Response time and Response size: </b>In addition, monitoring the “request processing time” (response time) and “bandwidth” (response size) gives a realistic view of the web server's capability of serving multiple requests and can point to any latencies on specific web server instances.

!["timings"](/img/wp-archive/uploads/2022/10/Web-Servers-7.png)

!["bandwidth"](/img/wp-archive/uploads/2022/10/Web-Servers-8.png)

<b>Type of Requests</b>: In the world of web servers, it is also crucial to understand the types of requests and clients to allocate the necessary resources/networking.

!["client"](/img/wp-archive/uploads/2022/10/Web-Servers-9.png)
!["http method"](/img/wp-archive/uploads/2022/10/monitor-web-servers-1b.png)
!["ip proto"](/img/wp-archive/uploads/2022/10/Web-Servers-10.png)

The Web server log collector also comes with <a href="https://github.com/netdata/netdata/blob/master/health/health.d/web_log.conf">default alerts</a> which can be further customized to your infrastructure’s requirements. You can view all the active alerts and configured alerts on the <strong>Alerts</strong> tab.

!["web servers alerts"](/img/wp-archive/uploads/2022/10/Web-Servers-11.png)

For more information on configuring the <a href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/weblog">Web server log</a> Collector using Netdata and setting up <a href="https://learn.netdata.cloud/docs/monitor/configure-alarms">custom alerts</a> look into the enclosed links.

## Let us hear from you

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>.

Happy Troubleshooting!