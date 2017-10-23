'use strict';


var Button = (function(window, undefined) {

  function Button(el) {
    var self = this;
    this.btn = el;
  };

  Button.prototype.hideBtns = function() {
    var b = this.btn;
    var tween = TweenLite.to(b, 0.2, {
      scale: 0.25,
      autoAlpha: 0,
      ease: Expo.easeInOut
    }, 0.1);
    return tween;
  };

  /**
   * Show Button, called for all Buttons except the selected one.
   */
  Button.prototype.showBtns = function() {
    var b = this.btn;
    var tween = TweenLite.to(b, 0.2, {
      scale: 1,
      autoAlpha: 1,
      clearProps: 'all',
      ease: Expo.easeInOut
    }, 0.1);
    return tween;
  };

  return Button;

})(window);

export default Button;