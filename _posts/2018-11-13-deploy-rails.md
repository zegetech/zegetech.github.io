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
Deploying to a platform such as heroku abstracts away the complexities of setting up a performant environment for your application.
No need to worry about setting up and updating the OS, the database server or any of your app dependencies. You simply upload your code and the platform takes care of the rest.

The more *painful* approach is to create a VPS on a provider such as [digital ocean], [linode] or [aws lightsail].
With a vps, you control every aspect of the server. If something fails, that's on you.
Before you can even get to the joy of seeing things break, you'll need to set up your app.
This process is not much different from what you did to get the app running on your development machine.
But, on top of getting your app to run, you have to make considerations for overall site security and app performance.
And you guessed it... we're going with the painful approach.
Before you can even get to the joy of seeing things break, you'll need to set up your app.
This process is not much different from what you did to get the app running on your development machine.
But, on top of getting your app to run, you have to make considerations for overall site security and app performance.
And you guessed it... we're going with the painful approach.

## Our production environment

We are going to be setting up our server with the components as shown [here](rails-seed).

#### dev vs production 

#### web server|Nginx

#### app server|Puma

#### db server|Postgres

#### build environment

#### security - firewall, DDoS protection, https

deploy user vs root user

## getting code on the server?

#### capistrano and rake

## templates - rails-seed
