---
slug: smartd_log-monitoring
title: How to monitor and troubleshoot S.M.A.R.T. attributes
description: Monitoring and troubleshooting S.M.A.R.T. attributes.
authors: shyam
tags: [how-to, monitor, troubleshoot, smartd_log, S.M.A.R.T, storage-device, ATA, SCSI]
keywords: [how-to, monitor, troubleshoot, smartd_log, S.M.A.R.T, storage-device, ATA, SCSI]
image: https://uxd.zendesk.com/hc/article_attachments/360024098631/mceclip1.png

---

Understand what makes a storage device S.M.A.R.T and how to monitor a self monitoring component using Netdata.

<!--truncate-->
## What makes a storage device S.M.A.R.T.? 

[S.M.A.R.T.](https://en.wikipedia.org/wiki/Self-Monitoring,_Analysis_and_Reporting_Technology) (Self-Monitoring, Analysis, and Reporting Technology) is a supplementary component built into many modern storage devices through which devices monitor, store, and analyze the health of their operation. Statistics are collected (temperature, number of reallocated sectors, seek errors etc.) which software can use to measure the health of a device, predict possible device failure, and provide notifications on unsafe values. 

When S.M.A.R.T. data indicates a possible imminent drive failure, software running on the host system may notify the user so preventive action can be taken to prevent data loss, and the failing drive can be replaced and data integrity maintained.

[smartd](https://linux.die.net/man/8/smartd) is a daemon that monitors the S.M.A.R.T. system built into many ATA-3 and later ATA, IDE and SCSI-3 hard drives. 

## Monitoring S.M.A.R.T. attributes with Netdata

Let's start with getting [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system, if it isn't already. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for S.M.A.R.T. monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/smartd_log).

You should now see the `smartd_log` section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What S.M.A.R.T. attributes are important to monitor?

Depending on whether your storage device is SCSI based or ATA based the metrics that Netdata collects and the charts displayed will vary. 

In this blog, we will be focusing on a monitoring an ATA hard drive. But for more information and what metrics can be monitored on SCSI hard drives please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/smartd_log).

### Errors

**Read Error Rate**
The rate of hardware read errors that occur when the drive attempts to read data from the disk. This is an important metric to monitor as it can be used to detect and prevent potential hard drive failures; if the read error rate is high, it may be a sign that the drive is failing.

