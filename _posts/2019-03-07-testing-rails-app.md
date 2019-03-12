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

### prerequisites
A basic understanding of Ruby and Rails.
[Why ruby rails](_posts/2018-10-17-why-ruby-on-rails.md).

It is okay to fire up your application to test a new feature once you are done writing code for it. It however, gets cumbersome and undependable when dealing bigger applications. The main reason being regression. A return to a less developed state when new feature breaks old functionality. A common and highly recommended solution is **Automted tests**. Writing programs to test programs.

### WHY WRITE AUTOMATED TESTS

1. Time saving
2. Confidence.
3. Documentation for code.

### RAILS TEST

Here at zegetech Ruby on Rails is our stack of choice. We will therefore go through testing a rails Application.
While writing tests it is important to have the following questions in mind;

1. Are you testing the right things?
2. Are you adding unnecessary tests while leaving important parts of your code untested?
3. Are you keeping your test code clean?

Testing support  was woven into the Rails fabric from the beginning. A test directory  along with the respective files are  created by default during app generation.

![test directory](/assets/images/blog/testing-rails/test-directory.png){:class="img-responsive center"}

The helpers, mailers, and models directories are meant to hold tests for view helpers, mailers, and models, respectively. The controllers directory is meant to hold tests for controllers, routes, and views. The integration directory is meant to hold tests for interactions between controllers.

### Are we testing the right things?

To answer this question we need to know what to test.
1. Controllers( only test controller logic).
   1. HTTP status codes
   2. Response body.
   3. Requests
   4. Redirects
   5. Authentications
2. Models.
   1. validations.
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





