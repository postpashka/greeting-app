'use strict';

require('./style.sass');
// register service worker
/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}*/



import Tabs from './components/tabs';
import Ripple from './components/ripple';
import Form from './components/form';

window.onload = function() {
  var tabs = new Tabs();
  var ripple = new Ripple();
  var form = new Form();
  var lazy = document.getElementsByClassName('lazy');
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var viewport = (width < 768) ? 'data-mobile-src' : 'data-src';
  console.log(viewport);
  for(var i=0; i<lazy.length; i++){
    lazy[i].src = lazy[i].getAttribute(viewport);
  }
};

// var bLazy = new Blazy({ success: function(){ updateCounter(); } });
// bLazy.load(document.getElementsByClassName('b-lazy'), true);

var imageLoaded = 0;
function updateCounter() {
  imageLoaded++;
}
console.log(imageLoaded);


Element.prototype.addClass = function (classToAdd) {
  var classes = this.className.split(' ')
  if (classes.indexOf(classToAdd) === -1) classes.push(classToAdd)
  this.className = classes.join(' ')
}

Element.prototype.removeClass = function (classToRemove) {
  var classes = this.className.split(' ')
  var idx =classes.indexOf(classToRemove)
  if (idx !== -1) classes.splice(idx,1)
  this.className = classes.join(' ')
}

