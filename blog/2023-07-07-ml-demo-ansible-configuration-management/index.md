---
slug: ml-demo-ansible-configuration-management
title: "Netdata & Ansible example: ML demo room"
authors: andy
tags: [configuration-management, ansible, netdata-demo, demo, ml]
keywords: [configuration-management, ansible, netdata-demo, demo, ml]
image: ./img/netdata-ansible.jpg
---

![netdata-ansible](./img/netdata-ansible.jpg)

We are always trying to lower the barrier to entry when it comes to monitoring and observability and one place we have consistently witnessed some pain from users is around adopting and approaching [configuration management](https://www.atlassian.com/microservices/microservices-architecture/configuration-management) tools and practices as your infrastructure grows and becomes more complex.

To that end, we have begun recently publishing our own [little example ansible project](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo) used to maintain and manage the servers used in our public [Machine Learning Demo room](https://app.netdata.cloud/spaces/netdata-demo/rooms/machine-learning/overview).

This small post introduces this project as somewhat simple example of using Ansible with Netdata. Read on to learn more but more importantly feel free to [explore the repo](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo) and see how it all hangs together.

<!--truncate-->

## ML Demo Room - Project Structure

If you are not that familiar with Ansible, the [official getting started tutorial](https://docs.ansible.com/ansible/latest/getting_started/index.html) is a great place to start.

Like any great tool there is a lot of flexibility and different ways to achieve your goals. For our user case here, managing a handful of somewhat homogenous servers that make up the ML demo room, the below general structure has worked fine so far for us.

- [`host_vars`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/host_vars/) - some yaml files for host specific variables live in here.
- [`playbooks`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/playbooks/) - various playbooks (collections of tasks) for common maintenance and configuration management activities.
- [`tasks`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/tasks/) - yaml files defining low level tasks, related tasks group in folders (e.g. Netdata tasks live in [`tasks/netdata`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/tasks/netdata/)).
- [`templates`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/templates/) - templated files, typically configuration files live in here (all use [Jinja2](https://jinja.palletsprojects.com/)).
- [`vars`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/vars/) - different variable files for each system or component live in here. Used by templates and tasks.
- [`inventory.yaml`](https://github.com/netdata/community/tree/main/configuration-management/ansible-ml-demo/inventory.yaml) - A list of all the hosts managed by this Ansible project as well as one or two global default variables.

Thats pretty much all there is to it. The best way to get started really is to have a look at some examples of tasks and playbooks and then start simple and adapt them to your needs. Below are some useful links and resources for both users new to configuration management and those looking to do more advanced tasks and complex specific Netdata related use-cases.

## Useful Resources

- Official Ansible getting started [tutorial](https://docs.ansible.com/ansible/latest/getting_started/)
- A collection of different [configuration management resources](https://github.com/netdata/community/tree/main/configuration-management) from the `netdata/community` repo.
- Official [`netdata/ansible`](https://github.com/netdata/ansible) repo with some more complex Netdata configuration tasks.
- A great [playlist](https://www.youtube.com/playlist?list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70) of Ansible videos from our friends at [learnlinux.tv](https://www.learnlinux.tv/tag/configuration-management/).
