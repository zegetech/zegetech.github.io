---
layout: blog
title: Are global payment gateways all that... and more
categories: developer, payments
author: Ngari Ndung'u, Tom Nyongesa, Melvin Atieno
blog-image: internationalPGs/online_payment.jpg
intro: Previously we went out and tested the popular [Kenyan payment gateways](/blog/2018/14/07/payment-gateways-Kenya.html). We looked into the methods of payment they allowed, and the integration options they offered. We paid special attention to the APIs, their documentation and general usability. To kick off this year, we went global!  Yes, we looked into popular international payment gateways, Visa and Mastercard integration. With developers in mind, we set out to see what these platforms have to offer and how they offered it. Here’s what we found.
---
![online payment](/assets/images/blog/{{page.blog-image}}){:class="img-resposive center"}

{{page.intro}}

 If a great, ideal, API existed, what would it look like? What would it have to offer in terms of security, usability, and standards? This was the motivation behind the research on the [kenyan payment gateways](2019-01-14-payment-gateways-Kenya.md). Since we are in the globalization era, It would be wrong to not look into what the rest of the world had to offer. So we did. We looked into the different international payment gateways, their standards, and how do they compare to each other? We will let you decide how the Kenyan payment gateways compare.

# PAYMENT GATEWAYS.

## 1. [Authorize.Net](https://www.authorize.net/)

Authorize.Net is a subsidiary of Visa and has been in existence since 1996. Through it a merchant can accept card payments from Visa, MasterCard and American Express.
It also has PayPal, Apple Pay and E-check integrations.

