---
layout: blog
title: Developing Rails Applications on Docker
date: 2019-01-23 09:48 +0300
categories: developer
published: false
author: Melvin Atieno, Ngari Ndung'u, Tom Nyongesa
blog-image: rails-docker/railsondocker.png
intro: |
  Rails and Docker are important components in the development processes at Zegetech.
  Rails is our chosen platform for most of what we build, and docker provides pain-free environment management both for development and in production.
  We have previously covered these two technologies separately, and this post covers the sweet spot at their intersection.
  We will take you through the process of configuring a rails development environment on docker, and configure a postgres database for it.
---

![Rails on docker](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}

{{page.intro | markdownify}}

I would suggest you have a look at the following posts, if this is the first time you are encountering Docker and/or Rails:
- [What and Why Ruby on Rails](2018-10-17-why-ruby-on-rails.md)
- [What and Why Docker](2018-10-29-what-and-why-docker.md)
- [Developing with Docker](2018-11-08-developing-with-docker.md)

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
docker run -it --rm --mount type=bind,src="$(pwd)",target=/app rails rails new . -d postgresql -B
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
At this point the file is owned by root so first:
~~~ shell
docker-compose run app chown -R 1000:1000 /app
~~~

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

Note the entry `host: db` matches the name of our *db* service. Docker automatically sets up networking between the containers and makes exposed ports accessible between them.
You can refer to the [compose networking page](https://docs.docker.com/compose/networking/) for details.
We first run bundler; `docker-compose run app --no-deps bundle` then run our application with:
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
![Rails welcome](/assets/images/blog/rails-docker/rails_welcome.png){:class="img-responsive center"}
There is still however, the little matter of file permissions to address.

## Potential Pain Points

### File Permissions
With our current setup, all files generated by the `rails new` command are owned by root.
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
Alternatively, we could use the `-u` flag with docker-compose to set the user per command.
~~~
docker-compose exec -u 1000:1000 app bin/rails g model user name phone:integer
~~~
The 1000:1000 should correspond to the uid and gid of the user running on the host. Run `id` on your terminal to get these values.

After running the image a first time, rebuilding the image may fail due to file permissions on the `tmp/db` folder.
We simply add a `.dockerignore` file with this path to tell docker to leave the folder out of its build context.
~~~
tmp/*
~~~

{:.image-attribution}
.dockerignore

### Avoid If You Can
1. Building a custom image - this is all well and good for the learning experience or when there isn't a ready image on dockerhub.
  Otherwise, it's a pain not worth having.
2. Installing postgres in the rails container - two reasons why; using a separate database image means you can re-use it in a new app, and second, making postgres work in the app container is a major hustle.
  You'll need to set up the postgres user, set up authentication and find a way to make sure the db service is started when you run your app.

And that's that... finally. We have our environment set up and can finally bring that app to life!
Whatever you choose to build, *ganbatte*.
