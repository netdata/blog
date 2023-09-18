---
slug: netdata-agent-dashboard
title: "Netdata’s dashboard: open by default and secure by design"
description: "Netdata’s dashboard: open by default and secure by design"
image: /img/wp-archive/uploads/2022/03/netdata-dashboard-open-secure-min.png
tags: [product]
keywords: [netdata,product]
authors: team
---

<!--truncate-->

<img class="alignnone size-large wp-image-16569" src="/img/wp-archive/uploads/2022/03/netdata-dashboard-open-secure-min-1200x826.png" alt="" width="1200" height="826" />

Let’s talk through a scenario: You have a Linux-based VM running on DigitalOcean (aka a Droplet), and you install Netdata on it using our <a href="https://learn.netdata.cloud/docs/get#install-the-netdata-agent" target="_blank" rel="noopener noreferrer">recommended kickstart script</a>. As the installation process winds down, the Droplet starts up the Netdata Agent’s web server and serves the local Agent web dashboard on port 19999. You navigate to the dashboard using your browser of choice, check out per-second metrics updating in real time in a few of the hundreds of preconfigured visualizations, then realize…
> 😱 If I can access this dashboard, so can anyone else! My system is already compromised!
Let’s break that down a bit. Can anyone access the dashboard? In this specific case, yes. As long as there is no hardware or software firewall/router between the node and the internet at large, anyone can access the dashboard if they know the IP address.

Is the system compromised? Absolutely not. So before you jump back into the DigitalOcean dashboard to destroy your Droplet, let’s take a moment to look into the reality of <i>why</i> Netdata exposes the dashboard on this port by default. From there, you can better understand how to mitigate any possible security concerns, and how this design decision gives you <i>more</i> power over your nodes, not less.
<h2>The hows and whys of publicly serving metrics by default</h2>
We decided years ago to spin up the web server on port 19999 by default. This decision, and the subsequent discussions, can still be found on <a href="https://github.com/netdata/netdata/issues/70" target="_blank" rel="noopener noreferrer">GitHub</a> dating back to <a href="https://github.com/netdata/netdata/issues/120" target="_blank" rel="noopener noreferrer">early 2016</a>. The project was just getting popular for the first time then, and a lot of people were thrilled about visualizing thousands of metrics about their systems and applications for the first time. They also weren’t used to seeing thousands of metrics exposed on a single port.

It’s a valid concern (Netdata does not have built-in password authentication) amplified into a <a href="https://staging-www.netdata.cloud/blog/the-reality-of-netdatas-long-term-metrics-storage-database/" target="_blank" rel="noopener noreferrer">myth</a>: It must be insecure!

But Netdata is an opinionated monitoring solution. One of its opinions is that it should be designed to help users go from <i>zero to real-time monitoring</i> in a matter of minutes. Users should be able to install Netdata, load the dashboard, and see meaningful metrics and visualizations without wasting time configuring collectors or organizing metrics into charts.

If Netdata didn’t serve its local dashboard at port 19999 by default, and immediately after installation, you would have to install your own web server before seeing all your real-time metrics. That’s another dozen complex post-installation steps, another dependency to worry about, and another thing to break. Can you imagine our <a href="https://learn.netdata.cloud/" target="_blank" rel="noopener noreferrer">documentation</a> demanding that you install Nginx, copy a long configuration file into <code>sites-enabled</code>, tweak a few files in <code>/etc/nginx</code> (or is it <code>/usr/local/nginx/conf</code> or <code>/usr/local/etc/nginx</code>), buy a domain name, configure DNS, and <em>then</em> start collecting metrics?

That’s not a good real-time monitoring experience. And we’re also of the opinion that your monitoring experience should be really good.