[![Authorize.Net](/assets/images/blog/internationalPGs/authorize.jpg)](https://www.authorize.net/)
{:.image-responsive .center}

Authorize.Net provides both hosted integration, through javascript and mobile SDKs, and direct API integration options. 
SDKs are provided for PHP, Ruby, Java, C#, Python, Node, Android and iOS to ease integration.
Their API, which is not REST based supports both JSON and XML requests, with JSON elements being translated to their XML equivalents.
One gotcha is that the API has just a [single endpoint(testing)](https://apitest.authorize.net/xml/v1/request.api). 
The *endpoint*(functionality) is determined by the root of your json/xml body:
```json
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
```
This makes the json more verbose compared to *normal* REST APIs.
The API is well documented and can be wholly tested on the [API reference page](https://developer.authorize.net/api/reference/).
The reference also has sample code that can easily be copied into your application.
Much of Authorize.Net functionality is available via the API including card mobile, Visa and Paypall Express payments, fraud management, recurrent billing and customer management.

## 2. [SecurionPay](https://securionpay.com/)

SecurionPay provides payment services for businesses within the EU with support for high-risk businesses.
It supports major cards, including Visa, MasterCard and American Express. Supporting services include customer and card management and support for subscription based businesses.

[![SecurionPay](/assets/images/blog/internationalPGs/securion.png)](https://securionpay.com/)
{:.image-responsive .center}

SecurionPay has a full featured API giving access to the full dashboard functionality. The API is REST based and uses JSON for requests.
An account is easy to get, even when registering from an unsupported country, with the *test-mode* account providing the necessary details for API authentication.
The [reference documentation](https://securionpay.com/docs/api#introduction)is well structured and thorough with sample requests and responses.

[Test cards](https://securionpay.com/docs/testing) are provided for testing successful, errant and fraudulent charge scenarios.
The fully featured dashboard gives a feel of the functionality offered for a live account.
What I found a bit strange is that the API uses basic authentication, with the *API Secret Key* being passed as the username and with a blank password.
The API is overall easy to test and things just work.

## 3. [BrainTree](https://www.braintreepayments.com/)

This is one of the top international payment gateways. It was recently acquired by Paypal. It accepts both Mobile and Web Payments with a smooth integration for both cases and offers support for various payment channels including PayPal, Cards, Apple Pay, Venmo, Google Pay, Masterpass, Samsung Pay, Visa Checkout, UnionPay and ACH Direct Debit. 

[![BrainTree](/assets/images/blog/internationalPGs/braintree.png)](https://developers.braintreepayments.com/)
{:.image-responsive .center}

Braintree [does not provide a public REST API for consumption](https://www.braintreepayments.com/blog/when-rest-isnt-good-enough/). However, it offers a nice documentation and sample codes on client and server SDKs. The SDKs are provided based on top languages Java, .NET, Node.js, PHP, Python & Ruby and client SDKs for languages including Android, Ios and Javascript for Web. They also offer a testing bed for your proof of concept tests.The sandbox account is created [here](https://www.braintreepayments.com/sandbox). 

For request authorization, the *Merchant Id*, *Public Key* and *private key* are all obtained in the sandbox.
Integration examples [here](https://developers.braintreepayments.com/start/example-integrations#repositories).
After a successful integration, check out whether the new transactions have been included in your sandbox account.

## 4. [PayPal Payments Pro](https://developer.paypal.com/docs/classic/products/paypal-payments-pro/)

Paypal is a long term big player in the online payments niche. It recently introduced a product dubbed Paypal Payments Pro that allows online merchants to accept payments regardless of whether they have a paypal account or not.

[![Paypal](/assets/images/blog/internationalPGs/paypal.png)](https://developer.paypal.com/docs/classic/products/paypal-payments-pro/)
{:.img-responsive .center}

It accepts Payments made through Paypal, phone, mail, fax, Visa, MasterCard®, American Express and Discover.
Paypal provides an easy to follow API documentation for both SOAP and REST APIs. 
To test Paypal Gateway integration, one needs to sign up for a [sandbox account](https://www.sandbox.paypal.com/bizsignup/), create a paypal App whose credentials will be used to get an access token that will be used to authorize access to secure resources on Paypal's server. 

[Paypal Postman Collection](https://documenter.getpostman.com/view/1238477/RzfnkSKR)


## 5. [Stripe](https://stripe.com/)

Stripe is an online platform that offers online payment processing services. Stripe offers a wide range of services that support payment processing. These services are; [billings services](https://stripe.com/docs/billing/quickstart), [connect,(for third party integration)](https://stripe.com/connect), [sigma (for stripe data analysis)](https://stripe.com/docs/sigma), [issuing, (for creating, issuing, and management of virtual payment cards)](https://stripe.com/docs/issuing) and [Terminal ](https://stripe.com/docs/terminal).

![stripe logo](/assets/images/blog/internationalPGs/stripe.png)
{:.img-responsive .center}

Stripe allows merchants to accept payments on both web and mobile apps. Stripe supports card payments from Visa, Mastercard, AmericanExpress, Discover, and JCB. Stripe also supports other payment methods such as [ACH debits](https://en.wikipedia.org/wiki/Automated_clearing_house), [Apple Pay](https://www.apple.com/apple-pay/), and [Google Pay](https://pay.google.com/about/). Integration is made easy by the availability of a number of options for both developers and non-developers. For non-developers, Stripe offers a number of pre-built platforms, plugins, and extensions to allow integration without writing code. For developers, Stripe allows direct integration with thier API. For mobile apps, Stripe offers integration support through SDKs for IOS and Android devices. For web apps, Stripe offers SDKs in most popular programming languages such as; Python,Ruby, PHP, Java, Node, Go and .NET. 

The Stripe payment API is restful, centered around intuitive objects such as Account, Charge, Customer, Refund, and Transfer. The API responses are returned in JSON format. The Stripe API has a number of interesting features, Idempotency and cross-origin resource sharing support being the most notable ones.
The API is well documented and can be tested by using one's preferred tool.

To get started the Stripe API, one has to create an account with Stripe. API keys for both test and live mode are managed in the account's dashboard. Pricing is on a pay-as-you-go basis, 2.9%  + 30¢ per successful card charge.

## 6. [Pay U](https://www.payu.co.za/)

PayU is an online payment gateway that allows merchants to make and receive payments.
For integration, Pay U offers plugins for common web frameworks such as Joomla and Wordpress, a customizable page redirect and direct integration through their API.
Pay U does not provide SDKs for popular mobile platforms, Windows, iOS, and Android.

![Pay U logo](/assets/images/blog/internationalPGs/payu.jpg)
{:.img-responsive .center}

The Pay U API is SOAP. The requests and the responses are XML based.
A test environment is provided for testing with test credentials that are provided on the [test credentials page](https://help.payu.co.za/display/developers/Test+Credentials).

PayU supports major payment methods, credit cards, cheque cards and Electronic Funds Transfers (EFTs).
It offers a range of supporting services including Fraud Management, Business funding and consumer funding.


# MASTER AND VISA CARD

## 1. [Visa](https://www.visa.co.ke/)

> We are a global payments technology company working to enable consumers, businesses, banks and governments to use digital currency.

[![Visa](/assets/images/blog/internationalPGs/visa.png)](https://www.visa.co.ke/)
{:.img-responsive .center}

Chances are if you don't have a visa branded credit/debit card now, you've probably held one before.
Being the first(and largest?) card network, Visa has an advertised presence in over 200 territories, enabling fast payments across them regardless of the cardholders local currency.

With visa being more of a payment processor than a payment gateway, it offers a wide range of APIs catering to their varied clientelle.
There are APIs for use by merchants, card issuing banks, acquiring banks(enable merchants to be paid) and for use by individual developers.
The APIs are available to test with a visa developer account.

Visa has the following API categories:
  - Payments
  - ID Intelligence - for user identification
  - Data and Analytics
  - Risk and Fraud - validate accounts, tokenization and data protection
  - Trials - simulations
  - Commercial - B2B and business data
  - Visa DPS(Debit Processing Services)
  - Offers and Benefits - run offers and promotions for card holders

Visa has 3 APIs for payments, [*Visa Direct*](https://developer.visa.com/capabilities/visa_direct/docs), [*Visa Checkout*](https://developer.visa.com/capabilities/visa_checkout/docs) and [*CyberSource Payments*](https://developer.visa.com/capabilities/cybersource/docs). 
- Visa direct is meant for use by licensed Visa acquirers(bank/financial institution) or entities sponsored by an acquirer. The API enables real-time push payments directly onto Visa cards.
- CyberSource payments is a solution for merchants to process payments from multiple debit and credit cards with global availability.
- Visa Checkout is available in select countries and supports Visa, MasterCard, American Express and Discover cards. It provides simple website integration via a javascript library and mobile integration via iOS and android SDKs. 

The Visa Direct API has endpoints for funds transfer, watchlist screening, query, aliases(store and retrieve customer data), mVisa and funds reversal.
The API is secured via two-way SSL/mutual SSL authentication.
Once you register and verify a visa developer account, the normal flow for testing the API is;
- create a project and select the api(s) to test, 
- download the generated private key, 
- download the client certificate,
- configure your client(Postman,soapUI...) for mutual ssl with downloaded key/certificate pair,
- make API calls using basic authentication with the *User ID* and password provided within the project sandbox.
Visa makes using SSL somewhat easier by automating the process of obtaining the private key and certificate.
This in the usual case would require generating a private key using OpenSSL for example, and making a CSR(Certificate Signing Request) to obtain the certificate.
Visa includes instructions for setting up soapUI for SSL and has a `/helloworld` endpoint for verifying that it works.
The key and certificate can be used directly in Postman by following the instructions [here](https://learning.getpostman.com/docs/postman/sending_api_requests/certificates/).

Test data is provided within the project sandbox, with the API reference providing usable sample request and response bodies.
The api accepts both json and xml request bodies and by default sends an xml response. An *Accept* header with `application/json` as the value can be passed to get back a json response.

## 2. [Master card]()

Mastercard is one of the master players in the card payment industries. It has been around for about 5 decades.

A quick look at Mastercard Payment APIs really shows how quickly one can get up and running with little hustle and enhanced security - you don't have to spend time on how to handle security, Mastercard does that for you leaving you with the focus on building your product. So, to the APIs.

[![Mastercard](/assets/images/blog/internationalPGs/mastercard.png)](https://developer.mastercard.com/)
{:.img-responsive .center}

Apart from Payment APIs, Mastercard also provides security APIs and Data Services APIs. Data services apis generate insights from Mastercard's data while Security apis lets you leverage Mastercard's cybersecurity technologies to help curb fraud, reduce risks and improve user experience.

The focus was on Payment APIs. Mastercard provides multiple Payment APIs including Masterpass APIs, Bill Payment Vlidator APIs, Send APIs, Mastercard merchant QR APIs just to name a few. We decided to test out the [Masterpass API](https://developer.mastercard.com/documentation/masterpass-merchant-integration-v7).

The Masterpass API allows a seamless checkout on a merchant's site without having the consumers keying in their card details. Its integration is relatively simple.

 Mastercard provides an easy to follow documentation that outlines the mobile and web integration guidelines. It provides client SDKs and Server SDKs that are simple to use. To get started, one has to simply to create a sandbox account. However, the sandbox account sign up process was in a mess as of this writing. A bit of contact had to be made before getting started.

Mastercard handles the security allowing integrators to focus on their product. The security is handled using a technology, DSRP - Digital Secure Remote Payments and DTVC - Dynamic Token Verification code. DSRP is an EMV-based technology that stores consumer's card information in cryptograms that are transported alongside the transactions. Instead of the merchant capturing the card number, a 16-digit token is passed to the merchant application. This helps in reducing consumer's account compromise. In DTVC, a CVC2 value and month/year values are generated by Masterpass which are then used by the merchant instead of the real CVC2 and month/year values in the transaction message. For more on this [click here](https://developer.mastercard.com/page/masterpass-dsrp-and-tokenization).

Here's a summary:

| |Geographical availability|Target Users|Authentication|Integration options|Tokenization?|API Design|Data Format|
| --- | --- | --- | --- | --- | --- | --- | --- |
| Authorize.Net | global | merchants | Basic - login ID and transaction key passed in request body | API, SDKs(mobile, java, php, ruby...) | Yes | SOAP | XML/JSON |
| SecurionPay | EU | merchants | Basic | API, checkout, SDKs(java, python, node...) | Yes | REST | JSON |
| Visa Direct | global | acquirer/acquirer sponsored entity | Basic | API | No | REST | XML/JSON |
| CyberSource Payments | global | merchants | API Key - Shared secret(x-pay-token) | API | Yes | REST | JSON |
| Visa Checkout | select countries | merchants | x-pay-token | js, iOS and android SDKs | Yes | N/A | N/A |
| Paypal | select countries | merchants, individuals | oauth 2.0 | js, iOS and android SDKs | Yes | REST,SOAP |JSON/XML |
|stripe| EU | merchants| HTTP Basic Auth. | API, checkout, SDKs | Yes | REST |JSON
|payU | select countries |merchant |WS-Security |Page redirect, checkout, API | No | SOAP | XML |
|Braintree | select countries |merchant |Token auth |SDKs| Yes | N/A | XML/JSON |
|Mastercard | global |merchant, acquirer | oauth 1.0a |SDKs, checkout | Yes | N/A | N/A |
{:.table}
