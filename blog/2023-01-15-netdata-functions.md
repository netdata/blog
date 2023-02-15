---
slug: netdata-functions
title: Introducing Netdata Functions
description: Introducing Netdata Functions
authors: shyam
tags: [real-time, monitor, troubleshoot, functions, top, processes]
keywords: [real-time, monitor, troubleshoot, functions, top, processes]
image: https://user-images.githubusercontent.com/24860547/219148788-393d42d3-ef34-43bd-bb8b-e612246923c5.png

---

Netdata is committed to making it simpler and easier for everyone to monitor and troubleshoot their infrastructure. With that goal in mind, we're excited to announce the launch of our new "Functions" feature, which allows Netdata Agent collectors to expose "functions" that can be executed in run-time and on-demand.

<!--truncate-->

### What are Netdata functions?

Netdata has always been synonymous with real time monitoring and automated dashboards, with the recent introduction of "functions", there's now a new way for users to troubleshoot their infrastructure. **A function, in the context of Netdata, is a routine or script that can be invoked to run on a node and retrieve useful information, which is then displayed in the Netdata cloud dashboard.**

Think of it as a toolkit that allows you to quickly and easily retrieve specific information about your infrastructure, without having to SSH into each node individually and run commands to retrieve that information. With functions, you can gather more information and perform actions on a given node without having to access it directly. This can save SysAdmins and DevOps engineers time and effort, especially when managing large clusters of nodes.

If you'd rather see it in action than read about it, visit our [demo space](https://app.netdata.cloud/spaces/netdata-demo/rooms/all-nodes/functions) and see it in action, live!

### What can functions do? 

In theory, functions can do basically anything that you want. But while we are thrilled to introduce the Functions feature, we are doing so cautiously, starting with just one supported function. We understand that invoking a routine or script on a node carries security implications, which is why we have taken great care to ensure that the initial function is secure and does not compromise your infrastructure. As we continue to develop new functions, we will take the same approach, prioritizing security to ensure the safety of our users' infrastructure.

So to start with, there's one function: "Processes"

### The "Processes" function

This function provides a tabular view of all the processes running on a system, along with an extensive range of information for each process. These details include the process ID (PID), command name (Cmd), category, user, and various usage statistics such as CPU, memory usage, I/O, network, and more.

By having access to a comprehensive overview of all the processes running on a system, it is much easier to identify any issues that may arise, such as a process consuming too much CPU or memory. 

The "Processes" function allows users to monitor multiple nodes with just a single click. This feature saves a considerable amount of time and effort as it eliminates the need for users to SSH into each node and run commands to retrieve this data. Instead, all the data can be accessed and viewed directly from the Netdata dashboard.

![image](https://user-images.githubusercontent.com/24860547/219148788-393d42d3-ef34-43bd-bb8b-e612246923c5.png)

Let's take a look at a real-world example of how using the "Processes" function can help solve a particular problem.

Imagine you have a server that's been acting up recently. You're not sure why, but you suspect it might be due to a rogue process that's consuming too many resources. Previously you had to observe multiple different charts to get the complete picture of what was going on, but with the "Processes" function, you can easily get a detailed breakdown of all the processes running on the node, including CPU and memory usage. From there, you can identify the culprit and take action to resolve the issue.

While the "Processes" function is already quite powerful, this is just the beginning. We are working to add more functions that will help you solve more problems, faster than ever. And we are also evaluating the potential for users to create custom functions that are specific to their unique system requirements.

### Usage

To use the "Functions" feature, you'll need at least one node claimed to your Space that's running a Netdata agent version higher than v1.37.1. 

You can either go to the new "Functions" tab to execute a function on a node of your choice, or execute the function directly from the nodes view.

#### Execute a Function (from Functions View)
- From the right-hand bar, select the Function you want to run.
- Still on the right-hand bar, select the Node where you want to run it.
- Results will be displayed in the central area for you to interact with.
- Additional filtering capabilities, depending on the function, should be available on the right-hand bar.

![image](https://user-images.githubusercontent.com/24860547/219151974-6d8b46ea-2692-4b42-9c26-2d0a0885ad42.png)

#### Execute a Function (from Nodes View)
- Click on the functions icon for a node that has this active.
- You will be directed to the Functions tab.

![image](https://user-images.githubusercontent.com/24860547/219152335-a8330e09-d7be-44d5-9a3a-af539f5cc855.png)

### Let us hear from you

We are eager and excited to find out how the Netdata community will make use of this powerful new feature. Try it out for yourself and see how it can help make your monitoring and troubleshooting more effective.

If you have ideas or requests for other functions that you'd like to see on Netdata, you can open a [Feature request](https://github.com/netdata/netdata-cloud/issues/new?assignees=&labels=feature+request%2Cneeds+triage&template=FEAT_REQUEST.yml&title=%5BFeat%5D%3A+) on our Netdata Cloud repository or engage with our community on the [Netdata Discord server](https://discord.com/invite/mPZ6WZKKG2).

Happy Troubleshooting!
