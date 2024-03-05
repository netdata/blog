---
slug: dynatrace-vs-datadog-vs-instana-vs-grafana-vs-netdata
title: "Dynatrace vs Datadog vs Instana vs Grafana vs Netdata!"
description: |
  Hands-on experience of the most popular monitoring solutions.
authors: costa
tags: [dynatrace, datadog, instana, grafana, netdata]
keywords: [dynatrace, datadog, instana, grafana, netdata]

---

# Dynatrace vs Datadog vs Instana vs Grafana vs Netdata

In this post we attempt to explore the value we get from various commercial monitoring services.

To measure it, we used trial subscriptions of Dynatrace, Datadog, Instana, Grafana and Netdata, for monitoring a couple of Ubuntu servers. Each of the servers:

1. Runs all monitoring solutions in parallel.
2. Runs 2 docker containers: a `nginx` and a `postgres`.
3. Runs 1 LXC container.

The goal of this exercise is to understand:

1. The value each monitoring solution provides out-of-the-box.
2. The resources required to do so.
3. The impact each solution has on the monitored infrastructure.

We use as a baseline Netdata, so most comparisons and comments are relative to what Netdata can do.

All providers, except Datadog, provide fully on-prem versions of their offerings. In this comparison however we used their SaaS versions.

## Installation and Configuration

All solutions use an agent that is to be installed on all monitored systems.

Users are expected to copy and paste a command from the UI, which includes various unique tokens, and paste them to the terminal of each server, or integrate it to their CI/CD or provisioning system, to install the agents in all monitored systems.

When it comes to configuration, monitoring solutions use 2 paradigms: a) Centrally, or b) At the edge:

- `Centrally` means that users are expected to configure data collection jobs and agent features from the UI, without the need to access the servers via ssh. This is usually preferred on environments where the infrastructure is static and can be easily managed centrally.
- `At the edge` means that users need to edit configuration files on each server to configure data collection jobs or agent features. This is usually preferred on environments that are automatically deployed, since users can use observability-as-code and maintain the configuration files in git repositories for version control and auditing.

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|----:|:----:|:----:|:----:|:----:|:----:|
|On-Prem Software|OneAgent +<br/>ActiveGate|Datadog Agent|Instana Agent|Grafana Agent|Netdata|
|Data Collection Configuration|Centrally|At the edge|At the edge|At the edge|Centrally* and<br/>At the edge|
|Alerts Configuration|Centrally|Centrally|Centrally|Centrally|Centrally* and<br/>At the edge|
|Users & Dashboards Configuration|Centrally|Centrally|Centrally|Centrally|Centrally|
|Dashboards Access|Centrally|Centrally|Centrally|Centrally|Centrally and<br/>At the edge|
|Internet Access Isolation|Full<br/>ActiveGate|Partial|Partial|Partial|Full|
|Dashboards without Internet Access|No|No|No|No|Yes

\* The central configuration of Netdata is currently in its final stages. It is planned to be released in Match 2024.

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

## Metrics

TBD

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

<details><summary>Click here to see comments per provider...</summary>

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

<details><summary>Click here to see comments per provider...</summary>

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
|CPU Usage|-|-|-|-|Yes|
|Memory Usage|-|-|-|-|Yes|
|Disk I/O|-|-|-|-|Yes|
|# of Processes|-|-|-|-|Yes|
|Status|Yes|-|-|-|Yes|
|Logs|Yes|Yes|-|Yes|Yes|
|List all units live<br/>`systemctl list-units`|Cached|-|-|-|Yes|
|List all services live<br/>`systemd-cgtop`|-|-|-|-|Yes|
Coverage|3.5/9|1/9|0/9|1/9|9/9|

- `Cached` means the feature is updated at the data collection interval.

<details><summary>Click here to see comments per provider...</summary>

