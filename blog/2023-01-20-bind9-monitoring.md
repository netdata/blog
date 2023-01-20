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

**Global Recursive Clients**

![image](https://user-images.githubusercontent.com/24860547/213658901-614c5024-2cc1-4880-9f2e-31b2e37f37ed.png)

### Requests

**Global Received Requests**

![image](https://user-images.githubusercontent.com/24860547/213658985-88f41673-5925-4bfa-970d-ca3f6ecc82d2.png)


**Incoming Requests by OPCODE**

![image](https://user-images.githubusercontent.com/24860547/213659036-c35a6b25-c253-4b40-a271-e622bb6a3ff2.png)

**Incoming Requests by Query Type**

![image](https://user-images.githubusercontent.com/24860547/213659141-901ab285-a9b6-4da2-afb4-ff428769eabc.png)

### Queries

**Global Successful Queries**

![image](https://user-images.githubusercontent.com/24860547/213659208-62b4b6c1-d08c-4275-bf1a-167ab266a989.png)

**Global Queries by IP Protocol**

![image](https://user-images.githubusercontent.com/24860547/213659273-c7394e4f-4ca9-435e-8fad-024f8225c328.png)

**Global Queries Analysis**

![image](https://user-images.githubusercontent.com/24860547/213659352-7c0878ee-c3a5-4840-ba2f-57194f4049fd.png)

### Updates

**Gloabl Received Updates**

![image](https://user-images.githubusercontent.com/24860547/213659413-5aaef273-a4dd-4957-9d6e-9d6c072c52ac.png)


### Failures

**Global Query Failures**

![image](https://user-images.githubusercontent.com/24860547/213659499-44b93ebc-311a-4a1b-9f28-7a440f12a313.png)

**Global Query Failure Analysis**

![image](https://user-images.githubusercontent.com/24860547/213659563-55da9b28-43d2-41fa-ba2a-4845bb999f51.png)


### Statistics

**Global Server Statistics**

![image](https://user-images.githubusercontent.com/24860547/213659641-adeb7142-2b0a-45fb-ae00-dc5fc38bd267.png)


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
