---
layout: blog
title: rails-app-testing
date: 2019-03-15 13:51 +0300
categories: Developer, Testing
published: true
author: Melvin Atieno
blog-image: testing/tests.jpg 
intro: One of arguably the greatest ideas in the computer industry is Artificial Intelligence. The basic idea is to have computers write their own programs. No, we have not there yet. Computers are perfect and until we get them to write their own perfect programs the world is stuck with us, the not so perfect humans, programmers. Computers do exactly what they are told, which isn't always what the programmer expects/intended for it to do. To determine this relatively annoying difference between current state and the desired stateof programs and keep it at a minimum we write tests. Tests are an assurance that programs or applications function as expected. In this blog we will go through writing tests for a standard rails application. 
---
![Testing Rails](/assets/images/blog/{{page.blog-image}}){:.img-responsive}

prerequisites;

- [Why ruby rails](/2018-10-17-why-ruby-on-rails.md).
- [rails on docker](/2019-02-14-rails-on-docker.md)

{{page.intro}}

Rails is a Model-View-Contoller framework providing default structures for a database(Model layer), a web service(Controller layer), and web pages(View layer). We will look into writing tests for the different layers, covering **the what**, **the why**, **the how** and **the where**.

# Models   

Rails models are Ruby classes that interact with the database. It is in the models where;
 1. Incoming data is validated.
 2. Business logic is performed on the data.
 3. The data  organized and stored in the database.

**What to test?**  
1. Data validity.
Make sure that the data reaching the models is valid before perfoming business logic on the data. Here's an example of tests on the User object that makes sure that only valid data is used/manipulated and eventually saved.
```ruby
class UserTest < ActiveSupport::TestCase
  test 'valid user' do
    user = User.new(name: 'John', email: 'john@example.com')
    assert user.valid?
  end

  test 'invalid without name' do
    user = User.new(email: 'john@example.com')
    refute user.valid?, 'user is valid without a name'
    assert_not_nil user.errors[:name], 'no validation error for name present'
  end

  test 'invalid without email' do
    user = User.new(name: 'John')
    refute user.valid?
    assert_not_nil user.errors[:email]
  end
end
```
2. Database persistence.
Test that data is actually persisted in the database by your methods and the database is updated on cue.
3. Database Operations 
4. Business logic
Write tests that confi

**What not to test**  

Unless you don't trust rails or believe there is a bug in it's source code, it is unnecessary to test rails built-in methods and their implementation. Simply put, do not test implementation instead, consider testing the behaviour of the objects after implementation. 

1. Associations.
**unnecessary**
```ruby
# test/models/user_test.rb
  test '#post associations' do
    should belong_to :user
  end
end
```
**right**
```ruby
# test/models/user_test.rb
test '#posts' do
  assert_equal 2, @user.posts.size
end
```
2. Inheritance.

3. Database columns, rows or indexes
There is no point in testing whether indexes, that support functionality that is already being tested, exists e.g primary keys, foreign keys, unique constraints, etc.
**unnecessary**
```ruby
  describe '#up' do
    before { migration.up; User.reset_column_information }

    it 'adds the email_at_utc_hour column' do
      User.columns_hash.should have_key('email_at_utc_hour')
    end
  end
```

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