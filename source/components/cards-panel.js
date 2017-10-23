'use strict';

import Card from './Card';
import Button from './Button';

/**
 * Demo.
 */
var cardsPanel = (function(window, undefined) {

  /**
   * Enum of CSS selectors.
   */
  var SELECTORS = {
    card: '.card',
    cardImage: '.card__image',
    cardClose: '.card__btn-close'
  };

  /**
   * Enum of CSS classes.
   */
  var CLASSES = {
    polygon: 'polygon',
    polygonHidden: 'polygon--hidden'
  };

  /**
   * Map of svg paths and points.
   */
  var polygonMap = {
    paths: null,
    points: null
  };

  /**
   * Container of Card instances.
   */
  var layout = {};

  /**
   * Initialise demo.
   */

  function cardsPanel(cardSelector) {
    this.selector = document.getElementsByClassName(cardSelector)[0];
    this.elems = this.selector.querySelectorAll(SELECTORS.card);
    this.btnTag = this.selector.querySelectorAll('.tabs-nav');
    this.btn = new Button(this.btnTag);
    this.layout = {};
    polygonMap.points = [];
    var self = this;
    Array.prototype.forEach.call(this.elems, function(card, i){
      var instance = new Card(i, card);
      instance.btnTag && instance.btn.hideBtns();
      self.layout[i] = {
        card: instance
      };
    });
    this._bindCards(cardSelector, this.elems, this.layout);
    var sequence = new TimelineLite;
    sequence.add(this._showHidePanel(true));
    sequence.play(10);
  };


  cardsPanel.prototype._bindCards = function() {
    var elements = this.elems;
    var lo = this.layout;
    var btns = this.btns;
    var self = this;
    Array.prototype.forEach.call(elements, function(card, i){
      var cardImage = card.querySelector(SELECTORS.cardImage);
      var cardClose = card.querySelector(SELECTORS.cardClose);
      (cardImage!=null) && (cardImage.onclick = self._playSequence.bind(this, true, i, self));
      (cardClose!=null) && (cardClose.onclick = self._playSequence.bind(this, false, i, self));
    });
  };

  cardsPanel.prototype._playSequence = function(isOpenClick, id, it, e) {
    var card = it.layout[id].card;

    // Prevent when card already open and user click on image.
    if (card.isOpen && isOpenClick) {
      return;
    } else {    
      // Create timeline for the whole sequence.
      var sequence = new TimelineLite({paused: true});

      delete it.layout[id];
      var tweenOtherCards = _showHidePanelCardsAndTabs(it.layout, !card.isOpen, it.btn);
      it.layout[id] = {
        card: card
      };
      if (!card.isOpen) {
        sequence.add(tweenOtherCards);
        sequence.add(card.openCard(_onCardMove2), 0);
        sequence.add(card.btn.showBtns());
      } else {
        var closeCard = card.closeCard();
        var position = closeCard.duration() * 0.8; // 80% of close card tween.
        sequence.add(closeCard);
        sequence.add(card.btn.hideBtns());
        sequence.add(tweenOtherCards, position);
      }

      sequence.play();
    }

  };

  cardsPanel.prototype._showHidePanel = function(isOpenClick) {

    var TL = _showHidePanelCardsAndTabs(this.layout, isOpenClick, this.btn);

    TL.eventCallback("onStart", updatePanel, [this.selector, true, isOpenClick]);
    TL.eventCallback("onComplete", updatePanel, [this.selector, false, isOpenClick]);

    return TL;

  }



  function updatePanel(panel, isStart, isOpen){
   if (isStart && !isOpen) {
     panel.addClass('active');
   } 
   if (!isStart && isOpen){
     panel.removeClass('active');
   }
  }

  function _showHidePanelCardsAndTabs(layout, isOpenClick, btn) {
    var TL = new TimelineLite;

      // When called with `openCard`.
    if (isOpenClick) {
      TL.add(btn.hideBtns(), "+=0.025");
      for (var i in layout) {
        var card = layout[i].card;
        TL.add(card.hideCard(), "-=0.4");
      }
      TL.add(btn.hideBtns(), "+=0.025");
    }

    // When called with `closeCard`.
    if (!isOpenClick) {
      for (var i in layout) {
        var card = layout[i].card;
        TL.add(card.showCard(), "-=0.4");
      }
      TL.add(btn.showBtns(), "+=0.025");
    }
    return TL;
  };

  function _onCardMove2(track) {
    console.log('_onCardMove2');
  }


  // Expose methods.
  return cardsPanel;

})(window);

export default cardsPanel;