---
slug: split-plugin-packages
title: Upcoming Changes to Plugins in Native Packages
description: Upcoming Changes to Plugins in Native Packages
authors: ferroin
tags: [installation, native-packages, updates, linux, collectors, engineering]
keywords: [installation, native-packages, updates, linux, collectors, engineering]

---

At Netdata, we’re committed to trying to make Netdata work as well as possible for our users. Sometimes though,
that means changing things in ways that aren’t exactly seamless. Such a change is coming soon for users of our
native DEB and RPM packages, and this blog post will explain what’s happening, why we’re doing it, and what
it means for our users.

<!-- truncate -->

## What’s changing?

Starting shortly after the v1.39.0 release of the Netdata Agent, we will be splitting most of our external
data collection plugins out to their own individual packages instead of bundling them all in the main `netdata`
package. We already have this type of split for our CUPS and FreeIPMI plugins, and this new change will extend
that to also provide separate packages for the following plugins:

- The `go.d` plugin (in the new `netdata-plugin-go` package)
- The `python.d` plugin (in the new `netdata-plugin-python` package)
- The `charts.d` plugin (in the new `netdata-plugin-chartsd` package)
- The `slabinfo` plugin (in the new `netdata-plugin-slabinfo` package)
- The `perf` plugin (in the new `netdata-plugin-perf` package)
- The `nfacct` plugin (in the new `netdata-plugin-nfacct` package)
- The eBPF plugin (in the new `netdata-plugin-ebpf` and `netdata-ebpf-legacy-code` packages)
- The apps plugin (in the new `netdata-plugin-apps` package)

All of these packages will be listed as optional dependencies for the main Netdata package, with the `go.d`,
`python.d`, eBPF, and apps plugins being automatically installed by default on most standard configurations.

## Why are we making this change?

With our current approach to packaging Netdata, we actually ship a _lot_ of code that most users never actually use.

For our users, this means that:

- Netdata takes up more disk space than it really needs to. This usually does not matter much, but can still have
  an impact on systems where disk space is at a premium.
- Updating Netdata takes longer and uses more bandwidth than it really needs to.
- A lot of dependencies that are functionally optional at runtime get pulled in even though they are probably
  not needed.
- Their system presents a larger attack surface than it would otherwise.

By splitting our external data collection plugins out to individual packages like this, we’re making it easier
for users to ensure that they only have what they actually need on their system, helping to resolve all of the
above-mentioned issues.

Additionally, this change will reduce the overhead of hosting our native package repositories, allowing us to
dedicate more resources elsewhere.

## What do I need to do?

If you have an existing install of Netdata, you can check whether it is using our official native packages by
running `netdata -W buildinfo | grep 'Install type'`. If the reported install type starts with `binpkg-`, then
that install is using our native packages and is probably affected by this change. If you are not using our official
native packages, you should be completely unaffected by this change.

You can check if you have the nfacct, slabinfo, perf, or charts.d plugins running using the following commands:

-   For the nfacct plugin: `ps ax | grep -v grep | grep nfacct.plugin`
-   For the slabinfo plugin: `ps ax | grep -v grep | grep slabinfo.plugin`
-   For the perf plugin: `ps ax | grep -v grep | grep perf.plugin`
-   For the charts.d plugin: `ps ax | grep -v grep | grep charts.d.plugin`

If the command produces no output, the plugin is not running. Note that just because a plugin is running does not
nescesarily mean you are actually using that plugin. To confirm that you need to check the metrics collected by
the agent, usually by looking at the agent dashboard.

### If you are using our official DEB packages

#### Existing installs

Updating from a version from before this change will result in the external plugins being essentially removed
from your system and needing to be manually installed if required.

This is a result of a limitation in how APT handles soft dependencies on updates (in particular, it simply doesn’t).

You can explicitly pull in the default set of external plugins in one of two ways:

1.  Explicitly uninstall and reinstall the `netdata` package. This will not work though if you have your system
    set to not install recommended packages by default. Uninstalling and reinstalling this way should not result
    in any loss of metrics data, though it may remove configuration files if you use `apt purge` to remove the
    package or have APT configured to automatically purge configuration files when a package is removed.
2.  Run the following:

    ```sh
    apt-cache depends netdata | \
    awk '/Recommends:/ {system("sudo apt-get install "$2"; sudo apt-mark auto "$2)}'
    ```

    That will look through the list of dependencies for Netdata and pull in any optional dependencies that would
    be installed by default, prompting for each individual package.

Additionally, if you need the nfacct, perf, or slabinfo plugins, or one of the collectors provided by the `charts.d`
plugin, you will need to manually install the associated packages.

#### New installs

Most new installs should be unaffected by this change. There are two exceptions:

1.  If you need the nfacct, perf, or slabinfo plugins, or one of the collectors provided by the `charts.d` plugin,
    you will need to manually install the associated packages.
2.  If you have your system configured to not install recommended packages by default, then you will need to
    manually install all the external plugin packages you require (or, alternatively, check the second option
    above for existing installs to pull in the default set).

### If you are using our official RPM packages on most systems

#### Existing installs

Existing installs should be unaffected by this change unless you need the nfacct, perf, or slabinfo plugins,
or one of the collectors provided by the `charts.d` plugin, in which case you will need to manually install the
associated packages.

#### New installs

New installs should be unaffected by this change unless you need the nfacct, perf, or slabinfo plugins, or one of the
collectors provided by the `charts.d` plugin, in which case you will need to manually install the associated packages.

### If you are using our official RPM packages on CentOS 7, RHEL 7, or equivalent systems

#### Existing installs

Updating from a version from before this change will result in the external plugins being essentially removed
from your system and needing to be manually installed if required.

This is a result of a lack of support for weak dependencies in the version of RPM included on these systems, combined
with technical limitations in our own CI that prevent us from providing packages that automatically handle this case.

#### New installs

New installs should be unaffected by this change unless you need the nfacct, perf, or slabinfo plugins, or one of the
collectors provided by the `charts.d` plugin, in which case you will need to manually install the associated packages.

## Let us hear from you

If you have concerns, ideas and/or requests regarding these changes, make sure to reach out to us through [GitHub Discussions](https://github.com/netdata/netdata/discussions/), the [Forums](https://community.netdata.cloud/) or engage with the community in the [Netdata Discord server](https://discord.com/invite/mPZ6WZKKG2).
