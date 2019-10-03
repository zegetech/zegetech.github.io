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
