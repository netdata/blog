---
slug: community-update-discourse
title: "Community update: Discourse, community efforts"
description: "Community update: Discourse, community efforts"
image: /img/wp-archive/uploads/2022/03/Community-update_-Discourse-community-efforts.png
tags: [community]
keywords: [netdata,community]
authors: team
---

<!--truncate-->

<img class="alignnone wp-image-16522 size-full" src="/img/wp-archive/uploads/2022/03/Community-update_-Discourse-community-efforts.png" alt="" width="681" height="470" />

Open source and community have always been in the DNA of Netdata, with the Agent starting as a very popular open-source project. Since then, a lot has changed, with Netdata maturing into a company, and the Netdata Agent finding its place as an open-source project in a wider offering that redesigns the monitoring experience from the ground up.

While we had a very active <a href="https://github.com/netdata/netdata/" target="_blank" rel="noopener noreferrer">GitHub repository</a>, with the majority of the Netdata Agent’s original team actively moderating the discussions and talking with users, we started a more concentrated initiative to manage our community in spring 2020. We launched our first forum using <a href="https://nodebb.org/" target="_blank" rel="noopener noreferrer">NodeBB</a>, a great open-source project, and the community grew substantially, outgrowing the forum software. At the same time, we were able to identify areas of friction in the community journey. Removing that friction became a centerpiece of our strategy during Q3 2020.

Apart from removing friction, another important decision that we made has to do with GitHub. It is a great place for any open-source project to begin, amassing contributors from all walks of life, interacting via PRs and GitHub issues, in an impromptu medium for discussion.

While GitHub issues <i>may</i> work for some highly technical communities, especially those built around developer tools, it is not the ideal heart of the community for all technical projects.
<ol>
 	<li>Discussions are centered around “problems” or GitHub issues.</li>
 	<li>Labels are not ideal for organizing information and efficiently grouping discussions.</li>
 	<li>GitHub is daunting to less technical users.</li>
 	<li>GitHub offers little to no tools for community managers to nurture the community.</li>
</ol>
With the proper context in hand, let’s see what initiatives we took to improve our community experience and what we are planning in the near future.
<h2>Community 2.0</h2>
The new community, or community 2.0, is a fresh view of the community efforts we started in spring 2020. Building on the knowledge and insights we gathered thus far, some of which I shared in the previous section, we have several initiatives in the works.

We started with redesigning the user experience for the community member, by clarifying the use of each platform and tying that platform to a specific user goal. We wanted to make things as explicit as possible and remove as much cognitive load as possible. Thus, each platform is tightly connected with the rest of the community platforms, so that we are sure that the user will always easily find the resource that they are looking for. The end design creates a closed system that can be summarized in the diagram below.

<img class="alignnone wp-image-16524 size-large" src="/img/wp-archive/uploads/2022/03/Community-state-v2-1-1200x800.png" alt="" width="1200" height="800" />

Let’s briefly see all the facets of the community:

<img class="alignnone wp-image-16526 size-large" src="/img/wp-archive/uploads/2022/03/Screenshot-2020-12-02-at-4.15.48-PM-1104x1200.png" alt="" width="1104" height="1200" />
<h2>Community page</h2>
<img class="alignnone wp-image-16526 size-large" src="/img/wp-archive/uploads/2022/03/Screenshot-2020-12-02-at-4.15.48-PM-1104x1200.png" alt="" width="1104" height="1200" />

Our <a href="https://staging-www.netdata.cloud/community/" target="_blank" rel="noopener noreferrer">community page</a> now serves as an index for the entire community. We deconstructed the community user journey and mapped all the different goals that a community member might have, and then structured the community page accordingly. By explicitly listing every user goal, we hope that the user will be able to easily find the next step in the journey. They should be able to interact in the manner that they want, with less friction, lowering the barrier of entry for community engagement.
<h2>Community forums</h2>
<img class="alignnone wp-image-16528 size-large" src="/img/wp-archive/uploads/2022/03/Screenshot-2020-12-02-at-4.17.41-PM-1200x943.png" alt="" width="1200" height="943" />

We launched the <a href="https://community.netdata.cloud/">forum</a> back in the summer, but without clarifying how we are going to use the forums in relation to user interaction on GitHub. With the re-launching of our forums, with different software and a different philosophy, we’re making the forums the centerpiece of Netdata’s wider community.

As we mentioned above, having decided that GitHub can no longer accommodate our needs, we migrated most of the GitHub functionality, such as <strong>discussion</strong>, <strong>support</strong>, and <strong>feature requests</strong>, to the forums. They are based on the open-source software <a href="https://discourse.org/" target="_blank" rel="noopener noreferrer">Discourse</a>, and they will serve as the core of our community for years to come.

