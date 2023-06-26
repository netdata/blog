---
slug: introducing-netdata-source-plugin-for-grafana
title: "Introducing the Netdata Source Plugin for Grafana"
authors: hugo
tags: [grafana, plugin,observability,openmetrics,prometheus]
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/postgresql_dash-600x354.png
---

![sample-dashboard](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/postgresql_dash-600x354.png)

The open-source community is about to benefit greatly from Netdata's new Grafana data source plugin, which makes use of a powerful data collection engine.

<!--truncate-->

This new plugin maximizes the troubleshooting capabilities of Netdata in Grafana, making them more widely available. Some of the key capabilities provided to you with this plugin include the following:
<ul>
 	<li>Real-time monitoring with single-second granularity.</li>
 	<li>Installation and out-of-the-box integrations available in seconds from one line of code.</li>
 	<li>2,000+ metrics from across your whole Infrastructure, with insightful metadata associated with them.</li>
 	<li>Access to our fresh ML metrics (anomaly rates) - exposing our ML capabilities at the edge!</li>
</ul>

## Why did we decide to do it?

We are huge fans of Open-Source culture. Open-source is deeply rooted in Netdata's DNA. Because of this, at Netdata, we don’t really buy into the “single pane of glass” or “observability platform” buzzwords. The reality is that things are just more complicated than that in real life.

Instead, we want to focus on what we currently do well while also providing as much easy interoperability as possible with other important tools in the ecosystem, with Grafana obviously being a majorly important one.

![](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/image11-600x145.png)

## How does it work?

![](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/image71-600x403.png)

Netdata’s data source plugin connects directly to our Netdata Cloud APIs, meaning that you’ll need to have your nodes (hosts) connected to Netdata Cloud in order to be able to have them exposed on our plugin. For security purposes, you will also need an API token for authentication (which you can get from within your Netdata profile).

The Netdata Agent will need to be installed and running on your server, VM and/or cluster, so that it can start collecting all the relevant metrics you have from the server and applications running on it.

If you already have a Netdata Cloud account created, most probably during installation you already have connected it to a Space and Room; the connecting command provided from the Netdata Cloud does this, if you haven’t, you need to <a href="https://app.netdata.cloud/">sign up  to create an account</a> and connect your Nodes to the Space(s) and Room(s), organizing them the best way it suits you or your organization (you can find some guidelines here).

Once you have all your nodes connected to Netdata Cloud you must proceed with creating an API token, which will be linked to your Netdata Cloud account. The API token provides a means to authenticate external calls to our APIs, allowing the same access as you to the Spaces and Rooms you can see on Netdata Cloud.

![](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/image51-600x354.png)

This API token will be required when you are installing the Netdata data source plugin on Grafana Cloud or locally

![](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/image61-600x354.png)

Having completed all the above steps, you’re ready to start taking advantage of Netdata’s troubleshooting capabilities in Grafana!

## How does the Query builder work with the Netdata plugin?

Once you have selected Netdata as your data source, this is how the query builder will look.

![](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/image31-1-600x219.png)

To retrieve data from our APIs the minimum attributes you need to define are: Space and Room, which will allow you to restrict to a specific set of Nodes, and Context (more on this) do define what metrics you want to retrieve. Having defined these 3 attributes you will be seeing data displayed on the chart, which should be the same as the one you see on your Overview tab on Netdata Cloud.

We provide additional attributes to: filter more on the data you are retrieving, define what kind of grouping you want to be applied and what aggregations. The attributes are as follows:
<ul>
 	<li><strong>Nodes</strong> - select one or more Nodes to be queried. blank means all Nodes.</li>
 	<li><strong>Dimensions</strong> - select which dimension(s) you want to filter on, you can even use wildcards. blank means all dimensions.</li>
 	<li><strong>Grouping by</strong> - what kind of grouping you want to apply: dimension, nodes, instances, etc.</li>
 	<li><strong>Grouping function</strong> - define what mathematical functional you want to apply over when multiple data sources.</li>
 	<li><strong>Aggregation function</strong> - define what aggregation you want to apply when the granularity of the data collected is higher than the plotted points on the chart.</li>
 	<li><strong>Filter by</strong> - using the available chart labels, which change from context to context, you can select a key-value pair to filter the data you want to see.</li>
