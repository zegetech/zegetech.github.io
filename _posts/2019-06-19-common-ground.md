---
layout: blog
title: Common ground
date: 2019-06-19 10:37 +0300
categories: 
published: false
author: 
blog-image: 
intro: I am almost sure you would be, if not OUTRAgED, slighltly DISTURBed if I dEcided To raNdomly switch the caSes for MY sentenCes in A Post. Unless there is a good reason, a justification of some sorts you would probably quit reading after the first few sentences. Why? convention, you have expectations when it comes to capitalization in writing. The value of convention becomes even clearer when you can clearly read through and understand written stories without having to stop to try and figure out what is being communicated. Like most written stories code is no different. 
---

# intro
{{page.intro}}


#At Zege

While there are already established conventions for most programming languages, e.g for ruby we have the [publicly recommended best practices](https://github.com/rubocop-hq/ruby-style-guide), there are some areas where there are still no consensus regarding a particular style and for those we have our preferences,
  
 
  1. Space inside hash literals.

```ruby
# This.. - no space after { and before }
{one: 1, two: 2}

# Over this.. - space after { and before }
{ one: 1, two: 2 }
```

  2. Indent Conditional Assignment.

```ruby
# This.. - it's apparent what's going on
kind = case year
       when 1850..1889 then 'Blues'
       when 1890..1909 then 'Ragtime'
       when 1910..1929 then 'New Orleans Jazz'
       when 1930..1939 then 'Swing'
       when 1940..1950 then 'Bebop'
       else 'Jazz'
       end

result = if some_cond
           calc_something
         else
           calc_something_else
         end

# Over this.. (\a bit more width efficient)
kind =
  case year
  when 1850..1889 then 'Blues'
  when 1890..1909 then 'Ragtime'
  when 1910..1929 then 'New Orleans Jazz'
  when 1930..1939 then 'Swing'
  when 1940..1950 then 'Bebop'
  else 'Jazz'
  end

result =
  if some_cond
    calc_something
  else
    calc_something_else
  end
```

  3. Align Multi-line Arrays.

```ruby
# This...
menu_item = %w[
  Spam Spam Spam Spam Spam Spam Spam Spam
  Baked beans Spam Spam Spam Spam Spam
]

# Over this..
menu_item =
  %w[Spam Spam Spam Spam Spam Spam Spam Spam
     Baked beans Spam Spam Spam Spam Spam]
```

  4. Dangerous Method Bang

```ruby

# This
class Person
  def update!
  end

  def update
  end
end

# Over this...
class Person
  def update
  end
end
```

  5. Underscore Unused Vars

```ruby
# This ...
result = hash.map { |_k, v| v + 1 }

def something(x)
  _unused_var, used_var = something_else(x)
  # some code
end

# Over this ...
result = hash.map { |_, v| v + 1 }

def something(x)
  _, used_var = something_else(x)
  # some code
end
```

  6. 'if' as a Modifier

```ruby
# This ..
do_something if some_condition

# over this
some_condition && do_something
```

  7. unless for Negatives
   
```ruby
# This..
do_something unless some_condition

# over this
some_condition || do_something
```
  8. String Interpolation
```ruby
# This..
email_with_name = "#{user.name} <#{user.email}>"

# over this..
email_with_name = format('%s <%s>', user.name, user.email)
```


#Tools.

After sometime, some of these styles become intuitive

For other cases
Yes, yes, we are mainly Ruby on Rails but we still kick-ass in other areas. For those
#conclusion
As a rule of thumb, when faced with a choice between established practices ad  better subjective alternatives, we insist on the established practice.



