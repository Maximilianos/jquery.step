/*!
 * jQuery Timeout Step Plugin - v 1.0 - 13/12/2014
 * by Max G J Panas (m@maxpanas.com), http://maxpanas.com
 *
 * Copyright (c) 2014 Max G J Panas
 * Dual licenced under MIT (http://opensource.org/licenses/MIT) and GPL (http://www.gnu.org/licenses/gpl.html) licences
 */

/**
 * Example Use:
 *
 * Simple -- fade elements in on load:
 *   give elements you want to manipulate a common class, in this case: 'fade-in-onload'
 *
 *   include fade-in.stepjs.css in your stylesheet 
 *   <http://github.com/maximilianos/jquery.step/templates/fade-in/fade-in.stepjs.css>
 *
 *   include the following in your javascript:
 *
 *   $('.fade-in-onload').step(function () {
 *     $(this).addClass('stepped');
 *   }, 500);
 *
 *
 */

(function ($) {
  "use strict";
 
  $.fn.step = function (stepcallback, timeout) {

      // equivalent to --> if (!timeout) timeout = 300;
      timeout = timeout || 300;

      var length = elements.length;

      (function step(index, elements) {

          var delay = typeof timeout == 'function' ? timeout(index, elements) : parseInt(timeout);

          setTimeout(function () {

              // pass current element as "this" context
              stepcallback.apply(elements[index], [index, elements, delay]);

              if (++i < length) step(index, elements);

          }, delay);

      }(0, this));

  };
  
}(jQuery));