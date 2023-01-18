---
slug: ntpd-monitoring
title: How to monitor and troubleshoot NTPdaemon
description: Monitoring and troubleshooting NTPdaemon.
authors: shyam
tags: [how-to, monitor, troubleshoot, ntpd, ]
keywords: [how-to, monitor, troubleshoot, ntpd, ]
image: https://user-images.githubusercontent.com/24860547/213157308-f9ac7230-5a3a-434f-b4e0-66b9a0e4a2fd.png

---

Find out how to effectively and easily monitor and troubleshoot NTPdaemon using Netdata

<!--truncate-->
## What is NTPd

If you think being **on time** is crucial, and want to get right into the details of monitoring NTPd without wasting any more **time**. You have come to the right place (and sorry for the **time** jokes!).

NTPd (Network Time Protocol Daemon) is an open source implementation of the Network Time Protocol (NTP), a protocol for network time synchronization. NTPd is responsible for synchronizing the time of an individual computer to an NTP server. It can also be used to synchronize multiple computers together, as well as synchronize a computer's time with an external reference clock. NTPd is highly scalable and can be used to synchronize an entire network of computers.

NTPd Provides statistics for the internal variables of the Network Time Protocol daemon ntpd and optional including the configured peers (if enabled in the module configuration). The module presents the performance metrics as shown by ntpq (the standard NTP query program) using NTP mode 6 UDP packets to communicate with the NTP server.

## Monitoring NTPd with Netdata

The prerequisites for monitoring NTPd with Netdata are to have NTPd and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for NTPdaemon monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin/ntpd).

You should now see the NTPdaemon section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What NTPd metrics are important to monitor?

### System metrics

**Combined offset of the server relative to the host**
 -  Measures the difference in clock time between the server and the host. If the combined offset between the two systems is too large, it can lead to inaccurate timestamps, which can cause problems with applications that rely on accurate timekeeping, such as logging, authentication, and distributed applications. Additionally, if the combined offset is too large, it can also cause issues with distributed applications that rely on an accurate synchronization of clocks between nodes. 
 -  For hosts without any time critical services an offset of < 100 ms should be acceptable even with high network latencies. For hosts with time critical services an offset of about 0.01 ms or less can be achieved by using peers with low delays and configuring optimal **poll exponent** values.

