---
layout: blog
author: Ngari Ndung'u
title: International Payment Gateways - Authorize.Net & SecurionPay
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
