---
layout: blog
title: Amazing Bash aliases
date: 2019-11-08 11:24 +0300
categories:
published: false
author:
blog-image:
intro: Writing the same long command can be the most annoying thing when working in terminal. Especially to those of us used to touches and GUIs(Graphical user interfaces). Its true most of us dont really like terminal.While it hardly a solution to most of our complaints we can simplify some of them.
---

{{page.intro}}

## Introduction
Lets look at same commands below
```
docker-compose up
sudo apt-get update
npm install --save axious
```
Every developer, Sysadmin and DevOps Enginner interact with these command in their day to day work. Its tiresomer to write these command every time we need them. Is there a simple way?.

What if i tell you can use
```
nis axious
```
Instead of
```
npm install --save axious
```
Yes its possible, meet bash Alias

## What is Bash Alias?
A Bash alias is a method of supplementing or overriding Bash commands with new ones. Bash aliases make it easy for users to customize their experience in a [POSIX](https://en.wikipedia.org/wiki/POSIX) terminal.

## How to implement Aliases
 By default most distributions ships with some common aliases  by default. To check the default alises in your system head to your terminal and type `alias` then press `enter`. For example below is a list of default aliases in `ubuntu 18`.
 ```sh
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
 ```
 If you look keenly you will notice a common pattern.
 ```sh
 alias alias_name='command_to_run'
 ```
 And thats how simply we implement aliases.

 ## Where to write aliases
 Aliases are often defined in` $HOME/.bashrc` .
 You may want to put your aliases in a different file '`$HOME/bash_aliases`'. To do so create the file and add your aliases
 ```bash
 touch ~/.bash_aliases
 ```
 The `$HOME/bash_aliases` must be loaded in your `$HOME/.bashrc`. Most distributions load it by default but its good to confirm. Below command in load the file.
 ```sh
 if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
 fi
 ```

 ## Persisting alias
 After writing your alias in `~/.bash_aliases` you can make them persisten in your entire system by loading then in `~/.bashrc` with below command.
 ```sh
 source ~/.bashrc
 ```

## Alias Examples
1. Update your system

 ```sh
 alias update='sudo apt-get update && sudo apt-get upgrade'
 ```
 Now if you want to update you system/server just type `update` and `enter` and everything works.

2. NPM install packages

 ```sh
 alias nis='npm install --save'
 ```

 When for example you want to install `axious` only use `nis axious`.

3. Get your ip

  ```sh
  alias myip="curl http://ipecho.net/plain; echo"
  ```
