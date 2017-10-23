'use strict';


var Form = (function(window, undefined) {
  var iframe = document.querySelector('iframe');
  var form  = document.querySelector('form');
  var submitted=false;
  var submit = document.getElementsByTagName('button')[0];
  var formGroups = document.querySelector('.form-groups');
  form.addEventListener('submit', formOnSubmit);
  iframe.addEventListener('load', iframeOnLoad);
  var TL = new TimelineLite;

  function iframeOnLoad(target){
    if(submitted) {
      var tween = TweenLite.to(submit, 0.4, {
        background: '#64dd17',
        ease: Power2.easeOut
      });
      TL.add(tween);
      TL.play();
      setTimeout(function(){window.location='./index.html';}, 1000);
    }         
  }
  function formOnSubmit(target){
    submitted=true;
    var tweenGroups = TweenLite.to(formGroups, 0.4, {
      height: 0,
      ease: Power2.easeOut
    });
    var tweenSubmit = TweenLite.to(submit, 0.4, {
      background: 'yellow',
      ease: Power2.easeOut
    });
    TL.add(tweenSubmit);
    TL.add(tweenGroups);
    TL.play();
  }

  function Form(){

  }

  return Form;

})(window);

export default Form;