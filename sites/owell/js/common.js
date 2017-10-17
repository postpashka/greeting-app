var utils = {
    debounce: function (fn, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },
    throttle: function (fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last,
          deferTimer;
      return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    },
    toggleClass: function(el, className){
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
    }
}

var hamburger = {
    elem: document.querySelectorAll(".c-hamburger")[0],
    menu: document.querySelectorAll("header nav")[0],
    onClick: function(event){
        utils.toggleClass(this.elem, 'is-active');
        utils.toggleClass(this.menu, 'is-active');
    }
}


var ripple = {
    treshold: {
        'slow': [0, 100, 2600],
        'fast': [0, 250, 650]
    },
    onClick: function(target, event){
        var rect        = target.getBoundingClientRect(),
            left        = rect.left,
            top         = rect.top,
            width       = target.offsetWidth,
            height      = target.offsetHeight,
            offsetTop   = target.offsetTop, 
            offsetLeft  = target.offsetLeft, 
            dx          = event.clientX - left,
            dy          = event.clientY - top,
            maxX        = Math.max(dx, width - dx),
            maxY        = Math.max(dy, height - dy),
            style       = window.getComputedStyle(target),
            radius      = Math.sqrt((maxX * maxX) + (maxY * maxY)),
            speed       = target.classList.contains("ripple-slow") ? 'slow' : 'fast';
        redirectURL = target.attributes[0].value;
        (redirectURL!='') && setTimeout("location.href = redirectURL;", this.treshold[speed][2]);

        // Create the ripple and its container
        var ripple = document.createElement("div"), 
            rippleContainer = document.createElement("div");

        // Add optional classes
        if (target.classList.contains("exstra-light")) {
            ripple.classList.add("exstra-light");
        }
        else if (target.classList.contains("light")) {
            ripple.classList.add("light");
        }
        else if (target.classList.contains("dark")) {
            ripple.classList.add("dark");
        }

        // Add class, append and set location
        ripple.classList.add("ripple-effect");
        ripple.classList.add("ripple-effect-"+speed);

        rippleContainer.classList.add("ripple-container");
        rippleContainer.appendChild(ripple);
        document.body.appendChild(rippleContainer);

        ripple.style.marginLeft   = dx + "px";
        ripple.style.marginTop    = dy + "px";
      
        rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
        rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
        rippleContainer.style.width   = width + "px";
        rippleContainer.style.height  = height + "px";
        rippleContainer.style.borderTopLeftRadius  = style.borderTopLeftRadius;
        rippleContainer.style.borderTopRightRadius  = style.borderTopRightRadius;
        rippleContainer.style.borderBottomLeftRadius  = style.borderBottomLeftRadius;
        rippleContainer.style.borderBottomRightRadius  = style.borderBottomRightRadius;

        setTimeout(function() {

            ripple.style.width  = radius * 2 + "px";
            ripple.style.height = radius * 2 + "px";
            ripple.style.marginLeft   = dx - radius + "px";
            ripple.style.marginTop    = dy - radius + "px";


        }, this.treshold[speed][0]);



        setTimeout(function() {

            ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
        }, this.treshold[speed][1]);

        setTimeout(function() {

            ripple.remove();
            rippleContainer.remove();
        }, this.treshold[speed][2]);



    }
}


var roundTabs = {
    timer: setInterval(this.triggerNext, 5000),
    triggerNext: function(){
        var nextActiveTab = document.querySelectorAll(".round-tab.is-active")[0].nextElementSibling || document.querySelectorAll(".round-tabs>li:first-child")[0];
        nextActiveTab && nextActiveTab.click();        
    },
    onClick: function(){
        clearInterval(this.timer);
        this.timer = setInterval(this.triggerNext, 5000);
        var roundTabsBg = document.querySelectorAll(".title-round-tabs")[0];
        var roundTabs = document.querySelectorAll(".round-tabs")[0];
        var roundTabsLi = document.querySelectorAll(".round-tabs>li");
        var active = document.querySelector(".round-tabs .is-active");
        var index = Array.prototype.indexOf.call(roundTabsLi, active) + 1;
        roundTabs.className = "tabs round-tabs clearfix round-tabs-state-" + index;
    }

}



var tabs = {
    onClick: function(target){
        var targetTab = document.getElementById(target.childNodes[0].getAttribute("href").replace("#", ""));
        var tabsContent = targetTab.parentNode;
        var sections = tabsContent.querySelectorAll(".is-active-content")[0];
        var activeTab = target.parentNode.querySelectorAll(".is-active")[0];
        sections.className = sections.className.replace(/\bis-active-content\b/, ""); 
        targetTab.className += " is-active-content";
        activeTab.className = activeTab.className.replace(/\bis-active\b/, "");
        target.className += " is-active";
    }
}

