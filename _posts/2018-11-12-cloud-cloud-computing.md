---
layout: blog
title: The cloud, precipitating the new age
categories: technology
author: Melvin Atieno
blog-image: cloud-computing/cloud.jpg
intro: You've probably heard about it. There's a high chance you have used it. There's a higher chance you will be using it in the future. The cloud. The cloud is one of those things everyone sort of knows but somehow cannot clearly define. What is the cloud? Who made the cloud? Where is the cloud? How does it work? What is cloud computing? And what happens when it rains? Yes these are just some of the questions that this blog intends to answer in a bid to demystify the mystery that is the cloud.
---

{:.post-figure}
![The cloud](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}

{{page.intro}}
![cloud-comic](/assets/images/blog/cloud-computing/cloud-comic3.jpeg){:class="img-responsive center"}

The cloud is a pool of computer resources; servers, storage, databases, analytics, physical infrastructure and more, shared over the internet. The cloud is a virtual space that is accessible from anywhere around the globe.

The idea of the cloud is believed to have first been coined by [Joseph Carl Robnett Licklider](https://en.wikipedia.org/wiki/J._C._R._Licklider) in the 1960s. The cloud itself is indestructible because like we said earlier, it is a virtual space. The cloud is not physical.

## Cloud computing.

Cloud computing is the delivery of cloud services. Apart from cloud computing, there are other types of computing such as [Distributed Computing](https://en.wikipedia.org/wiki/Distributed_computing), [Grid computing](https://en.wikipedia.org/wiki/Grid_computing), [Utility Computing](http://en.wikipedia.org/wiki/Utility_computing) and [Cluster Computing](http://en.wikipedia.org/wiki/Computer_cluster).

One of the major reasons why cloud computing is so popular as compared to other forms of computing is accessibility. While a traditional computer setup requires you to be in the same location as your resource management system, the cloud takes away that step. The cloud removes the need for you to be in the same physical location by allowing delivery of these computer resources as services. Cloud services are delivered in a number of ways; Infrastructure as a service(IaaS), Platform as a service(PaaS) and Software as a service(SaaS). The basic thing that separates these service models is the levels of virtualization/abstraction or simply put, "who is responsible for what". Before diving into the cloud service models, Here is a picture of resources you would traditionally manage in a traditional computer setup.

![Traditional IT model](/assets/images/blog/cloud-computing/traditional-IT.png){:class="img-responsive center"}

As we go through the various forms of cloud computing it is key to note some of the defining characteristics of these services. They include:

1. **On-demand self-service.** A consumer can provision cloud resources on demand, such as the server, time and network storage, as needed automatically without requiring human interaction with each service provider, whenever they are required.

2. **Broad Network access.** Resources are available for access from a wide range of devices, such as tablets, desktop computers, and smartphones. These resources are also accessible from a wide range of locations that offer online access.

3. **Resource pooling.** Different physical and virtual resources dynamically assigned and reassigned according to consumer demand. There is a sense of location independence in that the customer generally has no control or knowledge over the exact location of the provided resources but may be able to specify location at a higher level of abstraction (e.g country, state, or datacenter).

4. **Rapid elasticity.** Scalable provisioning, or the ability to provide scalable services. To the consumer, the capabilities available for provisioning often appear to be unlimited and can be appropriated in any quantity at any time.

5. **Measured service.** Usage can be monitored, controlled, and reported, providing transparency for both the provider and consumer of the utilized service.

### IaaS

IaaS stands for Infrastructure as a service. With this service model, what you get, in simple terms, is a data center.

Here's a picture.
![IaaS model](/assets/images/blog/cloud-computing/Iaas.png){:class="img-responsive center"}

The IaaS provider hosts the infrastructure components including servers, storage, and networking hardware. It aims at virtualizing hardware from the operating system.
The IaaS provider supplies a range of services to accompany those infrastructure components. These can include detailed billing, monitoring, log access, security, load balancing, and clustering, as well as storage resiliency, such as backup, replication, and recovery.

An IaaS customer will be able to access resources and services over the internet and can use the cloud provider's services to install the remaining elements of an application stack.

Hardware virtualization offered by IaaS providers can be in the form hosted Virtual Machines (VMs) or hosted Virtual Private Servers (VPS). The main difference between VPS hosting and VM hosting is in how data is stored. VPS containers are on a self-contained server with its own set of disk drives while VM servers do not store any of the VM's data. All data is stored on a redundant, high-speed mass storage unit.

For example, you can log in to the IaaS platform to create a virtual machine (VM) or a VPS, install an operating system deploy middleware, such as databases; create storage buckets for workloads and backups, and install the enterprise workload.

The real picture:
![cloud cartoon iaas](/assets/images/blog/cloud-computing/iaas.jpg){:class="img-responsive center"}

Examples Iaas providers include [AWS](https://aws.amazon.com/) which offers storage services such as Simple Storage Services [(S3)](https://aws.amazon.com/s3/) and [Glacier](https://aws.amazon.com/glacier/), compute services, including its [Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/) and VPS deployment services [Lightsail](https://aws.amazon.com/lightsail/). [OVH](https://www.ovh.com/world/) offers VPS, dedicated servers and other web services. [Digital Ocean](https://www.digitalocean.com/) offers cloud computing of virtual servers and object storage spaces. Others popular providers are [Linode](https://www.linode.com/) and [Vultr](https://www.vultr.com/).

Services offered by IaaS providers can include serverless computing such as [AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) [webtask.io](https://webtask.io/), [hook.io](https://hook.io/) and [Google Cloud Functions](https://cloud.google.com/functions/), database access, big data compute environments, monitoring; logging and more. Serverless computing is commonly referred to as **FaaS (Function as a Service)**.
Now "serverless" does not mean there are no servers involved. Certainly not. Serverless computing simply refers to different management and implementation of servers. What it basically means is that for each event or request to the server, a state is created and after the request is served, the state is automatically destroyed. This is unlike the typical server management and implementation structure where server instances have fixed resources, run all the time and need administrators to manage them.

Infrastructure as a service can also include container management services, **Container as a Service(CaaS)**. A cloud service that allows users to upload, organize, run, scale, manage and stop containers. Most cloud service providers have an offering for CaaS. For example, AWS has it's [Amazon EC2 Container Service (ECS)](https://aws.amazon.com/ecs/). The different CaaS providers depend on different container orchestration platforms. Container orchestration refers to container deployment, cluster management, scaling reporting, and lifecycle management. Some of these platforms include [Google Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/),[Docker Machine](https://docs.docker.com/machine/) and [Docker swarm](https://docs.docker.com/engine/swarm/). 

![Uploading Files](/assets/images/blog/cloud-computing/uploading.jpg){:class="img-responsive center"}

In case you need to roll out your own private inhouse solution for container orchestration, there are opensource tools like [Rancher](https://rancher.com/), an open-source software for delivering Kubernetes-as-a-Service which basically means that it that manage kubernetes clusters on your own servers. Others are the opensource tools from [Heptio](https://heptio.com/community/) that help in kubernetes management. Here is a good list of [userful kubernetes tools](https://dzone.com/articles/50-useful-kubernetes-tools)

### PaaS

PaaS stands for Platform as a Service. The service provider gives you  a pre-configured infrastructure. PaaS includes middleware, runtimes, development, testing and deployment tools. It is basically an application platform.
Here's a picture;

![PaaS model](/assets/images/blog/cloud-computing/paas.png){:class="img-responsive center"}

It involves the virtualization of application dependencies and serving them as a single “platform” upon which any compatible software can run. All infrastructure is abstracted and the developer can concentrate on the end product.
The most popular provider of PaaS is [Heroku](https://www.heroku.com/).

The more popular PaaS for a RoR (Ruby On Rails) application are:
1.  [Heroku](https://www.heroku.com/).
2.  [IBM Cloud(formerly Bluemix)](https://www.ibm.com/cloud/)
3.  [EngineYard](https://www.engineyard.com/)

Now PaaS can be taken a notch higher to include pre-built server-side application logic such as push notifications, user authentication, google analytics etc as services. In essence, developers can outsource all the behind-the-scenes aspects of a web or mobile application so that they only have to write and maintain the frontend. These aspects, when offered over the cloud, are referred to as **BaaS (Backend as a service)**. Among today's BaaS vendors are [Parse](https://parseplatform.org/), [Kinvey](https://devcenter.kinvey.com/rest/guides), [Buddy](https://buddy.com/) and [Appcelerator](https://www.appcelerator.com/) and [Firebase](https://firebase.google.com/).

Since technology should be accessible to everyone, there exists a number  of open-source PaaS solutions. Here are some examples. [Cloud Foundry](https://www.cloudfoundry.org/) which provides a choice of clouds, developer frameworks and application services, [Dokku](http://dokku.viewdocs.io/dokku/) and [Flynn](https://n.io/) with are Heroku-like PaaS you can roll up by yourself. Here is a great [PaaS finder](https://paasfinder.org/filter) tool that will open the PaaS world to you. 

### SaaS

With Software as a service, the service provider fully manages the whole stack. It is an application hosted in a public domain therefore accessible to everyone. It eliminates the need for organizations to install and run applications on their own computers or in their own data centers.

Here's a picture;

![SaaS model](/assets/images/blog/cloud-computing/saas.png){:class="img-responsive center"}

As a customer rather than purchasing a software to install it, customers subscribe to an SaaS offering. Some examples of SaaS products include [Slack](https://slack.com/), [Shopify](https://www.shopify.com/), [Adobe](https://www.adobe.com/) and [M-payer](https://mpayer.co.ke/) developed by [us](https://zegetech.com/) 😉.

### XaaS
![everything as a service](/assets/images/blog/cloud-computing/everything.jpeg){:class="img-responsive center"}

Anything or Everything as a service (XaaS) is a general term for all the above service models and other services offered over the cloud. There are a vast number of tools and technologies that are and can be offered over the cloud. Database as a Service (DBaaS), Malware as a Service (MaaS), Disaster Recovery as a Service (DRaaS), Communications as a Service (CaaS), Testing as a service (TaaS) and Network as a Service (NaaS). This is the future of cloud computing. It aims at offering everything as a service.

## Cloud in your laptop
![my cloud](/assets/images/blog/cloud-computing/the_cloud.png){:class="img-responsive center"}

So you want to mess around with the cloud. You can setup your own kubernetes cluster in your office, or why no roll up you own heroku. The foundation of all these cloud magic is Virtualization. With Virtualization tools you can be able to roll up VPS instances and deploy your own cloud. So if you haven't already, head on over to [Virtual Box](https://www.virtualbox.org/wiki/VirtualBox) or [VMware](https://www.vmware.com/) among others. Once set up, you can use [Vagrant](https://www.vagrantup.com/) to roll out your VMs/VPS. You may also need to install [Docker](/developer/2018/11/08/developing-with-docker.html) to get going with containerization.