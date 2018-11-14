---
layout: blog 
title: Deploying a monolithic rails application
author: Ngari Ndung'u
blog-image: 
intro: So, you finally have your app in a state that you aren't too embarrassed to show off. How do you open it up to the world?
  How do you manage the influx of users? How will you keep it safe from the *dangerous* internets? These are questions we face every time we work on a new product.
  This post explores one of the ways to deploy your shiny new rails application and the common tooling behind it.
---

{{ page.intro }}

## Monolithic?

If this invokes an image of the stone pillars at [stonehedge], good. An app built on the monolithic architecture is easily viewed as one integrated piece.
The database, business logic, API and user interface components are all worked on within the same codebase, and deployed as a whole.
If you have built a rails app following the [introductory guide](https://guides.rubyonrails.org/getting_started.html) you will end up with a monolith.
Heres the directory structure you get when you initialize a rails application with `rails new [appname]`:
![Directory structure of a new rails application]()
Everything that constitutes your app will be found within this one folder. User interface components? You'll find that in `app/views`.
Data models? That's in `app/models`. How you get data onto your user interface? `app/controllers`.
That's the typical MVC framework setup.

You will have heard of micro-services in the last few years. The micro-service architecture encourages the development of applications as disparate services, with each service catering to a single business requirement.
Each service can be viewed as a monolith application, albeit with reduced business scope.
We'll cover deploying a *traditional* rails app in this post, and follow it up with deploying a micro-services based app in a later post.

## Deployment options

Unless you are lucky enough to work in a server room and have one of those servers as your development machine, you will need somewhere to host your site.
We have the choice of deploying our site to a PaaS provider such as [Heroku] or using a VPS from a IaaS provider.
Deploying to a platform such as heroku abstracts away the complexities of setting up a performant and secure environment for your application.
No need to worry about setting up and updating the OS, the database server or any of your app dependencies. You simply upload your code and the platform takes care of the rest.

The more *painful* approach is to create a VPS on a provider such as [digital ocean], [linode] or [aws lightsail].
With a vps, you control every aspect of the server. If something fails, that's on you.
The process of setting up is not much different from what you did to get the app running on your development machine.
But, on top of getting your app to run, you have to make considerations for overall site security and app performance.
And you guessed it... we're going with the painful approach.

## Our production environment

### Base Environment

You will mostly get your pick of operating system with most cloud providers. And here is where the choices start.
We will be going with Ubuntu 18.04(Bionic Beaver). This is an LTS(long term support) version of Ubuntu with at least 5 years of security support.
Unless your deploy will be short lived, make sure to choose an OS with guaranteed updates.

#### User Setup

When you create a new server with the cloud providers defaults, you mostly receive a root password in your email.
You can then log in to the server as the root user. This base setup is insecure. If your password was to fall into the wrong hands, your server would no longer be yours!
Running as the root user also does not leave room for error. There will be no prompts warning you when you try to remove a critical system file.

It is recommended practice to always create a *normal* user and use SSH key authentication to log in to your server.
You can refer to [this article](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04) for an explanation and step-by-step.

An alternative to performing these steps after your server has been built is to provide a script that the cloud provider will run as part of the provisioning task.
This is referred as *User data* on digital ocean while aws lightsail asks for a *launch script*. Here's an [example script](https://github.com/kgathi2/rails_seed#vps-preparation).
You can also provide your SSH public key to completely skip setting up password login to the server.

#### Basic network security setup

The internet can be a scary dangerous place. This becomes obvious within hours of provisioning a new server.
The number of failed login attempts that show up in my server logs is just insane. A firewall is the first line of defence for your server.
UFW(uncomplicated firewall) on ubuntu gives us an interface to setup rules for how our server handles traffic.
We can choose to only leave open the few ports we will be using; `80` and `443` for the webserver, `22` for ssh.
We can also filter based on network protocol, `tcp` or `udp`, ip ranges and much more.
[This article](https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw/) shows how to get a basic setup going.

[Fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) is the next tool we will want to set up.
Fail2ban provides some protection against brute-force attacks on your site. It can detect repeated failed authentication attempts and automatically ban the offending ip for a set time.
This has the added advantage of saving your server resources that would have been consumed replying to these attempts.

#### Server components

- Web server - [Nginx](https://nginx.org/en/) is a high performance web server with powerful reverse proxy features.
  We will be setting up Nginx to serve static files(html, css, images...) for our site, while forwarding all other requests to Puma.
  [The rails documentation](https://guides.rubyonrails.org/configuring.html#using-a-reverse-proxy) provides a sample configuration file.
- Application server - [Puma](https://github.com/puma/puma) is the default server for rails apps and what starts when you run `rails server` on your development machine.
  There is thus no special effort required to install and run puma. It also comes with sensible defaults that can be applied in production.
- Cache system - [memcached](https://memcached.org/) - caching helps speed up our server response times by storing the results of database queries in RAM and serving subsequent requests from this stored data.
  Memcached support is baked into rails. Once [installed], there is just one [configuration option](https://guides.rubyonrails.org/caching_with_rails.html#activesupport-cache-memcachestore) to change.
- Redis
  [Redis](https://redis.io/) is an in-memory key-value database normally used in rails applications to provide a job queue and for caching.
  In the context of our application, it is a requirement for [sidekiq](https://github.com/mperham/sidekiq).
- sidekiq - is a background job scheduler for ruby applications. Rails provides a default job scheduler but that is really only meant for development.
  It holds its jobs in RAM, thus all enqued jobs are lost when the server shuts down. Sidekiq persists jobs between server restarts.
  Support for sidekiq is also baked into rails and can be configured as shown [here](https://guides.rubyonrails.org/active_job_basics.html#setting-the-backend).
#### dev vs production 

We will install a few extra packages on our *production* machine:

#### Web server - Nginx

#### Que manager - sidekiq

#### Cache system - memcached

#### Redis

#### app server|Puma

#### db server|Postgres

#### build environment

#### security - firewall, DDoS protection, https

- ufw
- fail2ban
- 
deploy user vs root user

## getting code on the server?

#### capistrano and rake

## templates - rails-seed
