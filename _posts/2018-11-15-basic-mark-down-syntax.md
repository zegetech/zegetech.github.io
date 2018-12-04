---
layout: blog 
title: Ultimate Guide to Markdown Syntax
author: Tom Nyongesa
blog-image: markdown.gif
intro: A cheatsheet to Markdown
---


{{intro}}

# Markdown Syntax

#### Things to learn:

- [What is Markdown](#overview)
- [Why use Markdown](#why)
- Basic Markdown Syntax 
	- [Headings](#heading)
	- [Italics](#italics)
	- [Bold](#bold)
	- [Paragraphs](#paragraphs)
	- [Lists](#lists)
	- [Links](#links)
	- [Images](#images)
	

## Markdown Overview {#overview}

Markdown is a writing tool that allows a user to write plain text and then converts it to HTML format. It was created by [John Gruber](https://en.wikipedia.org/wiki/John_Gruber) alongside [Mark Swartz](https://en.wikipedia.org/wiki/Aaron_Swartz) in 2014. The idea behind its creation was to make the 'plain text' readable. You've probably heard of HTML or XHTML, these are markup languages that render plaintext to web pages as they are written. If you've interacted with them initially, am sure you know that they use tags(&lt;body&gt;,&lt;h1&gt;, &lt;ul&gt;...&lt;etc&gt;) to make the plaintext render well on web pages, Perfect. The only problem with these two is that their content isn't readable at to human eye. One would struggle to figure out stuff on HTML written text. This is where Markdown comes in. 

Markdown seeks to solve the readability issue. It uses simple punctuation marks to denote formatting which is thereafter converted to HTML behind the scenes. The use of punctuation marks makes the plaintext readable.

If you look closely at the two words you'll realize that it's just a play between *down* and *up*. So what difference is brought by playing between the two words?

To a similarity, they are both text formatting tools.

You might want to look  at [John Gruber's blog](https://daringfireball.net/). The guy writes interesting blog articles on varied issues.


## Why use Markdown? {#why}
- Formatting stays where it should. Have you ever typed something into a word processor but on sending it to another application, everything gets screwed up? Well Markdown solves this.
- Fast and easy typing, you rarely use your mouse or touchpad
- Easy to read

## Basic Syntax {#syntax}

To help you get started faster and get used to Markdown try out the syntax on [Markdown Live Preview](https://markdownlivepreview.com/)
### Headings {#heading}
There are various levels of heading, 1st level to 6th level. Is there a 7th level yet? 

Well in HTML the various levels of headings are written using head tags. I guess you've come across the following:

#### HTML
~~~
<h1>heading 1</h1>
<h2>heading 2</h2>
<h3>heading 1</h3>
<h4>heading 1</h4>
<h5>heading 1</h5>
<h6>heading 6</h6>
~~~

#### Markdown equivalent
use of hash signs #

~~~
# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6
~~~

Take note of the spaces between  the hash sign and the word.
#### Webpage rendering

# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6

### Italics {#italics}

#### HTML

~~~
<i>italicised text</i>
~~~

#### Markdown 

~~~
*italicised text*
~~~

#### Webpage rendering

*italicised text*

### Bold {#bold}

#### HTML

~~~
<strong>bold</strong>
~~~

#### Markdown
~~~
**bold**
~~~

#### Webpage rendering

**bold**

### Paragraphs {#paragraphs}

#### HTML
~~~
<p>this is a paragraph</p>

<p>this is another paragraph</p>
~~~

#### Markdown
Any new line started after 2 line break represents a paragraph
~~~
This is a paragraph

This is another paragraph
~~~

#### Webpage rendering

This is a paragraph

This is another paragraph


### Links {#links}

#### HTML
~~~
<a href="http://example.com/">Link</a>
~~~

#### Markdown
~~~
[Link](http://example.com/)
~~~

#### Webpage rendering

[Link](http://example.com/)

### Lists {#lists}
#### HTML
~~~
<ol type="1">
	<li>item 1</li>
	<li>item 2</li>
</ol>
~~~

#### Markdown
~~~
1. item 1
2. item 2
~~~

#### Webpage rendering
1. item 1
2. item 2

### Images {#images}
#### HTML
~~~
<img src="path/to/image.jpg">
~~~

#### Markdown
~~~
![alt text](path/to/image.jpg)
~~~

#### Webpage rendering
![image](/assets/images/logos/favicon.png "This is an image")

Pretty good introduction!

If you have a little experience with Markup(HTML, XHTML,XML), how do you compare?

