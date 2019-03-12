---
layout: blog
title: testing rails app
date: 2019-03-07 20:01 +0300
categories: 
published: false
author: 
blog-image: 
intro: Software applications and products have a number of variations in terms of features they support as well as processes they implement. Application Testing ensures that a particular program or application functions properly. That is why during app development you may find yourself firing up your app to test it's features(exploratory testing). This in essence goes to show that testing is a crucial part in any software development process. While there is alot of dogmatism around the recommended testing methodologies(TDD, BDD), I believe tests are all about confidence and as a rule of thumb the test methodology of choice should give you the most amount of confidence with the least effort. Confidence in your software's ability to deliver as per expectation. Because as developers we are faliures if we write code that doesn't work.
---


# prerequisites

A basic understanding of Ruby and Rails.
[Why ruby rails](_posts/2018-10-17-why-ruby-on-rails.md).

{{page.intro}}


It is okay to fire up your application to test a new feature once you are done writing code for it. It however, gets cumbersome and undependable when dealing bigger applications. The main reason being regression. A return to a less developed state when new feature breaks old functionality. A common and highly recommended solution is **Automted tests**. Writing programs to test programs. This might sound incredioulous but here's a list of reasons why it's done;

1. Time saving
2. Confidence.
3. Documentation for code.

## RAILS

Here at zegetech Ruby on Rails is our stack of choice. We will therefore go through testing a rails Application.
While writing tests it is important to have the following questions in mind;

1. Are you testing the right things?
2. Are you adding unnecessary tests while leaving important parts of your code untested?
3. Are you keeping your test code clean?


To answer these  questions we need to know,

**what to test...**

1. Controllers( only test controller logic).
   1. HTTP status codes
   2. Response body.
   3. Requests
   4. Redirects
   5. Authentications
2. Models.
   1. validations.
   2. Association.
3. System
4. Intergration

**and what not to test....**

1. Internal states.
2. Routes
3. views.
4. Integration(Don't test what you don't own).
5. System.
6. Contollers(Don't test private methods)


Testing support  was woven into the Rails fabric from the beginning. A test directory  along with the respective files are  created by default during app generation.

![test directory](/assets/images/blog/testing-rails/test-directory.png){:class="img-responsive center"}

The helpers, mailers, and models directories are meant to hold tests for view helpers, mailers, and models, respectively. The controllers directory is meant to hold tests for controllers, routes, and views. The integration directory is meant to hold tests for interactions between controllers.

By default, every Rails application has three environments: development, test, and production.
Each environment's configuration can be modified similarly. In this case, we can modify our test environment by changing the options found in config/environments/test.rb.
A dedicated test database allows you to set up and interact with test data in isolation.

## TOOLS

Before diving into testing there are choices you will have to make for your rails application.

1. Test framework
The framework of choice determines the tests formats:

 1. [minitest](https://guides.rubyonrails.org/testing.html#rails-meets-minitest). Rails default testing framework
 2. [rspec](http://rspec.info/)
 3. [Cucumber](https://github.com/cucumber/cucumber-rails)
 4. [Test-unit](https://github.com/test-unit/test-unit-rails)

2. Test data
For good tests, you'll need to give some thought to setting up test data. Data that can be loaded and re-used through out the tests.

 1. [Fixtures](https://api.rubyonrails.org/v5.2.2/classes/ActiveRecord/FixtureSet.html). Rails default.
 2. [Factory-bot](https://github.com/thoughtbot/factory_bot). Flexible
 3. [fabrication](https://github.com/paulelliott/fabrication) not as popular as the two above.

4. Extras.
   1. [Guard](https://github.com/guard/guard). Automates various tasks by running custom rules whenever file or directories are modified.
   2. [Faker](https://github.com/stympy/faker). Generates real-looking test data, and populates the test database  with more than one or two records during development.
   3. [Rubocop](https://github.com/rubocop-hq/rubocop). A linting tool.
   
## Characteristics of an effective Test Suite.

1. Fast.
The faster the tests are, the more often they can be run. Ideally, tests should be ran after every change in the codebase. Tests give feedback on what part on what code to needs to be refactored. Faster tests mean more time to code.
2. Complete.
Tests cover all public code paths in an application. Any ommission in publicly accessible code should result into failing tests.
3. Reliable
Tests should not wrongly fail or pass. If  tests fail intermittently or return false
positives then confidence in your test and relatably code decreases.
4. Isolated
Tests should run in isolation. They should be able to set themselves up, and clean up after themselves.
When working on a portion of code, you don’t want to have to waste time running the entire
suite just to see output from a single test. Tests that don’t clean up after themselves may leave data or global state which can lead to failures in other tests when
run as an entire suite.  
5. Maintainable.
It should be easy to add new tests and/or edit existing tests. If it is difficult the the test suite will not grow as the app grows. The test suites, therefore suite become ineffective.

6. Expressive.
Tests are a powerful form of documentation  and should always be up to
date. They should be easy enough to read and understand.

## HOW.

The app?

Setup. For our example we will use `minitest`, as a test framework, `Factory-bot` for test data schema, `Faker`,to generate test-data, `rubocop` because we are all about clean readable code and finaly guard for both debugging and running tests automatically.

The testing process we will use is `TDD`, it time-saving and will improve flow thus good for this app.




