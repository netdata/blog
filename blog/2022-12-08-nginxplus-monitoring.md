---
slug: nginxplus-monitoring
title: How to monitor and troubleshoot NGINXPlus
description: Monitoring and troubleshooting NGINXPlus.
authors: team
tags: [how-to, monitor, troubleshoot, nginxplus,  webserver, web service, http]
keywords: [how-to, monitor, troubleshoot, nginxplus,  webserver, web service, http]
image: https://user-images.githubusercontent.com/24860547/201311686-6cebbfbb-c611-4f71-ad5f-9da3c3fa5caa.png

---

Find out how to effectively and easily monitor and troubleshoot NGINXPlus using Netdata

<!--truncate-->
## What is NGINXPlus

Nginx Plus is an open source web server and load balancer. It is an enterprise-grade version of the popular open source Nginx web server, with additional features for scalability, performance, and monitoring. Nginx Plus includes features such as load balancing, content caching, and HTTP/2 support, and is suitable for applications of any size. Nginx Plus is highly customizable and can be used to deploy web applications in a variety of environments.

## Monitoring NGINXPlus with Netdata

The prerequisites for monitoring NGINXPlus with Netdata are to have NGINXPlus and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for NGINXPlus monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/nginxplus).

You should now see the NGINXPlus section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What NGINXPlus metrics are important to monitor?

### client_connections_rate
 - 
 Accepted and dropped (not handled) connections. A connection is considered <b>dropped</b> if the worker process is unable to get a connection for the request by establishing a new connection or reusing an open one.

### client_connections_count
 - 
 The current number of client connections. A connection is considered <b>idle</b> if there are currently no active requests.

### ssl_handshakes_rate
 - 
 Successful and failed SSL handshakes.

### ssl_session_reuses_rate
 - 
 The number of session reuses during SSL handshake.

### http_requests_rate
 - 
 The number of HTTP requests received from clients.

### http_requests_count
 - 
 The current number of client requests.

### uptime
 - 
 The time elapsed since the NGINX process was started.

### http_server_zone_requests_rate
 - 
 The number of requests to the HTTP Server Zone.

### http_server_zone_responses_per_code_class_rate
 - 
 The number of responses from the HTTP Server Zone. Responses grouped by HTTP status code class.

### http_server_zone_traffic_rate
 - 
 The amount of data transferred to and from the HTTP Server Zone.

### http_server_zone_requests_processing_count
 - 
 The number of client requests that are currently being processed by the HTTP Server Zone.

### http_server_zone_requests_discarded_rate
 - 
 The number of requests to the HTTP Server Zone completed without sending a response.

### http_location_zone_requests_rate
 - 
 The number of requests to the HTTP Location Zone.

### http_location_zone_responses_per_code_class_rate
 - 
 The number of responses from the HTTP Location Zone. Responses grouped by HTTP status code class.

### http_location_zone_traffic_rate
 - 
 The amount of data transferred to and from the HTTP Location Zone.

### http_location_zone_requests_discarded_rate
 - 
 The number of requests to the HTTP Location Zone completed without sending a response.

### http_upstream_peers_count
 - 
 The number of HTTP Upstream servers.

### http_upstream_zombies_count
 - 
 The current number of HTTP Upstream servers removed from the group but still processing active client requests.

### http_upstream_keepalive_count
 - 
 The current number of idle keepalive connections to the HTTP Upstream.

### http_upstream_server_requests_rate
 - 
 The number of client requests forwarded to the HTTP Upstream Server.

### http_upstream_server_responses_per_code_class_rate
 - 
 The number of responses received from the HTTP Upstream Server. Responses grouped by HTTP status code class.

### http_upstream_server_response_time
 - 
 The average time to get a complete response from the HTTP Upstream Server.

### http_upstream_server_response_header_time
 - 
 The average time to get a response header from the HTTP Upstream Server.

### http_upstream_server_traffic_rate
 - 
 The amount of traffic transferred to and from the HTTP Upstream Server.

### http_upstream_server_state
 - 
 The current state of the HTTP Upstream Server. Status active if set to 1.

### http_upstream_server_connections_count
 - 
 The current number of active connections to the HTTP Upstream Server.

### http_upstream_server_downtime
 - 
 The time the HTTP Upstream Server has spent in the <b>unavail</b>, <b>checking</b>, and <b>unhealthy</b> states.

### http_cache_state
 - 
 HTTP cache current state. <b>Cold</b> means that the cache loader process is still loading data from disk into the cache.

### http_cache_iops
 - 
 <p>HTTP cache IOPS.</p><p><b>Served</b> - valid, expired, and revalidated responses read from the cache. <b>Written</b> - miss, expired, and bypassed responses written to the cache. <b>Bypassed</b> - miss, expired, and bypass responses.</p>

### http_cache_io
 - 

 <p>HTTP cache IOPS.</p><p><b>Served</b> - valid, expired, and revalidated responses read from the cache. <b>Written</b> - miss, expired, and bypassed responses written to the cache. <b>Bypassed</b> - miss, expired, and bypass responses.</p>
 <p>HTTP cache IO.</p><p><b>Served</b> - valid, expired, and revalidated responses read from the cache. <b>Written</b> - miss, expired, and bypassed responses written to the cache. <b>Bypassed</b> - miss, expired, and bypass responses.</p>

### http_cache_size
 - 
 The current size of the cache.

### stream_server_zone_connections_rate
 - 
 The number of accepted connections to the Stream Server Zone.

### stream_server_zone_sessions_per_code_class_rate
 - 
 The number of completed sessions for the Stream Server Zone. Sessions grouped by status code class.

### stream_server_zone_traffic_rate
 - 
 The amount of data transferred to and from the Stream Server Zone.

### stream_server_zone_connections_processing_count
 - 
 The number of client connections to the Stream Server Zone that are currently being processed.

### stream_server_zone_connections_discarded_rate
 - 
 The number of connections to the Stream Server Zone completed without creating a session.

### stream_upstream_peers_count
 - 
 The number of Stream Upstream servers.

### stream_upstream_zombies_count
 - 
 The current number of HTTP Upstream servers removed from the group but still processing active client connections.

### stream_upstream_server_connections_rate
 - 
 The number of connections forwarded to the Stream Upstream Server.

### stream_upstream_server_traffic_rate
 - 
 The amount of traffic transferred to and from the Stream Upstream Server.

### stream_upstream_server_state
 - 
 The current state of the Stream Upstream Server. Status active if set to 1.

### stream_upstream_server_downtime
 - 
 The time the Stream Upstream Server has spent in the <b>unavail</b>, <b>checking</b>, and <b>unhealthy</b> states.

### stream_upstream_server_connections_count
 - 
 The current number of connections to the Stream Upstream Server.

### resolver_zone_requests_rate
 - 
 <p>Resolver zone DNS requests.</p><p><b>Name</b> - requests to resolve names to addresses. <b>Srv</b> - requests to resolve SRV records. <b>Addr</b> - requests to resolve addresses to names.</p>

### resolver_zone_responses_rate
 - 
 <p>Resolver zone DNS responses.</p><p><b>NoError</b> - successful responses. <b>FormErr</b> - format error responses. <b>ServFail</b> - server failure responses. <b>NXDomain</b> - host not found responses. <b>NotImp</b> - unimplemented responses. <b>Refused</b> - operation refused responses. <b>TimedOut</b> - timed out requests. <b>Unknown</b> - requests completed with an unknown error.</p>

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