var multiTabs = {
    onClick: function(target){

        utils.toggleClass( target, "is-active");

        var isActive = target.parentNode.querySelectorAll(".is-active");
        var isActiveContent = document.querySelectorAll(".is-active-content");
        var query = '';

        if ( isActive.length == 0 ) {
            query  = '*';
        } else {
            for (var i = 0, l = isActive.length; i < l; i++) {
                query += '.'+isActive[i].childNodes[0].getAttribute("href").replace("#", "");
            }
        }

        for (var i = 0, l = isActiveContent.length; i < l; i++) {
            utils.toggleClass(isActiveContent[i],"is-active-content")
        }

        var newActiveContent = document.querySelectorAll(query);

        for (var i = 0, l = newActiveContent.length; i < l; i++) {
            newActiveContent[i].classList.add('is-active-content');
        }

    }
}

var sections = {
    elems: document.querySelectorAll("main>section"),
    className: 'onScreen',
    onScreen: [],
    checkVisible: function(i, d) {
      var rect = this.elems[i].getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 + d || rect.top - viewHeight + d  >= 0);
    },

    removeOldOnScreenElems: function(){
        var onScreen = document.querySelectorAll('.'+this.className);
        for (var i = 0, l = onScreen.length; i < l; i++) {
            var classString = onScreen[i].className;
            classString = classString.replace(' '+this.className+' ', '');
            classString = classString.replace(this.className, '');
            onScreen[i].className = classString;
        }
    },
    addNewOnScreenElems: function(){
        for (var i = 0, l = this.elems.length; i < l; i++) {        
/*                var threshold = Math.round(this.elems[i].clientHeight/3);*/
                var threshold =  0;
                    if ( this.checkVisible(i, threshold) ) {
                        this.elems[i].className += ' '+this.className+' ';
                    } 
        }        
    },
    onScreenStateChecker: function(){
        this.removeOldOnScreenElems();
        this.addNewOnScreenElems();
    }
}


var header = {
    elem: document.getElementById("header"),
    bgColorChecker: function(){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 965) {
            !this.elem.classList.contains('header-white') && this.elem.classList.add('header-white');
        } else {
            this.elem.classList.contains('header-white') && this.elem.classList.remove('header-white');
        }
    }
};

var counters = {
    parent: document.querySelectorAll('.about')[0] || document.querySelectorAll('.counters-section')[0],
    elems: document.querySelectorAll("span[data-inc-value]"),
    objs: [],
    inc: function(obj) {
        var elem = obj;
        var value = parseFloat(elem.getAttribute("data-inc-value")) || 0;
        var duration = parseInt(elem.getAttribute("data-inc-duration")) || 0;
        var delay = parseInt(elem.getAttribute("data-inc-delay")) || 0;
        var speed = 10;
        var count = 0;
        var increment = value / (duration / speed);
        var interval = null;
        var regex = /\B(?=(\d{3})+(?!\d))/g;
        var run = function() {
            count += increment;
            if (count < value) {
                elem.innerHTML = count.toFixed(0).toString()
            } else {
                clearInterval(interval);
                elem.innerHTML = value.toFixed(0).toString()
            }
        };
        setTimeout(function() {
            interval = setInterval(run.bind(this), speed)
        }
        .bind(this), delay);
    },
    getPos: function(el) {
        for (var lx=0, ly=0;
             el != null;
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x: lx,y: ly};
    },
    incAnimationChecker: function(){
        console.log('window.scrollY ' + window.scrollY);
        console.log('this.getPos(this.parent).y ' + this.getPos(this.parent).y);
        console.log('--------------------------------');
        if (window.scrollY >= ( this.getPos(this.parent).y - Math.round( document.documentElement.clientHeight/2 ) ) ){
            ( this.objs.length == 0 ) && this.incAnimationRun();
        }
    },
    incAnimationRun: function(){
        for (var i = 0, l = this.elems.length; i < l; i++) {
            this.objs[i] = this.elems[i];
            this.inc(this.elems[i]);
        }

    }
};

