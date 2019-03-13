---
layout: blog
title: testing rails app
date: 2019-03-07 20:01 +0300
categories: developer
published: false
author: 
blog-image: 
intro: Software applications and products have a number of variations in terms of features they support as well as processes they implement. Application Testing ensures that a particular program or application functions properly. That is why during app development you may find yourself firing up your app to test its features(exploratory testing).As developers our work is to write code that works, we are considered failures if we write code that doesn't.
---
![Cover Image](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}

# prerequisites

A basic understanding of Ruby and Rails.
[Why ruby rails](_posts/2018-10-17-why-ruby-on-rails.md).
[](_posts/2019-02-14-rails-on-docker.md)

{{page.intro}}

This, in essence, goes to show that testing is a crucial part of any software development process. While there is a lot of dogmatism around the recommended testing methodologies(TDD, BDD), I believe tests are all about confidence and as a rule of thumb, the test methodology of choice should give you the most amount of confidence with the least effort. Confidence in your software's ability to deliver as per expectation.

It is okay to fire up your application to test a new feature once you are done writing code for it. It, however,gets cumbersome and undependable when dealing with bigger applications. The main reason being a regression. A return to a less developed state when new feature breaks old functionality. A common and highly recommended solution is **Automated tests**. Writing programs to test programs. This might sound redundant at first but here's a list of reasons why it's important;

1. It saves on time.
2. Builds confidence.
3. Documentation for the code.

## RAILS

