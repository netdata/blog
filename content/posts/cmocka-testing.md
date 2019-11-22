---
title: "something something CMocka something"
summary: "yes, we need one of these"
date: The fabulous future
author: "Joel Hans"
cover: "an-image.png"
tags: ["How Netdata works"]
categories: []
draft: true
---

We are becoming very serious about adopting unit testing in our work.
Working as an agile team our goal is to respond quickly to our users and introduce the features they want into Netdata. Working directly with our community is the best way to improve the usability of our product. We face the same the dilemma as all agile teams: how do we do this safely?

Safety means that we can move quickly without compromising the quality of our code. We cannot make the code any simpler than the problems that we solve, and some parts of monitoring are hard. We need to be able to trust that some of our more complex code is free from bugs: both the simple implementation bugs where it does the right thing in the wrong way and the more complex specification bugs where it does the wrong thing.

Testing acts a safety harness for the team: we can detect where changes will affect the product and the way that it works for our users. The design contract in the code becomes visible to us so that we can maintain it, and our debugging work becomes faster and more accurate.

The Netdata agent's core is written in C, which is not a usual target for Test-Driven Development (TDD). To be able to unit test key functionalities of the Netdata daemon, we needed to use mocking, which requires a complete framework.

There are a lot of testing frameworks out there, but we narrowed it down to three main candidates: Google Test, CMocka and Unity. A more detailed evaluation gave us the following comparison table.

|  [Google Test](https://github.com/google/googletest)| [CMocka](https://cmocka.org/) | [Unity](http://www.throwtheswitch.org) |
| ---- | --- | ---- |
|![1](https://user-images.githubusercontent.com/43294513/69387373-7bc0d580-0c7a-11ea-9409-a0a97f5a1236.png)|![2](https://user-images.githubusercontent.com/43294513/69387376-7d8a9900-0c7a-11ea-96c5-2552acf35b52.png)|![3](https://user-images.githubusercontent.com/43294513/69387380-7ebbc600-0c7a-11ea-92f0-1e83783ffdbd.png)|

We decided to use CMocka, because it was the best fit to our pure C code-base, its simplicity and its lack of external dependencies.

Choosing an initial target for unit testing was easy.
We started with Netdata's web API, because the interface that we supply to the network is the entry-point to our functionality. Everything that Netdata does is designed to be integrated with other tools to allow IT departments to leverage it fully. As such it has become one of the most critical points in the application and the testing that we can perform on it gives us the best return on our effort.

The first step was to [fuzz-test the current API](https://github.com/netdata/netdata/issues/7163). We needed a fuzzing tool that can be called from the command-line that generates URLs / expected responses from our latest swagger definition. We identified a python fuzzer that could work with our swagger definition. We modified the fuzzer, to make the generated URLs more relevant to our API.

We then analysed what happens in the current code when we fuzz the API, and compared it to a Netdata streaming configuration, to check for any relevant differences. [We did the following](https://github.com/netdata/netdata/issues/7229):
- Setup a test configuration with multiple nodes streaming to a common master.
- Fuzzed the API and extract the headers from our URL processing function
- Used the streaming configuration and extracted the headers for STREAM requests from the same function.
- Connected with different browsers and checked for relevant differences in the headers.
- Verified that the set of URLs that we see in the headers for processing is covered by the set we are fuzzing.
- Wrote PoC unit-test for the http header request processing.

So, we verified that we can mock enough of the pieces of Netdata to perform testing inside our HTTP header processing code, at a very low-level. It was then time to [complete the CMocka unit-testing for request processing](https://github.com/netdata/netdata/issues/7229):
- Extended the testdriver to generate partial requests.
- Verified that the processing handles partial reception of requests correctly.
- Ensured that the information required for further processing is correctly extracted: `url`, `method`, `cookie1`, `cookie2`, `origin` and `user_agent`.
- Checked compliance with RFC2616 and RFC7230 (including the notes on implementation).
- Checked correct decoding of escaped characters within URLs.
- Took a dataset of exploit URLs with weird escaping and null-behaviour and put the generic patterns that cover them into the unit-tests.
- Ensured correct decoding of the URL w.r.t. to path components, and that the mocked dispatch point for the API is called correctly.



The testing process was extended by introducing a layer of parametric testing on-top of the CMocka test runner. The parametric testing walks through a space of parameter values and dynamically generates test definitions for each point. A CMocka testing group was built that repeatedly calls the same testing procedure, feeding the test definitions to the procedure as a shared state.
Our `web_api_testdriver` runs a large set of parameterized tests to check the overall
processing of the HTTP request and the extraction of headers. The parameters control
the headers in the request, the placement of \r characters and the reception of
partial prefixes of the message into the re-entrant code.

The `valid_urls_testdriver` runs a small manual set of cases to check the URL parsing, once the URL has been identified and extracted from the request. The interactions
between decoding of characters in the URL and splitting the URL into its component parts
are verified within the test suite.

Currently the tests can be executed manually with make check, after work to refine the
behavior of the web server we may execute the test suites automatically.

## Using and extending CMocka
The largest difficulty in testing is making sure that we test the right thing: the relevant piece of code, running in a context that is as close as possible to how it runs in the real system. Because we are working in C this context is really the state of memory inside the application, and we must be confident that we are recreating it. In the real application the procedures that we are testing are integrated into the system: they call other procedures that are not part of the test. We need to way to cut out the piece of the application being tested, isolate it from the rest of the application and wrap it up inside a reproducible test.

This is the main strength of CMocka, and using it lets us build on the huge amount of work that has already gone into making it do this. The library provides us with a facility called "mocking" - substituting pieces of the real application with pretend versions. These "mocks" allow us to capture the data at precise points within the application and define the boundaries of the test. We can inject data directly into calls inside the application and use the mocks to capture the results before they propagate into the rest of the application.

The only additional facility that we need is control over memory - to make each test reproducible we must ensure that no state accidentally propagates out of out test and into another. CMocka can checkpoint the state of memory in between tests and give us rigid guarantees that a test passes because of what we did inside the test - not because an earlier test accidentally set us up to give the right result.

Although CMocka is a powerful base for us to build testing upon, it lacks a feature that is critical to the tests that we want to build. In typical unit-testing each piece of functionality inside the system being tested needs a separate piece code to test it. If we want to test 10 pieces of functionality then we must write 10 tests. If we want to test 1000s of separate cases then it could so long to develop the tests that we lose the advantages in speed and agility that we want to achieve.

There is a solution to this problem: parametric unit-tests, but these are not supported by CMocka. Parametric testing allows us to write a single test, but in such a way that its exact behavior is controlled by the parameters that we feed into it: test_something(3, "blue", SecondTechnique). Then by altering the parameters we can test the system with different values, access the "red" functionality and control other aspects of the tested code. In our particular case this means that we can setup testing on 1000s of variations of low-level HTTP messages without needing to spend months writing individual test cases.

**Final paragraph saying how awesome we are and why we recommend CMocka for cases when bla-bla-bla**
To achieve parametric testing inside CMocka (and keep all the advantages of the library) we have written a new layer that takes a single parametric test and walks through the thousands of possible combinations of testing parameters to build unit tests dynamically and feed them into the CMocka testing library - this result lets us build the robust and comprehensive testing that we want on top of industry-standard high quality external libraries. This demonstrates the real strength of open-source development: building on the work of others and sharing what we achieve so that others can continue to build on our results.
