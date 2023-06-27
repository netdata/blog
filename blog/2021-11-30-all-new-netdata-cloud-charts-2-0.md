---
slug: all-new-netdata-cloud-charts-2-0
title: "All-new Netdata Cloud Charts 2.0"
description: "All-new Netdata Cloud Charts 2.0"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Netdata-Charts-2.0.png
tags: [engineering,product,charts,observability]
keywords: [netdata,engineering,product]
authors: hugo
---

<!--truncate-->


<figure class="wp-block-image size-large"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Netdata-Charts-2.0-1200x704.png" alt="" class="wp-image-16212"/></figure>



Netdata excels in collecting, storing, and organizing metrics in out-of-the-box dashboards for powerful troubleshooting. We are now doubling down on this by transforming data into even more effective visualizations, helping you make the most sense out of all your metrics for increased observability.



The new Netdata Charts provide a ton of useful information and we invite you to further explore our new charts from a design and development perspective. As always, it’s our goal to be as open and transparent as possible with our users on all things Netdata, including the ins and outs of how Netdata is built, why we make certain design decisions (driven by you of course!), and where we are heading as we continue to grow.



With the new Netdata Charts you can:



<ul><li>Enjoy the same high resolution and granularity of metrics collected you expect from Netdata with even more clarity</li><li>Explore visualizations with more options, such as Line, Stacked, and Area types. Bar, Pie, Gauges will be added shortly, and then even more to come</li><li>Examine all the metrics where your cursor is with a tooltip. We are already <em>cooking up </em>an advanced tooltip that will give you all the required aggregations to make sense of your data – min, max, coefficient variation, standard deviation, and volume, when applicable</li><li>Use tooling and shortcuts to pan, zoom, or highlight your charts</li><li>Easy access to <a href="https://learn.netdata.cloud/docs/cloud/insights/metric-correlations">Metric Correlations</a> when you highlight charts to view  which other metrics have similar patterns</li><li>Have the dimensions sorted based on name or value as you please</li><li>Use full-screen mode</li><li>Read useful information about the chart, its plugin, context, and type</li><li>Get the chart status and possible errors. On top, reload functionality</li></ul>



<figure class="wp-block-image size-full"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/ezgif-1-2ac81d0df3.gif" alt="" class="wp-image-16214"/></figure>



## New chart engine underneath



In order to support the growth of the product and continue to bring new features to our users, we have re-engineered our front-end app.



The first BIG task was to identify what chart library would best support our requirements. Since Netdata charts are highly granular with per-second metrics, the application requires functionality for visualizations that are frequently changed. The charts are augmented with a range of capabilities like panning, zooming, and other actions. We wanted, and<em>needed</em>, to keep the core chart functionality as lightweight as possible in terms of bundle size and dependencies, since we plan to embed them in third-party environments.



Considering the above, we avoided solutions that are based on a specific framework, like React, for two reasons.



<ul><li>We create dependencies that are in a library that will cause issues in the third-party integrations</li><li>Tools like React perform based on instance reference changes. This pattern does not execute well with frequently changed bulk data.</li></ul>



After investigating many solutions, we concluded that the<a href="https://dygraphs.com/">dygraph chart library</a>was the most suitable method because the solution could handle hovering synchronization in numerous charts with many data points. While there are other solutions that may display information in a more attractive presentation, we decided that providing you with fast, reliable functionality was more important than minor aesthetic concerns.



After this decision was made, we reviewed our application architecture to find ways to make it modular, scalable, and with a focus on decoupled components. This lead us to make the following enhancements:



<ul><li>We decoupled the charts completely from the Netdata Agent repo, to provide the ability for charts to be used as standalone components on any app that needs them</li><li>We kept it framework-free (no React – vanilla js) for the main chart engine, so users can use however they see fit with no concerns on there are no dependencies upon integration</li><li>We introduced containers, so that you can optionally create custom dashboards of grouped charts and see these in sync with the rest of the group while others keep their own context. You can nest charts and their containers as you like.</li><li>We implemented events and listeners. Those who use events and listeners on their apps have access to what’s occurring under the hood through exported listeners.</li></ul>



## Design upgrade



You ask, we listened! We redesigned charts by initially creating a prototype that was based on real user testing and feedback. Because we have a massive user base of both beginners and IT pros, we made it our goal to drive wide user adoption by developing more powerful troubleshooting, while maintaining the ease of use factor



The challenge was adding this new, rich functionality with a lean appearance to drive focus toward the information represented by the graph of the chart. But we have managed a presentation that brings functional items to attention as a user focuses on the chart Using our product research gathered, we optimized the experience which incorporates both the previous and new patterns that were analyzed.  Finally, we structured the information in a hierarchical way. This was done to reduce cognitive load while maintaining the modularity necessary, which will support more advanced features requested by the Netdata community in the future. 


<!-- wp:image {"id":16216,"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/ezgif-1-9bccfc91e4.gif" alt="" class="wp-image-16216"/></figure>



## And more to come



We will be bringing you many more exciting new features in the upcoming months. By popular demand, some of what’s to come include features like annotations, metric filtering, and alert overlays. Volume ratios are also the roadmap, which will provide you a comprehensive way to view how your metrics perform in comparison with past timeframes, as well as more tooling to get more information out of your data for increased observability.



Enjoy and stay tuned!