At Zegetech Ruby on Rails is our stack of choice. We will, therefore, go through testing a Rails Application.
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
6. Controllers(Don't test private methods)


Testing support was woven into the Rails fabric from the beginning. A test directory along with the respective files are created by default during app generation.

![test directory](/assets/images/blog/testing-rails/test-directory.png){:class="img-responsive center"}

The helpers, mailers, and models directories are meant to hold tests for view helpers, mailers, and models, respectively. The controller's directory is meant to hold tests for controllers, routes, and views. The integration directory is meant to hold tests for interactions between controllers.

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
For good tests, you'll need to give some thought to setting up test data. Data that can be loaded and re-used throughout the tests.

 1. [Fixtures](https://api.rubyonrails.org/v5.2.2/classes/ActiveRecord/FixtureSet.html). Rails default.
 2. [Factory-bot](https://github.com/thoughtbot/factory_bot). Flexible
 3. [fabrication](https://github.com/paulelliott/fabrication) not as popular as the two above.

4. Extras.
   1. [Guard](https://github.com/guard/guard). Automates various tasks by running custom rules whenever file or directories are modified.
   2. [Faker](https://github.com/stympy/faker). Generates real-looking test data, and populates the test database with more than one or two records during development.
   3. [Rubocop](https://github.com/rubocop-hq/rubocop). A linting tool.
   
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

## HOW

This part of this post assumes that you have a working knowledge of rails and in a docker environment.
If you don't, head over to [Developing Rails on Docker](https://zegetech.com/blog/2019/02/14/rails-on-docker.html)before proceeding with the rest of the post.

We will go through a simple testing environment example we will use `minitest`, as a test framework, `Factory-bot` for test data schema, `Faker`, to generate test-data, `rubocop` because we are all about clean readable code and finally `guard` for both debugging and running tests automatically.

If you followed our [tutorial](https://zegetech.com/blog/2019/02/14/rails-on-docker.html)
, you should have an app in place.  
What we want to do next is generate a scaffold. In your terminal run:  
    `docker-compose exec app bundle exec rails g scaffold recipe name:string ingredients:text method:text`

Run migrations:  
    `docker-compose exec app bundle exec rails db:migrate`

Rails default test framework is minitest so it is, setup.  
Next, we will setup factory_bot. [**factory_bot_rails**](https://github.com/thoughtbot/factory_bot_rails) provides Rails integration for factory_bot.  
To your gemfile's test and development group add `factory_bot_rails` like so:
```ruby
  group :development, :test do
    # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    gem 'factory_bot_rails'
 end
```
By default, factory_bot_rails will automatically load factories defined in the following locations, relative to the root of the Rails project:

    factories.rb
    test/factories.rb
    spec/factories.rb
    factories/*.rb
    test/factories/*.rb
    spec/factories/*.rb

create a factories directory
```bash
$ mkdir test/factories
```
```bash
$ touch factories/recipe.rb
```
Define factories
```ruby
    FactoryBot.define do
      factory :recipe do
        name { 'Tea'}
        ingredients {'water, tea_leaves, sugar, milk'}
        method { 'Mix and serve hot'}
      end
    end
```
how the facories will be used.
```ruby
    # Returns a Recipe instance that's not saved
    recipe = build(:recipe)

    # Returns a saved Recipe instance
    recipe = create(:recipe)

    # Returns a hash of attributes that can be used to build a Recipe instance
    attrs = attributes_for(:recipe)

    # Returns an object with all defined attributes stubbed out
    stub = build_stubbed(:recipe)
```

configure factory bot
Edit the the `test/test_helper.rb` :
```ruby
    ENV['RAILS_ENV'] ||= 'test'
    require_relative '../config/environment'
    require 'rails/test_help'

    class ActiveSupport::TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    include FactoryBot::Syntax::Methods

     # Add more helper methods to be used by all tests here...
    end
```
Next, we will setup `faker`. Edit the gemfile's test and development group by adding faker.
```ruby
    #Gemfile
    group :development, :test do
    # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    gem 'factory_bot_rails'
    gem 'faker
    end
```

Next guard
Add Guard to a Gemfile:
```ruby
  #Gemfile
  group :development, :test do
    # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    gem 'factory_bot_rails'
    gem 'faker'
    gem 'guard'
    gem 'guard-minitest'
  end
```
Next we add rubocop
```ruby
  group :development, :test do
    # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    gem 'factory_bot_rails'
    gem 'faker'
    gem 'guard'
    gem 'guard-minitest'
    gem 'gem rubocop-rails_config'
 end
```
 Now before we fully setup guard and rubocop we will need to install the gems. We will now Re-build app
 ```bash
    docker-compose down #if the app was still running
 ```
 ```bash
    docker-compose build app
 ```
 After successful build all we will need to do now is generate an empty guardfile.
 ```bash
    docker-compose exec app bundle exec guard init minitest
 ```
A `Guardfile` will be generated in the root of your directory. We will now edit the generated guardfile to watch our directories. Comment all the uncommented lines then comment out the Rails4 section. The final guardfile:
```ruby
    guard :minitest do
   #commented code 
  # Rails 4
  watch(%r{^app/(.+)\.rb$})                               { |m| "test/#{m[1]}_test.rb" }
  watch(%r{^app/controllers/application_controller\.rb$}) { 'test/controllers' }
  watch(%r{^app/controllers/(.+)_controller\.rb$})        { |m| "test/integration/#{m[1]}_test.rb" }
  watch(%r{^app/views/(.+)_mailer/.+})                    { |m| "test/mailers/#{m[1]}_mailer_test.rb" }
  watch(%r{^lib/(.+)\.rb$})                               { |m| "test/lib/#{m[1]}_test.rb" }
  watch(%r{^test/.+_test\.rb$})
  watch(%r{^test/test_helper\.rb$}) { 'test' }
  #commented code 
end
```

fire it up
```bash
     docker-compose exec app bundle exec guard #while container is running
```
>Hello failing tests :(

Rubocop:  
Generate file 
```bash
    docker-compose exec app rails generate rubocop_rails_config:install
```
Fire it up
```bash
    docker-compose exec app rubocop
```
>23 files inspected, 80 offenses detected

Auto-correct offenses?
```bash
    docker-compose exec app rubocop -a
```
>23 files inspected, 80 offenses detected, 80 offenses corrected

Look out for the next part of this post where we get down to writing tests.




