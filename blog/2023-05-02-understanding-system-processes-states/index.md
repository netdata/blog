---
slug: understanding-system-processes-states
title: Understanding System Processes States
authors: satya
tags: [processes, linux, process-states,operating-system-monitoring]
keywords: [processes, linux, process-states]
image: ./img/stacked-netdata.png
---

![System process states are crucial for understanding a computer's operation, affecting performance and stability at various points in a process's life cycle.](./img/stacked-netdata.png)

The different states of system processes are essential to understanding how a computer system works. Each state represents a specific point in a process's life cycle and can impact system performance and stability.

<!-- truncate -->

## Process States

Netdata's `system.processes_state` chart provides a view of these states, allowing users to monitor system performance in real-time:

![system-processes](./img/system-processes.png)

1. **Running:** A process is in the Running state when it is actively using the CPU and executing instructions. This state is resource-intensive and can lead to performance issues if there are too many Running processes, causing CPU contention and system slowdowns. Processes in the Running state are prioritized using scheduling algorithms to improve system performance.

2. **Sleeping (uninterruptible):** A process is in the Sleeping (uninterruptible) state when it is waiting for a specific resource that is currently unavailable, such as disk I/O or network I/O. A process in this state cannot be interrupted by signals and can lead to a system hang if it remains in this state for too long.

3. **Sleeping (interruptible):** A process is in the Sleeping (interruptible) state when it is waiting for a specific event to occur, such as a timer or a signal. This state is commonly used by user-level processes waiting for input or events and is less likely to cause system instability than the Sleeping (uninterruptible) state. The process can be interrupted by signals, which can cause it to wake up and continue executing. Sleeping (interruptible) processes use fewer system resources than Sleeping (uninterruptible) processes.

4. **Zombie:** A process is in the Zombie state when it has completed its execution and released all system resources but has not been removed from the process table. This state occurs when the parent process has not yet read the exit status of the child process. A large number of Zombie processes can cause a system to run out of process ID (PID) space, leading to system instability or even a system crash. The parent process must read the exit status of the child process to remove it from the process table and avoid Zombie processes buildup. Zombie processes do not use any system resources.

5. **Stopped:** A process is in the Stopped state when it has been suspended from proceeding further due to a STOP or TSTP signal. This state is commonly used by system administrators to pause or resume specific processes, such as daemons or other long-running services. The process will not use any CPU resources and will not proceed further until it receives a CONT signal. Stopped processes can be restarted or terminated by the user or system administrator.

Understanding the different states of system processes is crucial for diagnosing and troubleshooting issues that can arise in a computer system. By monitoring the number of processes in each state using Netdata's `system.processes_state` chart, users can quickly identify performance bottlenecks and system stability issues, ultimately leading to a more stable and reliable computing experience. Netdata's `system.processes_state` chart displays the number of processes in each state in real-time, allowing users to identify system issues quickly and accurately.
