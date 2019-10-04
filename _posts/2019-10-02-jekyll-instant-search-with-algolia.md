---
layout: blog
title: Jekyll Instant Search with Algolia
date: 2019-10-02 14:09 +0300
categories:
published: false
author:
blog-image:
intro:
---
![](/assets/images/blog/algolia-search/jekyll-search-instant.png)

Algolia is the one of the most reliable platform for building search into your business. Zegetech search is built on algolia(Have a look it).

### Why Algolia?
Speed is a critical part of keeping users happy. Algolia is aggressively designed to reduce latency. In a benchmarking test, Algolia returned results up to 200x faster than Elasticsearch. Algolia infrastructure is destributed around 6 regions in the world with around 47 datacentres proving 99.99% gurantee. The goal of [JAMstack](https://www.gathuku.tech/what-s-ja-mstack) is to eliminate server dependancies why add one when you can use [algolia free community plan](https://www.algolia.com/)

### How algolia works
Algolia provides a REST API to query and update your search indices. All input and output is provided in JSON, making it extremely easy to use in frontend Javascript.
In order to create, update, and maintain an Algolia search index, you’ll need to generate a valid JSON array of all of the content in your Jekyll site.

## Implementing Algolia in Jekyll
To implement algolia search in Jekyll we will use [jekyll-algolia](https://github.com/algolia/jekyll-algolia),a Jekyll plugin mainatined by Algolia team, which will help us genearating a JSON array and connecting with Algolia search  

Lets get started:-
### Installation
Add `jekyll-algolia` in your `Gemfile`
```
source 'https://rubygems.org'

gem 'jekyll', '~> 3.6'

group :jekyll_plugins do
  gem 'jekyll-algolia'
end

```
Then run, `bundle install` to update dependancies

### Configuration
You will need to provide algolia credentials to index your site.Open a free [community plan](https://www.algolia.com/users/sign_in). Once signed in you can get the api keys.Once you have your credentials, you should define your `application_id` and `index_name` inside your `_config.yml` file like this:
```
# _config.yml

algolia:
  application_id: your_application_id
  index_name:     jekyll # replace with your index name

```
### Usage
Once you add the application_id and index_name run below command to index your site.
```
ALGOLIA_API_KEY='your_admin_api_key' bundle exec jekyll algolia
```
> Note: that ALGOLIA_API_KEY should be set to your admin API key. This key has write access to your index so will be able to push new data. This is also why you have to set it on the command line and not in the `_config.yml` file.
>
>>You want to keep this key secret and not commit it to your versioning system.

Below is a sample output
![](/assets/images/blog/algolia-search/sample-output.png)

You might algolia want to exclude indexing of certain pages in your site. To achieve this define pages to exlude in `_config.yml` file.

```
algolia:
  application_id: your_application_id
  index_name: your_app_name
  search_only_api_key: your_search_only_key
  files_to_exclude:
    - index.html
    - index.md
    - _layouts/blog.html
    - _layouts/default.html
```

## Frontend
Building frontend that allow user to do the actual search is not part of the `jekyll-algolia` plugin. The best solution is to use [instantSearch.js](https://community.algolia.com/instantsearch.js/v2/getting-started.html) library which makes it easy to design perfect search experience using prepackaged widgets. 
