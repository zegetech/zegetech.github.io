
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
    poweredBy: true // This is required if you're on the free Community plan
  })
);
// Add hits only when typing
const searchBar=document.getElementById('search-searchbar')
searchBar.addEventListener('keyup',function(){
  // add only when there's a value
  console.log(searchBar);
  if (searchBar.value !="") {
    search.addWidget(
      instantsearch.widgets.hits({
        container: '#search-hits',
        templates:{
          empty: "Oops, No results found",
          item: '<a href="{{url}}"> {{{_highlightResult.title.value}}}</a>'
        }
      })
    );
  }

});




// Starting the search
search.start();
