---
layout: blog
title: testing rails app
date: 2019-03-07 20:01 +0300
categories: 
published: false
author: 
blog-image: 
intro: 
---

{{page.intro}}

Why write test your app(general)?
During app development you'll probably find yourself firing up your app to test it's features.(exploratory testing), unplanned testing.

What to test(rails specific)?

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
1. Tools
   1. Guard
   2. Minitest/Rspec
   3. Factories/Fixtures
   4. Faker
2. Method
   1. TDD





