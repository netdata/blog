---
slug: apache-monitoring
title: Apache Monitoring
description: "Best practices for Apache Server monitoring."
authors: shyam
tags: [how-to, monitor, troubleshoot, Apache, web server]
keywords: [how-to, monitor, troubleshoot, Apache, web server]
image: https://upload.wikimedia.org/wikipedia/commons/1/10/Apache_HTTP_server_logo_%282019-present%29.svg
---
<!--truncate-->
## What is Apache?

The Apache HTTP Server (Apache HTTPd) is one of the most popular open source web server software available. HTTPd was also the first project developed by the Apache Software foundation which now supports hundreds of well known projects including Kafka, Cassandra and Hadoop. 

Netdata has a public loginless [demo space](https://app.netdata.cloud/spaces/netdata-demo) where you can explore different monitoring use-cases. Check out the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/apache/overview#chartName=menu_apache">Apache demo room </a>to explore and interact with the charts and metrics described here.

## Monitoring Apache with Netdata

The prerequisites for monitoring Apache with Netdata are to have one or more Apache web server running with [mod_status](https://httpd.apache.org/docs/2.4/mod/mod_status.html) enabled and of course that you have [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

The only configuration you need to do is to add the web server's `server-status?auto`. Here is an example:

```yaml
jobs:
  - name: local
    url: http://127.0.0.1/server-status?auto
```
You should now see the Apache section on the Overview tab in Netdata Cloud that’s already populated with charts about all the metrics you care about!

For more information please read the Apache collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/apache).

## What Apache metrics are important to monitor - and why?

Netdata's Apache summary dashboard helps you get a quick grasp of how your web server is doing in a single glance. The current values for requests, connections, bandwidth and worker utilization are shown here by default and hovering over the time series charts will update the summary charts to reflect the values of these metrics at that point in time.

![image](https://user-images.githubusercontent.com/24860547/200812731-48b84d84-cc29-46ee-a4d2-9293b1cde007.png)

### Requests

The rate of requests received per second is an important metric to monitor. A sudden and substantial increase in the rate of requests is definitely worth digging deeper into. It could be indicative of, for example, a DoS (Denial of Service) attack. Even if the traffic is not malicious in nature you might still need to make changes to ensure your infrastructure is ready to handle the extra load. A significant decrease in the rate of requests could also point to problems that need troubleshooting.

![image](https://user-images.githubusercontent.com/24860547/200813379-b1d198c3-1f11-48e7-8251-e6f6191d4897.png)

### Connections

The total active connections that Apache is handling per second is indicated by the following chart.

![image](https://user-images.githubusercontent.com/24860547/200813473-16a94cf1-860f-43de-914b-771b20c79916.png)

While the asynchronous connections - along with information on what state they are currently in (Closing, Keep alive, Writing) are represented in a separate chart. This chart is only applicable to the Apache event MPM (Multi Processing Module).

![image](https://user-images.githubusercontent.com/24860547/200813567-ae74d0e4-b8e6-443a-930e-49ddb2e11851.png)

The Apache Scoreboard is a very useful chart if you are trying to troubleshoot issues with your web server. The traditional view of the scoreboard looks like this:

![image](https://user-images.githubusercontent.com/24860547/200816766-29a42d42-4979-4d76-b499-be6cc2dfbd09.png)

In Netdata, the scoreboard is represented as a helpful chart and you don't need to worry about remembering all of the acronyms. 

![image](https://user-images.githubusercontent.com/24860547/200813628-53486c70-87d9-43ae-a690-6d3b3e473a02.png)

- A scoreboard that displays a large amount of `sending` may indicate a poorly performing web application such as a PHP website. Combined with a large number of traffic spikes, it could be indicative of a DoS attack. 

- A large amount of `reading` on the other hand may indicate a [Slowloris](https://en.wikipedia.org/wiki/Slowloris_(computer_security)) attack, where many connections are opened and kept open for as long as possible.

- A lot of connections in a keep-alive state, may indicate that the server is getting many requests from clients that do not make subsequent requests (and therefore do not help you reap the intended benefits of keep-alive connections). 

### Bandwidth

The bandwidth handled by the Apache server (measured in megabits per second) is another important metric that helps you understand the [load](https://blog.netdata.cloud/server-load#what-is-server-load) your server is currently handling.

![image](https://user-images.githubusercontent.com/24860547/200813688-67011d91-2fd1-48ee-a492-bb7409609e06.png)

### Workers

Worker resources are important to monitor as this tells you which resources are over and under utilized. 

The worker threads chart represents worker utilization. 

A worker thread that is in any of the following states is considered busy: 
- reading
- writing
- keep-alive
- logging
- closing
- gracefully finishing

A worker thread not in any of the states mentioned above is considered idle. 

A consistently large number of idle workers (as seen in the example chart here) indicates that more threads are in use than are necessary for the current traffic levels and load. This will lead to unnecessary utilization of system resources and you may consider lowering the `MinSpareThreads` configuration parameter.

If however you only have a very small number of idle workers consistently this could lead to slowing down your server and requests getting queued up when the `MaxRequestWorkers` limit is hit. Increasing the `MaxRequestWorkers` can help with this scenario but be mindful that each extra worker thread requires extra system resources. 

![image](https://user-images.githubusercontent.com/24860547/200813751-b5c9d767-18ab-489c-9157-dfea041a7f12.png)


### Statistics

The statistics charts measure lifetime averages - averages of metrics over the lifetime of the Apache server being up and operational.

The first chart shows the lifetime average of requests per second - notice that this is significantly different from the first chart we mentioned (rate of requests). Occasional spikes and dips may not register on this lifetime average chart but it is still very useful for understanding longer term trends of resource utilization.

![image](https://user-images.githubusercontent.com/24860547/200813866-ca6c9161-6474-4be9-9684-2213b142b74c.png)

The next couple of charts show the lifetime average of, bytes served and response size. Both of these metrics can also be useful information to understand how the server is performing for the current use-case and is valuable in terms of designing potential upgrades to the server.

![image](https://user-images.githubusercontent.com/24860547/200813938-144584e5-30ee-4de5-b4a2-4b230b0f9992.png)
![image](https://user-images.githubusercontent.com/24860547/200814009-ddf8e625-d5f3-4d43-bae9-5da3edb85841.png)


### Availability (Uptime)

The uptime of the Apache server is monitored by this chart and helps you quickly get an idea if the server had any downtime.

![image](https://user-images.githubusercontent.com/24860547/200814062-5c2536d4-a264-407f-9686-2d642402334a.png)


## Troubleshooting Apache with Netdata

### Alerts

Netdata has a built-in health watchdog that comes with pre configured alerts to reduce the monitoring burden for you. 

If you would like to update the alert thresholds for any of these alerts or want to create your own alert for another metric – please follow the <a href="https://learn.netdata.cloud/docs/monitor/configure-alarms">instructions here</a>.

By default you will receive email notifications whenever an alert is triggered – if you would not like to receive these notifications you can turn them off from your profile settings.

### Anomaly Advisor

Anomaly Advisor lets you quickly identify if the system you are monitoring has any anomalies and allows you to drill down into which metrics are behaving anomalously.

To learn more about how to use Anomaly Advisor to troubleshoot your Apache web server check out the <a href="https://learn.netdata.cloud/docs/cloud/insights/anomaly-advisor">documentation </a>or visit the demo space.

### Metric Correlations

<a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations">Metric Correlations</a> lets you quickly find metrics and charts related to a particular window of interest that you want to explore further. By displaying the standard Netdata dashboard, filtered to show only charts that are relevant to the window of interest, you can get to the root cause sooner.

## Let us hear from you

If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=disk-usage)!

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
