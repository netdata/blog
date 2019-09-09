---
title: "Release 1.17: Collection frequency gets flexible" 
date: 2019-09-09
summary: "Netdata v1.17.0 is here! Change your collection frequency without losing metrics, archive to MongoDB, use UT8 characters freely, and more." 
author: "Joel Hans" 
cover: "release-1.17.0.png" 
tags: ["Release"] 
categories: []
---

The next version of Netdata has arrived! Aside from dozens of quality-of-life and papercut fixes, we've launched some
new features we know you'll be excited to use straight away.

Let's dive in.

<!--more-->

## What's new?

Release v1.17.0 contains 38 bug fixes, 33 improvements, and 20 documentation updates.

You can, of course, view the full list at the [v1.17.0 release
notes](https://github.com/netdata/netdata/releases/tag/v1.17.0) on GitHub. But, let's talk details on a few of the
improvements and changes most requested by the Netdata community.

### More flexibile collection frequencies

If you're using our new [database engine](https://blog.netdata.cloud/posts/db-engine/) (and if you're not, you should!),
you can now change the rate at which Netdata collects data while also being able to view data collected at a different
frequency than you do now.

Let's say you're using the database engine and you recently changed your collection frequency from 1 second to 3
seconds. In the past, dashboard queries to the database engine did not accurately return either part or all of metrics
history stored to disk.

But, with the improvements in v1.17, the dashboard can query for past metrics at any frequency, and the database engine
will return the complete, accurate history.

{{< figure src="/img/release-1.17.0-frequency.gif" alt="An animated GIF of the data collection frequency changing in the Netdata dashboard" position="center" style="border-radius: 4px;" caption="Watch the times in the top-right corner! Netdata is showing accurate data for both 1-second and 5-second collection frequencies in the same chart." captionPosition="center" >}}

Upgrading to v1.17 allows you to accurately visualize historic metrics that were stored with previous versions of the
database engine.

Netdata also now autoscales the time axis of any chart based on the collection frequency used during that time. That
will make panning through past metrics, and different collection frequencies, easier to follow.

If you're interested in changing collection frequency, you can change the `update every` option in the `[global]`
section of `netdata.conf`:

```conf
[global]
    # Default setting: collect data every 1 seconds
    update every = 1
    # Every 3 seconds
    update every = 3
    # Every 10 seconds
    update every = 10
```

Restart Netdata and the database engine will pick up your new settings. You can also change the collection frequency
for internal or external plugins, or even individual charts—see our [collectors
documentation](https://docs.netdata.cloud/collectors/) for more details.

With more flexibilty comes more customization, so go ahead and configure Netdata for your particular use case without
losing a hint of accuracy in your charts.

### Show all charts with no data

Netdata usually hides charts that have no data. Before v1.17, you could force Netdata to show all charts with no data
using individual configuration options for each chart, but that meant changing more than 200 options!

You can now enable all charts with no metrics using a single option:

```
[global]
    enable zero metrics = yes
```

### Archive metrics to MongoDB

Unlike other backend setups, archiving metrics to MongoDB requires only two configuration changes.

First, make sure your system has `libmongoc` 1.7.0 or higher installed.

Enable archiving to MongoDB by editing your `netdata.conf` with the following options:

```
[backend]
    enabled = yes
    type = mongodb
```

Netdata takes care of the rest!

### What else?

With this release, you can now:

- Use [UTF8 characters](https://github.com/netdata/netdata/pull/6426) on Netdata badges.
- Install Netdata with `.DEB` [packages on Package Cloud](https://packagecloud.io/netdata).
- Monitor VM performace from one or more [vCenter
  servers](https://docs.netdata.cloud/collectors/go.d.plugin/modules/vsphere/).
- Send email notifications in [plain text](https://github.com/netdata/netdata/pull/6485).

... and more. Be sure to read the [v1.17.0 release notes](https://github.com/netdata/netdata/releases/tag/v1.17.0) for
more details on bug fixes and other improvements.

## What's next?

We have a new issue that outlines the [scope of v1.18.0's first sprint](https://github.com/netdata/netdata/issues/6770).
While not comprehensive, it's a taste of our short-term roadmap.

If you want to file a feature request, you're welcome to do exactly that in our [GitHub
issues](https://github.com/netdata/netdata/issues/new?labels=feature+request%2C+needs+triage&template=feature_request.md).

## Have thoughts on your Netdata experience?

We're always looking for more feedback on how Netdata performs in real-world use cases. That's true whether you're a
solo dev and a single system or a DevOps engineer with hundreds of ephemeral nodes.

There are two good ways to let us know.

First, [review Netdata on G2](https://www.g2.com/products/netdata/reviews). Each review boosts Netdata's presence on G2
and in search engine queries. Plus, reviews of all types help us understand what's working well (and not so well) in
your particular use case.

Second, [file an issue on GitHub](https://github.com/netdata/netdata/issues/new) and share your experience, even if you
don't have a specific question or feature request. We read every issue and take feedback to heart!

---

**Want to get the latest from us in email form?** Register for our email newsletter for more tips, updates, and news
about our latest features:

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
    portalId: "4567453",
    formId: "6a20deb5-a1e6-4312-9c4d-f6862f947fe0"
});
</script>