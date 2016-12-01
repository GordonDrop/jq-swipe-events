;(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'swipeEvents';
  var TOUCHSTART = 'touchstart.'  + pluginName,
      TOUCHEND = 'touchend.'  + pluginName,
      TOUCHMOVE = 'touchmove.'  + pluginName;

  var abs = Math.abs;

  $.fn.swipeEvents = swipeEvents;

  function swipeEvents() {
    return this.each(function (i, el) {
      var startX, startY, $el = $(el);


      $el.on(TOUCHSTART, start);
      $el.on(TOUCHEND, end);

      function start(e) {
        if (e.touches.length === 1) e.preventDefault();
        var touch = e.originalEvent.touches[0];

        startX = touch.pageX;
        startY = touch.pageY;

        $el.on(TOUCHMOVE, move);
      }

      function move(e) {
        var touch = e.originalEvent.touches[0];
        var deltaX = touch.pageX - startX,
            deltaY = touch.pageY - startY,
            event = {
              swipeDeltaX: -deltaX,
              swipeDeltaY: -deltaY,
              originalEvent: e.originalEvent
            };

        if (abs(deltaY) > 0 || abs(deltaY) > 0) {
          $el.trigger(
            $.Event('swipe', event));
        }

        if (deltaX > 0) {
          $el.trigger($.Event('swipeLeft', event));
        }

        if (deltaX < 0) {
          $el.trigger($.Event('swipeRight', event));
        }

        if (deltaY > 0) {
          $el.trigger($.Event('swipeDown', event));
        }

        if (deltaY < 0) {
          $el.trigger($.Event('swipeUp', event));
        }
      }

      function end(e) {
        e.preventDefault();
        $el.off(TOUCHMOVE, move);
      }
    })
  }
})(jQuery, window, document);