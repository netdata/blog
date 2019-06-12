---
title: "How to sign up for and use Netdata Cloud"
summary: "Netdata Cloud is the future of distributed health and performance monitoring. Learn how to sign up for and use Netdata Cloud with your nodes."
date: 2019-06-13
author: "Joel Hans"
cover: "how-to-netdata-cloud.png"
tags: ["How-to"]
categories: []
draft: false
---

As we’ve mentioned in our announcement post (read [Introducing Netdata Cloud: our vision for distributed health and performance monitoring](https://blog.netdata.cloud/posts/netdata-cloud-announcement/)), we’re excited to finally be showing the Netdata community what we’ve been so hard at work on over the last few months.

If you want to know more details about what Netdata Cloud is, how it will work, the features it will have, and how our work on it will affect the open-source Netdata agent (hint: they’re going to make each other better), be sure to check out the [official announcement](https://blog.netdata.cloud/posts/netdata-cloud-announcement/). But, to be clear, **Netdata Cloud is entirely free for all Netdata users**.

Signing up for a Netdata Cloud account is easy—let's get started.

<!--more-->

If you've already created an account on Netdata Cloud and have accessed the Nodes view, but are looking for more information on how to connect additional agents or better sort through the nodes you've connected, take a look at our [guide for using the Nodes view](/posts/using-netdata-nodes-view/).

If you run a [private registry](https://docs.netdata.cloud/registry/#run-your-own-registry) instead of the public registries run by Netdata, be sure to read our caveats and tips at the [bottom of this post](#netdata-cloud-the-netdata-registry-and-private-registries).


## Getting started with Netdata Cloud

There is only one prerequisite to using Netdata Cloud: A working Netdata agent. 

If you don’t have one running yet, be sure to check out our [quick start](https://docs.netdata.cloud/#quick-start) or [installation guides](https://docs.netdata.cloud/packaging/installer/) for more information.

Once you have a Netdata agent running, or connect to the web dashboard of your Netdata agent by navigating your browser of choice to `http://SERVER-IP:19999`. You’ll see a screen much like this one:

![A screenshot of Netdata's web interface](/img/how-to-netdata-cloud_01.png)

From here, registering for your Netdata Cloud account is simple. There are three ways to get started from your Netdata web dashboard. 

Find one link reading `Nodes Beta` on the left side of the navigation menu:

![A screenshot of a link to the Nodes interface](/img/how-to-netdata-cloud_02.png)

Or click the `Sign In` button on the right side of that same menu:

![A screenshot of the second link to the Nodes interface](/img/how-to-netdata-cloud_03.png)

And find the third option in the drop-down menu in the top-left corner of the dashboard:

![A screenshot of the third link to the Nodes interface](/img/how-to-netdata-cloud_04.png)

Each of these links will take you to the Netdata Cloud application, where you can register for a new account or log in to your existing account.

> <span style="color: #17CE8A;">**Note:**</span> Be consistent with the sign-in method you use. We are currently working on a fix for this issue, but if you sign in via different methods, you may end up with multiple Netdata Cloud accounts.

![A screenshot of a link to the Nodes interface](/img/how-to-netdata-cloud_05.png)

Authorize with Google or Github, or enter your email. For this example, you’ll enter your email and click `Authorize`. If we don’t have your email in the system already, we’ll create one for you.

You’ll get a notice that you’ll receive a verification email at the address you entered. Hop over to your email provider and check for the verification email—it should arrive in less than a minute. If it doesn’t show up, check your spam folder or click the `Resend email` button.

Once the email shows up, click on the green `Sign in` button.

![A screenshot of the sign in email received from Netdata Cloud](/img/how-to-netdata-cloud_06.png)

You’ll be redirected back to your Netdata dashboard. Behind the scenes, this agent has been connected to Netdata Cloud. When you click on any of those `Nodes Beta` links again, you’ll be directed to the Netdata Cloud application.

Welcome! You’re in.

To take the next steps in navigating the Nodes view and adding more servers to your Netdata Cloud account, visit our guide: **[Navigating and using Netdata Cloud's Nodes view](/posts/using-netdata-nodes-view/)**.

If you'd like to learn more about how Netdata Cloud interacts with Netdata registries, both public and private, read on.


## Netdata Cloud, the Netdata registry, and private registries

When you install a new Netdata agent, by default it connects to the public Netdata registry at `https://registry.my-netdata.io`. This public registry allows us to do two important things.

First, it allows us to count the number of unique users and unique Netdata servers that are installed worldwide, and then create cool badges like these:

![A badge showing the Netdata userbase](https://registry.my-netdata.io/api/v1/badge.svg?chart=netdata.registry_entries&dimensions=persons&label=user%20base&units=M&value_color=blue&precision=2&divide=1000000&v43) 

![A badge showing the number of servers Netdata monitors](https://registry.my-netdata.io/api/v1/badge.svg?chart=netdata.registry_entries&dimensions=machines&label=servers%20monitored&units=k&divide=1000&value_color=orange&precision=2&v43)

![A badge showing the number of sessions Netdata serves](https://registry.my-netdata.io/api/v1/badge.svg?chart=netdata.registry_sessions&label=sessions%20served&units=M&value_color=yellowgreen&precision=2&divide=1000000&v43)

Second, the public registry allows us to intgrate multiple Netdata agents, running on distributed machines, into **one distributed application** in your web browser.

> *Learn more about the public registry, and how it helps your web browser "talk" to your servers that run Netdata, in [our documentation](https://docs.netdata.cloud/registry/).*

If you prefer not to use the public registry, or your company's data policies do not allow it, you can [run your own private registry](https://docs.netdata.cloud/registry/#run-your-own-registry). The caveat here is that with a private registry, you won't be able to leverage features made available by Netdata Cloud, such as the Nodes view.

This will eventually change—you'll be able to run the Nodes view on-premises if you'd like—but for now this is a limitation of the registry system.

Currently, when you connect a Netdata agent to Netdata Cloud, Netdata Cloud replaces the default registry (`https://registry.my-netdata.io`) with a new endpoint at `https://netdata.cloud`. This allows Netdata Cloud to register all the new Netdata dashboards that you visit and create that distributed application running entirely in your browser.

---

Welcome to Netdata Cloud! If you’d like to be among the first to hear about new releases of both Netdata Cloud and the open-source monitoring agent, you have a few options:

- Become a watcher on [the Netdata repository](https://github.com/netdata/netdata)
- Follow [Netdata on Twitter](https://twitter.com/linuxnetdata)
- Subscribe to the [Atom feed](https://github.com/netdata/netdata/releases.atom) that automatically updates with every new release
- Or subscribe to the [RSS feed](https://blog.netdata.cloud/index.xml) for this blog