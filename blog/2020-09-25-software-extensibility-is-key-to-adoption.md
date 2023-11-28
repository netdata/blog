---
slug: software-extensibility-is-key-to-adoption
title: "Software Extensibility Is Key To Adoption"
description: "Discover why software extensibility is crucial for adoption with Netdata, exploring the key factors that drive technology acceptance. Gain more insights now."
image: /img/wp-archive/uploads/2022/03/Software-Extensibility-Blog-Post.png
tags: [community,product,engineering]
keywords: [netdata,community,product,engineering]
authors: team
---

<!--truncate-->

<img class="alignnone size-full wp-image-16613" src="/img/wp-archive/uploads/2022/03/Software-Extensibility-Blog-Post.png" alt="" width="969" height="638" />

As with most commercial products, software today is mass produced for reasons of simple economics. But making the same software work for as many people as possible while also meeting the unique requirements different people and organizations have is a challenging task.

The strategies used today to provide extensibility at cost and at the level required by various enterprises are very similar to the ones used in the 80s and 90s, when PCs first took off and captured an enormous amount of the home computing market, and when open source software started gaining popularity.

A major innovation of the early PC was the open hardware platform, allowing manufacturers to collaborate. The IBM PC came out in 1981. Only a few years later, Richard Stallman founded the GNU project and released the GPL. Soon after, Linus Torvalds adopted the GPL for the early versions of the Linux kernel.

The openness of these systems was a major driver in their adoption, because it allowed the development of more and more advanced methods of software extensibility, many widely used today. We can break these developments into several generic stages.

Open-source projects rely on contributors to improve the code directly and add features to meet specific needs. This often has drawbacks, such as code bloat, technical debt, and unmaintained code. A common improvement is modularity—the breaking up of existing code into libraries that can be reused by multiple projects, an approach that sometimes evolves into runtime plug-and-play capabilities, such as software mods.

Software mods, however, often require the developers to implement a mod framework and a mod API. The downside is that the mods are not part of the main software project, which might make them more difficult to discover and vet. The natural evolution of this trend is the mod marketplace, a platform where software components can be quickly shared and reused at will and at scale, and evaluated with public reputation metrics (reviews), thus crowdsourcing the software selection process itself.

Given that we want Netdata to be installed on the majority of servers <i>in the world</i>, via our open-source Agent, it only makes sense to strive for modularity and extensibility. We have easy-to-use data exporters and collectors for many various systems that are trivial to enable or disable without rebuilding or reinstalling Netdata, with most collectors also supporting auto-detection of the systems they are monitoring.

The older Netdata collectors were written in Python. The new ones are all in Go, and the old ones are being gradually updated to Go as well. Netdata’s support for Kubernetes is improving rapidly, and a major part of that is the recently added Prometheus collector, which collects meaningful data from Prometheus endpoints.

As with many extension architectures, a module integrates with Netdata by implementing a specific interface and runs when executed by the Netdata plugin orchestrator (in this case the go.d.plugin—a separate process controlled by Netdata that supports any number of modular collectors). The go.d plugin runs these Go modules as jobs, separate processes which gather data from a specific service (like Kubernetes or MySQL).

In essence, if we want to extend Netdata to collect data from a certain source, all we have to do is implement a simple module, using our module template as foundation. All the heavy lifting is done by the orchestrator, and we even offer an array of helper functions to simplify the development process.

Modules, either in <a title="Python" href="https://learn.netdata.cloud/docs/agent/collectors/python.d.plugin#how-to-write-a-new-module" target="_blank" rel="noopener noreferrer">Python</a> or <a title="Go" href="https://learn.netdata.cloud/docs/agent/collectors/go.d.plugin#developing" target="_blank" rel="noopener noreferrer">Go</a>, can be written by everyone, and they are. Our community has developed many new modules, extending Netdata to a huge number of different use cases. We want to keep this trend going, and this is why we are kickstarting a new blog series aimed at helping users do exactly that: extend Netdata.

We plan to release content to illustrate just how easy it is for a user to develop and share a module with hundreds of thousands of Netdata users, how easy it is to contribute to our open-source Agent or even to our documentation and blog.

In the meantime, if you feel adventurous, you can try implementing a <a title="Python collector" href="https://github.com/netdata/netdata/tree/master/collectors/python.d.plugin" target="_blank" rel="noopener noreferrer">Python collector</a> in <a title="Golang" href="https://github.com/netdata/go.d.plugin" target="_blank" rel="noopener noreferrer">Golang</a>. As we have already mentioned, we are transitioning to Golang as the main language for collector development. Golang offers a unique blend of comparable simplicity with Python, but without requiring the system to have a specific version of go installed (as does Python). Instead, collectors (or generally Golang programs) are compiled to machine code, thus they can run on any system with the same CPU architecture for which they were compiled. This simplifies collectors considerably, as in past users would face numerous issues with incompatible Python environments on their systems.

To implement a collector, simply head to the <a title="Python collector repository" href="https://github.com/netdata/netdata/tree/master/collectors/python.d.plugin" target="_blank" rel="noopener noreferrer">Python collector repository</a> and select a Python collector which can not be found in the <a title="go.d.plugin repository" href="https://github.com/netdata/go.d.plugin" target="_blank" rel="noopener noreferrer">go.d.plugin repository</a>. This means that the collector has not yet been migrated, so you need to study the collector structure in Python and replicate the same logic in Go. To help you, as in Python, we have a number of <a title="helper packages" href="https://github.com/netdata/go.d.plugin/tree/master/pkg" target="_blank" rel="noopener noreferrer">helper packages</a> that simplify certain activities, such as initiating an HTTP request.

If you have any questions, jump in our <a title="forums" href="https://community.netdata.cloud/category/8/integrations" target="_blank" rel="noopener noreferrer">forums</a> and create a topic. We would love to talk with you about your effort and aid you in any way possible!