---
layout: blog
title: rails-app-testing
date: 2019-03-15 13:51 +0300
categories: Developer, Testing
published: true
author: Melvin Atieno
blog-image: testing/tests.jpg 
intro: One of arguably the greatest ideas in the computer industry is Artificial Intelligence. Simply put, have computers write their own programs. No, we have not figured that out yet. Computers are perfect and until we get them to write their own perfect programs the world is stuck with us, the not so perfect humans, programmers. Computers do exactly what they are told, which isn't always what the programmer expects/intended for it to do. To determine this relatively annoying difference between current state and the desired state of programs and keep it at a minimum we write tests. Tests are an assurance that programs or applications function as expected. In this blog we will go through writing tests for a standard rails application. 
---
![Testing Rails](/assets/images/blog/{{page.blog-image}}){:.img-responsive}

prerequisites;

- [Why ruby rails](/2018-10-17-why-ruby-on-rails.md).
- [rails on docker](/2019-02-14-rails-on-docker.md)

{{page.intro}}

Rails is a Model-View-Contoller framework providing default structures for a database(Model layer), a web service(Controller layer), and web pages(View layer). We will look writing tests for the different layers, covering **the what**, **the why**, **the how** and **the where**.

# Models  

**What?**
1. Association.
2. Inheritance.
3. Database persistence.
4. Database Operations
5. Models data 

**Why?**

**How?**  
Where the tests go?

# Controller  
**What?**
1. http methods.
2. Authentication and authorization(session).
3. request and response payload/data.

**Why?**  

**How?**

# Views  

**What?**
1. Rendered pages for requests and responses.
2. Displayed content.
3. Routing(redirected to right page)

**How?**
Currently, Rails encourages testing views via integration or system tests. 


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