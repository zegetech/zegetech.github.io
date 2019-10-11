
// Instanciating InstantSearch.js with Algolia credentials

const search = instantsearch({
  appId: 'TN8603H0T3',
  indexName: 'zegetech.com',
  apiKey: '81daa33178cad0ab2dbe734196b5dccb'
});

// Adding searchbar and results widgets
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-searchbar',
    placeholder: 'Search into posts...',
    poweredBy: false, // This is required if you're on the free Community plan
    showReset: true,
    searchAsYouType: false,
    autofucus: true,

  })
);

search.addWidget(
  instantsearch.widgets.configure({
      hitsPerPage: 4,
      distinct: true,
      clickAnalytics: true,
      //enablePersonalization: true,  //not supported in community plan
   })
);

const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

 //Search Hits
   search.addWidget(
      instantsearch.widgets.hits({
        container: '#search-hits',
        templates:{
          empty: "Oops, No results found",
        // item: '<li><a href="{{url}}"><b>{{{_highlightResult.title.value}}}</b> </a><br> {{slug}}</li>'
         //item: '<a href="{{url}}"><b>{{{_highlightResult.title.value}}}</b> </a><br> {{intro}}</a>'

         item: data =>`
         <article class="item">
             <div class="row">
                 <h3 class="post-title col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                 <a href="${ data.url }">${
                      //instantsearch.highlight({attributeName:"title",hit:data})
                     data.title
                 }</a></h3>
                 <div class="clearfix"></div>
                 <div class="meta col-md-2 col-sm-3 col-xs-12 text-right">
                     <ul class="meta-list list-unstyled">
                         <li class="post-time post_date date updated">
                             <span class="date">${(new Date(data.date *1000).getDay())+1}</span>
                             <span class="month">${months[(new Date(data.date *1000).getMonth())]}</span>
                         </li>
                         <li class="post-author"><a href="#">${data.author}</a></li>

                     </ul><!--//meta-list-->
                 </div><!--//meta-list-->
                 <div class="content-wrapper col-md-10 col-sm-9 col-xs-12">
                     <figure class="figure">

                         <a href="${data.url}"><img class="img-responsive" src="/assets/images/blog/${data['blog-image']}" alt=""></a>
                     </figure>
                     <div class="content">
                         <div class="desc">
                             <p>${ (new showdown.Converter()).makeHtml(data.intro) }</p>
                             <a class="read-more" href="${ data.url }">Read more <i class="fa fa-long-arrow-right"></i></a>
                         </div><!--//desc-->
                     </div><!--//content-->
                 </div><!--//content-wrapper-->
             </div><!--//row-->
         </article><!--//item-->
         `
        }
      })
    );

// add refinement
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#brand',
    attributeName: 'categories',
  })
);
// add pagination
    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination-container',
        maxPages: 20,
        scrollTo: false,
        showFirstLast: false,
      })
    );

 //poweredBy widget
    // search.addWidget(
    //   instantsearch.widgets.poweredBy({
    //     container: '#powered_by',
    //     theme: 'dark'
    //   })
    // );

 // Stats widget
  // search.addWidget(
  //   instantsearch.widgets.stats({
  //       container: '#stats',
  //     })
  // );
// Starting the search
search.start();
