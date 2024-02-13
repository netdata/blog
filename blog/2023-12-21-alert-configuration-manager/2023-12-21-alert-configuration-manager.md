---
title: Introducing Netdata’s Alerts Configuration Manager
subtitle: 
date: 2023-12-21
author: satya
related: ["", "", ""]
tags: 
  [
    "netdata",
    "alerts-configuration-manager",
    "UI-dashboard",
    "alert-management",
  ]
image: "../img/alert-config-manager.png"
---
Netdata introduces its latest feature, the Alerts Configuration Manager, transforming the way users configure and manage alerts in their Netdata environment. This powerful tool integrates directly into the Netdata Dashboard, offering a streamlined and intuitive interface for both novice and experienced users.



## What is the Alerts Configuration Manager?

The Alerts Configuration Manager is an innovative feature available to users with Business subscriptions. It allows for the creation and customization of alerts directly from the Netdata Dashboard, employing a user-friendly UI wizard. This tool simplifies alert configuration, making it accessible and straightforward, even for those who are not deeply technical.

## Using Alerts Configuration Manager

- Go to the `Metrics` tab and navigate to the `chart` you want to alert on.

- Click the `Alert icon` on the top right corner of the chart.
![Alert Icon](https://github.com/netdata/netdata/assets/96257330/88bb4e86-cbc7-4e01-9c84-6b901188c0de)

- Alert Configuration Manager will open up with the `default` thresholds. Modify the configuration as required and the alert definition on the right will be updated dynamically.
![Alert Configuration Modal](https://github.com/netdata/netdata/assets/96257330/ce39ae64-2ffe-4576-8c92-b7918bb8c91c)

- If you want more fine-grained control or access to more advanced settings, enable `Show advanced` 
![Advance Options](https://github.com/netdata/netdata/assets/96257330/b409b31b-6dc7-484c-a2a4-4e5e471d029b)

- Copy the alert definition that is generated in the code box and add it to an existing [health configuration file](https://learn.netdata.cloud/docs/alerting/health-configuration-reference#edit-health-configuration-files) or a new custom file under `<path to netdata install>/etc/netdata/health.d/` on a `Parent Agent` or a `Standalone Child Agent`.
![Copy the Alert Configuration](https://github.com/netdata/netdata/assets/96257330/c948e280-c6c8-426f-98b1-2b5256cc2707)

- Reload Netdata Alert Health checks `<path to netdata install>/usr/sbin/netdatacli reload-health` and the new alert is now configured.

For more details on the fields and how to use them, take a look at our [documentation](https://learn.netdata.cloud/docs/alerting/creating-alerts-with-the-alerts-configuration-manager).
