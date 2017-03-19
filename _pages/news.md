---
layout: default
title: News
permalink: /news.html
priority: 0.80
promo_title: News
promo_intro: Find out what we are up to, what's new and what trending as we share discoveries, insights and knowledge.
paginate:
  per_page: 10 
  permalink: /news/page:num/  
---
<!-- ******Blog list Section****** -->
<section id="blog-list" class="blog-list section">
    <div class="container">
        <!-- This loops through the paginated posts -->
        {% for post in paginator.posts %}
        <article class="item">                
            <div class="row">
                <h3 class="post-title col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0"><a href="{{ post.url }}">{{ post.title }}</a></h3>
                <div class="clearfix"></div>
                <div class="meta col-md-2 col-sm-3 col-xs-12 text-right">
                    <ul class="meta-list list-unstyled">                                       
                        <li class="post-time post_date date updated">
                            <span class="date">{{ post.date  | date: "%-d"}}</span>
                            <span class="month">{{ post.date  | date: "%b"}}</span>
                        </li>
                        <li class="post-author"><a href="#">{{ post.author }}</a></li>
                        <!-- <li class="post-comments-link">
                            Comments: <a href="{{ post.url }}#comment-area">5</a>
                        </li> -->
                    </ul><!--//meta-list-->                             
                </div><!--//meta-list-->                    
                <div class="content-wrapper col-md-10 col-sm-9 col-xs-12">
                    <figure class="figure">
                        <a href="{{ post.url }}"><img class="img-responsive" src="assets/images/blog/{{ post.blog-image }}" alt=""></a>
                    </figure>
                    <div class="content">
                        <div class="desc">
                            <p>{{ post.intro }}</p>
                            <a class="read-more" href="{{ post.url }}">Read more <i class="fa fa-long-arrow-right"></i></a>
                        </div><!--//desc-->
                    </div><!--//content-->
                </div><!--//content-wrapper-->   
            </div><!--//row-->  
        </article><!--//item-->
        {% endfor %}
        <div class="pagination-container text-center">
                <ul class="pagination">
                {% if paginator.previous_page %}
                    <li><a href="{{ paginator.previous_page_path }}">«</a></li>
                {% else %}
                    <li class="disabled"><a href="#">«</a></li>
                {% endif %}
                {% for i in (1..paginator.total_pages) %}
                    {%if paginator.page == i %}
                        <li class="active"><a href="#">{{ i }}<span class="sr-only">(current)</span></a></li>
                    {% else %}
                        {%if i==1 %}
                            <li><a href="/news.html">{{ i }}</a></li>
                        {% else %}
                            <li><a href="/news/page{{i}}">{{ i }}</a></li>
                        {% endif %}
                    {% endif %}
                {% endfor %}
                {% if paginator.next_page %}
                <li><a href="{{ paginator.next_page_path }}">»</a></li>
                {% else %}
                <li class="disabled"><a href="#">»</a></li>
                {% endif %}
            </ul><!--//pagination-->
        </div>            
    </div><!--//container-->
</section><!--//blog-list--> 


