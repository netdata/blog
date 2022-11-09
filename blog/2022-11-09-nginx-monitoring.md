---
slug: nginx-monitoring
title: "How to monitor NGINX web servers?"
description: "How to monitor NGINX web servers?"
image: https://user-images.githubusercontent.com/96257330/200813970-c1cb5be7-21ec-4365-8cfd-bef9545197f1.png
tags: [how-to,infrastructure-monitoring,nginx,web-servers]
keywords: [how-to,infrastructure-monitoring,nginx,web-servers]
authors: satya
---
Web servers are among the most important components in modern IT infrastructures. They host the websites, web services, and web applications that we use on a daily basis. Social networking, media streaming, software as a service (SaaS), and other activities wouldn’t be possible without the use of web servers. And with the advent of cloud computing and the movement of more services online, web servers and their monitoring are only becoming more important. Given the extensive usage of Web servers, Sysadmins and SREs should monitor web servers as a key aspect for performance. 

<!--truncate-->

## What is NGINX?

[NGINX](https://www.nginx.com/) (pronounced “engine X”) is a popular [HTTP server](https://en.wikipedia.org/wiki/Web_server) and [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) server. As an HTTP server, NGINX serves static content very efficiently and reliably, using relatively little memory. As a reverse proxy, it can be used as a single, controlled point of access for multiple back-end servers or for additional applications such as [caching](https://en.wikipedia.org/wiki/Web_cache) and [load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing)). NGINX is available as a free, open source product or in a more full-featured, commercially distributed version called NGINX Plus.

NGINX can also be used as a mail proxy and a generic TCP proxy, but this article addresses NGINX monitoring only as a web server.

Netdata has a public loginless [demo space](https://app.netdata.cloud/spaces/netdata-demo) where you can explore different monitoring use-cases. Check out the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/nginx/overview#chartName=menu_nginx">NGINX demo room </a>to explore and interact with the charts and metrics described here.


## Monitoring NGINX with Netdata

The prerequisites for monitoring NGINX with Netdata is to have one or more NGINX web servers configured with [ngx_http_stub_status_module].
The only configuration needed is to define the [url] to the server's [stub_status] in the go.d/nginx.conf file. For more details take a look at the [NGINX documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/nginx). 

```yaml
jobs:
  - name: local
    url: http://127.0.0.1/stub_status

  - name: remote
    url: http://203.0.113.10/stub_status
```

Once this is done, you should see the NGINX section on your Overview screen which will present the metrics listed below instantly.

## What to monitor on NGINX web servers?

By monitoring NGINX you can catch two categories of issues: resource issues within NGINX itself, and also problems developing elsewhere in your web infrastructure. Some of the metrics most NGINX users will benefit from monitoring include 
- **requests per second** - which provides a high-level view of combined end-user activity
- **server error rate** - which indicates how often your servers are failing to process valid requests and 
- **request processing time** - which describes how long your servers are taking to process client requests (and which can point to slowdowns or other problems in your environment).

## NGINX Activity metrics

Irrespective of the NGINX use case, you will always need to monitor how many client requests your servers are receiving and how those requests are being processed.
The connection requests can be monitored in multiple sub-categories:

- **Requests per second** - Which provides a high-level view of combined end-user activity and the required bandwidth.
![Requests per second](https://user-images.githubusercontent.com/96257330/200830717-e2df3c9d-c02b-4de5-9a29-685d5ac4a547.png)

- **Active Connections** - Which shows the currently active client connections and is an indication of the resource utilisation.
!["Active Connections"](https://user-images.githubusercontent.com/96257330/200822049-6aebe009-78bc-48c8-aa2a-83cd90174004.png)

- **Connection Status** - Which provides insights on what these connections are doing (**idle, reading, writing**)
!["Connection Status](https://user-images.githubusercontent.com/96257330/200822841-60d29358-3e08-4221-a283-6b6a07a1829f.png)

You can additionally group these metrics by instance to see how many connections are being handled per instance and in which state they are.
![Connection Status per Instance](https://user-images.githubusercontent.com/96257330/200823083-2a35da9f-f6fc-4199-8c64-78b9417d4702.png)


- **Accepted vs Handled Connections** - Which indicates if any connections are being dropped by calculating (**Accepted - Handled**) 
![Accepted vs Handled](https://user-images.githubusercontent.com/96257330/200823600-b4a0c2d3-c430-4f94-b6e8-8ac1b4f2252b.png)

You can also setup a custom alert to report any dropped connections on your NGINX.
For example, the alert shown below will raise a Warning alert if there are 10-20% dropped connections and a Critical alert when the dropped connections go beyond 20%.

```yaml
  template: NGINX_Dropped_Connections_Exceeded
        on: nginx.connections_accepted_handled
     class: Utilization
      type: NGINX
 component: NGINX
      calc: (($accepted - $handled) * 100) / ($accepted)
     every: 1m
     units: %
      warn: $this > (($status >= $WARNING)  ? (10) : (20))
      crit: $this > (($status == $CRITICAL) ? (20) : (30))
     delay: down 15m multiplier 1.5 max 1h
      info: The NGINX web server has exceeded the limit of dropped connections
```
## NGINX Error Metrics

NGINX error metrics tell you how often your servers are returning errors instead of producing useful work. Client errors are represented by [4xx status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors), server errors with [5xx status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_server_errors).
Although open source NGINX does not make error rates immediately available for monitoring, you can configure NGINX’s log module to write response codes in the access log. More details on this are available on a related blog [How to monitor web servers and their performance?](https://blog.netdata.cloud/web-servers-and-their-performance/)

## NGINX Performance Metrics

The request time metric logged by NGINX records the processing time for each request, from the reading of the first client bytes to fulfilling the request. Long response times can point to problems upstream.
Although open source NGINX does not make performance metrics immediately available for monitoring, you can configure NGINX’s log module to write request processing times in the access log. More details on this are available on a related blog [How to monitor web servers and their performance?](https://blog.netdata.cloud/web-servers-and-their-performance/)


## Let us hear from you

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>.

Happy Troubleshooting!
