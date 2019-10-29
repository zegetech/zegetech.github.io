---
layout: blog
title: Search a Static Site
date: 2019-10-02 14:09 +0300
categories: Developer
published: true
author: Gathuku Ndung'u
blog-image: algolia-search/algolia.png
intro: We built [our](https://zegetech.com) website on Jekyll. Jekyll great for developers and we love it. The blog post we release have become a big source of refernce for many in the team. As the posts grow, finding then meant scrolling through the pages to get the posts. We needed search. Static site Genarator(SSG) such as [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.org/),[Gridsome](https://gridsome.org/) and [Hugo](https://gohugo.io/) are a very good tool to build static websites. They make it easy to build and deploy sites with Zero or extremely low costs. However, search is one of the features not supported out of the box.
---

![jekyll_instant_image](/assets/images/blog/algolia-search/algolia.png){:.img-responsive .center}

{{page.intro}}

Adding search functionality in Jekyll site or whichever SSG generator you are using is no difficulty. Let's explore some tools that we can use.

1. [Lunr.js](https://lunrjs.com/) is a blazing fast simple full-text search engine for client-side applications. It's designed to be small, yet full-featured, enabling you to provide a great search experience without the need for external, server-side, search services

2. [Google Custom Search Engine](https://developers.google.com/custom-search) enables you to create a search engine for your website, or blog. It allows the configuration of search results with images. You can fine-tune the ranking, add your promotions and customize the look and feel of the search results.

3. [Jekyll simple search](https://github.com/christian-fei/Simple-Jekyll-Search) is a lightweight search library built on javascript. It entirely operates on the client-side and no server-side required.

4. [Algolia](https://www.algolia.com/) is a reliable SAAS platforms for building search into your website. It is billed to power billions of queries for thousands of companies every year and delivering results within 100ms. Impressive!

>Given all the options, we decided to try out Algolia for out blog search because it seems to be optimised to support large websites.


### Why Algolia?
Speed is a critical part of keeping users happy. Algolia is aggressively designed to reduce latency. In a benchmarking test, Algolia returned results up to 200x faster than Elasticsearch. Algolia infrastructure is distributed around 6 regions in the world with around 47 datacentres proving 99.99% guarantee. The goal of JAMstack is to eliminate server dependencies why add one when you can use [algolia free community plan](https://www.algolia.com/)

### How algolia works
Algolia provides a REST API to query and update your search indices. All input and output is provided in JSON, making it extremely easy to use in frontend Javascript.
To create, update, and maintain an Algolia search index, you’ll need to generate a valid JSON array of all of the content in your Jekyll site.

## Implementing Algolia in Jekyll
To implement algolia search in Jekyll we will use [jekyll-algolia](https://github.com/algolia/jekyll-algolia), a Jekyll plugin maintained by Algolia team, which will help us generate a JSON array and connect with Algolia search  

Lets get started:-
### Installation
Add `jekyll-algolia` in your `Gemfile`

```ruby
source 'https://rubygems.org'

gem 'jekyll', '~> 3.6'

group :jekyll_plugins do
  gem 'jekyll-algolia'
end

```
Then run, `bundle install` to update dependencies

### Configuration
You will need to provide algolia credentials to index your site. Open a free [community plan](https://www.algolia.com/users/sign_in). Once signed in you can get the API keys. Once you have your credentials, you should define your `application_id` and `index_name` inside your `_config.yml` file like this:

```yml
# _config.yml

algolia:
  application_id: your_application_id
  index_name:     jekyll # replace with your index name

```
### Usage
Once you add the application_id and index_name run below command to index your site.

```shell
ALGOLIA_API_KEY='your_admin_api_key' bundle exec jekyll algolia
```
> Note: that ALGOLIA_API_KEY should be set to your admin API key. This key has write access to your index so will be able to push new data. This is also why you have to set it on the command line and not in the `_config.yml` file or anywhere in our code.
>
>>You want to keep this key secret and not commit it to your versioning system.

Below is a sample output

```bash
Configuration file: /path_to_jekyll_site/_config.yml
Processing site...                                                               
       Jekyll Feed: Generating feed for posts
Rendering to HTML (100%) |===================================================|
Extracting records (100%) |===================================================|
Settings are already up to date.                                                 
Getting list of existing records                                                 
Content is already up to date.                                                   
✔ Indexing complete  

```

You might want to exclude indexing of certain pages in your site. To achieve this, define pages to exclude in `_config.yml` file.

```yml
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

# Frontend
Building frontend that allows user to do the actual search is not part of the `jekyll-algolia` plugin. The best solution is to use [instantSearch.js](https://github.com/algolia/instantsearch.js/) library which makes it easy to design perfect search experience using prepackaged widgets.

## Implementing instant search
Instant search is meant to be used with algolia, so the API credentials to an algolia index is needed

### Install `instantSearch.js`
You can install `instantSearch.js` through `CDN` or a dependencies management system(`YARN/NPM`)

Form CDN

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.10.4/dist/instantsearch.min.css">
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.10.4"></script>

```
From NPM

```bash
npm install instantsearch.js --save
# OR
yarn add instantsearch.js
```
Then

```javascript
const instantsearch = require('instantsearch.js');
```

### Initialization
To initialize instant search you will need an algolia account with a non-empty index. Provide app credentials then call the `start` method.

```javascript
const search = instantsearch({
  appId: 'your_app_id',
  apiKey: 'your_api_key',
  indexName: 'index_name',
  routing: true
});

search.start();
```
>The `apiKey` should be the `Search-Only API Key`. This key doesn't have any write access, you should not worry about committing it in your version control. It gives public search access to a public website.
>> You can always regenerate this key in your Algolia dashboard.

Congrats! you are now connected with Algolia.

### Display results
The importance of search is to display results, To display results, [hits widget](https://www.algolia.com/doc/api-reference/widgets/hits/js/) will be used. Hits widget will display all the results returned by algolia and update when new results are passed. With instantSearch.js you need to provide a container for each widget which tells instantSearch.js where to display the widget. Learn more about [widgets](https://www.algolia.com/doc/api-reference/widgets/js/)

```html
<div id="hits">
  <!-- Hits widget will appear here -->
</div>
```
Once you set a container for the hits, add the [hits widget](https://www.algolia.com/doc/api-reference/widgets/hits/js/) in instantSearch instance.
```html
<script>
  const search = instantsearch(options);

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits'
    })
  );

  search.start();
</script>

```
You can now be able to see the results without styling. To customize the view we need a special option for hits called `template`, the option accepts a [mustache](https://mustache.github.io/mustache.5.html) template string or a function returning a string.

```html
<div id="hits">
  <!-- Hits widget will appear here -->
</div>

<script>
  const search = instantsearch(options);

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: '<em>Hit {{objectID}}</em>: {{{_highlightResult.name.value}}}'
      }
    })
  );

  search.start();
</script>
```
The above example used `_highlightResult` that contains attributes highlighted based on the current query. This aspect of the search gives user feedback on the matching parts of the results.

### Add search Box
Now that we have added results, we can start querying our index, to achieve this we need a [searchBox](https://www.algolia.com/doc/api-reference/widgets/search-box/js/) widget.
```html
<div id="search-box">
  <!-- SearchBox widget will appear here -->
</div>

<div id="hits">
  <!-- Hits widget will appear here -->
</div>

<script>
  const search = instantsearch(options);

  // initialize SearchBox
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for products'
    })
  );

  // initialize hits widget
  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits'
    })
  );

  search.start();
</script>
```

The search is now active. The good thing Algolia computes the matching part. For more configurate results configure [attributeToRetrieve](https://www.algolia.com/doc/rest-api/search/#param-attributesToRetrieve) and [attributeToHighlight](https://www.algolia.com/doc/rest-api/search/#param-attributesToHighlight) of your index.

We now can search our website and find those post that we want, quickly and easily. Bravo!!

###  Limitations

Algolia community plan provides 50K operations and 10k records per month. To know more about how algolia counts records and operations check their official [blog](https://www.algolia.com/doc/faq/accounts-billing/how-algolia-count-records-and-operation/). Apart from that below some of the limitations compared to an enterprise plan, they can be classified in terms of features and support. Check algolia [pricing page](https://www.algolia.com/pricing/) to see difference of various plans.

 | Features                                        | Support           |
 |------------------------------- -                 |-------------------|
 | Advanced analytics                              | Email support     |
 | Advanced APIs(Analytics,Insights and monitoring)| Extension support |
 | Pesonalization                                  | Coding guidance   |
 | Query Rules (Merchandizing & Intent detection)  | Live chat for implementation support|
 | Service level agreement (SLA)                   | Phone alerting    |
 | Additional Team members                         | Dedicated point of contact |
 | Granular Team Permissions                       | Desicated implementation engineer|
