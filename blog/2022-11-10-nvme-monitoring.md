---
slug: nvme-monitoring
title: "How to monitor NVMe metrics servers?"
description: "How to monitor NVMe web servers?"
image: ![image](https://user-images.githubusercontent.com/24860547/201093559-35910c86-43c7-44d5-9b0f-ee493b752a57.png)
tags: [how-to,infrastructure-monitoring,nvme,ssd,disk]
keywords: [how-to,infrastructure-monitoring,nvme,disk,ssd, Non-Volatile Memory Host Controller Interface]
authors: shyam
---
Use Netdata to effectively monitor and troubleshoot the performance of SSD disks that rely on NVMe (Non-Volatile Memory express) in your infrastructure. Preempt disk failures and take action to ensure your systems run without a glitch.

<!--truncate-->

## What is NVMe?

The NVMe (Non-Volatile Memory express) is an open, logical-device interface specification for accessing a computer's non-volatile storage media usually attached via PCI Express (PCIe) bus. NVMe allows host hardware and software to fully exploit the levels of parallelism possible in modern SSDs. As a result, NVMe reduces I/O overhead and brings various performance improvements relative to previous logical-device interfaces, including multiple long command queues, and reduced latency.

## Monitoring NVMe with Netdata

The prerequisites for monitoring NVMe with Netdata are that you have:
 - Installed one or more NVMe drives on your system
 - Installed `nvme-cli`
 - Installed Netdata with the Netdata user able to execute `nvme` as root without a password. You can do this by adding the netdata user to the `/etc/sudoers` file (use `which nvme` to find the full path to the nvme binary):
 ```yaml
 netdata ALL=(root) NOPASSWD: /usr/sbin/nvme
 ```

For more information please read the [NVMe collector documentation](https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin/modules/nvme).

## What NVMe metrics are important to monitor - and why?

### Endurance
Endurance indicates the consumed lifetime of the device based on the actual usage and the manufacturer's prediction of NVM life. A value of 100 indicates that the estimated endurance of the device has been consumed, but may not indicate a device failure. The value can be greater than 100 if you use the storage beyond its planned lifetime. But if the endurance number is approaching 100 you should consider replacing your disks. The remaining estimated lifetime can be thought of as (100 - endurance).

### Spare Capacity
This metric measures the amount of spare capacity available on the device and is represented as a percentage. A lower percentage indicates that the device is running low on spare capacity.

SSDs provide a set of internal spare capacity, called spare blocks, that can be used to replace blocks that have reached their write operation limit. After all of the spare blocks have been used, the next block that reaches its limit causes the disk to fail.

### IO Transferred
This metric measures the total amount of data read from and written to the device. It can be helpful in understanding the load on the device and troubleshooting performance issues.

### Power Cycles
This metric measures the number of times this host has been rebooted or the device has been woken up after sleep. A high number of power cycles does not affect the device's life expectancy.

### Power On Time
[Power-on time](https://en.wikipedia.org/wiki/Power-on_hours) is the length of time the device has been supplied with power (in other words, powered on). 

### Critical Warnings
This metric measures the number of critical warnings that occurred. The status of the warning indicates what is the problem to be addressed.

- AvailableSpare: The available spare capacity is below the threshold. 
- TempThreshold: The composite temperature is greater than or equal to an over temperature threshold or less than or equal to an under temperature threshold. 
- NvmSubsystemReliability: The NVM subsystem reliability is degraded due to excessive media or internal errors. 
- ReadOnly: The media is placed in read-only mode. 
- VolatileMemBackupFailed: The volatile memory backup device has failed. 
- PersistentMemoryReadOnly: The Persistent Memory Region has become read-only or unreliable.

### Unsafe Shutdowns
This metric measures the number of times the device has been shut down (power outage) without a shutdown notification being sent. Depending on the NVMe device you are using, unsafe shutdowns can cause data corruption and shorten the lifespan of the device.

### Media Errors
This metric measures the number of occurrences where the controller detected an unrecovered data integrity error. Errors such as uncorrectable ECC, CRC checksum failure, or LBA tag mismatch are included in this counter.

### Error Log Entries
This metric measures the number of entries in the Error Information Log. While Error log entries may indicate problems that need to be addressed, an increase in the number of records is not by itself an indicator of any failure condition.

### Temperature

- Composite temperature
Temperature is important to monitor as it can have a direct impact on the performance and lifespan of the device. The composite temperature metric measures the current composite temperature of the controller and namespace(s) associated with that controller. The manner in which this value is computed is implementation specific and may not represent the actual temperature of any physical point in the NVM subsystem.

- Warning composite temperature time
The time the device has been operating above the Warning Composite Temperature Threshold (WCTEMP) and below Critical Composite Temperature Threshold (CCTEMP).

- Critical composite temperature time
The time the device has been operating above the Critical Composite Temperature Threshold (CCTEMP).


### Thermal management transitions

The thermal management transitions metrics measure the rate of temperature transitions of specific components on the device. These metrics can be helpful in troubleshooting temperature-related issues.

- Thermal management temp1 transitions
The number of times the controller has entered lower active power states or performed vendor-specific thermal management actions, minimizing performance impact, to attempt to lower the Composite Temperature due to the host-managed thermal management feature.

- Thermal management temp2 transitions
The number of times the controller has entered lower active power states or performed vendor-specific thermal management actions, <b>regardless of the impact on performance (e.g., heavy throttling)</b>, to attempt to lower the Combined Temperature due to the host-managed thermal management feature.

- Thermal management temp1 time
The amount of time the controller has entered lower active power states or performed vendor-specific thermal management actions, <b>minimizing performance impact</b>, to attempt to lower the Composite Temperature due to the host-managed thermal management feature.


- Thermal management temp2 time
The amount of time the controller has entered lower active power states or performed vendor-specific thermal management actions, <b>regardless of the impact on performance (e.g., heavy throttling)</b>, to attempt to lower the Combined Temperature due to the host-managed thermal management feature.

