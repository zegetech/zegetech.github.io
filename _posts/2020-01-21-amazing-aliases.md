---
layout: blog
title: Amazing Bash aliases and Functions
date: 2020-01-21 11:24 +0300
categories:
published: false
author: Gathuku Ndung'u
blog-image: bash_alias/bash_alias.jpg
intro: Writing the same long command can be quite tiresome when working in the Unix/Linux/MacOs terminal. Especially to those of us wh need to do it time and again. Shortcuts are great. You get there, but way faster that the long route. And same with these bash commands. You can increase your speed in terminal usage and preserve your brain cells by keeping in mind simplified, alternative, shortcut commands. Bash aliases make this possible, increasing your workflows speed and ease while using terminal.
keywords: Bash Alias Functions Terminal Scripts
---

![bash_alias](/assets/images/blog/bash_alias/bash_alias.jpg){:.img-responsive .center}

{{page.intro}}


## Introduction
Let's look at some commands below

```sh
docker-compose up
sudo apt-get update
npm install --save angular
```
Every Developer, Sysadmin and DevOps Engineer interact daily and repeatedly with these commands in their day to day work. It's tiresome to write these commands every time we need them. Is there a simple way?.

What if I tell you can use

```sh
cup
```
Instead of

```sh
docker-compose up
```
Yes it's possible... meet bash Alias

## What is Bash Alias?
A Bash alias is a method of supplementing or overriding Bash commands with new ones. Bash aliases make it easy for users to customize their experience in a [POSIX](https://en.wikipedia.org/wiki/POSIX) terminal.

## How to implement Aliases
 By default, most Unix based Operating systems like Linux and MacOs ships with some common aliases. To list these default aliases in your system, head to your terminal and type `alias` then press `enter`. For example below is a list of default aliases in `ubuntu 18`.

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
And that's how simply we implement aliases.

## Where to write aliases
Aliases are often defined in a bash sourced(run when terminal starts) file such as `$HOME/.bash_profile`, `$HOME/.profile` or `$HOME/.bashrc`. However to organise them, we put them in a dedicated file `$HOME/.bash_aliases` and load this file in the bash sourced file. To do so create the file and add your aliases

```sh
touch ~/.bash_aliases
```
The `$HOME/.bash_aliases` must be loaded in your `$HOME/.bashrc`. Most distributions load it by default but its good to confirm. Below command in load the file.

```sh
if [ -f ~/.bash_aliases ]; then
  . ~/.bash_aliases
fi
```

## Loading alias
 After writing your alias in `~/.bash_aliases` you can make them load and usable in your bash session system by reloading `~/.bashrc` with below command.

 ```sh
 source ~/.bashrc
 ```
## Unsetting alias
If you want to get rid of any alias, use `unalias` command

```sh
unalias ll
```
You can also just remove it from `~/.bash_aliases` if defined there and then reload `~/.bashrc`

## Alias Examples
1. Update your system

    ```sh
    alias update='sudo apt-get update && sudo apt-get upgrade'
    ```
    Now if you want to update your system just run `update` and everything works. You can also chain it with other commands e.g to install a package 
    
    ```sh
    update && apt-get install vim
    ```

2. NPM install packages

    ```sh
    alias nis='npm install --save'
    ```
    When for example you want to install `angular` the command is `nis angular`.

3. Get your IP

    ```sh
    alias myip="curl http://ipecho.net/plain; echo"
    ```

> You could alias `sudo` command to `please` for better experience in your system.
> e.g. `please shutdown`

### Limitations of Aliases
1. Aliases can only be used with simple text replacements, no arguments/parameters.
2. Similar named aliases cannot co-exist.
3. Aliases cannot be (un)set in subshells or non-interactive environments.
4. Aliases take time since shell has to interpret them all before showing you prompt.

> The limitation of aliases not accepting parameters can be solved by the use of `bash functions`.

### Bash Functions
A bash function, like in any other programming language, is a set of commands that can be called within an execution sequence. Unlike aliases, bash function can accept parameters. 

__Functions Declaration__

Function name followed by parenthesis.`preffered`

```sh
#!/bin/bash
function_name {
  command
}
```
Or using `function` keyword.

```sh
#!/bin/bash
function function_name {
  command
}
```

__Function Parameters__

To pass any number of arguments to the bash function, simply put them right after the function’s name, separated by a space. It is a good practice to double-quote the arguments to avoid the misparsing of an argument with spaces in it.
> The passed parameters are available in the function as an array of parameters, i.e. $1, $2, $3 … $n, corresponding to the position of the parameter after the function’s name

Example

```sh
#!/bin/bash
greeting() {
  echo "Hello $1"
}
```
You can call function `greeting` with argument

```sh
greeting "John"
# Output
Hello John
```

__Bash Functions Examples__
1.  __Kill Processes__
    The function will kill a process by name  eg `kp "firefox"`

    ```sh
    kp () {
      ps aux | grep $1 > /dev/null
      mypid=$(pidof $1)
      if [ "$mypid" != "" ]; then
        kill -9 $(pidof $1)
        if [[ "$?" == "0" ]]; then
          echo "PID $mypid ($1) killed."
        fi
      else
        echo "None killed."
      fi
      return;
    }
    ```

2. __Uptime__
    Displays system uptime.

    ```sh
    myuptime () {
      uptime | awk '{ print "Uptime:", $3, $4, $5 }' | sed 's/,//g'
      return;
    }
    ```
    Displays system uptime.

3. __Tar and Compress__ 
    Compress a folder ie `targz test`

    ```sh
    targz() { tar -zcvf $1.tar.gz $1; rm -r $1; }
    # extra .tar.gz
    untargz() { tar -zxvf $1; rm -r $1; }
    ```

    We have compiled a list of commonly used aliases that you can install and get started easily. Check the [github repo](https://github.com/zegetech/bash_alias).

### Conclusion
Hopefully, this guide has given you some inspiration for creating your aliases and bash functions. Extensive use of these can help make your time in the shell more enjoyable and less complex.
