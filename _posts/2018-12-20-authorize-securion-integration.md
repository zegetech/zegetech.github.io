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

<a href="https://www.visa.co.ke/">
![Visa logo](https://www.visa.co.ke/content/dam/VCOM/Brand/logo-footer.png){:.img-responsive .center}
</a>

> We are a global payments technology company working to enable consumers, businesses, banks and governments to use digital currency.

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

Visa direct and CyberSource payment APIs can be used with other visa APIs while the Checkout API can only be used on its own.

| | Geographical availability | Target Users | Authentication | Integration options | Tokenization |
| --- | --- | --- | --- | --- | --- |
| Visa Direct | global | acquirer/acquirer sponsored entity | Basic | REST | No |
| CyberSource Payments | global | merchants | API Key - Shared secret(x-pay-token) | REST | Yes |
| Visa Checkout | select countries | merchants | x-pay-token | js, iOS and android SDKs | Yes |

<br/>
I tested the Visa Direct API which has endpoints for funds transfer, watchlist screening, query, aliases(store and retrieve customer data), mVisa and funds reversal.
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
The api accepts both json and xml request bodies and by default sends an xml response. You can pass an *Accept* header with `application/json` as the value to get back a json response.


