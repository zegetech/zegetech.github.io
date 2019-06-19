---
layout: blog
title: Why Use JSON:API Format\?
date: 2019-06-18 16:24 +0300
categories: developer, api
published: false
author: Ngari Ndung'u
blog-image: 
intro: 
---
## what?
**JSON:API** specification is exactly what it reads like. But just so we're on the same page...
First, lets decompose the name; JSON - the data format we all know and love(or hate) and API - the lifeblood of today's technology industry.
The JSON:API specification addresses itself to clients that make JSON requests and the servers that respond to those requests.
At the heart of the specification is the **resource object**. This makes JSON:API uniquely suited to implementing REST apis over HTTP.

## where - which components of an api does it affect?
- request/response data
- errors
- urls - filtering/ordering/params
- http spec conformance??

## why? - what is the alternative and advantage over them?
So, why would anyone want to implement the JSON:API specification?
*Time saver*
> If you’ve ever argued with your team about the way your JSON responses should be formatted, JSON:API can be your anti-bikeshedding tool.

APIs are usually the public facing aspects of the products we build. As such it is only natural to want to make them beautiful.
Problem is, everyone will have an opinion as to what beauty is. And, that opinion might change the next day.
Easiest way to get people to agree? Give them a spec to conform to.

*Convention over configuration* - 
JSON:API makes a number of pragmatic choices that the developer would normally have to spend time thinking over.
Among the decisions that are made for you include what HTTP response codes to use and how to support sorting, pagination and filtering.

*Save network calls* - resources related to the current resource being retrieved from the server can be included in the response using the `included` key.
**blog example??**

*[HATEOAS](https://restfulapi.net/hateoas/) supported out of the box*
Hypermedia As The Engine Of Application State is a REST concept that allows the inclusion of context-relevant links in a response.
This allows the client to navigate the API without much prior knowledge of its capabilities.
The optional `links` key of a jsonapi document can be used to provide this functionality.

*Errors are a first-class citizen*
`data` for successful requests, `errors` for failed requests.
Errors, not one, but as many as you might want to inform the consumer of.
It is only so easy for us to send back plain error status codes. And keep the developer guessing as to how they wronged the gods.
But we can do better, and JSON:API gives us an [error object](https://jsonapi.org/format/1.1/#errors) with enough detail to eliminate the guesswork.

*Eases testing*
The structure of a jsonapi document renders itself well for testing.
While testing for high-level success/error responses, we can simply check that the API responds with a data/errors body respectively.

- easily identifiable and clear payload
- conventions over configuration
- simplifies testing - data/errors
- better errors
- better REST api - hateoas/filtering/ordering
- everything is a resource?

## why not? - what's challenging?
Designing and implementing a JSON:API compliant API can be challenging.
While you can go through the entire specification in one sitting, it's something you'll need to refer back to constantly.
The extra level of nesting translates to more typing when writing your [API definition](2019-02-21-open-api-swagger.md).
The JSON:API media type `application/vnd.api+json` will usually require some extra work to support server-side.
- The organization of the specification around resource objects can feel limiting. The requirement for a `type` and `id` on `data` objects can be especially un-intuitive for some endpoints.

- extra typing - during definition
- extra work during implementation
- takes time to learn - and remind
- everything is a resource

## how? - tooling that helps with implementation
While it is conceivable that you could build a compliant API from scratch, you don't have to.
There is [tooling](https://jsonapi.org/implementations/) built around the spec to ease the transition.
There are both client and server-side implementations, and chances are, your favorite language is covered.

- link to jsonapi tools
- rails libraries - active model serializers/fast_jsonapi/jsonapi_utils