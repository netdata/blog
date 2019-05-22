---
title: "Introducing Netdata Cloud: our vision for distributed health and performance monitoring"
date: 2019-05-18
author: "Joel Hans"
cover: "netdata-cloud-announcement.png"
tags: ["Announcement"]
categories: []
draft: false
---

We’re thrilled to make the first official announcement about Netdata Cloud, our vision for the future of distributed health and performance monitoring. While [Netdata Cloud](https://netdata.cloud/account/sign-in) has been live since February, when we released [v1.12.0](https://github.com/netdata/netdata/releases/tag/v1.12.0) of Netdata’s open-source monitoring agent, we’ve waited until the product was a little more mature to let our monitoring community know about how it fits into the future of Netdata.

**We believe everyone should be able to build an extraordinary infrastructure.** The best way to do that is build products that developers, system administrators, and DevOps engineers learn and be more productive with every passing second.

Here’s how Netdata Cloud is going to make that possible.

<!--more-->

## What is Netdata Cloud?

The [open-source Netdata agent](https://github.com/netdata/netdata) is a distributed application. That means you can install many Netdata agents on all your servers, containers, and edge/IoT devices. 

By default, each Netdata agent stores only the metrics of the node on which it is installed and does not centralize metrics in real-time or as historical archives. Of course, there are ways to integrate Netdata with other monitoring solutions or using the streaming feature to configure points of centralized data.

We think of Netdata’s distributed nature as a feature, not a limitation. At the same time, we know that developers, system administrators, and DevOps engineers are always looking for better ways to access all their monitoring data without having to spend an inordinate amount of time on configuration.

We’re building Netdata Cloud to give users a way to bridge the gap between many distributed agents running concurrently. We want to improve how they view and take action on slowdowns, anomalies, or outages in their systems and applications. And we want to offer a single application that helps you navigate your infrastructure faster while maintaining the strength of our distributed agent.

That does not mean we’re building Netdata Cloud to centralize the metrics from an infrastructure of distributed Netdata agents. Instead, Netdata Cloud will leverage the metadata every Netdata agent is capable of streaming to create a web-based, SaaS experience that makes managing systems easier. You’ll be able to view the health and performance of entire infrastructures at a glance, receive alerts in one place, and dive into any agent with a simple search or click.

Netdata Cloud is more than a dashboard for your health and performance monitoring. It’s your solution to building extraordinary infrastructures by reacting faster to all sorts of anomalies. And it’s all based on Netdata’s famous real-time metrics, and it’s scalable from one to tens of thousands of Netdata-monitored nodes. 

In short: **Netdata Cloud is our vision for the future of distributed health and performance monitoring**.

### What features will Netdata Cloud offer?

By October 2019 we plan on rolling out the following new features for Netdata Cloud:

#### May

- Connect unlimited Netdata-monitored nodes to Netdata Cloud.
- View an aggregated view of known nodes, including alarms, a basic system overview, and services metrics.

#### July
- Create infinite Workspaces for different organizations or aspects of a single infrastructure.
- Join Rooms to collaborate with colleagues and more effectively solve ongoing performance and health issues.

#### September

- Receive alarm notifications from distributed Netdata agents in one place.
- Support for the distributed authentication of Netdata agents.
- Support for multiple authentication methods.

#### October

- Build custom dashboards within Rooms, including widgets (charts, badges, alarms, and more), templates to build custom dashboards, and timelines of an agent’s events.

Each of these features leverages metadata from each node’s monitoring agent and give users even more ways to better understand what happens to their systems and applications during slowdowns, anomalies, or outages.

We also firmly believe that the community around performance and health monitoring needs a hub where they can share and exchange their monitoring expertise. We plan on using the Netdata Cloud website and blog as the foundation of an open and freely-accessible resource for the community. We want to continue helping the community discover new and exciting ways to better act on changes to their systems and applications.

### How much does Netdata Cloud cost?

Netdata Cloud is free for every user.

We believe the best way to grow Netdata Cloud is to offer virtually unlimited value, for free, to Netdata’s core user base. That’s exactly what we’ve been doing with our open-source agent all this time. Our 38,000 stars on GitHub and 400,000 daily Docker pulls are proof this plan of attack is working. The last thing we want to do is penalize those who use Netdata Cloud the most and love the experience

That’s why Netdata Cloud will remain free for the vast majority of its users. For personal, home, and small- or medium-sized businesses (SMB), Netdata Cloud will always be free to use. Users will be able to connect unlimited nodes, add as many colleagues to their workspace as they’d like, build as many Rooms as they need, create infinite dashboards, and store all their incidents for a few days. 

We’re going to be able to offer all this value because Netdata Cloud takes advantage of the power of our open-source monitoring agent. Each node stores and processes all its own metrics, which means we don’t have to use expensive cloud resources to centralize vast quantities of data. 

> **You keep your data—Netdata Cloud just connects it all together.**

While Netdata Cloud will be free for the vast majority of users, we do have plans to provide even more value to enterprises that need complex features.

### Netdata Cloud’s future paid features

Large enterprises have unique real-time monitoring needs. They have thousands of servers and applications running concurrently, and are willing to pay for the complex features that help them make smarter, faster decisions about their infrastructure. We expect to create a paid tier of Netdata Cloud with a recurring, per-user pricing model that will unlock enterprise-focused features.

A few of these planned features include:

- Long-term storage of Netdata UI snapshots
- Active Directory integration for single sign-on
- Private service status pages
- Extended retention of alarms timelines
- Incident response toolkits
- Additional enterprise plugins and integrations
- Extended retention of chat messages

Again, we expect that the vast majority of Netdata’s users won’t need these features. Creating these two tiers will help us further fund the company’s efforts to deploy Netdata’s open-source agent on a massive scale and entirely for free.

### Who’s building Netdata Cloud?

Back in May 2018, we created Netdata, Inc. as the backing organization for Netdata’s monitoring agent. There were several reasons for this change, but most importantly, we recognized the immediate need to resolve one of our most pressing missed opportunities: A web application for monitoring an entire infrastructure, with any number of Netdata-powered nodes, all in real-time. To do that, we needed a framework for attracting investor interest, hiring new talent, and putting them to work building an even better Netdata.

Netdata, Inc.’s CEO is [Costa Tsaousis](https://github.com/ktsaou), the lead developer of Netdata’s open-source agent. He maintains ownership over the repository, its code, and the overall mission for the product. He is joined by [Chris Akriditis](https://github.com/cakrit) as the COO and [George Moschovitis](https://github.com/gmosx) as the CTO.

We’ve also begun the process of hiring new software, integration, systems development, and performance engineers to accelerate the pace at which we release new features, and we now have more than a dozen full-time staff members.

These new talents have already made significant contributions to the open-source Netdata monitoring agent, like [introducing Netdata Cloud in v1.12.0](https://github.com/netdata/netdata/releases), a new [stable release channel in v.1.12.2](https://github.com/netdata/netdata/releases/tag/v1.12.2), the [beta Helm chart for monitoring Kubernetes clusters in v.1.13.0](https://github.com/netdata/netdata/releases/tag/v1.13.0), and new [Helm charts for kubelet, kube-proxy, and coredns metrics in Kubernetes in v.1.14.0](https://github.com/netdata/netdata/releases/tag/v1.14.0).

### Can Netdata work without NetData Cloud?

Yes. The open-source monitoring agent can be installed on single systems or used to create aggregate dashboards of a larger infrastructure without NetData Cloud. NetData Cloud is entirely optional.

### Can I install netdata.cloud on-premises?

You will be able to, but it’s not quite ready. Please [let us know you’re interested](mailto:info@netdata.cloud) and we’ll let you know as soon as the on-prem version is ready.

### Can I host an instance of NetData Cloud for my company?

Yes, but not yet. If you’re interested, [let us know](mailto:info@netdata.cloud) and we’ll be in touch as soon as it’s ready.

## The future of Netdata will be both open- and closed-source

For years, the many contributors behind Netdata’s open-source agent have been committed to helping developers, system administrators, and DevOps professionals get a ton of value out of monitoring their systems, all for free. We’re not changing that.

**The Netdata monitoring agent will always be free and open-source (FOSS) software.**

We’ve even hired a handful of Netdata’s most prolific contributors to accelerate its development. Ilya Maschenko, Netdata’s second-most active contributor, will continue his amazing work of building data collection plugins. He’ll even accelerate the pace of his development under direction from Costa, Chris, and the rest of the Netdata team.

We have lots of incentive to continue releasing new free features and making the agent faster and more lightweight. If the agent is more immediately useful for developers, system administrators, and DevOps engineers of all skill levels, then we’ll see installations continue to grow. With more installations, we’ll in turn see more sign-ups for Netdata Cloud. And as the agent gains features, everyone who also uses Netdata Cloud will instantly get more value from the entire package.

The two will grow together as they improve together.

**Netdata Cloud will be closed-source, but entirely free for all users for the foreseeable future.**

Because we’re developing the application and paying for its implementation, we need to stay in control of how it’s built and released to the world. We have an aggressive roadmap for new features and several smart engineers working to make Netdata Cloud the best performance and health monitoring solution that leverages Netdata’s famous real-time metrics.

We’ll be sure to update the community when we have a roadmap to deploy any of the paid enterprise-level features within Netdata Cloud and give more information about the pricing structure.

To reiterate:

1. **There will never be a closed-source version of the agent.** All code related to the monitoring agent will forever be free and open-source.
2. **We will continue to rapidly develop the open-source Netdata agent.** Netdata Cloud gets stronger with a more feature-rich agent, and all of Netdata’s users will benefit, whether or not they use the Cloud product.
3. **You don’t need to use Netdata Cloud.** The monitoring agent will always be distributed in nature and does not “speak” to Netdata Cloud by default. Each node will always store its own metrics.
4. **Netdata Cloud will always be free for the vast majority of Netdata’s users.** The features and scale of service that enterprises need, and are willing to pay for are far greater than personal, home, and small business Netdata usage.
5. **Our No. 1 priority is to get more people to install Netdata’s monitoring agent on more machines.** We won’t be happy until it’s installed on every headless machine in the world. Offering people a powerful, distributed, but also simple and effective monitoring experience is the best way to get them to fall in love with Netdata and build exceptional infrastructures.

## Onward to the distributed future of performance and health monitoring

We’ve already put out more releases of the Netdata agent this year than we did in all of 2018. That’s the power of this new, growing team. And that’s what to expect for the months to come. We’re working hard to make both Netdata’s open-source monitoring agent and its SaaS companion in Netdata Cloud the most powerful real-time monitoring solution available.

And before we sign off, a big thanks to the community that’s helped make Netdata so powerful. Their contributions are essential to our mission of helping people build extraordinary infrastructures. We’re thrilled that Netdata is used every day by hundreds of thousands of users, including those at Amazon, Google, IBM, Microsoft, Nvidia, and others, but it’s the strength, kindness, and generosity of this community that keeps us going.

We’re excited to commit more of our efforts toward this community, help nurture its continued growth, and make Netdata the best performance and health monitoring solution out there.