</ul>

Sample dashboard

![](https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/09/postgresql_dash-600x354.png)

## How to install it on your Grafana environment?

In order to start using the Netdata data source plugin on your Grafana envi ronment, local or Cloud, you need to install the plugin manually. Here are some tips to get through this depending on your setup:
<ul>
 	<li>Docker</li>
 	<li>Linux (local)</li>
 	<li>Windows (local - powershell)</li>
 	<li>Building the plugin locally</li>
</ul>

### Docker

#### Pre-buit script - setup-demo-environment

We provide you a script <code class="rich-diff-level-one">setup-demo-environment.sh</code> that will help you setting this up real fast. To start the container with the Netdata datasource plugin already installed you just need to:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
<p class="notranslate"><code>setup-demo-environment.sh run</code></p>

<div class="zeroclipboard-container position-absolute right-0 top-0">To remove container:</div>
</div>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
<p class="notranslate"><code>setup-demo-environment.sh remove</code></p>
<p dir="auto">This script will:</p>

<ol>
 	<li dir="auto">Spin up a grafana container without starting grafana itself</li>
 	<li>Retrieve the latest available release of the Netdata datasource plugin</li>
 	<li>Install the Netdata datasource plugin in <strong><em>/var/lib/grafana/plugins</em></strong></li>
 	<li>Start grafana</li>
</ol>

#### Manual step-by-step

</div>
<ul>
 	<li>Setup your grafana docker container with the the permissions to load netdata plugin as an unsinged plugin
<ul>
 	<li><code>docker run -d --env GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=netdata-datasource --name=grafana grafana/grafana</code></li>
</ul>
</li>
 	<li>Ensure you have the desired version of the plugin you want to install, get it from <a href="https://github.com/netdata/netdata-grafana-datasource-plugin/releases">github releases</a>
<ul>
 	<li><code>wget `curl -s https://api.github.com/repos/netdata/netdata-grafana-datasource-plugin/releases/latest | jq -r '.assets[] | select(.name|match("zip$")) | .browser_download_url'`</code></li>
</ul>
</li>
 	<li>Copy the contents of the Netdata data source plugin to Grafana plugins directory, by default <em><strong>/var/lib/grafana/plugins</strong></em>
<ul>
 	<li><code>unzip netdata-datasource-&lt;version_number&gt;.zip</code></li>
 	<li><code>docker cp netdata-datasource grafana:/var/lib/grafana/plugins/</code></li>
</ul>
</li>
</ul>

### Linux (local)

<ul>
 	<li>Ensure you have the desired version of the plugin you want to install, get it from <a href="https://github.com/netdata/netdata-grafana-datasource-plugin/releases">github releases</a>
<ul>
 	<li><code>wget `curl -s https://api.github.com/repos/netdata/netdata-grafana-datasource-plugin/releases/latest | jq -r '.assets[] | select(.name|match("zip$")) | .browser_download_url'`</code></li>
</ul>
</li>
 	<li>Copy the contents of the Netdata data source plugin to Grafana plugins directory, by default <strong><em>/var/lib/grafana/plugins</em></strong>
<ul>
 	<li><code>unzip netdata-datasource-&lt;version_number&gt;.zip</code></li>
 	<li><code>cp -rf netdata-datasource /var/lib/grafana/plugins</code></li>
</ul>
</li>
 	<li>Ensure that Netdata plugin which currently isn’t signed can be registered
<ul>
 	<li><code>vi /etc/grafana/grafana.ini</code></li>
 	<li>On <strong><em>allow_loading_unsigned_plugins</em></strong> entry add <strong><em>netdata-datasource</em></strong></li>
 	<li><code>allow_loading_unsigned_plugins = netdata-datasource</code></li>
</ul>
</li>
 	<li>After adding the plugin a restart of grafana server is needed
<ul>
 	<li>For init.d based services you can use the command:
<code>sudo service grafana-server restart</code></li>
 	<li>For systemd based services you can use the following:
<code>systemctl restart grafana-server</code></li>
</ul>
</li>
</ul>

