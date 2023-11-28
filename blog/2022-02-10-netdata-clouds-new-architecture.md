---
slug: netdata-clouds-new-architecture
title: "Netdata Cloud’s New Architecture"
description: "To give you the best experience of our Cloud, we started migrating nodes running on the old architecture to the new one. Learn more in our blog today."
image: /img/wp-archive/uploads/2022/03/New_arch_notification.jpeg
tags: [product,architecture,deployment-strategies]
keywords: [netdata,product,architecture]
authors: team
---

<!--truncate-->

<figure class="wp-block-image size-full"><img class="wp-image-16154" src="/img/wp-archive/uploads/2022/03/New_arch_notification.jpeg" alt="" /></figure>

In version v1.32 of Netdata, we announced a remarkable new update that we are extremely proud of; Netdata Cloud now runs on the most reliable and stable backend that we’ve ever built. 

## Migration to the new Netdata Cloud architecture

To give you the best experience of Netdata Cloud, we started migrating nodes running on the old architecture to the new one. Most users don’t have to take any action on their part. If you need to take action, you will see the pop-up window above in Netdata Cloud.  

## Get ready for the new architecture

Let’s look at what you need to do to ensure that your nodes are still reachable after <strong>15</strong><strong>th of March 2022</strong>. To determine what steps you need to take, you need to <strong>check what type of installation you have</strong>.

Starting with Netdata v1.33.0, you can use Netdata itself to determine the installation type by running: <code>netdata -W buildinfo | grep 'Install type:'</code>

If you are using an older version of Netdata, or the above command produces no output, you can run our one-line installation script in <strong>dry-run mode</strong> to attempt to determine what method to use to update by running the following command:
<code>wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh &amp;&amp; sh /tmp/netdata-kickstart.sh --dry-run</code>

Note that if you installed Netdata using an installation prefix, you will need to add an --install option specifying that prefix to make sure it finds the existing install.


The value of <code>INSTALL_TYPE</code> indicates the type of installation.


<strong>Static build or Docker installation</strong>

If you use Netdata in <strong>Docker</strong>, or have installed Netdata as a <strong>static</strong> build, for example, by using the kickstart script:


•  Update your Netdata agents to the latest version<br />   📄 <a href="https://learn.netdata.cloud/docs/agent/packaging/installer/update">Update Netdata</a>


<strong>*-build </strong><strong>installation<br /></strong>Because the new architecture of Netdata Cloud relies on protobuf:


• Update your Netdata agents to the latest version<br />  📄 <a href="https://learn.netdata.cloud/docs/agent/packaging/installer/update">Update Netdata</a>
• Install a C++ compiler<br />If you still encounter issues, check if your node meets all <a href="https://learn.netdata.cloud/docs/agent/packaging/installer/methods/source#required-dependencies">requirements</a> for Netdata Cloud.

<strong>binpkg-* </strong><strong>installation</strong>

Binpkg type of installations should not experience any difficulties with the new architecture. If you run into an error:

• <a href="https://github.com/netdata/netdata/issues/new?assignees=&amp;labels=bug%2Cneeds+triage&amp;template=BUG_REPORT.yml&amp;title=%5BBug%5D%3A+">File a bug on GitHub</a>

<strong>Other installation methods</strong>

As per Netdata’s <a href="https://learn.netdata.cloud/docs/agent/packaging/platform_support">platform support policy,</a> there are packages that are not maintained by us. If a community-maintained package isn’t compatible with the new architecture:

• File a bug with the appropriate package maintainer

## Why we built a new architecture

Our motivation to overhaul the Netdata Cloud backend was to build a sleek, reliable foundation for all the exciting features we have planned ahead. The architectural changes allow us to deliver new features, such as <a href="https://learn.netdata.cloud/docs/metrics-storage-management/enable-streaming">parent-child relationships</a> and improved alert handling. 

## Goodbye Legacy Agent Cloud Link (ACLK). Say hello to the next generation ACLK

Along with an overhauled backend, we also updated the Agent Cloud Link, which lets you connect nodes to the Netdata Cloud. ACLK-ng (new generation) is up to 4x faster than ACLK legacy. Since we introduced ACLK-ng back in v1.30, we deprecated the ACLK<a href="https://github.com/netdata/netdata/releases/tag/v1.33.0#deprecation-notice"> legacy</a> in v1.33 of Netdata.

## Switching from JSON to Protocol Buffers (protobuf)

We’re constantly looking for ways to make Netdata Cloud even faster and work as seamless as possible with the Netdata Agent. In the past, we’ve used JSON to transmit metadata between nodes. However, making the switch to <a href="https://developers.google.com/protocol-buffers">protobuf</a> allows us to leverage high speeds and reliability because of its message format and schemas. Another benefit: protobuf uses less bandwidth than its predecessor.

We hope you are just as excited as we are for the switch to the new architecture. While you can already enjoy benefits like lightning speed and extreme reliability, we have created a solid foundation to make your troubleshooting experience even more fun. In our upcoming releases, you will get access to an enhanced alert management experience.
