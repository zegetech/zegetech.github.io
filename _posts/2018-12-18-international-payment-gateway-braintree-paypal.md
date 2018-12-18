---
layout: blog
title: A Developer's Journey on Payment Gateways - BrainTree and Paypal Payments Pro
author: Tom Nyongesa
blog-image: PayPal-and-Braintree.jpg
intro: Paypal and Braintree
---

# [![BrainTree](/assets/images/blog/braintree.png){:class="img-responsive center"}](https://developers.braintreepayments.com/)

This is one of the top international payment gateways. It was recently acquired by Paypal.It accepts both Mobile and Web Payments with a smooth integration for both cases and offers support for various payment ways including PayPal, Cards, Apple Pay, Venmo, Google Pay, Masterpass, Samsung Pay, Visa Checkout, UnionPay and ACH Direct Debit. 

On my developer traversal on Braintree's developer section, I came to find out that they offer a nice documentation and sample codes for you to get started quickly. They do give server SDKs for top languages including Java, .NET, Node.js, PHP, Python & Ruby and client SDKs for languages including Android, Ios and Javascript for Web. They also offer a testing bed for your proof of concept tests. You'll need to create a sandbox account [here](https://www.braintreepayments.com/sandbox). 

From your Sandbox account, you'll need to get your *Merchant Id*, *Public Key* and *private key* for use in your client side code. You'll also need to get a Tokenization key that will authorize your request. This can also be gotten from your sandbox account.

Once you have all these and with the understanding of their documentation, you'll have an easy time to mock a checkout process that creates a transaction on your sandbox account.

You can check out some of the integration examples [here](https://developers.braintreepayments.com/start/example-integrations#repositories).

After a successful integration, check out whether the new transactions have been included in your sandbox account.

# [![Paypal](/assets/images/blog/Paypal.png){:class="img-responsive center"}](https://developer.paypal.com/docs/classic/products/paypal-payments-pro/)

Paypal is a long term big player in the online payments niche. It recently introduced a product dubbed Paypal Payments Pro that allows online merchants to accept payments regardless of whether they have a paypal account or not.

It accepts Payments made through Paypal, phone, mail, fax, Visa, MasterCard®, American Express and Discover.

Paypal provides an easy to follow API documentation for both SOAP and REST APIs. 

To test Paypal Gateway integration, you'll have to sign up for a [sandbox account](https://www.sandbox.paypal.com/bizsignup/). Then, create a paypal App whose credentials will be used to get an access token that will authorize access of secure resources from Paypal's server. 