/*!
 * jQuery Timeout Step Plugin - v 0.3 - 01/06/2013
 * by Max G J Panas (m@maxpanas.com), http://maxpanas.com
 *
 * Copyright (c) 2013 Max G J Panas
 * Dual licenced under MIT (http://opensource.org/licenses/MIT) and GPL (http://www.gnu.org/licenses/gpl.html) licences
 */

/**
 * Example Use:
 *
 * Simple -- fade elements in on load:
 *   include fade-in.css (http://github.com/maximilianos/jquery_step/templates/css/fade-in.css)
 *
 *   include following in your js:
 *
 *   $('.fade-in-onload').step(function (element) {
 *     element.attr('data-step', 1);
 *   });
 *
 *
 */

jQuery.fn.step = function (stepcallback, timeout) {

    var elements = this.get().reverse();

    // equivalent to --> if (!timeout) timeout = 300;
    timeout = timeout || 300;

    (function step(i) {

        var delay = typeof timeout == 'function' ? timeout(i) : parseInt(timeout);

        setTimeout(function () {

            // pass current element as "this" context
            stepcallback.apply(jQuery(elements[i]), [i, elements]);

            if (i--) step(i);

        }, delay);

    }(elements.length));

};