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

### Requests

### Connections

### Bandwidth

### Workers

### Statistics

### Availability


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
