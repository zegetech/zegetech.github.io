---
layout: blog 
title: Docker in your dev box
categories: developer
author: Ngari Ndung'u
blog-image: docker/whale.jpg
intro: | 
  So, you probably already know [what docker is](/blog/2018/10/29/what-and-why-docker.html) and what it can do for you. You (hopefully) also know that you don't need to be deploying thousands of services in order to start using docker now.
  This post will walk you through the process of *dockerizing* a jekyll based site(this one).
  By dockerizing the site, the number of dependencies a developer would need to install on their machines is reduced to two; [Docker engine](https://www.docker.com/products/docker-engine) and [Docker compose](https://docs.docker.com/compose/overview/).
---
![Docker crayon sketch](/assets/images/blog/{{ page.blog-image }}){:class="img-responsive center"}
{{ page.intro }}

## Docker Installation

The docker team offers two docker editions, Docker CE (community edition) and Docker EE (enterprise edition).
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
~~~
docker -v
~~~
... and run your first container:
~~~ bash
sudo docker run hello-world
~~~
Here's what this command does:
- Looks for an image named `hello-world` on your machine,
- If not found, looks for the image on [Docker hub](https://hub.docker.com/),
- Once found, it downloads the image and runs the container. The `hello-world` container runs, prints out a message and exits.

Notice the use of `sudo` in the command above. Docker by default runs as the `root` user, meaning that all docker commands will need to be prepended with `sudo`.
That however doesn't mean that it can't be changed.

### Running without sudo

The docker daemon grants access to members of the `docker` group. Any user you add to this group can run docker without using `sudo`.
This group is created automatically when you install docker.
To check if the docker group exists on your system:
~~~ bash
grep 'docker' /etc/group
usermod [tab] [tab] [tab] # hit the tab key thrice, then look for docker in the output. Takes advantage of bash completion
~~~
If for some reason you don't have the docker group, create it:
~~~
sudo groupadd docker
~~~
Then add the user to the docker group:
~~~
sudo usermod -aG docker $USER # $USER evaluates to the currently logged in user
~~~
Close your terminal, then open it again and you should be able to run:
~~~
docker run hello-world
~~~
Be sure to review docker's [security note](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface) before adding a user to the docker group.
You can check out the [post-installation docs](https://docs.docker.com/install/linux/linux-postinstall/) if you wish to customize docker further.

## The Dockerfile

Finally time to get our site on docker. The dockerfile is where we will define the environment that we need to run our site.
The `docker build` command builds an image from the dockerfile and a context, which can be a directory or a git repository.
Let's take a look at the file we'll be using:

```dockerfile        
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
```

This file shows the basic structure of a dockerfile. Every line in the dockerfile is an instruction of the form `INSTRUCTION arguments`.
The instruction is case insensitive, but is capitalized by convention.
Comments begin with a `#` and should also appear on their own line.
Here's a rundown of the instructions we're using in our dockerfile:

+ **`FROM`** specifies the base image to build our image off of. [Alpine](https://alpinelinux.org/about/) in this case. This instruction is required and should come before other instructions. Only `ARG` is allowed to come before.
+ **`RUN`** runs a command inside the container. The command is the same as what you'd run in your terminal. There's no limit to how many RUN instructions you can have.
+ **`COPY`** copies the specified directory on the host to a location in the image.
+ **`VOLUME`** sets a location for the container to persist data
+ **`WORKDIR`** sets the directory that all commands coming after will be run in
+ **`EXPOSE`** tells the docker daemon what ports our application will be reachable on
+ **`ENTRYPOINT`** provides the default command that will be run when the container is instantiated
+ **`CMD`** sets the command to run when the container is instantiated. When used in conjuction with `ENTRYPOINT`, it is used to provide additional parameters to the `ENTRYPOINT` command.

There are more instructions that are not used here. The full set is on the [dockerfile reference](https://docs.docker.com/engine/reference/builder/) page.

## First run

Before we can run the container, we have to build our image first.
~~~
docker build -t name:tag . # the dot specifies the current directory as the build context
~~~
This command will run through the `Dockerfile` executing instructions sequentially.
It will look for the image specified in the `FROM` instruction locally, and download it if its missing.
Docker will then run the next instruction and output an intermediate image. This process is repeated until we have our final image.

Now to run our image:
~~~
docker run -p 127.0.0.1:80:4000 --mount type=bind,src="$(pwd)",target=/site <image-name:image-tag>
~~~
The `-p` flag publishes a container's ports to the host. In this case, we are mapping port 4000 on the container to port 80 on the host.
Our application can then be reached by visiting [localhost](http://localhost) in the browser served on the default port:80

The `--mount` flag specifies the type of storage that will be provided to the container.
The possible values for type are `bind`, `volume` and `tmpfs`. In this case, we are using a bind mount, that will mount a directory on the host(`"$(pwd)"` which resolves to the current directory) into the container at location `/site`.
With this type of storage, whatever happens in the container's `/site` directory is reflected in our working directory.
[Documentation on volumes](https://docs.docker.com/storage/volumes/).

You can get quick documentation on docker commands by running `docker <command> --help`.

Now, each time you want to start your development server all you have to do is run this long command (and it can get even longer).
But for the sake of saving limited mental resources, we have [docker-compose](https://docs.docker.com/compose).

## Docker Compose
![docker-compose](/assets/images/blog/docker/docker-compose.png){:class="img-responsive center"}

> Compose is a tool for defining and running multi-container Docker applications.

Using a `docker-compose.yml` or `docker-compose.yaml` file, we define the multi-contaier application to be built and run. However that doesn't stop us from using it to run a single container on our local machines.
Here's the `docker-compose.yml` file we will be using:

~~~ yaml
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

Our compose file comprises of only two keys, `version` and `services`. `version` specifies which compose file format we are using.
`services` in a multi container application would contain definitions for each type of container we wish to run.
These could be a database container, a container for the api and maybe a container for the frontend components.

The `services` key contains a single nested key, `site`. This is the name of the service that we will be running.
If the options inside look familiar, they should. Options inside the dockerfile are analogous to instructions you'd write in the Dockerfile.
+ **`command`** overrides `CMD` in the Dockerfile(if present)
+ **`image`**: defines the image to run. Similar to `FROM`
+ **`volumes`** specifies the type of storage to be afforded to the container. Similar to the `--mount` flag of the `docker run` command
+ **`ports`** binds the container ports to host ports. Analogous to the `-p` flag

With the docker-compose file in place, the command to run our container decomposes to:
~~~
docker-compose up
~~~
Or it would, if we had actually installed docker compose. Compose is a separate tool from the docker cli. You can install it from [here](https://docs.docker.com/compose/install/#install-compose).

If we maybe wanted to run our server with live-reload enabled:
~~~
docker-compose run --service-ports site jekyll serve --livereload
~~~
This command runs a *new* container for the specified service, `site` overriding the command specified with `command` or `CMD`.
The `--service-ports` flag will publish the ports specified in the compose file, which the `run` command doesn't publish by default.
The ports can also be supplied with the `-p` flag to avoid collision with containers that may already be running.

Note that the `docker-compose.yml` file we use here doesn't depend on the image we built earlier, but uses `jekyll/jekyll:latest`.
This particular image is an official image provided by the Jekyll team and hosted on [Docker hub](https://hub.docker.com/), free for anyone to use.
Similar images are to be found for a huge number of stacks you might want to build with. These essentially negate the need for a `Dockerfile` unless you're using a highly customized environment.

## Shell access to the container

When things break, as they normally do, or when you want to evolve your environment, a shell into the container is invaluable.
We can open a shell into an already running container by running:
~~~
docker-compose exec site sh
~~~
Or launch a new container and open a shell into it with:
~~~
docker-compose run site sh
~~~
These commands require that you run them from the same directory as your `docker-compose.yml` or specify the path:
~~~
docker-compose -f /path/to/compose.yml run site sh
~~~
You can alternatively use similar commands provided by the Docker CLI:
~~~bash
docker exec -it --rm [container] sh # requires a running container
docker run -it --rm [image] sh # creates and starts a new container
~~~
The combined flags `-i` and `-t` open an interactive terminal into the container, while the `--rm` flag destroys the container once the command exits.
To simplify this command, you can create an alias with the following
```sh
# If bash is installed in containter
dsh() { docker exec -it $@ bash; }
# if bash isn't in the containter 
dsh() { docker exec -it $@ sh; }
```
This will allow you to log into the container with the following command
```bash
dsh $CONTAINER
```
This can be run from any location in the project, unlike the docker-compose version. 

### Listing Docker containers
You can find a list of `$CONTAINER`s to `exec` into by running:
~~~
docker container ps
# or 
docker ps
~~~
Once we have a shell, we can run commands as we would normally:
~~~shell
bundle add bigdecimal # had to do this when building my image
bundle install
jekyll serve --host 0.0.0.0
~~~
Since we provided a volume to our container, the changes we made to the Gemfile are persisted and we can update our image with:
~~~
docker-compose build
~~~
Take a look at the [compose command-line reference](https://docs.docker.com/compose/reference/) for a full list of commands and their usage.

## Ready

And... that's it! Now anybody wanting to start hacking on a docker-compose project only needs to clone the repo, `cd` into the directory and run `docker-compose up`. The amazing part is that it could be any project stack, php, ruby, java, node, anything. No need to set up a local machine to get a working environment. The project comes bundled and isolated thanks to Docker so it will work great without interfering with your current setup. 

They might need to go get a coffee depending on internet speed but hey, time spent enjoying a coffee is time not wasted fighting with dependencies.
