---
layout: news
title:  CREATING A CI/CD PIPELINE FOR A JEKYLL BASED SITE
categories: developer
permalink: news/:year/:month/:day/:title.html
author: Melvin Atieno
blog-image: ci-cd/ci-cd-jekyll-site.png
intro: Remember your first website? I want to assume you started off, like most developers, by creating a series of HTML files linking within it images, CSS and perhaps a sprinkle of JavaScript. Files load on your browser and that was it!!. No web server required. Life was simple!!!
---
{:.post-figure}
![image-title-here](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}



**Prerequisites:**

**Prerequisites:**

1. Install Jekyll.
2. A Jekyll site or simply the Jekyll boilerplate.
3. Read [part one](/news/2017/03/10/static-site-generators-are-back.html).
4. A basic understanding of [Git](https://try.github.io/). We are going to use for version control.
5. A Github repository containing the Jekyll site.
6. An account with [Travis](https://docs.travis-ci.com/).
7. An account with [firebase](https://firebase.google.com/).
5. Give your environment a quick test run to make sure you’re all set up.

## What is Continuous Integration and Continuous Deployment?

Continuous Integration (CI) is a development practice that involves the integration of small bits of code into a shared repository, frequently.

Continuous Deployment is closely related to Continuous Integration. It refers to the release to production of a software that passes set automated tests.

A development process is considered to follow continuous integration and continuous Deployment when the following practices are applied throughout the development process.
1. It maintains a single source repository
2. It integrates automated builds for the project.
3. It contains a self-testing mechanism for the project's builds.
4. It contains automated deployment.

Now let's incorporate continuous Integration and  Continuous Deployment practices for our Jekyll site.

## 1. Maintain a single source repository

We will do this by pushing the project to [github](https://guides.github.com/activities/hello-world/) following  [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.

Anyone else who wants to contribute to the projector is part of the team, will clone from this repository and merge any changes to it.

## 2. Integrate automated builds for the project

For this, we are going to use a  continuous integration tool. There are many Continuous Integration tools out there.
[Here's a list of the most common ones](https://code-maze.com/top-8-continuous-integration-tools/). For this article, we are going to use [Travis](https://docs.travis-ci.com/).

Now add a blank `.travis.yml` file to the root of your repository.
This file tells Travis CI what to do.

Now to the travis.yml file add the following.

```yml
            language: ruby
            node_js:
                - "8.10"
            rvm: 
                - 2.5.1
            install:
                - gem install jekyll bundler
            before_script:
                - bundle install
            script:
                - bundle exec jekyll build
            branches:
                only:
                    - release
                    - Develop
                    - master
            after_success:
                - echo "Build was successful"

```
What have we just done?

We have told Travis what language our project is built on, ruby.

    language: ruby

We asked it to install a version of node version '8.10'.Later in the article, we will come to why we need it.

    node_js
        -"8.10"

Then using rvm, a package manager, we specified the ruby version we want to be used.

    rvm:
        -2.5.1


We then had Travis install Jekyll bundler.

    install:
        - gem install jekyll bundler   


Then had it install the gems in the gemfile. The before_script command is to inform Travis that this should be done before running any scripts.

    before_script:
        - bundle install   


Then we told Travis to run a command in its console. `The bundle exec Jekyll build`. Note, if you don't add this step, Travis will add a default step tagged test. Since we don't have any tests,  the build will fail.

    script:
        - bundle exec Jekyll build

We then specified the branches on which we wanted the above build to be done on. The Develop, master,  and release branches. You can change these to the branches you have.

        branches:
            only:
                - release
                - Develop
                - master

We then added an optional step, after_success. This means, quite obviously, that after a successful build we want Travis to print out a string, "the build was successful".

    after_success:
                - echo "Build was successful"
    


Now when you log in to your Travis account, on your dashboard there is a list of all your repositories. To the right of the one, you are using to follow this tutorial, move the slider to the right to activate the repository.
Great, now push some changes to GitHub. Automated builds!!! 

## 3. Contains self-testing mechanism for the project's builds.

Now that we have automated builds, we want to add a self-testing mechanism. Now the build itself is a test. Test whether the site actually builds. For this article though, we are going to add another test. We are going to test the resulting site. Since this is a static site, we are going to test the HTML.
For that, we are going to use the [html-proofer](https://rubygems.org/gems/html-proofer/versions/3.4.0)

Back to our Travis file.
We will have Travis install the `HTML-proofer gem`.
Now update your install script in your .travis.yml file to look like so:
    
        *----rest of code remains---*

    install:
        - gem install jekyll bundler
        - gem install html-proofer

        *---rest of the code remains----*

The above only installs the gem. To use it we update the .travis.yml to contain the script to run the HTML-proofer like so;

    script:
        - bundle exec jekyll build
        - bundle exec htmlproofer ./_site 


The `./site` tag is to avoid testing external sites.

Great, now you can make a few changes, push them and see what happens.


## 4. Contains automated deployment.
We are going to deploy to [firebase](https://firebase.google.com), only because I used it for this particular project.
Now update your .travis.yml file's install by adding the following.
    
    install:
        - npm install -g firebase-tools
  
This tells Travis to install firebase tools.
In order to do that Travis will need node_js. That is why we initially added the node_js step, with the version to our .travis.yml file.

This only installs the tools. We will also need to add a deployment step. At the bottom of your .travis.yml file. Add this:

    deploy:
        provider: firebase
        skip_cleanup: true
        token: 
            env: $FIREBASE_TOKEN
        on:
            branch: release

The `provider` key tells Travis where we are going to deploy our site to `firebase`.

The  `skip_cleanup` always defaults to false if not specified. This means Travis by default cleans up after a build. Travis automatically resets your working directory by deleting all changes made during the build.<br/>
Since the directory is what we want to deploy, we want Travis to skip the cleanup. We do this by setting it to true.

The `token`  key equates to another key `env` which we have set to FIREBASE_TOKEN.
In order to deploy, Travis needs access to the provider account.
Travis only accesses the account when it provides a token.
The `env` key simply tells Travis to obtain the key from an environment variable. <br/>
A firebase token is a token generated through  [firebase login: ci](https://github.com/firebase/firebase-tools#using-with-ci-systems).

To obtain yours;
        On a machine with a browser, install the Firebase CLI.

        Run firebase login: ci to log in and print out a new access token (the current CLI session will not be affected).

        Store the output token in a secure but accessible way in your CI system. As an environment variable, called FIREBASE_TOKEN or anything else you like.


The `on` key sets your build to deploy only under specific circumstances.
In our case `on: branch: release`.

Great. So this is what your final .travis.yml file looks like.

        ```yml

        language: ruby
        node_js:
        - "8.10"
        rvm: 
            - 2.5.1
        install:
            - npm install -g firebase-tools
            - gem install jekyll bundler
            - gem install html-proofer
        before_script:
            - bundle install
        script:
            - bundle exec jekyll build
            - bundle exec htmlproofer ./_site --disable-external
        branches:
            only:
                - release
                - Develop
                - master
        after_success:
            - echo "Build was successful"
        deploy:
            provider: firebase
            skip_cleanup: true
            token: 
                env: $FIREBASE_TOKEN
            on:
                branch: release
        ```

Now create a PR against the release branch, if the tests pass merge to see your site deployed.
You have now successfully created a **CI/CD pipeline for a Jekyll site**.