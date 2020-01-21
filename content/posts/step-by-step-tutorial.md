---
title: "Introducing Netdata's step-by-step tutorial" 
summary: "Health monitoring and performance troubleshooting aren't easy, but our new step-by-step tutorial will help beginners dive in faster and with more confidence." 
date: 2020-01-20
author: "Joel Hans" 
cover: "step-by-step-tutorial.png" 
tags: ["Meta"] 
categories: [] 
draft: false
---

Health monitoring and performance troubleshooting aren't easy. That's exactly _why_ we're building Netdata, to
democratize monitoring and make it accessible to anyone interested in learning more about their systems and
applications.

Of course, teaching a complicated topic isn't easy either.

<!--more-->

Until recently, the only resource to help new users after installation has been our [getting started
guide](https://docs.netdata.cloud/docs/getting-started/). While that's useful for those who have monitoring experience
and a background in Linux administration, it jumps wildly over the heads of many Netdata users.

To fill that knowledge gap, we recently released an extensive [step-by-step tutorial for
Netdata](https://docs.netdata.cloud/docs/step-by-step/step-00/), which guides you through everything you need to know
about the best single node monitoring solution out there.

_**If you're new to monitoring, or just new to Netdata, we wrote this tutorial for you.**_

![An example of some of the steps in the comprehensive
tutorial](https://user-images.githubusercontent.com/1153921/71878798-3a568d80-3135-11ea-9f48-aabe3142e899.png)

Each of the ten steps covers some fundamental component of the Netdata experience:

-   Step 1. Netdata's building blocks
-   Step 2. Get to know Netdata's dashboard
-   Step 3. Monitor more than one system with Netdata
-   Step 4. The basics of configuring Netdata
-   Step 5. Health monitoring alarms and notifications
-   Step 6. Collect metrics from more services and apps
-   Step 7. Netdata's dashboard in depth
-   Step 8. Building your first custom dashboard
-   Step 9. Long-term metrics storage
-   Step 10. Set up a proxy

Yes, this tutorial has a lot of material, but given all of the capabilities the Netdata team has diligently built, it's
actually just the beginning. We're excited to see our community dig in and [let us
know](https://github.com/netdata/netdata/issues) how we could make it even better.

## What's next?

As with every step within the [tutorial](https://docs.netdata.cloud/docs/step-by-step/step-00/) itself, this post also
ends with a **What's next?** section.

Given our mission is to [democratize monitoring](https://blog.netdata.cloud/posts/redefining-monitoring-netdata/), the
[public roadmap](https://www.netdata.cloud/roadmap) is just a fraction of what we're working on in 2020 to make Netdata
the best single node monitoring solution out there.

We're working on comprehensive, valuable educational content directed toward the very people Costa, our CEO, addressed
in his manifesto: "The people who find it hard to properly monitor their infrastructure." Of course, we'll always have
detailed information for the experienced sysadmins, but we're committed to teaching _anyone_ who is interested in
real-time health monitoring and performance troubleshooting.

![An example of some of the steps in the comprehensive tutorial](/img/step-by-step-tutorial-everyone.png)

And, soon enough, we'll start publishing that content on an entirely new platform that's more flexible, more capable,
and a lot prettier than what we have right now.

To get started with Netdata, for free and on any number of nodes, install it with our automatic one-line installation
script:

```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Then, dive right in and leave nothing to chance with the [new step-by-step
tutorial](https://docs.netdata.cloud/docs/step-by-step/step-00/).
