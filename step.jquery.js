/*!
 * jQuery Step Plugin - v 1.0 - 13/12/2014
 * by Max G J Panas (m@maxpanas.com), http://maxpanas.com
 *
 * Copyright (c) 2014 Max G J Panas
 * Dual licenced under MIT (http://opensource.org/licenses/MIT) and GPL (http://www.gnu.org/licenses/gpl.html) licences
 */

/**
 * Example Use:
 *
 * $('.list__item').step(function () {
 *   $(this).addClass('list__item--stepped');
 * }, 100);
 *
 * Could be used to fade elements in on load.
 * Check out the html in the "demo" folder for
 * a simple working example
 *
 */

(function ($) {
  "use strict";
 
  $.fn.step = function (stepcallback, timeout) {

      // equivalent to --> if (!timeout) timeout = 300;
      timeout = timeout || 300;

      var length = this.length;

      (function step(index, elements) {

          var delay = typeof timeout == 'function' ? timeout(index, elements) : parseInt(timeout);

          setTimeout(function () {

              // pass current element as "this" context
              stepcallback.apply(elements[index], [index, elements, delay]);

              if (++index < length) step(index, elements);

          }, delay);

      }(0, this));

  };
  
}(jQuery));