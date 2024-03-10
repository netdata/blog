---
slug: dynatrace-vs-datadog-vs-instana-vs-grafana-vs-netdata
title: "Dynatrace vs Datadog vs Instana vs Grafana vs Netdata!"
description: |
  Hands-on experience of the most popular monitoring solutions.
authors: costa
tags: [dynatrace, datadog, instana, grafana, netdata]
keywords: [dynatrace, datadog, instana, grafana, netdata]

---

In this post we delve into the comparative analysis of the commercial offerings of five leading monitoring solutions—Dynatrace, Datadog, Instana, Grafana, and Netdata. Our objective is to unravel the intrinsic value each of these services offers when applied to a real-world scenario. To accomplish this, we employed trial subscriptions of these services to monitor a set of Ubuntu servers and VMs, each hosting a pair of widely-used applications: nginx and PostgreSQL, along with a couple of Docker and LXC containers. Additionally, we extended our monitoring to physical servers to evaluate the efficacy of these tools in capturing hardware and sensor data along with VMs monitored from the host.

Our assessment is anchored in three fundamental aspects:

1.  **Out-of-the-Box Value**: We aim to understand the immediate benefits each tool provides with minimal configuration, essentially evaluating the insights and data accessibility available right after a standard setup.
2.  **Resource Commitment**: It's crucial to gauge the extent of resources (time, computational, etc.) that users must allocate to maintain and operate these monitoring solutions efficiently.
3.  **Impact on Monitored Infrastructure**: Understanding the footprint of these tools on the systems they monitor helps in making informed choices, particularly in environments where resource optimization is paramount.

Our comparison is guided by a trio of criteria we hold in high esteem:

-   **High-fidelity**: The ability of a tool to unveil comprehensive, detailed insights with the finest granularity possible.
-   **Easiness**: We value user-friendliness, especially for individuals who view monitoring as a means to an end rather than their primary professional focus. The tool should be straightforward to set up, navigate, and sustain.
-   **Completeness**: An ideal monitoring solution should offer a holistic view, minimizing any blind spots and providing a comprehensive understanding of the infrastructure.

We've set a collective baseline, aggregating the capabilities of all the tools to define a 100% benchmark. Each tool is then evaluated against this benchmark to determine its relative performance across our criteria.

As we proceed, remember that our analysis is inherently subjective, rooted in the specific priorities and values we've outlined. Whether you're a seasoned monitoring professional or someone tasked with overseeing an IT infrastructure, our findings aim to provide a clear, nuanced perspective on how each tool stacks up in the real world.

> **IMPORTANT**: All monitoring solutions tested are feature-full and comprehensive and can effectively monitor anything required by their customers. Our evaluation focuses on what is easily achievable with minimal effort. What is readily available either without any user action or with just some simple configuration, with instructions provided by the monitoring system itself.


## Installation and Configuration

All solutions use an agent that is installed on all monitored systems.

Users are expected to copy and paste a command from the UI, which includes various unique tokens, and paste them to the terminal of each server, or integrate it to their CI/CD or provisioning system, to deploy the agents.

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
|Internet Access<br/>Isolation|Full<br/>ActiveGate|Partial|Partial|Partial|Full|
|Dashboards without<br/>Internet Access|No|No|No|No|Yes

\* The central configuration of Netdata is currently in its final stages. It is planned to be released in Match 2024.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

Dynatrace has 2 components that need to be deployed on-prem. **OneAgent** (their systems agent), and **ActiveGate** (a secure proxy that also provides synthetics tests execution, monitoring remote or cloud applications, and more).

ActiveGate can be used to route OneAgent traffic, monitor cloud environments and remote applications, and run synthetic monitors.

After installation, Dynatrace agents do not need any local configuration. Everything is controlled centrally from Dynatrace.

### Datadog

The core features and data collection jobs of the Datadog agent need to configured on each server. Then additional configuration is needed centrally to enable modules specializing in certain applications or technologies.

For isolating production systems from the internet, Datadog suggests to use an outbound web proxy.

### Instana

Data collection configuration happens via configuration files at each server.

Instana provides an on-prem version of the solution, when internet access isolation is required.

### Grafana

The Grafana Agent needs local configuration for all data collection jobs and features.

For internet access isolation, Grafana provides a number of alternatives for metrics and logs, which usually require running databases (e.g. Prometheus) locally.

### Netdata

Netdata needs to configured locally, for data collection jobs, features and alerts.

We are currently at the final stages of releasing **Dynamic Configuration**, a feature that allows configuring Netdata centrally, while still pushing and maintaining all configurations at the edge. **Dynamic Configuration** for data collection jobs and alerts will be released with Netdata version 1.45 (in March 2024).

