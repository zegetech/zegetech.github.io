---
layout: blog
title: Kenya Payments Integration Survey
date: 2019-02-28 10:36 +0300
categories: developer 
published: false
author: Kariuki Gathitu, Ngari Ndung'u
blog-image: integrations-survey/payments.png
intro: | 
  The [Stack overflow developer survey results](https://insights.stackoverflow.com/survey/2019) came out recently  to tell an interesting story.
  Ever wonder what the kenyan story looks like? We recently ran a survey within the developer community in Kenya, with the aim of understanding the state of the payment integrations ecosystem.
  We wanted to find out the pains(and joys) that developers go through while integrating payments in Kenya.
  We are happy to finally release the survey results back to the community to hopefully help move us all a step forward. 
---
![stacked colored coins](/assets/images/blog/{{page.blog-image}}){: .img-responsive .center}

{:.image-attribution}
Photo by Ibrahim Rifath on Unsplash

> Jumia's IPO on the NYSE was inspirational. However, what came to many as a disappointment was the claim to Africa that never was, or so it seemed.
When asked why no tech talent resided in Africa, Jumia CEO Sacha Poignonnec said plainly... there is not enough talent in Africa!!
Shocking, isn't it, that amid all the tech talent and amazing developers in Kenya and around the continent, an "African tech company" cannot find african developers. 

{{page.intro}}

In Kenya, it seems that most developers identify as full stack, being able to handle end to end projects.
Of interest is that a number of CTO's in Kenyan companies are active in day to day development.

![developer types](/assets/images/blog/integrations-survey/developer_types.png){: .img-responsive .center}

![developer roles](/assets/images/blog/integrations-survey/developer_roles.png){: .img-responsive .center}

With API's being the new oil in the digital revolution, it was great to see that over 75% of developers were quite conversant with APIs, with most of them preferring RESTful APIs as opposed to SOAP, GraphQL or platform specific SDKs. 

![how well developers understand apis](/assets/images/blog/integrations-survey/conversant.png){: .img-responsive .center}
![api preference](/assets/images/blog/integrations-survey/api_preference.png){: .img-responsive .center}

The majority had already experienced  payment APIs, Social nework API's and cloud services like firebase, with Over 90% of respondents having already done a payment integration. 
It goes without saying that the most popular payment API integrated was MPESA, with three times as many developers having integrated with it than any other payment api.
Surprisingly of the gateways mentioned, the new entrant into payments integration, Africas talking came in top.
It however seemed that there wasn't a consistent featureset to describe what a payment gateway meant.
It might have been a case of comparing apples to oranges. 

![api integrations](/assets/images/blog/integrations-survey/integrated_with.png){: .img-responsive .center}

Given that MPESA probably defined the developer experience in payments integration, the actual journey to integration was quite varied.
![ease of integration](/assets/images/blog/integrations-survey/ease_of_integration.png){: .img-responsive .center}
A majority of the projects were B2C facing projects targeting mainly local customers.

![payment types](/assets/images/blog/integrations-survey/payment_types.png){: .img-responsive .center}
![distribution of clients](/assets/images/blog/integrations-survey/client_distribution.png){: .img-responsive .center}

Over 58% of integrations were direct integrations to MPESA while 35% were integrations via third party services.
It also seems that there is a need for payment aggregators to be more inclusive as over 70% of respondents had needed to integrate with more that one payment gateway for their projects in order to have multiple payment options.
These choices included MPESA, Card (VIsa and Mastercard), Equitel, Pesalink, Airtel and Direct to Bank. Of these, MPESA, Card and Equitel were the most popular respectively. 

![Mpesa](/assets/images/blog/integrations-survey/mpesa_daraja.png){:class="img-responsive center"}

With focus on MPESA, most developers were integrators and aggregators, integrating on behalf of others, although a small group, about 30% were integrating for themselves.
Surprisingly, many of those that were successful had to build their own internal payment gateway to process their payments.
This is a peculiar situation where multiple developers and tech companies are independently investing significant resources in building tech to solve the same exact challenges.
Developers will 2 times out of 3 choose a custom integration with Mpesa over using a payment gateway.
Wonder how much of that is just because developers love 'building from scratch'.
![mode of integration of mpesa]({{site.blog_images_root | append: "integrations-survey/mpesa_integration.png"}}){: .img-responsive .center}
Seems like an opportunity for a payment gateway to license software or a gateway PaaS provider to leverage.
More so because the time to integration varied greatly from a few days to multiple weeks. 

Most developers discovered their payment gateways from referral by partners such as MPESA or friends, as well as through google searches.
![how payment gateways were discovered](/assets/images/blog/integrations-survey/pgw_discovery.png){: .img-responsive .center}
Consequently the top 3 factors that affected the choice of payment gateway for developers was APIs available, Security and Ease of user respectively.
![reasons for choosing a payment gateway](/assets/images/blog/integrations-survey/choice_of_gateway.png){: .img-responsive .center}
Conversely the 3 main put-offs for developers were Bad APIs, Lacking sample code and non existent tech support and difficulty in getting a payment account
![integration challenges](/assets/images/blog/integrations-survey/integration_challenges.png){: .img-responsive .center}