### Windows (local)

<ul>
 	<li>Ensure you have the desired version of the plugin you want to install, get it from <a href="https://github.com/netdata/netdata-grafana-datasource-plugin/releases">github releases</a>
<ul>
 	<li>Going to https://github.com/netdata/netdata-grafana-datasource-plugin/releases/latest</li>
 	<li>Downloading the zip file with the latest release, e.g. <em>netdata-datasource-1.0.12.zip</em></li>
</ul>
</li>
 	<li>Grafana plugins, by default, should be under <strong><i>C:\Program Files\GrafanaLabs\grafana\data\plugins</i></strong>. Create a folder for <i>netdata</i>
<ul>
 	<li><code>mkdir ‘C:\Program Files\GrafanaLabs\grafana\data\plugins\netdata’</code></li>
</ul>
</li>
 	<li>Copy the contents of the Netdata data source plugin to the Grafana plugins directory, by default C:\Program Files\GrafanaLabs\grafana\data\plugins
<ul>
 	<li><code>Expand-Archive \.netdata-datasource-&lt;version_number&gt;.zip \.<i> </i></code></li>
 	<li><code>xcopy .\netdata-datasource\ "C:\Program Files\GrafanaLabs\grafana\data\plugins\netdata-datasource\" /E</code></li>
</ul>
</li>
 	<li>Ensure that Netdata plugin which currently isn’t signed can be registered
<ul>
 	<li><code>notepad ‘C:\Program Files\GrafanaLabs\grafana\conf\default.ini’</code></li>
 	<li>On <strong><em>allow_loading_unsigned_plugins</em></strong> entry add <strong><em>netdata-datasource</em></strong></li>
 	<li><code>allow_loading_unsigned_plugins = netdata-datasource</code></li>
</ul>
</li>
 	<li>After adding the plugin a restart of grafana server is needed
<ul>
 	<li><code>net stop Grafana</code></li>
 	<li><code>net start Grafana</code></li>
</ul>
</li>
</ul>

### Building the plugin locally

For any of the above steps if you prefer to build this plugin locally instead of retrieving it from from the releases you can:
<ul>
 	<li>Clone this repo
<ul>
 	<li><code>git clone https://github.com/netdata/netdata-grafana-datasource-plugin</code></li>
</ul>
</li>
 	<li>Build it locally
<ul>
 	<li><code>yarn</code></li>
 	<li><code>yarn build</code></li>
</ul>
</li>
</ul>

## What’s next?

Hoping the Open-Source community will take value from this plugin, we don’t plan on stopping here. We want to keep improving this plugin and we already have some enhancements on our backlog, including the following plans:
<ul>
 	<li>Enabling variable functionality</li>
 	<li>Allowing filtering with multiple key-value combinations)</li>
 	<li>Providing sample templates for certain use-cases, e.g. monitoring PostgreSQL</li>
</ul>

Beside this, we would love to get the community involved in this project, like we do for the <a href="https://github.com/netdata/netdata">Netdata Agent repo</a>, if you have ideas on things you would like to see or just share a cool dashboard you setup you are more than welcome to contribute just drop by <a href="https://github.com/netdata/netdata-grafana-datasource-plugin">https://github.com/netdata/netdata-grafana-datasource-plugin</a>.

## More Info

For more information, refer to the following links:
<ul>
 	<li><a href="https://learn.netdata.cloud/docs/overview/what-is-netdata">What is Netdata?</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/cloud">Netdata Cloud</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/get-started">Netdata Agent</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/dashboard/dimensions-contexts-families#context">Contexts</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/cloud/visualize/overview#group-by-dimension-node-or-chart">Grouping by</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/cloud/visualize/overview#aggregate-functions-over-data-sources">Grouping function</a></li>
 	<li><a href="https://learn.netdata.cloud/docs/cloud/visualize/overview#aggregate-functions-over-time">Aggregation function (over time)</a></li>
 	<li><a href="https://learn.netdata.cloud/contribute/handbook">Contributing</a></li>
</ul>

Hope you are ready and excited to start taking advantage of Netdata Grafana datasource plugin!

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>. 

Happy Troubleshooting!