![image](https://user-images.githubusercontent.com/24860547/213157710-12fdae36-0900-4460-a1d4-fe3cd134d951.png)

**Combined system jitter and clock jitter**
 -  The jitter associated with a timing reference indicates the magnitude of variance, or dispersion, of the signal. Different timing references have different amounts of jitter. The more accurate a timing reference, the lower the jitter value.
 -  The jitter statistics are exponentially-weighted RMS averages. The system jitter is defined in the NTPv4 specification; the clock jitter statistic is computed by the clock discipline module.

![image](https://user-images.githubusercontent.com/24860547/213158061-f9d3b8fa-ce4c-4bc7-af42-bf8c09d4c4a1.png)

**Frequency offset relative to the hardware clock**
 -  The frequency offset is the difference between the clock frequency of the NTPd daemon and the hardware clock. 
 -  The frequency offset is shown in ppm (parts per million) relative to the frequency of the system. 
 -  The frequency correction needed for the clock can vary significantly between boots and also due to external influences like temperature or radiation.

![image](https://user-images.githubusercontent.com/24860547/213158177-bd50ad08-73d9-433f-a2c3-902cb2376f28.png)

**Clock frequency wander**
 -  The degree to which the frequency of a system's clock drifts over time. It is often measured in parts per million (ppm). This metric is important to monitor because it affects the accuracy of time synchronization between a system and its peers. If the clock frequency wander is too large, it can lead to time discrepancies between systems and cause errors in applications that rely on accurate time synchronization.
 -  Wander statistics are exponentially-weighted RMS averages.

![image](https://user-images.githubusercontent.com/24860547/213158306-da6d97f4-51fa-4acb-a943-c27cad4b19be.png)

**Total round-trip delay to the primary refernce clock**
 -  Delay in a NTP server describes the round-trip delay or latency of a timing message passed from client to server and back again. The delay is important so that network delays can be calculated and accounted for by a time client.
 -  The root delay is the round-trip delay to the primary reference clock similar to the delay shown by the `ping` command. A lower delay should result in a lower clock offset.

![image](https://user-images.githubusercontent.com/24860547/213158414-426c06ee-aa7e-4478-aa12-81d61d9037e3.png)

**Total root dispersion to the primary reference clock**
 - Total root dispersion to the primary reference clock is a metric used in NTPd to measure the accuracy of the time provided by the primary reference clock. It takes into account the delay and offset of the clock and quantifies the total amount of time that has been shifted.

![image](https://user-images.githubusercontent.com/24860547/213158556-4cd4dd6e-7497-4269-8514-3edb8b173fb3.png)


**Stratum**
 -  The Stratum of a NTP server denotes its level in the timing hierarchy. A stratum 1 NTP server obtains time from an external timing reference. Stratum 2 devices obtain time from stratum 1 devices and pass timing information to the next level and so on. 

![image](https://user-images.githubusercontent.com/24860547/213158651-55b0d155-5db9-41be-8313-d2f4469ec152.png)

**Time constant and poll exponent**
 -  The time constant is the number of seconds between successive updates of the system clock. The poll exponent is the number of seconds between successive polls, which are sent by the NTPd to query the time from the server.
 -  Time constants and poll intervals are expressed as exponents of 2. The default poll exponent of 6 corresponds to a poll interval of 64 s. For typical Internet paths, the optimum poll interval is about 64 s. For fast LANs with modern computers, a poll exponent of 4 (16 s) is appropriate. The [poll process](http://doc.ntp.org/current-stable/poll.html) sends NTP packets at intervals determined by the clock discipline algorithm.

![image](https://user-images.githubusercontent.com/24860547/213158715-1716f7cb-f1a1-4522-aaa7-a1777b70379c.png)

**Precision**
 -  Precision measures the accuracy of the time synchronization provided by the Network Time Protocol (NTP) daemon (NTPd). This metric is monitored to ensure the time on all connected devices is accurately synced. If the precision of the clock is off, it can lead to issues with applications that require precise timing.
 -  Precision is measured in milliseconds, and the closer the value is to 0, the more accurate the synchronization is. 

![image](https://user-images.githubusercontent.com/24860547/213158845-6d4c4668-facd-4e68-8524-0a386ada11aa.png)

### Peer metrics

If you have NTPd peers configured, Netdata also collects these metrics and the following other peer specific metrics as well.

**Peer offset relative to the system clock**
 -  The offset of the peer clock relative to the system clock in milliseconds. Smaller values here weight peers more heavily for selection after the initial synchronization of the local clock. For a system providing time service to other systems these should be as low as possible.

**Peer RTT delay**
 -  The round-trip time (RTT) for communication with the peer similar to the delay shown by the `ping` command. Not as critical as either the offset or jitter but still factored into the selection algorithm (because as a general rule lower delay means more accurate time). In most cases it should be below 100ms.

**Peer Dispersion**
 -  This is a measure of the estimated error between the peer and the local system. Lower values here are better.

**Peer Jitter**
 -  This is essentially a remote estimate of the peer's `System Jitter` value. Lower values here weight highly in favor of peer selection and this is a good indicator of overall quality of a given time server (good servers will have values not exceeding single digit milliseconds here with high quality stratum one servers regularly having sub-millisecond jitter).

**Peer Xleave**
 -  This variable is used in interleaved mode (used only in NTP symmetric and broadcast modes). 

**Peer Root Delay**
 -  For a stratum 1 server this is the access latency for the reference clock. For lower stratum servers it is the sum of the `peer_delay` and `peer_rootdelay` for the system they are syncing off of. Similarly to `peer_delay` lower values here are technically better but have limited influence in peer selection.

**Peer Root Dispersion**
 -  Is the same as `Peer Root Delay` but measures accumulated `Peer Dispersion` instead of accumulated `Peer Delay`.

**Peer Stratum**
 - The stratum of a peer is the number of hops away from a reference clock. The lower the stratum number, the closer the peer is to a reference clock. A stratum of 0 indicates that the peer is a reference clock, while stratum of 1 indicates that the peer is directly connected to the reference clock. The higher the stratum number, the further away the peer is from the reference clock and the less accurate the time being provided by the server is likely to be.

**Peer hmode (Host mode)**
**Peer pmode (Peer mode)**
-  These variables give information about what mode the packets being sent to and received from a given peer are. Mode 1 is symmetric active (both the local system and the remote peer have each other declared as peers in `/etc/ntp.conf`) Mode 2 is symmetric passive (only one side has the other declared as a peer) Mode 3 is client Mode 4 is server and Mode 5 is broadcast (also used for multicast and manycast operation).

**Peer hpoll (Host poll exponent)**
**Peer ppoll (Peer poll exponent)**
-  These variables are log2 representations of the polling interval in seconds.

## Troubleshooting NTPd with Netdata

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
If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=ntpd-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
