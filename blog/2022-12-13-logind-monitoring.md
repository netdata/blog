---
slug: logind-monitoring
title: How to monitor and troubleshoot systemd-logind
description: Monitoring and troubleshooting systemd-logind.
authors: satya
tags: [how-to, monitor, troubleshoot, logind,  login, authentication, security]
keywords: [how-to, monitor, troubleshoot, logind,  login, authentication, security]
image: https://user-images.githubusercontent.com/96257330/207284329-273076e5-c092-45ab-a771-7b99cc50a15b.png
---

Find out how to effectively and easily monitor and troubleshoot systemd-logind using Netdata

<!--truncate-->

## What is systemd-logind

Logind is an open source system for managing user logins, as well as providing a secure, reliable way to detect, monitor, and control user sessions. The Logind service can be used to authenticate users and manage their access permissions, as well as provide session tracking and control. It also supports remote logins and allows users to access their system resources from any device.

## Monitoring systemd-logind with Netdata

The prerequisites for monitoring systemd-logind with Netdata are to have systemd-logind and [Netdata installed](https://learn.netdata.cloud/docs/cloud/get-started) on your system. 

Netdata auto discovers hundreds of services, and for those it doesn't turning on manual discovery is a one line configuration. For more information on configuring Netdata for systemd-logind monitoring please read the collector [documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/logind).

You should now see the systemd-logind section on the Overview tab in Netdata Cloud already populated with charts about all the metrics you care about.

Netdata has a public [demo space](https://app.netdata.cloud/spaces/netdata-demo) (no login required) where you can explore different monitoring use-cases and get a feel for Netdata.

## What systemd-logind metrics are important to monitor?

### sessions

 - Local and remote sessions.
   - **Local** - Number of active local sessions.
   - **Remote** - Number of active remote sessions.
 ![Sessions](https://user-images.githubusercontent.com/96257330/207290462-0640f27a-a29d-45b1-a240-80e0a02331e2.png)

### sessions_type

 - Sessions of each session type.
   - **Graphical** - sessions are running under one of X11 Mir or Wayland.
   - **Console** - sessions are usually regular text mode local logins but depending on how the system is configured may have an associated GUI.
   - **Other** - sessions are those that do not fall into the above categories (such as sessions for cron jobs or systemd timer units).
 ![Sessions by type](https://user-images.githubusercontent.com/96257330/207292086-672f7532-bc18-4192-95d7-1aaf2f678dea.png)

### sessions_state

 - Sessions in each session state.
   - **Online** - logged in and running in the background. 
   - **Closing** - nominally logged out but some processes belonging to it are still around. 
   - **Active** - logged in and running in the foreground.
 ![Sessions by State](https://user-images.githubusercontent.com/96257330/207291344-32d9086d-bec1-4760-8465-65b82bb74444.png)

### users_state

 - Users in each user state.
   - **Offline** - users are not logged in. 
   - **Closing** - users are in the process of logging out without lingering. 
   - **Online** - users are logged in but have no active sessions. 
   - **Lingering** - users are not logged in but have one or more services still running. 
   - **Active** - users are logged in and have at least one active session.
 ![Users State](https://user-images.githubusercontent.com/96257330/207291764-2280e8ee-dfd1-4bfc-aef5-96b0e1d9c170.png)

## Troubleshooting systemd-logind with Netdata

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

If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=logind-monitoring)! 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!
