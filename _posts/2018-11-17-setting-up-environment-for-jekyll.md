---
layout: blog
title: "Setting Up Your Environment for Jekyll"
author: Tom Nyongesa
blog-image: jekyll/setupenvironment.png
intro: You’ve probably heard of Jekyll maybe during a tech conference or this is the very first time you getting to hear it. Whichever the case, today we’re going to dive into the prerequisites of getting started with Jekyll. This is a step by step ultimate guide to setting up your environment ready.
---

# Setting Up Your Environment for Jekyll
![Setting Up Environment for Jekyll](/assets/images/blog/{{ page.blog-image }}){:class="img-responsive center"}
{{ page.intro }}

## keywords Description

### Jekyll

This is a static site generator. A tool that creates websites that don’t really need interaction with databases. This may be important to businesses or simply personal brands that want to create an online presence. You could be an artist, photographer, producer, startup owner...it doesn't matter.

### Ruby
Jekyll is a ruby gem(simply put as Ruby app) that runs in a Ruby enabled environment. So you need Ruby to set Jekyll up. *[Jump to ruby setup if you like](#installingRuby).* Ruby is an interpreted programming languge that is fully object oriented, concise and very elegant. Don't worry if you aren't techsavvy, we are not going to dive into programming. We just want us to set up our environment and get it ready for building your online presence with Jekyll. 

### Gem
A gem is technically ruby code. In some programming languages a gem is called a library like is Javacript or packages in Java. A gem gives you access to specified functions that have been created by the gem creator. Just to link these up, Jekyll is a Ruby Gem that was created by  *[Tom Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner)* to help people create websites from start to finish without a hustle. Do you see the what and why of a Gem?

Don't worry if any of the above seem like rocket science to you.

## Getting Started

You have probably bought a new laptop or desktop computer with the sole reason of getting your website up and running without the nittygritties of database management. Just two steps to get your website up and running. 

### For Windows Users

Kindly check out [this](https://jekyllrb.com/docs/installation/windows/) excellent easy to follow tutorial from Jekyll official website

### For Linux Users

#### Step 1 - Install Ruby {#installingRuby}

Make sure your linux packages are up to date: 

Open up your command line, type in the following command and hit enter

~~~
sudo apt-get update
~~~

Then,

~~~
sudo apt-get install ruby-full
~~~

If it prompts you for a password, type in your password and hit enter

Type in:

~~~
ruby -v
~~~

to verify that Ruby was successfully installed.

As of this post, Ruby 2.5.1 will be installed on your machine.

### Step 2 - Install Jekyll 
Run,

~~~
sudo gem install jekyll
~~~

If it prompts you for a password, type in your password and hit enter

Wait for the installation to complete

Run 

~~~
jekyll -v
~~~

to confirm that Jekyll was indeed installed. The command will print out the latest Jekyll version installed. 

To create a new website with Jekyll, copy this command to your command line.

~~~
Jekyll new myportfolio
~~~

*myportfolio* is the name of your Jekyll powered website.

To run your newly created website, navigate to your website's root directory by running this command

Jekyll new myportfolio

~~~
cd myportfolio
~~~

Then,

Run

~~~
jekyll serve
~~~

We did it, our new Jekyll website is up and running. Type 127.0.0.1:4000 in your web browser to access your new website

That didn't take 5 minutes! Simple, right?

In case of any challenges kindly post the challenge as a comment. We will be glad to help out. 
If you want take a tour on how Jekyll works and organized check out [this](/developer/2018/10/11/static-site-generators-are-back.html) amazing, simple to follow post. If you've clicked on this link, you probably have seen Markdown - It is a writing tool that allows a user to write plain text and then converts it to HTML format. It was created mainly for readability purposes. You can practise its syntax on [this Mardown Live Preview Toll](https://markdownlivepreview.com/)

You can also check out [Jekyll official documentation](https://jekyllrb.com/docs/).

Spread the word by clicking on the links below. Cheers!