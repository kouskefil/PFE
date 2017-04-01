console.log('before');
require(['jquery'], function ($) {
   $("#menu-toggle").click(function(e) {
      e.preventDefault();
      console.log('after');
      $("#wrapper").toggleClass("active");
   });


});
