---
layout: blog
title: Ruby Method Arguments
date: 2019-02-21 10:29 +0300
categories: developer
published: false
author: Melvin Atieno, Ngari Ndung'u, Tom Nyongesa
blog-image: 
intro: | 
  Ruby is a very flexible language giving you a myriad of ways to implement logic in your programs.
  Some of this flexibility is evident in how you pass arguments to your ruby methods/functions.
  This is a run-down of the available options.
---

{{page.intro}}

Ruby methods take either positional arguments or keyword arguments.
`def some_method(one,two,three)` is an example of a method that accepts positional arguments. Their values can be accessed within the method using the variables *one*, *two* and *three* respectively.
All arguments are required and calling the method with less than or more than three arguments raises an `ArgumentError` exception.
Default values can be provided for positional arguments, for example, `def some_method(one=1, two=2,three)`, assigns defaults for the first 2 parameters, meaning that the method can be called with `some_method(3)`.

`def some_method(one:, two:, three:)` is an example of a method with keyword arguments.
Argument values can be accessed the same as for positional arguments.
Default values can also be provided, `def some_method(one: 1, two: 2, three: 3)`, making passing arguments optional to the caller.
Keyword arguments have the advantage of allowing the arguments to be passed *out-of-order*; `some_method(two: 5, one: 3)`.
If the arguments are appropriately named, keyword arguments make it obvious what a method expects to be passed in.

## Variable length parameters
Ruby has support for methods that accept any number of arguments, either positional or keyword.
`def some_method(*args)` can be called with zero or more parameters. The *args* variable within the method will be an array of all values passed in when the method is called.
``` ruby
def sum(*args)
  args.sum
end
```
A method defined as `def some_method(**args)` can accept any number of `key:value` arguments.
The *args* variable will be a hash of the passed in arguments.
```
def table(**args)
  args.each { |key, value|
    print "#{key} \t #{value}\n"
  }
end
```

## Breakdown
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
