---
layout: blog
title: Developing Rails Applications on Docker
date: 2019-01-23 09:48 +0300
categories: developer
published: false
author: Melvin Atieno, Ngari Ndung'u, Tom Nyongesa
blog-image: 
intro: 
---

{{page.blog-image}}{:.img-responsive .center}
{{page.intro | markdownify}}

I would suggest you have a look at the following posts, if this is the first time you are encountering Docker and/or Rails:
- [What and Why Ruby on Rails](2018-10-17-why-ruby-on-rails)
- [What and Why Docker](2018-10-29-what-and-why-dockermd)
- [Developing with Docker](2018-11-08-developing-with-docker.md)


This post is structured into two main sections:
1. [Developer Experience](#1-the-experience) - blow by blow of the process, challenges encountered and how they were solved.
2. [Instructional](#2-step-by-step) - go here for the filtered step by step process

# 1. The Experience

## What didn't work

### Custom image

I was aware that I could probably get a pre-built rails image to get me going, but I wanted to build my own.
First choice, which OS to base it off of. I went with alpine for its small size.
The problem with this choice is that I am not conversant with alpine's ecosystem, starting with APK, the package manager.
Using apk is relatively straight-forward, so not a deal breaker. The base installation has a number of missing packages that am used to having by default.
On those later.
~~~Dockerfile
FROM alpine:latest
~~~

### Getting Ruby

I of course wanted the latest version of ruby and rails, at the time [ruby 2.6](https://www.ruby-lang.org/en/news/2018/12/25/ruby-2-6-0-released/) and [rails 5.2.2](https://weblog.rubyonrails.org/2018/12/4/Rails-5-2-2-has-been-released/).
On checking [alpine packages](https://pkgs.alpinelinux.org/packages) I realized that ruby 2.6 was not yet available. Leaving two choices to install rails, RVM or compilation.
I chose to go with RVM to avoid having to install the required build tools for compilation.
Not a good decision seeing as this was for a container really intended to run one application.
~~~Dockerfile
RUN apk update
RUN \curl -sSL https://get.rvm.io | bash -s stable
~~~
Should work right? One problem though, both curl and bash are not installed. Easily fixed by adding `RUN apk add curl bash` before the curl command.
On running the build, rvm will complain that it could not add group `rvm`, which is the group used to give users access to rvm.
Turns out alpine doesn't have the `groupadd` command installed. So again we ammend our command to `RUN apk add curl bash shadow`.
The `shadow` package provides commands for user and group management.

Re-running the build completes with rvm complaining about being run as the root user.
The instructions for [installing for root only](https://rvm.io/support/faq#i-want-to-install-for-root-only) resulted in two more lines in the Dockerfile:
~~~Dockerfile
RUN echo 'export rvm_prefix="$HOME"' > /root/.rvmrc
RUN echo 'export rvm_path'="$HOME/.rvm" >> /root/.rvmrc
~~~
With that the rvm configuration was done, all that was left was to run it. After rebuilding the image and opening a shell into the container, running rvm resulted in a `command not found` error.
Expected since I had not configured the path to rvm, so I tried to source it; `source ~/.rvm/scripts/rvm`, and got:
~~~shell
ps: unrecognized option: p
~~~
That did it for me, I wasn't about to start debugging rvm scripts. All I needed was ruby! Plan B it was.

## What Worked

So, fully custom image was out of the question. I went looking for an image with rails set and ready to run.
Unluckily for me the [official rails image](https://hub.docker.com/_/rails/) is deprecated and the recommendation is to use the [ruby image](https://hub.docker.com/_/ruby/).
Not quite the ready solution but better than what I had.

~~~Dockerfile
FROM ruby:latest
RUN gem install rails --version '~> 5.2' --no-document
RUN apt-get update \
      && apt-get install -y --no-install-recommends nodejs postgresql \
      && rm -rf /var/lib/apt/lists/*
RUN sed -i 's/peer/trust/' /etc/postgresql/9.6/main/pg_hba.conf
WORKDIR /app
CMD ["/bin/bash", "./entrypoint.sh"]
~~~
The `ruby:latest` image is built off of debian and has ruby 2.6 installed. This took me to a more familiar OS and solved my issues with ruby installation.

### docker-compose.yml

~~~yaml
version: "3"
services:
  app:
    build: .
    image: rails
    ports:
      - "80:3000"
    volumes:
      - ./:/app
      - ./tmp/bundle:/usr/local/bundle
~~~
This compose file allows me to run `docker-compose build` after making changes to the Dockerfile, and a `docker-compose up` to bring up the container.
It forwards port 3000 on the container onto port 80 on the host and sets up volumes for the application and bundler cache.

### Starting a new app

With the above setup, I created a new rails app in the same directory with `docker-compose run app rails new . -d postgresql`.
Since this command is run by the root user inside the container, all files created are owned by root, resulting in permission errors while trying to edit the files.
This was solved by changing file ownership inside the container by running `chown -R 1000:1000 .` inside the `/app` directory.

A first attempt to run `rails server` resulted in a 'Could not find a JavaScript runtime' error, which was solved by installing `nodejs`.

### Database configuration

Now I had rails running but trying to open `localhost` on the browser resulted in an error page with a `PG::ConnectionBad` error.
The cause, postgres is not started when the container starts. The solution:
~~~shell
#!/bin/bash
# entrypoint.sh
service postgresql start
# conditional db:create
# bin/rails db:create
bin/rails s -b 0.0.0.0
~~~
This ensures that the postgresql service is started before the rails server is brought up.

A rebuild and container restart and the error changed to `ActiveRecord::NoDatabaseError`. I had not created my development database.
`docker-compose exec app bin/rails db:create` is the magic chant, which resulted in;role root does not exist'.
I edited my `config/database.yml` and set the username directive to root in the default config.
The next attempt to create the databases resulted in 'Peer authentication failed for user "postgres"'. Solved by this line in the Dockerfile;
~~~
RUN sed -i 's/peer/trust/' /etc/postgresql/9.6/main/pg_hba.conf
~~~
which tells postgres to trust all local connections. And finally, a first successful run.

Bringing the container down and then starting it back up however took me back to the 'NoDatabaseError'.
I needed to find a way to persist database data. A first attempt to use a volume mapped to `/var/lib/postgresql/9.6/main/base` did not work.

### Separate service for postgres

Microservices is the name of the game nowadays right? Why keep hustling to fit postgres into the app box? It was time for a postgres box.
I updated the docker-compose.yml to add:
~~~yaml
  app:
    ...
    depends_on:
      - db

  db:
    image: postgres:11
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
~~~
This specifies a new 'db' service based off the official postgres docker image. It also specifies a volume to persist database changes.
The `depends_on:` entry ensures that the db service is started before the app service.
After this I updated the `config/database.yml` file to add:
~~~yml
  host: db
  user: postgres
~~~
I could alternatively have set up the `DATABASE_URL` environment variable to `postgresql://db/app_development` for the development database.
How docker sets up networking to enable this is documented [here](https://docs.docker.com/compose/networking/).

I also updated the dockerfile and startup script to remove all postgresql set up steps. Finally time for truth:
~~~shell
docker-compose up --build
~~~
The database service came up successfully but the rails service failed raising; "A server is already running. Check /app/tmp/pids/server.pid."
The solution was to update the startup script so that it first removes the *server.pid* before starting the rails server.
~~~shell
rm -f tmp/pids/server.pid
bin/rails s -b 0.0.0.0
~~~
Trying to rebuild the image failed with a *PermissionError* for the `tmp/db` path. I figured that this was probably occuring when docker copies the files into the build context. So, we just tell docker to ignore that path:
~~~text
# .dockerignore
tmp/\*
~~~
And with that I got a successful build. With the services started, all that was left was to create the databases:
~~~shell
docker-compose exec app bin/rails db:create
~~~
... and stare at the beautiful "Yay! You’re on Rails!" page.

# 2. Step by Step

Lets start by defining what our end goal is. We want:
- A docker image with an up-to-date and ready to use rails development environment
- Access to our database of choice(postgres)
- A means to easily run the setup

## Building the Rails Image
{: linenumbers=normal}
~~~ Dockerfile
FROM ruby:latest
RUN gem install rails --version '~> 5.2' --no-document
RUN apt-get update \
      && apt-get install -y --no-install-recommends nodejs \
      && rm -rf /var/lib/apt/lists/*
WORKDIR /app
EXPOSE 3000
CMD ["/bin/bash", "entrypoint.sh"]
~~~

{:.image-attribution}
Dockerfile

Let's break down a bit of this; first, we are basing our image on whatever is the latest version of the ruby image, ruby:2.6 as of this writing.
We then install rails globally and install nodejs to provide the required javascript runtime for rails.
We finish off by providing a script to be run when the container is started:
~~~ shell
#!/bin/bash
# clear pid before starting server
rm -f tmp/pids/server.pid
bin/rails s -b 0.0.0.0
~~~

{:.image-attribution}
entrypoint.sh

This script first deletes the `server.pid` file, where a running rails server saves its process id.
Rails interprets the presence of this file to mean that the server is already running and won't start if it exists.
The script then starts the rails server allowing it to accept connections from outside the container; `-b 0.0.0.0`.

With these in place, we can build the image with:
~~~ shell
docker build -t rails .
~~~

## Creating the App
Our configuration expects that there will be a rails app mounted inside the /app directory in the container. So first, we start a new rails application:
~~~ shell
docker run -it --mount type=bind,src="$(pwd)",target=/app rails rails new . -d postgresql -B
~~~
This will initialize a new rails app and save changes within the current directory.
We skip running `bundle install` for now. This is usually a long running process and we will want to persist the files it downloads.

We can now start to think about setting up the postgres server. Again, we will use a docker image for this.
However, we will create a compose file to make configuring and starting the project easier.

## Bringing Everything Together
~~~ yml
version: "3"
services:
  app:
    build: .
    image: rails
    ports:
      - "80:3000"
    volumes:
      - ./:/app
      - ./tmp/bundle:/usr/local/bundle
    depends_on:
      - db
  
  db:
    image: postgres:11
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
~~~

{:.image-attribution}
docker-compose.yml

We set up two services in our compose file, *app* which will run our rails app and *db* which will provide the postgres instance.
We set the app service to bind the rails server port to port 80 on the host and provide volumes to persist app changes and the bundler cache.
The db service is also provided with a volume so we can keep database changes between reboots.
We are almost there, but first we need to set up the database configuration in rails.
~~~ yml
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password:
  pool: 5

development:
  <<: *default
  database: app_development


test:
  <<: *default
  database: app_test
~~~

{:.image-attribution}
config/database.yml

We can now run our application with:
~~~ shell
docker-compose up
~~~
This command will first attempt to start our *db* service, due to the `depends_on` entry in the *app* service.
It will pull the image from docker hub if it isn't available locally then start it. It will then start the *app* service.
Now the only thing missing is our databases. Lets create them:
~~~
docker-compose exec app bin/rails db:create
~~~
And that's that... almost. We can navigate to `localhost` and get the rails welcome page.
There is still however, the little matter of file permissions to address.

## Fixing File Permissions
At this point, all files generated by the `rails new` command are owned by root.
Meaning that only the root user can edit them. We can gain ownership of the files by running:
~~~
docker-compose exec app chown -R 1000:1000 /app
~~~
But that only solves it for already created files. We would need to re-run this command each time we use rails generators.
We fix this by editing the Dockerfile to add the USER instruction:
~~~ dockerfile
# initial content remains the same
USER 1000:1000
CMD ["bin/bash", "entrypoint.sh"]
~~~
After rebuilding the image, any files created by rails will have the proper ownership.

Rebuilding the image may fail due to file permissions on the `tmp/db` folder. We simply add a `.dockerignore` file with this path to tell docker to leave the folder out of its build context.
~~~
tmp/*
~~~

{:.image-attribution}
.dockerignore
