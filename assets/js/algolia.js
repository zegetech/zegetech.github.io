
const search = instantsearch({
  appId: 'TN8603H0T3',
  indexName: 'zegetech.com',
  apiKey: '81daa33178cad0ab2dbe734196b5dccb',
  //attributesForFaceting:['categories','url']
});

// Adding searchbar and results widgets
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-searchbar',
    placeholder: 'Search  ...',
    poweredBy: false, // This is required if you're on the free Community plan
    showReset: true,
    searchAsYouType: true,
    autofucus: true,

  })
);

search.addWidget(
  instantsearch.widgets.configure({
      hitsPerPage: 4,
      distinct: true,
      clickAnalytics: true,
  //    attributesToRetrieve:['categories','intro','title','url','blog-image'],
    //  attributesForFaceting:['categories']
    //  filters:'NOT content.developer'
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
         item: data =>`
         <div class="row hits-md hidden-xs">
         <div class="col-md-3 col-sm-3">
         <a href="${data.url}"><img class="img-responsive" src="/assets/images/blog/${data['blog-image']}" alt=""></a>
         </div>
         <div class="col-md-9 col-sm-9">
         <a class="" href="${data.url}">
         <b>${data.title}</b>
          </a>
          <div class="text-default">
          <br>
          ${(new showdown.Converter()).makeHtml(data.intro.substring(0,150))}
           <a href="${data.url}">...read more</a>
          </div>
         </div>
         </div>

         <div class="row hits-xs visible-xs">
            <div class="col-xs-3 ">
            <a href="${data.url}"><img class="thumb-image-xs img-responsive" src="/assets/images/blog/${data['blog-image']}" alt=""></a>
            </div>
            <div class="col-xs-9">
            <a class="" href="${data.url}">
            ${data.title}
             </a>
             <p>${ moment(data.date * 1000).format("LL")}</p>
            </div>
         </div>
         `
        }
      })
    );

// add refinement for blogs  only in pathname start with blogs

// const pagename=window.location.pathname
// if(pagename.startsWith("/blog/")){
//   search.addWidget(
//     instantsearch.widgets.refinementList({
//       container: '#category',
//       attributeName: 'categories',
//       operator:'or',
//       limit:10,
//       showMore:true,
//       searchable:true,
//       sortBy:['name:asc'],
//       templates: {
//          item: data=>`
//            <a href="${data.url}" style="{{#isRefined}}font-weight: bold{{/isRefined}}" disabled>
//              <span>${
//                 !data.label.endsWith(",")? data.label:""
//                 }</span>
//            </a>
//          `,
//        },
//     })
//   );
// }

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
    //     theme: 'light'
    //   })
    // );


 // Stats widget
  search.addWidget(
    instantsearch.widgets.stats({
        container: '#stats',
      })
  );
// Starting the search
search.start();