Unlike the other monitoring solutions, Netdata uses the agent as a distributed database. So, instead of pushing metrics to Netdata Cloud, it only advertises which metrics it collects and maintains. All the features, including data collection, retention, querying, machine learning, alerting, etc are implemented by the open-source Netdata agent, at the edge.

Netdata agents can be configured to act as observability centralization points, thus isolating and offloading production systems from observability tasks. This feature is called **streaming** and it actually turns Netdata Children into data-collectors and Netdata Parents into multi-node observability centralization points.

Netdata supports vertical scalability via Netdata Parents and virtually unlimited horizontal scalability via Netdata Cloud, which transparently merges independent Netdata Parents and Agents into an integrated and uniform infrastructure.

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

For converting plain text log files, Netdata provides `log2journal`, which converts plain text log files into structured systemd journal entries and pushes them to the local systemd-journald, or a local journal namespace, or a remote systemd-journal system, for indexing and querying.

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

The same way Netdata collects containers information, it collects also Virtual Machines information from the host.

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
|List all units live<br/>`systemctl list-units`|Partial|-|-|-|Yes|
|List all services live<br/>`systemd-cgtop`|-|-|-|-|Yes|
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|3.5/9|3/9|0/9|1/9|9/9|

- `Partial` means that the information collected is a part of what others provide.

<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

Dynatrace tracks the type of each systemd service and a single metric about its availability.  There is no information about its resources. Also the information is not real-time. It seems it is updated according to the data collection interval (per-minute).

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
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|10/20|13.5/20|4.5/20|1/20|16/20|

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
|Wireless Interfaces|-|-|-|-|Yes|
|IPv4 Traffic|-|Partial|-|Yes|Yes|
|IPv4 Fragments|-|Partial|-|Yes|Yes|
|IPv4 Errors|-|Partial|-|Yes|Yes|
|IPv4 Broadcast|-|-|-|-|Yes|
|IPv4 Multicast|-|-|-|-|Yes|
|IP TCP|-|Yes|Yes|Yes|Yes|
|IPv4 UDP|-|Partial|-|Yes|Yes|
|IPv4 UDPlite|-|-|-|Yes|Yes|
|IPv4 ECN|-|-|-|-|Yes|
|IPv4 RAW Sockets|-|-|-|-|Yes|
|IPv6 Traffic|-|Partial|-|Yes|Yes|
|IPv6 Fragments|-|Partial|-|Yes|Yes|
|IPv6 Errors|-|Partial|-|Yes|Yes|
|IPv6 Broadcast|-|-|-|-|Yes|
|IPv6 Multicast|-|-|-|-|Yes|
|IPv6 TCP Sockets|-|Yes|-|Yes|Yes|
|IPv6 UDP|-|Partial|-|Yes|Yes|
|IPv6 UDPlite|-|-|-|Yes|Yes|
|IPv6 RAW Sockets|-|-|-|-|Yes|
|SCTP|-|-|-|-|Yes|
|Firewall|-|-|-|Yes|Yes|
|IPVS|-|-|-|-|Yes|
|SYNPROXY|-|-|-|-|Yes|
|Traffic Accounting|-|-|-|-|Yes|
|Quality of Service|-|-|-|-|Yes|
|Wireguard VPN|-|-|-|-|Yes|
|OpenVPN|-|-|-|-|Yes|
|List all sockets live|-|Yes|-|-|Yes|
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|1/31|9/31|2/31|14/31|30/31|

- Dynatrace and Instana do not provide much information about the Networking stack.
- Datadog provides aggregates for IPv4 and IPv6.
- The actual list of sockets a system, its processes and its containers have, are only listed by Datadog (with the Network Performance add-on, at $5 per node per month), and Netdata (included).

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
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|7/20|6/20|5/20|9/20|20/20|

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
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|0/15|1/15|0/15|0/15|15/15

This table surprised us too. We installed all monitoring solutions on an enterprise server with 256 cores and 1TiB RAM, running hundreds of LXC containers and VMs. Nothing related to the hardware was detected by any solution except Netdata.

