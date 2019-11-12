---
layout: blog
title: Ruby Method Arguments
date: 2019-02-28 10:29 +0300
categories: developer
author: Ngari Ndung'u
blog-image: ruby-arguments/ruby_arguments.png
intro: |
  Ruby is a very flexible language giving you a myriad of ways to implement logic in your programs.
  Some of this flexibility is evident in how you pass arguments to your ruby methods/functions.
  This is a run-down of the available options.
keywords: Ruby Arguments Method Functions
---
![Ruby arguments](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}

{{page.intro}}

Ruby methods take either positional arguments or keyword arguments. Here is an example of a method that accepts positional arguments

```ruby
def some_method(one,two,three)
end
```
Their values can be accessed within the method using the variables *one*, *two* and *three* respectively.
All arguments are required and calling the method with less than or more than three arguments raises an `ArgumentError` exception.
Default values can be provided for positional arguments, for example, `def some_method(one=1, two=2,three)`, assigns defaults for the first 2 parameters, meaning that the method can be called with `some_method(3)`.

Below is an example of a method with keyword arguments.
```ruby
def some_method(one:, two:, three:)
end
```
Argument values can be accessed the same as for positional arguments.
Default values can also be provided, `def some_method(one: 1, two: 2, three: 3)`, making passing arguments optional to the caller.
Keyword arguments have the advantage of allowing the arguments to be passed *out-of-order*, for example `some_method(two: 5, one: 3)`.

You have the option of choosing between positional and named arguments depending on your application needs.
Keyword arguments are great for when you want to make it obvious what data your methods accept.
They are also useful for when you provide default values for your methods, but want to give the caller the option to override any of them.
Positional arguments are useful for when you want to keep your code concise, and especially for internal methods whose inputs are obvious as well as single argument methods.

## Variable length parameters
Ruby has support for methods that accept any number of arguments, either positional or keyword.
`def some_method(*args)` can be called with zero or more parameters. The *args* variable within the method will be an array of all values passed in when the method is called.
``` ruby
def sum(*args)
  # args.is_a? Array
  args.sum
end
```
A method defined as `def some_method(**args)` can accept any number of `key:value` arguments.
The *args* variable will be a hash of the passed in arguments.
```ruby
def table(**args)
  # args.is_a? Hash
  args.each { |key, value|
    print "#{key} \t #{value}\n"
  }
end
```

## Combining Argument Types
Feel that your method could benefit from a mixture of argument types? No problem.
You can use the various argument types together as long as you pay attention to how you order them.
The correct order is as follows
> `def some_method(one, two=2, *extra, three: 3, **nextra)`.

That is, positional arguments in the order *required*, *optional*, *variable* followed by keyword arguments.
Called as `some_method(1,2,3,4,four: 4)` the values of the parameters would be; one=1, two=2, extra=[3,4], three=3 and nextra={four: 4}.

## Breakdown
![The sake of argument](/assets/images/blog/ruby-arguments/the_sake_of_argument.png)

{:.image-attribution}
Not this kind of argument. Image from [xkcd](https://xkcd.com/1432/)
``` ruby
class ArgumentsDemo
  def method_with_no_arguments
    p method_with_required_arguments(1, 2)
    # will raise ArgumentError
    # method_with_required_arguments(1)
  end

  def method_with_required_arguments(a, b)
    p method_with_optional_arguments(a)
    # nothing raised
    # method_with_optional_arguments
  end

  # a and b have default values, making them optional to the caller
  def method_with_optional_arguments(a=1, b=2)
    p method_with_optional_keyword_arguments(b:b)
    # nothing raised
    # method_with_optional_keyword_arguments
  end

  # a and b have default values, making them optional to the caller
  def method_with_optional_keyword_arguments(a:0, b:0)
    p method_with_required_keyword_arguments(b:a, a:b)
    # will raise ArgumentError
    # method_with_required_keyword_arguments(b: 10)
  end

  def method_with_required_keyword_arguments(a:, b:)
    p a + b
  end
end
```