The truth is that Netdata was designed to be both open and safe. In our <a href="https://learn.netdata.cloud/docs/agent/netdata-security" target="_blank" rel="noopener noreferrer">security design</a> document, we outline the decisions made years ago, and what they mean for your day-to-day Netdata usage. Here’s a summary:
<ul>
 	<li><strong>Netdata is read-only</strong>. You can’t tell it to do anything, and it can’t change your system in any way.</li>
 	<li><strong>Netdata runs without special/sudo privileges</strong>. It couldn’t make changes to your system even if you wanted it to. Hooray for <a href="https://en.wikipedia.org/wiki/File-system_permissions#Traditional_Unix_permissions" target="_blank" rel="noopener noreferrer">UNIX permissions</a>.</li>
 	<li><strong>Netdata only exposes chart metadata and metrics values</strong>. Even if an unknown person accesses your system’s Netdata dashboard, they never see raw data or sensitive information about the system itself, such as its OS or kernel versions.</li>
 	<li><strong>Collectors are hardcoded and receive no commands from Netdata</strong>. Collectors like to gather metrics, and that’s it.</li>
 	<li><strong>Data flows unidirectionally, from collectors to the Netdata Agent</strong>. Netdata never tries to, and cannot, write data to anything but its own database. It can’t control your applications, alter their configuration files, or even read files it wasn’t <a href="https://github.com/netdata/netdata" target="_blank" rel="noopener noreferrer">transparently designed</a> to do.</li>
</ul>
Apply these points to the scenario that started this post. Given what you know now, is the system compromised? No. An attacker can’t use Netdata itself to harm the system. They can’t force the MySQL collector to write into a database, and they can’t escalate privileges using <code>sudo</code> to make a system-wide configuration change. They can’t magically read <code>/etc/shadow</code>.

<i>Should</i> you let anyone see your node’s dashboard? No! We absolutely recommend that you secure your nodes in any way you or your organization see fit, but Netdata is never going to dictate how you do that. Instead, it works <i>with</i> you to find a solution that’s both secure and feature-rich.
<strong>Pro-tip:</strong>

If you haven’t installed Netdata yet, use the <code>--dont-start-it</code> option during installation. This prevents the <code>netdata</code> demon from starting up until you call it explicitly with <code>systemctl netdata start</code>.
<pre class=" language-shell"><code class=" language-shell"><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span>curl -Ss https://my-netdata.io/kickstart.sh<span class="token punctuation">)</span> --dont-start-it</code></pre>
You can now take the time you need to configure Netdata according to your needs before you start the daemon and collect metrics.

<h2>How to improve Netdata’s security without sacrificing features</h2>
While Netdata is indeed opinionated, you can also change its mind quite easily. We now support several configurations that provide rich functionality and full access to real-time dashboards while also providing some more security for those who want to control their infrastructure or are required to by their organization.

<a href="https://staging-www.netdata.cloud/cloud/" target="_blank" rel="noopener noreferrer">Netdata Cloud</a> is entirely opt-in, but if real-time cloud infrastructure monitoring with composite charts and Metric Correlations sounds good to you, it’s a great solution to all your potential security concerns. Netdata Cloud receives chart metadata and metrics values over an Agent-initiated, MQTT over secure websocket connection. This connection is secured with a TLS keypair, and because it uses the standard port 443 for encrypted communications, you don’t have to open any inbound ports in your infrastructure.

By connecting your node to Netdata Cloud and restricting access to the local Agent dashboard, you reduce exposure while also maintaining all the features about Netdata that you know and love.

<img class="alignnone size-large wp-image-16571" src="/img/wp-archive/uploads/2022/03/netdata-dashboard-routes-min-1200x582.png" alt="" width="1200" height="582" />

The good news is that no matter what path you take, your nodes can always communicate with Netdata Cloud to securely stream metrics values and alarm status to your browser on-demand. It’s the best of both security and usability worlds.

But let’s walk through some of the available routes for that VM running on DigitalOcean.

Down route A, you can <strong>turn the local Agent dashboard off</strong>. In our opinion, this is the best solution because it prevents anyone from accessing your local Agent dashboard at <code>http://NODE:19999</code>, but maintains the <a href="https://learn.netdata.cloud/docs/agent/aclk" target="_blank" rel="noopener noreferrer">Agent-Cloud Link</a> (ACLK) with your Netdata Cloud account for secure on-demand streaming of metrics values to your browser. You can still claim your node(s), view their single-node dashboards, view aggregated metrics together using the <a href="https://learn.netdata.cloud/docs/visualize/overview-infrastructure" target="_blank" rel="noopener noreferrer">Overview’s composite charts</a>, and much more.

<a href="https://learn.netdata.cloud/docs/configure/secure-nodes#disable-the-local-dashboard" target="_blank" rel="noopener noreferrer">Learn how to take route A</a>.
<ul>
 	<li>Pros:
