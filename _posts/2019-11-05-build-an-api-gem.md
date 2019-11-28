---
layout: blog
title: Build an API gem
date: 2019-11-05 17:15 +0300
categories: developer
published: false
author: Gathuku Ndung'u
blog-image: api_gem/ruby_gem.png
intro: Ruby Gem allows us to package our code to use later or share it with other developers. This is very helpful since we don't have to waste time reinventing the wheel. The good thing about gems everyone can make them. Through the entire blog, we will be looking at how to build a gem that consumes an API.
---
![gem_image](/assets/images/blog/api_gem/ruby_gem.png){:.img-responsive .center}

{{page.intro}}

## Prerequisites
1. Setting up a docker container
2. Bootstrapping your gem
3. Implementing functionalities
4. Test &  code coverage(Webmock and VCR)
5. Configurable block
6. Building your gem
7. Publishing your gem
8. CI/CD with Travis


## Setting Docker container
Docker will enable us to easily pack, build and run our gem. Ensure you have [docker]() and [docker-compose]() installed. To start with generating a `Dockerfile` in your working directory. Using the [Docker] file syntax we will build an image to run the gem.

```bash
# Dockerfile
FROM ruby:rc-alpine3.10
# update and upgrade packages
RUN apk update && apk upgrade

# Create non-root user
RUN addgroup -S admin -g 1000 && adduser -S -g '' -u 1000 -G admin deploy

# make a parent directory
RUN mkdir -p /mygem

# let deploy user own the directory
RUN chown deploy /mygem

# set the deploy user
USER deploy
# set the directory as working DIR
WORKDIR /mygem

# install gem bundler
RUN gem install bundler


COPY --chown=deploy:admin . /mygem
```

