---
title: "How to inspire exceptional contributions to your open-source project"
date: 2019-06-20
summary: "As the maintainer of an open-source project, you need to find, get, and keep the best contributors. Here's our step-by-step process for doing that at Netdata."
author: "Joel Hans"
cover: "open-source-contributions.png"
tags: ["How-to", "open source"]
categories: []
draft: true
---

Netdata *must* be doing something right when it comes to inspiring contributions. Our [open-source, distributed monitoring agent](https://github.com/netdata/netdata) has more than 38,000 stars on GitHub and has seen contributions from more than 200 people. We've even hired a handful of our contributors to work full-time on making the Netdata ecosystem even more powerful. People are passionate about what we do, and they happily offer their time and expertise to make Netdata better.

The Netdata community didn't just *happen*, though. We didn't just build an open-source project and wait for contributors to step up and help. We took many concerted efforts to inspired these contributions, and we thought we'd share a few of our most successful efforts.

<!--more-->

Now, the process of inspiring contributions for an open-source project has two core components: 1) getting new contributors and 2) keeping them around for the long haul. Let's talk about these in succession.

## Getting new contributors to your open-source project

Just like a startup business, a primary goal for any open-source project is getting the attention of eager and passionate people. Yes, it's a type of marketing, but we've focused almost exclusively on making contributions as easy as possible.

### Upload and commit to a Contributor Covenant Code of Conduct

The worst thing you can do, as an open-source maintainer, is create an environment that turns people off from contributing to your project. You can't afford to be vague about your beliefs, which makes a code of conduct a no-brainer for any open-source project. Plus, it takes no effort to implement.

