---
slug: netdata-cloud-on-prem
title: "Netdata Cloud On Prem: How To Level Up Infrastructure Monitoring "
authors: shyam
description: Explore the future of on-premise infrastructure monitoring with our Cloud On-Prem. Achieve efficient monitoring, full security, and privacy compliance assurance
tags: [netdata, netdata cloud, on prem, on premises, infrastructure monitoring, monitoring]
keywords: [netdata, netdata cloud, on prem, on premises, infrastructure monitoring, monitoring]
image: https://github.com/netdata/blog/assets/24860547/7e503687-0472-44b0-bf6f-0bff40aeb517
---

![netdata-cloud-on-prem](https://github.com/netdata/blog/assets/24860547/7e503687-0472-44b0-bf6f-0bff40aeb517)

<!--truncate-->

We at **Netdata** understand that [infrastructure monitoring](https://blog.netdata.cloud/future-of-infrastructure-monitoring/) can be a complex maze—high costs, specialized skill sets, scalability, data silos, and more. That's why we have always aimed to streamline and modernize this critical operation. Today, we're thrilled to announce the launch of [Netdata Cloud On Prem](https://www.netdata.cloud/contact-us/?subject=on-prem), a ground-breaking solution designed for robust **on-prem infrastructure monitoring** - it comes with all the **Netdata Cloud** features you love but fully on prem.

## **Netdata Cloud On-Prem**

While [Netdata Cloud](https://www.netdata.cloud/) never stores any of your metric data on the cloud and just streams it ephemerally while you view a chart, the demand for on premise infrastructure monitoring has never been more pressing. Many large enterprises, governmental organizations, research institutes and critical infrastructures require a level of data privacy, security, and customization that only an on-prem solution can offer. 

A quick recap for the uninitiated, the Netdata ecosystem has two key components:

#### Netdata Agent
The Open-Source Netdata Agent provides most monitoring functions, including data collection, time-series database, alerts processing, machine learning, query engine, and exporting of metrics to third party systems. Netdata Agents are also used for creating multi-level metrics centralization points within the infrastructure, offloading production systems from monitoring resources.

#### **Netdata Cloud**
Netdata Cloud is the control plane of Netdata Agents. It adds role based access control (RBAC), infinite horizontal scalability, auditing, central control and dispatch of alert notifications and extensive customization and collaboration services (including custom dashboards), on top of Netdata Agents.

The Netdata Agent would always run on your premises while (up until now) Netdata Cloud was hosted by us on our public cloud infrastructure. 

We have heard so many of our long-time users say that they wished that they could run Netdata Cloud on their own premises, and now, you can! 

There are entire industries, governmental organizations and critical infrastructure where On-Prem is not just a need but an imperative. At Netdata, we are serious when we say our vision is to empower those who troubleshoot the technology that runs the world and the team has been busy at work over the last few months making this a reality. 

## Why On-Prem monitoring? 

### **Data Privacy & Security**
For industries under stringent compliance regulations like GDPR, HIPAA, or FISMA, on-prem monitoring isn't a luxury; it's a necessity. Netdata Cloud On-Prem enables you to keep all your sensitive metrics within your own controlled environment, minimizing risks and satisfying compliance requirements.

### Control & Customization
Have specific monitoring needs? The on-prem version allows you to tweak and tailor your monitoring parameters, ensuring that the system aligns perfectly with your unique requirements. From custom dashboards to specialized alerts, take control of your monitoring landscape like never before.

### Cost-Effectiveness
While cloud solutions might seem economical initially, the costs can escalate with data volume and system complexity. Netdata Cloud On-Prem offers an economically sound alternative that can scale efficiently within your own premises.

### Enterprise-Grade Support
We understand that monitoring isn't the primary focus of your business or your team, which is why we offer professional services to help you get the most out of Netdata Cloud On-Prem. From setup to ongoing maintenance, our enterprise-grade support ensures that you can focus on what you do best.

## Who should consider switching to Netdata Cloud on prem?

### Large Enterprises
With infinite horizontal scalability, manage vast arrays of nodes without breaking a sweat.

### Governmental Organizations
When you have security protocols that are non-negotiable, on-prem monitoring is your go-to.

### Critical Infrastructure
Ensure real-time, high-speed data processing, and immediate action, crucial for mission-sensitive operations.

### Organizations with large, diverse and dynamic infrastructure
The Netdata Cloud On-Prem package is engineered to handle tens of thousands of nodes, making it ideal for companies with expansive network architectures.

### Teams that require Enterprise-grade support
Leverage our professional services to relieve the monitoring setup burden and focus on your core business operations.

## Technical Specifications

Netdata Cloud is a highly-available, scalable, microservices environment, based on Kubernetes. Netdata Cloud automatically scales to support an infinite number of nodes. The installation we run today, supports hundreds of thousands of concurrently online nodes, with tens of thousands of nodes being added, removed and modified daily.

Netdata Cloud On-Prem runs on a Kubernetes environment and comes embedded with all necessary services for a standalone operation. It requires the following open-source components:
- Kubernetes: The backbone for installing Netdata Cloud.
- PostgreSQL: Our main relational database.
- Elasticsearch: For audit logs, topology changes, and alert triggers.
- Pulsar: Our message broker for microservices communication.
- Email Service: Required for email notifications (SMTP or Sendgrid).

With the launch of Netdata Cloud On-Prem we're taking a big step toward empowering those who keep the world's technology running smoothly.

If you are interested in understanding more about Netdata Cloud On-Prem, or you’ve been waiting for it all these years, [we would love to hear from you](https://www.netdata.cloud/contact-us/?subject=on-prem).
