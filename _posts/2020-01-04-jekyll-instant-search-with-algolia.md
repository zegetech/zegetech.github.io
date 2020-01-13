---
layout: blog
title: Search a Static Site
date: 2020-01-02 14:09 +0300
categories: Developer
published: true
author: Gathuku Ndung'u
blog-image: algolia-search/image-search.jpg
intro: We built [our](https://zegetech.com) website on Jekyll. Jekyll is great for developers and we love it. The blog posts we release have become a big source of reference for many in the team. As the number of posts grow, referring back to a post meant scrolling through the pages to get the posts. Not a very good experience. We needed a search. Static site generator(SSG) such as [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.org/),[Gridsome](https://gridsome.org/) and [Hugo](https://gohugo.io/) are a great tool to build static websites. They make it easy to build and deploy sites with Zero or extremely low costs. However, search is one of the features not supported out of the box.
keywords: Jekyll Search Algolia Instantsearch Widgets
---

![jekyll_instant_image](/assets/images/blog/algolia-search/image-search.jpg){:.img-responsive .center}

{{page.intro}}

Adding search functionality to a Jekyll site or whichever SSG generator you are using is no difficulty. Let's explore some tools that we can use.

1. [Lunr.js](https://lunrjs.com/) is a blazing fast simple full-text search engine for client-side applications. It's designed to be small, yet full-featured, enabling you to provide a great search experience without the need for external, server-side, search services

2. [Google Custom Search Engine](https://developers.google.com/custom-search) enables you to create a search engine for your website, or blog. It allows the configuration of search results with images. You can fine-tune the ranking, add your promotions and customize the look and feel of the search results.

3. [Jekyll simple search](https://github.com/christian-fei/Simple-Jekyll-Search) is a lightweight search library built on javascript. It operates entirely on the client-side and no server-side required.

4. [Algolia](https://www.algolia.com/) is a reliable SAAS platform for building search into your website. It is billed to power billions of queries for thousands of companies every year and delivering results within 100ms. Impressive!

> Given all the options, we decided to try out Algolia for adding a search to our blog because it seems powerfully optimized and has a pretty generous free community plan, perfect for our small website.


### Why Algolia?
Speed is a critical part of keeping users happy. Algolia claims the following; It is aggressively designed to reduce latency. In a benchmarking test, Algolia returned results up to 200x faster than Elasticsearch. Algolia infrastructure is distributed around 6 regions in the world with around 47 datacentres proving a 99.99% guarantee. The goal of JAMstack is to eliminate server dependencies why add one when you can use [algolia free community plan](https://www.algolia.com/)

### How Algolia works
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
  index_name:     mywebsite.com # replace with the name of your index (index database)

```
### Usage
Once you add the application_id and index_name run below command to index your site.

```shell
ALGOLIA_API_KEY='your_admin_api_key' bundle exec jekyll algolia
```
> Note: that env variable ALGOLIA_API_KEY should be set to the value of your Algolia admin API key. This key has write access to your index so will be able to push new data. Keep it out of git by setting it in the command or if using docker, as an env variable. If using CI/CD, ALGOLIA_API_KEY in the pipeline and then run the command `bundle exec jekyll algolia` after deploying your website.
>
>You want to keep this key secret and not commit it to your versioning system.

Below is a sample output

```bash
Configuration file: /path_to_jekyll_site/_config.yml
Processing site...                                                               
       Jekyll Feed: Generating feed for posts
Rendering to HTML (100%) |===================================================|
Extracting records (100%) |===================================================|
Settings are already up to date.                                                 
Getting a list of existing records                                                 
Content is already up to date.                                                   
✔ Indexing complete  

```

You might want to exclude indexing of certain pages on your site. To achieve this, define pages to exclude in `_config.yml` file.

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
To initialize instant search you will need an Algolia account with a non-empty index. Provide app credentials then call the `start` method.
> Its advisable to use a separate javascript file ie `algolia.js` or any other name you like.

```javascript
# algolia.js
const search = instantsearch({
  appId: 'your_app_id',
  apiKey: 'your_api_key',
  indexName: 'index_name',
  routing: true
});

search.start();
```
The `appId`,`apiKey` and `indexName` are mandatory as gotten from [Algolia Dashboard](https://www.algolia.com/users/sign_in)
>The `apiKey` should be the `Search-Only API Key`. This key doesn't have any write access, you should not worry about committing it in your version control. It gives public search access to a public website.
> You can always regenerate this key in your Algolia dashboard.

Congrats! you are now connected with Algolia.

### Display results
The importance of search is to display results, by default InstantSearch.js will do a query at the start of the page and will retrieve the most relevant hits. To display results, [hits widget](https://www.algolia.com/doc/api-reference/widgets/hits/js/) will be used. Hits widget will display all the results returned by algolia and update when new results are passed. With instantSearch.js you need to provide a container for each widget which tells instantSearch.js where to display the widget. Learn more about [widgets](https://www.algolia.com/doc/api-reference/widgets/js/). Here we first define the container of our results, this could be in any `.html` file/page where we want to display results.

```html
<!-- index.html -->
<div id="hits">
  <!-- Hits widget will appear here -->
</div>
```
Once you set a container for the hits, add the [hits widget](https://www.algolia.com/doc/api-reference/widgets/hits/js/) in instantSearch instance, using `addWidget` method. Add this in `algolia.js` or the same javascript file you initialized Algolia.

```javascript
# algolia.js

  const search = instantsearch({
    appId: 'your_app_id',
    apiKey: 'your_api_key',
    indexName: 'index_name',
    routing: true
  });

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits'
    })
  );

  search.start();
```
You can now be able to see the results without styling. This view lets you inspect the values that are retrieved from Algolia, to build your custom view. To customize the view we need a special option for hits called `template`, the option accepts a [mustache](https://mustache.github.io/mustache.5.html) template string or `a function returning a string`.

```javascript

  const search = instantsearch({
    appId: 'your_app_id',
    apiKey: 'your_api_key',
    indexName: 'index_name',
    routing: true
  });

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: '<em>Hit {{objectID}}</em>: {{_highlightResult.name.value}}}'
      }
    })
  );

  search.start();
