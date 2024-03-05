---
slug: dynatrace-vs-datadog-vs-instana-vs-grafana-vs-netdata
title: "Dynatrace vs Datadog vs Instana vs Grafana vs Netdata!"
description: |
  Hands-on experience of the most popular monitoring solutions.
authors: costa
tags: [dynatrace, datadog, instana, grafana, netdata]
keywords: [dynatrace, datadog, instana, grafana, netdata]

---

In this post we delve into the comparative analysis of five leading commercial monitoring solutions—Dynatrace, Datadog, Instana, Grafana, and Netdata. Our objective is to unravel the intrinsic value each of these services offers when applied to a real-world scenario. To accomplish this, we employed trial subscriptions of these services to monitor a set of Ubuntu servers and VMs, each hosting a pair of widely-used applications: Nginx and PostgreSQL, along with a couple of Docker and LXC containers. Additionally, we extended our monitoring to physical servers to evaluate the efficacy of these tools in capturing hardware and sensor data.

Our assessment is anchored in three fundamental aspects:

1.  **Out-of-the-Box Value**: We aim to understand the immediate benefits each tool provides with minimal configuration, essentially evaluating the insights and data accessibility available right after a standard setup.
2.  **Resource Commitment**: It's crucial to gauge the extent of resources (time, computational, etc.) that users must allocate to maintain and operate these monitoring solutions efficiently.
3.  **Impact on Monitored Infrastructure**: Understanding the footprint of these tools on the systems they monitor helps in making informed choices, particularly in environments where resource optimization is paramount.

Our comparison is guided by a trio of criteria we hold in high esteem:

-   **High-fidelity**: The ability of a tool to unveil comprehensive, detailed insights with the finest granularity possible.
-   **Easiness**: We value user-friendliness, especially for individuals who view monitoring as a means to an end rather than their primary professional focus. The tool should be straightforward to set up, navigate, and sustain.
-   **Completeness**: An ideal monitoring solution should offer a holistic view, minimizing any blind spots and providing a comprehensive understanding of the infrastructure.

We've set a collective baseline, aggregating the capabilities of all the tools to define a 100% benchmark. Each tool is then evaluated against this benchmark to determine its relative performance across our criteria. It's worth noting that while we focus on the SaaS versions of these tools, the insights gleaned should be broadly applicable, albeit with nuances, to their on-prem counterparts.

As we proceed, remember that our analysis is inherently subjective, rooted in the specific priorities and values we've outlined. Whether you're a seasoned monitoring professional or someone tasked with overseeing an IT infrastructure, our findings aim to provide a clear, nuanced perspective on how each tool stacks up in the real world.

> **IMPORTANT**: All monitoring solutions tested are feature-full and comprehensive and can effectively monitor anything required by users. Our evaluation focuses on what is easily achievable with minimal effort from users. What is readily available either without any user action or with just some simple configuration, with instructions provided by the monitoring system itself.

## Installation and Configuration

All solutions use an agent that is installed on all monitored systems.

Users are expected to copy and paste a command from the UI, which includes various unique tokens, and paste them to the terminal of each server, or integrate it to their CI/CD or provisioning system, to install the agents.

When it comes to configuration, monitoring solutions use 2 paradigms: a) Centrally, or b) At the edge:

- `Centrally` means that users are expected to configure data collection jobs and agent features from the UI, without the need to access the servers via ssh. This is usually preferred on environments where the infrastructure is static and can be easily managed centrally.

- `At the edge` means that users need to edit configuration files on each server to configure data collection jobs or agent features. This is usually preferred on environments that are automatically deployed, since users can use observability-as-code and maintain the configuration files in git repositories for version control and auditing.

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Agent|OneAgent +<br/>ActiveGate|Datadog Agent|Instana Agent|Grafana Agent|Netdata|
|Data Collection<br/>Configuration|Centrally|At the edge|At the edge|At the edge|Centrally* and<br/>At the edge|
|Alerts Configuration|Centrally|Centrally|Centrally|Centrally|Centrally* and<br/>At the edge|
|Users & Dashboards<br/>Configuration|Centrally|Centrally|Centrally|Centrally|Centrally|
|Dashboards Access|Centrally|Centrally|Centrally|Centrally|Centrally and<br/>At the edge|
|Internet Access Isolation|Full<br/>ActiveGate|Partial|Partial|Partial|Full|
|Dashboards without<br/>Internet Access|No|No|No|No|Yes

\* The central configuration of Netdata is currently in its final stages. It is planned to be released in Match 2024.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

Dynatrace has 2 components that need to be deployed on-prem. **OneAgent** (their systems agents), and **ActiveGate** (a secure proxy that also provides synthetics tests execution, monitoring remote or cloud applications, like databases).

ActiveGate can be used to route OneAgent traffic, monitor cloud environments and remote applications, and run synthetic monitors.

It seems that Dynatrace saw the benefits for **running more powerful software at the edge**, and they have taken a few steps towards a more Netdata-like approach. The Netdata agent is a monitoring-in-a-box. It includes all the features to be a complete monitoring by itself, for both standalone systems, centralization points, synthetic tests execution, remote and cloud applications monitoring and dashboards access at the edge. At the same time when it is installed as a Netdata Parent (centralization point) it offers total internet isolation and offloading of production systems.

Of course, Dynatrace has not yet integrated to their on-prem software all the features Netdata provides (for example, data are never stored on-prem and dashboards cannot be accessed locally), but it nice to see that they recognize the value of this approach and they work in this direction.

After installation, Dynatrace agents do not need any local configuration. Everything is controlled centrally from Dynatrace.

### Datadog

