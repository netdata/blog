---
slug: introducing-netdata-paid-plans
title: Introducing Netdata Paid Plans
description: All Netdata functionality is and will be available for free in the Free Community Plan. Paid tiers include features targeted for managers, and administrators.
authors: team
tags: [pricing, free-plan, paid-subscriptions]
keywords: [pricing, free plan, paid subscriptions, monitoring, troubleshoot]
image: https://user-images.githubusercontent.com/24860547/212873204-5082b40d-7be0-4a08-ae72-0895b840837b.png

---

Read more about Netdata introducing paid subscriptions. All Netdata functionality is and will be available for free in the Free Community Plan. Paid tiers include features targeted for managers, and administrators.

<!--truncate-->
## Introducing Netdata paid subscriptions

At Netdata we believe that as the digitization of our world matures, it is mandatory for all of us to have free and unrestricted access to high quality monitoring solutions. Concepts like instant deployment, real-time access to unlimited high resolution data, fully automated and standardized dashboards and alarms, and machine learning assisted troubleshooting, will eventually allow all of us to focus on how to bring better results for our businesses and lives, abstracting the complexity and flattening the learning curve of using efficiently, incrementally more advanced software solutions in our software stacks.

For the past few years we have run our free SaaS offering and have provided our Open Source Agent, featuring unlimited spaces and users, unlimited metrics and retention, providing real-time, high-fidelity, out-of-the-box infrastructure monitoring for packaged applications, containers, and operating systems. We are not changing all these! To the contrary, we strongly believe that all the monitoring features should be available for free, to everyone, forever!

To keep this commitment, our business model is based on the fact that revenue generating businesses need tighter and customizable integration of the free monitoring solution to their processes.

So, instead of limiting access to features on the free plan, the free plan provides full access to all features available. Our paid subscriptions are designed the other way around. While on the free plan everyone in your space has full access everywhere, paid subscriptions allow you to control who can have access to which features.

## New paid subscriptions

The paid plans we will provide are:
PRO - For basic monitoring capabilities
BUSINESS - For small and medium companies 
ENTERPRISE - For custom solutions 

For more details on plans please check the Netdata Pricing page. 

With the introduction of the paid plans we are reviewing our Role Based Access model. The main change is the addition of more roles which will give you better User Administration capabilities. 

The new roles are:
Administrators - Unrestricted access to a space
Managers - Same as admins, but can't add nodes, or manage space settings (very similar to our original Member role)
Troubleshooters - Same as managers, but can’t manage users or rooms
Observers - Read only role, restricted to specific rooms.
Billing - Access to billing details and subscription management

The table below shows which plan supports which roles:



Link to image - https://i.imgur.com/ShPQp5e.png


How does this concern me?

Roles

You immediately notice from the table above that on the COMMUNITY plan the only available role will be the Administrators. If Space Administrators need a distinction between different types of access for new users in their Space, they will need to move towards a PRO or BUSINESS plan.

However, we won’t disrupt your current access rights. Users that currently have the legacy Member role, will not lose their access, or permissions. The impact is:
Any new users you invite on the COMMUNITY plan, must be Administrators
The role Member is deprecated and won’t be selectable in any of the plans

As a result:
If you don’t upgrade: You don’t need to do anything with your existing users, they will not notice a difference. 
If you do upgrade:  We suggest you reassign your existing Members to one of the new roles, depending on their needs. 


Permissions & War Rooms

Users currently have access to all the nodes in a given Space, since they have access to the All Nodes War Room. 

Several of our users have expressed the need to provide to some of their colleagues or customers more limited access to their infrastructure, specifically with regard to the nodes they are able to see. To cover the gap, users with the Observer role will only have access to the All Nodes War Room if they are explicitly invited to it. The typical use case for observers are companies that offer their customers services running on managed hosts and want to give their customers read only access to dashboards with metrics that affect their business. 

The Administrator, Manager and Troubleshooters roles will be able to see all the War Rooms in a given Space, without being explicitly invited to them. Users with these roles will be able to select which War Rooms send them notifications.


https://i.imgur.com/gDBJZTN.png

https://i.imgur.com/1DSp706.png




How do I sign up for Netdata Pro or Netdata Business?

Let us know and we will add you to the early access waiting list by:
Reaching out to us at info@netdata.cloud

I need help on the Netdata Cloud plans

The Netdata team will be happy to assist you and answer any questions you may have. You can get more information or  reach out through the following channels:

Netdata Pricing
Engage in live chat in Discord
Reach out to us at info@netdata.cloud


Thank you very much and have a nice day! Happy monitoring.
