---
slug: welcome-to-netdatas-community-repository-consul-ansible-ml
title: "Welcome to Netdata’s community repository: Consul, Ansible, ML"
description: "Welcome to Netdata’s community repository: Consul, Ansible, ML"
image: /img/wp-archive/uploads/2022/03/netdata-community-repository.png
tags: [community,consul]
keywords: [netdata,community]
authors: team
---

<!--truncate-->

<img class="alignnone size-large wp-image-16555" src="/img/wp-archive/uploads/2022/03/netdata-community-repository-1200x825.png" alt="" width="1200" height="825" />

On our journey to democratize monitoring, we are proud to have open source at the core of both our products and our company values. What started as a project out of frustration for lack of existing alternatives (see <a href="https://www.rexfeng.com/blog/2016/01/anger-driven-development/" target="_blank" rel="noopener noreferrer">anger-driven development</a>), quickly became one of the most starred open-source projects on all of GitHub.

Fast-forward a couple of years later, and the Netdata Agent, our open-source monitoring agent, is maturing as the best single-node monitoring experience, offering unparalleled efficiency and thousands of metrics, per-second. At the same time, we have gathered a considerable community on our GitHub repository and new forums.

As the community grows, and considering our belief that extensibility is key to adoption, it was only natural to start brainstorming a way to share code and sample applications that supercharge the user experience and the Netdata Agent’s capabilities.

Thus, without further ado, please say hello to our <a href="https://github.com/netdata/community" target="_blank" rel="noopener noreferrer"><strong>community repository</strong></a>.

<img class="alignnone size-large wp-image-16557" src="/img/wp-archive/uploads/2022/03/netdata-community-1200x998.png" alt="" width="1200" height="998" />

Although still in its infancy, we expect this repository to be filled by community members who want to share their experience of running Netdata in a production environment or integrated into a technological stack. At the moment, the repository will be used to house all sample applications, which are divided into categories, depending on the use case.

Currently, there are three example applications, all contributed by the Netdata team, which were originally developed for internal use. Let’s take a look at them.
<h2>Configuration management</h2>
The first sample application is one I built that focuses on the issue of configuration management of an arbitrary number of Netdata Agents. More specifically, I opted to use Consul, an amazing open-source project by HashiCorp, to dynamically manage the configuration of a Netdata Agent. The keyword is “dynamically”: Whenever I choose to change a configuration variable, the Netdata Agent restarts automatically so that it can pick up the change from the configuration files.

Consul, per their documentation, is a “service mesh solution providing a full-featured control plane with service discovery, configuration, and segmentation functionality”. As such, Consul is routinely used already in cloud-native applications, and it’s ideal for a simple key/value store that we can use to house the configuration variables that we wish to dynamically change. Since Netdata can’t pick up configuration from a RESTful interface, we use consul-template, again an open-source tool by HashiCorp, which watches a Consul node for a specific number of keys, picks up the changes to their values and places them into the templates, generating the changed configuration files in the process.

The code and documentation for this sample application can be found in the specific <a href="https://github.com/netdata/community/tree/main/configuration-management/consul-quickstart" target="_blank" rel="noopener noreferrer">consul-quickstart directory</a>.
<h2>Machine Learning and Netdata Agent’s API</h2>
The second contribution came from <a href="https://staging-www.netdata.cloud/author/amaguire/" target="_blank" rel="noopener noreferrer">Andrew Maguire</a>, who contributed a few examples built on the Netdata Agent’s API. The API offers anyone the ability to extract data from the Netdata Agent in an extremely efficient way and build real-time applications on top of it. He leveraged his in-house python library to automatically extract data, add them to panda arrays, and enable live ML, capabilities such as the detection of anomalies.

You can find the examples in the <a href="https://github.com/netdata/community/tree/main/netdata-agent-api/netdata-pandas" target="_blank" rel="noopener noreferrer">netdata-agent-api directory</a> of the community repository and open them in Google Colab. We suggest Google Colab not only because it’s free, but also because they spin up a VM and install all the required dependencies, making it the fastest way to try out the examples and play with the API. To play around with the Netdata Agent API, just open this <a href="https://colab.research.google.com/drive/1SGF3Ij1r8gNJOwdk-3cVhCvyUGwGiTnc?usp=sharing" target="_blank" rel="noopener noreferrer">example notebook</a> in Colab.
<h2>Automatic provisioning of Netdata Agents</h2>
Last but not least, <a href="https://staging-www.netdata.cloud/author/joel/" target="_blank" rel="noopener noreferrer">Joel Hans</a> pulled together the scripts that he had created for him to be able to automatically provision and claim any number of Netdata Agents on remote servers. The sample application is enabled by Ansible, a popular system provisioning, configuration management, and infrastructure-as-code tool. The user defines a set of steps in a .yaml file, called a playbook, and then Ansible is responsible to run this playbook against a number of hosts using SSH as the only requirement.

With Ansible, Joel can install and claim any number of Netdata Agents automatically, so that he can access and monitor his nodes in a matter of minutes, through Netdata Cloud. It’s that easy. You can learn more in the <a href="https://learn.netdata.cloud/guides/deploy/ansible" target="_blank" rel="noopener noreferrer">guide</a>.
<h2>Now, it’s your turn</h2>
The repository is up and running, but we need you to participate. If you are using any of the aforementioned tools and platforms and feel that we could have done something in a better way, please do let us know and make a pull request with your suggestions.

If, on other hand, you are using Netdata with another application that greatly improves the experience, please do create a README about the project and PR it to the appropriate category. The value of this repository is of a compounding nature. The more examples we can get, the more value our users (like you) will be able to receive, and thus the popularity of the repository will invite even more sample applications.

See you all on our repo!

<a href="https://staging-www.netdata.cloud/blog/welcome-to-netdatas-community-repository-consul-ansible-ml/#:~:text=Visit%20the%20Netdata%20community%20repository" target="_blank" rel="noopener"><button>Visit the Netdata community repository</button></a>