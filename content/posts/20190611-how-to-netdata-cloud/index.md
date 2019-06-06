---
title: "How to sign up for and use Netdata Cloud"
summary: "Netdata Cloud is the future of distributed health and performance monitoring. Learn how to sign up for and use Netdata Cloud with your nodes."
date: 2019-06-11
author: "Joel Hans"
slug: "how-to-netdata-cloud"
url: "/posts/how-to-netdata-cloud"
cover: "how-to-netdata-cloud.png"
tags: ["How-to"]
categories: []
draft: true
---

As we’ve mentioned in our announcement post (read [Introducing Netdata Cloud: our vision for distributed health and performance monitoring](https://blog.netdata.cloud/posts/netdata-cloud-announcement/)), we’re excited to finally be showing the Netdata community what we’ve been so hard at work on over the last few months.

If you want to know more details about what Netdata Cloud is, how it will work, the features it will have, and how our work on it will affect the open-source Netdata agent (hint: they’re going to make each other better), be sure to check out the [official announcement](https://blog.netdata.cloud/posts/netdata-cloud-announcement/).

But, to be clear, **Netdata Cloud is entirely free for all Netdata users**.

<!--more-->

In this post, we’re going to walk through the process of signing up for a Netdata Cloud account, how to connect distributed Netdata agents, and how to quickly navigate through data about an entire Netdata-monitored infrastructure.
Getting started with Netdata Cloud
There is only one prerequisite to using Netdata Cloud: A working Netdata agent. 

If you don’t have one running yet, be sure to check out our [quick start](https://github.com/netdata/netdata#quick-start) or [installation guides](https://github.com/netdata/netdata/tree/master/packaging/installer#installation) for more information.

Once you have a Netdata agent running, or connect to the web dashboard of your Netdata agent by navigating your browser of choice to `http://SERVER-IP:19999`. You’ll see a screen much like this one:

![A screenshot of Netdata's web interface](/img/how-to-netdata-cloud_01.png)

From here, registering for your Netdata Cloud account is simple. There are three ways to get started from your Netdata web dashboard. 

Find one link reading `Nodes Beta` on the left side of the navigation menu:

![A screenshot of a link to the Nodes interface](/img/how-to-netdata-cloud_02.png)

Or click the `Sign In` button on the right side of that same menu:

![A screenshot of the second link to the Nodes interface](/img/how-to-netdata-cloud_03.png)

And find the third option in the drop-down menu in the top-left corner of the dashboard:

![A screenshot of the third link to the Nodes interface](/img/how-to-netdata-cloud_04.png)

Each of these links will take you to the Netdata Cloud application, where you can register for a new account or log in to your existing account:

![A screenshot of a link to the Nodes interface](/img/how-to-netdata-cloud_05.png)

Authorize with Google or Github, or enter your email. For this example, you’ll enter your email and click `Authorize`. If we don’t have your email in the system already, we’ll create one for you.

You’ll get a notice that you’ll receive a verification email at the address you entered. Hop over to your email provider and check for the verification email—it should arrive in less than a minute. If it doesn’t show up, check your spam folder or click the `Resend email` button.

Once the email shows up, click on the green `Sign in` button.

![A screenshot of the sign in email received from Netdata Cloud](/img/how-to-netdata-cloud_06.png)

You’ll be redirected back to your Netdata dashboard. Behind the scenes, this agent has been connected to Netdata Cloud. When you click on any of those `Nodes Beta` links again, you’ll be directed to the Netdata Cloud application.

Welcome! You’re in.

## Getting around Netdata Cloud for the first time

When you first access Netdata Cloud, you’ll see a dashboard like this:

![A screenshot of the Netdata Cloud web interface](/img/how-to-netdata-cloud_07.png)

You’ll likely only see a single node, but as you can see, I’ve populated my Netdata Cloud account with not only the Netdata agent running on my desktop, but also a few others. More on that in a moment. For now, let’s walk through the various sections of the interface and explain what they do.

### The nodes list

The most important part of Netdata Cloud. As you can see in the screenshot above, Netdata Cloud heavily features a list of the nodes you’ve connected to your account. Each box shows icons for the type of operating system, the hostname, any warning or critical alerts, and any services that might be running. For example, many of the nodes are running an Nginx web server.

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
View mode, sorting, and grouping
On that front, we’ve also built a few organizational features to help you configure Netdata Cloud according to your preferences.

The view mode button lets you switch between a large grid (the default), a small grid, or a detailed list.

You can then sort alphabetically, by which nodes you’ve viewed most recently, or which you view most frequently. Finally, you can group them by alarm status, the services running, or whether or not they’re online at all.

For example, here’s what it looks like to enable the detailed list, sort by frequently viewed nodes, and group by alarm status.

![A screenshot of sorting, grouping, and view modes in the Netdata Cloud web interface](/img/how-to-netdata-cloud_11.png)

Play around with the options until you find a setup that works for you. We’re building Netdata Cloud to be flexible to offer you the most immediate value for whatever type of infrastructure you might be running.

## Adding more agents to your Netdata Cloud

At this point, you probably only have a single node in your list. Let’s fix that!

Adding more agents to your Netdata Cloud is simple. If you have other Netdata agents running throughout your infrastructure, the process for adding more is as simple as adding your first node. You can even use the live Netdata demo sites to populate your Netdata Cloud list! Just follow the same procedure that I outlined at the beginning of the post for each of the nodes you’d like to connect.

We’re working on ways to make this process smoother, particularly for those with large infrastructures with many systems running concurrently. More on that soon.

## Moving forward with our vision for distributed health and performance monitoring

Netdata Cloud is in its early stages and we have [a ton of features planned](https://blog.netdata.cloud/posts/netdata-cloud-announcement/#what-features-will-netdata-cloud-offer). For more information about the newest additions to Netdata Cloud, and the Netdata agent as a whole, see [the changelog for version 1.15](https://github.com/netdata/netdata/releases/tag/v1.15.0).

If you’d like to be among the first to hear about new releases of both Netdata Cloud and the open-source monitoring agent, you have a few options:

- Become a watcher on [the Netdata repository](https://github.com/netdata/netdata)
- Follow [Netdata on Twitter](https://twitter.com/linuxnetdata)
- Subscribe to the [Atom feed](https://github.com/netdata/netdata/releases.atom) that automatically updates with every new release
- Or subscribe to the [RSS feed](https://blog.netdata.cloud/index.xml) for this blog

There's a lot of changes happening in the next few months, so be sure to stay tuned one way or another. We're incredibly excited to see how the community takes to Netdata Cloud as it expands and becomes even more powerful, all while staying completely free.