<ul>
 	<li>Nothing for anyone to see on port 19999.</li>
 	<li>Easiest setup (change a single line in one configuration file!).</li>
 	<li>Full compatibility with Netdata Cloud’s dashboards and features.</li>
</ul>
</li>
 	<li>Cons:
<ul>
 	<li>No ability to view the local Agent dashboard.</li>
 	<li>No API.</li>
</ul>
</li>
</ul>
Route B takes you to <strong>using the <code>bind</code> option to restrict dashboard access</strong>. With access lists, you can control exactly who, and from what source, someone can view your local Agent dashboard. This route is ideal for those who want to secure the local Agent dashboard from unauthorized access and see everything in Netdata Cloud, but also want the flexibility to build custom local dashboards or power other business processes with Netdata’s API.

<a href="https://learn.netdata.cloud/docs/configure/secure-nodes#restrict-access-to-the-local-dashboard" target="_blank" rel="noopener noreferrer">Learn how to take route B</a>.
<ul>
 	<li>Pros:
<ul>
 	<li>Leave the local Agent dashboard running, but restricted to only known networks or trusted external IPs.</li>
 	<li>Full compatibility with Netdata Cloud’s dashboards and features.</li>
</ul>
</li>
 	<li>Cons:
<ul>
 	<li>Requires more upfront configuration and knowledge of access lists.</li>
 	<li>Requires a relatively static IP or management LAN.</li>
</ul>
</li>
</ul>
Route C is the original, and it’s still good: <strong>Put Netdata behind a reverse web proxy</strong> like Nginx, which then provides all sorts of value-added benefits like HTTPS connections and username/password authentication. A robust, dedicated web server like Nginx provides more stability and security, plus many more configuration options, which is why we use it in front of our <a href="https://london.my-netdata.io/" target="_blank" rel="noopener noreferrer">London demo server</a>. You’re also not limited to Nginx, as this route gels nicely with Apache, Lighttpd, HAProxy, and Caddy. You can still connect to Netdata Cloud, since the WSS connection works in parallel with HTTPS from your browser. It’s the best of all worlds, but it does take more time and Linux systems experience to do properly.

<a href="https://learn.netdata.cloud/docs/agent/running-behind-nginx" target="_blank" rel="noopener noreferrer">Learn how to take route C</a>.
<ul>
 	<li>Pros:
<ul>
 	<li>Leave the local Agent dashboard running, with optional password authentication.</li>
 	<li>Leverage a dedicated web server’s additional features and configuration options.</li>
 	<li>Optional easy HTTPS/SSL with Let’s Encrypt.</li>
 	<li>Full compatibility with Netdata Cloud’s dashboards and features.</li>
</ul>
</li>
 	<li>Cons:
<ul>
 	<li>Requires the most upfront configuration, installation of new packages, and knowledge of web server configuration.</li>
 	<li>Requires some knowledge of TLS keypairs.</li>
 	<li>Often requires a domain name to associate with the node, which in turn requires some DNS configuration.</li>
</ul>
</li>
</ul>
<h2>Choose your own adven… monitoring setup</h2>
A monitoring solution should slot seamlessly into the existing strategy to organize and secure both individual nodes and the entire infrastructure, not advocate for one route or another. We have no desire to tell our users how to do that work, nor are we qualified to offer best practices for <i>your </i>particular environment.

And now that you’re educated about the routes available to you, you have all the know-how to make the best decision for your infrastructure. You could even choose to leave port 19999 exposed by default and choose to secure your nodes in other ways, which is what we’ve done with our own <a href="https://london.my-netdata.io/" target="_blank" rel="noopener noreferrer">demo server</a>.

Whichever way you go, Netdata is ready to meet you halfway with the same per-second metrics, instant visualizations, and powerful infrastructure monitoring tools in Netdata Cloud. What some used to call an insecure default, we can now name correctly: a configurable default that emphasizes immediate results and puts trust in our users.

<a href="https://learn.netdata.cloud/docs/configure/secure-nodes" target="_blank" rel="noopener"><button>Secure your nodes</button></a> <a href="https://app.netdata.cloud/" target="_blank" rel="noopener"><button>Sign in to Netdata Cloud</button></a>