/*!
 * jQuery Timeout Step Plugin - v 0.6.2 - 01/06/2013
 * by Max G J Panas (m@maxpanas.com), http://maxpanas.com
 *
 * Copyright (c) 2013 Max G J Panas
 * Dual licenced under MIT (http://opensource.org/licenses/MIT) and GPL (http://www.gnu.org/licenses/gpl.html) licences
 */

/**
 * Example Use:
 *
 * Simple -- fade elements in on load:
 *   give elements you want to manipulate a common class, in this case: 'fade-in-onload'
 *
 *   include fade-in.stepjs.css in your stylesheet (http://github.com/maximilianos/jquery_step/templates/fade-in/fade-in.stepjs.css)
 *
 *   include the following in your javascript:
 *
 *   $('.fade-in-onload').step(function () {
 *     this.attr('data-stepped', 1);
 *   });
 *
 *
 */

jQuery.fn.step = function (stepcallback, timeout) {

    // equivalent to --> if (!timeout) timeout = 300;
    timeout = timeout || 300;

    (function step(elements, i) {

        var delay = typeof timeout == 'function' ? timeout(i) : parseInt(timeout);

        setTimeout(function () {

            // pass current element as "this" context
            stepcallback.apply(jQuery(elements[i]), [i, elements]);

            if (i++ < elements.length - 1) step(elements, i);

        }, delay);

    }(this, 0));

};