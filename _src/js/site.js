/* Scripts */

//Site

var Site = (function($) {
  
  var settings;
  
  //Elements
  var site = $('html'),
      siteWrapper = $('.site-wrapper')
  
  return {
  
    config: {},
    
    init: function(options) {
      this.config = $.extend(this.config, options);
      settings = this.config;
      
      this.bindUIActions();
    },
    
    bindUIActions: function() {      
      //UI Functions Go Here
    }
  
  };

})(jQuery);
  

//On Document Ready
$(function() {
  
  Site.init();
    
});

//On Window Load
$(window).load(function() {
  
});