---
layout: blog
title: rails-app-testing
date: 2019-03-15 13:51 +0300
categories: 
published: false
author: 
blog-image: 
intro: Application programs have a number of variations in terms of features they support as well as processes they implement. Application Testing ensures that a particular program or application functions properly. That is why during app development, you may find yourself firing up your app to test its features(exploratory testing).As developers our work is to write code that works, we are considered failures if we write code that doesn't.
---
![Testing Rails](#){:.img-responsive .center}
In order to follow through this post make sure you have gone through;

- [Why ruby rails](/2018-10-17-why-ruby-on-rails.md).
- [rails on docker](/2019-02-14-rails-on-docker.md)

{{page.intro}}


Testing is a crucial part of any software development process. While there is a lot of dogmatism around the recommended testing methodologies(TDD, BDD), I believe tests are all about confidence and as a rule of thumb, the test methodology of choice should give you the most amount of confidence in your code with the least effort and time. Tests should boost your confidence in your software's ability to deliver as per expectation.

It is okay to fire up your application to test a new feature once you are done writing code for it. It, however,gets cumbersome and undependable when dealing with bigger applications. The main reason being regression, a return to a less developed state when new feature breaks old functionality. A common and highly recommended solution is **Automated tests**. Writing programs to test programs. This might sound redundant at first but here's a list of reasons why it's important;

1. It saves on time. 
2. Builds confidence.
3. Documentation for the code.

## TESTING RAILS

While writing tests it is important to have the following questions in mind;

1. Are you testing the right things?
2. Are you adding unnecessary tests while leaving important parts of your code untested?
3. Are you keeping your test code clean?

To answer these  questions we need to know,

**what to test...**

This greatly depends on the kind of application you are building. You cannot, for example ,have tests for views if you creating an API only app. 
It is also important to note that the terms  used to refer to the tests may vary depending on the context in question.

| General  | Minitests | Rspec |
|------------------|-----------|-------|
|Integration tests |Integration tests  | N/A
|------------------|-------------------|
| End to end      | System tests | Feature specs
|-----------------|--------------|-----------------
|controller tests | Functional tests | Request Spec (and, previously, Controller Spec)


1. Intergration
Integration tests are used to test how various parts of your application interact. They are generally used to test important workflows within your application.
2. system tests/End to end tests/ Feature specs
Feature specs are high-level tests meant to exercise slices of functionality
through an application. The flow of an application, whether it is  performing as designed from start to finish. The purpose of carrying out end-to-end tests is to identify system dependencies and to ensure that the right information is passed between various system components and systems.In rails this means that the tests cover the whole MVC stack.
3. Controller tests/Functional
In Rails, testing the various actions of a controller is a form of writing functional tests. Remember your controllers handle the incoming web requests to your application and eventually respond with a rendered view. When writing functional tests, you are testing how your actions handle the requests and the expected result or response. These are generally:
   1. HTTP status codes
   2. Response body.
   3. Requests
   4. Redirects
   5. Authentications
For every controller action
1. . Models.
   1. validations.
   2. Association.
   3. Custom methods


**and what not to test....**

1. **Internal states.** An example for this, in my opinion, would be tests for sessions, cookies setter and getter methods. Tests for these would be equivalent testing rails features. Basically don't test rails features. If, ofcourse, there is own logic or computation involved then tests can be written
2. **Routes:** Tests for routes are included in the integration tests and controller tests. Having tests for routes would be redundant. 
3. **views.** Like routes these, I felt are tested in either controller or integration tests.
4. **Integration(Don't test what you don't own)**.tests should expect third-party dependencies to do their job, but not substitute to their own test suite. An example for this would be having a test to see whether faker actually generates fake data. 
5. **Controllers(Don't test private methods)**Testing private methods directly would be redundant because they are tested through testing public controller actions



## Characteristics of an effective Test Suite.

1. **Fast.**
The faster the tests are, the more often they can be run. Ideally, tests should be run after every change in the codebase. Tests give feedback on what part on what code to needs to be refactored. Faster tests mean more time to code.
2. **Complete.**
Tests cover all public code paths in an application. Any omission in publicly accessible code should result in failing tests.
3. **Reliable.**
Tests should not wrongly fail or pass. If tests fail intermittently or return false
positives then confidence in your test and relatably code decreases.
4. **Isolated.**
Tests should run in isolation. They should be able to set themselves up and clean up after themselves.
When working on a portion of code, you don’t want to have to waste time running the entire
suite just to see the output from a single test. Tests that don’t clean up after themselves may leave data in a global state which can lead to failures in other tests when
running as an entire suite.  
5. **Maintainable.**
It should be easy to add new tests and/or edit existing tests. If it is difficult then the test suite will not grow as the app grows. The test suites, therefore suite become ineffective.

6. **Expressive.**
Tests are a powerful form of documentation and should always be up to
date. They should be easy enough to read and understand.