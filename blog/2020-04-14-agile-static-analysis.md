---
title: The role of shift-left testing in an agile environment
subtitle: 
date: 2020-04-14
author: 
related: ["", "", ""]
tags: 
  [
    "",
  ]
image: "."."""/img/blog/Netdata-Security-use-with-Static-Analysis.png.png".png".png".png".png"""""
---
<img class="alignnone size-large wp-image-16723" src="/img/wp-archive/uploads/2022/03/Netdata-Security-use-with-Static-Analysis-1200x899.png" alt="" width="1200" height="899" />

With the rapid growth of security threats to infrastructure, it’s more important than ever to proactively address vulnerabilities. As an open-source project, built on the trust of users and contributors, Netdata has security concerns at its core.

Because we’re committed to code security and quality, we apply <a href="https://agilemanifesto.org/">Agile principles</a> throughout the software development process. A component of this includes regular static analysis. Through continuous, automated testing, we’re able to move quickly to keep up with end-user requests without compromising our source code.
<h2>What is static analysis?</h2>
Static analysis, also known as static application security testing <a href="https://www.gartner.com/en/information-technology/glossary/static-application-security-testing-sast">(SAST)</a>, is designed to analyze code and assist in securing software from vulnerabilities. Static analysis works automatically to detect flaws in the code, draw conclusions, and provide feedback. Alerts or warnings can include things like security issues, syntax errors, bugs, questionable constructs, and more.

Static analysis plays an important role in our development phase by finding potential issues that could be introduced when new code is deployed. We’ve been investing a lot of effort in finding solutions that help us securely deploy faster at scale. Let’s take a look at our process

<img class="alignnone size-full wp-image-16725" src="/img/wp-archive/uploads/2022/03/Seconday-MovingBeyond.png" alt="" width="600" height="600" />
<h2>Moving beyond “moving left”</h2>
&nbsp;

In agile, <a href="https://dzone.com/articles/the-shift-left-principle-and-devops-1">“moving left or “shifting left”</a> refers to testing earlier in development rather than later. The earlier our teams validate the code they write, the less chance there is for disruption further into the development process. This methodology plays an important role in how our developer teams routinely apply their agile principles.

Part of this process includes our developers using local linters like <a href="https://github.com/koalaman/shellcheck">ShellCheck</a> and <a href="https://github.com/vim-syntastic/syntastic">Syntastic</a> as early as possible in their processes. <a href="https://en.wikipedia.org/wiki/Lint_(software)">Linters</a> are a type of static analysis that works to find construct behavior that could potentially become run-time bugs in the future. Catching issues early means less work for the team later on and acts as an additional safeguard to prevent end users from being affected.

The next step includes using internal linters when code is introduced to the development environment. These are used for checking code readability, catching syntax errors, potential bugs, and more. While implementing each of these linting processes created important safeguards, we wanted to take our security discipline one step further by exploring additional solutions.

<img class="alignnone size-full wp-image-16727" src="/img/wp-archive/uploads/2022/03/Seconday-StaticAnalysis.png" alt="" width="600" height="600" />
<h2>Challenges of static analysis</h2>
The challenge was finding a solution that further prevented security threats and software bugs while also integrating into our development process with minimal friction. The solution needed to be compatible with the current workflows which are largely centralized in GitHub. Any tool also needed to fit into our continuous integration and continuous delivery (CI/CD) pipelines for releasing code changes to production quickly and regularly.

We met that challenge by using LGTM, Codacy, and Coverity. These three tools support Netdata’s most commonly used programming languages and best fit our current engineering workflows for reviewing deficiencies and getting as much insight into our code base as possible. Together, these tools give us a comprehensive, reliable code review suite. Below, we’ll break down the role each tool plays in our code review.

<img class="alignnone size-full wp-image-16729" src="/img/wp-archive/uploads/2022/03/Seconday-LGTMCodacyCoverity.png" alt="" width="600" height="600" />
<h2>LGTM</h2>
LGTM’s automated open code review runs on every pull request in our repository, including automatically running checks on each commit and sending a <a href="https://lgtm.com/projects/g/netdata/netdata/alerts/?mode=list">CodeQL</a> alert when an error is flagged. If an alert is triggered, the pull request is blocked from merging until resolved.

LGTM can also scan many of the programming languages we use at Netdata. This primarily includes JavaScript for frontend, and C, Python, Go, and Bash for backend development. Through autodetecting the code type, there’s no need to explicitly state code style in the settings. We use LGTM on an ongoing basis, letting us deploy faster without interfering with a developer’s productivity. With LGTM, we’re able to quickly resolve issues all while remaining in the GitHub platform.
<h2></h2>
<h2>Codacy</h2>
We also use Codacy to standardize code quality and alert us to vulnerabilities. Our process runs on a repeated basis, providing immediate feedback. As a day-to-day workflow, we use Codacy to immediately and automatically test for errors each time a developer creates a pull request. When it triggers an error warning, the engineer who created the PR gets immediate feedback and can work on their own time to resolve the issue. They can also collaborate with the rest of the team directly in GitHub or Codacy’s integrated web app.

In addition to immediate code review, we’re using <a href="https://blog.codacy.com/discover-and-predict-your-code-quality-trends/">historical feedback</a> to find code that needs refactoring. With an overview of past reviews, we look at patterns or warnings and failed tests that show places where code can be improved. We’re also able to get a bird’s-eye view of how code has evolved and the quality over time. This can prevent long-term issues.

Lastly, we use this static analysis tool for security checks. Having the right security checks in place with immediate alerts each time developers merge a branch makes it much easier to quickly correct code while keeping the team informed about security and privacy bugs.
<h2>Coverity</h2>
Coverity is the third component in our overall test suite. We run a nightly batch and run Coverity on every major feature release. We use this static analysis for insights that might have not been flagged earlier in the process. Coverity integrates well into our CI/CD pipeline as a last step of automated testing and helps us find code defects and threats early in the development process.

<img class="alignnone size-full wp-image-16733" src="/img/wp-archive/uploads/2020/04/Seconday-TheFuture.png" alt="" width="600" height="600" />
<h2>The future of Netdata and static analysis</h2>
We use static analysis to anticipate bugs and security holes that would affect our product and consequently affect users. Our current process has played a pivotal role in developing our product faster to continue helping users build extraordinary infrastructures.

As Netdata continues to grow and deploy more complex code daily, our static analysis methods will too. We aim to maintain trust with the community by continually finding methods to improve code quality, and, most importantly, prevent all vulnerabilities. As the maintainers of an open-source project with hundreds of contributors and hundreds of thousands of users, Netdata is committed to enforcing code quality as more than a best practice—it’s part of our responsibility to provide a valuable and secure tool to our incredible community.
