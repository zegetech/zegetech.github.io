---
layout: news
title:  Static Site Generators. The why and the how.
date:   2017-03-10 16:16:01 -0600
categories: developer
permalink: news/:year/:month/:day/:title.html
author: Melvin Atieno
blog-image: ssg/old-gold.png
intro: Think back to your first website. I want to assume you started off, like most developers by creating a series of html files. Each called  in assets such as images, CSS and perhaps a sprinkle of JavaScript. View the files on your browser and that was it!!. No web server required. Life was simple!!!That's how it all began.
---
{:.post-figure}
![image-title-here](/assets/images/blog/{{page.blog-image}}){:class="img-resposive center"}


<h1>BRIEF HISTORY</h1>


{{page.intro}}

However, with more experience or possibly changing times.The need to create larger, more complex websites arose. Creating  and Managing them as single static files became tiresome and prone to errors.<br/>
Take the example of a navigation bar and a footer, similar on every page. If a change is made on either of the components in a single page, the remaining pages would need to be updated, this would mean directly editing each one of the files. Like I said tiresome!!

The level of technical skills required also made it difficult for major stakeholders such as content writers or owners of the websites,to take part in website production.

**...Then came content management systems (CMS)**

Content Management Systems store page content in a database and provide facilities to edit and apply themes.Examples include Wordpress,Magento,Joomla, Drupal...

*Here's a brief description of how they work:*
1. Determine which page is required.
2. Requests appropriate content from the database.
3. Loads a HTML template (normally from the file system).
4. Renders the content within the template.
5. Returns a formatted HTML page to the visitor’s browser.

**Problem Solved well,,, not entirely.**

*CMS create a new set of issues.*
1. You need to adhere to the CMS’s way of working.Adding custom text or components can be a little awkward.
2. The server is doing more work, and performance can be affected.
3. There are additional points of failure. A software upgrade or database failure can bring your site down.


<h1>Static sites came back...with a twist</h1>


**Oh Hail Static Site generators!!!**

A Static Site Generator(SSG) is a compromise between using a hand-coded static site and a full CMS, while retaining the benefits of both.

In essence, it generates a static HTML-only website using CMS-like concepts such  as templates. The content can be extracted from a database but, more typically, Markdown files are used.

It creates web pages through a series of customizable templates and user data entry. Static sites generate pages when the owner makes changes to them and hosts the page as a pre-made set of HTML, CSS, and JavaScript files. 
This contrasts CMS-based sites, which look for updates and build pages when a visitor accesses them.

Static site generators essentially abandon updating websites through a back-end system and do not require server processing to generate pages. Instead, generators create and update pages through an editor and save the updated versions to the hosting platform.


<h2> The good</h2>

**1) Speed :**
Perhaps the most immediately noticeable characteristic of a static site is how fast it is. As mentioned above, there are no database queries to run, no templating and no processing whatsoever on every request.
Web servers are really good at delivering static pages quickly, and the entire site consists of static HTML files that are sitting on the server, waiting to be served, so a request is served back to the user pretty much instantly.

**2)security :**
Platforms like WordPress are used by millions of people around the world, meaning they're common targets for hackers and malicious attacks — no way around it. Wherever there's user input/authentication or multiple processes running code on every request, there's a potential security hole to exploit. To be on top of the situation, site administrators need to keep patching their systems with security updates, constantly playing cat and mouse with attackers, a routine that may be overlooked by less experienced users.
Static sites keep it simple, since there's not much to mess up when there's only a web server serving plain HTML pages.

**3) Traffic surges :**
Unexpected traffic peaks on a website can be a problem, especially when it relies intensively on database calls or heavy processing. 
A static site is generally better prepared for those situations, as serving static HTML pages consumes a very small amount of server resources

**4). Client Control Considerations**
Using a CMS is not necessarily easy, and it offers considerable power to content editors. You can lock down rights such as plugin installation, but it won’t stop changes to things like font, colors, corrupting the layout etc.

A static site can use Markdown files. That limits the user’s options; they make fewer mistakes and cannot adversely affect the pages. Some will miss the CMS content administration panels, but you can either:


<h2>The better</h2>

The continued success of Static site generators  can be attributed to the ability to seperate  the build phase of the site from the actual hosting of it.
An architectural approach called the JAMstack.
The JAMstack is a way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience.

*A project is built with JAMstack if it meets the following criteria :*

