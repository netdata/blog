---
title: "Getting started with Netdata: The ultimate guide to health and performance monitoring"
summary: "Everything you ever wanted to know about using Netdata for Linux health and performance monitoring (and then a whole bunch more)."
date: 2019-06-25
author: "Joel Hans"
slug: "getting-started-netdata-guide"
url: "/posts/getting-started-netdata-guide"
cover: ""
images:
- 
tags: [""]
categories: []
---

<span style="color: #17CE8A;">**_Welcome to Netdata!_**</span>

Whether you're a hobbyist with a dozen Raspberry Pis, a system administrator for an infastructure with a thousand systems, or a technical co-founder of a startup who's responsible for dev, ops, and a dozen other critical tasks, you want to know your machines are happy and healthy.

The problem isn't getting an answer from these machines at all. You need to know as much as possible, as often as possible, and in a way you can actually interpret.

That's where Netdata fits in. After it's first installed, Netdata is simple: you visit the web dashboard and watch hundreds of visualizations wiggle and morph according to thousands of real-time metrics. Over time, you'll be able to understand what normal health and performance looks like.

But as you master the intricacies of the Netdata dashboard, you'll discover many features that lie beneath the surface, such as plug-ins, custom dashboards, streaming, and interconnectivity with complimentary monitoring/visualization solutions.

This guide is designed to help you get started with Netdata and incorporate it into the way you monitor your web sites, blogs, applications, or Internet of Things devices. Through this guide, you'll learn about how to use some of those more advanced features. Eventually, you'll be empowered with the information you need to respond to anomalous behavior.

## <a name="toc"></a>In this guide, you'll learn (our table of contents):  <!-- omit in toc -->

