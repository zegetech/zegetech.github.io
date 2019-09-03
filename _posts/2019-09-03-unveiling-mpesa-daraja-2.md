---
layout: blog
title: Unveiling MPESA Daraja 2.0
date: 2019-09-03 13:08 +0300
categories:
published: true
author: Tom Nyongesa
blog-image: daraja-2/daraja1.png
intro: MPESA has just unveiled their new API, Daraja 2.0. It has been hailed as the height of developer heaven with its crisp clear structure, solid security and great syntax. Simply put, It's BEAUTIFUL..... Same reliability of G2 SOAP API, accessibility of Daraja 1.0, simplicity of Stripe API and Security of Visa! Bravo!!!
---

![daraja](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}<br>
{{page.intro}}

This never happened, Mpesa haven't launched a new API. What if they did? What would it mean? What would it be like? Would it be the perfect product? "Perfect" here doesn't mean that [Daraja](https://developer.safaricom.co.ke/apis) is imperfect. A lot of developers in the Fintech space have integrated with Daraja REST API with a handful having integrated with G2 SOAP API. The legacy G2 SOAP API excels over Daraja in reliability. However, if falls short in everything else because its SOAP. It's hard to grasp ;-)

![daraja](/assets/images/blog/daraja-2/soap_spongebob.gif){: .img-responsive .center}

To solve this the MPESA team embarked on transforming it to a REST API using the API proxy gateway from Google, [Apigee Edge](https://cloud.google.com/apigee/). Great move! And Daraja was born

![daraja](/assets/images/blog/daraja-2/daraja.jpg){: .img-responsive .center}

Daraja has been in existence for a while now and working relatively well albeit with a few nerve-racking shortcomings. Our recent release of the Kenyan Payment Integration survey solidifies feeling. The [survey exposes](2019-03-21-payments-kenya.md) the fact that the current Daraja API has got poor documentation, lacks sample integration codes, has an unreliable test bed, has an unusual security implementation and most of all an overbearing onboarding process. It's not a walk in the park integration with Daraja. There's even a community organised [telegram group](https://t.me/payments_api) just for singing kumbaya around a fire telling payment integration horror stories!!

![ease of integration](/assets/images/blog/daraja-2/ease_of_integration.png){: .img-responsive .center}

Can it be better? Is it even possible to improve on it? Can we make it simpler? Yes, a strong **YES**. But simple isn't simple enough unless we put it into context and define what simple really embodies.

## The Pain of integrating APIs

Looking back at the [Payment survey](2019-03-21-payments-kenya.md) and [Payment gateways in Kenya](2019-01-14-payment-gateways-Kenya.md), the main challenges experienced by the community while integrating Payments can be summarized as the following:

1. Lack of Documentation and sample code
2. Lack of testing platforms (widely known as sandboxes)
3. Lack of standardization
4. Poor Security
5. Long frustrating onboarding process
6. Reliability
7. Lack of technical support (customer support)
8. Asynchorous communication architecture

Simplicity simply means addressing these issues. Let's do that! Let's try and design a beautiful Daraja API that's easy to use, standardized, secure, easy to connect to, consistent in terms of data formats and naming and one with self descriptive requests and responses.

### Design

Since APIs are mostly developed for use by others, it is strongly recommended that a standardized and widely accepted format should be followed. The standardization should dictate naming conventions, data formats, payload structure and protocols.

It's also evident from the Payments survey that more than 90% of the developers interviewed prefer using REST APIS to SOAP or GraphQL. In 2019, REST and standardization can never be in the same paragraph without mentioning JSON and JSONAPI.

JSONAPI is a widely adopted API format or specification that specifies how a client should request for a resource and conversely how a server should respond with resources. The beauty of JSONAPI is that it excels at readability, flexibility and discoverability and greatly improves on efficiency by minimizing the number of requests and responses sent between the clients and the server. Daraja 2.0 should definitely comply with JSONAPI format.

Here's more on [why we think JSONAPI is great](2019-08-22-json-api-format.md) and if you are interested, check out our deep dive into [API building](2018-12-08-api-dive.md) and a few top [API design tools](https://openapi.tools/).

Lastly, an API in 2019 would need to be synchorous between request and final response. MPESA G2 and Daraja is Asynchronous (using callbacks for responses), with a message broker acting as the interface between developer and MPESA. This adds further complexity in implementing solutions to fully take advantage of the API. We understand that Daraja being a proxy to G2 has this limitation, but hey, cant help a dev from dreaming!

### Security

Security is another major concern of the community. Even though the current Daraja implementation has proved to be secure, it partly puts the security weight on developers which shouldn't be the case.

With Daraja, you have to combine certain required variables, encrypt the result and including it in the request body, Not fogetting there is already an OAUTH implermentation as well. Conventionally, security credentials should be included in the headers and not having many mini credentials as it is Daraja - _[see example below](#mpesa_daraja)_

Another security complexity arises when integrating callback APIs like C2B API. Developers are required to secure their callback endpoints by only trusting SSL certificates from Mpesa broker - meaning any communication without the broker SSL certificate would fail. Although this works well, it's not conventional. It adds security implementation complexity and difficulty to developer apps. Alternatively, request based security is easier, more common and just as secure. A good balance of security and ease of implementation should be found for an API that targets a public developer base.

### Tests

Everyone likes testing out a product before putting it into commercial use. Testing helps in assuring the users about the reliability of the product and promotes rapid, low risk development cycles. Consequently, a reliable API test bed should be there.

## Proposed Daraja 2.0

After our research on the payment APIs in [Kenya](2019-01-14-payment-gateways-Kenya.md) and [globally](2019-01-22-payment-gateways-global.md) as well as keenly looking at [GSMA mobile money specification](http://52.38.207.56/documentation/doco-hub/integration-guide/gsma-mm-documentation/html-doc/gsma-mm-rest-api.html) while thinking through Daraja's optimal implementation and the issues mentioned above, we've consolidated our thoughts into a beautiful, better, clearer, cleaner, more secure Daraja API proposal.

We will call it **Daraja 2.0**

### Proposed Structure...

- uses JSONAPI format. Treats everything as a resource.
- uses JWT for authentication. The JWT token encapulates all authorization. 
- secures developer endpoints
- uses conventional naming styles
- uses globally accepted data formats like time formats which are always in UTC.
- keeps the API simple, readable, standardized and clear.

To make this proposal practical, the following assumptions were made:

- developer endpoints for receiving payment notification do not change with every call and will already have been pre-registered
- A single Authorization token is used : JWT token
- Onboarding is not tackled here as it is moer of an operational efficiency problem.

For those who would like to have a deeper understanding and look at the proposed Daraja 2.0, it's only prudent that I share the backend design of an integrating developers app, its API definitions and the Postman collections.

_Please note that we only have a proposal for the B2C and C2B APIs. Be on the look out for proposals of other APIs like C2B express checkout commonly know as STK Push, B2B transfers, Account Balance query, Transaction reversal and more._

**Sample database model for Developer App**
![ERD](/assets/images/blog/daraja-2/uniapi.png){: .img-responsive .center}

[Daraja 2.0 API Specification](https://app.swaggerhub.com/apis/zegetech/mpesaUniAPI/1.0)<br>
[Daraja 2.0 Postman Collection](https://www.getpostman.com/collections/bd902a95eb356c2d4308)<br>
[Daraja 2.0 Postman Documentation](https://documenter.getpostman.com/view/1238477/SVfTQ7q6)

If you think that you've experienced issues with the current [Daraja API](https://developer.safaricom.co.ke/apis) and would like to experience a better solution to MPESA integration feel free to try out the proposed solution and design.

You'll only need the [Postman client](https://www.getpostman.com/downloads/) to try it out.

Get the Postman collection above and run the collection on the Postman client. Also, note that the responses aren't real MPESA responses but mock responses for demonstration purposes.

### A quick recap of the collection...

The APIs are grouped into a two

1. Developer APIs set - represent requests made to the developers system - commonly called the callback requests
2. MPESA APIs set - represent requests that originate from the developers system to Mpesa system.

The split was necessary for visualization reasons and make the proposal clearer.
Let's have a peek into one of the APIs and try to compare it against the existing solutions.

### B2C API

This is an API that allows businesses to send money to Customers directly to their MPESA wallets. It could be renumerations, salaries, bonuses or any other reasons. It is mostly used by NGOs, private companies like banking institutions and government institutions.

Here is a sample request and response of the legacy G2 implementation of the API which is SOAP based:

#### Request from Developer to MPESA

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header>
        <tns:RequestSOAPHeader xmlns:tns="http://www.huawei.com.cn/schema/common/v2_1">
            <tns:spId>27400323230</tns:spId>
            <tns:spPassword>somepassword==</tns:spPassword>
            <tns:timeStamp>20190318172239</tns:timeStamp>
            <tns:serviceId>27400323230</tns:serviceId>
        </tns:RequestSOAPHeader>
    </soapenv:Header>
    <soapenv:Body>
        <req:RequestMsg>
            <![CDATA[
            <request xmlns="http://api-v1.gen.mm.vodafone.com/mminterface/request">
                <Transaction>
                    <Remark>0</Remark>
                    <ConversationID></ConversationID>
                    <LanguageCode>0</LanguageCode>
                    <CommandID>BusinessPayment</CommandID>
                    <OriginatorConversationID>1669083056</OriginatorConversationID>
                    <Parameters>
                        <Parameter>
                            <Key>Amount</Key>
                            <Value>1000.0</Value>
                        </Parameter>
                    </Parameters>
                    <ReferenceData>
                        <ReferenceItem>
                            <Key>QueueTimeoutURL</Key>
                            <Value>https://1.2.3.4:8000/mpesatransaction/queue_timeout</Value>
                        </ReferenceItem>
                    </ReferenceData>
                    <Timestamp>2019-03-18T17:22:09.651011Z</Timestamp>
                </Transaction>
                <Identity>
                    <Caller>
                        <CallerType>2</CallerType>
                        <ThirdPartyID>345612</ThirdPartyID>
                        <Password>Password0</Password>
                        <CheckSum>CheckSum0</CheckSum>
                        <ResultURL>https://1.2.3.4:8000/mpesatransaction/result</ResultURL>
                    </Caller>
                    <Initiator>
                        <IdentifierType>11</IdentifierType>
                        <Identifier>SOMEInitiator</Identifier>
                        <SecurityCredential>supersecretjibberrish</SecurityCredential>
                        <ShortCode>123456</ShortCode>
                    </Initiator>
                    <PrimaryParty>
                        <ShortCode>123456</ShortCode>
                        <IdentifierType>4</IdentifierType>
                        <Identifier>123456</Identifier>
                    </PrimaryParty>
                    <ReceiverParty>
                        <ShortCode>254722000000</ShortCode>
                        <IdentifierType>1</IdentifierType>
                        <Identifier>254722000000</Identifier>
                    </ReceiverParty>
                    <AccessDevice>
                        <IdentifierType>1</IdentifierType>
                        <Identifier>Identifier3</Identifier>
                    </AccessDevice>
                </Identity>
                <KeyOwner>1</KeyOwner>
            </request>
            ]]>
        </req:RequestMsg>
    </soapenv:Body>
</soapenv:Envelope>
```

#### Response from MPESA Broker

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <req:ResponseMsg xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request">
            <![CDATA[
            <?xml version="1.0" encoding="UTF-8"?>
            <response xmlns="http://api-v1.gen.mm.vodafone.com/mminterface/response">
                <ResponseCode>0</ResponseCode>
                <ConversationID>AG_20134535_000049hjde14ae88580c48</ConversationID>
                <ResponseDesc>Accept the service request successfully.</ResponseDesc>
                <OriginatorConversationID>uuid8893834399</OriginatorConversationID>
                <ServiceStatus>0</ServiceStatus>
            </response>
            ]]>
        </req:ResponseMsg>
    </soapenv:Body>
</soapenv:Envelope>
```

#### Callback from MPESA to developer

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <req:ResponseMsg xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request">
            <!-- <![CDATA[ -->
            <?xml version="1.0" encoding="UTF-8"?>
            <Result>
                <ResultType>0</ResultType>
                <ResultCode>0</ResultCode>
                <ResultDesc>The service request is processed successfully.</ResultDesc>
                <OriginatorConversationId>144654353971400001</OriginatorConversationId>
                <ConversationId>AG_2015345345_00007bf0e16ec35e9f15</ConversationId>
                <TransactionId>JK39908JHDD0UW</TransactionId>
                <ResultParameters>
                    <ResultParameter>
                        <ResultParameter>
                            <Key>TransactionAmount</Key>
                            <Value>10</Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>TransactionReceipt</Key>
                            <Value>JK39908JHDD0UW </Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>B2CRecipientIsRegisteredCustomer</Key>
                            <Value>Y</Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>B2CChargesPaidAccountAvailableFunds</Key>
                            <Value>0.00</Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>ReceiverPartyPublicName</Key>
                            <Value>254722000000 - Jane John Doe</Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>TransactionCompletedDateTime</Key>
                            <Value>03.11.2015 14:22:05</Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>B2CUtilityAccountAvailableFunds</Key>
                            <Value>612107.00</Value>
                        </ResultParameter>
                        <ResultParameter>
                            <Key>B2CWorkingAccountAvailableFunds</Key>
                            <Value>0.00</Value>
                        </ResultParameter>
                    </ResultParameter>
                </ResultParameters>
                <ReferenceData>
                    <ReferenceItem>
                        <Key>QueueTimeoutURL</Key>
                        <Value>https://10.8.0.10:8310/mpesatransaction/queue_timeout</Value>
                    </ReferenceItem>
                </ReferenceData>
            </Result>
            ]]>
        </req:ResponseMsg>
    </soapenv:Body>
</soapenv:Envelope>
```

![Shock and Awe](/assets/images/blog/daraja-2/shock-and-awe-meme.jpg){: .img-responsive .center}

<a name="mpesa_daraja"></a>
The REST based Daraja implementation of the same B2C request:

#### Request to MPESA from Developer

```bash
curl -X POST --header "Authorization: Bearer <Access-Token>" --header "Content-Type: application/json" -d "
```

```json
{
  "InitiatorName": "SOMEInitiator",
  "SecurityCredential": "sdscjGPSOfYT6xMEHEIsaDEsasAdOVIT7RCQi1jy//dsdsdsdnMwvPeDhxeQlNngr8Qgh/FNlrj/+MKBhBGuerJnkICbctCWQ10qU355CWRreTpA==",
  "CommandID": "BusinessPayment",
  "Amount": "1000",
  "PartyA": "123456",
  "PartyB": "254722000000",
  "Remarks": "some remarks",
  "QueueTimeOutURL": "http://your_timeout_url",
  "ResultURL": "http://your_result_url",
  "Occasion": "some occassion"
}
```

#### Response from MPESA Broker

```json
{
  "Result": {
    "ResultType": 0,
    "ResultCode": 2001,
    "ResultDesc": "The initiator information is invalid.",
    "OriginatorConversationID": "7488-6256766-1",
    "ConversationID": "AG_20190104_00004ce9fc41b15aa227",
    "TransactionID": "NA43XZPDE3",
    "ReferenceData": {
      "ReferenceItem": {
        "Key": "QueueTimeoutURL",
        "Value": "http://internalapi.safaricom.co.ke/mpesa/b2cresults/v1/submit"
      }
    }
  }
}
```

#### Callback From MPESA to Developer

```json
{
  "Result": {
    "ResultType": 0,
    "ResultCode": 0,
    "ResultDesc": "The service request has been accepted successfully.",
    "OriginatorConversationID": "19455-424535-1",
    "ConversationID": "AG_20170717_00006be9c8b5cc46abb6",
    "TransactionID": "LGH3197RIB",
    "ResultParameters": {
      "ResultParameter": [
        {
          "Key": "TransactionReceipt",
          "Value": "LGH3197RIB"
        },
        {
          "Key": "TransactionAmount",
          "Value": 8000
        },
        {
          "Key": "B2CWorkingAccountAvailableFunds",
          "Value": 150000
        },
        {
          "Key": "B2CUtilityAccountAvailableFunds",
          "Value": 133568
        },
        {
          "Key": "TransactionCompletedDateTime",
          "Value": "17.07.2017 10:54:57"
        },
        {
          "Key": "ReceiverPartyPublicName",
          "Value": "254708374149 - John Doe"
        },
        {
          "Key": "B2CChargesPaidAccountAvailableFunds",
          "Value": 0
        },
        {
          "Key": "B2CRecipientIsRegisteredCustomer",
          "Value": "Y"
        }
      ]
    },
    "ReferenceData": {
      "ReferenceItem": {
        "Key": "QueueTimeoutURL",
        "Value": "https://internalsandbox.safaricom.co.ke/mpesa/b2cresults/v1/submit"
      }
    }
  }
}
```

![hmmmm](/assets/images/blog/daraja-2/hmmmm.png){: .img-responsive .center}

Proposed Daraja 2.0 implementation of the B2C API :

#### Request to MPESA from Developer

```bash
curl -X POST --header "Authorization: Bearer <Access-Token>" --header "Content-Type: application/vnd.api+json" --header "Accept: application/vnd.api+json" -d "
```

```json
{
  "data": {
    "type": "payouts",
    "id": "abd0effc646243df838bbf1161ddd9c5",
    "attributes": {
      "category": "BusinessPayment",
      "amount": 1000,
      "recipient_no": "254722000000",
      "recipient_type": "msisdn",
      "posted_at": "2019-03-18T17:22:09.651011Z"
    }
  }
}
```

#### Response from MPESA Broker

```json
{
  "data": {
    "type": "responses",
    "id": "AG_20190417_000049de14ae0c48",
    "attributes": {
      "resource_id": "abd0effc646243df838bbf1161ddd9c5"
    }
  }
}
```

#### Callback from MPESA to Developer

```json
{
  "data": {
    "type": "payouts",
    "id": "abd0effc646243df838bbf1161ddd9c5",
    "attributes": {
      "response_id": "AG_20190417_000049de14ae0c48",
      "recipient_type": "msisdn",
      "amount": 10,
      "recipient_registered": "Y",
      "balance_charges_paid_ac": 0.0,
      "recipient_name": "Jane J Doe",
      "recipient_no": "254722000000",
      "txn_created_at": "03.11.2015 14:22:05",
      "balance_utility_ac": 612107.0,
      "balance_working_ac": 0.0,
      "txn_id": "JK34D0889SL0UW"
    }
  }
}
```

![perfect](/assets/images/blog/daraja-2/perfect.jpg){: .img-responsive .center}

What stands out the most about this design is that it is clear. You don't even need a schema documentation to know what's going on. Initially you were asking many questions like
- Who is `Party A` and Who is `Party B` ?
- Why do we have an authorization header plus credentials in the payload ?
- What is `ConversationID` and `OriginatorConversationID` ?
- What is `CommandID` ?
- What Timezone is the `TransactionCompletedDateTime` in ?
- Why can't they just separate `msisdn number` and `recipient name`. 
- Who build this api... why am i here... what is the meaning of life ???


## To conclude,

This isn't to say that this unveiling is perfect or that the current implementation is not. We know that it has taken lots of time and resource to listen to the MPESA developer community and to act. It was a long time coming and much welcomed. We are very grateful to the team that gave us Daraja 1.0. However, this proposal is to get us thinking about APIs, the new oil of the 21st century. Granted that MPESA has the upperhand and developers just have no choice, many other corporations wanting to leverage on APIs might not have the same luck.

While putting this piece together, we bumped into an interesting API, built with the spirit of this blog: [Proxy API](https://proxyapi.co.ke). It seeks to "make Mpesa APIs simple". Taking a quick look at the implementation, we would say that it's a huge step towards better Mpesa APIs design. It would be great however to see it distance itself from seeming like another Daraja lookalike. Either way, great effort at belling the cat. Here are the [Proxy API's docs](https://docs.proxyapi.co.ke/v1/) for those wanting to dig deeper. Proxy API only confirms the need for improvement and palatability to not only Daraja API but also other APIs out there.

We at Zegetech would love to help any corporation that wants to build out an API strategy or perhaps needs to design and build APIs for now and the future. [Get in touch](https://zegetech.com/contact.html) and let's talk.

If you got to this point, you deserve a coffee on us! Let us know in the comments what you thought about our blog, or just to let us know whether it's a single Espresso or double Cappuccino. Or simply thumbs up.