**Javascript:**
Any dynamic programming during the request/response cycle is handled by JavaScript,
running entirely on the client. This could be any frontend framework, library, or even vanilla JavaScript.

**APIs:**
All server-side processes or database actions are abstracted into reusable APIs, accessed over HTTPS with JavaScript. These can be custom-built or leverage third-party services.

**MarkUp:**
Templated markup should be prebuilt at deploy time, usually using a site generator for content sites, or a build tool for web apps.

# Jekyll .

Now that that's settled am sure you want to get started with a static site generator. 
With the whole lot of options for static site generators,Hugo,Hexo,Gatsby,NUXT,MkDocs,jekyll...etc
you probably wondering which one you should use.

Try jekyll. A mature product, with a huge support community. Jekyll is  natively supported by GitHub pages, a big bonus.
 

Jekyll has everything you need and nothing you don't to get started with your website.

    It is fast
    It is flexible.
    It is blog-aware.

This site is built on jekyll. Navigate to see what I mean.

{:class="text-primary"}
**Getting started**

Requirements:

- [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.2.5 or above,ruby version can be checked by running ruby -v)


- [RubyGems](https://rubygems.org/pages/download) (which you can check by running gem -v)

Setup is relatively straight forward.

Run the following commands on your terminal

- Install Jekyll and bundler gems.
    ```
    gem install bundler jekyll
    ```

- Create a new Jekyll site.

    ```
    jekyll new my-site
    ```

- Change into your site's directory.

    ```
    cd my-site
    ```

- Build the site and make it available on a local server

    ```
    bundle exec jekyll serve 
    ```

**=> Now browse to http://localhost:4000**

Go to [cloudcannon](https://learn.cloudcannon.com/jekyll/running-jekyll/)



{:class="text-primary"}
**Directory structure**

On installation a jekyll site usually looks something like this:

![jekyll-default-file-structure](/assets/images/blog/ssg/jekyll-directory-structure.png){:class="img-responsive center"}

1. `_config.yml`,\manages settings for the entire site or blog:

     - Global variables on the site.
     - Configuration of  collections or defaults.
     - Specification of untime variables that you want jekyll to run every time.

2. `_post` The blog content goes here. The naming convention of these files is important, and must follow the format: `YEAR-MONTH-DAY-title.MARKUP`

3. `.gitinore` The paths to the files you want to exclude go here.

4. `_site` This is where jekyll puts the entire static site after the build. 

5. `404.html` Page displayed when one tries to access a broken link on your site. If you know how to create a single page template, you have the option of  customising this page.

6. `Gemfile` A Gemfile is Ruby’s dependency management system or in other words, a list of Gems a Ruby project needs to run.<br/>
    what is a gem?
    A Gem is a bundle of code we can include in Ruby projects sort of like an extension. This allows us to take someone else’s code and drop it into our own project.
    Gems can perform functionality such as:

    - Converting a Ruby object to JSON
    - Pagination
    - Interact with APIs such as Github

    Jekyll itself is a Gem as well many Jekyll plugins including jekyll-feed, jekyll-seo-tag and jekyll-archives.

6. `Gemfile.lock` This file is auto-generated and includes all the Gems in Gemfile with the addition of a version number even if it wasn’t specified. This ensures that other people we share the source code to will have the same version of the gems.
others

7. `index.md` Provided that the file has a front matter section, it will be transformed by Jekyll. The same will happen for any `.html`, `.markdown`,  `.md`, or `.textile` file in your site’s root directory or directories not listed above

**Others**

`_layouts` As the name suggests, this is where you put the layouts,display,basic description for the placement of site's content.

`_includes` Page snippets which can be included throughout the site. Includes are often used for page sections which are duplicated across the site like a header, footer, navigationbar, forms etc...


Great now run jekyll

```
jekyll serve

```

**Resources:**

This is simply an introduction to get you started. Below is a list of resources that will get you more acquinted with jekyll.


- [Jekyll's offical site](https://jekyllrb.com/docs/).

- [Cloudcannon](https://learn.cloudcannon.com/).

- [Tania Rascia](https://www.taniarascia.com/make-a-static-website-with-jekyll/)
 
- [Learning Markdown and liquid](https://hermens.com.au/2016/10/14/Getting-started-with-Jekyll-Part-5/)


Watch out for Part 2 of this article where we'll talk about:
**Creating a CI/CD  pipeline for a Jekyll based website.**