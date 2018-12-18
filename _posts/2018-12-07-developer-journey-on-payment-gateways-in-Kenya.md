---
layout: blog
title: A Developer's Journey on Payment Gateways in Kenya
author: Tom Nyongesa
blog-image: online_payment.jpg
intro: With the rise in use of mobile payment in Kenya, businesses are scrambling to put their houses in order just to keep up with the fast technological pace and the adaption of online payments by Kenyans. Kenyans at large are really interested in the outcome of this - an easy payment interface - forgetting about the process of really getting this done. This process is majorly a developer's task. This is a developer's journey on online payment gateways and their ease of integration.
---
![Payment Gateways](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}
{{page.intro}}



With the multiple payment gateways in Kenya, it will probably be a real hurdle for a Kenyan developer to choose the most optimal payment solution for his problem. When thinking about your choice, the very first thing that would come into your mind is the friction of onboarding - the time it would take you to integrate it to your app. Then, you would probably think of  googling for sample integration codes and reviews  on the internet...you'll think of many other things. I would like to make it easier for you by outlining my analysis on payment gateways in Kenya.

It is an theoritical and technical analysis of the following Payment Gateways, in no particular order:
### [![PesaPal](/assets/images/blog/Pesapal.png){:class="img-responsive center"}](https://www.pesapal.com/)
This is one of the better known payment gateways and has been around for a while. A pesapal wallet allows a merchant to accept payments from mobile money, cards and select mobile banking accounts.
Official plugins are provided for Magento, Shopify and WHMCS. Code samples are provided for .NET and PHP.
The API's main integration method is via page redirection.
An IPN(instant payment notification) endpoint together with related query endpoints are available.
pesapal provides a demo site with both personal and merchant accounts to test integration. Missing direct payment endpoints however, it was not possible to test out the API.
### [![Mpesa](/assets/images/blog/mpesa.jpg){:class="img-responsive center"}](https://developer.safaricom.co.ke/docs)
M-Pesa is a mobile phone-based money transfer, financing and microfinancing service, launched in 2007 by Vodafone for Safaricom.Mpesa recently commercialized their APIs allowing businesses and developers to intergrate their payment services into their various solutions.There exists a documentation for the Mpesa APIs and a sandbox for testing.The documentation is slightly flawed in that the paramenters are not clearly described and one would have to jump a few huddles before getting around them. There are no provided examples for the request parameters which adds to the struggle.The credentials expire in an hour so for testing one would have to constantly renew them.
### [![iPay](/assets/images/blog/ipay-logo.png){:class="img-responsive center"}](https://ipayafrica.com/)
iPay provides mobile money(Mpesa, Airtel and EazzyPay) and credit card integrations.
The API can be consumed either through ‘Web-based integration’ which is the usual redirect or ‘REST API integration’. Plugins for the major CMSs are provided, as well as an android library.
Documentation is provided though it could certainly be done better. The test credentials are not made obvious. I only figured them out while taking a second read through, after my enquiry email went unanswered.
The API requires a HMAC signature be sent along with the payload. With parameters having to be concatenated in a particular order for this to work, it can be more than a slight annoyance.
The shortened parameter names do not help either.
### [![Africa's Talking](/assets/images/blog/africastalking.png){:class="img-responsive center"}](http://docs.africastalking.com/)
Africa's talking provides Restful APIs for integration with their various services. These services include; SMS,voice, Payments,USSD, and Airtime. Our point of focus was mainly their payment services.C2B, B2C, and B2B. The services are offered over mobile, banks and cards. There are client SDKs for PHP, Python, C#, Java, JS, and Ruby. For mobile payments, Africa's talking does the hosting and one needs a dedicated pay bill with Safaricom M-Pesa(application process takes approximately 5 days). They do not offer any other mobile payment services. The bank payment and card payment services are currently only available in Nigeria. The accepted cards are MasterCard and Verve cards. Africa's talking offers a sandbox, a simulator and associated endpoints for testing. On integration one also gets a dashboard on which they can monitor transactions and carry out other maintenance services such as getting credentials for authentication and creating products.[Here's a collection we made for testing on postman](#)
### [![Jambo Pay](/assets/images/blog/jambopay.png){:class="img-responsive center"}](https://www.jambopay.com/)
Jambopay has two ways for integrating with their API; ‘Express Checkout’ and ‘Redirect Checkout’.
Express checkout allows the customer to complete payment within the site while redirect checkout loads a Jambopay provided page to complete payment.
For each a PHP and .NET library are provided. A pdf document in the downloaded zip file is the entirety of the documentation to be found.
Without documentation it was not possible to test out the API.
### [![Sapama Cash](/assets/images/blog/sapama.png){:class="img-responsive center"}](http://sapamacash.com/docs)
Sapama cash supports payments made via Equitel and Mpesa only. 
Getting an account with Sapama Cash can also be a hurdle. However, they provide credentials for their test account which you can use to test out their C2B, B2C and other APIs. Something else about their system once you login with their test credetials is that you are provided with html forms having fields into which you fill in your API parameters and callback urls. I can say that they probably thought of this kind of doing things because of the less tech-savvy individuals, people who are used to html forms. It would make things easier for them and make them less concerned about the kind of language to use when interacting with their APIs. However, their form submit buttons result to error pages. 
They have a documentation that seems easy to follow the only problem being that their endpoints result to error pages that exposes so much information about their system, poor exception handling!
### [![Jenga](/assets/images/blog/jenga.png){:class="img-responsive center"}](https://developer.jengaapi.io/)
I would say Jenga is an all in one payment gateway. It has managed to integrate major payment channels used in Kenya including card payments, Mpesa, PayPal, Amex, Airtel Money, Equitel, bank payments, AliPay, Masterpass. It has also managed to go beyond the borders to countries like Tanzania, South Sudan and Uganda. Having a test account with them enables you to test their APIs for sending money within Equity, sending money across multiple banks via PesaLink, sending money from bank to mobile wallets via PesaLink, perfoming cross-border remittances with SWIFT, performing common account ops like checking account balance, getting an account's full statement; performing utility bill payments, performing loan services like credit worthiness of an individual, airtime purchases etc. 
Another added feature of Jenga System is that you can actually partner with them to become a reseller. I haven't tried this but you are free to give it a try.
The annoying thing about them is the process of getting a testing account with them. It requires one to fill out an application form that won't be responded to immediately. It took them 3 days to actually okay my application and this was after I reached out to them again. Maybe it would have taken more than a month. 
Nevertheless, they have a relatively easy to follow documentation of their APIs and a Postman Collection! They also provide sample credentials on their documentation. You can actually test their APIs with their sample credentials if you don't want to apply for a test account. 
If you need to test the APIs with your test account credentials, you have to authenticate your requests. You have to generate a digital signature using RSA and sign your requests using it. Instructions for this are found on their documentation.

[Jenga Postman Collection](https://documenter.getpostman.com/view/1238477/Rzfnikkt)

### [![Lipisha](/assets/images/blog/lipisha.webp){:class="img-responsive center"}](https://lipisha.com/payments/accounts/index.php/app/launch)
Lipisha is a payment service provider that allows integration through webhooks, popular e-commerce Plugins, and RestAPIs. The details on integration through plugins is not available. The APIs allow integration of mobile and card payment services. The available option for mobile payment services is M-Pesa. The endpoints also allow integration of payout services to clients' mobile wallet.The documentation could be made clearer for all the services Lipisha can provide. They offer a sandbox for testing and the endpoints can be tested manually using postman.
### [![Flutterwave](/assets/images/blog/rave.svg){:class="img-responsive center"}](https://rave.flutterwave.com/)
Also called Rave, the Flutterwave Rave API provides mobile money and card payment integration, with bank integration in Nigeria.
Nodejs and Android SDKs are provided along with plugins for the more popular CMSs.
Documentation for the API is provided, though it can be a bit of a challenge to navigate through.
The main documentation page is focused on quick integration using their javascript library and page embeds, with the reference page giving the fuller outlook of the API.
For testing, a sandbox url is provided, with test credentials, cards, bank accounts and mobile numbers included.
A main gripe with the API is the use of 3DES encryption on their protected endpoints. This makes direct testing with Postman far from easy.
### [![Kopokopo](/assets/images/blog/kopo.png){:class="img-responsive center"}](https://app.kopokopo.com/push_api)
My experience with Kopokopo integration wasn't good. I couldn't create an account with them because of their business requirements. You need to send them copies of your ID and business registration documents for review before trying out their APIs. However, they support RESTful API posts and FTP file serving system - you can setup your own FTP server or use their FTP server. What happens with this kind of FTP system is that K2(KopoKopo) generates csv files having transaction details and sends them to your configured FTP server, you can then parse the csv files however you like.

They support payments in Mpesa, Masterpass and T-Kash. 
### [![Beyonic](/assets/images/blog/beyonic.png){:class="img-responsive center"}](https://beyonic.com/)
Beyonic is focused on mobile money integrations. With their API you can receive money and make payments in Kenya, Uganda, Rwanda, Tanzania and Rwanda.
There are official client libraries for Python, Ruby and PHP with code samples for Java. There is a Woo-Commerce plugin for integrating with Wordpress sites, and beta integration with Zapier.
The API is well documented with helpful pointers for the developer to follow.
At the time of testing, the test environment seemed to be in maintenance. Being unable to load BXC(Beyonic test currency) we couldn’t test the payments endpoints.
It was still possible to test some collection endpoints using the documented test numbers.

### [![Direct Pay](/assets/images/blog/dpo.png){:class="img-responsive center"}](https://www.directpay.online/)
DirectPay formerly known as 3G direct has services spanning across more than 10 countries namely Botswana, Kenya, Namibia, Zambia, Ghana, Mauritius, South Africa, Ethiopia, Malawi, Nigeria, Tanzania, Zanzibar, Zimbabwe, Rwanda and Uganda. I managed to create an account with DPO's platform, inquired whether they have a public API but am still waiting for a response from them. You can try it too, maybe I didn't sound friendly to them.

On a scale of 1-5, here are my findings based on the following features:
- Developer friendly
- Documentation
- Accessibility
- Multiple Libraries
- Testability

| Gateway | Developer friendly | Documentation | Accesibility | Multiple Libraries | Testability| 
|----|----|----|----|----|----|
| Africas Talking | 5| 5| 4 | 3 | 4 |
| Lipisha| 3 | 3 | 4 | 3 | 4 |
| pesapal| 3 | 3 | 4 | 3 | 3 |
| Sapama Cash| 3 | 2 | 2 | 3 | 2 |
| Kopokopo| 1 | 1 | 2 | 1 | 1 |
| Jenga| 4 | 4 | 4 | 4 | 4 |
| Jambopay |1 | 1 | 1 | 1 | 1|
| iPay | 3 | 3 | 2 | 3 | 2 |
| Flutterwave - Rave | 4 | 4 | 4 | 4 | 4 |
| Beyonic | 4 | 4 | 3 | 4 | 3 |
| Direct Pay | - | - | - | - | - | 

Here's a table that shows Payment gateways with and without publicly accessible APIs. I believe this will help you save some time:

| With | Without |
|----|----|
| Jenga | Sapama Cash |
| Flutterwave| Pesapal |
| Africa's Talking| JamboPay |
| iPay| KopoKopo |
| Beyonic| DirectPay |
| Daraja|  |
| Lipisha | |

If there's any other payment gateway in Kenya I've left out, I will add it very as I come across it. 

[Github Repo on the Payment Gateways' collections](https://github.com/tomshy/PaymentGatewaysKe)

Happy development!