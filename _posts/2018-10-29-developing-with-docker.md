---
layout: news 
title: Developing with Docker
---

So, you probably already know [what docker is] and what it can do for you. You (hopefully) also know that you don't need to be deploying thousands of services in order to start using docker now.
This post will walk you through the process of *dockerizing* a jekyll based site(this one).
By dockerizing the site, the number of dependencies a developer would need to install on their machines is reduced to two; [the docker cli] and docker-compose.

## Docker Installation

The docker team offers two docker editions, Docker CE(community edition) and Docker EE(enterprise edition).
The enterprise edition is meant for enterprises running multi-container applications at scale and requiring enhanced security, certification and support.
For getting started with docker, what you want is docker-ce.

### Installing on Ubuntu

Docker provides the same avenues you might be used to for installing software on ubuntu: 
 - Via the docker repository
 - direct package install
 - scripts

Instructions for your preferred method are available in the [official docs](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce).
Because you'll probably be using docker for the long haul, I'd recommend installing from the repositories.
This will make the upgrade process as mundane as it should be.

Once installed you can check what version you are running:

    docker -v 

... and run your first container:

    sudo docker run hello-world

Notice the use of 'sudo' in the command above. Docker by default runs as the 'root' user, meaning that all docker commands will need to be prepended with 'sudo'.
That however doesn't mean it can't be changed.

### Running without sudo

The docker daemon grants access to members of the 'docker' group. Any user you add to this group can run docker without using 'sudo'.
This group should be created automatically when you install docker.
To check if the docker group exists on your system:

    grep 'docker' /etc/groups
    usermod [tab] [tab] [tab] # hit the tab key thrice, then look for docker in the output. Takes advantage of bash completion

If for some reason you don't have the docker group, create it:

    sudo groupadd docker

Then add the user to the docker group:

    sudo usermod -aG docker $USER # $USER evaluates to the currently logged in user

Log out, then back in and you should be able to run:

    docker run hello-world

Be sure to review docker's [security note](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface) before adding a user to the docker group.
You can check out the [post-installation docs](https://docs.docker.com/install/linux/linux-postinstall/) if you wish to customize docker further.

## The Dockerfile

Finally time to get our site on docker. The dockerfile is where we will define the environment that we need to run our site.
The 'docker build' command builds an image from the dockerfile and a context, which can be a directory or a repository.
Let's take a look at the file we'll be using:

    

## First run

## The docker-compose.yml file

## Ready
