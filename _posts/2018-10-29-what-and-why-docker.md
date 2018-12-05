---
layout: blog
title:  Containerization with Docker
categories: developer
author: Melvin Atieno
blog-image: docker/docker_ship.png
intro: |
    The first time I had someone "simply" explain what docker is, this is what they said, "Docker is a platform for developers and sysadmins to develop, deploy, and run applications with containers".If you are a beginner programmer or techie you probably need to understand the fundamental concepts around containers and how they compare to virtual machines before you can fully dive into dockerization. This is a beginner-friendly guide that I hope will serve that purpose.
---

{:.post-figure}
![image-title-here](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}

{{page.intro}}

To get us started I am going to explain how a computer works, what virtual machines and containers are using an analogy.

A computer is sort of like a house. The different rooms represent different applications.

Here's a picture comparison of a computer as a house:

![house outline](/assets/images/blog/docker/housevscomp.jpg){:class="img-responsive center"}

Like houses, all computers contain applications based on the user's needs.

Say you want a gaming room, you find out what your room needs, provide the requirements then get your gaming room. You want a baby's room, find out what it needs, provide the requirements then get it...so on and so on.
A  problem might arise when you want a say a home office. An office requires a quiet atmosphere. The gaming room is the mother of all that is loud. The two rooms cannot possibly exist under the same roof.

The same applies when it comes to computers. If you need a program, you provision your computer to accommodate it. If you want an application and you find out its requirements will affect your already existing programs, problem.

Containers and Virtual Machines are similar in their goals to solve this problem by isolating an application and its requirements into a self-contained unit that can run anywhere.
A closer look.

## [Virtual machine.](https://azure.microsoft.com/en-us/overview/what-is-a-virtual-machine/)
A virtual machine is essentially an emulation of a computer running on your computer resources. It executes programs like a real computer.
Using our house analogy, a virtual machine is similar to getting an apartment for your office. A fully equipped apartment.

The virtual machine’s emulation engine, called a [hypervisor](https://www.networkworld.com/article/3243262/virtualization/what-is-a-hypervisor.html), handles the virtual hardware, including a CPU, memory, hard drive, network interface, and other devices. 

The virtual hardware devices provided by the hypervisor map to real hardware on your physical machine. For example, a virtual machine’s virtual hard disk is stored in a file located on your hard drive.

The virtual machine that is running on the host machine (again, using a hypervisor) is also often called a “guest machine.” If you run an application in a guest machine, the guest machine will contain both the application and whatever it needs to run that application (e.g. system binaries and libraries). It also carries an entire virtualized hardware stack of its own, including virtualized network adapters, storage, and CPU — which means it also has its own full-fledged guest operating system. 

You can have several virtual machines installed on your system. You’re only limited by the amount of storage you have available for them.

In general, Virtual machines provide an environment with more resources than most applications need.

## Containers

Unlike a virtual machine which provides hardware virtualization, a container provides operating-system-level virtualization by abstracting the “user space”. You might want to see the different types of [virtualization](https://www.redswitches.com/blog/different-types-virtualization-cloud-computing-explained/). Among the most popular containerisation engines are [Docker](https://docs.docker.com) and [CoreOs's RKT](https://coreos.com/rkt/)

Containers, using our house analogy can be compared to a hotel. The apartment is not fully occupied and not easy to move from one building/apartment to another. With Hotels problem is solved!

In the Hotel room, you have only what you need, everything else is shared/common with the others hotel clients.

This is how containers system work:
 you have a server, it could be a physical server or a virtual server (VM). You install an OS. The containers you create interact with the OS’s kernel. It uses certain features of the kernel to create an isolated application platform.

![docker-structure](/assets/images/blog/docker/docker-structure.png){:class="img-responsive center"}

You can see that all the operating system level architecture is being shared across containers. The only parts that are created from scratch are the bins and libs. This is what makes containers so lightweight.

**The difference**

![virtual-machine-vs-containers](/assets/images/blog/docker/Container-vs-VMs.jpg){:class="img-responsive center"}

## Docker

[Docker is an open-source](https://docs.docker.com/get-started/) project based on Linux containers. It uses Linux Kernel features like namespaces and control groups to create containers on top of an operating system.

![docker logo](/assets/images/blog/docker/dockerlogo.png){:class="img-responsive center"}

Containerization has been around for decades, but it is Docker that has reinvigorated this ancient technology. Docker’s appeal is that it provides a common toolset, packaging model and deployment mechanism that greatly simplifies the containerization and distribution of applications. 

How to create a Docker container will be covered in the [next](/developer/2018/11/08/developing-with-docker.html) post.

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
    Volumes are the “data” part of a container. Data volumes exist as specially designed directories and files on the host filesystem. It is initialized when a container is created. It remains untouched even if you destroy, update, or rebuild your container. When you want to update a volume, you make changes to it directly. Data volumes can be shared and reused among multiple containers.
8. **[Docker hub](https://hub.docker.com).**
    Registry for Docker images. You can think of the registry as a directory of all available Docker images.sort of like GitHub for docker

## Why use docker

1. **Continuous Integration** -Every time your source code is updated, continuous integration tools like Travis and Jenkins can save the new version as a Docker image, tag it with a version number and push to Docker Hub, then deploy it to production.

2. **Security** - Separating the different components of a large application into different containers can have security benefits: if one container is compromised the others remain unaffected.

3. **Environment management** -  Docker eliminates environment inconsistencies and the "works on my machine" problem by packaging the application, configs, and dependencies into an isolated container.

4. **Isolation** - Dependencies or settings within a container will not affect any installations or configurations on your computer, or on any other containers that may be running.

5. **portability** - Container host environments are very consistent, no matter which type of operating system is hosting them.

Now I hope this makes a little more sense:
> Docker is a platform for developers, sysadmins, and etc to develop, deploy, and run applications within loosely isolated environments known as containers.
With Docker, you can manage your infrastructure the same way you manage your applications.

Here are a couple of resources that might come in handy.

Resources

1. [Virtual machine](https://en.wikipedia.org/wiki/Virtual_machine).
2. [Official docker documentation](https://docs.docker.com/get-started/#docker-concepts).
3. [Official docker compose documentation](https://docs.docker.com/compose/)
