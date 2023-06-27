---
slug: release-1-16
title: "Release 1.16.0: Smarter binaries and built-in TLS"
description: "Release 1.16.0: Smarter binaries and built-in TLS"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/release-1.16.0.png
tags: [product,release-notes]
keywords: [netdata,product]
authors: team
---

<!--truncate-->

<img class="alignnone size-full wp-image-16876" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/release-1.16.0.png" alt="" width="1200" height="600" />

We’re excited to launch release v1.16.0 of the open-source <a href="https://github.com/netdata/netdata/">Netdata monitoring agent</a>, which delivers real-time health monitoring and performance troubleshooting to nearly any system or application.

This release also contains 40 bug fixes, 31 improvements, and 20 documentation updates—if you’d like to see the full list, check out the <a href="https://github.com/netdata/netdata/releases/tag/v1.16.0">full release notes</a>.

Details aside, I know people are going to be most curious about the big changes we’ve just delivered to Netdata—let’s dive in.
<h2>Binary distributions via Packagecloud</h2>
Binary packages are the go-to method for installing software on just about every Linux distribution out there. Most often, these packages are made available by maintainers of your distribution of choice—such as Ubuntu, Debian, Fedora, CentOS, and more—and are downloaded when you run commands like <code>apt-get install netdata</code>.

This way of installing packages via a package manager works brilliantly, except for the fact that these packages might not get updated when we launch a new version of Netdata. By supplying our binary packages via a repository you can add to your package manager’s list, we’ll be able to make sure everyone gets our newest features.

RPM binaries for Fedora, Red Hat Enterprise Linux (RHEL), and openSUSE are now available, and DEB packages for Debian and Ubuntu will be available soon.

<strong>These binaries are still in beta, and if you have issues we encourage you to <a href="https://github.com/netdata/netdata/issues">file an issue</a> so that we can fix it.</strong>
<ul>
 	<li>Get stable packages: <a href="https://packagecloud.io/netdata/netdata">https://packagecloud.io/netdata/netdata</a></li>
 	<li>Get nightly packages: <a href="https://packagecloud.io/netdata/netdata-edge">https://packagecloud.io/netdata/netdata-edge</a></li>
</ul>
<h2>TLS encryption is here!</h2>
One of the most common feature requests is encrypted connections for Netdata’s built-in web server, streaming connections, and communications to various backends. Users want the peace of mind that comes with knowing that Netdata is securing their metrics with a certificate (even self-signed) and encryption.

TLS used to be available only in the nightly builds of Netdata, but with v1.16.0 it’s now available for everyone with automatic updates or those who <a href="https://learn.netdata.cloud/docs/agent/packaging/installer/update/">update manually</a>.

You can now use HTTPS with the built-in web server by <a href="https://learn.netdata.cloud/docs/agent/web/server/#enabling-tls-support">enabling TLS</a>. If you stream data from a slave to its master, TLS <a href="https://learn.netdata.cloud/docs/agent/streaming/#securing-the-communication">works there</a>, too. And after a long wait, you can now encrypt connections to an <a href="https://learn.netdata.cloud/docs/agent/backends/opentsdb/#https">openTSDB backend</a>.
<h2>Get smarter about your health monitoring</h2>
Health monitoring is at the core of why developers, sysadmins, and DevOps engineers choose Netdata again and again. That’s why we’ve introduced two new features to make Netdata’s health monitoring even more robust and customizable.
<h3>Persistent health management API settings</h3>
When we launched the <a href="https://learn.netdata.cloud/docs/agent/web/api/health/#health-management-api">health management API</a> in v1.12, it was designed to help Netdata users quickly silence alarms they don’t want to see regularly. For example, some users don’t want emails for <code>_last_collected</code> alarms. With the API, these users can disable or silence all alarms or specific alarms based on selection criteria.

As of v1.16.0, <strong>Netdata now persists those health management API changes to disk</strong>! This new feature means that your disabled/silenced alarm configuration remains intact, no matter how many times you cycle your systems off and on.
<h3>Repeating alarm notifications</h3>
A lot of Netdata users worry about missing an alarm notification—not a good situation if you’re monitoring mission-critical systems. To help reduce these situations, we’ve launched the ability to <a href="https://learn.netdata.cloud/docs/agent/health/#alarm-line-repeat">repeatedly send alarm notifications</a> for some or all active alarms at any frequency you’d like.

By default, you’ll still only get a single notification, so if you want to try out the new options, you’ll have to dive into your <a href="https://learn.netdata.cloud/docs/agent/health/#alarm-line-repeat">settings</a>.

With better health monitoring comes a more exceptional infrastructure—we can’t wait to see Netdata users try these new features out.
<h2>Help us spread the word!</h2>
We’re proud of these just-launched improvements, and we want more people in the monitoring community to know about it. There are a few ways our fantastic community can help.

<strong>Review Netdata on G2</strong>: One of the best ways for us to get more visibility is to boost the number of reviews we have on review/comparison sites like G2. Head on over to <a href="https://www.g2.com/products/netdata/reviews">profile</a> and click any of the <code>Write a Review</code> buttons. We value your honest feedback!