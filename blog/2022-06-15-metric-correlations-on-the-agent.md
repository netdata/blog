---
title: Metric Correlations on the Agent
slug: metric-correlations-on-the-agent
description: Netdata now can run Metric Correlations on the Agent.
image: /img/wp-archive/uploads/2022/06/mc-comparisons-1.png
tags: [machine-learning,ml,metric-correlations,troubleshooting]
keywords: [machine-learning,ml,metric-correlations]
authors: andy
---
As of <a href="https://github.com/netdata/netdata/releases/tag/v1.35.0" target="_blank" rel="noopener"><code>v1.35.0</code></a> the Netdata Agent can now run <a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations" target="_blank" rel="noopener">Metric Correlations</a> (MC) itself. This means that, for nodes with MC enabled, the Metric Correlations feature just got a whole lot faster!
<!--truncate-->
The Netdata Metric Correlations feature uses a <a href="https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test#Two-sample_Kolmogorov%E2%80%93Smirnov_test" target="_blank" rel="noopener">Two Sample Kolmogorov-Smirnov test</a> to look for which metrics have a significant distributional change around a highlighted window of interest. This can be useful when you are interested in short term "<a href="https://en.wikipedia.org/wiki/Change_detection" target="_blank" rel="noopener">change detection</a>" and want to try answer the question "what else changed around this time?".

Our original implementation was via a Python <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener">FastAPI</a> based cloud service that wrapped up the <code><a href="https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html" target="_blank" rel="noopener">scipy.stats.ks_2samp()</a></code> function of the popular open source <a href="https://docs.scipy.org/doc/scipy/index.html" target="_blank" rel="noopener">SciPy</a> package.

While this has worked well, it requires the underlying raw input data (all metrics!) to be sent over the network to the cloud service for the statistical test computation to happen. Results are then returned to the Netdata Cloud frontend to filter for only those metrics that have changed the most (according to the statistical test). Obviously, this means some latency while all this data gets sent around, so users could be waiting anywhere from 5 to up to 25 seconds for results in some cases.

So, to give users a faster option, we decided to re-implement the whole algorithm on the Agent itself in C (<a href="https://github.com/netdata/netdata/pull/12582" target="_blank" rel="noopener">here</a> is the PR if you'd like to geek out a bit). This means that Netdata Agents now have a new <code>/api/v1/metric_correlations</code> endpoint that can run the MC algorithm without having to send any data anywhere.

Below you can see the typical latencies on the default cloud based Metric Correlations service range from 5 to 25 seconds.

![latency based on cloud microservice](/img/wp-archive/uploads/2022/06/mc_cloud_latency-1-600x211.png)

In comparison we can see that the latencies for the agent based Metric Correlations tend to be between 100 milliseconds to maybe 5 seconds typical upper range.

![latency based on agent](/img/wp-archive/uploads/2022/06/mc_agent_latency-2-600x211.png)

## Getting started

Following some <a href="https://github.com/netdata/netdata/pull/13107" target="_blank" rel="noopener">amazing optimizations</a> by our CEO (yes our CEO!) it is actually more efficient to run MC on the agent than it even was previously to prepare the input data to send to the MC cloud service, as such it has been enabled by default since <code>v1.35.0-22-nightly</code>.

This means you can get blazing fast metric correlations, out of the box, just by updating your nodes to the latest <a href="https://learn.netdata.cloud/docs/agent/packaging/installer/#nightly-vs-stable-releases" target="_blank" rel="noopener">nightly release</a>.

## Coming soon

Creating the ability to run the Metric Correlations computation on the Netdata Agent is the first step towards cross node Metric Correlations on the Overview tab. We are also planning on implementing various different algorithms as part of metric correlations so you can try a few different approaches as you troubleshoot.

## Learn more

If you would like to learn more, check out the Metric Correlations <a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations#metric-correlations-on-the-agent" target="_blank" rel="noopener">documentation</a> or feel free to leave some feedback in our <a href="https://community.netdata.cloud/t/metric-correlations-on-agent-beta-launch/2943" target="_blank" rel="noopener">beta launch community post</a> or come chat in our <a href="https://discord.gg/kUk3nCmbtx" target="_blank" rel="noopener">discord</a>.