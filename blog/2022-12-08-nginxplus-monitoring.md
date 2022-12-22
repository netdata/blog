---
slug: nginxplus-monitoring
title: How to monitor and troubleshoot NGINXPlus
description: Monitoring and troubleshooting NGINXPlus.
authors: satya
tags: [how-to, troubleshoot, nginx, nginxplus,  webservers, infrastructure-monitoring, http]
keywords: [how-to, troubleshoot, nginx, nginxplus,  webservers, infrastructure-monitoring, http]
image: https://user-images.githubusercontent.com/96257330/206474388-31f12c9a-4be5-4d0a-9fc2-a8d80813000a.png

---

As a continuation of our series for monitoring web servers with [NGINX](https://blog.netdata.cloud/nginx-monitoring/) and [APACHE](https://blog.netdata.cloud/apache-monitoring/), let us find out how to effectively and easily monitor and troubleshoot NGINXPlus using Netdata!

<!--truncate-->
## What is NGINXPlus

Nginx Plus is an open source web server and load balancer. It is an enterprise-grade version of the popular open source Nginx web server, with additional features for scalability, performance, and monitoring. Nginx Plus includes features such as load balancing, content caching, and HTTP/2 support, and is suitable for applications of any size. Nginx Plus is highly customizable and can be used to deploy web applications in a variety of environments.

## Monitoring NGINXPlus with Netdata

The prerequisites for monitoring NGINXPlus with Netdata are to have NGINXPlus and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't, turning on manual discovery is a one line configuration. For more information on configuring Netdata for NGINXPlus monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/nginxplus).

You should now see the NGINXPlus section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What NGINXPlus metrics are important to monitor?


The metrics that Netdata collects are organized into subsections within the nginxplus section for easier navigation. Each metric is represented by a composite chart that aggregates the data across multiple nodes/instances etc.

Below, you can find a brief description of the NGINXPlus metrics being collected and visualised on Netdata:

### client_connections_rate
 - Accepted and dropped (not handled) connections. A connection is considered <b>dropped</b> if the worker process is unable to get a connection for the request by establishing a new connection or reusing an open one.

![Client Connections rate](https://user-images.githubusercontent.com/96257330/209156074-df648952-6653-4ea4-8e41-676b8721ae6a.png)

### client_connections_count
 - The current number of client connections. A connection is considered <b>idle</b> if there are currently no active requests.
 
![Client Connections Count](https://user-images.githubusercontent.com/96257330/209157152-81830255-e9c8-45e0-a039-99d6650e5363.png)


### ssl_handshakes_rate
 - Successful and failed SSL handshakes.

![SSL Handshakes Rate](https://user-images.githubusercontent.com/96257330/209164459-2d004856-22f2-420d-b809-3cc6dcd93bb2.png)

### ssl_session_reuses_rate
 - The number of session reuses during SSL handshake.

![SSL Session Reuse Rate](https://user-images.githubusercontent.com/96257330/209164668-df89c25a-a022-47e7-a3ce-caaf7bcea236.png)

### http_requests_rate
 - The number of HTTP requests received from clients.

![HTTP Requests Rate](https://user-images.githubusercontent.com/96257330/209164790-d036d49c-332b-497a-8b07-d85c2330bc6b.png)

### http_requests_count
 - The current number of client requests.

![HTTP Requests Count](https://user-images.githubusercontent.com/96257330/209164953-92c69539-7f05-4341-9608-d0d86efaf21a.png)

### http_server_zone_requests_rate
 - The number of requests to the HTTP Server Zone.

![HTTP Server Zone Requests Rate](https://user-images.githubusercontent.com/96257330/209165590-25091619-738a-41a6-8a47-f69830dc241d.png)

### http_server_zone_responses_per_code_class_rate
 - The number of responses from the HTTP Server Zone. Responses grouped by HTTP status code class.

![HTTP Server Zone Responses](https://user-images.githubusercontent.com/96257330/209180908-2ee469c6-691f-403e-b971-1fce4c44eaba.png)

### http_server_zone_traffic_rate
 - The amount of data transferred to and from the HTTP Server Zone.

![HTTP Server Zone Traffic Rate](https://user-images.githubusercontent.com/96257330/209181659-f98eb5c1-95c9-4dd9-b5f7-05cf20a1983c.png)

### http_server_zone_requests_processing_count
 - The number of client requests that are currently being processed by the HTTP Server Zone.

![HTTP Zone Requests Processing Count](https://user-images.githubusercontent.com/96257330/209166061-1eac468d-2f2a-4a79-81ef-c7779da02526.png)

### http_server_zone_requests_discarded_rate
 - The number of requests to the HTTP Server Zone completed without sending a response.

![HTTP Zone requests discarded rate](https://user-images.githubusercontent.com/96257330/209166286-f20acd1d-11de-4608-9be3-33cdcc5184f5.png)

### http_location_zone_requests_rate
 - The number of requests to the HTTP Location Zone.

![HTTP Location Zone Requests Rate](https://user-images.githubusercontent.com/96257330/209165791-09e6a336-5755-4798-a545-cf145af989ea.png)

### http_location_zone_responses_per_code_class_rate
 - The number of responses from the HTTP Location Zone. Responses grouped by HTTP status code class.

![HTTP Location Zone Responses](https://user-images.githubusercontent.com/96257330/209181182-57f6cce3-e755-4137-858d-61a73b406f13.png)

### http_location_zone_traffic_rate
 - The amount of data transferred to and from the HTTP Location Zone.

![HTTP Location Zone Traffic Rate](https://user-images.githubusercontent.com/96257330/209182303-e603eb92-c4a6-430e-9e93-e2fa2bd179e6.png)

### http_location_zone_requests_discarded_rate
 - The number of requests to the HTTP Location Zone completed without sending a response.

![HTTP Location Zone Discarded Rate](https://user-images.githubusercontent.com/96257330/209180678-cb81e4c7-f9ea-4f61-996a-f5364981b99a.png)

### http_upstream_peers_count
 - The number of HTTP Upstream servers.

![HTTP Upstream Peers Count](https://user-images.githubusercontent.com/96257330/209182967-527597b1-e420-48c2-932b-1eb557caae9c.png)

### http_upstream_zombies_count
 - The current number of HTTP Upstream servers removed from the group but still processing active client requests.

![HTTP Upstream Zombies Count](https://user-images.githubusercontent.com/96257330/209183458-04bf7db9-47c2-46e1-974d-5a8c5e11f33c.png)

### http_upstream_keepalive_count
 - The current number of idle keepalive connections to the HTTP Upstream.

![HTTP Upstream Keepalive Count](https://user-images.githubusercontent.com/96257330/209183915-3bb20141-df43-4e4f-9576-5d13f4a1f1a9.png)

### http_upstream_server_requests_rate
 - The number of client requests forwarded to the HTTP Upstream Server.

![Upstream Server Requests Rate](https://user-images.githubusercontent.com/96257330/209185196-75773ad9-142e-4536-9a3a-3274a64df730.png)

### http_upstream_server_responses_per_code_class_rate
 - The number of responses received from the HTTP Upstream Server. Responses grouped by HTTP status code class.

![Upstream Server Responses Rate](https://user-images.githubusercontent.com/96257330/209185354-bfededab-c537-49f6-bc08-d96951a07f52.png)

### http_upstream_server_response_time
 - The average time to get a complete response from the HTTP Upstream Server.

![Upstream Server Response Time](https://user-images.githubusercontent.com/96257330/209185512-3ea5b412-fdf6-49a1-a73f-014a933d42c6.png)

### http_upstream_server_response_header_time
 - The average time to get a response header from the HTTP Upstream Server.

![Upstream Server Response Header time](https://user-images.githubusercontent.com/96257330/209185807-9652810f-2d1a-459c-9dd9-117da2dec908.png)

### http_upstream_server_traffic_rate
 - The amount of traffic transferred to and from the HTTP Upstream Server.

![Upstream Server Traffic Rate](https://user-images.githubusercontent.com/96257330/209186007-2d092d30-579c-4044-98ff-3383f6596241.png)

### http_upstream_server_state
 - The current state of the HTTP Upstream Server. Status active if set to 1.

![Upstream Server State](https://user-images.githubusercontent.com/96257330/209184693-b3d4e91e-8bf6-44e4-92b0-5664e0ee59d8.png)

### http_upstream_server_connections_count
 - The current number of active connections to the HTTP Upstream Server.

![Upstream Server Connections Count](https://user-images.githubusercontent.com/96257330/209185070-578a4893-a1ac-499e-8586-96de7c904121.png)

### http_upstream_server_downtime
 - The time the HTTP Upstream Server has spent in the <b>unavail</b>, <b>checking</b>, and <b>unhealthy</b> states.

![Upstream Server Downtime](https://user-images.githubusercontent.com/96257330/209184938-bc77e145-e763-4565-ab97-fc9a2bb7ecc2.png)

### http_cache_state
 - HTTP cache current state. <b>Cold</b> means that the cache loader process is still loading data from disk into the cache.

![HTTP Cache State](https://user-images.githubusercontent.com/96257330/209186133-c9fe8ce5-0fab-441c-a3d1-55d6dfc2adb6.png)

### http_cache_iops
 - HTTP cache IOPS in responses per second.
   - Served - valid, expired, and revalidated responses read from the cache. 
   - Written - miss, expired, and bypassed responses written to the cache. 
   - Bypassed - miss, expired, and bypass responses.

![HTTP Cache IOPS](https://user-images.githubusercontent.com/96257330/209186239-541de5e4-cfe5-4889-ba18-83a8c68a5042.png)

### http_cache_io
 - HTTP cache IO in bytes per second.
   - Served - valid, expired, and revalidated responses read from the cache. 
   - Written - miss, expired, and bypassed responses written to the cache. 
   - Bypassed - miss, expired, and bypass responses.

![HTTP Cache IO](https://user-images.githubusercontent.com/96257330/209186364-903cac37-3936-4ee4-9cd0-4830e20e61b1.png)

### http_cache_size
 - The current size of the cache.

![HTTP Cache Size](https://user-images.githubusercontent.com/96257330/209186495-0cabe7b8-eb29-4f89-8c4d-3d37bd8808df.png)

### stream_server_zone_connections_rate
 - The number of accepted connections to the Stream Server Zone.

![Stream Server Zone Connections Rate](https://user-images.githubusercontent.com/96257330/209186687-80d81087-8d9b-486c-9faa-3e66b70d78db.png)

### stream_server_zone_sessions_per_code_class_rate
 - The number of completed sessions for the Stream Server Zone. Sessions grouped by status code class.

![Stream Server Sessions Rate](https://user-images.githubusercontent.com/96257330/209187170-19d8692d-41a3-491e-ba78-e48a99090f23.png)

### stream_server_zone_traffic_rate
 - The amount of data transferred to and from the Stream Server Zone.

![Stream Server Zone Traffic Rate](https://user-images.githubusercontent.com/96257330/209187305-959c1db5-01e7-4224-837a-6620c85a76aa.png)

### stream_server_zone_connections_processing_count
 - The number of client connections to the Stream Server Zone that are currently being processed.

![Stream Server Zone Connections Processing Count](https://user-images.githubusercontent.com/96257330/209186830-f926886b-1ada-496f-aef2-3c8364b28b5a.png)

### stream_server_zone_connections_discarded_rate
 - The number of connections to the Stream Server Zone completed without creating a session.

![Stream Server Zone Connections Discarded Rate](https://user-images.githubusercontent.com/96257330/209187018-3ab27d58-e9b0-4962-82f3-6cbd61a42345.png)

### stream_upstream_peers_count
 - The number of Stream Upstream servers.

![Stream Upstream Peers Count](https://user-images.githubusercontent.com/96257330/209187408-8cc716dc-a287-4b02-98e0-9f9b2cc51e9b.png)

### stream_upstream_zombies_count
 - The current number of HTTP Upstream servers removed from the group but still processing active client connections.

![Stream Upstream Zombies Count](https://user-images.githubusercontent.com/96257330/209187528-69344994-e6ec-468c-b0dc-5f2ce2d83869.png)

### stream_upstream_server_connections_rate
 - The number of connections forwarded to the Stream Upstream Server.

![Stream Upstream Server Connections Rate](https://user-images.githubusercontent.com/96257330/209187909-a28479e8-d699-457f-bea3-b8bc41be52a2.png)

### stream_upstream_server_traffic_rate
 - The amount of traffic transferred to and from the Stream Upstream Server.

![Stream Upstream Server Traffic Rate](https://user-images.githubusercontent.com/96257330/209188205-79d7caec-5631-49c0-b83f-b9d935acc9de.png)


### stream_upstream_server_state
 - The current state of the Stream Upstream Server. Status active if set to 1.

![Stream Upstream Server State](https://user-images.githubusercontent.com/96257330/209187636-ce8f9f58-c348-4186-9171-508e45cb82f2.png)

### stream_upstream_server_downtime
 - The time the Stream Upstream Server has spent in the <b>unavail</b>, <b>checking</b>, and <b>unhealthy</b> states.

![Stream Upstream Server Downtime](https://user-images.githubusercontent.com/96257330/209187746-9a19f4c3-2ca7-45c0-a045-453448b92fb6.png)

### stream_upstream_server_connections_count
 - The current number of connections to the Stream Upstream Server.

![Stream Upstream Server Connections Count](https://user-images.githubusercontent.com/96257330/209188053-348a29ba-2ab0-427b-b4fa-d82ec14b4a04.png)

### resolver_zone_requests_rate
 - Resolver zone DNS requests.
   - Name - requests to resolve names to addresses. 
   - Srv - requests to resolve SRV records. 
   - Addr - requests to resolve addresses to names.

![Resolver Zone Requests Rate](https://user-images.githubusercontent.com/96257330/209188457-efb65035-56ab-4d17-b495-99defbadbdef.png)

### resolver_zone_responses_rate
 - Resolver zone DNS responses.
   - NoError - successful responses. 
   - FormErr - format error responses. 
   - ServFail - server failure responses. 
   - NXDomain - host not found responses. 
   - NotImp - unimplemented responses. 
   - Refused - operation refused responses. 
   - TimedOut - timed out requests. 
   - Unknown - requests completed with an unknown error.

![Resolver Zone Responses Rate](https://user-images.githubusercontent.com/96257330/209188577-5580b4ae-b1c2-4206-89ec-5696ec68db4b.png)


### uptime
 - The time elapsed since the NGINX process was started.

![Uptime](https://user-images.githubusercontent.com/96257330/209165252-e85ecc82-e5ef-448c-9e09-9815fead6736.png)

## Troubleshooting NGINXPlus with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=nginxplus-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