`FROM ruby:rc-alpine3.10` -  Specificities a [ruby image](https://hub.docker.com/_/ruby?tab=tags) based on alpine Linux, we use alpine Linux because it's light, you could use other distro like ubuntu, Check more on official image.

`RUN apk update && apk upgrade` - update and upgrade the image.

`RUN addgroup -S admin -g 1000 && adduser -S -g '' -u 1000 -G admin deploy` - create a new user `deploy` in-group admin to avoid running the container as root.

`RUN mkdir -p /mygem` - make `mygem` directory with any parent `-p` directory

`RUN chown deploy /mygem` - Our `deploy` user owns the directory

`USER deploy` - Set user `deploy` as the current user

`WORKDIR /mygem` - sets a working directory, any other command after this will run in the directory.

`RUN gem install bundler` - install bundler

`COPY --chown=deploy:admin . /mygem` - copies everything to the working directory

```bash
# docker-compose.yml
version: "3"
services:
  app:
    build: .
    volumes:
      - .:/mygem
```
Create a service app that builds the current directory and mounts volumes.

## Boostrapping gem
We will use our docker-compose service to bootstrap the gem using bundler. Bundler creates all the files needed to start building a gem.
The command below will generate a gem with a specified name
```bash
docker-composer run app bundle gem [name]
```
To generate a gem with the name of our docker working directory use
```bash
docker-composer run app bundle gem .
```
If you are not using docker run.
```bash
bundle gem [name]
```

When generating the gem you will require to choose a testing framework `rspec` or `minitest`, whether you want to use `MIT` license and the default code of conduct

```
Creating gem 'mygem'...
Do you want to generate tests with your gem?
Type 'rspec' or 'minitest' to generate those test files now and in the future. rspec/minitest/(none): minitest
Do you want to license your code permissively under the MIT license?
This means that any other developer or company will be legally allowed to use your code for free as long as they admit you created it. You can read more about the MIT license at https://choosealicense.com/licenses/mit. y/(n): y
MIT License enabled in config
Do you want to include a code of conduct in gems you generate?
Codes of conduct can increase contributions to your project by contributors who prefer collaborative, safe spaces. You can read more about the code of conduct at contributor-covenant.org. Having a code of conduct means agreeing to the responsibility of enforcing it, so be sure that you are prepared to do that. Be sure that your email address is specified as a contact in the generated code of conduct so that people know who to contact in case of a violation. For suggestions about how to enforce codes of conduct, see https://bit.ly/coc-enforcement. y/(n): y
Code of conduct enabled in config
      create  mygem/Gemfile
      create  mygem/lib/mygem.rb
      create  mygem/lib/mygem/version.rb
      create  mygem/mygem.gemspec
      create  mygem/Rakefile
      create  mygem/README.md
      create  mygem/bin/console
      create  mygem/bin/setup
      create  mygem/.gitignore
      create  mygem/.travis.yml
      create  mygem/test/test_helper.rb
      create  mygem/test/mygem_test.rb
      create  mygem/LICENSE.txt
      create  mygem/CODE_OF_CONDUCT.md
Initializing git repo in /path/to/mygem
Gem 'mygem' was successfully created. For more information on making a RubyGem visit https://bundler.io/guides/creating_gem.html

```
Congrats! You now have your gem ready to implement functionalities.

## Implement Functionality
The good thing about ruby gem is we can also use other gem by including them in `mygem.gemspec`. In this section our gem will implement [Daraja 2.0 Mock](https://app.swaggerhub.com/apis-docs/zegetech/mpesaUniAPI/1.0) API. To get along with TDD we will require some other development dependencies.
- [VCR](https://github.com/vcr/vcr) - A gem thats records HTTP interaction and replay them later.
- [Faraday](https://github.com/lostisland/faraday) - A simple and flexible HTTP client gem.
- [JSON](https://rubygems.org/gems/json/versions/1.8.3) - A gem for parsing API JSON responses.

Include all the gems in your `mygem.gemspec`. Check on Rubygems.org for the latest versions.
```
spec.add_development_dependency 'bundler', '~>2.0.0'
spec.add_development_dependency 'rake', '~>10.0'
# runtime dependancies
spec.add_runtime_dependency 'faraday', '~> 0.17.0'
spec.add_runtime_dependency 'json', '~> 2.2'
spec.add_runtime_dependency 'openssl', '~> 2.1'
# testing
spec.add_development_dependency 'minitest', '~> 5.0'
spec.add_development_dependency 'minitest-reporters', '~> 1.4'
spec.add_development_dependency 'vcr', '~> 5.0'
# debugging
spec.add_development_dependency 'byebug', '~> 11.0'
spec.add_development_dependency 'pry-byebug', '~> 3.7'
# code coverage
spec.add_development_dependency 'coveralls', '~> 0.8'
spec.add_development_dependency 'simplecov', '~> 0.16.1'
```

Then build your container  to install the gems and copy files to the container
```
docker build -t mygem . && docker run -it mygem
```


### Payouts `Business Paybill`
The endpoint allows businesses to send money to a business paybill. To implement it in our gem we will need a method `payouts` in `Mygem` class. The method will accept `category`, `amount`, `recipient_no` and `reference`  parameters. The user consuming the gem will need to pass the arguments when making call to this method.
> category will be `BusinessPaybill` , recepient_no a `paybill` number and recepient_type  `shorcode`

```ruby
def self.payouts(category,amount,recipient_no,reference)
  url="https://virtserver.swaggerhub.com/zegetech/mpesaUniAPI/1.0/mpesa/payouts"
  headers={
    "accept"=>"application/vnd.api+json",
    "Content-Type"=>"application/vnd.api+json"
  }
  body={
    data:{
      type:"payouts",
      id:1,
      attributes: {
        category: category,
        amount: amount,
        recipient_no: recipient_no,
        recipient_type: "shorcode",
        posted_at: Time.now,
        recipient_id_type: "national_id",
        recipient_id_number: "12345567",
        reference: reference
      }
    }
  }
  Faraday.post(url,body.to_json,headers)
end
```
### Payouts `Customers`
The endpoint allows businesses to send money to customers. To implement it in our gem we will need a method `payouts` in `Mygem` class. The method will accept `category`, `amount`, `recipient_no` and `reference`  parameters. The user consuming the gem will need to pass the arguments when making call to this method.

> category will be `BusinessPayment` , recpient_type `msisdn` and recipient_no a `valid phone`

```ruby
def self.payouts(category,amount,recipient_no,reference)
  url="https://virtserver.swaggerhub.com/zegetech/mpesaUniAPI/1.0/mpesa/payouts"
  headers={
    "accept"=>"application/vnd.api+json",
    "Content-Type"=>"application/vnd.api+json"
  }
  body={
    data:{
      type:"payouts",
      id:1,
      attributes: {
        category: category,
        amount: amount,
        recipient_no: recipient_no,
        recipient_type: "msisdn",
        posted_at: Time.now,
        recipient_id_type: "national_id",
        recipient_id_number: "12345567",
        reference: reference
      }
    }
  }
  Faraday.post(url,body.to_json,headers)
end
```

## Testing

Now, this can get a little bit complicated since the API response is dynamic. To solve this you we need `VCR` for recording HTTP interactions. To use VCR `require "vcr"` in `test_helper.rb`. Then we need to pass a configuration block for VCR.
```ruby
# Configure VCR
VCR.configure do |config|
  config.allow_http_connections_when_no_cassette = false
  config.cassette_library_dir = File.expand_path('cassettes', __dir__)
  config.hook_into :webmock
  config.ignore_request { ENV['DISABLE_VCR'] }
  config.ignore_localhost = true
  config.default_cassette_options = {
    record: :new_episodes
  }
end
```
From the above config we have defined our cassette directory as `cassettes`. [Read more](https://relishapp.com/vcr/vcr/v/2-0-0-beta1/docs/configuration/hooks) on VCR configuration.

### Testing payouts `to Business Paybill`
```ruby
def  test_payouts

  VCR.use_cassette('payouts') do
    response = Mygem.payouts("BusinessPayBill",1000,"601000","142345678")
    assert_equal(200, response.status)
  end

end
```
From the above test we use cassette `register_urls` to load HTTP interaction recorded. If a the cassette contain data no real connection will be made. This feature makes our test to run very fast.

### Testing payouts `to customer`
```ruby
def  test_payouts

  VCR.use_cassette('payouts') do
    response = Mygem.payouts("BusinessPayment",1000,"25472264885","142345654")
    assert_equal(200, response.status)
  end

end
```

Great!, now we have implemented two methods `register_urls` and `payouts` with their respective tests with VCR.

## Testing data(Fixtures)
For testing data we need to create a `yaml` file to store the data then we can load the data in our code. The code below can be used to load the yaml data.
```ruby
yaml_fixtures = Dir[File.expand_path('fixtures/**/*.y*ml', __dir__)].map do |f|
  erb_yaml = ERB.new(File.read(f))
  YAML.safe_load(erb_yaml.result)
end.inject(:merge)

FIXTURES = yaml_fixtures.freeze
```
The above code reads all the `yaml` files in `fixtures` directory. Adds support for ERB syntax. Then assigns results to `Fixtures` hash.

Example if you have in the `yaml` file.
```yml
body:
  data:
    attributes:
      amount: 100
      category: BusinessPayment
      posted_at: "2019-03-18T17:22:09.651011Z"
      recipient_id_number: "21212121"
      recipient_id_type: national_id
      recipient_no: "0722000024"
      recipient_type: msisdn
      reference: "12345678"
    id: <%= SecureRandom.uuid %>
    type: payouts
```
You can be able feature body with `FIXTURES[:body]`.

##  Configurable Block
In the examples above we have used VCR configure block inside our `test_helper.rb`. Having a configure block help in passing variables used by a gem. The example below demostrate how you can implement it.
```ruby
require "mygem/version"
require 'net/http'
require 'uri'
require "json"
require "faraday"

module Mygem

  class Error < StandardError; end
  # Your code goes here...
  class << self
  attr_accessor :configuration
    def configure
    self.configuration ||= Configuration.new
    yield(configuration)
    end

  def reset
    self.configuration = Configuration.new
  end

  end

end

class Configuration
  attr_accessor :confirmation_url, :validation_url, :short_code

  def initialize
    @confirmation_url = "https://example.com/confirmation"
    @validation_url = "https://example.com/validation"
    @short_code = "600234"
  end
end

```
We have implemented a class `Configuration` which holds our configurable variables with read and write access ie `attr_accessor :access_token`. In our `Mygem` module, we create a `configuration` which stores an instance of `Configuration` class. Now you can assign `variables` with the below example.

```ruby
Mygem.configure do |config|
   config.confirmation_url="https://example.com/validation"
   config.confirmation_url="https://example.com/confirmation"
   config.short_code = "600234"
end
```
> The block can be added in `test_helper.rb` to load data for testing.

To retrieve the assigned variable.
```ruby
Mygem.configuration.short_code
```
Example

```ruby
2.6.3 :001 > require 'mygem'
 => true
2.6.3 :002 > Mygem.configure { |config| config.short_code="600234"}
 => "600234"
2.6.3 :003 > Mygem.configuration.short_code
 => "600234"
2.6.3 :004 >
```

## Building the Gem
To build the gem update gemspec in `mygem.gemspec` then we can build a gem out of it with the below command.
```
 gem build mygem.gemspec
```
Then install the built gem with below command
```
gem install mygem-0.1.0.gem

```
You can head to `irb` to test the gem
```
 irb
```
In `irb` require the gem ie `require "mygem"` then call `Mygem.register_urls` method which accept `response_type`, `Completed` or `Cancelled` parameter.

```bash
2.6.3 :006 > require 'mygem'
 => false
2.6.3 :007 > JSON.parse(Mygem.register_urls("Completed").body)
 => {"meta"=>{"code"=>"0", "description"=>"success"}}
2.6.3 :008 >

```

Congratulations!, you now have a working gem. What left is to publish it in [rubygems.org](https://rubygems.org/)

## Publishing Gem
Now you can share `mygem` with the rest of the Ruby community. Publishing your gem out to [RubyGems.org](https://rubygems.org/) only takes one command, provided that you have an account on the site. To set up your computer with your RubyGems account:
```bash
curl -u ruby_gem_username  https://rubygems.org/api/v1/api_key.yaml > ~/.gem/credentials > chmod ~/.gem/credentials
```
The above command will get [rubyGems.org](https://rubygems.org/) API key and stores it in  `~/.gem/credentials` and change directory permissions to `0600`.

Now you can publish your gem with command. The command will take spec version push to version control with the tag. Then push to specified gem server ie rubygems.org
```
rake release
```
> Ensure you have included the gem server in your gemspec and also the version `lib/mygem/version.rb`.

## Debugging and Automation  
### CI/CD with Travis
We will use [travis](https://travis-ci.org/) CI/CD to run tests when a commit is made in the repository including pull requests from other contributors. The Travis `yaml` syntax below can be used to get started with testing. Refer to Travis [documentation](https://docs.travis-ci.com/user/languages/ruby/) for more functionalities.

```yml
language: ruby
cache: bundler
rvm:
  - 2.6.3
before_install: gem install bundler -v 2.0.2

test:
 script:
   - bundle exec rake test

```  

Apart from running tests with travis, you may want to deploy/publish your gem to rubygems.org after a version release. Travis CI support [rubygem.org deployment](https://docs.travis-ci.com/user/deployment/rubygems/).
```yml
language: ruby
cache: bundler
rvm:
  - 2.6.3
before_install: gem install bundler -v 2.0.2

test:
 script:
   - bundle exec rake test

deploy:
  provider: rubygems
  api_key: $RUBY_GEM_API_KEY
  on:
    tags: true

```
To deploy you will specify a `deploy` job with `rubygems` as the `provider`. Add your `api_key` in travis [environment variables](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings) the specify to deploy only when you push a tag. ie `tags: true`.



### Debugging with pry-byebug
[Pry-byebug](https://github.com/deivid-rodriguez/pry-byebug) adds step by step debugging and stack navigations. Pry bye-bug lets you.
1. Stop execution anywhere in any piece of code to look around and see what’s going on.
2. View a complete backtrace of every bit of code leading up to where you are

Require pry-byebug `require 'pry-byebug'` in your class. To start debugging use `binding.pry` where you want the execution to stop. Example when we call `binding.pry` in register_urls method we get below output which help to inspect where your code is having problems
```sh
26: def self.register_urls(response_type)
 27:   url="https://virtserver.swaggerhub.com/zegetech/mpesaUniAPI/1.0/mpesa/urls"
 28:   headers={
 29:     "accept"=>"application/vnd.api+json",
 30:     "Content-Type"=>"application/vnd.api+json"
 31:   }
 32:   body={
 33:     data:{
 34:       type:"urls",
 35:       id:1,
 36:       attributes:{
 37:         confirmation_url: Configuration.new.confirmation_url,
 38:         validation_url: Configuration.new.validation_url,
 39:         short_code: Configuration.new.short_code,
 40:         response_type: response_type
 41:       }
 42:     }
 43:   }
 44:   binding.pry
=> 45:   Faraday.post(url,body.to_json,headers)
 46: end

```

### Linter and Guard Automation
Linter provides an interface to Ruby's builtin syntax analysis. It will be used with files that have the Ruby syntax. Many IDE usually have linter packages for almost every language. Just install in your IDE and everything will be well.

__Rubocop__

[Rubocop](https://rubocop.readthedocs.io/en/latest/) is a Ruby linter for code analysis and formating your codebase. Apart from formating Rubocop automatically fixed the problem for you. Readmore on installation and usage in their [documentation](https://rubocop.readthedocs.io/en/latest/)

__Guard__

[Guard](https://github.com/guard/guard) is a great tool for quickly running your Ruby app tests as you develop the code. As you edit and change the files in your app, Guard can trigger tests specific to the files you are modifying. Ensure you have `guard` in development depesndencies.

Generate an empty Guardfile with:
```sh
docker-compose run app exec guard init
```
Run Guard through Docker with:
```sh
docker-compose run app exec guard
```
You can now start using guard plugins.
For example let's use [guard-minitest](https://github.com/guard/guard-minitest) plugin. Add `gem 'guard-minitest'` development dependancies and install.

Add guard definition to your `Guardfile` by running the following command:
```
docker-compose run app guard init minitest
```
Guard is now watching should start compiling your test on file changes.

### Code coverage
Remember on our `coverage` dependancies we had `coveralls` and `simplecov`.
[simplecov](https://github.com/colszowka/simplecov) is a code coverage gem with automatic mering across tests suites.
To to use simplecov add it in developement dependancies then Launch and use SimpleCov at the very top of `test_helper.rb`
```
require 'simplecov'
SimpleCov.start
```
The next time you run the tests a `coverage` directory is created in `root`. Open `coverage/index.html` with your browser to view the coverage statistics.
> Remember to add `coverage` in `gitignore`

[Coverals](https://coveralls.io/) can be used as hosted/online code coverage.

### EditorConfig
[EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. It consists of a file format for defining coding styles. EditorConfig files are easily readable and they work nicely with version control systems. Below `editorconfig` can be used to define `indent_style`, `indent_size` and more.

```
#.editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{sh,markdown}]
indent_size = 4
```

###  12-Factor compliance
 __Dependancies__

 All gem dependencies should be isolated. They should be declared in `Gemfile`

 __Backing services__

 Our gem depends on API as the backing services. APIs are accessed using access_token, ensure all your token are stored in environment variables and not committed to the versioning system. Apis resources eg URLs, keys should be in `config` and be easy to change using a configure block. Access different API environment should not result in change in the codebase
