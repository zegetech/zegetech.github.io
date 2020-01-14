---
layout: blog
title: Why Ruby on Rails?
categories: developer, rails
author: Ngari Ndung'u
blog-image: ror/rails-blog.jpg
intro: |
  Ruby on Rails, abbreviated RoR or just Rails is a web application framework for developing database backed web applications.
  Rails has been used to build some of the most popular websites including Github, Airbnb and Hulu. Twitter also began life as a rails application.
  While the choice of framework is not a straight forward one, choosing rails looks like a pretty safe bet.
keywords: Ruby Rails MVC Framework RVM Rails-API
---
{:.post-figure}
![Photo of a railroad with pink vegetation](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}
<span style="font-size:12px; margin:auto; display:block; text-align:center;">Photo by Esteban Trivelli on Unsplash</span>

{{ page.intro }}

As the name implies, rails is built on top of ruby. [Ruby](https://www.ruby-lang.org/en/) is a dynamic programming language built for simplicity and speed.
Ruby borrows concepts from other programming languages such as perl and lisp and has a simple easy to read syntax.
Here's the iconic hello world program:
```ruby
puts "Hello world!"
```
Feel like seeing your name several times?
```ruby
name = "awesome name here"
5.times { puts name }
```
It can't get any easier can it? See more examples [here](https://www.ruby-lang.org/en/about/)

### Rails and competitors

Applications built with rails follow the MVC (Model-View-Controller) architectural pattern.
Similar frameworks include [django](https://www.djangoproject.com/)
, built on python and [Laravel](https://laravel.com/)
, built on PHP.
These frameworks mostly offer similar features, with an [ORM](https://guides.rubyonrails.org/active_record_basics.html)(Object Relational Mapping) and a templating language being default.

The ORM abstracts away the complexity of mapping data between your application and database, and provides a means to evolve your database safely.
The templating language is what allows you to generate html pages that represents whatever data you want to present from the database.
While you could use these frameworks for static websites(bazooka to a fist fight), they are really meant for data backed applications.


With development quickly becoming 'api-first', most frameworks offer a way for spitting out *json/xml* in addition to normal html pages.
Django has the *django REST framework*, while the *rails-api* gem provides api-only functionality in rails prior to version 5.
As from [rails 5.0](https://guides.rubyonrails.org/5_0_release_notes.html) rails-api is built into the framework.

    rails new <appname> --api # is all you need to get running

### The good

Compared to other frameworks, rails is highly opinionated, meaning that some of the choices you would have to make otherwise have already been made for you.
This is easily reflected in the rails [doctrine](https://rubyonrails.org/doctrine/). If you're willing to let rails drive, it can ease a lot of your pain.

The rails community provides superb [documentation](https://guides.rubyonrails.org/) for every major rails version. This not only allows you to quickly get up to speed but is a boon for when something breaks.
The documentation in kindle format is easily one of the best I have seen, providing a navigation experience on par with the website.

Worried about some important but daunting functionality? Don't be, there's probably a *gem* or two that could help.
Rails uses [*RubyGems*](https://rubygems.org/) for package management, giving you access to a wide array of community contributed gems that do everything from making text prettier to handling authentication.

Proper documentation, availability of packages and an opinionated framework combine to make development fast, really fast.

### Sharp edges

Ruby is no butterknife. It's more like a well honed saber, mishandle it and you'll get cut!
In ruby everything is an object, making it possible to set properties on all types, yes even integers.
It also makes no attempt to stop you from overloading methods in the base classes. Name your methods a certain way and you'll end up chasing some interesting bug.
Interesting, but maybe not fun.

Ruby and by extension the rails framework provide a lot of functionality straight out of the box.
Some of this functionality can also be achieved in many different ways. Chances are if you can write short ruby code, someone can write it shorter.

If you choose to start building with rails, be prepared for a journey with lots to see but with a lot more that you will miss.
Programming after all is a journey of discovery.

## First Steps

So, where do you go after you decide to start building with rails?

### Just enough Ruby

I'd say that at least a basic understanding of ruby is needed.
This is especially true if you're coming from the world of statically typed languages. The differences might hit you hard:
- No type checking
- No compilation(so no compile time snack)
- Weird structure - no semi-colon to end a statement, optional braces in function calls, no curly brackets in function definitions, and more.

For a relatively quick rundown of ruby syntax, the [ruby koans](http://rubykoans.com/) can be a useful resource.
The koans are a test driven walk through the ruby language that aims to teach syntax, structure and basic functions.
Once you reach *enlightenment* you'll be ready to not get overwhelmed by rails.
You can also find the official documentation at [ruby-doc](https://ruby-doc.org/).

### Installation

Ruby works best with unix based operating systems such as MacOs and Linux. Windows doesn't play too well and you'll end up hacking your system considerably to make it work. On a linux based system, ruby will be available from the package repositories. On debian/ubuntu based systems run
```bash
sudo apt-get install ruby
```
This will install ruby system-wide for all users. There are a few issues with installing ruby this way.
First if on an older distribution, the installed ruby packages may be outdated.
Second, what happens if you want to work on a project that relies on a lower ruby version?
You would have to downgrade your install, work on the project, and when done re-install the higher version. Not very performant.

A ruby version manager helps smooth out these bumps. Popular options include [rbenv](https://github.com/rbenv/rbenv) and [RVM](https://rvm.io/). I've used RVM so it's what I'd recommend.
RVM is installed on a per-user basis and installs the different ruby versions in a folder in the user's home directory.
Follow instructions on the [install page](https://rvm.io/rvm/install) to get rvm.
Once installed you simply choose which ruby version to develop on:
```bash
rvm list known # show available rubies
rvm install 2.5.1
rvm use 2.5.1 --default # use ruby-2.5.1 and set it as default
ruby -v # make sure that you have ruby installed
```
With ruby installed we're ready to install rails:
```bash
gem -v # ensure that you have rubygems installed
gem install bundler # dependency management package
gem install rails # fetch the latest rails packages
rails -v # show installed rails version
```
> Always ensure that the rvm PATH entry is the last line in your .bashrc

### Getting Started

The [official documentation](https://guides.rubyonrails.org/getting_started.html) does a great job of getting you started.
It walks you through the process of developing a weblog, with a stepwise introduction to the various features of rails.

The [Rails Girls](http://guides.railsgirls.com/) website also has a great collection of resources.
The guides take you from installation to building your apps and through to testing and deployment.
And no, the resources aren't just meant for girls.

If, like me, getting through an entire guide totally drains you, I'd recommend going through just enough material to get your own project started.
The guides can then serve as reference material. After all, not all of us want to write blogs or need another todo app.

### Common Rails Commands

    rails new <appname> # start a new rails project
    rails server # start the rails server
    rails generate <model|controller|migration...> # have rails generate starter code for you
    rails console # open an interactive console to your app

The rails console provides you with a way to interact with your application outside of the browser window.
In it you can explore and add data to your database, try out code before adding it to your codebase and is just indispensable when bugs show up.
Learn it and you will be all the happier for it.

### Go forth...

This here was just a start. There is a lot of material out there on working with rails.
Rails is a mature technology and most solutions will only be a google search away. So what are you waiting for? Go forth and create!
