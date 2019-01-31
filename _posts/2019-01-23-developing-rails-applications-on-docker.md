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
- A docker image with an up-to-date and ready to use rails development environment,
- Access to our database of choice(postgres), and
- A means to easily run the setup

## Pre-requisites
This post assumes that you are running a current version of *docker* and *docker-compose*.
The configurations are tested to work with **docker version 18.09.1** and **docker-compose version 1.22.0**.
You can check your versions with:
~~~ shell
docker -v 
docker-compose -v 
~~~
And refer to the [installation docs](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce) if you need to upgrade.

## Building the Rails Image
~~~ Dockerfile
FROM ruby:latest
RUN apt-get update \
      && apt-get install -y --no-install-recommends nodejs \
      && rm -rf /var/lib/apt/lists/*
RUN adduser deploy --gecos '' --disabled-password
USER deploy
RUN gem install rails --version '~> 5.2' --no-document
RUN mkdir /home/deploy/app
WORKDIR /home/deploy/app
COPY --chown=deploy . ./
RUN bundle init || bundle install
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
~~~

{:.image-attribution}
Dockerfile

Let's break down a bit of this; first, we are basing our image on whatever is the latest version of the ruby image, ruby:2.6 as of this writing.
We then install *nodejs* to provide the required javascript runtime for rails.
We set up a normal user `deploy` and then set him as the active user inside the container.
You can read up on why running as a normal user is recommended in [this medium post](https://medium.com/@mode/processes-in-containers-should-not-run-as-root-2feae3f0df3b).
We then create our app directory to ensure it has the proper permissions, set it as the working directory and copy our app contents into the image.
The line `RUN bundle init || bundle install` will create a new Gemfile if starting a new project or install gems for an existing project.

With this in place, we can build the image with:
~~~ shell
docker build -t rails .
~~~
However, we will create a compose file to make configuring and starting the project easier.

## Bringing Everything Together
~~~ yml
version: "3.2"
services:
  app:
    build: .
    image: rails
    ports:
      - "80:3000"
    volumes:
      - ./:/home/deploy/app
      - bundlercache:/usr/local/bundle
    depends_on:
      - db
  
  db:
    image: postgres:11
    volumes:
      - postgresdata:/var/lib/postgresql/data

volumes:
  bundlercache:
  postgresdata:
~~~

{:.image-attribution}
docker-compose.yml

We set up two services in our compose file, *app* which will run our rails app and *db* which will provide the postgres instance.
We set the app service to bind the rails server port to port 80 on the host and provide volumes to persist app changes and the bundler cache.
~~~ yml
  - ./:/home/deploy/app # mounts the current directory(our app) into the container
  - bundlercache:/usr/local/bundle # attaches a docker managed volume and pre-populates it with the contents of /usr/local/bundle
~~~
The `./:/home/deploy/app` mount is important for development as it allows us to synchronize file changes between the host and running container.
Without it, we would need to make edits, stop the running container, rebuild the image and then re-run the container to see our changes.
The db service is also provided with a volume so we can keep database changes between reboots.

Note that the volumes as set up are really meant for a development environment. They use the default `local` driver, hence are not shareable between containers running on different hosts.
In production the volumes would need to be configured with a driver that supports multi-machine access. More on volumes [here](https://docs.docker.com/storage/volumes/).

## Creating the App
At this point we have everything set-up. We first build our image:
~~~ shell
docker-compose build
~~~
This will pull the ruby image and build our rails image.
Our configuration expects that there will be a rails app mounted inside the `~/app` directory in the container. So first, we start a new rails application:
~~~ shell
docker-compose run --no-deps app rails new . -d postgresql
~~~
This will initialize a new rails app and save changes within the current directory.
It will also create the volumes defined in our compose file, ensuring that the gems installed are persisted.
Again, like the *app* mount, the *bundlercache* volume is meant to ease the development process.
The `--no-deps` flag tells compose not to start dependent services, in this case the db service.
We are almost there, but first we need to set up the database configuration in rails.
~~~ yml
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
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
We can now create our databases with:
~~~
docker-compose run app bundle exec rails db:create
~~~
The command will first start the *db* service, pulling the image if necessary, then start and run the command in the *app* service.

One final configuration before we're ready to run. Since we will be using a bind mount in development, one of the files that is persisted is `tmp/pids/server.pid`.
Rails interprets the presence of this file to mean that the server is already running and won't start if it exists.
We can get around this by configuring `puma` to store its PID file in a location outside our project root.
Append this line to the end of `config/puma.rb`:
~~~
pidfile '/tmp/pids/server.pid'
~~~

And finally start the rails server with:
~~~ shell
docker-compose up --build
~~~
And that's that. We can navigate to http://localhost and get the rails welcome page.
![Rails welcome](/assets/images/blog/rails-docker/rails_welcome.png){:class="img-responsive center"}

## Test run
As beautiful as the rails welcome page is, it doesn't tell us if our environment behaves as we need it to.
Let's do some quick scaffolding to test. An un-imaginative *user* scaffold will do nicely.
~~~ shell
docker-compose exec app bundle exec rails g scaffold user username first_name last_name phone:integer
~~~
Then run the migrations:
~~~ shell
docker-compose exec app bundle exec rails db:migrate
~~~
And edit our routes to point to our list of users:
~~~ ruby
Rails.application.routes.draw do
  resources :users
  root "users#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
~~~
Reload the page and voila:
![User index](/assets/images/blog/rails-docker/user_index.png){:.img-responsive .center}
You can add a few users to populate the page.
![Sample users](/assets/images/blog/rails-docker/user_list.png){:.img-responsive .center}
Finally, lets shutdown our server and see if it comes back up with what we expect.
Hit `Ctrl-C` to bring down the services and wait for them to exit. Restart with a `docker-compose up`.
If everything went well you should be greeted with the list of users you created. And ..., breathe!

### Avoid If You Can
1. Building a custom image - this is all well and good for the learning experience or when there isn't a ready image on dockerhub.
  Otherwise, it's a pain not worth having.
2. Installing postgres in the rails container - two reasons why; using a separate database image means you can re-use it in a new app, and second, making postgres work in the app container is a major hustle.
  You'll need to set up the postgres user, set up authentication and find a way to make sure the db service is started when you run your app.
3. Bind mounts for 3rd-party application data - use docker managed volumes for data you don't need to interact with directly.
  Docker sets up the volumes so that the container has the proper access rights, helping avoid a world of pain in managing file permissions.

And that's that... finally. We have our environment set up and can finally bring that app to life!
Whatever you choose to build, *ganbatte*.
