---
title: "Navigating and using Netdata Cloud's Nodes view"
summary: "Our new Nodes view allows you to view dozens or hundreds of Netdata agents in a single interface. Because it's powered by Netdata Cloud, it's a secure and simple way to scale out your monitoring infrastructure."
date: 2019-06-13
author: "Joel Hans"
cover: "using-netdata-nodes-view.png"
tags: ["How-to"]
categories: []
draft: false
---

As of v1.15.0 of Netdata, and in conjunction with our announcement post about the [future of Netdata](https://blog.netdata.cloud/posts/netdata-cloud-announcement/), we have enabled an entirely new way to view your infrastructure using Netdata: the **Nodes view**. 

This view, powered by Netdata Cloud, allows you to view and interface with any number of distributed Netdata agents. That gives sysadmins and DevOps engineers the power to make smarter, faster decisions about their machines with far less complexity. Nodes is all the real-time health and performance data for your entire infrastructure in one place.

Let's dig in to navigating and using Netdata Cloud's Nodes view for the first time.

<!--more-->

> <span style="color: #17CE8A;">**Beta!**</span> The Nodes view is currently in beta, so all typical warnings about beta software apply. You may come across bugs or inconsistencies.
> 
> The current version of Nodes uses the API available on each Netdata agent to check for new alarms and the machine's overall health/availability. In the future, this process will work the other way around: Netdata agents will push their status, in real-time, to Netdata Cloud. With this flow of data, the Nodes view will constantly receive updated information about your agents without any polling the API.


## An overview of Netdata Cloud's Nodes view

Before you can access the Nodes view, you need to sign in to your Netdata Cloud account.

To do that, click on the `Sign In` button on the top-right corner of your Netdata dashboard. Enter the email address you'd like to use for your Netdata Cloud account. In a moment, you'll receive an email confirmation. Open that email and click the green button. You'll be redirected back to your Netdata dashboard. Then click on any of the `Nodes<sup>Beta</sup> buttons on the dashboard and you'll be directed to the Nodes view.

At that point, you’ll see a dashboard like this:

![A screenshot of the Netdata Cloud web interface](/img/how-to-netdata-cloud_07.png)

You’ll likely only see a single node, but as you can see, I’ve populated my Netdata Cloud account with not only the Netdata agent running on my desktop, but also a few others. More on that in a moment. For now, let’s walk through the various sections of the interface and explain what they do.

### List of visited nodes

The most important part of the Nodes view. As seen in the screenshot above, the most prominent part of the Nodes view is the list of Netdata agents you've connected to your Netdata Cloud account by visiting them.

Each box shows icons for the type of operating system, the hostname, any warning or critical alerts, and any services that might be running. For example, many of the nodes connected to my Netdata Cloud account are running an Nginx web server.

### System overview 

Let’s say I’m curious about peeking into what’s going on with the `cdn77.my-netdata.io` node—there’s triggered alarms there, after all! When I click on that node in the list, a sidebar appears on the right-hand side of the dashboard with a few essential visualizations for CPU, I/O, memory, and network.

![A screenshot of the system overview area in the Netdata Cloud web interface](/img/how-to-netdata-cloud_08.png)

The `Overview`, `Disks`, and `Network` sub-tabs will show more visualizations about certain aspects of the system—useful in getting a broad picture of a specific node’s health and performance status.

You can then click the `Services` or `Alarms` tabs to see more about the MariaDB/Nginx services or learn about active alarms, respectively.

![A screenshot of the alarms area in the Netdata Cloud web interface](/img/how-to-netdata-cloud_09.png)

At the top of the system overview sidebar, there’s a link that will take you straight to that Netdata web dashboard, which you can then use to further diagnose the alarms and discover the root cause.

**These visualizations are live!** You can scrub forward and backward in time, zoom, pause and pinpoint anomalies down to the second, just as you do in the Netdata agent's web interface.

### Search bar

We expect a lot of Netdata Cloud’s users will have dozens or hundreds of nodes listed. Finding precisely the one you’re looking for won’t be easy, which is why we’ve included a search bar that helps with filtering. You can search for the hostname of the node you’re interested in, the operating system it’s running, or even for the services installed. For example, here’s what happens when I type `ng` into the search bar:

![A screenshot of the search bar in the Netdata Cloud web interface](/img/how-to-netdata-cloud_10.png)

Take some time to explore the options and figure out the best ways to get straight to the information that’s most important for you.

### View mode, sorting, and grouping

On that front, we’ve also built a few organizational features to help you configure Netdata Cloud according to your preferences.

The view mode button lets you switch between a large grid (the default), a small grid, or a detailed list.

You can then sort alphabetically, by which nodes you’ve viewed most recently, or which you view most frequently. Finally, you can group them by alarm status, the services running, or whether or not they’re online at all.

For example, here’s what it looks like to enable the detailed list, sort by frequently viewed nodes, and group by alarm status.

![A screenshot of sorting, grouping, and view modes in the Netdata Cloud web interface](/img/how-to-netdata-cloud_11.png)

Play around with the options until you find a setup that works for you. We're building Netdata Cloud to be flexible to offer you the most immediate value for whatever type of infrastructure you might be running.

## Adding more agents to your Netdata Cloud

At this point, you probably only have a single node in your list. Let's fix that!

To add more agents, simply follow the process of connecting your first node. Visit the dashboard, and 



Adding more agents to your Netdata Cloud account is simple—just follow the process outlined in our [how-to guide for signing up for Netdata Cloud](http://localhost:1313/posts/how-to-netdata-cloud/#getting-started-with-netdata-cloud).

Basically, you need to click on any of the links to the Nodes view in the dashboard you'd like to connect, sign in to your Netdata account **using the same method you used to create the account**, and then visit your Nodes view again.

You can even use any of our [live Netdata demo sites](https://my-netdata.io/#demosites) to populate your Netdata Cloud list!

We’re working on ways to make this process smoother, particularly for those with large infrastructures with many systems running concurrently. More on that soon.

## Moving forward with our vision for distributed health and performance monitoring

The Nodes view, as just one part of Netdata Cloud, is in its early stages and we have [a ton of features planned](https://blog.netdata.cloud/posts/netdata-cloud-announcement/#what-features-will-netdata-cloud-offer). For more information about the newest additions to the Nodes view, Netdata Cloud, and the open-source monitoring agent, see [the changelog for version 1.15](https://github.com/netdata/netdata/releases/tag/v1.15.0).

If you’d like to be among the first to hear about new releases of both Netdata Cloud and the open-source monitoring agent, you have a few options:

- Become a watcher on [the Netdata repository](https://github.com/netdata/netdata)
- Follow [Netdata on Twitter](https://twitter.com/linuxnetdata)
- Subscribe to the [Atom feed](https://github.com/netdata/netdata/releases.atom) that automatically updates with every new release
- Subscribe to the [RSS feed](https://blog.netdata.cloud/index.xml) for this blog

Or, you can subscribe to our newsletter:

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
	portalId: "4567453",
	formId: "6a20deb5-a1e6-4312-9c4d-f6862f947fe0"
});
</script>

We'll soon be sending this newsletter out every week, and it'll always be filled with useful information about monitoring, news from Netdata, and guides that will help you build an extraordinary infrastructure.

There's a lot of changes happening in the next few months, so be sure to stay tuned one way or another. We're incredibly excited to see how the community takes to Netdata Cloud as it expands and becomes even more powerful, all while staying completely free.