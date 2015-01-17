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

  var defaultOptions = {
    timeout: 300,
    startAt: 0,
    endAt:   false,
    onEnd:   false
  };

  $.fn.step = function (stepcallback, custom) {
    var elements, options, timeout, startAt, endAt;

    elements = this;

    if (!!custom && custom.constructor === Object) {
      options = $.extend(defaultOptions, custom);
    } else {
      options = defaultOptions;
      options.timeout = custom;
    }

    timeout = (!options.timeout && 0 !== options.timeout) ? 300 : options.timeout;
    startAt = !options.startAt ? 0 : options.startAt;
    endAt   = !options.endAt ? elements.length : options.endAt;

    if (startAt >= endAt) {
      return;
    }

    timeout = ('function' === typeof timeout) ? timeout : parseInt(timeout, 10);

    (function step(index) {

      var delay = ('function' === typeof timeout) ? timeout(index, elements) : timeout;

      setTimeout(function () {

        stepcallback.apply(elements[index], [index, elements, delay]);

        if (++index < endAt) {
          step(index, elements);
        } else if ('function' === typeof options.onEnd) {
          options.onEnd(index, elements);
        }

      }, delay);

    }(startAt));

  };

}(jQuery));