---
layout: default
title: Work
permalink: /work.html
priority: 0.80
promo_title: Our Work
promo_intro: Our approach involves working with you to understand the vision for your ideas in order to build well-placed and thought out products through a well-defined process from idea to launch
custom_scripts: |
  <!-- isotope -->
  <script type="text/javascript" src="assets/plugins/imagesloaded.pkgd.min.js"></script> 
  <script type="text/javascript" src="assets/plugins/isotope.pkgd.min.js"></script>    
  <script type="text/javascript" src="assets/js/isotope-custom.js"></script>
---
<!-- ******Intro Section****** -->
<section id="services" class="services section">
  <div class="container text-center">
  <h2 class="title">We build platforms</h2>
      <p class="intro"><b>Idea . Scope . Discovery . Design . Develop . Pilot . Launch . Grow . PROFIT!</b><br/>We develop products from idea to launch. We use <a href="http://agilemanifesto.org/principles.html" target="_blank">agile principles</a> in taking the idea through <a href="http://www.gv.com/sprint/" target="_blank">sprints</a>, building prototypes and running proof-of-concepts, deploying to staging environments for piloting within record time and thereafter go on to launch. We then provide support, training and consultancy to the technology and business teams. We help you innovate by working with you to build bold innovative products that can plug into your business to harness new opportunities and expand your horizons.</p>
  </div>
</section>
<!-- ******Work list Section****** -->
<section id="work-list" class="section work-list">
  <div class="container text-center">
    <h2 class="title">Case Studies</h2>
    <div id="filters" class="button-group clearfix">
      <button class="btn button is-checked" data-filter="*">All</button>
      <button class="btn button" data-filter=".saas">SaaS</button>
      <button class="btn button" data-filter=".mobile-app">Mobile app</button>
      <button class="btn button" data-filter=".ussd">USSD</button>
      <button class="btn button" data-filter=".startup">Startup</button>
      <button class="btn button last" data-filter=".payments">Payments</button>
    </div><!--//filters-->
    <div class="items-wrapper isotope row">
      {% for project in site.projects limit:6 %}
      {% capture tags_classes %}{% for tag in project.tags %} {{tag | downcase}} {% endfor %}{% endcapture %}
      <div class="item {{ tags_classes }} col-lg-4 col-md-4 col-sm-6 col-sm-12 ">
        <div class="item-inner">
          <figure class="figure">
            <a href="{{project.url}}"><img class="img-responsive" src="/assets/images/work/{{project.thumbnail}}" alt="" /></a>
            <a class="info-mask" href="{{project.url}}">
              <span class="desc">{{project.description}}</span>
              <span class="btn btn-cta btn-cta-primary" >View case study</span>
            </a><!--//info-mask-->
          </figure>
          <div class="content text-left">
            <h3 class="sub-title"><a href="{{project.url}}">{{project.subtitle}}</a></h3>
            {% assign tags = project.tags | join:" / " %}
            <div class="meta">{{ tags }}</div>
          </div><!--//content-->                    
        </div><!--//item-inner-->
      </div><!--//item-->
<!--       <li>
        <img src="{{ album.thumbnail-path }}" alt="{{ album.title }}"/>
        <a href="{{ album.url }}">{{ album.title }}</a>
        <p>{{ album.short-description }}</p>
      </li> -->
      {% endfor %}
    </div><!--//items-wrapper-->
  </div><!--//container-fluid-->
</section><!--//work-list"-->

<!-- ******Services Section****** -->
<section id="services" class="services section">
  <div class="container text-center">
    <p class="container text-center">
      <a id="philosophy"> </a>
      <h2 class="title">Our Philosophy</h2>
    </p>
    <div class="service-items row">
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_genius" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Our Process</h3>
            <p><a href="http://agilemanifesto.org/principles.html" target="_blank">Agile principles</a> ensures flexiblity and adaptability to project changes. We build with scalability and high performance in mind. Product quality is important, thus the need for quality-driven development and testing. </p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_star_alt" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Quality</h3>
            <p>We love a good night sleep. No code goes untested. Peer review ensures that code is satisfactory. We use <a href="http://nvie.com/posts/a-successful-git-branching-model/" target="_blank">git-flow feature branch cycles</a> for code. Automated testing and continous delivery to keep things maintainable. </p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_chat_alt" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Transparency</h3>
            <p>We believe that transparency and communication are key to building good software. You get full access to our PM tool <a href="https://asana.com" target="_blank">Asana</a> and others like <a href="https://trello.com" target="_blank">Trello</a>. Get end-of-week reports and set priority for following week.</p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_loading" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Continuity</h3>
            <p>We have deep roots in the technology market. We care deeply about the success of our projects and we will be with you long after the project is done. Any project transition to inhouse or outsourced teams is smooth</p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_clock_alt" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Speed</h3>
            <p>We ship your product fast and early using the agile workflow. Coding quickly while maintaining high quality. We use the cloud for rapid deployment on AWS, Digital Ocean and others. You get to market early </p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_key_alt" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Trust</h3>
            <p>The first month of collaboration is trial. You can terminate if unhappy with the relationship for any reason. We keep business confidential and are happy to sign an NDA. The code created belongs to you.</p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner"> 
          <div class="header-box">
            <i class="fs1 icon_tools" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Technology</h3>
            <p>We choose <a href="https://www.toptal.com/ruby-on-rails/after-two-decades-of-programming-i-use-rails" target="_blank">Ruby on Rails</a> and <a href="http://blog.rangle.io/why-use-angular-2-on-a-new-application/" target="_blank">Angular</a>. We build USSD apps and APIs. We have vast experience integrating to external services like Mailchimp, Social platforms, Bank system and payment gateways</p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
      <div class="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item-inner">
          <div class="header-box">
            <i class="fs1 icon_lock_alt" aria-hidden="true"></i>
          </div><!--//header-->
          <div class="desc">
            <h3 class="sub-title">Security</h3>
            <p>Working with banks and fintech startups has helped us gain sufficient experience to build apps with state-of-the-art security standards, backup and recovery. And in case of an emergency, you can always reach us.</p>
          </div>
        </div><!--//item-inner-->
      </div><!--//item-->
    </div><!--//row--> 
    <h2 class="title">We <i class="icon_heart"></i> Agile</h2>
    <p class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/K2vSQPh6MCE" frameborder="0" allowfullscreen></iframe>
    </p>
    <img src="/assets/images/work/agileprocess.png" class="img-responsive" />
    <h3>
      Need a successful project?
    </h3>
    <a id="get-estimate-btn" class="btn btn-cta btn-cta-primary" href="estimate.html">Get an Estimate</a>         
  </div><!--//container-->
</section> <!--//services -->

{% include quickchat.html %}

