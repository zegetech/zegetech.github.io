---
layout: blog
title: Kenya Payments Integration Survey
date: 2019-02-28 10:36 +0300
categories: developer 
published: false
author: "@zegetech"
blog-image: integrations-survey/payments.png
intro: | 
  We recently ran a survey within the developer community in Kenya, with the aim of understanding the state of the payment integrations ecosystem.
  We wanted to find out the pains(and joys) that developers go through while integrating payments in Kenya.
  We promised to release the results back to the community to hopefully help move us all a step forward.
  If you find a place where we might have let our biases slip through, please be sure to call us out.
---

![stacked colored coins](/assets/images/blog/{{page.blog-image}})

{:.image-attribution}
Photo by Ibrahim Rifath on Unsplash

{{page.intro}}

# Our respondents
![developer types](/assets/images/blog/integrations-survey/developer_types.png)

Nothing out of the expected here, would have been surprised if more of our respondents were front-end developers.
It is at least a little interesting that most of the developers identified as fullstack developers.

![developer roles](/assets/images/blog/integrations-survey/developer_roles.png)

Looks like everyone dabbles in the dark arts, regardless of their job title.

![how well developers understand apis](/assets/images/blog/integrations-survey/conversant.png)

Willing to back their knowledge in APIs.

![api integrations](/assets/images/blog/integrations-survey/integrated_with.png)

With an estimated 143 total API integrations. However, the integration process isn't always straight forward.
Only 7 of the respondents called the process 'easy' with a majority having at least a complaint or two.

![ease of integration](/assets/images/blog/integrations-survey/ease_of_integration.png)

# The Integrations
Particular to the APIs integrated with, we asked developers what they loved most about the APIs.
While for a significant portion(28%) nothing set their hearts aflutter, the rest did have something nice to say, maybe.

![what developers loved](/assets/images/blog/integrations-survey/what_stood_out.png)

We also asked what mostly influenced the choice of payment gateway.
Security, ease of use and added functionality such as bulk SMS were the 3 most mentioned influences followed by pricing.
![reasons for choosing a payment gateway](/assets/images/blog/integrations-survey/choice_of_gateway.png)

So, what are our payment gateways not doing right? What do developers struggle with?
![integration challenges](/assets/images/blog/integrations-survey/integration_challenges.png)
Guess the top complaint was always going to be a little obvious, API documentation could be better.
Combine that with the lacking technical support and no sample code and you start to wonder how we have integrations at all.
What is a bit of a wonder is that difficulty in getting an account featured so many times.

# Integration with Mpesa
We asked developers if they had integrated with Mpesa, and if so, whether they had rolled their own integration or used a payment gateway.
We followed that up by asking how much time it had taken to go live.
![mode of integration of mpesa]({{site.blog_images_root | append: "integrations-survey/mpesa_integration.png"}})
Developers will 2 times out of 3 choose a custom integration with Mpesa over using a payment gateway.
Wonder how much of that is just because developers love 'building from scratch'.

![weeks taken to go live with mpesa]({{site.blog_images_root | append: "integrations-survey/time_to_live.png"}})
This suggests that the difference between rolling your own integration and using a payment gateway is a matter of days.
The data however varied widely with a minimum of a week and a maximum of 16 weeks for those who built custom solutions.
In comparison, the maximum indicated for using a payment gateway was 6 weeks.
On closer inspection, where a time greater than 10 weeks was indicated, the project was either B2B or B2B2C.
This reflects the extra work required when dealing with business accounts.

Finally, we asked developers how they found out about the gateways they integrated with.
![how payment gateways were discovered](/assets/images/blog/integrations-survey/pgw_discovery.png)

Information provided directly by the provider was the main source followed closely by referrals and the good old google search.

