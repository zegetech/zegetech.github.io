---
layout: blog
title: Localhost tunneling
date: 2019-03-01 12:09 +0300
categories: developer
author: Tom Nyongesa
blog-image: localhost-tunneling/tunneling.jpg
intro: Sometimes I just want to share my projects in development to my boss, workmates, client or I just want to test it on my phone. I can do this by taking my development environments(my machine) to them but what if I'm working on a desktop? Well, I can ask them to come over or ask them to join my network, what if they are thousands of miles away? Well, I can deploy it to the internet but whatt if I'm not just ready? Well, say hello to [**Localhost Tunneling**](https://en.wikipedia.org/wiki/Tunneling_protocol), my bridge to the outside world! Or simply a tunnel from an external server(open to the internet) to my local server!
---

![Localhost tunneling](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}

{{page.intro}}

Here are the most commonly used local tunneling tools among developers:

## [Ngrok](https://ngrok.com/)

This is the most popular localhost tunneling tool created by the great [Alan Shreeve](https://twitter.com/inconshreveable). 

### Installation and use
Can be installed via a package manager like npm or [downloaded](https://dashboard.ngrok.com/get-started) then unzipped to your machine.

Via npm,

~~~
$ npm install -g ngrok
~~~

Upon successful installation, fire it up by running:

~~~
$ ngrok http 80
~~~

This will open another bash window with the url forwarding info. Click on the listed urls and you should be able to access your local server publicly.

80 is the port through which your local server is using to serve requests. You'll be provided with a url that will link your local serve to the public internet. Simple, mmmh?

Ngrok also provides other advanced features like password protection. Check them out on their website.

## [Localtunnel](https://localtunnel.me/)
Another exciting easy to use local tunneling tool. 

### Installation and use

~~~
$ npm install -g localtunnel
~~~

If you experience permission issue, install as admin, though not recommended. You can alo try installing it with 'yarn'

Start your localserver if you aren't already running one then,

~~~
$ lt --port 80 
~~~

If it fails, try the above command again or check your firewall settings if the error persists. 

## [Burrow](https://burrow.io/)

Not interested in installation headaches and package management? Burrow got your back! Burrow is another tunneling service that makes the whole tunneling process simpler. You simply need to sign up on their platform, confirm your email and create a tunnel. Works like a charm!

However, you are required to upgrade your membership @ $4.99/month to continue using their service for another day.

## [PageKite](https://pagekite.net/)
Here is another amazing local tunneling tool that has been around for a while and popular among the minecraft gamers. 

### Installation and use
You need to ensure that you have python installed on your machine. Then head to [Pagekite downloads](http://pagekite.net/downloads) page to get the appropriate install for your machine. 

Here is a quick start for linux users:

~~~
$ curl -O https://pagekite.net/pk/pagekite.py
~~~

Then,
~~~
python2 pagekite.py 80 yourkitename.pagekite.me
~~~

This will get prompt for your email and register your kitename upon confirmation of your email.

One amazing thing with Pagekite is that you can serve your static files without having a local server on your machine. Cool, right? 

Simply include the path of your static site to the command above,

~~~
python2 pagekite.py path/to/static-file yourkitename.pagekite.me
~~~

Other local tunneling tools include:

- [Serveo](https://serveo.net/)
- [Forward](https://forwardhq.com/)
- [Proxy Local](http://proxylocal.com/)

The whole tunnelling thing is really simple and easy to get started with. So, if you are working on something and you would like others to see what you building, pick a tool and fire it up!

![start](/assets/images/blog/localhost-tunneling/ignite.webp){:.img-responsive .center}

PS:
If you don't like using third party tools and in this case localhost tunneling tools, then be on the watch out for an upcoming post on how to setup your own tunnel to your google cloud server or AWS server via SSH.

Cheers!