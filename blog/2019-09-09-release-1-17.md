---
slug: release-1-17
title: "Release 1.17: Collection frequency gets flexible"
description: "Release 1.17: Collection frequency gets flexible"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/release-1.17.0.png
tags: [product,release notes]
keywords: [netdata,product]
authors: team
---

<!--truncate-->

<img class="alignnone size-full wp-image-16864" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/release-1.17.0.png" alt="" width="1200" height="600" />

The next version of Netdata has arrived! Aside from dozens of quality-of-life and papercut fixes, we’ve launched some new features we know you’ll be excited to use straight away.

Let’s dive in.
<h2>What’s new?</h2>
Release v1.17.0 contains 38 bug fixes, 33 improvements, and 20 documentation updates.

You can, of course, view the full list at the <a href="https://github.com/netdata/netdata/releases/tag/v1.17.0">v1.17.0 release notes</a> on GitHub. But, let’s talk details on a few of the improvements and changes most requested by the Netdata community.
<h3>More flexible collection frequencies</h3>
If you’re using our new <a href="https://staging-www.netdata.cloud/blog/product/db-engine/">database engine</a> (and if you’re not, you should!), you can now change the rate at which Netdata collects data while also being able to view data collected at a different frequency than you do now.

Let’s say you’re using the database engine and you recently changed your collection frequency from 1 second to 3 seconds. In the past, dashboard queries to the database engine did not accurately return either part or all of metrics history stored to disk.

But, with the improvements in v1.17, the dashboard can query for past metrics at any frequency, and the database engine will return the complete, accurate history.

<iframe width="560" height="315" src="https://www.youtube.com/embed/A2Y7QOgOir4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Upgrading to v1.17 allows you to accurately visualize historic metrics that were stored with previous versions of the database engine.

Netdata also now autoscales the time axis of any chart based on the collection frequency used during that time. That will make panning through past metrics, and different collection frequencies, easier to follow.

If you’re interested in changing collection frequency, you can change the <code>update every</code> option in the <code>[global]</code> section of <code>netdata.conf</code>:
<pre class=" language-conf"><code class=" language-conf">[global]
    # Default setting: collect data every 1 seconds
    update every = 1
    # Every 3 seconds
    update every = 3
    # Every 10 seconds
    update every = 10
</code></pre>
Restart Netdata and the database engine will pick up your new settings. You can also change the collection frequency for internal or external plugins, or even individual charts—see our <a href="https://learn.netdata.cloud/docs/agent/collectors/">collectors
documentation</a> for more details.

With more flexibility comes more customization, so go ahead and configure Netdata for your particular use case without losing a hint of accuracy in your charts.
<h3>Show all charts with no data</h3>
Netdata usually hides charts that have no data. Before v1.17, you could force Netdata to show all charts with no data using individual configuration options for each chart, but that meant changing more than 200 options!

You can now enable all charts with no metrics using a single option:
<pre class=" language-conf"><code class=" language-conf">[global]
    enable zero metrics = yes
</code></pre>
<h3>Archive metrics to MongoDB</h3>
Unlike other backend setups, archiving metrics to MongoDB requires only two configuration changes.

First, make sure your system has <code>libmongoc</code> 1.7.0 or higher installed.

Enable archiving to MongoDB by editing your <code>netdata.conf</code> with the following options:
<pre class=" language-conf"><code class=" language-conf">[backend]
    enabled = yes
    type = mongodb
</code></pre>
Netdata takes care of the rest!
<h3>What else?</h3>
With this release, you can now:
<ul>
 	<li>Use <a href="https://github.com/netdata/netdata/pull/6426">UTF8 characters</a> on Netdata badges.</li>
 	<li>Install Netdata with <code>.DEB</code> <a href="https://packagecloud.io/netdata">packages on Package Cloud</a>.</li>
 	<li>Monitor VM performance from one or more <a href="https://docs.netdata.cloud/collectors/go.d.plugin/modules/vsphere/">vCenter
servers</a>.</li>
 	<li>Send email notifications in <a href="https://github.com/netdata/netdata/pull/6485">plain text</a>.</li>
</ul>
… and more. Be sure to read the <a href="https://github.com/netdata/netdata/releases/tag/v1.17.0">v1.17.0 release notes</a> for
more details on bug fixes and other improvements.
<h2>What’s next?</h2>
We have a new issue that outlines the <a href="https://github.com/netdata/netdata/issues/6770">scope of v1.18.0’s first sprint</a>. While not comprehensive, it’s a taste of our short-term roadmap.

If you want to file a feature request, you’re welcome to do exactly that in our <a href="https://github.com/netdata/netdata/issues/new?labels=feature+request%2C+needs+triage&amp;template=feature_request.md">GitHub issues</a>.
<h2>Have thoughts on your Netdata experience?</h2>
We’re always looking for more feedback on how Netdata performs in real-world use cases. That’s true whether you’re a solo dev and a single system or a DevOps engineer with hundreds of ephemeral nodes.

There are two good ways to let us know.

First, <a href="https://www.g2.com/products/netdata/reviews">review Netdata on G2</a>. Each review boosts Netdata’s presence on G2 and in search engine queries. Plus, reviews of all types help us understand what’s working well (and not so well) in your particular use case.

Second, <a href="https://github.com/netdata/netdata/issues/new">file an issue on GitHub</a> and share your experience, even if you don’t have a specific question or feature request. We read every issue and take feedback to heart!