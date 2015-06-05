/**
 * jQuery Step Plugin - v 1.1 - 17/01/2015
 * by Max G J Panas (m@maxpanas.com), http://maxpanas.com
 *
 * Copyright (c) 2015 Max G J Panas
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
(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {
  "use strict";

  var defaultOptions = {
    timeout: 300,
    startAt: 0,
    endAt:   false,
    onEnd:   false
  };

  /**
   * Steps through an array
   * running a callback with
   * a custom delay between
   * each step
   *
   * @param elements
   * @param stepcallback
   * @param delayOrOptions
   *
   * @returns {*}
   */
  function Stepper(elements, stepcallback, delayOrOptions) {
    var self = this;

    var options;
    var timeout;
    var startAt;
    var endAt;

    if (!!delayOrOptions && delayOrOptions.constructor === Object) {
      options = $.extend(defaultOptions, delayOrOptions);
    } else {
      options = defaultOptions;
      options.timeout = delayOrOptions;
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

      self.timeout = setTimeout(function () {
        if (self.stop) {
          return;
        }

        stepcallback.apply(elements[index], [index, elements, delay]);

        if (++index < endAt) {
          step(index, elements);
        } else if ('function' === typeof options.onEnd) {
          options.onEnd(index, elements);
        }
      }, delay);
    }(startAt));

    /**
     * Add api to stop
     * stepping
     *
     * @returns {*}
     */
    elements.stopStep = function () {
      self.stop = true;
      clearTimeout(self.timeout);

      return elements;
    };

    return elements;
  }

  // extend jQuery prototype
  $.fn.step = function (stepcallback, custom) {
    return new Stepper(this, stepcallback, custom);
  };


  return Stepper;
}));