---
slug: chrony-monitoring
title: How to monitor and troubleshoot Chrony
description: Monitoring and troubleshooting Chrony.
authors: shyam 
tags: [how-to, monitor, troubleshoot, chrony, time server, NTP server, sync server]
keywords: [how-to, monitor, troubleshoot, chrony, time server, NTP server, sync server]

---

Find out how to effectively and easily monitor and troubleshoot Chrony using Netdata

<!--truncate-->
## What is Chrony

Chrony is an open source, low-level utility for managing the system clock. It can be used to maintain the accuracy of the computer's clock across a network, or even in the absence of an internet connection. Chrony is designed to be more accurate and resilient than the traditional utilities such as ntpd, and can adjust the system clock even in the presence of large time offsets and/or network outages. Chrony also offers a number of features such as automatic time synchronization, access control lists, and logging.+

## Monitoring Chrony with Netdata

The prerequisites for monitoring Chrony with Netdata are to have Chrony and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for Chrony monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/chrony).

You should now see the Chrony section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What Chrony metrics are important to monitor?

### stratum
 -  The stratum indicates the distance (hops) to the computer with the reference clock. The higher the stratum number the more the timing accuracy and stability degrades.
![image](https://user-images.githubusercontent.com/24860547/207012590-738ba2ab-ab4c-49b0-b424-c8489312d88d.png)

### current_correction
 -  Any error in the system clock is corrected by slightly speeding up or slowing down the system clock until the error has been removed and then returning to the system clock’s normal speed. A consequence of this is that there will be a period when the system clock (as read by other programs) will be different from chronyd\s estimate of the current true time (which it reports to NTP clients when it is operating as a server). The reported value is the difference due to this effect.
![image](https://user-images.githubusercontent.com/24860547/207012646-4429a887-7ab0-4b0a-ad30-7a76f9e662ef.png)

### root_delay
 -  The total of the network path delays to the stratum-1 computer from which the computer is ultimately synchronised.
![image](https://user-images.githubusercontent.com/24860547/207012725-f14bde74-5a00-4676-a644-4f0f040bb419.png)

### root_dispersion
 -  The total dispersion accumulated through all the computers back to the stratum-1 computer from which the computer is ultimately synchronised. Dispersion is due to system clock resolution statistical measurement variations etc.
![image](https://user-images.githubusercontent.com/24860547/207012765-167c20bd-51ef-441e-a68e-ebfd278d92db.png)

### last_offset
 -  The estimated local offset on the last clock update. A positive value indicates the local time (as previously estimated true time) was ahead of the time sources.
![image](https://user-images.githubusercontent.com/24860547/207012798-739cb2b3-626e-42a0-80b3-76e3389a3b9f.png)

### rms_offset
 - The root mean square (RMS) offset of the system clock from true time. Large offsets may indicate a problem with the clock or network synchronization.
![image](https://user-images.githubusercontent.com/24860547/207012850-6e5a03e7-f62c-4a7c-957e-6f742c4ab7e3.png)

### frequency
 -  The <b>frequency</b> is the rate by which the system’s clock would be wrong if chronyd was not correcting it. It is expressed in ppm (parts per million). For example a value of 1 ppm would mean that when the system’s clock thinks it has advanced 1 second it has actually advanced by 1.000001 seconds relative to true time.
![image](https://user-images.githubusercontent.com/24860547/207012885-5f28e244-5ddf-4ba1-944d-f1cab6f2faa8.png)

### residual_frequency
 -  The <b>residual frequency</b> for the currently selected reference source. This reflects any difference between what the measurements from the reference source indicate the frequency should be and the frequency currently being used. The reason this is not always zero is that a smoothing procedure is applied to the frequency.
![image](https://user-images.githubusercontent.com/24860547/207012933-e736dcb2-3228-4267-8b4f-d63ca198d170.png)

### skew
 -  The estimated error bound on the frequency.
![image](https://user-images.githubusercontent.com/24860547/207012993-411b118b-ddd0-4f57-bd72-b39d3ba6f4e7.png)

### update_interval
 - The interval between clock updates. Shorter intervals may improve accuracy but may also increase network load.
![image](https://user-images.githubusercontent.com/24860547/207013047-8d7d6c40-782f-4e60-85bf-a6e8b1a2be46.png)

### ref_measurement_time
 -  The time elapsed since the last measurement from the reference source was processed.
![image](https://user-images.githubusercontent.com/24860547/207013112-0e051aca-7487-4ee7-9f06-31ba7017c788.png)

### leap_status
 -  <p>The current leap status of the source.</p><p><b>Normal</b> - indicates the normal status (no leap second). <b>InsertSecond</b> - indicates that a leap second will be inserted at the end of the month. <b>DeleteSecond</b> - indicates that a leap second will be deleted at the end of the month. <b>Unsynchronised</b> - the server has not synchronized properly with the NTP server.</p>
![image](https://user-images.githubusercontent.com/24860547/207013171-f3c28de8-82bc-4e78-9dfb-b4836a2ef294.png)

### activity
 -  <p>The number of servers and peers that are online and offline.</p><p><b>Online</b> - the server or peer is currently online (i.e. assumed by chronyd to be reachable). <b>Offline</b> - the server or peer is currently offline (i.e. assumed by chronyd to be unreachable and no measurements from it will be attempted). <b>BurstOnline</b> - a burst command has been initiated for the server or peer and is being performed. After the burst is complete the server or peer will be returned to the online state. <b>BurstOffline</b> - a burst command has been initiated for the server or peer and is being performed. After the burst is complete the server or peer will be returned to the offline state. <b>Unresolved</b> - the name of the server or peer was not resolved to an address yet.</p>
![image](https://user-images.githubusercontent.com/24860547/207013220-83071169-cb3b-478d-9730-06b52d60bf68.png)

## Troubleshooting Chrony with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=chrony-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
