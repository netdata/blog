---
title: "Contribute to Netdata’s machine learning efforts!"
summary: ""
date: 2020-03-16
author: "Andrew Maguire" 
cover: "contribute-machine-learning.png"
tags: ["machine learning"] 
categories: [] 
draft: false
---

Netdata contributors have greatly influenced the growth of our company and are essential to our success. The time and
expertise that contributors volunteer are fundamental to our goal of helping you build extraordinary infrastructures. We
highly value end-user feedback during product development, which is why we’re looking to involve you in progressing our
machine learning (ML) efforts! 

<!--more-->

As we are continually looking for ways to improve and enhance Netdata, we are starting to explore how we can leverage
machine learning to introduce new product features.

Our main focus at the moment is around automated [anomaly detection](https://en.wikipedia.org/wiki/Anomaly_detection).
This is a really interesting and challenging problem (high volume, high dimensional data, lack of ground truth labels,
and so on), but we should be able to use some of the metrics monitored by Netdata to deliver new, awesome product
features and user experiences (AI is the [new
electricity](https://www.gsb.stanford.edu/insights/andrew-ng-why-ai-new-electricity), after all 😃). 

However, developing ML-driven product features is quite different than traditional software development (see steps 1 to
7 in the picture above). Mainly, this is because you never really know what specific data transformations, problem
formulation, and sets of algorithms will work best in advance.
([Here](https://www.kdnuggets.com/2019/09/no-free-lunch-data-science.html) is a good article explaining things, and if
you really want to go down a rabbit hole, check out this [Stack Overflow
question](https://ai.stackexchange.com/questions/15650/what-are-the-implications-of-the-no-free-lunch-theorem-for-machine-learning)
and this [Quora
thread](https://www.quora.com/What-does-the-No-Free-Lunch-theorem-mean-for-machine-learning-In-what-ways-do-popular-ML-algorithms-overcome-the-limitations-set-by-this-theorem)).

Ideally, you first need to prototype your solution "in the lab" on some data you have already collected and do a few
iterations of data → problem formulation → prototype. This process gives you a level of confidence in what you are doing
(and some data to back it up) to move on to the even-more-complicated step of going from prototype to production. At
Netdata, we are currently trying to get to step 4, where we can first prototype some solutions on real-world data and
come up with ways to measure progress.

<figure>
  <img src="/img/contribute-machine-learning-charts.jpg" alt="Some of the real-world data contributed by Netdata users to level up our machine learning.">
  <figcaption>Some of the real-world data contributed by Netdata users to level up our machine learning.</figcaption>
</figure>

This is where you, a valued member of the community, come in! We are looking to build a small pilot program and offer
early access to Netdata research contributors who would stream some agents to a master node in our research data
lake.[1] We can then use this real-world data to run experiments and try different problem formulations and algorithms
to detect any anomalies that might exist. This way we can “battle test” as much as possible any ML-driven,
anomaly-detection features we look to launch in the future with the help of the wider Netdata community.

This is not just a request for data contributions. We would also love to build an active community of Netdata users with
an interest in machine learning and ideas and thoughts about how we can leverage it in various ways to redefine the
future of monitoring!

If you are interested in getting involved or finding out more, please contact us at
[analytics-ml-team@netdata.cloud](mailto:analytics-ml-team@netdata.cloud). 

<div class="post-cta">
<button>
  <a href="mailto:analytics-ml-team@netdata.cloud">Join Netdata's ML efforts!</a>
</button>
</div>

[1] Your data will stream to its own master node in our GCP project and only be used internally by Netdata for product research and development purposes. You can delete it at any time.