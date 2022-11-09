---
slug: apache-monitoring
title: Apache Monitoring
authors: shyam
tags: [how-to, monitor, troubleshoot, Apache, web server]
---
<!--truncate-->
## What is Apache?

The Apache HTTP Server (Apache HTTPd) is one of the most popular open source web server software available. HTTPd was also the first project developed by the Apache Software foundation which now supports hundreds of well known projects including Kafka, Cassandra and Hadoop. 

Netdata has a public loginless [demo space](https://app.netdata.cloud/spaces/netdata-demo) where you can explore different monitoring use-cases. Check out the <a href="https://app.netdata.cloud/spaces/netdata-demo/rooms/apache/overview#chartName=menu_apache">Apache demo room </a>to explore and interact with the charts and metrics described here.

## Monitoring Apache with Netdata

The pre-requisites for monitoring Apache with Netdata are to have one or more Apache web server running with [mod_status](https://httpd.apache.org/docs/2.4/mod/mod_status.html) enabled and of course that you have [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

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

![image](https://user-images.githubusercontent.com/24860547/200813379-b1d198c3-1f11-48e7-8251-e6f6191d4897.png)

### Connections

![image](https://user-images.githubusercontent.com/24860547/200813473-16a94cf1-860f-43de-914b-771b20c79916.png)


![image](https://user-images.githubusercontent.com/24860547/200813567-ae74d0e4-b8e6-443a-930e-49ddb2e11851.png)


![image](https://user-images.githubusercontent.com/24860547/200813628-53486c70-87d9-43ae-a690-6d3b3e473a02.png)


### Bandwidth

![image](https://user-images.githubusercontent.com/24860547/200813688-67011d91-2fd1-48ee-a492-bb7409609e06.png)


### Workers

![image](https://user-images.githubusercontent.com/24860547/200813751-b5c9d767-18ab-489c-9157-dfea041a7f12.png)


### Statistics

![image](https://user-images.githubusercontent.com/24860547/200813866-ca6c9161-6474-4be9-9684-2213b142b74c.png)

![image](https://user-images.githubusercontent.com/24860547/200813938-144584e5-30ee-4de5-b4a2-4b230b0f9992.png)

![image](https://user-images.githubusercontent.com/24860547/200814009-ddf8e625-d5f3-4d43-bae9-5da3edb85841.png)


### Availability

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