- [What is Netdata?](#what-is-netdata)
- [Visit the dashboard](#visit-the-dashboard)
- [Plan, zoom, select, reset, and resize the charts](#plan-zoom-select-reset-and-resize-the-charts)
- [Read the descriptions accompanying charts](#read-the-descriptions-accompanying-charts)
- [Try the white theme](#try-the-white-theme)
- [Export a snapshot of your system's state](#export-a-snapshot-of-your-systems-state)
- [Check if there's an update to Netdata](#check-if-theres-an-update-to-netdata)


## What is Netdata?

Netdata is distributed, real-time, performance and health monitoring for systems and applications.

The open-source [Netdata agent](https://github.com/netdata/netdata) can be installed and permenantly run all all systems—physical servers, virtual servers, Docker containers, Kubernetes clusters, and IoT devices—without disrupting the system's core function.

And right out of the box, without any configuration, it collects thousands of system metrics **every second** and translates the most important information into dynamic visualizations that you can use to diagnose and solve ongoing anomalies, slowdowns, and outages.

If you haven't already, use our [quick start procedure](https://github.com/netdata/netdata#quick-start) to install Netdata on your first Linux system. It's as simple as:

```
$ bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

⬆ [Back to the table of contents](#toc)


## Visit the dashboard

Open a new tab on the very browser you're using to read this guide and visit:

```
http://YOUR-SERVER-IP:19999/
```

If you installed Netdata on the machine you're using to read this guide, you can try `http://localhost:19999`. In this case, the `localhost` portion of the URL refers to your machine itself.

And if you're having trouble, head over to [our documentation](https://docs.netdata.cloud/docs/gettingstarted/#accessing-the-dashboard) and click on the `Click here if it does not work` box. It'll expand to give you some troubleshooting tips.

You *should* soon seen the dashboard. Yes, we agree—it looks beautiful:

{{< figure src="/img/netdata-dashboard.gif" alt="A GIF of the Netdata dashboard in action." position="center" style="border-radius: 4px;" caption="The Netdata dashboard in action!" captionPosition="center" >}}

Be sure to take some time exploring the dashboard before moving onward into this getting started guide. Navigate through different aspects of your machine using the right-hand sidebar.

⬆ [Back to the table of contents](#toc)


## Plan, zoom, select, reset, and resize the charts

Netdata's charts are not static! They're practically begging to be used in dynamic situations, whether that's panning, zooming, highlighting different timeframes, and more. And, when you manipulate one, the rest will follow suit, so you'll have synchronized data wherever you look next.

**Pan**: To pan charts along their timeframe (you might have heard this referred to as [*scrubbing*](https://www.webopedia.com/TERM/A/audio_scrubbing.html)), simply click and drag to the left or right. On the bottom-right corner of every chart you can find ⏪ and ⏩ buttons to help you do the same. Mobile users can swipe with one finger to pan charts.

**Zoom**: Zoom easily using the `SHIFT` or `ALT` keys plus the scroll wheel on your mouse. Mobile users should use two fingers to zoom in or out on the chart in question. Or, check out that bottom-right corner for ➕ and ➖ buttons.

**Selecting a specific timeframe**: When holding the `SHIFT` key, click and drag across a chart. You'll see a grey box appear to help you zoom into precisely the timeframe you're interested in. It's fantastic for trying to diagnose a small anomaly amidst otherwise normal behavior.

{{< figure src="/img/getting-started-netdata_selecting.png" alt="A screenshot of selecting a specific timeframe in a Netdata chart." position="center" style="border-radius: 4px;" caption="Selecting a section of my local machine's CPU utilization history. Can you guess what causes this incredibly flat CPU utilization? Here's a hint: It starts with HBO and ends with Now." captionPosition="center" >}}

**Reset**: After you've messed around with your charts for a while, you might just want to get back to where you started. Click the ▶️ button in the bottom-right corner and all charts will reset to their auto-updating state.

**Resize**: Want to give your chart's peaks a little more room to grow? Grab the ↕️ button in the furthest part of that bottom-right area and drag to your heart's content. Double-click (or tap, for mobile users) to restore that chart to its original height.

⬆ [Back to the table of contents](#toc)


## Read the descriptions accompanying charts

Netdata isn't just about cool visualizations—we believe firmly in **meaningful presentation**.

That means we'll always try to explain *why* you should care about a certain metric. By growing your understanding of what each visualization means, you'll be better equipped to notice anomalies as they happen. And you'll get a better sense as to where to look next.

{{< figure src="/img/netdata-getting-started_load.png" alt="A screenshot of the load visualization in the Netdata dashboard." position="center" style="border-radius: 4px;" caption="The load visualization offers a concise explanation and a link to learn even more." captionPosition="center" >}}

⬆ [Back to the table of contents](#toc)


## Try the white theme

Not a fan of the white-on-black text that comes with Netdata's standard dark theme? Head on over to the settings button in the top navigation bar, and then click on the `Visual` tab. You'll see a toggle switch that lets you choose between `Dark` and `White`.

{{< figure src="/img/getting-started-netdata_darkwhite.png" alt="Side-by-side screenshots of Netdata's two theme choices." position="center" style="border-radius: 4px;" caption="Which is better: light or dark? Probably neither, but that won't stop people from arguing about it until the end of time." captionPosition="center" >}}

⬆ [Back to the table of contents](#toc)


## Export a snapshot of your system's state

Anomalies come and go, but snapshots are forever.



⬆ [Back to the table of contents](#toc)


## Check if there's an update to Netdata

Netdata is a constantly-updated piece of software. On most weekdays, our team is pushing more than a dozen bugfixes and improvements to our [repository](https://github.com/netdata/netdata/). Every night, these improvements are packaged into a new *nightly* version of Netdata that you can download and run almost immediatly. You might even see a little warning icon next to the `Update` tab when a new version is available. 

There are a few ways to get that update.

`1)` You can re-run the kickstart script you used to install Netdata in the first place:

```
$ bash <(curl -Ss https://my-netdata.io/kickstart.sh) --no-updates
```

This will perform a one-time update.

`2)` You can also enable auto-updates by running the kickstart script with the `--auto-update` option. Just be careful: auto-updating software can break your system if you're not paying attention.

```
bash <(curl -Ss https://my-netdata.io/kickstart.sh) --auto-update
```

⬆ [Back to the table of contents](#toc)

---

Now that you have a fairly comprehensive sense as to how Netdata works, and how you can learn from the real-time data flowing from your machine, it's time to take the next step. The key to a health and performant system isn't just watching charts go by—it's taking what you see and putting it into action. The longer you keep at it, the more intuitive that process will become. And before you know it, you'll be on track 