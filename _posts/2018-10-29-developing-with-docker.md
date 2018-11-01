---
layout: news 
title: Developing with Docker
author: Ngari Ndung'u
blog-image: docker/container.jpg
image-attribution: Photo by Randy Fath on Unsplash
intro: So, you probably already know [what docker is] and what it can do for you. You (hopefully) also know that you don't need to be deploying thousands of services in order to start using docker now.
  This post will walk you through the process of *dockerizing* a jekyll based site(this one).
  By dockerizing the site, the number of dependencies a developer would need to install on their machines is reduced to two; [Docker engine](https://www.docker.com/products/docker-engine) and [Docker compose](https://docs.docker.com/compose/overview/).
---
![Fruits in a transparent container](/assets/images/blog/{{ page.blog-image }}){:class="img-responsive center"}
{{ page.image-attribution }}
{:.image-attribution}
{{ page.intro }}

## Docker Installation

The docker team offers two docker editions, Docker CE(community edition) and Docker EE(enterprise edition).
The enterprise edition is meant for enterprises running multi-container applications at scale and requiring enhanced security, certification and support.
For getting started with docker, what you want is [docker-ce](https://docs.docker.com/install/).

### Installing on Ubuntu

Docker provides the same avenues you might be used to for installing software on ubuntu: 
 - Via the docker repository
 - direct package install, and
 - scripts

Instructions for your preferred method are available in the [official docs](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce).
Because you'll probably be using docker for the long haul, I'd recommend installing from the repositories.
This will make the upgrade process as mundane as it should be.

Once installed you can check what version you are running:

    docker -v 

... and run your first container:

    sudo docker run hello-world

Notice the use of `sudo` in the command above. Docker by default runs as the `root` user, meaning that all docker commands will need to be prepended with `sudo`.
That however doesn't mean that it can't be changed.

### Running without sudo

The docker daemon grants access to members of the `docker` group. Any user you add to this group can run docker without using `sudo`.
This group is created automatically when you install docker.
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
The `docker build` command builds an image from the dockerfile and a context, which can be a directory or a git repository.
Let's take a look at the file we'll be using:

~~~yaml        
# zegetech website docker file
# build off of alpine
FROM alpine:3.8
# update packages
RUN apk update
# install ruby
RUN apk add ruby=2.5.2-r0 git ruby-dev build-base zlib-dev ruby-json
# install bundler
RUN gem install bundler -N
# copy repo
COPY . /blog
# set mount point
VOLUME /blog
# switch to repo directory
WORKDIR blog
# install app dependencies
RUN bundle install
# exposed port
EXPOSE 4000
# run server
ENTRYPOINT ["bundle", "exec","jekyll","serve"]
CMD ["-H", "0.0.0.0"]
~~~

This file shows the basic structure of a dockerfile. Every line in the dockerfile is an instruction of the form `INSTRUCTION arguments`.
The instruction is case insensitive, but is capitalized by convention.
Comments begin with a `#` and should also appear on their own line.
Here's a rundown of the instructions we're using in our dockerfile:

FROM
: specifies the base image to build our image off of. [Alpine](https://alpinelinux.org/about/) in this case. This instruction is required and should come before other instructions. Only ARG is allowed to come before.

RUN
: run a command inside the container. The command is the same as what you'd run in your terminal. There's no limit to how many RUN instructions you can have.

COPY
: copy the specified directory on the host to a location in the image.

VOLUME
: set a location for the container to persist data

WORKDIR
: sets the directory that all commands coming after will be run in

EXPOSE
: tells the docker daemon what ports our application will be reachable on

ENTRYPOINT
: provides the default command that will be run when the container is instantiated

CMD
: the command to run when the container is instantiated. When used in conjuction with ENTRYPOINT, it is used to provide additional parameters to the ENTRYPOINT command.

There are more instructions that are not used here. The full set is on the [dockerfile reference](https://docs.docker.com/engine/reference/builder/) page.

## First run

Before we can run the container, we have to build our image first.

    docker build -t name:tag . # the dot specifies the current directory as the build context

This command will run through the dockerfile executing instructions sequentially.
It will look for the image specified in the `FROM` instruction locally, and download it if its missing.
Docker will then run the next instruction and output an intermediate image. This process is repeated until we have our final image.

Now to run our image:

    docker run -p 127.0.0.1:80:4000 --mount type=bind,src="$(pwd)",target=/site <image-name:image-tag>

The `-p` flag publishes a container's ports to the host. In this case, we are mapping port 4000 on the container to port 80 on the host.
Our application can then be reached by visiting `localhost` in the browser.

The `--mount` flag specifies the type of storage that will be provided to the container.
The possible values for type are `bind`, `volume` and `tmpfs`. In this case, we are using a bind mount, that will mount a directory on the host(`"$(pwd)"` which resolves to the current directory) into the container at location `/site`.
With this type of storage, whatever happens in the container's `/site` directory is reflected in our working directory.
[Documentation on volumes](https://docs.docker.com/storage/volumes/).

You can get quick documentation on docker commands by running `docker <command> --help`.

Now, each time you want to start your development server all you have to do is run this long command(it can be longer).
But for the sake of saving limited mental resources, we have `docker-compose`.

## The docker-compose.yml file

> Compose is a tool for defining and running multi-container Docker applications.

But that doesn't stop us from using it to run a single container on our local machines.
Here's the file we will be using:

~~~yaml
version: "3"
services:
  site:
    command: jekyll serve
    image: jekyll/jekyll:latest
    volumes:
      - ./:/srv/jekyll
      - ./vendor/bundle:/usr/local/bundle
    ports:
      - 4000:4000
      - 35729:35729
      - 3000:3000
      - 80:4000
~~~

The structure of the docker-compose file is defined in the [compose file reference](https://docs.docker.com/compose/compose-file/#service-configuration-reference).

Our compose file comprises of only two keys, version and services. version specifies which compose file format we are using.
services in a multi container application would contain definitions for each type of container we wish to run.
These could be a database container, a container for the api and maybe a container for the frontend components.

The services key contains a single nested key, site. This is the name of the service that we will be running.
If the options inside look familiar, they should. Options inside the dockerfile are analogous to instructions you'd write in the Dockerfile.

command
: overrides `CMD` in the Dockerfile(if present)

image
: image to run. Similar to `FROM`

volumes
: specifies the type of storage to be afforded to the container. Similar to the `--mount` flag of the `docker run` command

ports
: bind container ports to host ports. Analogous to the `-p` flag

With the docker-compose file in place, the command to run our container decomposes to:

    docker-compose up

Or it would, if we had actually installed docker compose. Compose is a separate tool from the docker cli. You can install it from [here](https://docs.docker.com/compose/install/#install-compose).

Note that the `docker-compose.yml` file we use here doesn't depend on the image we built earlier, but uses `jekyll/jekyll:latest`.
This particular image is an official image provided by the Jekyll team and hosted on [Docker hub](https://hub.docker.com/) free for anyone to use.
Similar images are to be found for a huge number of stacks you might want to build with. These essentially negate the need for a `Dockerfile` unless you're using a highly customized environment.

## Ready

And... that's it! Now anybody wanting to start hacking on our code only needs to clone the repo, `cd` into the directory and run `docker-compose up`.
They might need to go get a coffee depending on internet speed but hey, time spent enjoying a coffee is time not wasted fighting with dependencies.
