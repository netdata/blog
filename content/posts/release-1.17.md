---
title: "Release 1.17: Collection frequency gets flexible"
date: 2019-09-04
summary: "Netdata v1.17.0 is here! Change your collection frequency without losing metrics, archive to MongoDB, use UT8 characters freely, and more."
author: "Joel Hans"
cover: "release-1.17.0.png"
tags: ["Release"]
categories: []
---

The next version of Netdata has arrived! Aside from dozens of quality-of-life and papercut fixes, we've launched some new features we know you'll be able to start using straight away.

Let's dive in.

<!--more-->

## What's new?

Release v1.17.0 contains 38 bug fixes, 33 improvements, and 20 documentation updates.

You can, of course, view the full list at the [v1.17.0 release notes](https://github.com/netdata/netdata/releases/tag/v1.17.0) on GitHub.

Here are details on some of the improvements and changes most requested by the Netdata community.

### Change collection frequency without losing metrics

If you're using our new [database engine](https://blog.netdata.cloud/posts/db-engine/) (and if you're not, you should!), you can now change the rate at which Netdata collects data without losing previously-stored metrics.

In the past, changing the frequency—for example, from every second to every 5 seconds—destroyed those metrics the database engine already had saved to disk.

All you need to do to change collecion frequency is restart Netdata.

You can also now autoscale the time axis of any chart based on the collection frequency used during that time. That will make panning through past metrics, and different collection frequencies, easier to follow.

With more flexibilty comes more customization, so go ahead and configure Netdata for your particular use case without worrying about losing a single metric.

### Show all charts with no data

Netdata usually hides charts that have no data. Before v1.17.0, you could force Netdata to show all charts with no data using individual configuration options for each chart, but that meant changing more than 200 options!

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

Netdata takes care of the rest! Archiving is automatic and is limited only by the resources you're willing to dedicate to MongoDB.

### What else?

With this release, you can now:

- Use [UTF8 characters](https://github.com/netdata/netdata/pull/6426) on Netdata badges
- Install Netdata with `.DEB` [packages on Package Cloud](https://packagecloud.io/netdata)
- Monitor VM performace from one or more [vCenter servers](https://docs.netdata.cloud/collectors/go.d.plugin/modules/vsphere/)
- Send email notifications in [plain text](https://github.com/netdata/netdata/pull/6485)

... and more. Be sure to read the [v1.17.0 release notes](https://github.com/netdata/netdata/releases/tag/v1.17.0) for more details on bug fixes and other improvements.

## What's next?

We have a new issue that outlines the [scope of v1.18.0's first sprint](https://github.com/netdata/netdata/issues/6770). While not comprehensive, it's a taste of our short-term roadmap.

If you want to file a feature request, you're welcome to do exactly that in our [GitHub issues](https://github.com/netdata/netdata/issues/new?labels=feature+request%2C+needs+triage&template=feature_request.md).

## Have thoughts on your Netdata experience?

We're always looking for more feedback on how Netdata performs in real-world use cases. That's true whether you're a solo dev and a single system or a DevOps engineer with hundreds of ephemeral nodes.

There are two good ways to let us know.

First, [review Netdata on G2](https://www.g2.com/products/netdata/reviews). Each review boosts Netdata's presence on G2 and in search engine queries. Plus, reviews of all types help us understand what's working well (and not so well) in your particular use case.

Second, [file an issue on GitHub](https://github.com/netdata/netdata/issues/new) and share your experience, even if you don't have a specific question or feature request. We read every issue and take feedback to heart!

---

**Want to get the latest from us in email form?** Register for our email newsletter for more tips, updates, and news about our latest features:

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
    portalId: "4567453",
    formId: "6a20deb5-a1e6-4312-9c4d-f6862f947fe0"
});
</script>