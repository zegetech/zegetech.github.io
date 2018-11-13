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

The cloud is a pool of computer resources ; servers, storage, databases, analytics, physical infrastructure and more  shared over the internet. This makes  the cloud a virtual space that is accessible from anywhere around the globe. 

The idea of the cloud is believed to have first been coined by [Joseph Carl Robnett Licklider](https://en.wikipedia.org/wiki/J._C._R._Licklider) in the 1960s with his work on ARPANET.

The cloud itself is indestructible because like we said earlier, it is a virtual space.

## Cloud computing.

cloud computing is the delivery of cloud services.
There are other types of computing such as [Distributed Computing](https://en.wikipedia.org/wiki/Distributed_computing),[Grid computing](https://en.wikipedia.org/wiki/Grid_computing),[Utility Computing](http://en.wikipedia.org/wiki/Utility_computing), and [Cluster Computing](http://en.wikipedia.org/wiki/Computer_cluster).

Cloud services are delivered in a number of ways; Infrasctructure as a service(IaaS), Platform as a service(PaaS) and Software as a service(SaaS). Here is a picture of resourses you would traditonally manage.

![Traditional IT model](/assets/images/blog/cloud-computing/traditional-IT.png){:class="img-responsive center"}

### IaaS

IaaS stands for Infrastructure as a service. With this service, what you get, in simple terms , is a data center.

Here's a picture.
![IaaS model](/assets/images/blog/cloud-computing/Iaas.png){:class="img-responsive center"}




From the image, you can see that you will you will get networking, storage, servers, virtualizastion and part of the Operating system as a service.
Examples Iaas service providers include; [Digital Ocean](https://www.digitalocean.com/),[linode](https://www.linode.com/), [AWS](https://aws.amazon.com/),[vultr](https://www.vultr.com/).

Say you want a linux based server. You will go to any of the above sites. Provision yourself a virtual machine and that's it. You can now deploy whatever application you want to the machine/server,in the cloud. You can make your application accessible to anyone over the internet.
Virtualization softwares, storage for your application and related libraries, operating system and netwoking are all provided, in the cloud. 


You will however have to manage you own operating system, provide middleware example an antivirus, provide your application with data and management system for it, if your application needs a database you would have to create it, provide runtime libraries and the actual application.



### PaaS

Paas stands for Platform as a Service. The service  provider provides you with a configured infrastucture. On top of infrastructure  PaaS includes middleware, runtimes, development,testing and deplyment tools.
Here's a picture;

![PaaS model](/assets/images/blog/cloud-computing/paas.png){:class="img-responsive center"}



All you provide is code for your application and the data.
Example of Paas providers are [Heroku](https://www.heroku.com/), [Go daddy](https://uk.godaddy.com), etc

In this case all you will have to do is create code for your application, then upload the files for your provider to handle.


### SaaS
Software as a service. The service provider fully manages the whole stack. It is an application hosted in a public domain therefore accessible to everyone.
Here's a picture;

![SaaS model](/assets/images/blog/cloud-computing/saas.png){:class="img-responsive center"}

The only thing you manage is your own space. Your own environment where you have your own data.

A good example of a Software as a service is Gmail provided by google.


## Why the craze?


1. **On demand self-service.** A consumer can unilaterally provision computing capabilities, such as server time and network storage, as needed automatically without requiring human interaction with each service provider.

2. **Broad Network access.**Capabilities are available over the network and accessed through standard mechanisms that promote use by heterogeneous thin or thick client platforms (e.g., mobile phones, tablets, laptops, and workstations).

3. **Resource pooling.** different physical and virtual resources dynamically assigned and     reassigned according to consumer demand. There is a sense of location independence in that    the customer generally has no control or knowledge over the exact location of the provided    resources but may be able to specify location at a higher level of abstraction (e.g.,         country, state, or datacenter). 

4. **Rapid elasticity.** Capabilities can be elastically provisioned and released, in some cases automatically, to scale rapidly outward and inward commensurate with demand. To the consumer, the capabilities available for provisioning often appear to be unlimited and can be appropriated in any quantity at any time. 

5. **Measured service.** Usage can be monitored, controlled, and reported, providing transparency for both the provider and consumer of the utilized service. 