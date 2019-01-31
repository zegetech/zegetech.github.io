---
layout: blog
title: He Who is Brave is Free
author: Tom Nyongesa
blog-image: cellulant-brave/brave-6.jpg
intro: We finally got access to cellulant's payment gateway api and wanted to write something about it. Why does it get its own blog post you might ask. Well... because we want to honor the team that gave us this product. The **#brave6** Around the time of the research, Our CEO had been having conversation with Ken Njoroge (Cellulant CEO) as well as Ashon Kuria (Head of products) as we did the research on the Kenya payment gateway ecosystem that was launched on the 14th of January 2019. As interesting as they were, we had then agreed to take things forward and review their product. That response and go ahead came barely 2 hours before the terror attack descended on Riverside. 

---
![Scoping Session](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}

{{page.intro}}

Kariuki Gathitu, Zegetech CEO quickly got into reconnaissance mode as we began checking on Ken, Ash and Denis. At about 9am the next day, he got news that Ashton had been confirmed as a casualty and was no more, barely 12 hours since they last spoke and that Denis had been in the line of fire and was missing. The news that Ken was in Zambia for a team meeting was a great consolation. Time and space gave us no chance to mourn as we  prayed and hoped for the survival of Denis and further information about the rest of the team. Unfortunately, by 6am the next day, Denis was confirmed as a casualty as well. It breaks our heart when one of the members of this great and powerful tech ecosystem is bruised to such great lengths. Beyond the competition and race to the top is camaraderie that can never be taken lightly. Developers work for great tech companies because they represent family, dreams and ambitions, and Ashton could just as well been in the zegetech team, or safaricom or craftsilicon. Indeed some developer have worked with or for all these three organizations and more. They are ours. 

![Mula](/assets/images/blog/cellulant-brave/mula1.png){:class="img-responsive center"}

As the head of products , Ashton left his DNA within the work that he did, most notably [Mula](https://shops.mula.africa/site/). Denis was tasked with security, a critical factor in any payment application. Jeremiah headed cellulant hub managing the success of projects undertaken and Kelvin worked with him closely. Wilfred played a hand together with other in testing the mula project as they implemented the project. So for that, it is fitting to review their greatest and most unfortunately their last pieces of art they gave to the world, that is growing and changing lives everywhere. We salute the team, ongoing with this product as well as the dearly fallen heroes , Ash, Denis, Jeremiah, John, Kelvin and Wilfred who paid the highest price for living out their passion. 

Mula is an innovative payment gateway developed by [Cellulant](https://www.cellulant.com/) that helps users to pay their daily bills and merchants accept payment on their online stores across 33 countries. That's relatively huge to cover in Africa. More countries to be added! 

For online merchants, you would be thrilled to use this product. It provides a quick setup instructions on how to integrate its checkout gateway with ease. My trial mode with Mula made me appreciate the great artistic work that the #brave6 had put in work in liason with the other team members at Cellulant, great UI, great and easy to follow documentation, sample PHP codes to give you a jumpstart and varied payment options to select including Mpesa, Airtel Money, Equitel, Visa Card, Mastercard and a range of select banks in Kenya. It also gives you a nice dashboard to help you keep track of the daily activities on your shop with notifications sent on each and every activity. 

Once your shop is setup successfully, you'll be provided with various keys that will be used during integration of the checkout gateways. Its Checkout Gateway API is RESTful that uses oauth2 protocol to grant your requests access to their system. You'll use your provided client_id and client_secret you can access from your shop dashboard to request for access token, that expires in a minute, to make your subsequent API requests. The 60s life time of the token may be a real pain especially when testing out the request manually because you'll be required to regenerate a new access token even before you get the request parameters for a request. 

Integrating express checkout requires you to use their provided js client SDK that will render a 'pay with mula' button on your shop, which when clicked will send the order's details including the customers details to a server side for encryption before sending the payload back to mula's system. You'll be required to implement the server side encryption on your own. The good thing is that they've provided a sample encryption code in their documentation. The encrypted payload is then transferred to the mula system to now initiate the debit on customers wallet. Relevant instructions are provided according to the payment method selected. On success, the customers are redirected back to your shop. You can then request for the status of the checkout made, acknowledge the payments or initiate a refund via the provided endpoints.

Mula dashboard provides a means of simulating the checking out process easily to enable you to get a feel of the customer experience when on the real checkout page. This comes in handy when you are just on a test escapede that doesn't involve sending of real $$. 

However, I noticed broken links or rather links that led to a dead end. Also, you may have challenges while testing their Express Checkout Gateway because of the inaccessibility of its documentation. Contacting their support team should help you get the documentation.

[Mula Postman Collection](https://documenter.getpostman.com/view/1238477/RztivWYY)

Kudos to the #brave6 and to Cellulant team at large. We pray that may the good Lord rest their souls in eternal peace! 

In case you missed the review on [Kenyan Payment gateways](2019-01-14-payment-gateways-Kenya.md) we did a while ago, jump to it right away. Also, [here](2019-01-22-payment-gateways-global.md) is our review on major payment gateways globally.

If you'd like us to review your payment gateway if we missed it or any other payment related or enterprise system, hit us up on twitter [@zegetech](https://twitter.com/zegetech) and we'll do our best to take it for a spin.