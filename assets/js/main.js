$(document).ready(function() {

    /* ======= Twitter Bootstrap hover dropdown ======= */
    /* Ref: https://github.com/CWSpear/bootstrap-hover-dropdown */
    /* apply dropdownHover to all elements with the data-hover="dropdown" attribute */

    $('[data-hover="dropdown"]').dropdownHover();

    /* ======= jQuery Responsive equal heights plugin ======= */
    /* Ref: https://github.com/liabru/jquery-match-height */

     $('#who .item-inner').matchHeight();
     $('#testimonials .item-inner .quote').matchHeight();
     $('#latest-blog .item-inner').matchHeight();
     $('#services .item-inner').matchHeight();
     $('#team .item-inner').matchHeight();

    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */

    $('input, textarea').placeholder();

    /* ======= jQuery FitVids - Responsive Video ======= */
    /* Ref: https://github.com/davatron5000/FitVids.js/blob/master/README.md */
    $(".video-container").fitVids();


	/* ======= Fixed Header animation ======= */

    $(window).on('scroll', function() {

         if ($(window).scrollTop() > 80 ) {
             $('#header').addClass('header-shrink');
         }
         else {
             $('#header').removeClass('header-shrink');
         }
    });

    // Animation js jQuery extension
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    function loopwobble (elem,i,delay) {
        setTimeout(function () {
            $(elem).animateCss('wobble');
            if (--i) loopwobble(elem,i,delay);
        }, delay)
    }

    loopwobble('#get-estimate',10,15000);
    loopwobble('#get-estimate-btn',10,20000);

});

//Get every table class and append boostrap table-Responsive
tables=document.getElementsByTagName("TABLE");//.className="table-responsive";

for (var i = 0; i < tables.length; i++) {
  //create a div wrapper
  var wrapper = document.createElement('div');
  // add table-responsive boostrap class
  wrapper.className="table-responsive";
  tables[i].parentNode.insertBefore(wrapper, tables[i]);
  wrapper.appendChild(tables[i]);

}

images=document.getElementsByClassName("content")[0].getElementsByTagName("IMG");

for (var i = 0; i < images.length; i++) {
  images[i].className ="img-responsive center";
}