The [Contributor Covenant](https://www.contributor-covenant.org/) is a document created by [Coraline Ada Ehmke](https://where.coraline.codes/) to make clear your commitment to accepting contributions from people from all backgrounds and situations.

You can download and adapt the latest version [here](https://www.contributor-covenant.org/version/1/4/code-of-conduct). Adapt it as needed and add it to your the root directory of your project with the file name `CODE_OF_CONDUCT.md`. We, of course, practice what we preach. Here's the [code of conduct](https://github.com/netdata/netdata/blob/master/CODE_OF_CONDUCT.md) for Netdata itself.

### Create a CONTRIBUTING.md file to explain how and where to help

At Netdata, we have a pretty comprehensive [contributing document](https://github.com/netdata/netdata/blob/master/CONTRIBUTING.md) that we maintain at `CONTRIBUTING.md`. In this document, we outline the various ways that people can contribute to Netdata.

In your `CONTRIBUTING.md` document, you should be clear and specific about how people of all skill levels could potentially contribute to your project. For those who have never contributed code to a project before, ask them to drop a GitHub star on the project or create an issue to offer constructive criticism. For more advanced contributors, make clear the areas where your project needs the most work. Maybe that's improving documentation, or perhaps that's a new feature that's been heavily requested by users.

This document is also an excellent opportunity to mention that code of conduct, along with other philosophies by which your project operates. For Netdata, that's **performance**, **meaningful metrics**, **automated testing**, a **distributed framework**, **support for many operating systems**, included **documentation**, and **future maintenance**.

Make sure this document also explains how you handle workflows and processes like pull requests and code reviews. Do you want contributors to work off the main repo, or fork it to their own GitHub account and work there? How do you tag issues? How do you differentiate between code that's ready to be merged and code that's still in progress?

Clarity is paramount in your `CONTRIBUTING.md` document. Upon reading this document, potential contributors should `1)` be able to self-select their skill level according to your definitions, `2)` know where to look next to create their first contribution, and `3)` feel as though they can meaningfully help the project move forward.

You might feel like you're micromanaging, but you're actually building efficiency and clarity into the onboarding process. Everyone is on limited time, and a good `CONTRIBUTING.md` document makes sure people can get started as seamlessly as possible.

### Tell people their issue matters, even if you can't fix it

The worst look for an open-source project: A graveyard of ignored issues from users.

Most visitors assume the maintainer doesn't care about their users or the project is dead.

When someone requests a feature for your project, it's because they have a certain amount of passion for it. They want it to be better. They think it could be more powerful and useful for more people, but their requests are often misguided. Maybe it's outside the scope of your project, or is too complex to handle. Maybe it's just a bad idea.

As Hacker News user marknadal [writes](https://news.ycombinator.com/user?id=marknadal):

> But the people who [write] "Why isn't this written in X language?" or "Here's a PR to turn tabs into spaces" are honestly well-intended but naive and short-sighted.

As a busy maintainer, it's tempting to ignore these types of issues or PRs, but doing so ensures that user's passion never translates into contribution. Whatever passion remains will fizzle out and they'll move elsewhere. Instead, consider pointing them to the documentation that explains the code around their issue (you have good documentation, right?) and you might be able to inspire them to do pitch in without having to address their issue directly.

### Tag specific issues with 'good first issue'

Here at Netdata, we often drop the `good first issue` tag on issues or feature requests around plugins, alarms, and integrations, because working on those don't require contributors to understand every line of `C` that goes into Netdata. For example, we're always looking for help building [better alarms](https://github.com/netdata/netdata/issues/4727), which use configuration files with a Netdata-specific syntax. If someone wants to help us here, they only need to learn the configuration syntax to get started. Doing so will teach them a great deal about Netdata's underlying structure, setting them up nicely for a more complex contribution in the future.

Tagging is a simple action that helps drive new potential contributors toward the areas where they can be most helpful.

Whenever you do use the `good first issue` tag, make sure you have solid documentation to support it. That's what we do with [extensive documentation](https://docs.netdata.cloud/health/) about how to write alarm configuration files. If you don't have documentation for that part of your codebase, then the issue isn't a good first issue after all.

If nothing else, the global search on GitHub for [`good first issue`](https://github.com/search?q=label%3A+good+first+issue) returns more than 200,000 results. Maybe an eager developer will perform that very search and stumble across your project for the first time.

### Encourage contributions in documentation

Imagine that you get 100 clones/installs of your code every day. but 10% of those people have trouble with the installation process. Half of that 10%—5 people every day—file an issue asking for help because they couldn't understand the documentation. You can either spend your valuable time helping them or let the questions go unanswered, creating the aforementioned graveyard. Either way, it's a bad look for your project.

Now, let's say a contributor comes along and rewrites the installation procedure documentation cut the installation failure rate from 10% to 2%. Not you're only seeing 1 issue per day, and that contributor just saved you an enormous about of time and effort. 

As a maintainer, your primary job is to keep the project alive, and better documentation is almost always more important than a new feature, even if the former is far less sexy.

Improving documentation, fixing typos, and smoothing out sentences is all part of creating a polished, professional codebase. By encouraging contributions to documentation, you'll be casting a wider net and will inevitably capture some people you might have otherwise missed.

## Keeping contributors around

The longer a contributor sticks around, the better they'll get at working with you, your code, and anyone else who might be pitching in. Conversely, losing a high-value contributor levels an enormous cost on the project. 

Of course, you'll experience a certain amount of unavoidable attrition over time. People get new jobs, move, start families, and experience tough times. You can't prevent every departure, but you can rely on a few best practices to keep contributors around for as long as possible.

But you can keep people around by following a pretty simple rule: **Contributors are volunteers, and gratefulness always flows toward volunteers.** They are not lucky to have the opportunity to work on your project. You are lucky to benefit from their time and expertise.

And here is where we shift away from marketing and toward management.

### Find work that your contributors enjoy

Volunteers have little patience for work that doesn't excite them or give them that fuzzy feeling of helping a good cause.

As new contributors start to communicate with the team and send in PRs, you'll get a sense as to the work that interests them the most. You'll also figure out what they're good at. Encourage your contributors to tell you these things, too. Are they good at CSS and want to make your app's dashboard look nicer? Do they like creating testing suites? Do they love documentation and know how to write a clear sentence? 

Knowing their interests and talents, and delegating work to them appropriately, is one of the most important things you can do as a maintainer and team leader. They might not thank you for it, but they'll certainly be happier along the way.

### Let people work on their own schedules

Again, your contributors aren't your employees. You shouldn't put expectations when or how much they contribute to your project in a given timeframe. You shouldn't expect they respond to every GitHub mention within an hour. As the maintainer, you have the responsibility of delegating work in a way that respects the fact that they too have a life beyond the project.

> No contributor should ever feel stressed about their contribution to your project.

If an issue is severe and time-sensitive, such as a security vulnerability or a blocker that keeps people from installing or using your software, it's your responsibility. Don't rely on others, and don't expect a contributor to skip their kid's violin recital to volunteer more of their time to fix a critical issue.

By building flexibility into your management style, you'll stave off the threat of burnout for as long as possible. No contributor should feel stressed about their contribution to your project. That's not just a recipe for burnout—it's a direct line from point A to point B.

### Know when to say no

Active and valuable contributors will often make suggestions or requests for the future of your project that aren't feasible or you disagree with. Maybe they want to redesign the dashboard and you think that's a waste of time until features X, Y, and Z are implemented. Maybe they want to refactor your entire codebase into Rust because everyone seems to like Rust all of a sudden.

You need to build (kind, well-intentioned) rejection into the way you manage your team. Allowing contributors to strike off and work on their pet project, while you're fully committed to not merging that code, is not just a waste of time. It's also cruel and disrespectful.

This point also applies to contributors who are biting off more than they can chew. Even if a particular project is valid and valuable, but is too complex for the contributor to handle, you shouldn't be allowing them to struggle their way through work that will inevitably fail.

Instead, get involved when contributors announce their intentions. You might find it hard to dash their vision, but it'll work out best in the long haul. 

Remember: **No contributor should ever feel stressed about their contribution to your project.**

### Expand roles over time

You want your contributors to grow. Grow their talents and their commitment to your project. You, in turn, have to give them the space in which to grow.

That means recognizing when an active contributor can handle more complex tasks without you guiding them through each step. Or allowing them to participate in code reviews for the work of other contributors. And once they've proven themselves, it might come time to give them merge rights.

The landmarks for growth can be different for every project and your specific management style, but no one is getting the most from a contributor if their role in the project never goes beyond sending in useful bug reports and hoping for the best.

As [Drew DeVault wisely](https://drewdevault.com/2018/06/01/How-I-maintain-FOSS-projects.html#fnref:1) says:

> A couple of bugs caused by inexperience is a small price to pay for the gain in experience the contributor gets by taking on hard or important tasks.

## Inspiring new and continued contributors is all about transparency and mentorship

And both those qualities are scary for a lot of open-source project maintainers. They take a lot of time and create exposure for criticism or competition. They require a lot of writing skills, for creating documentation, explaining yourself clearly, and managing the way contributors communicate with one another. You need patience and dedication.

But inspiring contributions from your community is **the best** thing you can do to keep your project going. There will likely come a time that even you need a break from the project you've built, but if you've curated a community of people who are willing to take up the mantle, you can keep your hard work alive.

Here are a few interesting resources and takes on managing contributors:

- [First Timers Only](https://www.firsttimersonly.com/)
- [The struggles of an open source maintainer](http://antirez.com/news/129)
- [How I maintain FOSS projects](https://drewdevault.com/2018/06/01/How-I-maintain-FOSS-projects.html)

And, conversely, resources for those who want to contribute to open-source projects:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [What are some blockers for you on contributing to open source projects?](https://dev.to/sudo_bangbang/what-are-some-blockers-for-you-on-contributing-to-open-source-projects-5g30)
- [first-contributions](https://github.com/firstcontributions/first-contributions)
- [Open Source: 9 steps to my first feature contribution in Babel](https://maurobringolf.ch/2017/07/open-source-9-steps-to-my-first-feature-contribution-in-babel/)

Did we miss an essential tip to helping inspire great contributors? Hit us up on [Twitter](https://twitter.com/linuxnetdata) and let us know how you're getting good people and keeping them around for the long haul.