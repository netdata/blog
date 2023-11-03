---
slug: netdata-best-practices
title: "Netdata Best Practices: Optimizing Your Monitoring Setup"
description: "Learn Netdata's best practices for setup, alerts, and rapid troubleshooting. Optimize your infrastructure monitoring setup today."
image: https://github.com/netdata/blog/assets/139226121/9e8c428f-fc67-44a5-a3c8-82e0888a53d3
tags: [netdata, best practices, installation, deployment, optimization, optimize, retention, alerts, anomalies, ml]
keywords: [netdata, best practices, installation, deployment, optimization, optimize, retention, alerts, anomalies, ml]
---

![Netdata Best Practices](https://github.com/netdata/blog/assets/139226121/9e8c428f-fc67-44a5-a3c8-82e0888a53d3)

Effective **system monitoring** is non-negotiable in today's complex IT environments. Netdata offers real-time performance and health monitoring with precision and granularity. But the key to harnessing its full potential lies in the optimization of your setup. Let’s ensure you are not just collecting data, but doing it in the most optimal way while gaining actionable insights from it.

<!--truncate-->

The starting point for optimization is a robust setup. Netdata is engineered for minimal footprint and can run on a wide range of hardware—from IoT devices to powerful servers. Time for a deep dive into each of these key areas and what the best practices you should follow, if you are serious about monitoring and optimizing your Netdata monitoring setup:

1. Installation
2. Deployment
3. Optimization
4. Data Retention
5. Alerts & Notifications
6. Rapid Troubleshooting 

## Installation

1. **Choose the Right Installation Method for Your Environment**
   - Evaluate your system's architecture, permissions, and environment to select the best installation method. For most Linux systems, the [one-liner kickstart script](https://learn.netdata.cloud/docs/installing/one-line-installer-for-all-linux-systems) is recommended due to its simplicity and thoroughness. However, for environments with strict security policies or limited internet access, a [manual installation from source](https://learn.netdata.cloud/docs/installing/build-the-netdata-agent-yourself/compile-from-source-code) or using a [package manager](https://learn.netdata.cloud/docs/installing/native-linux-distribution-packages) may be more appropriate.

2. **Opt for Automatic Updates, Unless Policy Dictates Otherwise**
   - By default, enable automatic updates to ensure your monitoring solution benefits from the latest features and security patches. If your organization has stringent change management processes or compliance requirements, [opt-out of automatic updates](https://learn.netdata.cloud/docs/maintaining/update-netdata-agents#control-automatic-updates) and establish a regular, manual update routine that aligns with your maintenance windows.

3. **Select the Appropriate Release Channel Based on Your Risk Profile**
   - Consider your organization's tolerance for risk when choosing between [nightly and stable releases](https://learn.netdata.cloud/docs/installing/one-line-installer-for-all-linux-systems#release-channel). Nightly builds offer the latest features but carry a minimal risk of introducing unanticipated issues. Stable releases, while less frequent, provide a more cautious approach, suitable for production environments where stability is paramount.

4. **Ensure Proper Network Configuration for the Auto-Updater**
   - If utilizing the auto-updater, confirm that your network allows access to GitHub and Google Cloud Storage, as these are essential for the updater to function correctly. Proxies, firewalls, and security policies should be configured to permit the necessary outbound connections for the update process.

5. **Review Hardware Requirements and Adjust Accordingly**
   - Before installation, assess the hardware specifications against Netdata's requirements to ensure optimal performance. While Netdata is designed to run efficiently on various systems, tailoring it to your system's resources will prevent potential performance bottlenecks.

These guidelines are geared towards maintaining a balance between ease of installation, system security, and operational continuity.

For more information, please check out the [documentation on installation](https://learn.netdata.cloud/docs/installing/).

## Deployment

### Stand-alone Deployment
- **Small-scale applications**: This is suited for testing, home labs, or small-scale applications. It is the least complex and can be set up quickly to offer immediate visibility into system performance.
- **Initial setup**: It’s a perfect starting point to familiarize yourself with Netdata’s capabilities without the overhead of a distributed system.

### Parent – Child Deployment
- **Scalability**: This model allows you to scale your monitoring setup as you grow, centralizing data collection and retention.
- **Performance**: Offloading tasks like long-term storage, complex queries, and alerting to the Parent can optimize the performance of the Child nodes, which can be particularly useful in production environments.
- **Security**: A Parent – Child setup enhances security by isolating Child nodes, potentially limiting their direct exposure to external networks.

### Active–Active Parent Deployment
- **High Availability**: This setup aims at eliminating single points of failure by keeping data sets in sync across multiple Parents.
- **Failover**: Implementing a failover mechanism ensures that monitoring is maintained even if one Parent goes down.
- **Complexity vs. Resilience**: The trade-off here is increased complexity in configuration and resource use for the sake of resilience.

### Configuration Considerations
- **Security**: Make sure all streaming data is encrypted and authenticated. Given your role and expertise, you might want to consider additional security layers such as TLS for data in transit.
- **Data Retention and Storage**: Fine-tune the data retention policies based on the criticality of the data and the available storage resources, which you seem to have planned meticulously.
- **IoT Devices**: Given their limited resources, tailor the Netdata Agent configuration to minimize resource consumption.
- **Disaster Recovery**: For all deployments, especially Active-Active, ensure you have a clear backup and disaster recovery strategy that aligns with your organizational SLAs.
- **Alerting**: Fine-tuning alerting thresholds and deduplication settings is essential to avoid alert fatigue, especially in larger deployments.

### Further Considerations
- **Testing**: Before full-scale deployment, conduct thorough testing of each configuration to ensure it meets the load and performance expectations.
- **Documentation**: Maintain detailed documentation of your configuration changes and deployment architecture.
- **Automation**: As a technical product manager, leveraging infrastructure as code for deployment could facilitate scalability and maintainability.

### Recommendations
- **Deploy in Stages**: Start with a stand-alone deployment, proceed to a Parent – Child model, and then consider an Active–Active setup as your infrastructure grows and the need for high availability becomes paramount.
- **Performance Monitoring**: Actively monitor the performance of the Netdata Agents and Parents to ensure they are operating within the resource constraints of your devices.
- **Security Policies**: Review and regularly update security policies, especially if your deployment involves IoT devices, which can be potential entry points for security threats.

Here's a [detailed guide](https://learn.netdata.cloud/docs/architecture/deployment-strategies) about the different deployment options.

## Optimization

To optimize the performance of the Netdata Agent for data collection in a production environment, consider the following strategies:

1. **Use Streaming and Replication:**
   - This setup allows offloading the storage and analysis of metrics to a Parent node, which can be more powerful and not affect the production system's performance.
   - By doing so, you ensure that the data is synchronized across your infrastructure and that in the case of a node failure, you have the metrics available for post-mortem analysis.

2. **Disable Unnecessary Plugins or Collectors:**
   - Analyze which plugins or collectors are not required for your specific use case and disable them to reduce unnecessary resource consumption.
   - Keep in mind that if a plugin or collector does not find what it needs to collect data on, it exits, so disabling those actively collecting unwanted metrics would be the priority.

3. **Reduce Data Collection Frequency:**
   - By increasing the interval between data collections (`update every` setting), you reduce CPU and disk I/O operations at the cost of less granularity in your metrics.
   - For specific collectors where high-resolution data is not critical, adjust their individual collection frequency.

4. **Adjust Data Retention Period:**
   - If long-term historical data is not essential, consider reducing the duration Netdata stores metrics to free up disk space and reduce disk I/O pressure.
   - For IoT devices or child nodes in a streaming setup, a shorter retention period might be advisable unless historical data is crucial.
   - We will cover data retention in more detail in the next section.

5. **Opt for Alternative Metric Storage:**
   - Depending on the hardware constraints, considering an alternative database for metric storage that's more efficient in terms of I/O operations can be beneficial.
   - In a Parent-Child configuration, the child nodes could be configured to use the `memory mode` ram or save for a lighter footprint.

6. **Disable Machine Learning (ML) on Child Nodes:**
   - The ML feature consumes additional CPU resources. It can be disabled on child nodes to ensure that resources are dedicated to the essential tasks of the production environment.
   - Reserve ML capabilities for Parent nodes or systems where resources are less constrained.

7. **Run Netdata Behind a Proxy:**
   - Using a reverse proxy like NGINX can improve the robustness of connections and data transmission efficiency.
   - It can manage more concurrent connections and employ faster gzip compression, thus saving CPU resources on the agent itself.

8. **Adjust or Disable Gzip Compression:**
   - Gzip compression on the Netdata dashboard helps reduce network traffic but can increase CPU usage.
   - If the dashboard is not accessed frequently or network bandwidth is not a concern, consider reducing the compression level or disabling it.

9. **Disable Health Checks on Child Nodes:**
   - Offload health checks to Parent nodes to conserve resources on children nodes, simplifying configuration management.
   - This strategy focuses resources on data collection rather than evaluation.

10. **Fine-tuning for Specific Use Cases:**
    - Tailor the configuration to your specific hardware and use case, since default settings are designed for general use.
    - For instance, if running on high-performance VMs, you might opt for more granular data without significant resource impact.

Following these recommendations should lead to a more efficient Netdata deployment. If you'd like to understand more, please read the [documentation](https://learn.netdata.cloud/docs/configuring/how-to-optimize-the-netdata-agent-s-performance).

## Data Retention

Optimizing data retention in Netdata involves balancing between the resolution of historical data, the system's resource allocation, and the specific use cases for the data. Here are five best practices that could serve as guidelines:

1. **Define Retention Goals Clearly:**
   Before adjusting any settings, have a clear understanding of your retention needs. Consider how long you need to keep detailed data and what granularity is necessary. For instance, if you need high-resolution data for troubleshooting recent issues but only summary data for long-term trends, you can set up your storage tiers to reflect that.

2. **Use Tiered Storage Effectively:**
   Netdata’s tiered storage system allows you to define different retention periods for different levels of detail. Use this feature to store high-frequency data for a short period and lower-frequency, aggregated data for longer. Configure the tiers to balance between the resolution and the amount of disk space you're willing to allocate. For example, a common approach might be to retain highly detailed, per-second data for a few days, per-minute data for several weeks, and hourly data for a year or more.

3. **Optimize Disk Space Allocation:**
   Allocate disk space thoughtfully among the tiers. If you have a fixed amount of disk space, consider the importance of each tier’s data and allocate more space to the tiers that store the most valuable metrics for your use case. Remember, more space for Tier 0 means more high-resolution data, which is critical for short-term analysis.

4. **Manage Memory Consumption:**
   Be aware of the impact of data retention on memory usage. As retention requirements increase, so does the DBENGINE’s memory footprint. To manage memory effectively, monitor the actual usage closely and adjust the `dbengine page cache size MB` as needed to ensure that the DBENGINE does not consume more memory than is available, which can lead to system swapping or other performance issues.

5. **Regularly Monitor and Adjust Settings:**
   Monitor the performance and effectiveness of your settings regularly using the `/api/v1/dbengine_stats` endpoint. As your infrastructure grows and changes, so too will your metric volume and the effectiveness of your current retention strategy. Be proactive in adjusting settings to ensure your retention continues to meet your needs without unnecessarily consuming system resources.

When implementing these practices, always consider the nature of your data and its usage patterns. Some environments with highly ephemeral metrics, like those with many short-lived containers, may require different settings compared to more stable infrastructures..

For more information on updating your data retention settings, [read the documentation](https://learn.netdata.cloud/docs/configuring/optimizing-metrics-database/change-how-long-netdata-stores-metrics).

## Alerts

1. **Customize Alert Thresholds**: Adjust the thresholds for each alert based on the unique performance characteristics of your environment. Use historical data and patterns to set thresholds that accurately reflect normal and abnormal states, thus minimizing false positives and negatives.

2. **Dynamic Thresholds and Hysteresis**: Implement dynamic thresholds to adjust to your environment's changing conditions, and use hysteresis to prevent alert flapping. This ensures alerts are responsive to genuine issues rather than normal metric variability.

3. **Prioritize and Classify Alerts**: Clearly define the severity of alerts to differentiate between critical issues that require immediate action and warnings for events that are less urgent. This helps in managing the response times appropriately and prevents alert fatigue.

4. **Silence During Predictable Events**: Utilize the health management API to temporarily disable or silence alerts during scheduled maintenance, backups, or other known high-load events to avoid a flood of unnecessary alerts.

5. **Regular Reviews**: Regularly review and update your alert configurations to ensure they remain aligned with the current state and needs of your infrastructure. Keep your Netdata configuration files in a version control system to track changes and facilitate audits.

By focusing on these practices, you can enhance the efficiency and reliability of your monitoring system, ensuring that it serves as a true aid in the observability of your infrastructure.

The extensive [alerts documentation](https://learn.netdata.cloud/docs/alerting/health-configuration-reference) goes into everything you need to know about configuring alerts.

## Rapid Troubleshooting

Netdata's anomaly detection and metrics correlation features are great tools for rapid troubleshooting. 

1. **Utilize Built-In Anomaly Detection**: Leverage the out-of-the-box anomaly detection for each metric. Since Netdata uses unsupervised machine learning, it does not require labeled data to identify anomalies. This feature can save time and provide immediate insights into unusual system behavior without extensive configuration.

2. **Monitor Anomaly Indicators**: Keep a close eye on the anomaly indicators present on the charts and summary panels. The visual cues—shades of purple—are integral to quickly assessing the severity and presence of anomalies. Adjust your monitoring setup to ensure these indicators are clear and easily noticeable.

3. **Engage with the Anomalies Tab for Deep Dives**: When an anomaly is detected, use the anomalies tab for a granular inspection of the data. This feature is crucial for identifying the start of an anomaly within a specific metric or group of metrics and observing its potential cascading effect through your infrastructure.

4. **Metrics Correlation**: When running Metric Correlations from the Overview tab across multiple nodes, you might find better results if you iterate on the initial results by grouping by node to then filter to nodes of interest and run the Metric Correlations again. Run MC on all nodes. Within the initial results returned group the most interesting chart by node to see if the changes are across all nodes or a subset of nodes. If you see a subset of nodes clearly jump out when you group by node, then filter for just those nodes of interest and run the MC again. This will result in less aggregation needing to be done by Netdata and so should help give clearer results as you interact with the slider. 

5. **Choose the right algorithm**: Use the Volume algorithm for metrics with a lot of gaps (e.g. request latency when there are few requests), otherwise stick with KS2.

To explore all the options to configiure machine learning, you can read more in the [documentation](https://learn.netdata.cloud/docs/ml-and-troubleshooting/machine-learning-ml-powered-anomaly-detection).

## Go forth and optimize!

Ultimately, an optimized Netdata setup is a living system that demands attention and iteration. By fostering an environment where continuous review is part of the culture, your infrastructure will not just keep pace but set the pace in a landscape that is perpetually evolving. 

With Netdata's full suite of features finely tuned to your operational needs, your monitoring will not just inform you—it will empower you.

You can also start exploring a full-ready setup environment in one of our Netdata demo rooms [here](https://app.netdata.cloud/spaces/netdata-demo/rooms/all-nodes/overview#metrics_correlation=false&after=-900&before=0&utc=Europe%2FLisbon&offset=%2B0&timezoneName=Dublin%2C%20Lisbon&modal=&modalTab=&modalParams=&selectedIntegrationCategory=deploy.operating-systems&force_play=false&d8a4e0c5-7c79-4145-900e-83a9f06fcb6a--sidebarOpen-bool=true&d8a4e0c5-7c79-4145-900e-83a9f06fcb6a--chartName-val=menu_system).

Happy Troubleshooting!

