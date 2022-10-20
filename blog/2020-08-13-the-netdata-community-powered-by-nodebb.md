---
slug: the-netdata-community-powered-by-nodebb
title: "The Netdata Community Powered by NodeBB"
description: "The Netdata Community Powered by NodeBB"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/NodeBB-1.png
tags: [engineering]
keywords: [netdata,engineering]
authors: team
---

<!--truncate-->

<img class="alignnone size-large wp-image-16658" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/NodeBB-1-1200x877.png" alt="" width="1200" height="877" />

We recently adopted <a title="NodeBB" href="https://nodebb.org/" target="_blank" rel="noopener noreferrer">NodeBB</a> as our software of choice for building <a title="the Netdata Community" href="https://community.netdata.cloud/" target="_blank" rel="noopener noreferrer">the Netdata Community</a>. We have <a title="many good reasons" href="https://staging-www.netdata.cloud/blog/the-netdata-community/" target="_blank" rel="noopener noreferrer">many good reasons</a> for why we wanted to provide our community with a proper home online, but I wanted to cover some of the technical reasons for choosing NodeBB for our platform, and the many parallels between the NodeBB and Netdata projects, which was certainly a driving force behind this decision.

At Netdata, we believe that complex problems are best solved by awesome tools. And, yes, what is “awesome” is a bit subjective! But for us, awesome means something like Netdata: free, open-source software; software that is democratic, extensible, customizable, easy to use, and ethical; software that keeps the user in control. And that is how we see the NodeBB project.

Open source and extensibility are often key differentiators in software selection. Since NodeBB is open source and very modular (also like Netdata), we believe that, even if we have advanced and somewhat non-standard requirements from the software (which yes, we already do), these qualities would allow us to extend and modify NodeBB in a way that would work for us, while still retaining a high level of control and visibility into what’s going on under the hood.

In software, extensibility is key, and should be considered an important part of basic functionality. Open-source software makes extensibility much easier by allowing users to learn about the project and then contribute directly. But when that open-source software is built from the get-go with modularity in mind, completely new approaches to complex collaboration become possible, often resulting in a successful ecosystem of preferably free and open-source mods or plugins.

Since NodeBB is a Node.js project, it relies heavily on npm for extensibility. I think at this point it is safe to say that npm is one of the more successful package managers out there, and NodeBB’s ability to easily install themes and plugins directly from npm, as long as they are packaged properly, was very important for us. We tested it extensively, at least for the use-cases we had.

One such case was the brand-specific custom theme for the Netdata Community. This was going to be more involved than a simple color or Bootswatch skin, but because we have limited time and resources, we also wanted to make sure we can easily keep up with upstream updates to the default <a title="Persona" href="https://github.com/NodeBB/nodebb-theme-persona" target="_blank" rel="noopener noreferrer">Persona</a> theme we <a title="forked" href="https://github.com/netdata/nodebb-theme-persona-netdata" target="_blank" rel="noopener noreferrer">forked</a>. So far, so good, and even though we do plan to make quite a few UI improvements in the future, including support for dark mode, I think it should not be too time-consuming for us to stay up-to-date with upstream. And yes, pull requests are welcome!

Another important consideration was support for single sign-on through <a title="Google" href="https://github.com/julianlam/nodebb-plugin-sso-google" target="_blank" rel="noopener noreferrer">Google</a> and <a title="Github" href="https://github.com/julianlam/nodebb-plugin-sso-github" target="_blank" rel="noopener noreferrer">Github</a>, as these are the two SSO methods we already supported in Netdata Cloud. Both were easy to implement with out-of-the-box plugins already available in npm for NodeBB. Going forward, we also want to be able to provide a Netdata Cloud SSO option, and based on our testing this will also be easy to implement when the time comes to integrate it with the Netdata Community.

Since Netdata is an open source project, functional <a title="email support" href="https://github.com/julianlam/nodebb-plugin-emailer-sendgrid" target="_blank" rel="noopener noreferrer">email support</a> for notifications, digests, and replies was quite important to us, as many open source developers still prefer the email list experience.

And, of course, there is an entire laundry list of quality-of-life features we implemented quite easily, largely using out-of-the-box plugins: <a title="polls" href="https://github.com/NodeBB/nodebb-plugin-poll" target="_blank" rel="noopener noreferrer">polls</a> to gather feedback, <a title="question-and-answer" href="https://github.com/NodeBB/nodebb-plugin-question-and-answer" target="_blank" rel="noopener noreferrer">question-and-answer</a> topics for user support, <a title="Github" href="https://github.com/julianlam/nodebb-plugin-github-embed" target="_blank" rel="noopener noreferrer">Github</a> and <a title="Twitter" href="https://github.com/NodeBB-Community/nodebb-plugin-twitter" target="_blank" rel="noopener noreferrer">Twitter</a> integration, and <a title="markdown" href="https://github.com/julianlam/nodebb-plugin-markdown" target="_blank" rel="noopener noreferrer">markdown</a> support.

Each of these features has been selected to meet the needs of our community, which has many SREs, developers, home lab users, open-source advocates, and others. NodeBB has allowed us to take a community-first approach, because easily installable plugins exist for each of these features. What makes this great is that, because the plugins are also open source, we can easily contribute to them, or, if needed, fork them and publish them via npm, or even provide a way for our users and contributors to do so easily. Extensible FOSS projects rock!

Last but not least: The team behind the NodeBB project is responsive and very friendly to open-source projects; they provided great help with setting up our new community. Thank you!

<a href="https://community.netdata.cloud/" target="_blank" rel="noopener"><button>Visit the Community</button></a>