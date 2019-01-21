---
layout: blog
title: Rails Development With Docker
category: developer
author: Ngari Ndung'u
blog-image:
blog-intro:
---

There's always a big difference between 'I have done this before' and having the confidence to reproduce whatever it is I had done.
Have I dockerized an application before? [Sure](2018-11-08-developing-with-docker.md). Did I find it easy to do the same for rails?
No, easy is not exactly what I would call it.

# Failure!

## Which image?

I was aware that I could probably get a pre-built rails image to get me going, but I wanted to build my own.
First choice, which OS to base it off of. I went with alpine for its small size.
The problem with this choice is that I am not conversant with alpine's ecosystem, starting with APK, the package manager.
Using apk is relatively straight-forward, so not a deal breaker. The base installation has a number of missing packages that am used to having by default.
On those later.
~~~Dockerfile
FROM alpine:latest
~~~

## Getting Ruby

I of course wanted the latest version of ruby and rails, at the time [ruby 2.6] and [rails 5.2.2].
On checking [alpine packages] I realized that ruby 2.6 was not yet available. Leaving two choices to install rails, RVM or compilation.
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

# Success

So, fully custom image was out of the question. I went looking for an image with rails set and ready to run.
Unluckily for me the [official rails image] is deprecated and the recommendation is to use the [ruby image].
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

## docker-compose.yml

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

## Starting a new app

With the above setup, I created a new rails app in the same directory with `docker-compose run app rails new . -d postgresql`.
Since this command is run by the root user inside the container, all files created are owned by root, resulting in permission errors in trying to edit the files.
This was solved by changing file ownership inside the container by running `chown -R 1000:1000 .` inside the `/app` directory.

A first attempt to run `rails server` resulted in a 'Could not find a JavaScript runtime' error, which was solved by installing `nodejs`.

## Database configuration

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
`docker-compose exec app bin/rails db:create` is the magic chant, which resulted in 'role root does not exist'.
I edited my `config/database.yml` and set the username directive to root in the default config.
The next attempt to create the databases resulted in 'Peer authentication failed for user "postgres"'. Solved by this line in the Dockerfile;
~~~
RUN sed -i 's/peer/trust/' /etc/postgresql/9.6/main/pg_hba.conf
~~~
which tells postgres to trust all local connections. And finally, a first successful run.

Bringing the container down and then starting it back up however took me back to the 'NoDatabaseError'.
I needed to find a way to persist database data. A first attempt to use a volume mapped to `/var/lib/postgresql/9.6/main/base` did not work.
