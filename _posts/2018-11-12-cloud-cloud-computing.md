---
layout: blog
title: The cloud and cloud  computing
categories: developer
author: Melvin Atieno
blog-image: cloud-computing/cloud.jpg
intro: You've probably heard about it.There's a high chance you have used it. There's a higher chance you will be using it  in the future.The cloud.The cloud is one of those things everyone sort of knows but somehow cannot clearly define.What is the cloud? Who made the cloud? Where is the cloud? How does it work? what hapens when it rains? What is cloud computing? Using your computer in the cloud? What other forms of computing are there? Yes these are just some of the questions that this blog intends to answer in a bid to demystify the mystery that is the cloud.

---
{:.post-figure}
![The cloud](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}


{{page.intro}}

The cloud is a pool of computer resources; servers, storage, databases, analytics, physical infrastructure and more, shared over the internet. The cloud is a virtual space that is accessible from anywhere around the globe. 

The idea of the cloud is believed to have first been coined by [Joseph Carl Robnett Licklider](https://en.wikipedia.org/wiki/J._C._R._Licklider) in the 1960s.

The cloud itself is indestructible because like we said earlier, it is a virtual space. The cloud is not physical.

## Cloud computing.

Cloud computing is the delivery of cloud services.Apart from cloud computing,there are other types of computing such as [Distributed Computing](https://en.wikipedia.org/wiki/Distributed_computing),[Grid computing](https://en.wikipedia.org/wiki/Grid_computing),[Utility Computing](http://en.wikipedia.org/wiki/Utility_computing), and [Cluster Computing](http://en.wikipedia.org/wiki/Computer_cluster).

One of the major reasons why cloud computing is so popular as compared to other forms of computing, is accessibility.While a traditional computer setup requires you to be in the same location as your resource management system, the cloud takes away that step. The cloud removes the need for you to be in the same physical location by allowing delivery of these computer resources as services. Cloud services are delivered in a number of ways; Infrastructure as a service(IaaS), Platform as a service(PaaS) and Software as a service(SaaS). The basic thing that seperates these service models is "who is responsible for what". Before diving into the cloud service models, Here is a picture of resources you would traditionally manage in a traditional computer setup.

![Traditional IT model](/assets/images/blog/cloud-computing/traditional-IT.png){:class="img-responsive center"}

### IaaS

IaaS stands for Infrastructure as a service. With this service model, what you get, in simple terms, is a data center.

Here's a picture.
![IaaS model](/assets/images/blog/cloud-computing/Iaas.png){:class="img-responsive center"}




The IaaS provider hosts the infrastructure components including servers, storage and networking hardware, as well as the virtualization or hypervisor layer.
The IaaS provider also supplies a range of services to accompany those infrastructure components. These can include detailed billing, monitoring, log access, security, load balancing and clustering, as well as storage resiliency, such as backup, replication and recovery. 

An an IaaS customer you will be able to access resources and services over the internet, and can use the cloud provider's services to install the remaining elements of an application stack. For example, you can log in to the IaaS platform to create virtual machines (VMs); install operating systems in each VM; deploy middleware, such as databases; create storage buckets for workloads and backups; and install the enterprise workload into that VM. 

Examples Iaas providers include; [AWS](https://aws.amazon.com/) which offers storage services such as Simple Storage Services [(S3)](https://aws.amazon.com/s3/) and [Glacier](https://aws.amazon.com/glacier/),compute services, including its [Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/) and vps deployment services [lightsail](https://aws.amazon.com/lightsail/).[OVH](https://www.ovh.com/world/) which offers  VPS, dedicated servers and other web services. [Digital Ocean](https://www.digitalocean.com/) which offers cloud computing of virtual servers and object storage spaces,[linode](https://www.linode.com/),[vultr](https://www.vultr.com/).

Services offered by IaaS providers can include serverless computing such as [AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) [webtask.io](https://webtask.io/) [hook.io]() and [Google Cloud Functions](https://cloud.google.com/functions/); database access; big data compute environments; monitoring; logging; and more.
Now "serverless" does not mean there are no servers involved. Certainly not.Serverless computing simply refers to a different management and implementation of servers. What it basically means is that for each event or request to the server, a state is created and after the request is served, the state is automatically destroyed. This is unlike the typical server management and implementation structure where server instances have fixed resources, run all the time and need administrators to manage them.
Mind blown? Yeah I know!!!


### PaaS

Paas stands for Platform as a Service. The service provider provides you with a pre-configured infrastructure.PaaS includes middleware, runtimes, development, testing and deployment tools.
Here's a picture;

![PaaS model](/assets/images/blog/cloud-computing/paas.png){:class="img-responsive center"}



All you provide is code for your application and the data.
Example of Paas providers are [Heroku](https://www.heroku.com/), [Go daddy](https://uk.godaddy.com), etc

In this case, all you will have to do is create code for your application, then upload the files for your provider to deploy.


### SaaS
Software as a service. The service provider fully manages the whole stack. It is an application hosted in a public domain therefore accessible to everyone.
Here's a picture;

![SaaS model](/assets/images/blog/cloud-computing/saas.png){:class="img-responsive center"}

The only thing you manage is your own space. Your own environment where you have your own data.

A good example of a Software as a service is Gmail provided by Google.


## Essential characteristics


1. **On-demand self-service.** A consumer can provision cloud resources on demand, such as the server, time and network storage, as needed automatically without requiring human interaction with each service provider. whenever they are required.

2. **Broad Network access.** Resources are available for access from a wide range of devices, such as tablets, PCs, Macs, and smartphones. These resources are also accessible from a wide range of locations that offer online access.

3. **Resource pooling.** Different physical and virtual resources dynamically assigned and reassigned according to consumer demand. There is a sense of location independence in that the customer generally has no control or knowledge over the exact location of the provided resources but may be able to specify location at a higher level of abstraction (e.g country, state, or datacenter). 

4. **Rapid elasticity.** Scalable provisioning, or the ability to provide scalable services. To the consumer, the capabilities available for provisioning often appear to be unlimited and can be appropriated in any quantity at any time. 

5. **Measured service.** Usage can be monitored, controlled, and reported, providing transparency for both the provider and consumer of the utilized service. 