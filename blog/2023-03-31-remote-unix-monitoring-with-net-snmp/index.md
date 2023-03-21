---
slug: remote-unix-monitoring-with-net-snmp
title: Monitoring remote UNIX-like systems using Netdata and Net-SNMP
authors: ferroin
tags: [snmp, monitoring, infrastructure-monitoring, collectors]
keywords: [snmp, monitoring, infrastructure-monitoring, collectors]
image: ./img/img.jpg
---

![img](./img/img.jpg)

Need to monitor a UNIX-like system, but can’t install Netdata on it? With our SNMP collector and Net-SNMP,
you can get basic system information with just a bit of relatively quick and easy configuration.

<!-- truncate -->

## What is SNMP?

The Simple Network Management Protocol, commonly known as SNMP, is a relatively lightweight protocol designed for
monitoring and configuration management for network appliances like switches, routers or gateways. However, it can also
be used for those purposes on almost any UNIX-like system thanks to the [Net-SNMP project](http://www.net-snmp.org/).

There are a couple of basic SNMP concepts to cover first:

-   An **OID**, or ‘Object IDentifier’, is a unique identifier for a specific resource exposed by a node over
    SNMP. OIDs are structured like filesystem paths (read from left to right), but use `.` to separate individual
    components and use integers instead of names. For example, the OID `.1.3.6.1.2.1.25.1.6.0` refers specifically
    to a counter that tracks the current number of processes on the node. Most OIDs start with either `.1.3.6.1.2.1`
    (which are usually OIDs defined by the international standards organizations) or `.1.3.6.1.4.1` (which are
    vendor-defined OIDs). We will be using raw OIDs in most places below, as those are what our SNMP collector
    actually uses for configuration.
-   An **MIB**, or ‘Management Information Base’, is a special document that dictates how OIDs under a specific
    prefix are structured and what they mean. An MIB maps between human-readable names and OIDs, but it also acts as
    a schema defining exactly what OIDs may exist under a given OID, and what type of data those OIDs contain. MIBs
    are generally provided by the vendor of the SNMP implementation. The two MIBs we will be using here are the
    HOST-RESOURCES-MIB, which is defined by the IETF in [RFC 2790](https://www.ietf.org/rfc/rfc2790.txt), and
    the UCD-SNMP-MIB, originally created by UC Davis for monitoring their own UNIX-like systems and currently
    maintained by the Net-SNMP project.
-   **SNMP v3** is the current version of the SNMP protocol. It includes support for user-based access controls, as
    well as support for on-the-wire encryption, making it the preferred version to use in secure environments. However,
    it’s a bit more complicated to set up correctly.
-   **SNMP v2c** is the commonly used variant of the previous version of the SNMP protocol. It doesn’t support
    encryption, and uses a much more primitive access control system involving what are known as ‘communities’
    (essentially, short plain-text passwords).

SNMP has a bit of a bad reputation among seasoned network adminjistrators as being far more complicated than
it’s name suggests, though for the purposes of this document that complexity should not matter as we are using
well-defined interfaces that are not particularly vendor-specific.

## Setting up Net-SNMP

### If you already know what you’re doing...

If you already have experience working with Net-SNMP and just want to quickly get things set up so you can use
the Netdata configuration below, simply set up a user or community for Netdata which has access to read objects
under `.1.3.6.1.2.1.25` (the HOST-RESOURCES-MIB prefix) and `.1.3.6.1.4.1.2021` (the UCD-SNMP-MIB), double check
that the UCD-SNMP-MIB::dskTable is populated (you may need to add some extra config to enable disk monitoring if
it isn’t), and then jump straight to [the Netdata configuration section](#configuring-netdata).

### Common configuration

First, if you haven’t already, install Net-SNMP on the system you want to collect data from. On most Linux and
BSD systems, it’s in a package named `net-snmp`. Some package repositories provide separate packages for the
individual components, in which case you just need the one that provides the `snmpd` command and service.

You should also install the Net-SNMP command-line tools on the system where you will be running Netdata so that
you have a way to check that things are working correctly. Depending on the system, these may either be in the same
`net-snmp` package, or they might be in a separate package called something like `net-snmp-tools`.

If you have a firewall configured on the system you will be collecting data from, you will also need to add a rule
to allow UDP packets on port 161.

The SNMP daemon configuration is usually stored in `/etc/snmp/snmd.conf`. A basic configuration for our purposes
looks like this:

```yaml title="/etc/snmp/snmd.conf"
# Explicitly enable disk space collection
# Without this we can’t get disk usage info in the UCD-SNMP-MIB.
includeAllDisks 1%

# Define a named view of the OID tree.
# This is used to restrict access to just those subsets of the tree that we are collecting data from.
# It’s not strictly required, but is considered best practice from a security perspective.
view netdata included .1.3.6.1.2.1.25.1.5.0     # user counts
view netdata included .1.3.6.1.2.1.25.1.6.0     # process counts
view netdata included .1.3.6.1.4.1.2021.4       # memory usage
view netdata included .1.3.6.1.4.1.2021.9       # disk usage
view netdata included .1.3.6.1.4.1.2021.10.1.5  # system load averages
view netdata included .1.3.6.1.4.1.2021.11      # CPU usage, context switches, and interrupts
```

This still needs access controls to be configured, though how you do so depends on whether you want to use SNMP
v3 or SNMP v2c.

### SNMP v2c

If you trust all the users on your network, SNMP v2c is _usually_ sufficient. If not, you should [use SNMP v3
instead](#snmp-v3).

SNMP v2c setup is relatively simple, just needing a read-only community matched to the view we defined above.

```yaml title="/etc/snmp/snmd.conf"
# Define a community named ‘netdata’ restricted to the view named ‘netdata’.
rocommunity netdata -V netdata

# Same as above, but only allow access from 192.0.2.1:
rocommunity netdata 192.0.2.1 -V netdata

# Same, but allow all of 192.0.2.1
rocommunity netdata 192.0.2.0/24 -V netdata

# Same as the above examples, but for IPv6
rocommunity6 netdata -V netdata
rocommunity6 netdata 2001:db8::1 -V netdata
rocommunity6 netdata 2001:db8::/32 -V netdata
```

Once you have the configuration set up, start the snmpd service, and then run `snmpget -v 2c -c netdata HOSTNAME
.1.3.6.1.2.1.25.1.5.0` on the system where you will be running Netdata to collect the data, replacing `HOSTNAME`
with the host name or IP address of the system you will be collecting the data from. If everything is set up
correctly, this should produce output like `HOST-RESOURCES-MIB::hrSystemNumUsers.0 = Gauge32: 0`, though the number
at the end may differ.

### SNMP v3

SNMP v3 setup is much more complicated than SNMP v2c setup, but also allows for much greater security.

Setup of SNMP v3 requires defining a user, and then adding it to the required views.

Luckily, Net-SNMP provides a script called `net-snmp-create-v3-user` that simplifies this configuration
significantly. To add a user for Netdata using this script, make sure the snmpd service is _not_ running, and then
run (as root):

```sh
net-snmp-create-v3-user -ro -A PASSWORD -a SHA-256 -x AES netdata
```

Replace `PASSWORD` in the above command with the password you want to use for the netdata user.

Once you have that set up, you just need to associate the new user with the view we defined in the base configuration
like so:

```yaml title="/etc/snmp/snmd.conf"
# Restrict the ‘netdata’ user to the view named ‘netdata’.
rouser netdata -V netdata

# Same as above, but only allow access from 192.0.2.1:
rouser netdata 192.0.2.1 -V netdata

# Same, but allow all of 192.0.2.1
rouser netdata 192.0.2.0/24 -V netdata

# Same as the above examples, but for IPv6
rouser6 netdata -V netdata
rouser6 netdata 2001:db8::1 -V netdata
rouser6 netdata 2001:db8::/32 -V netdata
```

Once you have the configuration set up, start the snmpd service, and then run `snmpget -v 3 -u netdata -l noAuthPriv
-a SHA -A PASSWORD HOSTNAME .1.3.6.1.2.1.25.1.5.0` on the system where you will be running Netdata to collect the
data, replacing `PASSWORD` with the password you set when creating the user, and `HOSTNAME` with the host name
or IP address of the system you will be collecting the data from. If everything is set up correctly, this should
produce output like `HOST-RESOURCES-MIB::hrSystemNumUsers.0 = Gauge32: 0`, though the number at the end may differ.

## Configuring Netdata

Configuration of Netdata to collect this data is also relativley simple. Our [SNMP collector](https://learn.netdata.cloud/docs/data-collection/monitor-anything/Networking/SNMP) is part of the Go
plugin, so to open the configuration run:

```sh
/etc/netdata/edit-config go.d/snmp.conf
```

The configuration file itself is a YAML document.

A basic configuration for a single host looks like:

```yaml title="/etc/netdata/go.d/snmp.conf"
# If we don’t see a system on startup, check again every five minutes
# until we do see it.
autodetection_retry: 300

jobs:
- name: REMOTE_HOST   # The name to show in the dashboard for this system.
  hostname: HOSTNAME  # The actual host name or IP address to connect to.
  update_every: 5     # How frequently to collect metrics, in seconds.

  # Configuration for SNMP v2c
  #
  # Uncomment the next two lines if you are using SNMP v2c
  #community: public
  #options: {version: 2}

  # Configuration for SNMP v3
  #
  # Uncomment the next eight lines if you are using SNMP v3
  #user:
  #  name: netdata
  #  level: authPriv
  #  auth_proto: sha256
  #  auth_password: &pass 'PASSWORD'  # Make sure to change this to your actual password.
  #  priv_proto: aes
  #  priv_password: *pass
  #options: {version: 3}

  # Define each of the charts to collect
  # This also defines a YAML anchor for the charts, so for additional jobs you can just use
  # `charts: *unix-charts` instead of needing to repeat all of this config.
  charts: &unix-charts
  # CPU usage chart
  # Not all systems provide all dimensions, but the ones that aren’t collected will be ignored.
  - family: cpu
    id: cpu
    title: CPU Usage
    type: stacked
    units: '%'
    dimensions:
    - {algorithm: incremental, name: user, oid: 1.3.6.1.4.1.2021.11.50.0}
    - {algorithm: incremental, name: nice, oid: 1.3.6.1.4.1.2021.11.51.0}
    - {algorithm: incremental, name: system, oid: 1.3.6.1.4.1.2021.11.52.0}
    - {algorithm: incremental, name: kernel, oid: 1.3.6.1.4.1.2021.11.55.0}
    - {algorithm: incremental, name: iowait, oid: 1.3.6.1.4.1.2021.11.54.0}
    - {algorithm: incremental, name: irq, oid: 1.3.6.1.4.1.2021.11.56.0}
    - {algorithm: incremental, name: softirq, oid: 1.3.6.1.4.1.2021.11.61.0}
    - {algorithm: incremental, name: steal, oid: 1.3.6.1.4.1.2021.11.64.0}
    - {algorithm: incremental, name: guest, oid: 1.3.6.1.4.1.2021.11.65.0}
    - {algorithm: incremental, name: guest_nice, oid: 1.3.6.1.4.1.2021.11.66.0}
  # Load average chart
  # The actual numbers being collected are 100 times the load average
  # This is done to simplify processing
  - family: load
    id: load
    title: Load Average
    type: line
    units: load
    dimensions:
    - {algorithm: absolute, divisor: 100, name: load1, oid: 1.3.6.1.4.1.2021.10.1.5.1}
    - {algorithm: absolute, divisor: 100, name: load5, oid: 1.3.6.1.4.1.2021.10.1.5.2}
    - {algorithm: absolute, divisor: 100, name: load15, oid: 1.3.6.1.4.1.2021.10.1.5.3}
  # Memory usage chart
  # Due to practical limitations, this lists total and available memory, not free and used
  # The actual values reported over SNMP are in kibibytes, so this adjusts them to bytes for nicer
  # presentation and auto-scaling.
  - family: memory
    id: snmp_memory
    title: System Memory Usage
    type: line
    units: bytes
    dimensions:
    - {algorithm: absolute, multiplier: 1024, name: total, oid: 1.3.6.1.4.1.2021.4.5.0}
    - {algorithm: absolute, multiplier: 1024, name: avail, oid: 1.3.6.1.4.1.2021.4.6.0}
  # Swap usage chart
  # Due to practical limitations, this lists total and available memory, not free and used
  # The actual values reported over SNMP are in kibibytes, so this adjusts them to bytes for nicer
  # presentation and auto-scaling.
  - family: swap
    id: snmp_swap
    title: System Swap Usage
    type: line
    units: bytes
    dimensions:
    - {algorithm: absolute, multiplier: 1024, name: total, oid: 1.3.6.1.4.1.2021.4.3.0}
    - {algorithm: absolute, multiplier: 1024, name: avail, oid: 1.3.6.1.4.1.2021.4.4.0}
  # Interrupts chart
  # This tracks the rate of interrupts on the system.
  - family: interrupts
    id: intr
    title: Interrupts
    type: line
    units: interrupts/s
    dimensions:
    - {algorithm: incremental, name: interrupts, oid: 1.3.6.1.4.1.2021.11.59.0}
  # Context switches chart
  # This tracks the rate of context switches on the system.
  - family: processes
    id: ctxt
    title: Context Switches
    type: line
    units: context switches/s
    dimensions:
    - {algorithm: incremental, name: switches, oid: 1.3.6.1.4.1.2021.11.60.0}
  # Users chart
  # This tracks the number of users the system reports as being logged in.
  - family: users
    id: snmp_users
    title: System Users
    type: line
    units: users
    dimensions:
    - {algorithm: absolute, name: users, oid: 1.3.6.1.2.1.25.1.5.0}
  # Processes chart
  # This tracks the number of running processes on the system.
  - family: processes
    id: processes
    title: System Processes
    type: line
    units: processes
    dimensions:
    - {algorithm: absolute, name: processes, oid: 1.3.6.1.2.1.25.1.6.0}
```

This configuration:

-   Sets up an autodetection retry interval. This is generally important for most types of remote data collection,
    as it ensures that Netdata will eventually start collecting data even if the target system was not powered on
    (or the SNMP daemon was not running) when Netdata first tried to collect metrics from it. 300 seconds is
    generally a reasonable amount of time for this, as it avoids sending excessive network traffic but also ensures
    that data collection will start relatively quickly in most cases once the target system comes back online.
-   Specifies a data collection interval of five seconds. The default configuration for the SNMP collector is
    every 10 seconds, which is reasonable for many network appliances, as they often cannot provide data quickly
    over SNMP, but for our usage it normally takes no more than a few miliseconds to collect and send the data we are
    fetching, so smaller collection intervals are generally safe, and this just comes down to a matter of how much
    impact the data collection has on the target system. On a big system without strict latency requirements, you
    can probably even push this all the way down to 1 second safely, but five seconds is a reasonable starting point.
-   Sets up a series of charts for a number of basic system statictics. WHere possible, the family and id values
    for these charts have been chosen to match up with native data collection charts that collect the same
    information, allowing for sensible aggregation on Netdata Cloud when using virtual nodes (see the next section
    for more info about that).

### Disk space monitoring

Unlike the other metrics we set up in the configuration above, disk space monitoring with SNMP is a bit tricky. The
UCD-SNMP-MIB includes OIDs for monitoring disk space usage, but only the root filesystem has a predictable OID
for this type of monitoring, so some extra setup is needed for each individual system.

The general configuration for a disk space monitoring chart looks like:

```yaml
  - family: disk_space
    id: _
    title: /
    type: stacked
    units: bytes
    dimensions:
    - {algorithm: absolute, name: avail, oid: 1.3.6.1.4.1.2021.9.1.7.1}
    - {algorithm: absolute, name: used, oid: 1.3.6.1.4.1.2021.9.1.8.1}
```

The above configuration snippet can be used to monitor the root filesystem’s space usage on any system. To get
a list of what other filesystems you can monitor, run:

```sh
snmpwalk -v 2c -c netdata HOSTNAME 1.3.6.1.4.1.2021.9.1.2
```

or, if using SNMP v3:

```sh
snmpwalk -v 3 -u netdata -l noAuthPriv -a SHA -A PASSWORD HOSTNAME 1.3.6.1.4.1.2021.9.1.2
```

Those should produce output that looks something like:

```
UCD-SNMP-MIB::dskPath.1 = STRING: /
UCD-SNMP-MIB::dskPath.2 = STRING: /dev
UCD-SNMP-MIB::dskPath.3 = STRING: /boot/efi
```

The relevant parts here are the number just before the `=`, which is the disk index, and the part at the end of
the line, which indicates the path to the filesystem corresponding to that index. You can replace the final `1`
in the OIDs in the configuration above with the desired disk index to monitor that specific disk, thoughy you
should also change the `id` and `title` for the chart to uniquely identify that specific disk.

Index 1 will always be the root filesystem. The indexes of other filesystems are based on the order they are listed
in the kernel’s mount table, so they are dependent on the exact configuration of the system, and they may change
as a result of seemingly unrelated changes such as kernel upgrades.

### Virtual Nodes

Starting with v1.39.0, Netdata is adding a new feature called ‘virtual nodes’ (or ‘vnodes’). Virtual nodes
let you treat a set of metrics as a separate system from the system that Netdata is running on, which is perfect
for monitoring remote UNIX systems via SNMP.

You can open the virtual nodes configuration by running:

```sh
/etc/netdata/edit-config vnodes/vnodes.conf
```

The configuration file itself is a YAML document, just like with the SNMP collector configuration.

A simple configuration entry for a single virtual node might look like this:

```yaml title="/etc/netdata/vnodes/vnodes.conf"
- hostname: foo.example.com                  # This defines the hostname that will be shown for the node
  guid: 00000000-0000-0000-0000-000000000000 # This defines the node’s GUID. It should be unique among all nodes.
  labels:                                    # This defines host labels, which are used to present information about the node in Netdata Cloud
    _architecture: x86_64
    _os_name: Solaris
    _os_version: 11
    _system_cores: 8
    _system_cpu_freq: 4700000000
    _system_disk_space: 1099511627776
    _system_ram_total: 34359738368
    _virtualization: kvm
```

Once you have a virtual node defined, you simply need to add a `vnode:` key to the SNMP job that you want to
associate with that node, with the value being equal to the hostname of the virtual node.

## What about other SNMP implementations?

The configuration outlined above for Netdata will also work with most other SNMP implementations provided they
expose the relevant OIDs. Pretty much anything exposes the HOST-RESOURCES-MIB, though the UCD-SNMP-MIB is much
more vendor-specific. As far as I know, only Net-SNMP supports it out of the box, though FreeBSD does include a
package with an extension for bsnmpd (called `bsnmp-ucd`) that implements support for it.
