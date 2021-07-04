---
layout: blog
title: Product Design
date: 2019-05-03 12:30 +0300
categories: Project Management
published: false
author: Ngari Ndung'u
blog-image: product-design/product_design_header.png
intro: | 
  As a developer, it is only so easy to want to dive right into the code when a new project comes along.
  But, fighting that urge is arguably the best thing you will do for yourself and your client.
  Any non-trivial project should begin by having a clear understanding of the envisioned solution.
  Enter product design.
---
![abstract circular design](/assets/images/blog/{{ page.blog-image }}){: .img-responsive .center}

{: .image-attribution}
Photo by Bogdan Karlenko on Unsplash

{{ page.intro }}

We have written about the [agile product development](2019-01-25-agile-product-development.md) process we follow before.
The design phase is the one that most developers would rather forego or wrangle on-the-fly.
Why? No idea. After all, everyone knows that design is important right?

## Design
Yes I know, am not a designer either. Well, not professionally anyway.
When working alone, it is very natural to have a 'design' whose only form is the collective firing of neurons in your head.
That unfortunately is not very shareable - yet. For a team, documentation is kinda important.
Having design documents help align the vision for the product, provide a target and helps anchor conversations around the product.

For a lot of people, the definition of design does not go beyond UX and UI design.
But, product design encompasses the entire process that defines what the product will be.
It is an opportunity to look ahead into the internals of the product, anticipate challenges and envision solutions around them.
In addition to the visual designs, product design should result in a concrete system architecture.

### Example
[Green mamba](https://github.com/zegetech/green-mamba) is an internal project we used for learning, developed by following through 'the process'.
It is a sample peer to peer money transfer API built with RoR(of course).
The documents produced during the design phase may not be typical of what you expect out of software design.
Here's what we focus(ed) on:
> You can click through the links to dive deeper into each design component.

1. [User journey/flow maps](2019-03-14-user-journey-maps.md)
  User journey diagrams help to think through the problem from the user's perspective.
  By considering what the user wants to accomplish, we can model the paths that make the process intuitive and provide a delightful user experience.
  ![generalized user flow diagram](/assets/images/blog/product-design/user_flow_small.png){: .img-responsive .center}
2. [API definitions](2019-02-21-open-api-swagger.md)
  The API definition is one more way to 'see' the final product.
  Besides providing a way for the frontend and backend teams to work in tandem, it is an invaluable testing tool.
  It also ensures that documentation takes its rightful place of honour.
  You can browse the definition on [Swaggerhub](https://app.swaggerhub.com/apis/NgariNdungu/green-mamba-re/1.0.0#/).
3. [ERD and Database models](2019-04-11-database-modelling-and-erds.md)
  Data, data, data... Handling data is the basis of many of the products we build.
  It is thus imperative that we understand the data that will be fed and generated and ultimately how it will be presented.
  Entity relationship diagrams are a way to visualize the discrete objects that form our product/business domain, and how they relate.
  A DB model on the other hand maps how these objects will be stored in our chosen database.
4. **Mockups**:
  Ideally we will already have mockups to base off of from the [product discovery](2019-01-19-product-discovery.md) phase.
  We can convert any paper mockups and refine towards the 'final' designs.

  ![mobile UI mocks](/assets/images/blog/ux-design/mocks.png){: .img-responsive .center}

These design artefacts provide us with a practical basis to start coding the product, while taking a reasonable amount of time.
It is after all possible to get lost looking for the perfect design and forget the most important part - product in user's hands.

