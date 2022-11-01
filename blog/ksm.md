---
slug: KSM 
title: "Monitor KSM performance with Netdata"
description: "Monitor KSM performance with Netdata"
image: https://user-images.githubusercontent.com/24860547/199330415-0140bcee-76c7-4bf5-a9ca-201161d7e2c9.png
tags: [ksm,linux,deduper,memory,vm,host]
keywords: [ksm,linux,deduper,memory,vm,host,how-to,infrastructure-monitoring,monitoring]
authors: shyam
---

Monitoring KSM (Kernel Same-page Merging) performance at deduping memory shared across VMs.

<!--truncate-->

## Kernel Same-page Merging (KSM) 

Linux kernels store memory in **pages** which are moved in and out of memory as a single block. On most Linux architectures pages are 4096 bytes. **KSM** (Kernel Same-page Merging) is a kernel feature that scans memory looking for pages with identical content, and then de-duplicates them. The most common use-case where such duplicate pages occur is on hosts running multiple virtual machines (VMs).

KSM can greatly reduce the amount of memory used by VMs. When it finds two or more identical pages, it replaces them with a single page that is shared by all VMs that are using it.

On hosts running a large number of VMs, this can lead to significant reductions in memory usage, as well as significant performance improvements, since VMs will no longer need to keep track of multiple copies of the same page.

## Monitoring KSM performance using Netdata

Netdata auto discovers KSM (as long as it is enabled) and starts monitoring it with zero configuration requrired. The monitoring is done by reading the relevant files from `/sys/kernel/mm/ksm/`.

The **deduper (ksm)** charts can be seen under the **Memory** section in the Netdata UI. 

### KSM summary

The summary gives you a quick idea of how much savings (in terms of bytes and in terms of percentage) KSM is able to achieve.

![image](https://user-images.githubusercontent.com/24860547/199328063-d4f17c66-9825-49f9-8845-ee6488485f58.png)

### KSM pages merge performance 

This chart indicates the performance of page merging. **Shared** indicates used shared pages, **Unshared** indicates memory no longer shared (pages are unique but repeatedly checked for merging), **Sharing** indicates memory currently shared(how many more sites are sharing the pages, i.e. how much saved) and **Volatile** indicates volatile pages (changing too fast to be placed in a tree).

A high ratio of Sharing to Shared indicates good sharing, but a high ratio of Unshared to Sharing indicates wasted effort.

![image](https://user-images.githubusercontent.com/24860547/199330415-0140bcee-76c7-4bf5-a9ca-201161d7e2c9.png)

### KSM savings

This chart shows the amount of memory saved by KSM. **Savings** indicates saved memory. **Offered** indicates memory marked as mergeable.

![image](https://user-images.githubusercontent.com/24860547/199331218-78efec0b-a03a-42fd-a678-ecdfd42db266.png)

### KSM effectiveness

This chart tells you how well KSM is doing at what it is suppoesed to. It does this by charting the percentage of the mergeable pages that are currently merged.. 

![image](https://user-images.githubusercontent.com/24860547/199331362-94a98239-b08e-45c0-9adf-777e51ed44e4.png)

## How to check if KSM is enabled (and enable it if it isn't)

KSM is usually disabled by default. 

On Ubuntu, here's how you can enable it. 
- Ensure KSM is turned on. 
  - `/sys/kernel/mm/ksm/run` should contain a `1` if KSM is enabled. If not, write `1` to the file to enable KSM.
- Ensure libvirt is enabling KSM. 
  - The KSM value in `/etc/defaults/qemu-kvm` should be set to `AUTO`.

Once KSM is enabled, you can monitor its progress by looking at the /sys/kernel/mm/ksm/pages_shared, /sys/kernel/mm/ksm/pages_sharing, and /sys/kernel/mm/ksm/pages_to_scan files.

You may need to fine tune KSM for optimal performance, or to realize the memory savings quicker. You can do this by using the following sysctl parameters:
- kernel.ksm.pages_to_scan (the default value of 100 means it will take a long time to scan the entire memory)
- kernel.ksm.run_interval
- kernel.ksm.sleep_millisecs

If you are using RedHat, this [doc](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/virtualization_tuning_and_optimization_guide/chap-ksm) explains how to enable KSM.

## Things to consider

If KSM is so great at saving memory why isn't it enabled by default? Well, there are some potential pitfalls you should watch out for when using KSM. Depending on the use-case the effectiveness of KSM may vary, there is also an additional processing load placed on the kernel and the savings in memory may be balanced (or outbalanced) by increases in CPU usage. In addition there are security concerns that could be exploited by threat actors who have access to any of the VMs running on the host through techniques such as:
- [Circumvention of address space layout randomization (ASLR)](http://staff.aist.go.jp/k.suzaki/EuroSec2011-suzaki.pdf)
- [Expose information via timing attacks](https://graz.pure.elsevier.com/en/publications/remote-memory-deduplication-attacks)
- [FFS Row Hammer attacks](https://news.softpedia.com/news/new-ffs-rowhammer-attack-targets-linux-vm-setups-507290.shtml)

However, depending on your use-case and how secure and controlled the access to your host machine is - KSM might be a great option to significantly reduce the memory usage.

## Let us hear from you

If you haven’t already, [sign up now for a free Netdata account!](https://app.netdata.cloud/) 

We’d love to hear from you – if you have any questions, complaints or feedback please reach out to us on [Discord](https://discord.com/invite/mPZ6WZKKG2) or [Github](https://github.com/netdata/netdata/).

Happy Troubleshooting!

