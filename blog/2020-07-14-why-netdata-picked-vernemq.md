---
slug: why-netdata-picked-vernemq
title: "Why Netdata picked VerneMQ"
description: "Why Netdata picked VerneMQ"
image: https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Blog-Why-Netdata-Picked-VerneMQ.jpeg
tags: [engineering]
keywords: [netdata,engineering]
authors: team
---

<!--truncate-->

<img class="alignnone size-full wp-image-16705" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/Blog-Why-Netdata-Picked-VerneMQ.jpeg" alt="" width="683" height="470" />

In 2019, the Netdata team already knew that a Netdata Cloud solution in the form of an online platform would greatly complement Netdata’s distributed monitoring by making it much easier to organize large infrastructures and by enabling new ways for teams to collaborate. The old node registry available at the time wasn’t enough for Netdata’s users.

Building an online platform, even one that does not directly process users’ metrics, is challenging. But less challenging than it was even a few years ago, since the technology stack has improved greatly over the years.
<h2>Choosing a primary message broker</h2>
One of these new options available is <a title="VerneMQ" href="https://vernemq.com/" target="_blank" rel="noopener noreferrer">VerneMQ</a>. Developed in Erlang, it has a certain set of features that other middleware solutions did not have, primarily MQTT 5 (a lightweight, IoT-focused messaging protocol) and user-friendly clustering. These two features were the primary reasons for choosing it as our main message broker. Other solutions existed that fulfilled the rest of our requirements (specifically being open-source and having industry-proven use cases), but only VerneMQ fit the bill on all counts.

Of course, we also had to confirm that VerneMQ would work with the loads we had in mind. What this really means is that it would not be too expensive to run per user, especially considering we are trying to provide a free service. So the team ran extensive load-testing on the platform. VerneMQ did really well! Using load tests built with a <a title="MQTT benchmarking tool" href="https://github.com/krylovsk/mqtt-benchmark" target="_blank" rel="noopener noreferrer">MQTT benchmarking tool</a>, the team determined that, on our setups, VerneMQ can handle 23,000 messages per second with a maximum latency of 65ms in stress tests. CPU and RAM utilization was also reasonable in tests with large numbers of idle connections.
<h2>How Netdata uses VerneMQ today</h2>
So how does Netdata use VerneMQ today? Agents connect using HTTPS WebSockets (WSS) to a HAProxy load balancer which feeds connections to VerneMQ. VerneMQ acts as our <a title="Agent-Cloud Link" href="https://learn.netdata.cloud/docs/agent/aclk/#!" target="_blank" rel="noopener noreferrer">Agent-Cloud Link</a> broker, using MQTT 3.1, with MQTT 5 available for future-proofing.

All the additional middleware software for Netdata Cloud is written in Go, using a standard microservices architecture, with a few additional components and databases handling state information. There are two Go services that consume from VerneMQ, debounce and cleanup messages from Netdata’s node agents related to metrics metadata and alarms, and then push those messages into <a title="Apache Pulsar" href="https://pulsar.apache.org/" target="_blank" rel="noopener noreferrer">Apache Pulsar</a>. After further processing, state information is finally updated and stored in <a title="CockroachDB" href="https://www.cockroachlabs.com/" target="_blank" rel="noopener noreferrer">CockroachDB</a>.

<img class="alignnone size-full wp-image-16707" src="https://netdatacloud20.kinsta.cloud/wp-content/uploads/2022/03/cloud-arch-R1-980x416-1.png" alt="" width="980" height="416" />

Something to consider here is that the link is bidirectional. Since Netdata Cloud does not store machine metrics, the metrics that you see in the Cloud app are requested and returned on demand, almost instantly, and with minimum overhead – thanks to VerneMQ.

To learn more about the projects used here, check out:
<ul>
 	<li><strong><a title="VerneMQ" href="https://github.com/vernemq/vernemq" target="_blank" rel="noopener noreferrer">VerneMQ</a></strong></li>
 	<li><strong><a title="Apache Pulsar" href="https://github.com/apache/pulsar" target="_blank" rel="noopener noreferrer">Apache Pulsar</a></strong></li>
 	<li><strong><a title="CockroachDB" href="https://github.com/cockroachdb/cockroach" target="_blank" rel="noopener noreferrer">CockroachDB</a></strong></li>
</ul>
To learn more about monitoring these projects with Netdata, please see:
<ul>
 	<li><strong><a title="VerneMQ monitoring with Netdata" href="https://staging-www.netdata.cloud/vernemq-monitoring/" target="_blank" rel="noopener noreferrer">VerneMQ monitoring with Netdata</a></strong></li>
 	<li><strong><a title="Apache Pulsar monitoring with Netdata" href="https://staging-www.netdata.cloud/pulsar-monitoring/" target="_blank" rel="noopener noreferrer">Apache Pulsar monitoring with Netdata</a></strong></li>
 	<li><strong><a title="CockroachDB monitoring with Netdata" href="https://staging-www.netdata.cloud/cockroachdb-monitoring/" target="_blank" rel="noopener noreferrer">CockroachDB monitoring with Netdata</a></strong></li>
</ul>