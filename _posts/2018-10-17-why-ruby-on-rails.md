---
layout: news
title: "Why Ruby on Rails?"
categories: developer
blog-image: rails-blog.jpg
intro: Ruby on Rails, abbreviated RoR or just Rails is a web application framework for developing database backed web applications.
  Rails has been used to build some of the most popular websites including Github, Airbnb and Hulu. Twitter also began life as a rails application.
  While the choice of framework is not a straight forward one, choosing rails looks like a pretty safe bet.
---
{:.post-figure}
![Photo of a railroad with pink vegetation](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}
<span style="font-size:12px; margin:auto; display:block; text-align:center;">Photo by Esteban Trivelli on Unsplash</span>


{{ page.intro }}

As the name implies, rails is built on top of ruby. Ruby is a dynamic programming language built for simplicity and speed.
Ruby borrows concepts from other programming languages such as perl and lispand has a simple easy to read syntax.

    puts "Hello world!"

It can't get any easier can it?

### Rails and competitors

Applications built with rails follow the MVC(Model-View-Controller) architectural pattern.
Similar frameworks include [django], built on python and [Laravel], built on PHP. 
These frameworks mostly offer similar features, with an ORM and a templating language being default.

While you could use these frameworks for static websites(bazooka to a fist fight), they are really meant for data backed applications.
The ORM abstracts away the complexity of mapping data between your application and database, and provides a means to evolve your database safely.

With development quickly becoming 'api-first', most frameworks offer a way for spitting out *json/xml* in addition to normal html pages.
Django has the *django REST framework*, while the *rails-api* gem provides api-only functionality in rails prior to version 5.
As from [rails 5.0] rails-api is built into the framework.

    rails new <appname> --api # is all you need to get running

### The good

Compared to other frameworks, rails is highly opinionated, meaning that some of the choices a developer would have to make otherwise have already been made for you.
This is easily reflected in the rails [doctrine]. If you're willing to let rails drive, it can ease a lot of your pain.


The rails community provides superb [documentation] for every major rails version. This not only allows you to quickly get up to speed but is a boon for when something breaks.
The documentation in kindle format is easily one of the best I have seen, providing a navigation experience on par with the website.

Worried about some important but daunting functionality? Don't be, there's probably a *gem* or two that could help.
Rails uses *RubyGems* for package management, giving you access to a wide array of community contributed gems that do everything from making text prettier to handling authentication.

Proper documentation, availability of packages and an opinionated framework combine to make development fast, really fast. 

## Sharp edges

Ruby is no butterknife. It's more like a well honed saber, mishandle it and you'll get cut!
In ruby everything is an object, making it possible to set properties on all types, yes even integers.
It also makes no attempt to stop you from overloading methods in the base classes. Name your methods a certain way and you'll end up chasing some interesting bug.
Interesting, but maybe not fun.

Ruby and by extension the rails framework provide a lot of functionality straight out of the box.
Some of this functionality can also be achieved in many different ways. Chances are if you can write short ruby code, someone can write it shorter.

If you choose to start building with rails, be prepared for a journey with lots to see but with a lot more that you will miss.
Programming after all is a journey of discovery.

[doctrine]:https://rubyonrails.org/doctrine/
[documentation]:https://guides.rubyonrails.org/
[django]:https://www.djangoproject.com/
[laravel]:https://laravel.com/
[rails 5.0]:https://guides.rubyonrails.org/5_0_release_notes.html
