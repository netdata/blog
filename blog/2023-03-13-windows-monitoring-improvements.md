---
slug: windows-monitoring-improvements
title: Windows Server Monitoring Improvements
description: Windows server monitoring improvements with Netdata
authors: shyam
tags: [real-time, monitor, troubleshoot, windows, server]
keywords: [real-time, monitor, troubleshoot, windows, server]
image: https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80

---

Monitor your Windows server and applications running on it with Netdata - simple, powerful and free.

<!--truncate-->

Hey Netdata community,

We have some exciting news for you: we’re launching our new and updated [Windows collectors](https://learn.netdata.cloud/docs/data-collection/monitor-anything/System%20Metrics/Windows-machines) with the goal of making the [Windows monitoring experience](https://www.netdata.cloud/windows-monitoring/) as seamless as possible 🎉

We know that Windows monitoring has been a long time ask from many of you, and we’ve been working hard to make it easier than ever to monitor your Windows metrics with Netdata.

![image](https://user-images.githubusercontent.com/24860547/224129332-22b6f7ad-5dcc-435d-9839-71dfd2195c09.png)

As you may know, we do not support a native Windows installation for Netdata agent, but we still wanted to make the monitoring experience as seamless as possible and ensure that Windows servers and applications are first-class citizens in the Netdata monitoring universe.
That’s why we’ve leveraged windows_exporter, a well-known exporter supported by the Prometheus community, and Netdata’s Windows collector to provide you with meaningful charts on your systems’ health metrics, including CPU, memory, disk utilization, network traffic, and more.

But that’s not all. Netdata also collects metrics from your packaged Windows applications such as [Active Directory](https://www.netdata.cloud/ad-monitoring/), [SQL Server](https://www.netdata.cloud/mssql-monitoring/), [Exchange Server](https://www.netdata.cloud/msexchange-monitoring/), [IIS](https://www.netdata.cloud/iis-monitoring/) and [.NET Framework](https://www.netdata.cloud/dotnet-monitoring/). 

Do check out our article on [how to effectively monitor Windows servers with Netdata](https://www.netdata.cloud/windows-monitoring/). It will help you easily set up Netdata to monitor your Windows server and applications and get insights into the performance and availability of your critical services.

Try out [Netdata Windows monitoring](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=website&utm_content=windows) today, we hope you find it usefu;. As always, we welcome your feedback and suggestions on how to improve it further.

Happy Troubleshooting! 😊