### Dynatrace
![image](https://github.com/netdata/netdata/assets/2662304/09521ab0-700f-4b42-86c9-427e7ed37d2f)

### Datadog

Datadog does not monitor systemd services.

### Instana

Instana does not monitor systemd services.

### Grafana

Grafana does not provide a cloud connector for monitoring systemd services and units. There is a vast ecosystem around Grafana and probably monitoring systemd services can be accomplished via a 3rd party Prometheus exporter which via a Prometheus installation can push metrics to Grafana Cloud.

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
|Network Connectivity|Yes|Yes|-|-|-|
|Network Traffic|Abstract|Yes|-|-|-|
|Network Issues|Yes|Yes|-|-|-|
|# of Processes|Yes|-|-|-|Yes|
|# of Threads|-|Yes|-|-|Yes|
|# of File Descriptors<br/>(break down by type)|-|Abstract|Abstract|-|Yes|
|% of File Descriptors|Yes|-|Yes|-|Yes|
|Uptime|Yes|Yes|Yes|-|Yes|
|Logs|Yes|Yes|-|Yes|Yes|
|List all processes live|-|Yes|-|-|Yes|
|List all TCP/UDP<br/>processes sockets live|-|-|-|-|Yes|
|Coverage|8.5/17|10.5/17|4.5/17|1/17|14/17|

Notes:
- `Possibly` means that we tried it, the UI shown something relevant to it, but there were no values shown.
- `Partial` means that the information presented was limited compared to the others.
- `Abstract` means that the information presented was an aggregated summary compared to the others.

The above list typically evolves to a large cardinality for tracking every single process ever run. So, usually monitoring solutions group the information to reduce and control its cardinality.

| |Dynatrace|Datadog|Instana|Grafana|Netdata|
|:----:|:----:|:----:|:----:|:----:|:----:|
|Not aggregated, per PID|-|Yes|Yes<br/><small>(for select processes)</small>|-|Yes|
|Aggregated in process groups|Yes|-|-|-|Yes|
|User defined process groups|-|-|-|-|Yes|
|Aggregated per user|-|-|-|-|Yes|
|Aggregated per user group|-|-|-|-|Yes|
|Multi-node processes aggregations|-|-|-|-|Yes|

<details><summary>Click here to see comments per provider...</summary>

### Dynatrace

![image](https://github.com/netdata/netdata/assets/2662304/e0ab4044-9f3a-4d9b-906d-8b7ac2d16060)

### Datadog

![image](https://github.com/netdata/netdata/assets/2662304/b56ac730-3f21-4ba2-ad6b-0565d017ffee)

Datadog has a special package for detailed Network Monitoring, charged $5 per node per month, on top of the normal monitoring package. Without this, it does not provide any network information for processes.

### Instana
Instana seems that it monitors the processes for which it has integrations. It does not provide any information about the other processes running on the system.

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



## Storage Monitoring

## Physical Hardware Monitoring & Sensors


## Alerts

## Dashboards

All monitoring solutions provide fully automated dashboards for **single-node monitoring**. So, for exploring the most common metrics for a single-node at a time, they present dashboards without any additional actions from users.

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
grafana-agent.service: CPU average 3.27%, RAM: 558.17MiB
netdata.service: CPU average 3.66%, RAM: 356.47MiB
```

Datadog has 4 services, totaling 8.35% CPU and 920.52 MiB RAM.
`oneagent` is Dynatrace.

Note that Netdata runs with default settings. This means **per-second** data collection for **3k+ metrics**, **3 database tiers** all updated in parallel, and **machine learning** for all metrics collected.



### Egress Bandwidth

To monitor egress bandwidth for a single node, we used `tc` to match all traffic towards the internet, for each of the systemd services cgroups.

<details><summary>Click here to see how</summary>

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
|Agent|Dynatrace OneAgent + ActiveGate|Datadog-Agent|Instana-Agent|Grafana-Agent|Netdata|
|Granularity|1-minute|15-seconds|1-second|1-minute|1-second|
|Retention|**5-years**<br/>in tiers|**15-months**<br/>at 15-seconds|**13-months**<br/>in tiers|**13-months**<br/>at 1-minute|**Unlimited**<br/>in tiers|
|Metrics|333|168||340|3346|
|||||||
|**Coverage**|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|Logs|58.3%|58.3%|0%|58.3%|83.3%|
|Containers & VMs|26.6%|28.1%|32.8%|15.6%|100%|
|systemd Services|38.8%|11.1%|0%|11.1%|100%|
|Processes|50.0%|61.7%|26.4%|5.9%|82.3%|
|||||||
|**Resources**|**Dynatrace**|**Datadog**|**Instana**|**Grafana**|**Netdata**|
|CPU Usage<br/><small>100% = 1 core</small>|3.63%|8.35%|4.14%|3.27%|3.66%|
|Memory Used|**414 MiB**|**921 MiB**|**566 MiB**|**558 MiB**|**356 MiB**|
|Egress Internet Bandwidth|**3.68 GiB**<br/>per node per month|**7.73 GiB**<br/>per node per month|**4.94 GiB**<br/>per node per month|**3.99 GiB**<br/>per node per month|**90 MiB**<br/>per node per month|