var parallax = {
    container: null,
    elem: null,
    init: function(containerClassName, elemClassName){
        this.container = document.querySelectorAll('.'+containerClassName)[0];
        this.elem = document.querySelectorAll('.'+elemClassName)[0];


        if (this.container  && this.elem ){
            this.event = event;
            this.container.addEventListener('mousemove', utils.throttle(function(event){
                parallax.mouseMove(event);
            }, 250));

        }
    },
    mouseMove: function(event){
        var x=event.clientX;
        var y=event.clientY;
        mouseX = Math.round(100*x/this.container.offsetWidth);
        this.elem.style.backgroundPosition = mouseX+'% 50%';
    }
};

var slider = {
    init: function(sliderClassName){
        var simple = document.querySelector('.'+sliderClassName);
        simple && window.lory && lory(simple, {
            infinite: 3,
            slidesToScroll: 1
        });
    }
};

var deviceParallax = {
    init: function(containerClassName, elemClassName, distance){
        var container = document.querySelectorAll('.'+containerClassName)[0];
        var elem = document.querySelectorAll('.'+elemClassName)[0];
        var distance = distance;

        if (container  && elem ){
            container.addEventListener('mousemove', utils.throttle(function(event){

                var x=event.clientX;
                var y=event.clientY;
                mouseX = Math.round(x*100/container.offsetWidth);
                mouseY = Math.round(y*100/container.offsetHeight);
                translatedX = Math.round( (mouseX - 50)/100 * distance);
                translatedY = Math.round( (mouseY - 50)/100 * distance);
                elem.style.webkitTransform  = "translateX(" + translatedX+"px) translateY(" + translatedY+"px)";

            }, 50));

        }
    }

}

var loader = {
    hideLoader: function(){
        var loader = document.querySelector(".loader");
        loader.style.opacity = "0";
        setTimeout(function() {
            loader.style.display = "none"
        }, 0);
    }
}

var toggleList = {
    onClick: function(event, elSelector){
        if (!event.target.classList.contains('is-active')){
            var active = document.querySelector(elSelector);
            active && active.classList.remove('is-active');
            event.target.classList.add('is-active');
        }
        event.stopPropagation();
    }
}


var page = {
    onLoad: function(){
        slider.init('js_slider');
        parallax.init('about', 'about-poster');
        deviceParallax.init('pf-small-screens', 'pf-tablet', 100);
        deviceParallax.init('pf-main', 'pf-laptop', 100);
        deviceParallax.init('pf-main', 'pf-modile', 200);
        deviceParallax.init('portfolio-title-section', 'pf-tabs-content', 100);
        loader.hideLoader();
        sections.onScreenStateChecker();
    },

    pageOnScroll: function(event){
        sections.onScreenStateChecker();
    },
    indexOnScroll: function(event){
        header.bgColorChecker();
        counters.incAnimationChecker();
    },
    aboutUsOnScroll: function(event){
        counters.incAnimationChecker();
    },
    serviceItemOnScroll: function(event){
        counters.incAnimationChecker();
    },

    onClick: function(event){
        var target = event.target;
        target.classList.contains("ripple") && ripple.onClick(target,event);
        target.classList.contains("tab") && tabs.onClick(target);
        target.classList.contains("multi-tab") && multiTabs.onClick(target);
        target.classList.contains("round-tab") && roundTabs.onClick(event);
        target.classList.contains("c-hamburger") && hamburger.onClick(event);
        target.parentNode.classList.contains("categories-list") && toggleList.onClick(event, ".categories-list>.is-active");
        target.classList.contains("service-panel") && toggleList.onClick(event, ".service-panel.is-active");
        target.classList.contains("tes-panel") && toggleList.onClick(event, ".tes-panel.is-active");
    }
};





(function() {

    document.body.addEventListener("mouseup", function(event) {
        page.onClick(event);
    });

    window.onload = function() {
        page.onLoad();
    };

    var currentPage = document.querySelector("main");

    if ( currentPage.classList.contains("index-page") ){

        window.addEventListener('scroll', utils.debounce(function (event) {
            page.indexOnScroll();
            page.pageOnScroll();
        }, 250) );

    } else if ( currentPage.classList.contains("about-us-page") ){ 
        window.addEventListener('scroll', utils.debounce(function (event) {
            page.aboutUsOnScroll();
            page.pageOnScroll();
        }, 250) );
    } else if ( currentPage.classList.contains("service-item-page") ){ 
        window.addEventListener('scroll', utils.debounce(function (event) {
            page.serviceItemOnScroll();
            page.pageOnScroll();
        }, 250) );
    } else {
        window.addEventListener('scroll', utils.debounce(function (event) {
            page.pageOnScroll();
        }, 250) );
    }




})();
