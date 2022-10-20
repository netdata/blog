---
slug: how-to-filter-metrics-by-label
title: How to filter metrics by label?
authors: satya
tags: [how-to]
---

It is sometimes easy to get lost in the mountain of metrics and infinite number of dimensions when working with an infrastructure monitoring tool. Being able to filter metrics by label and visualize only what is relevant to the current scope of monitoring &troubleshooting, becomes absolutely crucial to the success of SREs, Sysadmins and DevOps professionals.
<!--truncate-->
The Netdata <a href="https://staging1--netdata-docusaurus.netlify.app/docs/getting-started/netdata-in-a-pane">chart label filtering feature</a> supports grouping by and filtering each chart based on labels (key/value pairs) applicable to the context and provides fine-grain capability on slicing the data / metrics.

All metrics collected get "tagged" with labels and values, thus providing a powerful way to filter metrics by label and visualize all metrics related to the infrastructure.

The chart label filtering is now enabled on:
  - All charts on the <strong>Overview</strong> tab.
  - Custom dashboards.

<img class="alignnone wp-image-17675 size-medium" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Screen-Shot-2022-09-28-at-15.33.40-1-600x247.png" alt="filter metrics by label" width="600" height="247" />

<img class="alignnone wp-image-17677 size-medium" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Screen-Shot-2022-09-28-at-15.34.54-e1664986936905-600x295.png" alt="filter metrics by label" width="600" height="295" />

The top panel on each chart displays the various filters and grouping options selected on the specific chart. These filters are specific for each chart and need to be manually configured on each chart.

Additionally, the charts can be saved to a custom dashboard (new or existing) with the selected filters from the overview screen.

<img class="alignnone wp-image-17679 size-medium" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Screen-Shot-2022-09-28-at-15.39.25-600x246.png" alt="filter metrics by label" width="600" height="246" />

## Customizing labels for Collectors

In addition to the default labels associated with a collector and metrics context (you can identify them by seeing which ones have an ‘_’ as a prefix), there is now a new feature enabled to <a href="https://staging1--netdata-docusaurus.netlify.app/docs/getting-started/netdata-in-a-pane">create custom labels</a>. These custom labels may be needed to group your jobs / instances into various categories.

These custom labels can be configured within your go.d plugins by simply associating a label key / value pair.

```yaml
jobs:
  - name: example_1
    someOption: someValue
    labels:
      label1: value1
      label2: value2

  - name: example_2
    someOption: someValue
    labels:
      label3: value3
      label4: value4
```

For instance, within an infrastructure you may be running multiple Postgres database instances. Some of these may be associated with testing environments, some with staging and some with production environments. You can now associate each Postgres job / instance with a custom label. The “group by” and filtering options will then allow you to associate individual jobs by specific labels.

```yaml
jobs:
  - name: local
    dsn: 'postgres://postgres:postgres@127.0.0.1:5432/postgres'
    collect_databases_matching: '*'
    labels:
      instance_type: production
```

<img class="alignnone wp-image-17681 size-medium" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Screen-Shot-2022-09-28-at-17.35.21-600x221.png" alt="custom labels for collectors" width="600" height="221" />

<img class="alignnone wp-image-17683 size-medium" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/10/Screen-Shot-2022-09-28-at-17.36.14-600x221.png" alt="custom labels for collectors" width="600" height="221" />

## What's Next?

If you haven’t already, <a href="https://app.netdata.cloud/">sign up now for a free Netdata account!</a>

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on <a href="https://discord.com/invite/mPZ6WZKKG2">Discord</a> or <a href="https://github.com/netdata/netdata/">Github</a>.

Happy Troubleshooting!