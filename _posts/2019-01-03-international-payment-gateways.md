---
layout: blog
author: Ngari Ndung'u
title: International Payment Gateways
intro:
---

<a href="https://www.authorize.net/">
![Authorize.Net logo](https://www.authorize.net/etc/clientlibs/anet/main/fonts/anet-logo-white.svg){: style="background:linear-gradient(180deg, #4f90bd, #2f5571);padding:1em;" .img-responsive}
</a>

Authorize.Net is a subsidiary of Visa and has been in existence since 1996. Through it a merchant can accept card payments from Visa, MasterCard and American Express.
It also has PayPal, Apple Pay and E-check integrations.

Authorize.Net provides both hosted integration, through javascript and mobile SDKs, and direct API integration options. 
SDKs are provided for PHP, Ruby, Java, C#, Python, Node, Android and iOS to ease integration.
Their API, which is not REST based supports both JSON and XML requests, with JSON elements being translated to their XML equivalents.
One gotcha is that the API has just a [single endpoint(testing)](https://apitest.authorize.net/xml/v1/request.api). 
The *endpoint*(functionality) is determined by the root of your json/xml body:
~~~json
{
  "createTransactionRequest": {
    "merchantAuthentication": { ... },
    "refId": "12345",
    "transactionRequest": {
      "transactionType": "authCaptureTransaction",
      "amount": "5",
      "payment": {
        "creditCard": { ... }
      }
    }
    ...
  }
}
~~~
This makes the json more verbose compared to *normal* REST APIs.
The API is well documented and can be wholly tested on the [API reference page](https://developer.authorize.net/api/reference/).
The reference also has sample code that can easily be copied into your application.
Much of Authorize.Net functionality is available via the API including card mobile, Visa and Paypall Express payments, fraud management, recurrent billing and customer management.

<a href="https://securionpay.com/">
![SecurionPay logo](https://securionpay.com/wp-content/uploads/2017/11/logo_v_rich.png){:.img-responsive .center}
</a>

SecurionPay provides payment services for businesses within the EU with support for high-risk businesses.
It supports major cards, including Visa, MasterCard and American Express. Supporting services include customer and card management and support for subscription based businesses.

SecurionPay has a full featured API giving access to the full dashboard functionality. The API is REST based and uses JSON for requests.
An account is easy to get, even when registering from an unsupported country, with the *test-mode* account providing the necessary details for API authentication.
The [reference documentation](https://securionpay.com/docs/api#introduction)is well structured and thorough with sample requests and responses.

[Test cards](https://securionpay.com/docs/testing) are provided for testing successful, errant and fraudulent charge scenarios.
The fully featured dashboard gives a feel of the functionality offered for a live account.
What I found a bit strange is that the API uses basic authentication, with the *API Secret Key* being passed as the username and with a blank password.
The API is overall easy to test and things just work.

<a href="https://www.visa.co.ke/">
![Visa logo](https://www.visa.co.ke/content/dam/VCOM/Brand/logo-footer.png){:.img-responsive .center}
</a>

> We are a global payments technology company working to enable consumers, businesses, banks and governments to use digital currency.

Chances are if you don't have a visa branded credit/debit card now, you've probably held one before.
Being the first(and largest?) card network, Visa has an advertised presence in over 200 territories, enabling fast payments across them regardless of the cardholders local currency.

With visa being more of a payment processor than a payment gateway, it offers a wide range of APIs catering to their varied clientelle.
There are APIs for use by merchants, card issuing banks, acquiring banks(enable merchants to be paid) and for use by individual developers.
The APIs are available to test with a visa developer account.

Once you register and verify a visa developer account, the normal flow for testing an API is;
- create a project and select the api(s) to test, 
- download the generated private key, 
- download the client certificate,
- configure your client(Postman,soapUI...) for mutual ssl with downloaded key/certificate pair,
- make API calls using basic authentication with the *User ID* and password provided within the project sandbox.

Visa makes using SSL somewhat easier by automating the process of obtaining the private key and certificate.
This in the usual case would require generating a private key using OpenSSL for example, and making a CSR(Certificate Signing Request) to obtain the certificate.
Visa includes instructions for setting up soapUI for SSL and has a `/helloworld` endpoint for verifying that it works.
The key and certificate can be used directly in Postman by following the instructions [here](https://learning.getpostman.com/docs/postman/sending_api_requests/certificates/).

Visa has 3 APIs for payments, *Visa Direct*, *Visa Checkout* and *CyberSource Payments*. 
Visa direct and CyberSource payment APIs can be used with other visa APIs while the Checkout API can only be used on its own. Visa Checkout also has limited availability.

I tested the Visa Direct API which has endpoints for funds transfer, watchlist screening, query, aliases(store and retrieve customer data), mVisa and funds reversal.
Test data is provided within the project sandbox, with the API reference providing usable sample request and response bodies.
The api accepts both json and xml request bodies and by default responds sends an xml response. You can pass an *Accept* header with `application/json` as the value to get back a json response.

Besides the payment APIs, visa has the following API categories:
  - ID Intelligence - for user identification
  - Data and Analytics
  - Risk and Fraud - validate accounts, tokenization and data protection
  - Trials - simulations
  - Commercial - B2B and business data
  - Visa DPS(Debit Processing Services)
  - Offers and Benefits - run offers and promotions for card holders

# [![BrainTree](/assets/images/blog/internationalPGs/braintree.png){:class="img-responsive center"}](https://developers.braintreepayments.com/)

This is one of the top international payment gateways. It was recently acquired by Paypal.It accepts both Mobile and Web Payments with a smooth integration for both cases and offers support for various payment ways including PayPal, Cards, Apple Pay, Venmo, Google Pay, Masterpass, Samsung Pay, Visa Checkout, UnionPay and ACH Direct Debit. 

On my developer traversal on Braintree's developer section, I came to find out that they [do not provide a public REST API for consumption](https://www.braintreepayments.com/blog/when-rest-isnt-good-enough/). However, they offer a nice documentation and sample codes on client and server SDKs for you to get started quickly. They do give server SDKs for top languages including Java, .NET, Node.js, PHP, Python & Ruby and client SDKs for languages including Android, Ios and Javascript for Web. They also offer a testing bed for your proof of concept tests. You'll need to create a sandbox account [here](https://www.braintreepayments.com/sandbox). 

From your Sandbox account, you'll need to get your *Merchant Id*, *Public Key* and *private key* for use in your client side code. You'll also need to get a Tokenization key that will authorize your request. This can also be gotten from your sandbox account.

Once you have all these and with the understanding of their documentation, you'll have an easy time to mock a checkout process that creates a transaction on your sandbox account.

You can check out some of the integration examples [here](https://developers.braintreepayments.com/start/example-integrations#repositories).

After a successful integration, check out whether the new transactions have been included in your sandbox account.

# [![Paypal](/assets/images/blog/internationalPGs/Paypal.png){:class="img-responsive center"}](https://developer.paypal.com/docs/classic/products/paypal-payments-pro/)

Paypal is a long term big player in the online payments niche. It recently introduced a product dubbed Paypal Payments Pro that allows online merchants to accept payments regardless of whether they have a paypal account or not.

It accepts Payments made through Paypal, phone, mail, fax, Visa, MasterCard®, American Express and Discover.

Paypal provides an easy to follow API documentation for both SOAP and REST APIs. 

To test Paypal Gateway integration, you'll have to sign up for a [sandbox account](https://www.sandbox.paypal.com/bizsignup/). Then, create a paypal App whose credentials will be used to get an access token that will be used to authorize access to secure resources on Paypal's server. 

[Paypal Postman Collection](https://documenter.getpostman.com/view/1238477/RzfnkSKR)

In comparison to the local payment gateways, I would say that international Payment gateways are better in terms of developer onboarding, documentation, security handling, payment method support, platform support and testing.

![stripe logo](/assets/images/blog/internationalPGs/stripe.png){:class="img-resposive center"}

Stripe is an online platform that offers online transactions management services. The services offered include [payment](https://stripe.com/docs/quickstart), [billings](https://stripe.com/docs/billing/quickstart), [sigma](https://stripe.com/docs/sigma), [issuing](https://stripe.com/docs/issuing) and [Terminal ](https://stripe.com/docs/terminal) among others. Our main focus being the payment service.

Stripe allows merchants to accept payments on both web and mobile apps. Stripe supports a range of payment methods, card payments from Visa, Mastercard, AmericanExpress, Discover, and JCB. Stripe also supports other payment methods such as [ACH debits](https://en.wikipedia.org/wiki/Automated_clearing_house), [Apple Pay](https://www.apple.com/apple-pay/), and [Google Pay](https://pay.google.com/about/). Integration is made easy by the availability of a number of options for both developers and non-developers. For non-developers, Stripe offers a number of pre-built platforms, plugins, and extensions to allow integration without writing code. For developers, Stripe offers a number of officially supported API libraries for most common languages, Python, Ruby, PHP, Java, Node, Go and .NET.

The Stripe payment API is restful, centered around intuitive objects such as Account, Charge, Customer, Refund, and Transfer. The API responses are returned in JSON format. The Stripe API has a number of interesting features, Idempotency and cross-origin resource sharing support being the most notable ones.
The API is well documented and can be tested by using one's preferred tool.

To get started the Stripe API, one has to create an account with Stripe. API keys for both test and live mode are managed in the account's dashboard.

Pricing is on a pay-as-you-go basis, 2.9%  + 30¢ per successful card charge.