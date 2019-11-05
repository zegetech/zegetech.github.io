---
layout: blog
title: Build an API gem
date: 2019-11-05 17:15 +0300
categories: developer
published: false
author: Gathuku Ndung'u
blog-image: api_gem/ruby_gem.jpg
intro: Ruby Gem allows us to package our code to use later or share it with other developers. This is very helpful since we don't have to waste time reinventing the wheel. The good thing about gems everyone can make them. Through the entire blog, we will be looking at how to build a gem that consumes an API.
---
![gem_image](/assets/images/blog/api_gem/ruby_gem.jpg){:.img-responsive .center}

{{page.intro}}

## Prerequisites
1. Setting up a docker container
2. Bootstrapping your gem
3. Implementing functionalities
4. Test coverage(Webmock and VCR)
5. Building your gem
6. Publishing your gem


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

`WORKDIR /mygem` - sets a working directory, any other command afer this will run in the directory.

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
The good thing about ruby gem is we can also use other gem by including them in `Gemfile`. In this section our gem will implement [jsonip](https://jsonip.org) API. To get along with TDD we will require some other gems.
- [webmock](https://github.com/bblimke/webmock) - A gem for stubbing and setting expectation for HTTP requests.
- [VCR](https://github.com/vcr/vcr) - A gem that record your test suite's HTTP interactions and replay them during future test runs for fast, deterministic, accurate tests.
- [Faraday](https://github.com/lostisland/faraday) - A simple and flexible HTTP client gem.
- [JSON](https://rubygems.org/gems/json/versions/1.8.3) - A gem for parsing API JSON responses.

Include all the gems in your `Gemfile`
```
# Gemfile
gem 'faraday'
gem 'json', '~> 1.8', '>= 1.8.3'
gem 'vcr'
gem 'webmock'
```

Then build your container  to install the gems and copy files to the container
```
docker build -t mpesa_gem . && docker run -it mpesa_gem
```

 We will implement a `jsonip` method in `lib/mygem.rb`, the method will return an IP based on [jsonip](https://jsonip.org) API. We will start by writing our test the make those tests pass.

```ruby
# test/mygem_test.rb
require "test_helper"

class MygemTest < Minitest::Test

  def test_it_return_ip
    assert_equal "154.70.39.153", Mygem.jsonip
  end
end

```

The test compares a given IP `154.0.39.153`, with the IP returned by our method. To make the test pass implement `Mygem.jsonip` method.

```ruby
# lib/mygem.rb
require "mygem/version"
require 'net/http'
require 'uri'
require "json"

module Mygem
  class Error < StandardError; end
  # Your code goes here...

  def self.jsonip
    uri = URI("https://jsonip.org/")
    response= Net::HTTP.get(uri)
   JSON.parse(response)["ip"]
  end

end

```
Now, this can get a little bit complicated since the API response is dynamic. To solve this you we need `webmock` for stabbing our responses. To use webmock `require "webmock/minitest"` in `test_helper.rb`.With the below code we are mimicking the API response with our desired response. This is great because we don't need an internet connection to run our test thus improves test running speed. Also, read on how to test request using [VCR]
```ruby
# test/mygem_test.rb
require "test_helper"

class MygemTest < Minitest::Test

  def test_it_return_ip
    stub_request(:get, "https://jsonip.org/").

    to_return(status: 200, body:'{"ip":"154.70.39.153","about":"/about"}', headers: {})

    assert_equal "154.70.39.153", Mygem.jsonip
  end

end
```
Great!, now we have implemented a method that returns an IP and tested it, let's see how we can package this gem.

## Building the Gem
To build the gem update gemspec in `mygem.gemspec` then we can build a gem out of it with the below command.
```
docker-compose run app gem build mygem.gemspec
```
Then install the built gem with below command
```
docker-compose run app  gem install mygem-0.1.0.gem

```
You can head to `irb` to test the gem
```
docker-compose run app irb
```
In `irb` require the gem ie `require "mygem"` then call `Mygem.jsonip` method which returns your IP address.
```bash
2.6.3 :001 > require 'mygem'
 => true
2.6.3 :002 > Mygem.jsonip
 => "154.70.39.153"
2.6.3 :003 >
```

Congratulations!, you now have a working gem. What left is to publish it in [rubygems.org](https://rubygems.org/)

## Publishing Gem
Now you can share `mygem` with the rest of the Ruby community. Publishing your gem out to [RubyGems.org](https://rubygems.org/) only takes one command, provided that you have an account on the site. To set up your computer with your RubyGems account:
```
curl -u ruby_gem_username  https://rubygems.org/api/v1/api_key.yaml > ~/.gem/credentials > chmod ~/.gem/credentials
```
The above command will get [rubyGems.org](https://rubygems.org/) API key and stores it in  `~/.gem/credentials` and change directory permissions to `0600`.

Now you can publish your gem with command. The command will take spec version push to version control with the tag. Then push to specified gem server ie rubygems.org
```
docker-compose run app rake release
```
>> Ensure you have included the gem server in your gemspecs and also the version.
