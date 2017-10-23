'use strict';

import {TweenMax, TweenLite} from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";


import cardsPanel from './cards-panel';
/**
 * Tabs.
 */

var Tabs = (function(window, undefined) {

  var tabsNav = document.getElementsByClassName('tabs-nav');
  var wrappers = document.querySelector('.wrappers');
  var panels = [];
  var isTabActive = false;
  var activeTab = '';

  function Tabs(id, el) {
    Array.prototype.forEach.call(tabsNav, function(nav){
      var target = nav.dataset['target'];
      if (target) {
        var panel = new cardsPanel(target);
        panels[target] = panel;
      }
      nav.onclick = _bindTab.bind(this, target, panels);
    });
    document.querySelector('*[data-target="cardPanel1"]').click();

    
  };


  function _bindTab (target, panels, e) {
    var sequence = new TimelineLite({paused: true});
    if (activeTab != '') {
/*      sequence.add(
        TweenLite.to(wrappers, (wrappers.scrollTop/100) , {
          scrollTo: { y: 0 },
          ease: Power2.easeOut
        }));*/
      sequence.add(panels[activeTab]._showHidePanel(true));
    }
    if (target == activeTab) {
      activeTab = '';
    } else {
      activeTab = target;
      sequence.add(panels[activeTab]._showHidePanel(false))
    }
//    sequence.eventCallback("onComplete", setTabState(false));
    sequence.play();
  };


  function setTabState(argument) {
    isTabActive = argument;
    console.log('argument = '+ isTabActive);
  }


  return Tabs;

})(window);

export default Tabs;