The core features of the Datadog agent need to configured on each server. Then additional configuration is needed centrally to enable modules specializing in certain applications or technologies.

For isolating production systems from the internet, Datadog suggests to use an outbound web proxy. This provides some additional security, but still production systems connect to the internet.

### Instana

Data collection configuration happens via configuration files at each server.

Instana provides an on-prem version of the solution, when internet access isolation is required.

### Grafana

The Grafana Agent needs local configuration for all data collection jobs and features. So, all configurations require ssh access to the servers monitored.

For internet access isolation, Grafana provides a number of alternatives. The most common is the installation of a Prometheus on-prem, and then push the metrics from this Prometheus to Grafana Cloud.

### Netdata

Netdata needs to configured locally, for data collection jobs, features and alerts.

We are currently at the final stages of releasing **Dynamic Configuration**, a feature that allows configuring Netdata centrally, while still pushing and maintaining all configurations at the edge. So, we will attempt to bridge the gap between `Centrally` and `At the edge`, by blending these 2 worlds. **Dynamic Configuration** for data collection jobs and alerts will be released with Netdata version 1.45 (in March 2024).

Unlike all other monitoring solutions, Netdata uses the agent as a distributed database. So, instead of pushing metrics to Netdata Cloud, it only advertises which metrics it collects and maintains. All the features, including data collection, retention, querying, machine learning, alerting, etc are implemented by the open-source Netdata agent, at the edge.

Netdata agents can be configured to act as observability centralization points, thus isolating and offloading production systems from observability tasks. This feature is called **streaming** and it actually turns Netdata Children into data-collectors and Netdata Parents into multi-node observability centralization points. Netdata supports vertical scalability via Netdata Parents and virtually unlimited horizontal scalability via Netdata Cloud, which transparently integrates independent Netdata Parents into one uniform infrastructure.

Since all Netdata Agents installed are complete observability stacks, Netdata allows accessing dashboards locally too. This provides highly available dashboards, even in case the infrastructure is facing internet connectivity problems.

</details>

## Logs

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|systemd-journal|Partial|Yes|-|Yes|Yes|
|systemd-journal namespaces|-|-|-|-|Yes|
|systemd standard fields|-|-|-|-|Yes|
|Containers logs|Yes|Yes|-|Yes|Yes|
|Application text log files|Yes|Manually|-|Manually|Manually|
|Boot logs|Yes|Yes|-|Yes|Yes|
|Logs Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|3.5/6|3.5/6|0/6|3.5/6|5.5/6|

- `systemd-journal` is about having all the systemd journal log entries available.
- `systemd-journal namespaces` shows if the monitoring system detects and ingests namespaces journals. Namespaces are used by systemd units to isolate application and service logs from the rest of the system (`LogNamespace=` line in systemd units).
- `systemd standard fields` shows whether the monitoring system has all the standard systemd-journal fields available for querying. The systemd standard fields like `_MESSAGE_ID`, `UNIT`, `_USER_UNIT`, `_BOOT_ID`, `ERRNO`, `_UID`, `_GID` and many more, provide valuable filtering capabilities for logs. Most monitoring systems however do not provide them.
- `Containers logs` shows if the monitoring system can automatically pick up container logs.
- `Application text log files` shows if the monitoring system can ingest custom log files of any application a user may have.
- `Boot logs` shows if the monitoring system presents system boot logs, that is the logs that were generated during system startup, before any application is started.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

