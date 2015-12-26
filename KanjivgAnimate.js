var KanjivgAnimate = (function () {
    /**
     * Set first section of each toggle to active, rest to inactive.
     */
    var setup = function (time) {
        setOnClick();

        KanjivgAnimate.time = time;
    };

    /**
     * Add onclick function to .kanjiVG.
     */
    var setOnClick = function () {
        var kanjiVGs = document.querySelectorAll('.kanjiVG');

        var length = kanjiVGs.length;

        for (var i = 0; i < length; i++) {
            kanjiVGs[i].onclick = function() {
                KanjivgAnimate.play(this);

                return false;
            };
        }
    };

    /**
     * Set paths on object.
     * 
     * @param {array} value
     */
    var setPaths = function (value) {
        KanjivgAnimate.paths = value;  
    };

    /**
     * Set numbers on object.
     * 
     * @param {array} value
     */
    var setNumbers = function (value) {
        KanjivgAnimate.numbers = value;  
    };

    /**
     * Hide paths and numbers before animation.
     * 
     * @param  {int} pathCount
     */
    var hideAll = function (pathCount) {
        for (var i = 0; i < pathCount; i++) {
            var path = KanjivgAnimate.paths[i];

            path.style.display = 'none';

            if (typeof KanjivgAnimate.numbers[i] !== 'undefined') {
                var number = KanjivgAnimate.numbers[i];

                number.style.display = 'none';
            }
        }  
    };

    /**
     * Animate path.
     * 
     * @param  {element} path
     * @param  {element} number
     * @param  {int} pathCount 
     * @param  {int} count 
     */
    var animatePath = function (path, number, pathCount, count) {
        var length = path.getTotalLength();

        path.style.display = 'block';

        if (typeof number !== 'undefined') {
            number.style.display = 'block';
        }

        path.style.transition = path.style.WebkitTransition = 'none';

        path.style.strokeDasharray = length + ' ' + length;

        path.style.strokeDashoffset = length;

        path.getBoundingClientRect();

        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset ' + KanjivgAnimate.time + ' ease-in-out';

        path.style.strokeDashoffset = '0';

        if (count <= pathCount) {
            count += 1;

            var newPath  = KanjivgAnimate.paths[count];

            var newNumber = KanjivgAnimate.numbers[count];

            if (newPath) {
                var transitionEvent = whichTransitionEvent(path);

                transitionEvent && path.addEventListener('transitionend', function() {
                    animatePath(newPath, newNumber, pathCount, count);
                });

                transitionEvent && path.addEventListener(transitionEvent, function() {
                    animatePath(newPath, newNumber, pathCount, count);
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
    var whichTransitionEvent = function(element) {
        var t;

        var transitions = {
          'transition':'webkitTransitionEnd',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'MSTransition':'msTransitionEnd',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for (t in transitions) {
            if( element.style[t] !== undefined ) {
                return transitions[t];
            }
        }
    };

    return {
        /**
         * Initialize.
         */
        init: function (time) {
            if (typeof time === 'undefined') {
                time = '.6s';
            }

            document.addEventListener('DOMContentLoaded', function () {
                setup(time);
            }, false);
        },

        /**
         * Play the animation.
         * 
         * @param  {element} toggle 
         */
        play: function (svg) {
            var paths = svg.querySelectorAll('path');

            var numbers = svg.querySelectorAll('text');

            setPaths(paths);

            setNumbers(numbers);

            var pathCount = paths.length;

            hideAll(pathCount);

            var count = 0;

            var path = paths[count];

            var number = numbers[count];

            animatePath(path, number, pathCount, count);
        }
    };
})();

module.exports = KanjivgAnimate;