We designed the forums to be easy to use, with intuitive categories that will let us run different community programs on top of them. But like with everything in technology, iteration is king. If you have any ideas, leave us some feedback in the <a href="https://community.netdata.cloud/c/community/community-forums/19" target="_blank" rel="noopener noreferrer">community forums</a> category.
<h2>GitHub</h2>
With us turning our focus to the forums, we needed to define a new role for our main repository at <a href="https://github.com/netdata/netdata" target="_blank" rel="noopener noreferrer">netdata/netdata on GitHub</a>. We decided that it will serve as our public issue tracker, where users can submit bugs or follow the progress of bugs already acknowledged by the Netdata team. Moreover, GitHub will continue to serve as the place for discussions over specific contributions (PRs) and code commits, but other than that, everything is taking a trip to our community forum. Finally, we created another repository, named <a href="https://github.com/netdata/netdata-cloud" target="_blank" rel="noopener noreferrer">netdata/netdata-cloud</a>, that will serve as a public issue tracker for Netdata Cloud.

To better integrate GitHub into the rest of the community ecosystem, when opening a new GitHub issue, users will find options for many different community-related goals that link to resources <strong>outside</strong> of GitHub, such as the forum.
<h2>Netdata Learn</h2>
<a href="https://learn.netdata.cloud/" target="_blank" rel="noopener noreferrer">Netdata Learn</a> is the centerpiece of all things educational about Netdata. We launched a new version of the website with updated information architecture so that the user can easily navigate our educational resources. This architecture is based around the primary actions that Netdata users want and need to take—configure, collect, monitor, store—and is designed like a multi-part guide for the entire Netdata journey.

Netdata Learn is also the home of our <a href="https://learn.netdata.cloud/contribute" target="_blank" rel="noopener noreferrer">contribution guidelines</a>, our handbook for contributing to Netdata, either in code, <a href="https://learn.netdata.cloud/contribute/handbook#sponsor-a-part-of-netdata" target="_blank" rel="noopener noreferrer">collector guidance</a>, or in <a href="https://learn.netdata.cloud/contribute/documentation" target="_blank" rel="noopener noreferrer">documentation</a>. Thus, it is important that the website is easily accessible from both the product, the forum, and the index.
<h2>Product</h2>
<img class="alignnone size-large wp-image-16530" src="/img/wp-archive/uploads/2022/03/Overview-1-1200x853.png" alt="" width="1200" height="853" />

Community 2.0 couldn’t leave out some product features as well, since we want the product to be at the core of the experience. In the near future, we will ship a new help widget, which will link users to different community platforms, depending on their goal.

This widget will ship to <strong>both </strong>the <em>Netdata Agent</em> and <em>Netdata Cloud</em>.
<h1>Tooling</h1>
Developer Relations is an elusive term, almost as elusive as the definition for an online community itself. I like how <a href="https://www.marythengvall.com/" target="_blank" rel="noopener noreferrer">Mary Thenvgal</a> puts it:
<blockquote>A group of people who not only share common principles but also develop and share practices that help individuals in the group thrive.</blockquote>
There is a lot to unpack in this term, but the centerpiece is that developer relations is about building relationships in online communities, and the relationships are inherently difficult to quantify into metrics.

Thankfully, we decided to invest in tools, such as <a href="https://orbit.love/" target="_blank" rel="noopener noreferrer">Orbit</a> and <a href="https://savannahhq.com/" target="_blank" rel="noopener noreferrer">SavannahHQ</a>, which help us not only gather important health metrics about the community in the aggregate but also help us map the journey of each community member. They also enable us to track all the interactions in all the different platforms that we use (mainly GitHub and Discourse). Finally, we can leverage the insights we get and act proactively, creating content and documentation for the pain-points of the community while introducing new processes and systems that leverage the community’s strengths.
<h3>Other initiatives</h3>
At the same time, we have launched some inward-looking initiatives, nurturing the community-centric culture for our team that everybody wants, but few companies truly have. We will be launching our “Enabler of the Month” initiative, which will reward the most active of employees in our community, while also we are preparing an engagement handbook for our team members, so as to facilitate the active participation of our engineers.

Stay tuned to our community forums, since we intend to share more information over the next weeks!
<h3>The future</h3>
We are far from done since we want to sustain and increase the momentum that our community got these past few months. You can expect open-office hours, community rituals, and better documentation for contributors. We also intend to continue producng content that will help our community users become successful in using Netdata Cloud and the Netdata Agent. You can expect many more guides, video content (make sure to subscribe to our <a href="https://www.youtube.com/channel/UC61IDHAysha3o3QI-LTno7A" target="_blank" rel="noopener noreferrer">YouTube channel</a>), and integrations with other projects that super-charge the Netdata experience. Finally, we are excited to announce that we will begin publicly sharing the documentation that we produce in the Developer Relations team for internal purposes. We believe that making more of our tooling and processes public will make Netdata even easier to use and lead the open-source community by example.