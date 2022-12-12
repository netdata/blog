---
slug: postfix-monitoring
title: How to monitor and troubleshoot Postfix
description: Monitoring and troubleshooting Postfix.
authors: Netdata
tags: [how-to, monitor, troubleshoot, postfix,  mail server, mail delivery, smtp mail server, mail delivery, SMTP]
keywords: [how-to, monitor, troubleshoot, postfix,  mail server, mail delivery, smtp mail server, mail delivery, SMTP]
image: ![Postfix_logo](https://user-images.githubusercontent.com/24860547/207014316-b1f49ea0-5231-412a-bec2-edfb186e3a25.png)

---

Find out how to effectively and easily monitor and troubleshoot Postfix using Netdata

<!--truncate-->
## What is Postfix

Postfix is an open-source mail transfer agent (MTA). It is used for sending and receiving emails, and supports features such as mail routing, aliasing and forwarding. Postfix supports a wide range of protocols, is highly reliable and secure, and is easily configurable. It is suitable for deployments of any size, from small sites to large enterprises.

## Monitoring Postfix with Netdata

The prerequisites for monitoring Postfix with Netdata are to have Postfix and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for Postfix monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/postfix).

You should now see the Postfix section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What Postfix metrics are important to monitor?

### qemails
 - The <code>qemails</code> metric represents the number of emails currently in the queue in Postfix. This metric should be monitored to ensure that the queue is not growing too large, which can lead to delays in email delivery.
![image](https://user-images.githubusercontent.com/24860547/207016300-e26f91ec-d483-4b4f-a750-9c47f1d69e80.png)

### qsize
 - The <code>qsize</code> metric represents the total size of emails currently in the queue in Postfix. This metric should be monitored to ensure that the queue is not growing too large, which can lead to delays in email delivery.
![image](https://user-images.githubusercontent.com/24860547/207016351-86ac7034-0304-4f29-abff-8a3271101c01.png)

## Troubleshooting Postfix with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=postfix-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
