---
slug: mute-alerts
title: "How to mute alerts during maintenance windows or scheduled backups?"
description: "Disable or Mute Alerts during maintenance windows"
tags: [netdata,alerts,silence,disable,mute,maintenance-window]
keywords: [netdata,alerts,silence,disable,mute,maintenance-window]
image: https://user-images.githubusercontent.com/96257330/199584396-0036ad74-fe5b-4f61-b68f-c6f254a2f43c.png
authors: satya
---

The health management APIs in Netdata allows teams to eliminate unnecessary alerting during scheduled maintenance, testing, auto scaling events, and instance reboots.

<!--truncate-->

For all SREs, it is absolutely crucial to filter out expected events during maintenance windows and quickly pinpoint critical issues in your infrastructure. Every minute is crucial while dealing with troubleshooting issues and any distractions that may hijack the troubleshooting process should be subdued.
The health management APIs in Netdata allows teams to eliminate unnecessary alerting during scheduled maintenance, testing, auto scaling events, and instance reboots.

## Disabling Notifications from Netdata Cloud UI

At the beginning of any maintenance window, you can turn off all the notifications for a user at space or even at the war room level.

![image1](https://user-images.githubusercontent.com/96257330/199587557-5495e465-ea7a-408b-8d80-1d7f7562712f.png)

This will disable all notifications from Netdata Cloud but you will still need additional steps to disable / mute alerts from the nodes / agents themselves and are explained in the below sections.
 
## Health Management API

Netdata provides a command API to control health checks and notifications at runtime. The feature is especially useful for maintenance periods, during which you receive meaningless alerts. The configurations controlled via the API commands are [persisted across Netdata restarts](https://learn.netdata.cloud/docs/agent/web/api/health#persistence).
Specifically, the API allows you to:
- Disable health checks completely. Alarm conditions will not be evaluated at all and no entries will be added to the alarm log.
- Silence alarm notifications. Alarm conditions will be evaluated, the alarms will appear in the log and the Netdata UI will show the alarms as active, but no notifications will be sent.
- Disable or Silence specific alarms that match selectors on alarm/template name, chart, context, host and family.

The API is available by default, but it is protected by an api authorization token that is stored in the file you will see in the following entry of http://NODE:19999/netdata.conf:

```yaml
[registry]
   # netdata management api key file = /var/lib/netdata/netdata.api.key
```
 
You can access the API via GET requests, by adding the bearer token to an Authorization http header, like this:

```bash
curl "http://NODE:19999/api/v1/manage/health?cmd=RESET" -H "X-Auth-Token: Mytoken"
```
By default, access to the health management API is restricted to localhost. Accessing the API from anywhere else will return a 403 error with the message "You are not allowed to access this resource". You can change permissions by editing the `allow management from` variable in netdata.conf within the [web server access lists](https://learn.netdata.cloud/docs/agent/web/server#access-lists) section. See web server access lists for more information.

The command RESET just returns Netdata to the default operation, with all health checks and notifications enabled. If you've configured and entered your token correctly, you should see the plain text response All health checks and notifications are enabled.

**Note**: The Health Management API currently needs to be executed on every host / agent which is under maintenance and at some point in the future we will have a way of triggering maintenance modes from the **Netdata Cloud UI**.


## Disable or silence all alarms

If all you need is temporarily disable all health checks, then you issue the following before your maintenance period starts:

```bash
curl "http://NODE:19999/api/v1/manage/health?cmd=DISABLE ALL" -H "X-Auth-Token: Mytoken"
```
 
The effect of disabling health checks is that the alarm criteria are not evaluated at all and nothing is written in the alarm log. If you want the health checks to be running but to not receive any notifications during your maintenance period, you can instead use this:

```bash
curl "http://NODE:19999/api/v1/manage/health?cmd=SILENCE ALL" -H "X-Auth-Token: Mytoken"
```

Alarms may then still be raised and logged in Netdata, so you'll be able to see them via the UI.

Regardless of the option you choose, at the end of your maintenance period you revert to the normal state via the RESET command.

```bash
curl "http://NODE:19999/api/v1/manage/health?cmd=RESET" -H "X-Auth-Token: Mytoken"
```

## Disable or silence specific alarms

If you do not wish to disable/silence all alarms, then the DISABLE ALL and SILENCE ALL commands can't be used. Instead, the following commands expect that one or more alarm selectors will be added, so that only alarms that match the selectors are disabled or silenced.

- DISABLE : Set the mode to disable health checks.
- SILENCE : Set the mode to silence notifications.

You will normally put one of these commands in the same request with your first alarm selector, but it's possible to issue them separately as well. You will get a warning in the response, if a selector was added without a SILENCE/DISABLE command, or vice versa.

Each request can specify a single alarm selector, with one or more selection criteria. A single alarm will match a selector if all selection criteria match the alarm. You can add as many selectors as you like. In essence, the rule is: IF (alarm matches all the criteria in selector1 OR all the criteria in selector2 OR ...) THEN apply the DISABLE or SILENCE command.

To clear all selectors and reset the mode to default, use the RESET command.

The following example silences notifications for all the alarms with context=load:

```bash
curl "http://NODE:19999/api/v1/manage/health?cmd=SILENCE&context=load" -H "X-Auth-Token: Mytoken"
```

## Selection criteria

The **selection criteria** are key/value pairs, in the format key : value, where value is a Netdata [simple pattern](https://learn.netdata.cloud/docs/agent/libnetdata/simple_pattern). This means that you can create very powerful selectors (you will rarely need more than one or two).

The accepted keys for the selection criteria are the following:

- alarm : The expression provided will match both alarm and template names.
- chart : Chart ids/names, as shown on the dashboard. These will match the on entry of a configured alarm.
- context : Chart context, as shown on the dashboard. These will match the on entry of a configured template.
- hosts : The hostnames that will need to match.
- families : The alarm families.

You can add any of the selection criteria you need on the request, to ensure that only the alarms you are interested in are matched and disabled/silenced. e.g. there is no reason to add hosts: *, if you want the criteria to be applied to alarms for all hosts.

(*Example 1: Disable all health checks for context = random*)

http://NODE:19999/api/v1/manage/health?cmd=DISABLE&context=random

(*Example 2: Silence all alarms and templates with name starting with out_of on host myhost*)

http://NODE:19999/api/v1/manage/health?cmd=SILENCE&alarm=out_of*&hosts=myhost

(*Example 2.2: Add one more selector, to also silence alarms for cpu1 and cpu2*)

http://NODE:19999/api/v1/manage/health?families=cpu1 cpu2

## List silencers

The command LIST was added in Netdata v1.16.0 and returns a JSON with the current status of the silencers.
```bash
curl "http://NODE:19999/api/v1/manage/health?cmd=LIST" -H "X-Auth-Token: Mytoken"
```

As an example, the following response shows that we have two silencers configured, one for an alarm called samplealarm and one for alarms with context random on host myhost

```json
{
       "all": false,
       "type": "SILENCE",
       "silencers": [
               {
                       "alarm": "samplealarm"
               },
               {
                       "context": "random",
                       "hosts": "myhost"
               }
       ]
}
```

The response below shows that we have disabled all health checks.

```json
{
       "all": true,
       "type": "DISABLE",
       "silencers": []
}
```
 
## Let us hear from you

If you haven’t already, [sign up now for a free Netdata account!](https://app.netdata.cloud/) 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!