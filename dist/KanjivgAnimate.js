'use strict';

var KanjivgAnimate = (function () {

    function KanjivgAnimate(trigger, time) {
        time = typeof time !== 'undefined' ? time : '.6s';

        this.setOnClick(trigger, time);
    }

    /**
     * Add onclick function to triggers.
     */
    KanjivgAnimate.prototype.setOnClick = function setOnClick(trigger, time) {
        var triggers = document.querySelectorAll(trigger);

        var length = triggers.length;

        var kvganimate = this;

        for (var i = 0; i < length; i++) {
            triggers[i].onclick = function() {
                var animate = new KVGAnimator(time);

                animate.play(this);

                return false;
            };
        }
    };

    return KanjivgAnimate;
})();

var KVGAnimator = (function () {

    function KVGAnimator(time) {
        this.time = time;
    }

    /**
     * Initiate the animation.
     * 
     * @param  {element} trigger 
     */
    KVGAnimator.prototype.play = function play(trigger) {
        var svg = this.findTarget(trigger);

        if (!svg || svg.tagName !== 'svg' || svg.querySelectorAll('path') <= 0) {
            return;
        }

        this.paths = svg.querySelectorAll('path');

        this.numbers = svg.querySelectorAll('text');

        var pathCount = this.paths.length;

        this.hideAll(pathCount);

        var count = 0;

        var path = this.paths[count];

        var number = this.numbers[count];

        this.animatePath(path, number, pathCount, count);
    };

    /**
     * Find data target, if available.
     * 
     * @param  {element} trigger
     */
    KVGAnimator.prototype.findTarget = function findTarget(trigger) {
        var attribute = 'data-kanjivg-target';

        if (!trigger.hasAttribute(attribute)) {
            return trigger;
        }

        var target = trigger.getAttribute(attribute); 

        return document.querySelector(target);
    };

    /**
     * Hide paths and numbers before animation.
     * 
     * @param  {int} pathCount
     */
    KVGAnimator.prototype.hideAll = function hideAll(pathCount) {
        for (var i = 0; i < pathCount; i++) {
            this.paths[i].style.display = 'none';

            if (typeof this.numbers[i] !== 'undefined') {
                this.numbers[i].style.display = 'none';
            }
        }  
    };

    /**
     * Animate single path.
     * 
     * @param  {element} path
     * @param  {element} number
     * @param  {int} pathCount 
     * @param  {int} count 
     */
    KVGAnimator.prototype.animatePath = function animatePath(path, number, pathCount, count) {
        var length = path.getTotalLength();

        path.style.display = 'block';

        if (typeof number !== 'undefined') {
            number.style.display = 'block';
        }

        path.style.transition = path.style.WebkitTransition = 'none';

        path.style.strokeDasharray = length + ' ' + length;

        path.style.strokeDashoffset = length;

        path.getBoundingClientRect();

        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset ' + this.time + ' ease-in-out';

        path.style.strokeDashoffset = '0';

        if (count <= pathCount) {
            count += 1;

            var newPath  = this.paths[count];

            var newNumber = this.numbers[count];

            if (newPath) {
                var transitionEvent = this.whichTransitionEvent(path);

                var _this = this;

                path.addEventListener('transitionend', function() {
                    _this.animatePath(newPath, newNumber, pathCount, count);
                });

                transitionEvent && path.addEventListener(transitionEvent, function() {
                    _this.animatePath(newPath, newNumber, pathCount, count);
                });
            }
        }
    };

    /**
     * Find transition event.
     * 
     * @param  {element} element
     * 
     * @return {string}
     */
    KVGAnimator.prototype.whichTransitionEvent = function whichTransitionEvent(element) {
        var t;

        var transitions = {
          'transition':'webkitTransitionEnd',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'MSTransition':'msTransitionEnd',
          'WebkitTransition':'webkitTransitionEnd'
        };

        for (t in transitions) {
            if( element.style[t] !== undefined ) {
                return transitions[t];
            }
        }

        return 'transitionend';
    };

    return KVGAnimator;
})();

module.exports = KanjivgAnimate;
