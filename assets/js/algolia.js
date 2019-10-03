
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
    poweredBy: true, // This is required if you're on the free Community plan
    showReset: true,
    searchAsYouType: true,
    autofucus: true
  })
);
// Add hits only when typing
const searchBar=document.getElementById('search-searchbar')
//searchBar.addEventListener('keyup',function(){
  // add only when there's a value


    search.addWidget(
      instantsearch.widgets.hits({
        paginationLimitedTo: 3,
        hitsPerPage: 5,
        container: '#search-hits',
        templates:{
          empty: "Oops, No results found",
        // item: '<li><a href="{{url}}"><b>{{{_highlightResult.title.value}}}</b> </a><br> {{slug}}</li>'
         item: '<a href="{{url}}"><b>{{{_highlightResult.title.value}}}</b> </a><br> {{slug}}</a>'
        }
      })
    );

    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination-container',
        maxPages: 10,
        // default is to scroll to 'body', here we disable this behavior
        scrollTo: false,
        showFirstLast: false,
        poweredBy: true
      })
    );

    // // Add powered by widget
    // search.addWidget(
    //   instantsearch.widgets.poweredBy({
    //     container: '#powered_by',
    //     theme: 'dark'
    //   })
    // );


//});




// Starting the search
search.start();
