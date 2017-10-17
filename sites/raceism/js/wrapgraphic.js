function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
      
        osElement.css({
          '-webkit-animation-delay':  osAnimationDelay,
          '-moz-animation-delay':     osAnimationDelay,
          'animation-delay':          osAnimationDelay
        });

        var osTrigger = ( trigger ) ? trigger : osElement;
        
        osTrigger.waypoint(function() {
          osElement.addClass('animated').addClass(osAnimationClass);
          },{
              triggerOnce: true,
              offset: '70%'
        });
  });
}

function onScrollInit2( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
      
        osElement.css({
          '-webkit-animation-delay':  osAnimationDelay,
          '-moz-animation-delay':     osAnimationDelay,
          'animation-delay':          osAnimationDelay
        });

        var osTrigger = ( trigger ) ? trigger : osElement;
        
        osTrigger.waypoint(function() {
          osElement.addClass('animated').addClass(osAnimationClass);
          },{
              triggerOnce: true,
              offset: '90%'
        });
  });
}


$(document).ready(function () {


  $('#agreementCheckbox').on('change', function(){

    $(this).prop('checked') ? $('.orderSubmit').removeAttr('disabled') : $('.orderSubmit').attr('disabled', 'disabled');
  })


    $(window).load(function(){
        $(".loader-wrapper").fadeOut(1000);
	    $("body").niceScroll({styler:"fb", cursorcolor:"#f2cb29", scrollspeed:200, cursorwidth: '10px', cursorborder: '1px solid #000', horizrailenabled: false});
//        $("#page-id").niceScroll();
//	    $("#page-id").getNiceScroll();
    });



var vis = (function(){
    var stateKey, 
        eventKey, 
        keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();


vis(function(){
          
    if(vis()){  
          
  setTimeout(function(){  
          $(".loader-wrapper").fadeOut(1000);
        }, 500);   
                        
    } else {
        $(".loader-wrapper").css('display', 'block');
    }
});

        
});