![image](https://user-images.githubusercontent.com/24860547/213448843-fc983c43-2f5f-4fa4-b5df-70c8250f8f16.png)

**Seek Error Rate**
The number of errors that occurred while the hard drive was seeking a certain sector on the disk.  A high Seek Error Rate typically indicates a failing or weak drive, and can be an early warning sign of impending hardware failure. Normal values for Seek Error Rate should be 0, so any value higher than 0 should be investigated.
![image](https://user-images.githubusercontent.com/24860547/213449174-8c9df5fa-84d5-449d-a975-87a6a61338f1.png)

**Soft Read Error Rate**
Soft read errors occur when the drive is unable to read data from a sector, but is able to successfully recover from the error after retries. Soft read errors are generally not as severe as hard read errors, as the drive is able to recover from the error. A small number of these errors might be caused by minor electrical glitches and is no direct cause for worry as long as it is transient in nature.

**Write Error Rate**
The number of data write errors that occur per second on a hard disk drive.

### External Failures

**UDMA CRC Error Count**
The UDMA CRC Error Count is an S.M.A.R.T attribute, which measures the number of errors that occur during the transfer of data between the hard drive and the host device. It is a metric of the integrity of the data being transferred and is an important indicator of the health of the hard drive.

![image](https://user-images.githubusercontent.com/24860547/213449271-7e81a270-d948-4477-9e16-8954167a6d3e.png)

**SATA Interface Downshift**
SATA Interface Downshift is a S.M.A.R.T attribute that measures the number of times a SATA interface has downshifted its speed to a lower data transfer rate. This metric is important to monitor as it indicates that the SATA interface is being throttled, which can lead to degraded performance and latency.

### Performance

**Throughput Performance**
Throughput Performance is a S.M.A.R.T. attribute that measures the rate of data transfer in a given period of time. It can be indicative of a number of problems within a system, such as potential bottlenecks in the system architecture or a faulty hardware component. 

![image](https://user-images.githubusercontent.com/24860547/213449426-6626c246-f5c7-406c-b599-a1088a71efdd.png)

**Seek Time Performance**
Measures the time it takes for a disk drive to move the read/write head from one point to another. It is an important metric for monitoring the performance of storage devices as it affects the overall speed and responsiveness of the hardware. Poor Seek Time Performance can cause delays in data retrieval, resulting in slower application performance and degraded user experience. Monitoring this attribute can help identify and prevent issues that could lead to application or system slowdowns. 

![image](https://user-images.githubusercontent.com/24860547/213449560-400cd2c2-9774-4b04-91c8-4bb844891da8.png)

### Power

**Start/Stop Count**
The number of times a device has been powered on and off.

![image](https://user-images.githubusercontent.com/24860547/213449658-a0e6001b-74d7-457e-a5bb-0dc96f0f9055.png)

**Power-on Hours**
This attribute tracks how many hours the device has been powered on.

![image](https://user-images.githubusercontent.com/24860547/213449752-ef9736fa-637c-45b6-a1cb-52ae648d078a.png)

**Power Cycles**
Tracks the number of times a device has been power cycled.

![image](https://user-images.githubusercontent.com/24860547/213449871-ed620ff5-1817-43dc-8ba9-2e0b3c2d4cb0.png)

**Unexpected Power Loss**
Tracks the number of times a device has been unexpectedly powered off.

### Spin

**Spin-up Time**
This attribute measures the time it takes for the disk drive to spin up from a powered-down state to a fully operational state. 

![image](https://user-images.githubusercontent.com/24860547/213449949-3fda6b25-b18f-4784-a6e0-cd46db037f68.png)

**Spin-up Retries**
Spin-up retries are a S.M.A.R.T attribute that measures the number of times the hard drive has attempted to spin up and failed. If the number of retries is over 5, it could be an indication of a problem and should be investigated further.

![image](https://user-images.githubusercontent.com/24860547/213449985-8d928101-4b97-4ca0-9c77-6120b3fff989.png)

**Calibration Retries**
Calibration Retries is a S.M.A.R.T attribute that measures the number of times a hard disk drive has attempted to recalibrate its read/write heads. It is generally observed that the higher the number of retries, the lower the overall reliability of the hard disk drive. This is because the more retries that are needed, the more degraded the performance of the hard disk drive becomes.


### Temperature
Temperature is an important metric to monitor and observe when it comes to S.M.A.R.T. attributes. Temperature is related to the cooling system, which is vital to the health and longevity of the system. If the temperature of the system gets too high, it can cause significant problems such as decreased performance, hardware damage and even system failure.

Normal temperature ranges for a system depend on what type of hardware is being used, but generally speaking, as long as the temperature does not exceed 70 degrees Celsius (158 Fahrenheit) for extended periods of time, it should be considered safe. It is important to monitor temperature regularly to ensure that it does not increase to unsafe levels, and if it does, take measures to cool the system down.

![image](https://user-images.githubusercontent.com/24860547/213450065-f7d71ab7-251f-4df8-ba9f-a7d53145b40e.png)

### Wear

The hard drives we are monitoring in this example is in pretty good state and has not had to deal with wear - so the charts you'll see here are empty, but if you do have an older hard drive these charts will be very interesting to monitor.

**Reallocated Sectors**
Reallocated Sectors (also known as reallocated sector count) is a S.M.A.R.T attribute that measures the number of sectors on a hard drive that have been reallocated due to bad sectors. Reallocated sectors can occur due to physical damage to the drive, or due to a bad controller or deteriorating media.

![image](https://user-images.githubusercontent.com/24860547/213450142-3b46f5a0-9c02-4cc8-bf8d-08bff56a69c3.png)

**Reallocation Events**
Measures the number of reallocation events that have occurred. 

![image](https://user-images.githubusercontent.com/24860547/213450207-e92790d6-407b-4d23-969a-42eded40da5d.png)

**Current Pending Sectors**
Attribute that measures the number of sectors on the disk that have been marked as "pending" for writing operations.

![image](https://user-images.githubusercontent.com/24860547/213450301-4aa0fd65-d294-4e1c-adb6-ae2b13f50e98.png)

**Offline Uncorrectable Sectors**
Attribute that measures the number of sectors that are unable to be read or written to
![image](https://user-images.githubusercontent.com/24860547/213450374-be764bc7-b436-4d96-b59d-ff5a722c8c02.png)

**Percent Lifetime Used**
Percent Lifetime Used is a S.M.A.R.T. attribute that measures the percentage of the lifetime of the disk that has been used. 

## Troubleshooting with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=smartd_log-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
