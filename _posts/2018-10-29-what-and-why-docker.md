---
layout: news
title:  Docker
categories: developer
permalink: news/:year/:month/:day/:title.html
author: Melvin Atieno
blog-image: docker/docker1.png
intro: Docker is a platform for developers and sysadmins to develop, deploy, and run applications with containers. English? Docker is a platform that allows you to use a container as a computer inside your computer.
---

![image-title-here](/assets/images/blog/{{page.blog-image}}){:class="img-resposive center"}


## What is docker

[Docker](https://docs.docker.com/get-started/#docker-concepts) is a platform for developers, sysadmins, and etc to develop, deploy, and run applications within loosely isolated environments known as a containers.
With Docker, you can manage your infrastructure the same way you manage your applications. 

**English?** 
Docker is a platform that allows you to use a container as a computer inside your computer.A Container is packaged application with all of the parts it needs.

Imagine you are working on a project Q and you send your code to a friend. Your friend runs the exact same code on exactly the same data set but gets slightly different results or worse, no results at all. This could be due to a mirage of reasons; a different operating system, a different version of one of the project's packages etc.

**Docker fixes this.**

In order to fully understand how,  we need to understand how docker works. To do that, we are going to compare it to a virtual machine because that seems to be the hang.



## [Virtual machine.](https://azure.microsoft.com/en-us/overview/what-is-a-virtual-machine/)
A virtual machine is a guest computer within your computer that exhibits behavior separate from your computer. 
A virtual machine runs a full-blown “guest” operating system with virtual access to host resources through a [hypervisor](https://www.networkworld.com/article/3243262/virtualization/what-is-a-hypervisor.html). In general, Virtual machines  provide an environment with more resources than most applications need.

**How it works.**

Create a virtualized environment-called, simply enough, a virtual machine on your computer. 
You version it to an exact duplicate of your staging and production environments for your project.
Run your provisioning scripts in your virtual machine just as you would in staging and production.

Provisioning scripts are scripts containing information that tells your environment what tools to download, setup and how to configure them.

Dump your code into your machine. If it works, you know it's going to work the same way in any of similar environments i.e staging or production.


**The hustle!!!**


## [Docker](https://docs.docker.com/get-started/).

Docker runs off of Docker containers.
A container runs natively on Linux and shares the kernel of the host machine with other containers.
It runs a discrete process, taking no more memory than any other executable, making it lightweight.

Here's a picture:

![docker-structure](/assets/images/blog/docker/docker-structure.png)
{:class="img-responsive center"}



To create a docker container, you first create a Docker file which is in turn used to build an image.
Now an image is an executable package that includes everything needed to run an application; the code, a runtime, libraries, environment variables, and configuration files. It is a complete application!!!!! 

An image  is not a whole machine, you don't need that. Instead, an image sits on top of a machine, your machine.<br/>
Using your image, you can now run a container.<br/>
A container is a runtime instance of an image, what the image becomes in memory when executed (that is, an image with a state, or a user process).<br/>
You can run as many containers as you want until you run out of processing power or RAM.

To share your image, you can push it to Docker hub(sort of like GitHub for docker).<br/>
Any machine that has docker installed can pull the image and run it without any installations or provisions because the image contains everything.




**The difference?**

Here's a picture:

![virtual-machine-vs-containers](/assets/images/blog/docker/Container-vs-VMs.jpg)
{:class="img-responsive center"}

Also, with Docker, instead of putting the project codes into environments as in virtual machines, you build the environment as well and now you can run that environment anywhere.

## Terminologies:

Now that you have the picture, here are a few terms you will come across in your docker-journey:


1. **Docker Engine.**
    Docker engine is the layer on which Docker runs. It’s a lightweight runtime and tooling that manages containers, images, builds, and more. It runs natively on Linux systems and is made up of :

    - A Docker Daemon that runs in the host computer.
    - A Docker Client that then communicates with the Docker Daemon to execute commands.
    - A REST API for interacting with the Docker Daemon remotely.
2. **Docker Client.**
    The Docker Client is what you, as the end-user of Docker, communicate with. Think of it as the UI for Docker.
3. **Docker Daemon.**
    The Docker daemon is what actually executes commands sent to the Docker Client — like building, running, and distributing your containers. The Docker Daemon runs on the host machine, but as a user, you never communicate directly with the Daemon. 
4. **Dockerfile.**
    A Dockerfile is where you write the instructions to build a Docker image.
5. **Docker Image.**
    Images are read-only templates that you build from a set of instructions written in your Dockerfile.The blueprints of your application. Images define both what you want your packaged application and its dependencies to look like *and* what processes to run when it’s launched.
6. **Docker Containers.** 
    A Docker container, as discussed above, wraps an application’s software into an invisible box with everything the application needs to run. That includes the operating system, application code, runtime, system tools, system libraries, and etc
7. **Volumes.**
    Volumes are the “data” part of a container.Data volumes exist as specially designed directories and files on the host filesystem. It initialized when a container is created.It  remains untouched even if you destroy, update, or rebuild your container. When you want to update a volume, you make changes to it directly. Data volumes can be shared and reused among multiple containers.
8. **Docker Hub.**
    Registry for Docker images. You can think of the registry as a directory of all available Docker images.

## Why use docker

1. **Continuous Integration** -Every time your source code is updated, continous intergration tools like travis, perkins can save the new version as a Docker image, tag it with a version number and push to Docker Hub, then deploy it to production.

2. **Security** - Separating the different components of a large application into different containers can have security benefits: if one container is compromised the others remain unaffected.

3. **Environment management** -  Docker eliminates environment inconsistencies and the "works on my machine" problem by packaging the application, configs and dependencies into an isolated container.

4. **Isolation** - Dependencies or settings within a container will not affect any installations or configurations on your computer, or on any other containers that may be running.

5. **portability** - Container host environments are very consistent, no matter which type of operating system is hosting them.

Here are a couple of resources that might come in handy.

Resources

1. [Virtual machine](https://en.wikipedia.org/wiki/Virtual_machine).
2. [Official docker documentation](https://docs.docker.com/get-started/#docker-concepts).
3. [Romin Irani's Docker Tutorial Series ](https://rominirani.com/docker-tutorial-series-a7e6ff90a023)

