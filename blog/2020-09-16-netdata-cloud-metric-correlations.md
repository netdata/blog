---
slug: netdata-cloud-metric-correlations
title: "Introducing our first Netdata Cloud Insights feature: Metric Correlations for faster root cause analysis"
description: "Introducing our first Netdata Cloud Insights feature: Metric Correlations for faster root cause analysis"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Cloud-Correlations@2x.png
tags: [product,engineering,machine-learning]
keywords: [netdata,product,engineering,machine-learning]
authors: andy
---

<!--truncate-->

<img class="alignnone size-large wp-image-16623" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Cloud-Correlations@2x-1200x826.png" alt="" width="1200" height="826" />

Today, we are excited to launch our first Netdata Cloud Insights feature, Metric Correlations, developed for discovering underlying issues more quickly and identifying the root cause more efficiently. Read on to learn more about our approach to developing this new feature, how it works, and the many benefits you’ll find incorporating this into your team’s troubleshooting workflow.
<h2>Some background</h2>
Let’s start with a bit of a disclaimer. It seems machine learning (ML) (or “Artificial Intelligence,” if you are looking for more LinkedIn likes) has gone mainstream in the last few years, and we are probably by now somewhere near the “Peak of Inflated Expectations” on the <a title="hype cycle" href="https://en.wikipedia.org/wiki/Hype_cycle" target="_blank" rel="noopener noreferrer">hype cycle</a>. It is in this context that we want to be clear about what our goals are in this space and our approach to releasing data-driven features that draw on techniques from statistics and ML. In short, we want to be clear, open, realistic, and avoid buzzwords at all costs!

Over the next 12 months, we are hoping to begin building a layer of intelligence<sup><a href="https://staging-www.netdata.cloud/blog/netdata-cloud-metric-correlations/#1">1</a></sup> throughout Netdata (both Cloud and Agent) to assist with “<a title="human in the loop" href="https://hai.stanford.edu/blog/humans-loop-design-interactive-ai-systems" target="_blank" rel="noopener noreferrer">human in the loop</a>” troubleshooting, mainly to help users more easily surface slowdowns, anomalies, or other issues and lower your <a title="cognitive load" href="https://en.wikipedia.org/wiki/Cognitive_load" target="_blank" rel="noopener noreferrer">cognitive load</a><sup><a href="https://staging-www.netdata.cloud/blog/netdata-cloud-metric-correlations/#2">2</a></sup> as you troubleshoot using Netdata. Simply put, we’re working to streamline your mean time to resolution (MTTR).

We are not promising self-driving, self-healing monitoring that will tuck you in at night, and you should treat anyone who does with caution, as you should with a lot of the buzz you might see right now around the whole “AIOps” market itself.

Bringing tools and techniques from statistics and machine learning to bear will certainly help make better data-driven products across almost all industries. But we humans are not surplus to these requirements just yet, especially in a space like monitoring where complexity and nuances only grow as systems and infrastructure evolve in parallel with technology.

Rather, our approach for the short-to-medium term will be to add smaller, data-driven features to key parts of how people already interact with Netdata, as well as some completely new approaches to how you can monitor your systems with Netdata. In principle, however, these will typically be features to help “assist and suggest” as opposed to providing blind automation.
<h2>Using Metric Correlations</h2>
In this vein, it is fitting that the default approach of our first release of the Metric Correlations feature uses a well established statistical method to surface charts that might be of interest given a specific window of focus you select.

The use case is this: You see something strange on some chart you are looking at somewhere in Netdata Cloud and would like to identify and analyze the affected metrics and more importantly, the metrics that will lead you to pinpoint a potential root cause. Go to <strong>Insights</strong> &gt; <strong>Metric Correlations</strong>, highlight the area of interest, and click the <strong>Find Correlations</strong> button.

The Metric Correlations feature will look at all the dimensions available to see which have also changed in a significant way in comparison to a baseline window (which currently defaults to an area just before your window of interest, but will be customizable in the future).

<iframe width="560" height="315" src="https://www.youtube.com/embed/ekIfSeb2uh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Admittedly, the “correlation” here then is a bit indirect, in that what you are really doing is many separate comparisons, one for each metric independently, between the baseline window and the highlighted window you have selected, and then prioritizing those metrics that seem to have changed the most across those two windows. Everything that we can score is returned<sup><a href="https://staging-www.netdata.cloud/blog/netdata-cloud-metric-correlations/#3">3</a></sup>. The picture below might explain things a bit more clearly.

<img class="alignnone size-large wp-image-16628" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2020/09/Screenshot-2022-03-24-at-15.36.33-1200x747.png" alt="" width="1200" height="747" />

The results you get are the usual Netdata interface and charts, but with only the metrics with a score below a threshold defined by the slider<sup><a href="https://staging-www.netdata.cloud/blog/netdata-cloud-metric-correlations/#4">4</a></sup>. Moving the slider to the right (towards <strong>Show more</strong>) will loosen this threshold and likely include somewhat less relevant results. If you move the slider to the left (towards <strong>Show less</strong>), then you should only see the metrics that have changed the most<sup><a href="https://staging-www.netdata.cloud/blog/netdata-cloud-metric-correlations/#5">5</a></sup>.

Below is a picture of how this looks and what you are looking at.

<img class="alignnone wp-image-16631 size-large" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2020/09/Screenshot-2022-03-24-at-15.36.45-1200x748.png" alt="" width="1200" height="748" />
<h2>Thoughts, ideas, feedback? We want to hear from you!</h2>
Feedback on the features we introduce is crucial for our plans to refine and improve, as well as decide where else to focus our efforts for new or related ideas. If you are using this feature and feel strongly enough to provide any sort of feedback, positive or negative, you can use the thumbs up or down button or the <strong>Help</strong> widget on the bottom right if you’d like to give more detailed feedback as shown in the diagram above.

Feel free to also reach out to us on the <a title="Netdata Community forums" href="https://community.netdata.cloud/" target="_blank" rel="noopener noreferrer">Netdata Community forums</a>; we’d be happy to chat more and learn what other features you might be interested in seeing added to our roadmap.

That’s it! We hope you find this feature useful and that it saves you a few precious minutes the next time you have a problem that needs troubleshooting.

<a href="https://app.netdata.cloud/" target="_blank" rel="noopener"><button>Sign in to Cloud</button></a>

<sup><a name="1"></a>1</sup>“Layer of intelligence” is maybe a buzz phrase. Apologies; it seems they are hard to avoid.
<sup><a name="2"></a>2</sup>We are allowing ourselves to use buzzwords from psychology. 🙂
<sup><a name="3"></a>3</sup>Lots of dimensions and charts will typically be filtered as unscored due to things like being a single constant value or having insufficient data for scoring. Your scored metrics will almost always be fewer than all available metrics.
<sup><a name="4"></a>4</sup> Currently a p-value &lt;=0.1
<sup><a name="5"></a>5</sup> There may be false positives from the algorithm (as you might expect with any other). 🙂