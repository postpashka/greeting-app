'use strict';

/**
 * Card.
 */
 import Button from './Button';

var Card = (function(window, undefined) {

  /**
   * Enum of CSS selectors.
   */
  var SELECTORS = {
    container: '.card__container',
    content: '.card__content',
    clip: '.clip',
    btns: '.card__btn-close'
  };

  /**
   * Enum of CSS classes.
   */
  var CLASSES = {
    containerClosed: 'card__container--closed',
    bodyHidden: 'body--hidden'
  };

  /**
   * Card.
   */
  function Card(id, el) {

    this.id = id;

    this._el = el;

    // Get elements.
    this._container = this._el.querySelector(SELECTORS.container);
    this._content = this._el.querySelector(SELECTORS.container);
    this._clip = this._el.querySelector(SELECTORS.clip);
    this._content = this._el.querySelector(SELECTORS.content);
//    this._btns = this._el.querySelector(SELECTORS.btns);

    this.isOpen = false;

    this._TL = null;
    this.btnTag = this._el.querySelector(SELECTORS.btns);
    this.btn = new Button(this.btnTag);
  };

  /**
   * Open card.
   * @param {Function} callback The callback `onCardMove`.
   */
  Card.prototype.openCard = function(callback) {

    this._TL = new TimelineLite;

    var slideContentDown = this._slideContentDown();
    var floatContainer = this._floatContainer();
    var slideContentUp = this._slideContentUp();

    // Compose sequence and use duration to overlap tweens.
    this._TL.add(slideContentDown);
//    this._TL.add(clipImageIn, 0);
    this._TL.add(floatContainer, '-=0.6');
//    this._TL.add(clipImageOut, '-=' + floatContainer.duration() * 0.3);
    this._TL.add(slideContentUp, '-=0.6');
    

    this.isOpen = true;

    return this._TL;
  };

  /**
   * Slide content down.
   * @private
   */
  Card.prototype._slideContentDown = function() {

    var tween = TweenLite.to(this._content, 0.8, {
      y: window.innerHeight,
      ease: Expo.easeInOut
    });

    return tween;
  };
  /**
   * Float card to final position.
   * @param {Function} callback The callback `onCardMove`.
   * @private
   */
  Card.prototype._floatContainer = function() {
    document.body.addClass(CLASSES.bodyHidden);

    var TL = new TimelineLite;

    var rect = this._container.getBoundingClientRect();
    var windowW = window.innerWidth;

    var track = {
      width: 0,
      x: rect.left + (rect.width / 2),
      y: rect.top + (rect.height / 2),
      // y: rect.top - $('.wrappers')[0].offsetTop + $('.wrappers').innerHeight()/2 + (rect.height / 2),
    };

    TL.set(this._container, {
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      // y: rect.top - $('.wrappers')[0].offsetTop + $('.wrappers').innerHeight()/2,
      position: 'fixed',
      overflow: 'hidden'
    });

    TL.to([this._container, track], 0.8, {
      width: windowW,
      height: '100%',
      x: windowW / 2,
      y: 0,
      // y: - $('.wrappers')[0].offsetTop,
      xPercent: -50,
      ease: Expo.easeInOut,
      clearProps: 'all',
      className: '-=' + CLASSES.containerClosed
    });

    return TL;
  };

  /**
   * Slide content up.
   * @private
   */
  Card.prototype._slideContentUp = function() {

    var tween = TweenLite.to(this._content, 1, {
      y: '-100%',
      ease: Expo.easeInOut
    });

    return tween;
  };
  

  /**
   * Close card.
   */
  Card.prototype.closeCard = function() {

    TweenLite.to(this._container, 0.4, {
      scrollTo: {
        y: 0
      },
      onComplete: function() {
        this._container.style.overflow = 'hidden';
      }.bind(this),
      ease: Power2.easeOut
    });

    this._TL.eventCallback('onReverseComplete', function() {

      TweenLite.set([this._container, this._content], {
        clearProps: 'all'
      });

      document.body.removeClass(CLASSES.bodyHidden);

      this.isOpen = false;

    }.bind(this));

    return this._TL.reverse();
  };

  /**
   * Hide card, called for all cards except the selected one.
   */
  Card.prototype.hideCard = function() {

    var tween = TweenLite.to(this._el, 0.5, {
      scale: 0.8,
      autoAlpha: 0,
      top: '300px',
      transform: 'translateY(100px)',
      transformOrigin: 'center bottom',
      ease: Expo.easeInOut
    }, 0);
    return tween;
  };

  /**
   * Show card, called for all cards except the selected one.
   */
  Card.prototype.showCard = function() {

    var tween = TweenLite.to(this._el, 0.5, {
      scale: 1,
      autoAlpha: 1,
      top: '0px',
      transform: 'translateY(0px)',
      clearProps: 'all',
      ease: Expo.easeInOut
    }, 0);
    return tween;
  };

  return Card;

})(window);

export default Card;