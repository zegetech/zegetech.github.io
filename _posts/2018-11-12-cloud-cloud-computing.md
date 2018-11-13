---
layout: blog
title: The cloud and cloud  computing
categories: developer
author: Melvin Atieno
blog-image: cloud-computing/cloud.jpg
intro: What is the cloud? Who made the cloud? Where is the cloud? How does it work? Why is it indestructible? What is cloud computing? What other forms of computing are there? These are among of the questions this blog intends to answer.

---
{:.post-figure}
![The cloud](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}


{{page.intro}}

The cloud is a pool of computer resources; servers, storage, databases, analytics, physical infrastructure and more, shared over the internet. The cloud is a virtual space that is accessible from anywhere around the globe. 

The idea of the cloud is believed to have first been coined by [Joseph Carl Robnett Licklider](https://en.wikipedia.org/wiki/J._C._R._Licklider) in the 1960s.

The cloud itself is indestructible because like we said earlier, it is a virtual space. The cloud is not physical.

## Cloud computing.

cloud computing is the delivery of cloud services.
There are other types of computing such as [Distributed Computing](https://en.wikipedia.org/wiki/Distributed_computing),[Grid computing](https://en.wikipedia.org/wiki/Grid_computing),[Utility Computing](http://en.wikipedia.org/wiki/Utility_computing), and [Cluster Computing](http://en.wikipedia.org/wiki/Computer_cluster).

Cloud services are delivered in a number of ways; Infrastructure as a service(IaaS), Platform as a service(PaaS) and Software as a service(SaaS). Here is a picture of resources you would traditionally manage.

![Traditional IT model](/assets/images/blog/cloud-computing/traditional-IT.png){:class="img-responsive center"}

### IaaS

IaaS stands for Infrastructure as a service. With this service model, what you get, in simple terms, is a data center. Some aspects of computing are managed for  you by your service provider.

Here's a picture.
![IaaS model](/assets/images/blog/cloud-computing/Iaas.png){:class="img-responsive center"}




From the image, you can see that  networking, storage, servers, virtualization and part of the Operating system are provided as a service.
Examples Iaas providers include; [Digital Ocean](https://www.digitalocean.com/),[linode](https://www.linode.com/), [AWS](https://aws.amazon.com/),[vultr](https://www.vultr.com/).

Say you want a Linux based server. You will go to any of the above sites. Provision yourself a virtual machine and that's it. You can now deploy whatever application you want to the machine/server, in the cloud. You can make your application accessible to anyone over the internet.
Virtualization software, storage for your application and related libraries, operating system and networking are all provided, in the cloud. 


You will, however, have to manage your own operating system, provide middleware example an antivirus, provide your application with data and management system for it, if your application needs a database you would have to create it, provide runtime libraries and the actual application.



### PaaS

Paas stands for Platform as a Service. The service provider provides you with a configured infrastructure. On top of infrastructure, PaaS includes middleware, runtimes, development, testing and deployment tools.
Here's a picture;

![PaaS model](/assets/images/blog/cloud-computing/paas.png){:class="img-responsive center"}



All you provide is code for your application and the data.
Example of Paas providers are [Heroku](https://www.heroku.com/), [Go daddy](https://uk.godaddy.com), etc

In this case, all you will have to do is create code for your application, then upload the files for your provider to handle.


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