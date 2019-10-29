---
layout: blog
title: rails-app-testing
date: 2019-03-15 13:51 +0300
categories: Developer, Testing
published: true
author: Melvin Atieno
blog-image: testing/tests.jpg 
intro: The basic idea behind Artificial Intelligence, is to have computers write their programs. No, we are not there yet. Computers are perfect and until we get them to write their perfect programs the world is stuck with us, the not so perfect humans, writing programs. Computers do exactly what they are told, which isn't always what the programmer expects/intended for it to do. To determine this relatively annoying difference between the current state and the desired state of programs and keep it at a minimum we write tests. Tests are an assurance that programs or applications function as expected. In this blog, we will go through writing tests for a standard rails application. 
---
![Testing Rails](/assets/images/blog/{{page.blog-image}}){:.img-responsive}

{{page.intro}}

Rails is a Model-View-Controller framework providing default structures for a database(Model layer), a web service(Controller layer), and web pages(View layer). We will look into writing tests for the different layers, covering **the what**, **the how** and **the where**.

# Models 

Rails models are Ruby classes that interact with the database. It is in the models where;
 1. Incoming data is validated.
 2. Business logic is performed on the data.
 3. The data is organized and stored in the database.

## What to test? 
**1. Data validity.**

Make sure that incoming data is valid before performing business logic on it. Here's an example of tests on the User object that makes sure that only valid data is used/manipulated and eventually saved.
```ruby
class UserTest < ActiveSupport::TestCase
 test 'valid-user' do
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

**2. Database persistence and operations**

Test that custom methods work on the database as intended/expected.
```ruby
require 'test_helper'

class UserTest < ActiveSupport::TestCase
 test 'should create user with valid details' do
 assert_difference('User.count') do
 create(:user)
 end
 end

 test 'should delete user' do
 assert_difference('User.count') do
 delete(:user)
 end
 end
end
```
**3. Business logic**

Test whether logic applied to data objects returns expected results.

```ruby
 test 'deposit' do
  agent = create(:agency)
  user = create(:user)
  deposit_amount = 1_000
  assert_difference 'user.reload.account.balance', deposit_amount do
    assert_difference 'agent.account.balance', -deposit_amount do
      agent.deposit(amount: deposit_amount, phone: user.phone_number)
    end
    end
 end

 test 'withdraw' do
  agent = create(:agency)
  user = create(:loaded_user, balance: 1_000)
  withdraw_amount = 1_000
  assert_difference 'user.account.balance', -withdraw_amount do
    assert_difference 'agent.account.balance', withdraw_amount do
      user.withdraw(amount: withdraw_amount, agent_number: agent.id)
      agent.reload
    end
  end
 end
```

```ruby
class UserTest < ActiveSupport::TestCase
 test 'valid user' do
  user = User.new(name: 'John', email: 'john@example.com')
  user.give_nickname
  assert_equal user.nickname ,'joh'
  assert user.valid?
 end
end
```


## What not to test

Unless you don't trust rails or believe there is a bug in the source code, it is unnecessary to test rails built-in methods and their implementation. Instead, consider testing the behaviour of the objects after implementation.

1. Associations and Inheritance

**unnecessary**

```ruby
# test/models/user_test.rb
 test '#post associations' do
  should belong_to :user
 end
end
```
**necessary**

```ruby
# test/models/user_test.rb
test '#posts' do
 @user.create(:post)
 assert_equal 2, @user.posts.size
end
```

```ruby
 test 'account is created on user creation' do
  assert_difference('Account.count', 1) do
    @user = create(:user)
  end
 end
```


3. Database columns, rows or indexes.

There is no point in testing whether indexes that support functionality that is already being tested exist e.g primary keys, foreign keys, unique constraints, etc.

**unnecessary**

```ruby
 describe '#up' do
  before { migration.up; User.reset_column_information }

  it 'adds the email_at_utc_hour column' do
    User.columns_hash.should have_key('email_at_utc_hour')
  end
 end
```

### Where the tests go?

Rails model tests are live in the `test/models directory/`. Rails provides a generator to create a model test skeleton for you.
```shell
$ rails generate test_unit:model article title:string body:text
create test/models/article_test.rb
create test/fixtures/articles.yml
```

# Controller
The controller is the `C` in `MVC`. The controller is responsible for making sense of the request and producing the appropriate output.
The controllers basically:

1. Receive the requests.
2. Fetch or save data from a model

## What to test?

I find it useful to write tests for the small bits of your code working up towards tests for the whole system and how they interact. This makes it easier to debug. I recommend writing isolated functional tests for controllers then proceeding to controller integration tests. This recommendation is, for the thorough and works well for large projects. In other cases, however, having both the integration and isolated controller tests may seem redundant. Depending on the kind of application you are creating you can choose to have one. For API only applications, I recommend having the isolated controller tests and for full-stack applications, I recommend having integration tests.
tests should include tests for;
1. The controller actions
2. Authentication and authorization(session).
3. request and response payload/pages.


## How?

### isolated test 
These tests are resource and action-based. Do you have an Articles resource? write tests for the controller actions for that resource. Example;

```ruby
# articles_controller_test.rb
class ArticlesControllerTest < ActionDispatch::IntegrationTest
 test "should get index" do
  get articles_url
  assert_response :success
 end
end
```

**where** 
Controller tests are located in the `test/controllers/` directory. They are automatically generated by `rails generate` command.

```shell
$ rails generate scaffold_controller article title:string body:text
 create app/controllers/articles_controller.rb
 ...
 invoke test_unit
 create test/controllers/articles_controller_test.rb
 ...
```

### integration test 
Integration tests are more 'result-oriented'. The HTTP methods/controller actions are not the points of focus, instead, the main concern is whether a behaviour generates a specific result. In the example below, you'll notice that the test is for the ability to create an article and not, like the above example where the test is for the controller's get.

```ruby
test "can create an article" do
 get "/articles/new"
 assert_response :success
 
 post "/articles",
 params: { article: { title: "can create", body: "article successfully." } }
 assert_response :redirect
 follow_redirect!
 assert_response :success
 assert_select "p", "Title:\n can create"
end
```
**where?** 
Intergration tests live in the `test/integration/` directory. They are automatically generated by the `rails generate` command.
```shell
 $ rails generate integration_test blog_flow
 invoke test_unit
 create test/integration/blog_flow_test.rb
```

# Views 

**What?**
1. Rendered pages for requests and responses.
2. Displayed content.
3. Routing(redirected to the right page)

**How?**
Currently, Rails encourages testing views via integration or system tests.

```ruby
test "creating an article" do
 visit articles_path
 
 click_on "New Article"
 
 fill_in "Title", with: "Creating an Article"
 fill_in "Body", with: "Created this article successfully!"
 
 click_on "Create Article"
 
 assert_text "Creating an Article"
end
```





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