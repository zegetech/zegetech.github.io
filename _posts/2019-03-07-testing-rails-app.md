---
layout: blog
title: testing rails app
date: 2019-03-07 20:01 +0300
categories: 
published: false
author: 
blog-image: 
intro: Software applications and products have a number of variations in terms of features they support as well as processes they implement. So application Testing ensures that a particular program or application functions properly. That is why during app development you'll probably find yourself firing up your app to test it's features(exploratory testing). This in essence goes to show that testing is a crucial part of any software development process. While there is alot of dogmatism around the recommended testing process(TDD, BDD)  as a rule of thumb I believe tests are all about confidence. Confidence in your software's ability to deliver as per expectation. Because as developers we are faliures if we write code that doesn't work.
---

{{page.intro}}


It is okay to fire up your application to test a new feature once you are done writing code for it. It however, gets cumbersome and undependable when dealing bigger applications. The main reason being regression. A return to a less developed state when new feature breaks old functionality. A common and highly recommended solution is **Automted tests**. Writing programs to test programs.

### Why write automated tests

1. Time saving
2. Confidence.
3. Documentation for code.
What to test(rails specific)?
Can you have too many tests? Better questions to ask are:

Are you testing the right things?
Are you adding unnecessary tests while leaving important parts of your code untested?
Are you keeping your test code clean?

The primary focus of this activity is to verify that the business logic of the application is working as expected.

Testing support  was woven into the Rails fabric from the beginning. A test directory  is created by default during app generation and respective files for newly generated parts  during development.

The helpers, mailers, and models directories are meant to hold tests for view helpers, mailers, and models, respectively. The controllers directory is meant to hold tests for controllers, routes, and views. The integration directory is meant to hold tests for interactions between controllers.

1. Controllers( only test controller logic).
   1. HTTP status codes
   2. Response body.
   3. was the web request successful?
   4. Redirects
   5. Successfull authentication(if any)
2. Models?
3. System
4. Intergration



What not to test(rails)?

1. Internal states.
2. Routes
3. views.
4. Integration(Don't test what you don't own).
5. System.
6. Contollers(Don't test private methods)

How to test(rails)?
By default, every Rails application has three environments: development, test, and production.
Each environment's configuration can be modified similarly. In this case, we can modify our test environment by changing the options found in config/environments/test.rb.
A dedicated test database allows you to set up and interact with test data in isolation.
1. Tools
   1. Guard
   2. Minitest/Rspec
   The default rails testing framework is Minitest, an improvement from the original testing framework for Rails Test::Unit..
   3. Factories/Fixtures
   4. Faker
2. Method
   1. TDD





