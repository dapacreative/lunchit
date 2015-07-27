/* Scripts */

//Site

var Site = (function($) {
    
  //Elements
  var $site = $('html'),
      $root = $('.site-container'),
      $header = $root.find('.header'),
      $content = $root.find('.content'),
      $footer = $root.find('.footer');

  var selectedPlaces = [],
      finalPlaces = '',
      placeType = 'sitdown';
  
  return {
    
    init: function() {  
      this.registerHandlebarHelpers(); 
      this.bindEvents();
      this.renderPeopleList(city);
    },
    
    bindEvents: function() {
      var $this = this;

      $header.on('click', 'h1 + a', function(e){
        e.preventDefault();
        $this.scrollToElement($content);
      });

      $content.on('submit', 'form', function(e){
        e.preventDefault();
        $this.getSelectedPlaces();
        $this.renderFinalPlace(finalPlaces);
      });

      $content.on('change', 'input[type="radio"]', function(){
        var value = $('input[type="radio"]:checked').val();

        placeType = value;
      });
    },

    compareSelectedPlaces: function(placesArray) {
      return (_.intersection.apply(_, placesArray).length !== 0) ? _.intersection.apply(_, placesArray) : _.union.apply(_, placesArray);
    },

    customAlertBox: function(options) {
      bootbox.dialog({
        message: options.message,
        title: options.title,
        buttons: {
          confirm : {
            label: options.buttonText,
            className: "btn-primary",
            callback: function() {
              options.success();
            }
          }
        }
      });
    },

    displayAlertMessage: function() {
      var alertSettings = {
        message: 'Please choose what type of lunch you would like.',
        title: 'Alert',
        buttonText: 'Ok',
        success: function() {
          // Do nothing
        }
      };

      this.customAlertBox(alertSettings);
    },

    getPerson: function(location, name) {
      switch(location) {
        case 'stl':
        return _.filter(stlLunchees.people, function(data) { 
          return data.name === name;
        })[0];
        case 'atl':
        return _.filter(atlLunchees.people, function(data) { 
          return data.name === name;
        })[0];
      }
    },

    getPersonFoodPlaces: function(person, type) {
      switch(type) {
        case 'delivery': 
          return person.delivery;
        case 'fast': 
          return person.fast;
        case 'sitdown': 
          return person.sitdown;
        case 'special': 
          return person.special;
      }
    },

    getRandomPlace: function(placeList) {
      var randomNumber = Math.floor(Math.random() * placeList.length);

      return placeList[randomNumber];
    },

    getSelectedPlaces: function() {
      var $this = this;

      selectedPlaces = [];

      $('input[type="checkbox"]:checked').each(function(){
        var value = $(this).val(),
            isChecked = this.checked,
            person = $this.getPerson(city, value),
            placeList = $this.getPersonFoodPlaces(person, placeType);

        $this.setSelectedPlaces(placeList);
      });

      finalPlaces = this.compareSelectedPlaces(selectedPlaces);
    },

    renderPeopleList: function(location) {
      var source = $("#person-list-template").html(),
          tpl = Handlebars.compile(source),
          context = (location === 'stl') ? stlLunchees : atlLunchees,
          html = tpl(context);

      $content.find('h2 + ul').html(html);
    },

    renderFinalPlace: function(places) {
      var insults = ['Dude', 'Buddy', 'Goof Ball', 'Nerd', 'Silly Goose', 'Prison Barber', 'You lewd, crude, rude, bag of pre-chewed food dude', 'Turd', 'Kiddo', 'Potato Chip', 'Lunch Box', 'Knucklehead', 'Ubergoober', 'Butt Nugget', 'Lollygagger', 'Scalawag', 'Swashbuckler', 'Dork', 'Doofus', 'Block Head', 'Big Meanie' ], 
          random = Math.floor(Math.random() * insults.length),
          finalPlace = (this.getRandomPlace(places) === undefined) ? 'You need to choose someone, ' + insults[random] + '!' : this.getRandomPlace(places),
          title = (this.getRandomPlace(places) === undefined) ? 'Alert' : 'You are going to';
          buttonTxt = (this.getRandomPlace(places) === undefined) ? 'Ok' : 'Let\'s Go';

      var settings = {
        message: finalPlace,
        title: title,
        buttonText: buttonTxt,
        success: function() {
          // Do nothing
        }
      };

      this.customAlertBox(settings);
    },

    registerHandlebarHelpers: function(){
      Handlebars.registerHelper('toLowerCase', function(str) {
        return str.toLowerCase();
      });
    },

    setSelectedPlaces: function(value) {
      selectedPlaces.push(value);
    },

    scrollToElement: function(elem, offset) {
      offset = offset || 0;

      $("body, html").animate({
        scrollTop: elem.offset().top + offset
      });
    }
  
  };

})(jQuery);
  

//On Document Ready
$(function() {
  Site.init();    
});

//On Window Load
$(window).load(function() {
  // Nothing
});