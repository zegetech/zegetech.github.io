---
layout: blog
title: Setting Up Rails TDD
date: 2019-03-15 20:01 +0300
categories: developer
published: false
author: Melvin Atieno
blog-image: 
intro: We can all agree that, while the definition of clean code is relative, code readability and debuggability are universal considerations when determining whether code can be in fact considered clean. These factors also apply to tests. We should all strive to write readable tests that make it easy to debug code. The process of writing clean tests, while easy, can be a nerve-racking experience for a number of people. The major factor for these varying experiences is the setup. The foundation on which your tests and ultimately code is built on will determine the experience you will have reading and writing them. This post will take you through a basic yet powerful setup to get you happily writing tests.
---
![Testing](#){:.img-responsive .center}

{{page.intro}}

At Zegetech, rails and docker are an important part of how we make things happen. The resulting setup will, therefore, be for a rails application running on docker.
If you don't have a basic understanding of either rails, docker or ruby, you might want to [check them out](_posts/2019-02-14-rails-on-docker.md)

Testing support was woven into the Rails fabric from the beginning. A test directory along with the respective files are created by default during app generation.

The helpers, mailers, and models directories are meant to hold tests for view helpers, mailers, and models, respectively. The controller's directory is meant to hold tests for controllers, routes, and views. The integration directory is meant to hold tests for interactions between controllers.

By default, every Rails application has three environments: development, test, and production.
Each environment's configuration can be modified similarly. In this case, we can modify our test environment by changing the options found in config/environments/test.rb.
A dedicated test database allows you to set up and interact with test data in isolation.


# CHOICES

Like everything else that matters, tests are all about choices. Here are the important ones you'll need to make;

## Test framework

The framework of choice determines the format of the tests. Here's a list of popular one for rails:

1. [minitest](https://guides.rubyonrails.org/testing.html#rails-meets-minitest). Rails default testing framework
2. [rspec](http://rspec.info/)
3. [Cucumber](https://github.com/cucumber/cucumber-rails)
4. [Test-unit](https://github.com/test-unit/test-unit-rails)
   
## Test data

For good tests, you'll need to give some thought to setting up test data. Test data refers to data that can be loaded and re-used throughout the tests, so there won't be a  need to manually enter data every time you implement unit tests

1. [Fixtures](https://api.rubyonrails.org/v5.2.2/classes/ActiveRecord/FixtureSet.html). Rails default.
2. [Factory-bot](https://github.com/thoughtbot/factory_bot). Flexible
3. [fabrication](https://github.com/paulelliott/fabrication) not as popular as the two above.
4. [Faker](https://github.com/stympy/faker). Generates real-looking test data, and populates the test database with more than one or two records during development.

## Codng Styles

Style is important for in writing quality code. In order to write quality code, it is recommended that the best practices found in [The Ruby Style Guide](https://github.com/rubocop-hq/ruby-style-guide) are followed. Well-written Ruby reads like a natural language, and can be understood even by non-developers. Moreover, well-written code is easy to maintain, modify, and scale. Here are some gems that we recommend to enable the process.
1. [Rubocop](https://github.com/rubocop-hq/rubocop).
2. [rails_best_practices](https://github.com/flyerhzm/rails_best_practices)

## Debugging

Code is bound to have bugs. The process of debugging is made easy with the right tools.

1. [Pry-byebug](https://github.com/deivid-rodriguez/pry-byebug) Extends the functionality of the Pry and Byebug gems. With pry-byebug you’re able to implement step-by-step code debugging by setting breakpoints. Pry-byebug allows you to set console (IRB or Rails console) break points so you can check how a piece of code is executed at a certain point.


## Authentication and Authorization

There are programmers who prefer writing their own authentication and authorization code, but then there are those who prefer to use ready made tools that offer the same functionality.

1. [Devise](https://github.com/plataformatec/devise) A modular gem that offers a wide range of funtions out of the box, from authentication, authorization to password resseting. It flexible and allows developers to only use what they want.
2. [devise-jwt](https://github.com/waiting-for-dev/devise-jwt) A devise extension for token based authentication in rails applications.
3. [Rolify](https://github.com/RolifyCommunity/rolify) A Roles library without any authorization enforcement supporting scope on resource object.

## Security

1. [Brakeman](https://github.com/presidentbeef/brakeman) A static analysis tool which checks Ruby on Rails applications for security vulnerabilities.
2. [Bundler-audit](https://github.com/rubysec/bundler-audit)  A tool that checks for vulnerable versions of gems in Gemfile.lock and insecure gem sources (http://).


## Automation

1. [Guard](https://github.com/guard/guard). Automates various tasks by running custom rules whenever file or directories are modified. It's used to help avoid mundane, repetitive actions and commands such as "relaunching" tools after changing source files or configurations. In the case of TDD, it will automatically run related tests when related files are edited.
   
2. [ Capistrano](https://github.com/capistrano/capistrano) A framework for building automated deployment scripts. Can handle a number of tasks including copying files, migrating databases, and compiling assets. 

# SET UP

For our set up, we will use `minitest`, as the test framework, `Factory-bot` for test data schema, `Faker`, to generate test-data, `rubocop` because we are all about clean readable code,`pry-beybug` to help us debug, both `Brakeman` and `Bundler-audit` for security and finally `guard` to automatically run our tests.


If you went through [rails on docker post](https://zegetech.com/blog/2019/02/14/rails-on-docker.html)
, you should be able to quickly set up a rails app on docker. Meaning you have;

1. Generated a New Rails app.(Named app, if you chose a different name be ure to make the same changes for the commands i.e replacing app* with your app_name*)
2. Connected it to the database.

We will now update the gemfile to contain the gems that will be used for this setup. The gemfile will be as follows;


```ruby
# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.2.2"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
# Use Puma as the app server
gem "puma", "~> 3.11"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby
gem "bundler-audit"
gem "devise"

# Use CoffeeScript for .coffee assets and views
gem "coffee-rails", "~> 4.2"
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"

gem 'pry-byebug'
gem 'pry-rails'


# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "factory_bot_rails"
  gem "faker"
  gem "guard"
  gem "guard-minitest"
  gem "rubocop-rails_config"
end

group :development do
  gem 'brakeman'
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara", ">= 2.15"
  gem "selenium-webdriver"
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem "chromedriver-helper"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```

With the updated gemfile we will need to install the new gems
```bash
$ docker-compose down && docker-compose build
```
Run the application
```
$ docker-compose up -d
```

What we want to do next is generate a scaffold for the application. In your terminal run:  
```bash
$ docker-compose exec app bundle exec rails g scaffold recipe namestring ingredients:text process:text
```
  NB if you come accross the following error FATAL: Listen error: unable to monitor directories for changes.
  Head over [here](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers) for a quick fix.

Run migrations:  
```bash  
$ docker-compose exec app bundle exec rails db:migrate
```

Now lets configure the set gems.

Rails default test framework is minitest so it is, setup.


**1. factory_bot**.   
[**factory_bot_rails**](https://github.com/thoughtbot/factory_bot_rails) provides Rails integration for factory_bot.
You will notice a factory directory in the test directory after generating the scaffolds. This is because we added the `factory_bot_rails` gem in the gemfile. Otherwise we have manually created the directory and added the necessary files. Next we will configure out test suite to include factory_bot methods.

Edit the the `test/test_helper.rb` :
```ruby
#test/test_helper.rb
    ENV['RAILS_ENV'] ||= 'test'
    require_relative '../config/environment'
    require 'rails/test_help'

    class ActiveSupport::TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    include FactoryBot::Syntax::Methods

     # Add more helper methods to be used by all tests here...
    end
```

By default, factory_bot_rails will automatically load factories defined in the following locations, relative to the root of the Rails project:

    factories.rb
    test/factories.rb
    spec/factories.rb
    factories/*.rb
    test/factories/*.rb
    spec/factories/*.rb

More information on how to customize and use the factories can be found in detail [here](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#configure-your-test-suite).


**2. guard**

Generate an empty guard file.

```bash
$ docker-compose exec app bundle exec guard init
```
A `Guardfile` will be generated in the root of your directory. We will now edit the generated guardfile to watch our directories. Comment all the uncommented lines then comment out the Rails 4 section. This is because the directory structure for rails 5 is similar to that of rails 4. The final guardfile:
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
    $ docker-compose exec app bundle exec guard #while the container is running
```


As is the way of TDD, **>Hello failing tests :(** , you will need to write methods to get the tests to pass and so on...
More information on the configuration customization of guard can be found [here](https://github.com/guard/guard)

**3 rubocop**

```bash
$ docker-compose exec app rails generate rubocop_rails_config:install
```

Fire it up
```bash
   $ docker-compose exec app rubocop
```
>23 files inspected, 90 offenses detected!! oh my!!!

Auto-correct offenses?
```bash
   $ docker-compose exec app rubocop -a
```
>23 files inspected, 90 offenses detected, 90 offenses corrected

Because rubocop can be a bit noisy, You can checkout the [official configuration options](https://github.com/rails/rails/blob/master/.rubocop.yml) to quite some things down to your liking.

**4. Brakeman**
As earlier stated brakeman is a tool that checks Ruby on Rails applications for security vulnerabilities. Unlike most web security scanners, brakeman checks for security vulnerabilities in the source code and one needs not have the whole application running before getting results. In line with TDD, one can check for vulnerabilities as they continue to build up their applications.

Running breakman is pretty straight foward.

```bash
$ docker-compose exec app brakeman
```
> And No warnings found. We are safe,,, for now.

**5. pry-byebug**

If you haven't noticed, in our Gemfile `pry-beybug` has been included globaly, this is because pry might prove an asset to debug the application even during production. You will also notice a the gem `pry-rails` right below it. Pry-rails is basically an intitalizer saving us the trouble of having to require pry in every directory we want to use it.

Because we already installed the gems we can now invoke `pry` at any point of our code and see the breakpoints.
And this can be done in the guard console.

Add `binding.pry` in any test method then run guard to see the magic.

**6. bundler-audit**

The final setup can be found on [github](https://github.com/Melvin1Atieno/recipe-testing-rails-example-app/tree/master).  
Look out for the next part of this post where we get down to writing tests and getting them to pass.