![image](https://github.com/netdata/netdata/assets/2662304/293018b7-fb35-49c1-8224-a3ce1db148f3)

Dynatrace ingests `/var/log/syslog` and the dashboard asks if the user wants to ingest third party log files found in `/var/log`. So, without much of a burden all logs are being monitored by Dynatrace.

Furthermore, Dynatrace seems that it monitors system logs to extract events of interest, like start / stop of services and more, which are presented as Events in various places.

Dynatrace probably monitors system logs via `/var/log/journal`, which does not include all the messages and the fields available by systemd-journal.

For example:

```bash
# journalctl -r _COMM=systemd-tmpfile  | head -n 1
Mar 04 18:27:40 ubuntu2204 systemd-tmpfiles[117782]: /run/finalrd-libs.conf:50: Duplicate line for path "/run/initramfs/lib64", ignoring.

# grep "Duplicate line for path" /var/log/syslog
<no output>
```

That line is found on all other monitoring systems supporting systemd-journal, but not in Dynatrace.

### Datadog

![image](https://github.com/netdata/netdata/assets/2662304/04945608-149e-4cd3-a85e-6cd47f840114)

Datadog requires manual configuration to ingest systemd-journal logs.

For system logs, Datadog provides a fixed list of fields, covering basic information about the application that logged: the syslog identifier (i.e. the application name), the priority (level), the action, the username, the container name and the image name.

### Instana

Instana does not support logs natively. It integrates to 3rd party systems and services for logs.

### Grafana

![image](https://github.com/netdata/netdata/assets/2662304/4fc7333f-1324-4dfb-b73e-25e2a12c9692)

- Grafana requires manually configuration to ingest `systemd-journal` logs.
- When other log files need to be ingested, Grafana requires configuring the `grafana-agent` or running `promtail` for each log file to be ingested.

### Netdata

![image](https://github.com/netdata/netdata/assets/2662304/008cdeb8-6c19-4a90-b3e7-fdf3557e53f3)

Netdata queries systemd-journal files directly, by opening the files and reading them.

Netdata requires running `log2journal` (a Netdata tool) for converting plain text log files into structured systemd journal entries and pushing them to the local systemd-journald, or a local journal namespace, or a remote systemd-journal system, for indexing and querying.

systemd-journald provides an infinite cardinality of logs. Each log entry may have its own unique fields, with their own unique values, and all are indexed for fast queries. However, when logs are ingested into the log management systems of monitoring providers, they lose these special attributes, and only a handful of fields are extracted and indexed, making exploration and filtering a pain. Netdata solves this problem by querying the logs directly at their source, using all the information that is available.

systemd-journald supports building logs centralization points utilizing its own tools. When Netdata is installed on such centralization points, it automatically detect the presence of logs from multiple systems and it provides an integrated and unified dashboard mixing the fields of all servers into a single view.

</details>

## Containers and VMs Monitoring

Information collected about running containers:

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|CPU Usage|Yes|Yes|Yes|Yes|Yes|
|CPU Limits|Yes|Yes|Yes|-|Yes|
|CPU Throttling|Yes|Yes|Yes|-|Yes|
|CPU Pressure|-|Partial|-|-|Yes|
|Memory Usage|Yes|Yes|Yes|Yes|Yes|
|Memory Page Faults|-|Yes|-|-|Yes
|Memory Limits|Yes|Yes|Yes|-|Yes|
|Memory Pressure|-|Partial|-|-|Yes|
|Disk I/O|-|Yes|Yes|-|Yes|
|Disk I/O Throttling|-|-|-|-|Yes|
|Disk I/O Pressure|-|Partial|-|-|Yes|
|Network Traffic|-|Yes|Yes|Yes|Yes|
|# of Processes|-|Yes|-|-|Yes|
|Container Logs|Yes|Yes|-|Yes|Yes|
|Container Processes|Yes|Yes|-|-|Yes|
|Docker Info<br/>(states, images, etc)|-|Yes|-|Yes|Yes|
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|7/16|13.5/16|7/16|5/16|16/16

- `Partial` means that part of the information is provided, compared to what other monitoring systems offer.

There are many container types (CGROUPS) however monitoring providers focus on some of them:

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|:----:|:----:|:----:|:----:|:----:|:----:|
|Docker containers|Yes|Yes|Yes|Yes|Yes|
|LXC containers|-|-|Yes|-|Yes|
|Virtual Machines<br/>(from the host)|-|-|-|-|Yes|
|Kubernetes|Yes|Yes|Yes|Yes|Yes|
|Final Coverage<br/><small>previous score multiplied by this score</small>|14/64|17/64|21/64|10/64|64/64

- `Auto` means the solution find out by itself and automatically collected container metrics and logs.
- `Manual` means the solution requires from users to take manual configuration action to enable container metrics and logs.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

Dynatrace provides limited information for containers. Especially network, disk I/O and pressure information, are completely missing.

Also, Dynatrace does not provide any Docker related information (states, health, images, etc).

![image](https://github.com/netdata/netdata/assets/2662304/f717a6d6-ca81-4574-a159-0d94ca4f53f7)

### Datadog

Datadog collects most of the information available, however several metrics are not visualized by default. They are available for custom dashboards and alerts.
Datadog supports only docker and containerd containers. LXC/LXD containers are not supported.

![image](https://github.com/netdata/netdata/assets/2662304/95a2f0fc-35e6-4058-9669-0b69fa7c3528)

### Instana

Instana supports both Docker and LXC containers, but the information presented is relatively limited.

![image](https://github.com/netdata/netdata/assets/2662304/7d622db6-1957-4657-81d8-31759be11b16)

### Grafana

To monitor containers, Grafana requires running the `grafana-agent` as `root` to enable the embedded cAdvisor, which then collects metrics from Docker. 

The information presented by the default Grafana dashboards, is limited.

![image](https://github.com/netdata/netdata/assets/2662304/cd1afeb8-f92b-4973-848a-fc7de4e1c346)

### Netdata

Netdata collects containers information via kernel CGROUPS. It then associates `veth` network interfaces to each container and contacts docker, kubernetes, libvirt, etc to collect additional labels to enrich the information presented.

The same way Netdata collects containers information, it collects also Virtual Machines information from the the host.

![image](https://github.com/netdata/netdata/assets/2662304/e9dcbc1c-4b6e-40ac-be3a-90c56301ec9c)

![image](https://github.com/netdata/netdata/assets/2662304/82de2b41-b32d-4dde-8635-dc0c8c568399)

</details>

## systemd Services Monitoring

When it comes to systemd services, this is what these monitoring solutions provide:

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Availability|Yes|-|-|-|Yes|
|CPU Usage|-|Partial|-|-|Yes|
|Memory Usage|-|Partial|-|-|Yes|
|Disk I/O|-|Partial|-|-|Yes|
|# of Processes|-|Partial|-|-|Yes|
|Status|Yes|-|Partial|-|Yes|
|Logs|Yes|Yes|-|Yes|Yes|
|List all units live<br/>`systemctl list-units`|Cached|-|-|-|Yes|
|List all services live<br/>`systemd-cgtop`|-|-|-|-|Yes|
Coverage|3.5/9|3/9|0/9|1/9|9/9|

- `Cached` means the feature is updated at the data collection interval.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace
![image](https://github.com/netdata/netdata/assets/2662304/09521ab0-700f-4b42-86c9-427e7ed37d2f)

### Datadog

Datadog has a systemd integration for collecting metrics, but it requires to configure all systemd units it should collect data for. Without this, it collects just the number of units by state,

Furthermore, it collects these metrics by querying systemd itself instead of querying cgroups, so it requires specific features and versions of systemd to collect additional data.

### Instana

Instana does not monitor systemd services.

### Grafana

Grafana Cloud does not provide a cloud connector for monitoring systemd services and units.

We know there is a vast ecosystem around Grafana and probably monitoring systemd services can be accomplished via a 3rd party Prometheus exporter, but Grafana Cloud did not mention it, did not suggest any and did not provide instructions on how to configure it.

### Netdata

Netdata provides multiple dashboards for exploring and understanding systemd services and units.

Systemd services metrics:
![image](https://github.com/netdata/netdata/assets/2662304/bf58db3f-3be3-45d2-ba37-a1c966ae1760)

The live list of systemd units:
![image](https://github.com/netdata/netdata/assets/2662304/37239381-1d17-4ce7-8da1-df1deec51aac)

The live list of systemd services:
![image](https://github.com/netdata/netdata/assets/2662304/83ca67bb-7193-4979-a97b-09138c345be8)

</details>

## Processes Monitoring

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|CPU Usage<br/>(with break-down)|Abstract|Yes|Yes|-|Yes|
|Context Switches<br/>(with break-down)|-|Yes|-|-|Yes|
|Memory Usage<br/>(with break-down)|Abstract|Partial|Yes|-|Yes|
|Memory Page Faults|-|-|-|-|Yes|
|Physical Disk I/O|-|-|-|-|Yes|
|Logical Disk I/O|Yes|Possibly|-|-|Yes|
|Network Connectivity|Yes|Yes|-|-|Yes|
|Network Traffic|Abstract|Yes|-|-|-|
|Network Sockets|-|Yes|-|-|Yes|
|Network Issues|Yes|Yes|-|-|-|
|# of Processes|Yes|-|-|-|Yes|
|# of Threads|-|Yes|-|-|Yes|
|# of File Descriptors<br/>(break down by type)|-|Abstract|Abstract|-|Yes|
|% of File Descriptors|Yes|-|Yes|-|Yes|
|Uptime|Yes|Yes|Yes|-|Yes|
|Process Logs|Yes|Yes|-|Yes|Yes|
|DNS queries per process<br/>(per response type)|Partial|Yes|-|-|-|
|Detect the technology of<br/>each process and check<br/>for known vulnerabilities|Yes|-|-|-|-|
|List all processes live|-|Yes|-|-|Yes|
|List all TCP/UDP<br/>processes sockets live|-|Yes|-|-|Yes|
|Coverage|10/20|13.5/20|4.5/20|1/20|16/20|

Notes:
- `Possibly` means that we tried it, the UI shown something relevant to it, but there were no values shown.
- `Partial` means that the information presented was limited compared to the others.
- `Abstract` means that the information presented was an aggregated summary compared to the others.

The above list typically evolves to a large cardinality for tracking every single process ever run. So, usually monitoring solutions group the information to reduce and control its cardinality.

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|:----:|:----:|:----:|:----:|:----:|:----:|
|Not aggregated, per PID|-|Yes|Partial<br/><small>(for select processes)</small>|-|Yes|
|Aggregated in process groups|Yes|-|-|-|Yes|
|User defined process groups|-|-|-|-|Yes|
|Aggregated per user|-|-|-|-|Yes|
|Aggregated per user group|-|-|-|-|Yes|
|Multi-node processes aggregations|-|-|-|-|Yes|

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

![image](https://github.com/netdata/netdata/assets/2662304/e0ab4044-9f3a-4d9b-906d-8b7ac2d16060)

Dynatrace's deep process monitoring, detects the technology stacks processes are built with, and based on the libraries they use it can detect known vulnerabilities:

In our case, it detected these vulnerabilities:

- Container Breakout (Leaky Vessels), in `grafana-agent` and `datadog-agent`
- Stack-based Buffer Overflow, in `datadog-agent`
- Open Redirect, in `datadog-agent`
- Observable Timing Discrepancy, in `instana-agent`

Example: SQL Injection in `grafana-agent`:
![image](https://github.com/netdata/netdata/assets/2662304/38ecda63-8ec8-4621-89e5-3acd3a38c588)

### Datadog

![image](https://github.com/netdata/netdata/assets/2662304/b56ac730-3f21-4ba2-ad6b-0565d017ffee)

Datadog has a special package for detailed Network Monitoring, charged $5 per node per month, on top of the normal monitoring package. Without this, it does not provide any network information for processes.

### Instana
Instana seems that it monitors select processes only. It does not provide any information about the other processes running on a system.

![image](https://github.com/netdata/netdata/assets/2662304/289bed2a-cd2f-44bb-9633-40835ddba41f)

### Grafana

Grafana does not have a cloud connector for monitoring processes. There is a vast ecosystem around Grafana and probably monitoring processes can be accomplished via a 3rd party Prometheus exporter which via a Prometheus installation can push metrics to Grafana Cloud.

### Netdata

Netdata provides a comprehensive list of tools for monitoring processes and their resources.

Processes metrics aggregated per process group, and on the menu on the right, aggregated per user and user group:
![image](https://github.com/netdata/netdata/assets/2662304/9731015f-c78c-4aa7-9ef2-d0ac82a46eec)

The live list of processes running, per PID:
![image](https://github.com/netdata/netdata/assets/2662304/9263f040-a0be-4b8d-872c-ba8eef9ebebb)

The live list of UDP and TCP sockets on a system, aggregated per PID:
![image](https://github.com/netdata/netdata/assets/2662304/295f5f07-1925-410e-9aea-121847daa472)

</details>

## Network Monitoring

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Physical Network Interfaces|Yes|Yes|Yes|Yes|Yes|
|Virtual Network Interfaces|-|Yes|-|-|Yes|
|IPv4 Traffic|-|Yes|-|Yes|Yes|
|IPv4 Fragments|-|Yes|-|Yes|Yes|
|IPv4 Errors|-|Yes|-|Yes|Yes|
|IPv4 Broadcast|-|-|-|-|Yes|
|IPv4 Multicast|-|-|-|-|Yes|
|IP TCP|-|Yes|Yes|Yes|Yes|
|IPv4 UDP|-|Yes|-|Yes|Yes|
|IPv4 UDPlite|-|-|-|Yes|Yes|
|IPv4 ECN|-|-|-|-|Yes|
|IPv4 RAW Sockets|-|-|-|-|Yes|
|IPv6 Traffic|-|-|-|Yes|Yes|
|IPv6 Fragments|-|-|-|Yes|Yes|
|IPv6 Errors|-|-|-|Yes|Yes|
|IPv6 Broadcast|-|-|-|-|Yes|
|IPv6 Multicast|-|-|-|-|Yes|
|IPv6 TCP Sockets|-|-|-|Yes|Yes|
|IPv6 UDP|-|-|-|Yes|Yes|
|IPv6 UDPlite|-|-|-|Yes|Yes|
|IPv6 RAW Sockets|-|-|-|-|Yes|
|SCTP|-|-|-|-|Yes|
|Firewall|-|-|-|Yes|Yes|
|SYNPROXY|-|-|-|-|Yes|
|Traffic Accounting|-|-|-|-|Yes|
|Quality of Service|-|-|-|-|Yes|
|List all sockets live|-|Yes|-|-|Yes|
|Coverage|1/27|8/27|2/27|14/27|27/27|


## Storage Monitoring

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Block Devices Throughput|Yes|-|Yes|Yes|Yes|
|Block Devices Utilization|Yes|Yes|Yes|Yes|Yes|
|Block Devices Operations|Yes|-|Yes|Yes|Yes|
|Block Devices Latency|Yes|-|-|Yes|Yes|
|Block Devices Queue|Yes|-|-|Yes|Yes|
|Block Devices Backlog Time|-|-|-|-|Yes|
|Block Devices Busy Time|-|-|-|-|Yes|
|Block Devices Merged Operations|-|-|-|-|Yes|
|Block Devices Extended Statistics|-|-|-|-|Yes|
|Mount Points Capacity Usage|Yes|Yes|Yes|Yes|Yes|
|Mount Points Inodes Usage|Yes|-|Yes|Yes|Yes|
|NFS<small><br/>Network File System</small>|-|Yes|-|-|Yes|
|SMB<small><br/>Server Message Block</small>|-|-|-|-|Yes|
|Software RAID|-|-|-|-|Yes|
|ZFS<small><br/>Zettabyte File System</small>|-|-|-|-|Yes|
|BTRFS|-|Yes|-|-|Yes|
|BCACHE|-|-|-|-|Yes|
|Ceph|-|Yes|-|Yes|Yes|
|IPFS|-|-|-|-|Yes|
|HDFS|-|Yes|-|Yes|Yes|
|Coverage|7/20|6/20|5/20|9/20|20/20|

Of course, there are hundreds of technologies and storage vendors out there. We list here the most commonly open and freely available technologies available.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

![image](https://github.com/netdata/netdata/assets/2662304/323fd466-0f3c-444c-b492-67404d97ae49)

### Datadog

For the storage layer, Datadog provides the smallest dataset. Also, it does not provide dedicated screens for monitoring block devices or mount points. It needs to be done via custom dashboards. It only collects metrics only for disk capacity (free, used) and the time spend reading or writing. No throughput or operations.

![image](https://github.com/netdata/netdata/assets/2662304/dea11116-a118-4e79-970b-c1a6abb60c3b)

### Instana

Instana provides for mount points: disk space and inode usage. It then monitors the underlying block devices, for the mounted disks. The information provided is basic: reads/writes for operations, throughput and utilization.

When monitoring the performance of mounted filesystems, the block devices that are not mounted but are still used (e.g. mounted by a VM) are not monitored.

![image](https://github.com/netdata/netdata/assets/2662304/df242912-3962-4acd-ad05-51365980a728)

### Grafana

![image](https://github.com/netdata/netdata/assets/2662304/69f328f4-7f26-49ef-8304-476ff051cfe9)

</details>

## Physical Hardware Monitoring

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Motherboard Temperatures|-|-|-|-|Yes|
|Motherboard Voltages|-|-|-|-|Yes|
|Fans Speed|-|-|-|-|Yes|
|IPMI Monitoring<small><br/>Intelligent Platform<br/>Management Interface</small>|-|-|-|-|Yes|
|PCI AER<small><br/>Advanced Error Reporting</small>|-|-|-|-|Yes|
|Memory EDAC<small><br/>Error Detection And Correction</small>|-|-|-|-|Yes|
|Disks Temperatures|-|-|-|-|Yes|
|S.M.A.R.T. Disks|-|-|-|-|Yes|
|NVMe Disks|-|-|-|-|Yes|
|RAID Arrays|-|-|-|-|Yes|
|UPS|-|Yes|-|-|Yes|
|Batteries|-|-|-|-|Yes|
|Power Supplies|-|-|-|-|Yes|
|CPU Sensors|-|-|-|-|Yes|
|GPU Sensors|-|-|-|-|Yes|
|Coverage|0/15|1/15|0/15|0/15|15/15

This table surprised us too. We installed all monitoring solutions on an enterprise server with 256 cores and 1TiB RAM, running hundreds of LXC containers and VMs. Nothing related to the hardware was detected by any solution except Netdata.

We searched on their integrations lists to find something related. We found UPSC and APC UPSes in Datadog (we didn't try them). Also on Datadog we found an integration called "Hardware Sentry" which is a 3rd party company that requires an independent subscription in order to be used.

For Grafana, we know that there are numerous 3rd party provided Prometheus exporters capable for providing such information, but the "Connections" list at Grafana Cloud did not list them, did not suggest them and did not provide instructions on how to use them. The only hardware related connection we found at Grafana Cloud is "RaspberryPi", which however installs an agent to collect system metrics, not hardware sensors.

Netdata on the other hand, collects information from **all sensors** and **all hardware components**, and it has a special handling for monitoring **hardware errors**: Modern Linux systems expose thousands of metrics related to hardware errors. But these counters are just zero on healthy systems. So, instead of collecting, storing and visualizing all these zeros, Netdata collects them, but as long as they are zero it ignores them. If any of them is non-zero, then a chart will appear and an alert will be associated with it, indicating the hardware error found. This way Netdata monitors all hardware sensors and components, without affecting retention or visualization, until they are useful.

## Alerts

TBD

## Dashboards

All monitoring solutions provide automated dashboards for **single-node monitoring**, although to a varying degree each.

For **multi-node, infrastructure level dashboards**, all monitoring solutions except Netdata, require from users to manually configure the dashboards they need. Netdata on the other hand, allows users to segment the infrastructure into rooms, and each of the rooms gets **fully automated multi-node dashboards** for the nodes in it. Even if rooms are not required, Netdata provides multi-node dashboards for all nodes registered.

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|:----:|:----:|:----:|:----:|:----:|:----:|
|Automated Single Node Dashboards|Yes|Yes|Yes|Yes|Yes|
|Automated Multi Node Dashboards|-|-|-|-|Yes|
|Every metric is visualized by default|-|-|-|-|Yes|


## Artificial Intelligence

### Dynatrace

Dynatrace advertises Davis AI as its artificial intelligence solution. Davis is frequently mentioned throughout the UI, providing assistance in various places.

However, based on our experience with the system, Davis seems more like a sophisticated expert system that uses several hard-coded rules and correlations to detect issues, and less than a strictly speaking "machine learning engine".

Of course Davis seems very valuable and is able to detect many common issues, however the same kind of issue detection is achieved by Netdata stock alerts (the out-of-the-box alerts Netdata provides), which do not use AI by default.

On the UI, when building custom dashboards, Dynatrace provides forecasting and anomaly detection, when asked to do so (is is a manual action). This looks more like a dashboard feature (i.e. perform some statistical analysis on the visible data), than real machine-learning training models in the background.

### Datadog

TBD

### Instana

TBD

### Grafana

TBD

### Netdata

TBD


## Custom Dashboards

## Agents Resources Utilization

The following script extracts average CPU utilization and Memory usage for any systemd service.

```bash
#!/bin/bash
service=$1
status=$(systemctl show $service)
ExecMainStartTimestampMonotonic=$(echo "$status" | grep "^ExecMainStartTimestampMonotonic=" | cut -d '=' -f 2)
CPUUsageNSec=$(echo "$status" | grep "^CPUUsageNSec=" | cut -d '=' -f 2)
MemoryCurrent=$(echo "$status" | grep "^MemoryCurrent=" | cut -d '=' -f 2)
ExecMainStartTimestampSec=$(echo "$ExecMainStartTimestampMonotonic / 1000000" | bc -l)
CurrentMonotonicSec=$(cat /proc/uptime | awk '{print $1}')
DurationSec=$(echo "$CurrentMonotonicSec - $ExecMainStartTimestampSec" | bc -l)
CPUUsageSec=$(echo "$CPUUsageNSec / 1000000000" | bc -l)
CPUUtilization=$(echo "scale=2; $CPUUsageSec * 100 / $DurationSec" | bc -l)
MemoryCurrentMiB=$(echo $MemoryCurrent | numfmt --to=iec-i --suffix=B --format="%.2f")
echo "$service: CPU average $CPUUtilization%, RAM: $MemoryCurrentMiB"
```

This is what we get:

```bash
# for x in datadog-agent-sysprobe.service datadog-agent.service datadog-agent-process.service datadog-agent-trace.service oneagent.service instana-agent.service grafana-agent.service netdata.service; do ./service-average-cpu.sh $x; done
datadog-agent-sysprobe.service: CPU average 5.04%, RAM: 391.28MiB
datadog-agent.service: CPU average 2.46%, RAM: 332.42MiB
datadog-agent-process.service: CPU average .45%, RAM: 117.77MiB
datadog-agent-trace.service: CPU average .40%, RAM: 79.05MiB
oneagent.service: CPU average 3.63%, RAM: 414.14MiB
instana-agent.service: CPU average 4.14%, RAM: 566.37MiB
grafana-agent.service: CPU average 3.27%, RAM: 228.17MiB
netdata.service: CPU average 3.66%, RAM: 263.47MiB
```

Datadog has 4 services, totaling 8.35% CPU and 920.52 MiB RAM.
`oneagent` is Dynatrace.

Note that Netdata runs with default settings. This means **per-second** data collection for **3k+ metrics**, **3 database tiers** all updated in parallel, and **machine learning** for all metrics collected.



### Egress Bandwidth

To monitor egress bandwidth for a single node, we used `tc` to match all traffic towards the internet, for each of the systemd services cgroups.

<details><summary>👉 Click here to see how</summary>

 This is `fireqos` configuration (`/etc/firehol/fireqos.conf`):
 
```bash
nft flush table inet mon_agents 2>/dev/null
nft -f - <<EOF
table inet mon_agents {
    chain output {
        type filter hook output priority filter; policy accept;

        # Exclude private and special-purpose IP address ranges
        ip daddr 10.0.0.0/8 accept
        ip daddr 172.16.0.0/12 accept
        ip daddr 192.168.0.0/16 accept
        ip daddr 100.64.0.0/10 accept
        ip daddr 127.0.0.0/8 accept
        ip daddr 169.254.0.0/16 accept
        ip daddr 192.0.0.0/24 accept
        ip daddr 192.0.2.0/24 accept
        ip daddr 192.88.99.0/24 accept
        ip daddr 198.18.0.0/15 accept
        ip daddr 198.51.100.0/24 accept
        ip daddr 203.0.113.0/24 accept
        ip daddr 224.0.0.0/4 accept
        ip daddr 240.0.0.0/4 accept
        ip daddr 255.255.255.255 accept

        # Apply marks for specific services
        socket cgroupv2 level 2 "system.slice/netdata.service" meta mark set 0x00000001 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/instana-agent.service" meta mark set 0x00000002 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/oneagent.service" meta mark set 0x00000003 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/datadog-agent-trace.service" meta mark set 0x00000004 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/datadog-agent.service" meta mark set 0x00000004 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/datadog-agent-sysprobe.service" meta mark set 0x00000004 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/datadog-agent-process.service" meta mark set 0x00000004 meta nftrace set 1 counter
        socket cgroupv2 level 2 "system.slice/grafana-agent.service" meta mark set 0x00000005 meta nftrace set 1 counter
    }
}
EOF

wan="$(ip -4 route get 8.8.8.8 | grep -oP "dev [^[:space:]]+ " | cut -d ' ' -f 2)"
[ -z "${wan}" ] && wan="eth0" && echo >&2 "Assuming default gateway is via device: ${wan}"

server_ssh_ports="tcp/22,2222"
server_gvpe_ports="tcp,udp/49999"
server_wireguard_ports="udp/13231"

PRIVATE_IPS="10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 100.64.0.0/16 127.0.0.0/8 169.254.0.0/16"

for xx in ${wan}/world
do
        dev=${xx/\/*/}
        name=${xx/*\//}

        ip link show dev $dev >/dev/null 2>&1
        [ $? -ne 0 ] && continue

        interface $dev $name output ethernet balanced minrate 15kbit rate 1000Mbit
                class netdata
                        match rawmark 1

                class instana
                        match rawmark 2

                class dynatrace
                        match rawmark 3

                class datadog
                        match rawmark 4

                class grafana
                        match rawmark 5

done
```

</details>

This provided the following chart in Netdata:

![image](https://github.com/netdata/netdata/assets/2662304/59001495-116a-4b0e-b462-88684768d7aa)

We used the Netdata API to calculate the average rate for all of them. Datadog averages at 25.2 kbps, Instana at 16.1 kbps, Dynatrace at 12.0 kbps, Grafana at 13.0 kbps, Dynatrace at 12.3 kbps and Netdata at 0.3 kbps.

To calculate the monthly consumption we used:

```
monthly GiB = rate * 86400 / 8 * 365 / 12 / 1024 / 1024
```

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|:----:|:----:|:----:|:----:|:----:|:----:|
|rate (kbps)|12.0|25.2|16.1|13.0|0.3|
|monthly (GiB)|3.68|7.73|4.94|3.99|0.09|

As shown, Netdata does not really use any internet traffic. Since Netdata does not push the samples and the logs to Netdata Cloud, the only bandwidth used is when users are viewing these data.

## Summary

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Agent|Dynatrace<br/>OneAgent + ActiveGate|Datadog-Agent|Instana-Agent|Grafana-Agent|Netdata|
|Granularity|1-minute|15-seconds|1-second|1-minute|1-second|
|Retention|**5-years**<br/>in tiers|**15-months**<br/>at 15-seconds|**13-months**<br/>in tiers|**13-months**<br/>at 1-minute|**Unlimited**<br/>in tiers|
|||||||
|**Infra Coverage**|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|Logs|58%|58%|0%|58%|83%|
|Storage|35%|30%|25%|45%|100%|
|Networking|4%|30%|7%|52%|100%|
|Containers & VMs|27%|28%|33%|16%|100%|
|systemd Services|39%|33%|0%|11%|100%|
|Processes|50%|68%|23%|5%|80%|
|Hardware & Sensors|0%|7%|0%|0%|100%|
|||||||
|**Resources**|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|CPU Usage<br/><small>100% = 1 core</small>|3.63%|8.35%|4.14%|3.27%|3.66%|
|CPU Efficiency|
|Memory Used|**414 MiB**|**921 MiB**|**566 MiB**|**228 MiB**|**263 MiB**|
|Egress Internet Traffic<br/><small>per node per month</small>|**3.68 GiB**|**7.73 GiB**|**4.94 GiB**|**3.99 GiB**|**90 MiB**|

## Final Verdict

### Dynatrace

Dynatrace seems a very well thought monitoring platform. It is obvious that the folks at Dynatrace have given quite some thought to each aspect of the monitoring experience and have tried to provide a lot of insights out of the box.

What we liked about Dynatrace:

1. Dynatrace has some computed metrics we found appealing: Availability over time for O/S services, Connectivity over time for processes and more. Although all these can be derived from other metrics Netdata already monitors, we found interesting the idea of providing computed metrics like these.
2. Dynatrace names the metrics in a way that is more straight forward for users to understand, like Disk Latency (it appears to be the same with `disk.iowait` in Netdata). This made us reconsider our strategy of naming metrics closely to the names the O/S or the applications have.
3. Detecting the technology of each process and then checking for known vulnerabilities is a nice add-on. I am not sure if this feature belongs to a monitoring system or a CI/CD platform, but still it is interesting to have such a feature available.
4. Dynatrace comes with a lot of errors and problems detection out of the box. It is interesting that they named them "Problems" and they have associated them with Davis instead of normal alerts. This prevents the pollution of user configured alerts with the stock ones and also makes the solution seem "smarter".
5. Apart from installing OneAgent and ActiveGate, the platform never asked us to configure anything by hand. All configuration happened via the UI.

What we didn't like:

1. Dynatrace provides the absolutely minimum information to build the UX they have in mind. This limits significantly the possibilities of using the solution for flows they haven't thought of. You always feel that "something is missing".
2. Most dashboards have 2 versions, the "classic" and the new one. The new one is generally more modern, but also more limited, so you frequently find yourself switching to the "classic" one to get the work done.
3. The best resolution of 1-minute is really not enough for monitoring modern systems.
4. When creating custom dashboards, it is not easy to understand where the data are coming from, which makes you first do a query to understand the metrics (e.g. group by something) and once you know what data are there, then do the query you really need. The solution we have given to Netdata with the NIDL bar above each chart (for slicing and dicing) seems superior.
5. Despite the promise of experiencing AI, we didn't find any evidence of real machine learning running in the background. Davis seems more like a hard-coded expert system. It is useful, but not AI.
6. Complete lack of any multi-node dashboards out of the box. All the multi-node dashboards you need, you have to build them yourself.
7. This is an expensive service.

### Datadog

Datadog is a powerful platform. Despite the fact that they miss a lot of the information compared to Netdata, the UX gives freedom and power to users and for the things they monitor the dashboards deep dive into the information available, to provide a holistic view.

What we liked about Datadog:

1. The Datadog Network Performance is nice, although expensive ($5 per node per month). The Netdata network viewer we started last month, is still at its early stages, although we believe that soon we will be able to compete head-to-head with the Datadog one.
2. The tools are quite integrated, so processes, logs, network sockets, etc are all available in a contextual manner.
3. There are many integrations available.

What we didn't like:

1. Very limited coverage for infrastructure technologies, physical hardware and operating system services.
2. No alerts or problems detection out of the box. All alerts need to be configured manually.
3. Very limited support for monitoring operating system services (systemd-units).
4. Missing LXC containers and VMs (monitoring VMs from the host).
5. Only few integrations get automated dashboards and in many cases many of the integrations that have dashboards, do not visualize all their information. For most metrics, dashboards need to be built manually.
6. No multi-node dashboards. Users are expected to build these dashboards manually.
7. This is an expensive service.

### Instana

Instana is probably the weakest of all the services we tested. The look and feel is very similar to the Dynatrace "classic" dashboards. We know that they provide strong support for monitoring IBM products (DB2, etc), so probably this monitoring solution is targeting this niche.

What we liked:

1. Instana and Netdata were the only solutions that detected short gaps in the VMs execution. So, we paused the VMs for 30 seconds. All the other monitoring solutions did not detect anything. Nothing happened as far as they are concerned. But for Instana and Netdata this was a major event and all the charts had gaps in them for the time the VMs were paused.

What we didn't like:

1. They don't support logs. They integrate with third party services for that.
2. The 1-second resolution is available for only 24 hours. This means that on Monday you cannot see in high resolution what happened last Saturday.
3. The metrics collected are quite limited.
4. Their ecosystem is not big enough. Most google searches reveal limited or no information from third parties.

## Grafana

Grafana has a vast ecosystem and community. Of course this ecosystem is available for all monitoring solutions to use, and all do, one way or another.

To get a complete monitoring solution out of Grafana, users need to invest a lot in skills and time. Most of the dashboards provided by default is basic, so users are expected to configure the whole monitoring by hand. This ecosystem has a lot of moving parts, each with a different degree of maturity and flexibility, increasing significantly the overall cost of ownership.

What we liked:

1. Vast community.
2. Open architecture.

What we didn't like:

1. The default resolution of 1-minute for the Grafana agent was a surprise. Grafana knows that this is not enough for monitoring today's systems and applications, but I guess they needed it for justifying the pricing.
2. Primitive default dashboards.
3. Too complex. Not for newcomers.

## Netdata

Since this our blog, I will prefer to describe what I learned for this journey.

### Decentralized & Distributed

All monitoring providers struggle with the resolution and the cardinality. They invest a lot of effort to minimize both of them, since they are proportional to their cost, and even after all reductions, their services are quite expensive for the average team. 

When I started this post, I was expecting that Netdata will be the "heavier" of the agents. It has to be, because it does a lot of work! It is the only agent that is a monitoring solution by itself, it collects data per-second, stores the data in its own database, trains machine learning models for all metrics, queries these data, etc.

To my surprise, the Netdata agent is one of lightest!

This proves that Netdata is on the right path. The decentralized and distributed nature of Netdata decouples resolution and cardinality from our economics, without pushing this cost to the users, allowing Netdata to become **the most cost efficient monitoring solution**, while also providing high fidelity observability without compromises.

### Out of the box

All monitoring providers see the value of providing out of the box experience, but only Netdata so far has applied this to all the information available. Since we deal with information of all kinds, Netdata had to find a way to present everything, structure the information in a way that users can easily use.

I understand that our presentation is probably too flat and users occasionally complain that Netdata dashboards are overwhelming. We need to change them so that they are more contextual, to present the information in layers. The good thing with Netdata is that it has a lot more information than the others, so it can go deeper than them.

### Charts & Dashboards

I was surprised to find out that Netdata charts and dashboards are actually a lot more usable and efficient than the ones of the other monitoring systems.

For most monitoring solutions, editing charts is a complicated and challenging task. How to provide to users all the aspect of a metric so that they can understand quickly what this metric is about, which sources contribute to it and how much?

The NIDL bar Netdata provides above each chart, although it makes the UI a little more busy, it is simpler, quicker and easier to use than any of the solutions the other monitoring providers offer.

