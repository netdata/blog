---
title: Missing indexes in PostgreSQL? How to quickly identify it
subtitle: 
date: 2022-10-05
author: 
related: ["", "", ""]
tags: 
  [
    "",
  ]
image: "."."""/img/blog/.png".png".png".png".png"""""
---
While working on improving the <a href="https://netdata.cloud/postgresql-monitoring/">Netdata PostgreSQL collector</a>, we were monitoring our production PostgreSQL instance and something caught our attention immediately. The rows fetched ratio seemed really, really low for one particular database... there were missing indexes in PostgreSQL!

<b>Rows fetched ratio</b> is the percentage of rows that contain data needed to execute the query (rows fetched), out of the total number of rows scanned (rows returned). A low value indicates that the database is performing extra work by scanning a large number of rows that aren’t required to process the query.

And the value we saw was significantly low - less than 0.1% of the rows being returned are part of what's being fetched! - and the behavior was consistent for more than a week.

![missing indexes in PostgreSQL](..//img/wp-archive/uploads/2022/10/Screen-Shot-2022-10-05-at-17.01.51-600x228.png)

If Rows fetched ratio is consistently and significantly low, it is likely to be due to missing indexes or inefficient queries. And in this particular case, the culprit was indeed missing indexes in PostgreSQL. Creating the indexes immediately rectified the problem and brought the ratio to satisfactory levels.

![missing indexes in PostgreSQL](..//img/wp-archive/uploads/2022/10/Screen-Shot-2022-10-05-at-17.03.27-600x225.png)

If you’re using PostgreSQL in production, keep an eye on your rows fetched ratio. And if you’re using Netdata, be sure to filter the chart by different databases to see if any of them are missing indexes.

Netdata monitors 100+ other PostgreSQL metrics as well as metrics from more than a thousand other services. If you find a service that Netdata cannot monitor yet, just let us know on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>!
