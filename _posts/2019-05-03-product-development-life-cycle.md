---
layout: blog
title: Product Development Life Cycle
date: 2019-05-03 12:30 +0300
categories: 
published: false
author: Ngari Ndung'u
blog-image: 
intro: | 
  As a developer, it is only so easy to want to dive right into the code when a new project comes along.
  But, fighting that urge is arguably the best thing you will do for yourself and your client.
  Any non-trivial project should begin by having a clear understanding of the envisioned solution.
  The processes followed in the product development life cycle provide the developer with a coherent foundation, a clear goal and a guide along the way.
---
![product development lifecycle](/assets/images/blog/{{ page.blog-image }}){: .img-responsive .center}

{{ page.intro }}

We have written about the [agile product development](2019-01-25-agile-product-development.md) process we follow before.
The two processes of product **design** and **development** form the product development life cycle.
The design phase is the one that most developers would rather forego or wrangle on-the-fly.
Why? No idea. After all, everyone knows that design is important right?

## Design
Yes I know, am not a designer either. Well, not professionally anyway.
When working alone, it is very natural to have a 'design' whose only form is the collective firing of neurons in your head.
That unfortunately is not very shareable - yet. For a team, documentation is kinda important.
Having design documents help align the vision for the product, provide a target and helps anchor conversations around the product.
While the typical [software development life cyle](http://) has its expected outputs, at Zege we focus on:
1. [User journey/flow maps](2019-03-14-user-journey-maps.md)
  User journey diagrams help to think through the problem from the user's perspective.
  By considering what the user wants to accomplish, we can model the paths that make the process intuitive and provide a delightful user experience.
2. [API definitions](2019-02-21-open-api-swagger.md)
  The API definition is one more way to 'see' the final product.
  Besides providing a way for the frontend and backend teams to work in tandem, it is an invaluable testing tool.
  It also ensures that documentation takes its rightful place of honour.
3. [ERD and Database models]()
    Data, data, data... Handling data is the basis of many of the products we build.
    It is thus imperative that we understand the data that will be fed and generated and ultimately how it will be presented.
    Entity relationship diagrams are a way to visualize the discrete objects that form our product/business domain, and how they relate.
    A DB model on the other hand maps how these objects will be stored in our chosen database.
4. Mockups
    Ideally we will already have mockups to base off of from the [product discovery](2019-01-19-product-discovery.md) phase.
    We can convert any paper mockups and refine towards the 'final' designs.

These design artefacts provide us with a practical basis to start coding the product, while taking a reasonable amount of time.
It is after all possible to get lost looking for the perfect design and forget the most important part - product in user's hands.

## Development
This should really be #5 above. Development should be guided by the design documents and should in return feed back into the desing.
It is nigh impossible to have a perfect design. As you develop, you begin to see shortcomings in the design, or find better ways.
At this point design and development occur in tandem until the product is ready to see the light.

## Working through the process - the experience

