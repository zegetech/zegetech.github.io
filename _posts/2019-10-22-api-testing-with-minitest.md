---
layout: blog
title: API Testing with Minitest, Like a PRO!
date: 2019-10-22 13:35 +0300
categories: 
published: true
author: Tom Nyongesa
blog-image: api-testing/API_TESTING.jpg
intro: Who said that Data is the 21st century gold? Well, if so then APIs are the new oil. With the ever micro-growing of the globe, apps are increasingly interacting and integrating with each other with APIs backboning the interactions. From Facebook, Google, [Tyk](https://tyk.io/) to [Qwwik](https://qwwik.com/), the need for external parties/third parties cannot be ignored. It's a scratch your back I scratch yours. But how do we validate that whoever scratches our backs is doing it right and gently? We need to test!
---
![api-testing](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}<br>
{{page.intro}}

We can easily test APIs with the help of Postman client, thanks to those gurus - running an API request on Postman would make anyone feel like an API integration guru. To get this feeling simply install Postman on your machine and test out our newly [unveiled Daraja 2.0 APIs](https://www.getpostman.com/collections/bd902a95eb356c2d4308).

[1 min Testing time]

<iframe src="https://giphy.com/embed/l0HluWIpEhHCmCkoM" width="480" height="366" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/southparkgifs-l0HluWIpEhHCmCkoM">via GIPHY</a></p>

Yea, I felt the same way.

However, problems start arising if you really know what you are doing and would like to test many scenarios. This is when you'll start repetitively clicking the Postman Send Button and making changes to the body section. You'll start getting frustrated, start pulling your hair, close down your computer or worst give up on your product development. 

Unluckily, this may not even have anything to do with how you are testing the APIs. it may be because of the slow responding API servers, API restrictions like quota limiting, it could be anything

This is why I've come to put my development trust in TDD - quality assurance within a limited timespan. 

### Let's speed up the Process with Ruby TDD and test like PROs

You can certainly speed the whole process using your language of development the only doubt being the availability of the TDD tools we'll be using in Ruby. 

We'll need: 

- an API to test
- and the following gems/ruby tools: [Faraday](https://github.com/lostisland/faraday), [VCR](https://github.com/vcr/vcr) and [minitest](https://github.com/seattlerb/minitest) 
- other gems like guard, pry-byebug, rubocop, openssl, faker etc.

#### Faraday

This is an HTTP client that makes it easy to call web apis programmatically.

#### VCR

A gem that records your external HTTP requests into cassettes and replays them on subsequent requests. This is useful when: 

- you are making tests to a live API service
- constant failing tests due to connectivity issues
- lower API limits that are easily hit
- slower test suites

VCR seeks to ensure that your tests are isolated from external factors. 

#### Minitest

This is a Ruby backbone of TDD, BDD, mocking and benchmarking. However, you could also use Rspec.

<iframe src="https://giphy.com/embed/e5Qz2GyFlo8YYONQy6" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/playstation-boom-ps4-e5Qz2GyFlo8YYONQy6">via GIPHY</a></p>

To avoid the many dependency issues that could arise, we'll be using [docker](https://www.docker.com/). Install docker if you do not have it installed locally.

[Extras on docker](https://zegetech.com/blog/2018/11/08/developing-with-docker.html)

Let's now write our first automated test to our [Daraja 2.0 Payout API](https://documenter.getpostman.com/view/1238477/SVtbNjVn?version=latest#98db6910-637a-40df-8f87-848d905f45a6). 

1. Create a Gemfile and paste in the following:

```
# frozen_string_literal: true

# Gemfile
source 'https://rubygems.org'

gem 'faraday'
gem 'guard'
gem 'minitest'
gem 'rake'
gem 'vcr'

gem 'byebug'
gem 'pry-alias'
gem 'pry-byebug'
gem 'guard-bundler'
```

2. Create a Dockerfile and paste in the following:

```
FROM ruby:2.6.4
RUN mkdir /app
WORKDIR /app
COPY . /app/
RUN bundle install -j4 --retry 5
COPY . /app
```

This will pull a ruby image from the Docker repository, create a directory, switch to your working directory, copy all files to your working directory, install all the listed gems in the Gemfile.

3. In our api_test.rb, paste the following code snippet:

```
require 'minitest/autorun'
require 'json'
require 'faraday'

class ApiTest < Minitest::Test
  def test_success_response
    body = {
      "data": {
      "type": "payouts",
        "id": 1,
          "attributes": {
              "category": "BusinessPayment",
              "amount": 10000,
              "recipient_no": "072264885",
              "recipient_type": "msisdn",
              "posted_at": "2019-03-18T17:22:09.651011Z",
              "recipient_id_type":"national_id",
              "recipient_id_number": "12345567",
              "reference": "12345678"
          }
      }
  }
    response = Faraday.post("https://virtserver.swaggerhub.com/zegetech/mpesaUniAPI/1.0/mpesa/payouts", body.to_json)
    assert_equal 200, response.status, "Should return a success response with status 200"
  end
end
```

4. From your current directory, open your terminal and type in:

```
docker build . -t api-test:latest
```

This will build up your docker image. 

Then, do a `docker run api-test ruby api_test.rb` to run your first automated test.

You should be met with an assertion as depicted in the api_test.rb above.

Like a Pro!

### Let's make things sweeter and faster: add VCR, Guard, and Pry-byebug

We will now use docker-compose for visual interaction.

Into our docker-compose.yml file paste the following:

```
version: '3.3'
services:
  api-test:
    build: .
    command: tail -f /dev/null
    volumes:
      - './:/app'
```

Then, update our api_test.rb to:

```
require 'minitest/autorun'
require 'vcr'
require 'pry-byebug'
require 'minitest-vcr'
require 'json'
require 'faraday'
# require_relative 'test_helper.rb'

VCR.configure do |config|
  config.cassette_library_dir = "fixtures/vcr_cassettes"
  config.hook_into :webmock
end
class ApiTest < Minitest::Test
  def test_success_response
    body = {
      "data": {
      "type": "payouts",
        "id": 1,
          "attributes": {
              "category": "BusinessPayment",
          "amount": 10000,
          "recipient_no": "072264885",
          "recipient_type": "msisdn",
              "posted_at": "2019-03-18T17:22:09.651011Z",
          "recipient_id_type":"national_id",
          "recipient_id_number": "12345567",
          "reference": "12345678"
          }
      }
  }
  VCR.use_cassette("success_test") do 
    response = Faraday.post("https://virtserver.swaggerhub.com/zegetech/mpesaUniAPI/1.0/mpesa/payouts", body.to_json)
    assert_equal 200, response.status, "Should return a success response with status 200"
  end
  end
end
```

Here, we are introducing VCR implementation to run our tests once and record the HTTP test requests to `fixtures/vcr_cassettes` directory. We then tell VCR to record the HTTP request into success_test.yml file. [More]("https://github.com/vcr/vcr") on VCR.

Then, do a `docker-compose exec -it <your-container-name or id> bash`

Inside your container run, `ruby api_test.rb`, to run the test. If you take a peek in your folder structure you'll notice that `fixtures/vcr_cassettes/success_test.yml` will have been created. Running your test again will replay the recorded test suite in the .yml file. Note thie time it takes to make run the test for the first time against the time it takes for the subsequent tests. Do you notice how fast the test runs for the repeat tests?

VCR makes the tests fast, deterministic, accurate because you wouldn't have the need to connect to the external API service whose connection could be slower.

However, VCR isn't so good in other cases because: 

- the cassettes could get out of sync with the real service, meaning there could be additional maintenance overhead
- it’s not ‘really’ stubbing because you’ll need to make that first call to the live application

With this in mind, you can choose to disable VCR to suit your test scenarios.

### To conclude,

And if this is interesting to you, you could try looking into [guard-rake](https://github.com/rubyist/guard-rake), [pry-byebug](https://github.com/deivid-rodriguez/pry-byebug), [rubocop](https://github.com/rubocop-hq/rubocop), [faker](https://github.com/faker-ruby/faker) and fixtures to make the whole process blissful.

You are now an API testing guru!

Bye!