We searched on their integrations lists to find something related. We found UPSC and APC UPSes in Datadog (we didn't try them). Also on Datadog we found an integration called "Hardware Sentry" which is a 3rd party company that requires an independent subscription in order to be used.

For Grafana, we know that there are numerous 3rd party provided Prometheus exporters capable for providing such information, but the "Connections" list at Grafana Cloud did not list them, did not suggest them and did not provide instructions on how to use them. The only hardware related connection we found at Grafana Cloud is "RaspberryPi", which however installs an agent to collect system metrics, not hardware sensors.

Netdata on the other hand, collects information from **all sensors** and **all hardware components**, and it has a special handling for monitoring **hardware errors**: Modern Linux systems expose thousands of metrics related to hardware errors. But these counters are just zero on healthy systems. So, instead of collecting, storing and visualizing all these zeros, Netdata collects them, but as long as they are zero it ignores them. If any of them is non-zero, then a chart will appear and an alert will be associated with it, indicating the hardware error found. This way Netdata monitors all hardware sensors and components, without affecting retention or visualization, until they are useful.

## Alerts

TBD

## Dashboards

All monitoring solutions provide some dashboards for **single-node monitoring**, although to a varying degree each.

Only Netdata has a policy that every metric collected is correlated and visualized by default.

Most other solutions provide some kind of a metrics list that can be used to find what metrics are available. Even in this case, only Datadog provides enough information to understand the cardinality quickly. For all others, the users are expected to perform queries to understand cardinality before they actually use the metrics.

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Automated Dashboards for all metrics|-|-|-|-|Yes|
|Automated Dashboards for a single system|Partial|Partial|Partial|Partial|Yes|
|Automated Integrated Dashboards for all systems|-|Partial|-|-|Yes|
|Automated Dashboards for single Applications|Partial|Partial|Partial|Partial|Yes|
|Automated Dashboards for multi-node Applications|-|Partial|-|-|Yes|
|Metrics Explorer|Yes|Yes|-|Yes|Yes|
|Custom Dashboards|Yes|Yes|-|Yes|Yes|
|Advanced Custom Charts without using a Query Language|-|-|-|-|Yes|
|Dynamic Custom Dashboards<small><br/>slice custom dashboards with dashboard-level filters</small>|-|Yes|-|Yes|Partial|
|Advanced Statistical Functions on custom charts|Yes|Yes|-|-|Partial|
|Multi-y-axis Custom Charts|Yes|Yes|-|Yes|-|
|Custom charts from logs|-|Yes|-|-|-|-|
|Custom charts from processes information|Yes|-|-|-|Yes|
|Custom charts from sockets information|-|-|-|-|Yes|
|Anomaly rates on all charts|-|-|-|-|Yes|
|Metrics Correlations|-|Yes|-|-|Yes|
|Search for anomalies across all metrics|-|-|-|-|Yes|
|PLAY mode to update visualization in real-time|-|-|Yes|-|Yes|
|Coverage<br/><small>Yes = 1<br/>- = 0<br/>anything else = 0.5</small>|5/18|9/18|2/18|5/18|15/18|


<details><summary>👉 Click here to see comments per provider...</summary>

### Dynatrace

The default dashboards provided by Dynatrace are basic without much interactive control. Still, the single node dashboards are well thought and provide a good summary. Multi-node dashboards are not provided, but there are a few charts is some sections that provide some limited view on multi-node information.

We found the custom dashboards of Dynatrace confusing and hard to use. The point-and-click functionality is so limited that is useless. Users have to learn Dynatrace's query language to take control of their charts.

For some strange reason, custom charts created show labels as UUIDs (we tried network interfaces, disks, processes, hosts, etc), which makes them awkward, without providing an easy way to reveal their names.

The metrics explorer provided, provides a lot of information per metric, but it misses the most important one: information about the cardinality of the metrics (i.e. how many time-series each metric has, based on what attributes). This means that you have to query each metric in a way to understand its cardinality, and then perform the query you need. Also, the metrics explorer lists a lot of information that is not available in your environment. It is like Dynatrace tried to list everything that they can potentially collect, independently of whether it is available or not.

When editing custom charts, the metric selector provides friendly names for the metrics, but these names are frequently overlapping to each other. For example "Bytes Received" is listed for hosts, network interfaces and processes. So, you have to select each of them to get additional information and find the one you need.

When slicing and dicing metrics in custom charts, Dynatrace does not provide any contextual information. For example, when you filter for processes, you have to know the process names. There is no auto complete to help you understand what is available.

### Datadog

The default dashboards provided by Datadog are basic. Datadog provides some multi-node dashboards, however these are also quite limited and probably serve as a quick access for users to copy and customize.

Creating custom dashboards with Datadog is a more pleasant experience compared to Dynatrace. Datadog has solved all the problems that still exist in Dynatrace, so it provides a smoother, faster and easier experience for users.

It is interesting that Datadog allows creating charts that combine metrics and values extracted from logs. So, you can create a chart that has dimensions from both metrics and logs in the same chart. However, the information available in Processes, or Network Performance (sockets) is not available in custom dashboards. So, while you can extract metrics from logs, you cannot chart for disk I/O, memory, CPU utilization, etc of processes or sockets. This seems contrary to the promise for "integrated" tools that is advertised.

The labels provided are limited. For example we couldn't filter by physical or virtual network interfaces, disk type, make or model, etc.

### Instana

The out of the box dashboards of Instana are basic and mainly limited to single nodes or single containers.

For custom dashboards, Instana uses the idea of "Application Perspectives".

Unfortunately, the UI did not help us to successfully create such application perspectives. It required values, without providing any contextual help on what we could write there. So, after spending some time on this feature, we gave up without completing the task.

Another very confusing fact about Instana, which is also true to some degree for Dynatrace, is that the UI lists of items about all things the system supports, without filtering the ones we actually have available. This strategy provided very long lists of things, without helping us understand what applies to your infrastructure and what is not.

### Grafana

Grafana is well known for being a Swiss-army knife for visualization. However, the default dashboards provided by Grafana are basic.

The query editor of Grafana is very close to the one provided by Datadog and provides a straightforward experience with contextual help in every step.

Still, a lot of metrics are missing and even the ones available are usually missing important labels that could provide more power to the platform.

### Netdata

Netdata provides fully automated dashboards for all metrics. Every metric collected is correlated and visualized in one of the sections provided out of the box.

All Netdata charts provide filtering capabilities for nodes, instances, dimensions and labels. We call this the NIDL bar and it serves 2 purposes:

1. Allow users to understand where the data are coming from. So, the NIDL bar provides drop down menus explaining the contribution of each data source to the chart.
2. Allow users to filter these data sources (slice the data) using any of the NIDL attributes (nodes, instances, dimensions and label keys and values).

On every chart, there are additional controls to:

1. Re-group the data on the chart using any of the possible combinations, even using multiple groupings concurrently (dice the data).
2. Change the aggregation functions (across time and across time-series) to achieve the desired result.

At the same time, anomaly rates are available on all NIDL drop-down menus and the anomaly ribbon of the chart, which shows the overall anomaly rate of the query across time.

The info ribbon at the bottom of all charts provides information about missing data collection points, or overflown counters, across time. Netdata works at a beat. Missed data collections are not filled at visualization time. They are maintained as gaps and when data are aggregated  into charts, the info ribbon provides information about the gaps encountered on all time-series involved, across time.

Users can create custom dashboards by dragging and dropping the provided charts into new pages and then re-arrange them, resize them and change their visualization type. This eliminates the need for a metrics explorer (the default dashboards serve this purpose) and metrics selectors (the default dashboards have full text search filtering capabilities), for creating custom dashboards.

Netdata allows segmenting the infrastructure into rooms and even within each room it provides global filters to allow segmenting all the dashboards at once, including custom dashboards. This makes dashboards a lot more dynamic, capable of visualizing different aspects of the infrastructure at a click.

Netdata's data collection to visualization latency is less than 1 second, and the global date-time picker supports a PLAY mode, allowing users to feel the "breath" of their infrastructure in real-time.

</details>

## Synthetic Monitoring

TBD

## Artificial Intelligence

### Dynatrace

Dynatrace advertises Davis AI as its artificial intelligence solution. Davis is frequently mentioned throughout the UI, providing assistance in various places.

However, based on our experience with the system, Davis seems more like a sophisticated expert system that uses several hard-coded rules and correlations to detect issues, and less than a strictly speaking "machine learning engine".

Of course Davis seems very valuable and is able to detect many common issues, however the same kind of issue detection is achieved by Netdata stock alerts (the out-of-the-box alerts Netdata provides), which do not use AI by default.

On the UI, when building custom dashboards, Dynatrace provides forecasting and anomaly detection, when asked to do so (is is a manual action). This looks more like a dashboard feature (i.e. perform some statistical analysis on the visible data), than real machine-learning training models in the background.

### Datadog

Datadog provides outlier detection and forecasting functions to custom charts. However both seem to be based on statistical functions, not real machine learning running in the background.

There is a feature called "Watchdog", which according to the documentation is based on machine learning. However, the way this works and is presented, resemble more of some kind of statistical analysis. Of course its findings are valuable. It is just that it does not seem to be machine-learning.

The documentation also mentions that the "Watchdog" is part of the APM package.

### Instana

Instana documentation and marketing material mentions machine learning, but we didn't find it anywhere while using the product.

### Grafana

Grafana provides machine learning as part of their Alerts & IRM features. The feature requires from users to define metrics for which machine learning models will be trained and then used for outlier detection or forecasting.

The good about it is that is can be used to train machine learning models on multiple data sources, even SQL queries. However, the whole feature set is limited to whatever create manually.

### Netdata

Netdata trains multiple machine learning models to learn the patterns of each metrics. These machine learning models are then consulted in real-time, during data collection, to detect if the sample collected is an outlier or not.

The result of this outlier detection is stored in the database, with the sample value.

When Netdata queries metrics, it automatically calculates the anomaly rate of each of the points presented on the dashboard. This anomaly rate is the percentage of samples found anomalous, versus the total number of samples aggregated to that point. So, it ranges from 0% to 100%.

Since anomaly rates are stored in the database, Netdata can query the past and reveal the anomaly rates the samples have, with the models as they were at the time the samples were collected.

Anomaly rates are used everywhere on the Netdata dashboards. Every chart has an anomaly ribbon that shows the overall query anomaly across time. Every facet of the query, including nodes, instances, dimensions and labels are also reported with their anomaly rates, which is visualized at the NIDL drop-down menus (slicing and dicing controls) each chart has.

Anomaly rates are also used to annotate the table of contents of Netdata dashboards, to quickly spot the most anomalous sections, for any given time-frame, and also with a feature called "Metrics Correlations" to filter the entire dashboard based on anomaly rates.

Netdata also computes a "node level anomaly score". This is the percentage of the metrics of a node, that were anomalous at the same time. It reveals the inter-dependencies of metrics. Anomalies across metrics happen in clusters because the metrics of a system are interdependent, so a slow disk will affect I/O throughput and IOPs, which will affect the throughput of the database running on this system, which will affect network traffic, affect CPU utilization and so on. So, the "node level anomaly score" can indicate how "severe" an anomaly is. 

Netdata provides a special tool to deal with node level anomalies: "anomaly advisor". This tool provide a multi-node dashboard of the node level anomaly scores of all the nodes. This reveals interdependencies across nodes. So, a slow database will affect the throughput, the network traffic and CPU utilization of an application server, which will affect similar metrics on a load-balancer, and so-on. The anomaly advisor can reveal these interdependencies and also drill down to reveal the most anomalous metrics across all nodes for any given time-frame.

## Resolution & Retention

Each monitoring provider has its own unique strategy when it comes to resolution and retention. Let's see them.

### Dynatrace

Dynatrace collects metrics **per-minute** and keeps retention in tiers, for **up to 5 years**, as shown below:

Resolution|Duration|
:---:|:---:|
per minute|14 days
every 5 minutes|28 days
per hour|400 days
per day|5 years

### Datadog

Datadog collects metrics **every 15 seconds** and keeps them in **full resolution for 15 months**.

### Instana

Instana collects metrics with many different resolutions. The exact data collection frequency for each metric is hard-coded into it.

It collects metrics **per second, every 5 seconds, every 10 seconds and every minute** and keeps them in tiers for **13 months**, as shown below:
 
Resolution|Duration|
:---:|:---:|
1, 5 and 10 seconds|24 hours
per minute|1 month
every 5 minutes|3 months
per hour|13 months

### Grafana

Grafana supports variable resolutions, but the default for `grafana-agent` is **per minute**. It keeps the samples for **13 months**.

Keep in mind that collecting metrics more frequently, affects billing.

### Netdata

Netdata is the only solution that keeps retention at the edge, even when the SaaS service is used.

Users can control the retention they need by dedicating disk storage to their agents. When Netdata Parents (centralization points) are used, production systems can run with a very small retention (or no retention at all), and Netdata Parents will maintain retention for all the systems that push their metrics to them.

Netdata collects all metrics **per second**, unless the data source does not provide the metrics at that resolution, in which case Netdata adapts to the best resolution the data sources provide.

Netdata has very efficient disk footprint, and it usually works like this:

Resolution|Bytes per Sample|Storage|Duration
:---:|:---:|:---:|:---:|
per second|0.6|1 GiB| 12 days
per minute|5|1 GiB|80 days
per hour|30|1 GiB|2 years

So, by dedicating 3 GiB of storage space to each server, users get about 2 years of retention. Of course, these depend on the number of metrics collected.

Keep in mind that unlike other systems that lose detail when down-sampling the metrics into tiers, Netdata maintains the minimum, maximum, average, sum and anomaly rate of the original high-resolution samples, across all tiers. So, spikes and dives are not lost, even when the metrics are down-sampled. This is why the bytes per sample changes in tiers.

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
grafana-agent.service: CPU average 3.27%, RAM: 208.17MiB
netdata.service: CPU average 3.66%, RAM: 213.47MiB
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

We used the Netdata API to calculate the average rate for all of them. Dynatrace at 12.3 kbps, Datadog averages at 30.2 kbps, Instana at 16.1 kbps, Grafana at 15.3 kbps and Netdata at 0.3 kbps.

To calculate the monthly consumption we used:

```
monthly GiB = rate * 86400 / 8 * 365 / 12 / 1024 / 1024
```

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|:----:|:----:|:----:|:----:|:----:|:----:|
|rate (kbps)|12.3|30.2|16.1|15.3|0.3|
|monthly (GiB)|3.9|9.5|5.0|4.8|0.1|

As shown, Netdata does not really use any internet traffic. Since Netdata does not push the samples and the logs to Netdata Cloud, the only bandwidth used is when users are viewing these data. We measured the bandwidth used when users view the dashboards via Netdata Cloud and we found that each Netdata uses on the average 15 kbps per viewer, for the time the viewers use a dashboard the node participates.

## Pricing

Assuming a node that:

- runs 24x7
- generates about 2 GiB of logs (or about 500k log entries) per month, retained for 30 days

All prices are updated Mar 8, 2024, and refer to monthly billing.

### Dynatrace

|Features|Pricelist|Monthly Price/node
|:---:|:---:|:---:|
|Infrastructure monitoring|$0.04 per hour per node|$29.2
|Application security|$0.018 per hour per node|$13.1
|Logs Management and analytics|Ingest: $0.20/GiB<br/>Retain: $0.0007/GiB/day<br/>Query: $0.035/GiB|$1.0

Total price per node: $43.3 per node per month

Dynatrace has also pricing for synthetic tests, kubernetes, and more.

### Datadog

|Features|Pricelist|Monthly Price/node
|:---:|:---:|:---:|
|Infrastructure Enterprise|$27/node/month|$27.0
|Network Monitoring|$7.2/node/month|$7.2
|Logs Management|Ingest: $0.10/GiB<br/>Retain: $3.75/million entries/month|$2

Total price per node: $36.2 per node per month

Datadog provides a lot more tools, each with each own pricing. Synthetic monitoring is an extra.

### Instana

Instana publishes volume discounts. The single node price for Infrastructure nodes starts at $20.6 per node per month, with a minimum of 10 nodes.

If APM is needed, Instana pricing starts at 77.4 per node per month.

Instana does not support logs. It integrates with 3rd party services and systems for logs.

### Grafana

Grafana's pricing is based on Data Points per Minute (DPM). With the resolution tested of 1 DPM per metric and assuming 1k metrics per node (Netdata collects 3.5k metrics on the tested nodes), we have:

|Features|Pricelist|Monthly Price/node
|:---:|:---:|:---:|
|Metrics|$8/1k series/month|$8.0
|Logs Management|Ingest: $0.50/GiB|$2.0

Total $10 per node per month.

Grafana also charges for users $8 per user per month,  or $55 per user per month with access to Enterprise plugins. For users to access machine learning, IRM add-on is required, at $20 per user per month.

### Netdata

Netdata charges $6 per node per month, all features included.

Aggressive volume discounts are applied starting at 6+ nodes, which progressively lower the price down to $1 per node per month when having more than 5k nodes.

## Summary

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|Agent|Dynatrace<br/>OneAgent + ActiveGate|Datadog-Agent|Instana-Agent|Grafana-Agent|Netdata|
|Granularity|1-minute|15-seconds|1-second|1-minute|1-second|
|Retention|**5-years**<br/>in tiers|**15-months**<br/>at 15-seconds|**13-months**<br/>in tiers|**13-months**<br/>at 1-minute|**Unlimited**<br/>in tiers<small><br/>typically 3 GiB provide 2 years</small>|
|||||||
|**Coverage**|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|Logs|58%|58%|0%|58%|83%|
|Storage|35%|30%|25%|45%|100%|
|Networking|3%|29%|6%|45%|100%|
|Containers & VMs|27%|28%|33%|16%|100%|
|systemd Services|39%|33%|0%|11%|100%|
|Processes|50%|68%|23%|5%|80%|
|Hardware & Sensors|0%|7%|0%|0%|100%|
|Dashboards|28%|50%|11%|28%|83%|
|||||||
|**Resources**|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|CPU Usage<br/><small>100% = 1 core</small>|3.63%|8.35%|4.14%|3.27%|3.66%|
|Memory Used|414 MiB|921 MiB|566 MiB|208 MiB|213 MiB|
|Egress Internet Traffic<br/><small>per node per month</small>|3.9 GiB|9.5 GiB|5.0 GiB|4.8 GiB|0.1 GiB|
|||||||
|**Overall**<small><br/>for infra monitoring</small>|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|Out of the box functionality|High<small><br/>Davis AI alerts, logs</small>|High<small><br/>processes, sockets</small>|Low|Low|Excellent<small><br/>dashboards, alerts, logs</small>
|Learning curve|Average|Average|Average|Steep|Minimal|
|Power|Average<small><br/>no sockets</small>|High|Low|Average<small><br/>no processes, no sockets</small>|High|
|Detailed|Low<small><br/>per-minute resolution, few metrics</small>|High<small><br/>15-seconds resolution, processes, sockets</small>|Low<small><br/>too few metrics and integrations</small>|Low<small><br/>per-minute resolution, too few metrics</small>|Excellent<small><br/>per-second resolution, all metrics, processes, sockets</small>|
|Integrated|High|High|Low|Low|High|
|Customizability|High|High|Low|High|High|
|||||||
|**Price**<small><br/>for infra monitoring</small>|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|per node per month|$43.3|$36.2|$20.6|$10|$6|
|extra charges|metrics, logs, advanced features|metrics, logs, advanced features|none|users, metrics, logs, machine learning|none|

## Verdict

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
2. The best resolution of 1-minute is really not enough for monitoring modern systems.
3. When creating custom dashboards, it is not easy to understand where the data are coming from, which makes you first do a query to understand the metrics (e.g. group by something) and once you know what data are there, then do the query you really need. Datadog solved this problem by providing cardinality information at the metric info. Still, the solution we have given to Netdata with the NIDL bar above each chart (for slicing and dicing) seems superior to all of them.
4. Despite the promise of experiencing AI, we didn't find any evidence of real machine learning running in the background. Davis seems more like a hard-coded expert system. It is useful, but not AI.
5. Complete lack of any multi-node dashboards out of the box. All the multi-node dashboards you need, you have to build them yourself.
6. This is an expensive service.

### Datadog

Datadog is a powerful platform. Despite the fact that they miss a lot of the information compared to Netdata, the UX gives freedom and power to users and for the things they monitor the dashboards deep dive into the information available, to provide a holistic view.

What we liked about Datadog:

1. The Datadog Network Performance is nice, although expensive. The Netdata network viewer we started last month, is still at its early stages, although we believe that soon we will be able to compete head-to-head with the Datadog one.
2. The tools are quite integrated, so processes, logs, network sockets, etc are all available in a contextual manner.
3. There are many integrations available.

What we didn't like:

1. Very limited coverage for infrastructure technologies, physical hardware and operating system services.
2. No alerts or problems detection out of the box. All alerts need to be configured manually.
3. Very limited support for monitoring operating system services (systemd-units).
4. Missing LXC containers and VMs (monitoring VMs from the host). Especially for VMs, it may be a business decision, since monitoring from the host may provide "enough" monitoring for some users, preventing them from registering all the VMs to the service.
5. Only few integrations get automated dashboards and in many cases many of the integrations that have dashboards, do not visualize all their information. For most metrics, dashboards need to be built manually.
6. This is an expensive service.

### Instana

Instana is probably the weakest of all the services we tested. The look and feel is very similar to the Dynatrace "classic" dashboards. We know that they provide strong support for monitoring IBM products (DB2, etc), so probably this monitoring solution is targeting this niche.

What we liked:

1. Instana and Netdata were the only solutions that detected short gaps in the VMs execution. So, we paused the VMs for 30 seconds. All the other monitoring solutions did not detect anything. Nothing happened as far as they are concerned. But for Instana and Netdata this was a major event and all the charts had gaps in them for the time the VMs were paused.

What we didn't like:

1. They don't support logs. They integrate with third party services for that.
2. The 1-second resolution is available for only 24 hours. This means that on Monday you cannot see in high resolution what happened during Saturday.
3. The metrics collected are quite limited.
4. Their ecosystem is not big enough. Most google searches reveal limited or no information from third parties.

## Grafana

Grafana has a vast ecosystem and community. Of course this ecosystem is available for all monitoring solutions to use, and all do one way or another.

To get a complete monitoring solution out of Grafana, users need to invest a lot in skills and time. Most of the dashboards provided by default are basic, so users are expected to configure the whole monitoring by hand. This ecosystem has a lot of moving parts, each with a different degree of maturity and flexibility, increasing significantly the overall cost of ownership.

What we liked:

1. Vast community.
2. Open architecture.

What we didn't like:

1. The default resolution of 1-minute for the Grafana agent was a surprise. Grafana knows that this is not enough for monitoring today's systems and applications, but probably it was needed for justifying the pricing (at higher resolution the service is more expensive).
2. Primitive default dashboards.
3. Too complex. Not for newcomers.

## Netdata

Since this our blog, I will prefer to describe what I learned from this journey.

### Holistic approach

Most monitoring solutions try to minimize the number of metrics they ingest by ignoring crucial information, avoiding certain technologies they don't see as important, or abstracting the information available.

Netdata is the only monitoring solution that is committed to monitor all infrastructure technologies available today, in full detail and resolution. All kernel features and stacks, all protocols, all layers, all technologies, without exceptions.

Of course Netdata can also work in higher levels, like they do, by collecting application metrics and logs from all available sources, applications, cloud providers and third party services. But while doing so, we keep our commitment to a holistic approach, maintaining all the information available from all the underlying technologies and layers.

### Decentralized & Distributed

All monitoring providers struggle with resolution and cardinality. They invest a lot of effort to minimize both of them, since these affect their cost proportionally. And even after all reductions and economies applied, their services are still expensive. 

When I started this post, I was expecting that Netdata will be the "heavier" among the agents. It has to be, because it does a lot more work. It is the only agent that is a monitoring solution by itself, it collects data per-second, stores the data in its own database, trains machine learning models for all metrics, queries these data, and many more, all happening right at the edge.

To my surprise, the Netdata agent is one of lightest! And given the resolution (per-second) and the number of metrics it collects, **it offers the best unit economics** (i.e. resources per sample) among all.

This proves that Netdata is on the right path. The decentralized and distributed nature of Netdata decouples resolution and cardinality from our economics, without pushing this cost to the users, allowing Netdata to be **the most cost efficient monitoring solution**, while also providing high fidelity observability without compromises.

### Out of the box

In this setup, Netdata was installed with default settings. The only change was to give to it the password for connecting to postgres. Everything else just happened, from logs and metrics, to dashboards and alerts. The stock alerts we ship with Netdata did their job, and triggered alerts for network interface packet drops, way before Dynatrace's Davis reported the same.

All monitoring providers see the value of providing out of the box experience, but only Netdata so far has applied this across the board, to all the information available.

All others depend on the users to create custom dashboards and structure them the way they see fit. But since Netdata visualizes everything by default, we have to present everything in a way that users can easily understand and use. Our presentation today is probably too flat compared to the others, and users occasionally report that Netdata dashboards are overwhelming for them. This is our next challenge. We need to improve, so that they are more contextual, presenting the information in layers, on a need-to-know basis. The good thing with Netdata is that it has a lot more information than the others, so it can go deeper and broader than them.

### Charts & Dashboards

I was also surprised to find out that Netdata charts and dashboards are actually a lot more usable and efficient than the others.

For most monitoring solutions, editing charts is a complicated and challenging task. How to provide to users all the aspect of a metric so that they can understand quickly what this metric is about, which sources contribute to it and how much? How to allow them describe what they need in an easy and straightforward way?

The NIDL bar Netdata provides above each chart, although it makes the UI a little more busy, it is far simpler, quicker and easier to use than any of the solutions the other monitoring providers offer. Users do not need to learn a query language and all the functionality needed is just a click away. Of course, to accomplish this kind of integration, we had to change the query engine, so that it returns all facets of the metrics with every response, but the result payed off. **Netdata charts are easier to grasp and use.**

I think the next version of our charts will also surprise users. We plan to offer an expanded version of the charts, providing fully automated analysis on each and every metric, based on its past patterns, at a click of a button.

### Artificial Intelligence

AI is a broad term. It is also trendy, so it is frequently abused for marketing purposes.

During the few days we spent on these solutions, we didn't see any evidence of real machine learning working in the background.

Grafana allows configuring machine learning for some of the metrics. This aligns with the DIY philosophy of Grafana, however it limits significantly its use.

Dynatrace and Datadog, probably use statistical functions and expert systems, not real machine learning.

Netdata is probably the only tool that uses real machine-learning at its core. The source code is open-source, so users can review it. And at the same time, we have made the most to reveal all ML findings everywhere on the dashboards. All charts have anomaly rates on them, the table of contents can provide anomaly rate per section, and we have added special tools to help users analyze the findings of machine learning.

I think our break-through is that Netdata managed to make machine learning lightweight. Of course, it doubles the CPU consumption of the agent (this test was done with ML enabled at Netdata - without ML Netdata would also be lightest in terms of CPU), but it spreads all processing across time and avoids CPU spikes. This provides affordable and reliable machine learning, running at the edge, for all the metrics collected.

###  Pricing

Netdata is cheaper not because it is inferior to the others. Netdata is superior is many aspects: full technology coverage, per-second granularity, amazing real-time functionality, lightweight and simple operations, machine learning for all metrics, powerful dashboards without learning a query language, and many more.

The design of Netdata changes the cost structure of monitoring! This allows observability to be a lot more cost efficient for both Netdata and its users, and therefore a lot more affordable for everyone!

We wanted this to be reflected to our pricing, so that our customers can enjoy the benefits of this design.

### Fun part

When working with monitoring systems side-by-side it is inevitable to notice a few strange coincidences.

So, here is what I noticed:

The single node dashboards of Instana follow the structure and the philosophy of the single node dashboards of Dynatrace. Since Dynatrace was first, I guess they got inspired by it (personally, I prefer the Dynatrace's ones).

But then, the "new" single node dashboards of Dynatrace follow the same structure and layout of the single node dashboards of Datadog, while the old ones are now named "classic". I guess they got inspired too (Datadog's are better).

So, today:

- Dynatrace has 2 versions. Since they keep them both, they probably don't like either.
- Instana can be considered "classic".

I don't know if the above are true or a coincidence, but anyway it was fun to realize...

PS: Note to self: Don't copy. Innovate. At least you will be authentic.

PS2: If there is something we always do in Netdata is exactly this: we innovate! Every aspect of Netdata is authentic and unique!

