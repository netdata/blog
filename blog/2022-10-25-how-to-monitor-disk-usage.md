---
slug: disk-usage
title: "How to monitor the disk usage on your infrastructure"
description: "The most important part of disk usage monitoring is to check the utilization of each filesystem and each mount point which can reveal existing or impending issues with the storage space on your infrastructure."
image: https://user-images.githubusercontent.com/88642300/197860415-bdff658c-7dd3-4a9e-b39a-fbddd3b44d57.png
tags: [how-to,infrastructure-monitoring,disk,disks,operating-system-monitoring]
keywords: [how-to,infrastructure-monitoring]
authors: satya
---

The most important part of disk usage monitoring is to check the utilization of each filesystem and each mount point which can reveal existing or impending issues with the storage space on your infrastructure.
<!--truncate-->


## What Does Disk Usage (DU) Mean?

Disk usage (DU) refers to the portion or percentage of computer storage that is currently in use. It contrasts with disk space or capacity, 
which is the total amount of space that a given disk is capable of storing. Disk usage is a crucial metric to any computing system, 
as it gives the user the information needed not only for storage, but also software requirements and overall operation. Although it usually
 refers to a computer’s hard disk, it may also refer to external storage, such as a USB drive or compact disc (CD).

## How to check the disk usage?

If you are using Linux (or other Unix based OS) the most popular way to check the disk usage is by executing the "df -H" command 
(the disk free command is pretty versatile so don’t be confused by its name) which will report how much space is used, available, percentage used,
and the mount point of every disk attached to your system:

```yaml
user@hostname:~$ df -H
Filesystem               Size  Used Avail Use% Mounted on
udev                     3.9G     0  3.9G   0% /dev
tmpfs                    796M  584K  796M   1% /run
/dev/mapper/cm--vg-root   63G   21G   39G  36% /
tmpfs                    3.9G  344K  3.9G   1% /dev/shm
tmpfs                    5.0M     0  5.0M   0% /run/lock
/dev/sda1                470M  122M  324M  28% /boot
tmpfs                    796M     0  796M   0% /run/user/1000
```
 
 
Alternatively, you can use the du command which displays the disk usage. This tool can display disk usage for individual directories in Linux, 
giving you a finer-grained view of your disk usage. You can use the -h option to get a human readable output 

```yaml
cm@satya-vm:~$ du -h /etc/netdata/
68K	/etc/netdata/health.d
4.0K	/etc/netdata/charts.d
12K	/etc/netdata/python.d
4.0K	/etc/netdata/ebpf.d
4.0K	/etc/netdata/custom-plugins.d
4.0K	/etc/netdata/ssl
20K	/etc/netdata/go.d
4.0K	/etc/netdata/statsd.d
176K	/etc/netdata/
```
 
and optionally the -s option to simply display the total disk usage of a directory / filesystem.

```yaml
cm@satya-vm:~$ du -hs /etc/netdata/
176K	/etc/netdata/
```
 
## How to monitor your disk usage across your Infrastructure?

Now that we know how to check the disk usage on every individual server but checking this from time to time and monitoring the disk usage are two 
completely different things. While the commands we talked about are very useful they are not built for 24x7 monitoring or for going back in time to 
the root cause of an issue. And if your infrastructure comprises 100s of nodes, logging into each node, executing ‘du’ / ‘df’ linux commands, and 
monitoring the disk usage is an almost impossible task. The ideal solution is to use a distributed monitoring tool like Netdata which collects various 
metrics related to disks and one of them being the disk usage. The disk.space chart is located under the “Mount Points” section and by default it 
shows the disk utilization of all the mount points across all your nodes in the infrastructure.

![Disk Usage 1 - Mount Points](https://user-images.githubusercontent.com/88642300/197859608-f45f0a50-3895-4335-b5e0-8ad38a3bc269.png)

It is a good idea to group the chart by nodes to get an account of the disk utilization per node.

![Disk Usage 2 - Mount Points](https://user-images.githubusercontent.com/88642300/197860368-3b88426c-eca0-4440-bf04-8eb35c84abf9.png)

You can also drill deeper by filtering out specific nodes through the Global node filter on the top right corner for further troubleshooting.

![Disk Usage 3 - Mount Points](https://user-images.githubusercontent.com/88642300/197860415-bdff658c-7dd3-4a9e-b39a-fbddd3b44d57.png)

And with the multiple **Group by** options available on the disk usage chart, you can look at the specific aspect of disk usage based on the issue being 
inspected.

![Disc Usage 4 - Mount Points](https://user-images.githubusercontent.com/88642300/197860488-fe4bccd1-cf5c-4551-a320-b54e3bf40528.png)

![Disk Usage 5 - Mount Points](https://user-images.githubusercontent.com/88642300/197860507-c19ef4eb-54c6-405b-9c7a-d2434bd9c88b.png)

The most important part of disk utilization monitoring is to check the utilization of each filesystem and each mount point which can reveal existing or 
impending issues with the storage space on your infrastructure.

There are default alerts which get triggered on reaching the thresholds and you can modify the thresholds based on your requirement.

![Disk Usage 6 - Disk space usage](https://user-images.githubusercontent.com/88642300/197860766-0baa2c72-23db-4a3a-a1f6-bd79b621820b.png)
 
```yaml
# low disk space
 
# checking the latest collected values
# raise an alarm if the disk is low on
# available disk space
 
 template: disk_space_usage
       on: disk.space
    class: Utilization
     type: System
component: Disk
       os: linux freebsd
    hosts: *
 families: !/dev !/dev/* !/run !/run/* *
     calc: $used * 100 / ($avail + $used)
    units: %
    every: 1m
     warn: $this > (($status >= $WARNING ) ? (80) : (90))
     crit: $this > (($status == $CRITICAL) ? (90) : (98))
    delay: up 1m down 15m multiplier 1.5 max 1h
     info: disk $family space utilization
       to: sysadmin
 ```
 
The alert above monitors the disk.space chart / metric, excludes some of the filesystems like /dev, /dev/*, /run and /run/* and raises a Warning alert 
when the disk utilization exceeds 80% in all cases and if the current state is already Warning or higher, raises an alert when the disk utilization exceeds 90%. Similarly, a critical alert is raised when the disk utilization exceeds 90% in all cases and if the current alert state is Critical, it raises an alert when the disk utilization exceeds 98%. The alert will remain active for 20 minutes (5 + the 15 minute down in the delay hysteresis) unless the alert gets raised again.
 
**Note**: Netdata currently does not monitor directories, but this functionality is coming "soon".
 
## Let us hear from you

If you haven’t already, [sign up now for a free Netdata account](https://app.netdata.cloud/?utm_campaign=technical&utm_source=content&utm_medium=blog&utm_content=disk-usage)!

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).
Happy Troubleshooting!
