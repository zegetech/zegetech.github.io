---
layout: blog
title: Setting Up Your Environment for Jekyll
categories: developer, jekyll
author: Tom Nyongesa
blog-image: jekyll/setupenvironment.png
intro: You’ve probably heard of Jekyll before or this is the very first time you getting to hear it. Whichever the case, today we’re going to dive into the prerequisites of getting started with Jekyll. This is a step by step ultimate guide to setting up your environment.
keywords: Jekyll Static Website Setup
---

![Setting Up Environment for Jekyll](/assets/images/blog/{{ page.blog-image }}){:class="img-responsive center"}
{{ page.intro }}

## Keywords Description
### Jekyll
This is a static site generator. A tool that creates websites that don’t really need interaction with databases. This may be important to businesses or simply personal brands that want to create an online presence. You could be an artist, photographer, producer, startup owner...it doesn't matter.

### Ruby
Jekyll is a ruby gem (simply put as Ruby app) that runs in a Ruby enabled environment. So you need Ruby to set Jekyll up. *[Jump to ruby setup if you like](#installingRuby).* Ruby is an interpreted programming languge that is fully object oriented, concise and very elegant. Don't worry if you aren't techsavvy, we are not going to dive into programming. We just want to set up our environment and get it ready for building your online presence with Jekyll.

### RVM
RVM is Ruby Version Manager. It is a tool that's used to install and manage multiple Ruby versions.

### Gems
A gem is technically ruby code. In some programming languages a gem is called a plugin, library or package like in Javacript or Java. A gem gives you access to specified functions that have been created by the gem creator. As a matter of fact, Jekyll is a Ruby Gem that was created to help people build websites from start to finish without a hustle.

### Gemfile
This is a file that lists a Jekyll site dependencies. Simply, a list of Gems needed for a Jekyll website to run.

## Getting Started
![cloud-comic](/assets/images/blog/jekyll/cartoon-installer.jpg){:class="img-responsive center"}
You are probably curious about how you would build a website easily without the complexities of backends and frontends and database.... you  know like the olden days!! Just two steps to get your website up and running.

### For Windows Users
Kindly check out how to set up [ jekyll for windows](https://jekyllrb.com/docs/installation/windows/), an excellent easy to follow tutorial from Jekyll official website. It guides you on how to get Jekyll up and running on windows PC.

Wait, you can [dual boot (run both Windows and Linux on your PC)](https://opensource.com/article/18/5/dual-boot-linux) and get Jekyll working on Linux! *Just a heads up, running Linux alongside Windows won't slow down your computer.*

### For Linux Users
#### Step 1 - Install Ruby {#installingRuby}
Make sure your linux packages are up to date. Open up your command line, type in the following command and hit enter:

```
sudo apt-get update
```

Before jumping straight into ruby installation, it is recommended to always to use RVM. You can google for other ways of installing Ruby like using apt-get. For this guide we will use RVM.

So, let's install RVM. RVM installation requires the use of gpg and curl packages. Please make sure you have them installed on your machine. If you haven't, worry not proceed with this guide.

For Debian and Ubuntu distros:

```
sudo apt-get install -y curl gnupg build-essential
```

`-y` is used to confirm all the prompts automatically. You can still drop it and your installation will work fine but you will have to confirm every prompt by yourself. For Red Hat, CentOS, Fedora, Amazon Linux, Scientific Linux:
```
sudo yum install -y curl gpg gcc gcc-c++ make
```

You can now proceed with RVM installation. In your terminal,

```
sudo gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
```

If it prompts you for a password, type in your password and hit enter. Then,

```
curl -sSL https://get.rvm.io | sudo bash -s stable
```

After installation is done
```
rvm -v
```

If is doesn't, it means the session needs to load the newly installed RVM. For this, close your terminal window and reopen it, are retry the command. It will print out the version installed. As of this writing, 1.29.4 was the latest version. Next, type in the following command to install Ruby:
```
rvm install ruby
```

To verify that Ruby was successfully installed, in your command line, type in:

```
ruby -v
```

As of this post, Ruby 2.5.1 will be installed on your machine.

### Step 2 - Install Jekyll
Install Jekyll and confirm the installation by running the commands below. It should print out the latest Jekyll version installed.

```
sudo gem install jekyll
jekyll -v
```

Create a new website with Jekyll by running this command
```
jekyll new myportfolio
```

*myportfolio* is the name of your Jekyll powered website.

To serve your newly created website, navigate to your website's root directory and serve the website

```
cd myportfolio
jekyll serve
```

We did it, our new Jekyll website is up and running. Navigate to [localhost](http://127.0.0.1:4000) to access your new website

That didn't take long! Simple, right?

### Jekyll plugins
These are ruby codes that are created to extend the functionality of Jekyll. Jekyll has a couple of plugins namely:
1. Generators - Used to create content on your site
2. Converters - Used to change a markup language to another format
3. Commands - Used to extend the **Jekyll** executable with subcommands
4. Tags - Used to create custom Liquid tags.
5. Hooks - Used to extend the build process
6. Filters - Used to create Liquid filters

#### How do we get to use Jekyll plugins?
The easiest way is to create a new folder in your Jekyll website root directory and name it _plugins. Then you simply download a Jekyll plugin and save it in this folder. You can download Jekyll plugins from [Jekyll plugins](https://github.com/jekyll)

Another way is to use Gemfile and bundler. Inside your root directory of your Jekyll website, open up Gemfile. Look out for lines looking like the image below

![Jekyll Plugin](/assets/images/blog/jekyll_plugin.png){:class="img-responsive center"}
To add more plugins, after the `group :jekyll_plugins do` add your plugin name
```
gem 'jekyll-plugin-name' #Please note that this is a placeholder name, replace it with an existing plugin name
```

Then in your command line do:
```
bundle install
```

This will install the Jekyll plugins in your Gemfile.
### Jekyll Themes
These are community maintained templates to help you get started with Jekyll site presentations. A new Jekyll website comes with Jekyll's default theme *Minima*. You can change this theme at any time if you like. For more on Jekyll themes, click [here](https://jekyllrb.com/docs/themes/)

You can now agree with me that Jekyll is an interesting tool that gets your website up and running in just a few sighs. To go deeper, [dive into how static websites are created with Jekyll from start to finish](2018-10-10-static-site-generators-are-back.md). If you've clicked on the link, you probably have seen Markdown - It is a writing tool that allows a user to write plain text and then converts it to HTML format. It was created mainly for readability purposes. You can practise its syntax on [this Mardown Live Preview Tool](https://markdownlivepreview.com/). You can also check out [Jekyll official documentation](https://jekyllrb.com/docs/).

Spread the word by clicking on the links below. Cheers!
