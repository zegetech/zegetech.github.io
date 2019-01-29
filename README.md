[![Build Status](https://travis-ci.org/zegetech/zegetech.github.io.svg?branch=master)](https://travis-ci.org/zegetech/zegetech.github.io)
# Zegetech Website 

## Environments
1. Staging: http://zegetech.github.io - `master` branch
2. Production: http://zegetech.com - `release` branch

## Stack
1. Jekyll
2. Firebase
3. Travis-CI

## SEO
1. Facebook Open Graph
2. Google Webmaster tools
3. Google Analytics
4. Facebook Pixel
5. Twitter Metadata

## Interaction
1. Drift
2. Typeform
3. Little Javascript and CSS magic
4. Disqus 

## Rules
1. Sync you PR branch with Master branch
2. Make PR
3. PR will be reviewed
4. Once PR is tested and merged, Master is merged to release and changes go live.

## Posts
### Writing
Project uses [jekyll-compose](https://github.com/jekyll/jekyll-compose) to manage the writing process. Start a new post with:
~~~shell
bundle exec jekyll post "new post" # if jekyll is locally installed
docker-compose run site jekyll post "new post" # running with docker
~~~

### Linking to posts
Project uses [jekyll-relative-links](https://github.com/benbalter/jekyll-relative-links). To link to another post within the project, use the filename as the href, example:
~~~md
[link to some awesome post](2019-01-01-some-awesome-post.md)
~~~

## Testing
1. In the project's directory run `rake test`.