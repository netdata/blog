---
title: "Release 1.16.0: Smarter binaries and built-in TLS"
date: 2019-07-09
summary: "Version 1.16.0 of the open-source Netdata agent comes with a ton of bugfixes, new TLS encryption, and better binaries for smooth installation with package managers."
author: "Joel Hans"
cover: "release-1.16.0.png"
tags: ["Release"]
categories: []
---

We're excited to launch release v1.16.0 of the open-source [Netdata monitoring agent](https://github.com/netdata/netdata/), which delivers real-time health monitoring and performance troubleshooting to nearly any system or application.

This release also contains 40 bug fixes, 31 improvements, and 20 documentation updates—if you'd like to see the full list, check out the [full release notes](https://github.com/netdata/netdata/releases/tag/v1.16.0).

Details aside, I know people are going to be most curious about the big changes we've just delivered to Netdata—let's dive in.

<!--more-->

## Binary distributions via Packagecloud

Binary packages are the go-to method for installing software on just about every Linux distribution out there. Most often, these packages are made available by maintainers of your distribution of choice—such as Ubuntu, Debian, Fedora, CentOS, and more—and are downloaded when you run commands like `apt-get install netdata`.

This way of installing packages via a package manager works brilliantly, except for the fact that these packages might not get updated when we launch a new version of Netdata. By supplying our binary packages via a repository you can add to your package manager's list, we'll be able to make sure everyone gets our newest features.

RPM binaries for Fedora, Red Hat Enterprise Linux (RHEL), and OpenSUSE are now available, and DEB packages for Debian and Ubuntu will be available soon.

**These binaries are still in beta, and if you have issues we encourage you to [file an issue](https://github.com/netdata/netdata/issues) so that we can fix it.**

- Get stable packages: https://packagecloud.io/netdata/netdata
- Get nightly packages: https://packagecloud.io/netdata/netdata-edge


## TLS encryption is here!

One of the most common feature requests is encrypted connections for Netdata's built-in web server, streaming connections, and communications to various backends. Users want the peace of mind that comes with knowing that Netdata is securing their metrics with a certificate (even self-signed) and encryption.

TLS used to be available only in the nightly builds of Netdata, but with v1.16.0 it's now available for everyone with automatic updates or those who [update manually](https://docs.netdata.cloud/packaging/installer/update/).

You can now use HTTPS with the built-in web server by [enabling TLS](https://docs.netdata.cloud/web/server/#enabling-tls-support). If you stream data from a slave to its master, TLS [works there](https://docs.netdata.cloud/streaming/#securing-the-communication), too. And after a long wait, you can now encrypt connections to an [openTSDB backend](https://docs.netdata.cloud/backends/opentsdb/#https).


## Get smarter about your health monitoring

We launched the [health management API](https://docs.netdata.cloud/web/api/health/#health-management-api) in v1.12, but any changes you made there weren't persisted across restarts. As of v1.16.0, Netdata now persists those changes to disk! No more reconfiguring your Netdata agents to work the way you want, no matter how many times you cycle your systems off and on.

A lot of Netdata users worry about missing an alarm notification—not a good situation if you're monitoring mission-critical systems. To help reduce these situations, we've launched the ability to [repeatedly send alarm notifications](https://docs.netdata.cloud/health/#alarm-line-repeat) for some or all active alarms at any frequency you'd like.

By default, you'll still only get a single notification, so if you want to try out the new options, you'll have to dive into your [settings](https://docs.netdata.cloud/health/#alarm-line-repeat).

With better health monitoring comes a more exceptional infrastructure—we can't wait to see Netdata users try these new features out.


## Help us spread the word!

We're proud of these just-launched improvements, and we want more people in the monitoring community to know about it. There are a few ways our fantastic community can help.

**Review Netdata on G2**: One of the best ways for us to get more visibility is to boost the number of reviews we have on review/comparison sites like G2. Head on over to [profile](https://www.g2.com/products/netdata/reviews) and click any of the `Write a Review` buttons. We value your honest feedback!

**Send out some Tweets**: You can craft your own Tweets announcing our newest features, but we've put together some defaults for you to send out with a few clicks:

> Get TLS encryption for your real-time performance metrics with v1.16.0 of @linuxnetdata! https://blog.netdata.cloud/posts/release-1.16/ <br />
> [&rarr; tweet this](https://twitter.com/home?status=Get%20TLS%20encryption%20for%20your%20real-time%20performance%20metrics%20with%20v1.16.0%20of%20Netdata!%20https%3A//blog.netdata.cloud/posts/release-1.16/)

> Get TLS encryption, new binaries, and an even more efficient DB engine in v1.16.0 of @linuxnetdata. Check it out: https://blog.netdata.cloud/posts/release-1.16/ <br />
> [&rarr; tweet this](https://twitter.com/home?status=Get%20TLS%20encryption,%20new%20binaries,%20and%20an%20even%20more%20efficient%20DB%20engine%20in%20v1.16.0%20of%20%40linuxnetdata.%20Check%20it%20out%3A%20https%3A//blog.netdata.cloud/posts/release-1.16/)

---

**Want to get the latest from us in email form?** Register for our email newsletter for more tips, updates, and news about our latest features:

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
    portalId: "4567453",
    formId: "6a20deb5-a1e6-4312-9c4d-f6862f947fe0"
});
</script>