```
The above example used `_highlightResult` that contains attributes highlighted based on the current query. This aspect of the search gives user feedback on the matching parts of the results.

We can also use a function returning a string, which I find better since here we can be able to pass actual HTML syntax for styling.

> We used this approach in zegetech website since its more flexible and presentable

Example.
```javascript
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: data => '
          <div>
           <h1 class="text-green">${data.title}</h1>
           <p>${data.content.substring(0,150)}</p>
          </div>
      '
    }
  })
);

```
> Note the arrow symbol represents ES6 syntax for defining a function

Using this approach:-
- You can be able to customize you view with html in a neat way.
- Use html classes from your favourite  framework eg boostrap ie `<h1 class="text-green">${data.title}</h1>`
- Attach valid javascript code in your results eg `data.content.substring(0,150)` to only display first 150 characters in a string.

### Add search Box
Now that we have added results, we can start querying our index, to achieve this we need a [searchBox](https://www.algolia.com/doc/api-reference/widgets/search-box/js/) widget.

 In html `index.html`
```html
<!--- index.html -->

<div id="search-box">
  <!-- SearchBox widget will appear here -->
</div>

<div id="hits">
  <!-- Hits widget will appear here -->
</div>

```
 In javascript `algolia.js`
```javascript
  const search = instantsearch({
    appId: 'your_app_id',
    apiKey: 'your_api_key',
    indexName: 'index_name',
    routing: true
  });
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
      container: '#hits',
      templates: {
        empty: 'No results',
        item: '<em>Hit {{objectID}}</em>: {{_highlightResult.name.value}}}'
      }
    })
  );

  search.start();
```

The search is now active. The good thing Algolia computes the matching part. For more configuration results configure [attributeToRetrieve](https://www.algolia.com/doc/rest-api/search/#param-attributesToRetrieve) and [attributeToHighlight](https://www.algolia.com/doc/rest-api/search/#param-attributesToHighlight) of your index.

We now can search our website and find those posts that we want, quickly and easily. Bravo!!

###  Limitations

Algolia community plan provides 50K operations and 10k records per month, pretty generous. Perfect for a small to medium website. To know more about how algolia counts records and operations check their official [blog](https://www.algolia.com/doc/faq/accounts-billing/how-algolia-count-records-and-operation/). Apart from that below some of the limitations that the community plan lacks compared to an enterprise plan. they can be classified in terms of features and support. Check algolia [pricing page](https://www.algolia.com/pricing/) to see the difference of various plans.

| Features                                        | Support           |
|--------------------------------                 |-------------------|
| Advanced analytics                              | Email support     |
| Advanced APIs(Analytics, Insights, and monitoring)| Extension support |
| Personalization                                  | Coding guidance   |
| Query Rules (Merchandising & Intent detection)  | Live chat for implementation support|
| Service level agreement (SLA)                   | Phone alerting    |
| Additional Team members                         | Dedicated point of contact |
| Granular Team Permissions                       | Desiccated implementation engineer|

<br/>
Give it a try and add some search to your static site.
