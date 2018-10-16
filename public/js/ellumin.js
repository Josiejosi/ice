/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(46);
module.exports = __webpack_require__(47);


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function ($) {

  $.fn.extend({
    slimScroll: function slimScroll(options) {

      var defaults = {

        // width in pixels of the visible scroll area
        width: 'auto',

        // height in pixels of the visible scroll area
        height: '250px',

        // width in pixels of the scrollbar and rail
        size: '7px',

        // scrollbar color, accepts any hex/color value
        color: '#000',

        // scrollbar position - left/right
        position: 'right',

        // distance in pixels between the side edge and the scrollbar
        distance: '1px',

        // default scroll position on load - top / bottom / $('selector')
        start: 'top',

        // sets scrollbar opacity
        opacity: .4,

        // enables always-on mode for the scrollbar
        alwaysVisible: false,

        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut: false,

        // sets visibility of the rail
        railVisible: false,

        // sets rail color
        railColor: '#333',

        // sets rail opacity
        railOpacity: .2,

        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable: true,

        // defautlt CSS class of the slimscroll rail
        railClass: 'slimScrollRail',

        // defautlt CSS class of the slimscroll bar
        barClass: 'slimScrollBar',

        // defautlt CSS class of the slimscroll wrapper
        wrapperClass: 'slimScrollDiv',

        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll: false,

        // scroll amount applied to each mouse wheel step
        wheelStep: 20,

        // scroll amount applied when user is using gestures
        touchScrollStep: 200,

        // sets border radius
        borderRadius: '7px',

        // sets border radius of the rail
        railBorderRadius: '7px'
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function () {

        var isOverPanel,
            isOverBar,
            isDragg,
            queueHide,
            touchDif,
            barHeight,
            percentScroll,
            lastScroll,
            divS = '<div></div>',
            minBarHeight = 30,
            releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        // ensure we are not binding it again
        if (me.parent().hasClass(o.wrapperClass)) {
          // start from last bar position
          var offset = me.scrollTop();

          // find bar and rail
          bar = me.siblings('.' + o.barClass);
          rail = me.siblings('.' + o.railClass);

          getBarHeight();

          // check if we should scroll existing instance
          if ($.isPlainObject(options)) {
            // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
            if ('height' in options && options.height == 'auto') {
              me.parent().css('height', 'auto');
              me.css('height', 'auto');
              var height = me.parent().parent().height();
              me.parent().css('height', height);
              me.css('height', height);
            } else if ('height' in options) {
              var h = options.height;
              me.parent().css('height', h);
              me.css('height', h);
            }

            if ('scrollTo' in options) {
              // jump to a static point
              offset = parseInt(o.scrollTo);
            } else if ('scrollBy' in options) {
              // jump by value pixels
              offset += parseInt(o.scrollBy);
            } else if ('destroy' in options) {
              // remove slimscroll elements
              bar.remove();
              rail.remove();
              me.unwrap();
              return;
            }

            // scroll content by the given offset
            scrollContent(offset, false, true);
          }

          return;
        } else if ($.isPlainObject(options)) {
          if ('destroy' in options) {
            return;
          }
        }

        // optionally set height to the parent's height
        o.height = o.height == 'auto' ? me.parent().height() : o.height;

        // wrap content
        var wrapper = $(divS).addClass(o.wrapperClass).css({
          position: 'relative',
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // create scrollbar rail
        var rail = $(divS).addClass(o.railClass).css({
          width: o.size,
          height: '100%',
          position: 'absolute',
          top: 0,
          display: o.alwaysVisible && o.railVisible ? 'block' : 'none',
          'border-radius': o.railBorderRadius,
          background: o.railColor,
          opacity: o.railOpacity,
          zIndex: 90
        });

        // create scrollbar
        var bar = $(divS).addClass(o.barClass).css({
          background: o.color,
          width: o.size,
          position: 'absolute',
          top: 0,
          opacity: o.opacity,
          display: o.alwaysVisible ? 'block' : 'none',
          'border-radius': o.borderRadius,
          BorderRadius: o.borderRadius,
          MozBorderRadius: o.borderRadius,
          WebkitBorderRadius: o.borderRadius,
          zIndex: 99
        });

        // set position
        var posCss = o.position == 'right' ? { right: o.distance } : { left: o.distance };
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);

        // make it draggable and no longer dependent on the jqueryUI
        if (o.railDraggable) {
          bar.bind("mousedown", function (e) {
            var $doc = $(document);
            isDragg = true;
            t = parseFloat(bar.css('top'));
            pageY = e.pageY;

            $doc.bind("mousemove.slimscroll", function (e) {
              currTop = t + e.pageY - pageY;
              bar.css('top', currTop);
              scrollContent(0, bar.position().top, false); // scroll content
            });

            $doc.bind("mouseup.slimscroll", function (e) {
              isDragg = false;hideBar();
              $doc.unbind('.slimscroll');
            });
            return false;
          }).bind("selectstart.slimscroll", function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
          });
        }

        // on rail over
        rail.hover(function () {
          showBar();
        }, function () {
          hideBar();
        });

        // on bar over
        bar.hover(function () {
          isOverBar = true;
        }, function () {
          isOverBar = false;
        });

        // show on parent mouseover
        me.hover(function () {
          isOverPanel = true;
          showBar();
          hideBar();
        }, function () {
          isOverPanel = false;
          hideBar();
        });

        // support for mobile
        me.bind('touchstart', function (e, b) {
          if (e.originalEvent.touches.length) {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        me.bind('touchmove', function (e) {
          // prevent scrolling the page if necessary
          if (!releaseScroll) {
            e.originalEvent.preventDefault();
          }
          if (e.originalEvent.touches.length) {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diff, true);
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        // set up initial height
        getBarHeight();

        // check start position
        if (o.start === 'bottom') {
          // scroll content to bottom
          bar.css({ top: me.outerHeight() - bar.outerHeight() });
          scrollContent(0, true);
        } else if (o.start !== 'top') {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) {
            bar.hide();
          }
        }

        // attach scroll events
        attachWheel(this);

        function _onWheel(e) {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) {
            return;
          }

          var e = e || window.event;

          var delta = 0;
          if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
          }
          if (e.detail) {
            delta = e.detail / 3;
          }

          var target = e.target || e.srcTarget || e.srcElement;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) {
            e.preventDefault();
          }
          if (!releaseScroll) {
            e.returnValue = false;
          }
        }

        function scrollContent(y, isWheel, isJump) {
          releaseScroll = false;
          var delta = y;
          var maxTop = me.outerHeight() - bar.outerHeight();

          if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = y > 0 ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
            bar.css({ top: delta + 'px' });
          }

          // calculate actual scroll amount
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump) {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({ top: offsetTop + 'px' });
          }

          // scroll content
          me.scrollTop(delta);

          // fire scrolling event
          me.trigger('slimscrolling', ~~delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        function attachWheel(target) {
          if (window.addEventListener) {
            target.addEventListener('DOMMouseScroll', _onWheel, false);
            target.addEventListener('mousewheel', _onWheel, false);
          } else {
            document.attachEvent("onmousewheel", _onWheel);
          }
        }

        function getBarHeight() {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max(me.outerHeight() / me[0].scrollHeight * me.outerHeight(), minBarHeight);
          bar.css({ height: barHeight + 'px' });

          // hide scrollbar if content is not long enough
          var display = barHeight == me.outerHeight() ? 'none' : 'block';
          bar.css({ display: display });
        }

        function showBar() {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
          if (percentScroll == ~~percentScroll) {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScroll != percentScroll) {
              var msg = ~~percentScroll == 0 ? 'top' : 'bottom';
              me.trigger('slimscroll', msg);
            }
          } else {
            releaseScroll = false;
          }
          lastScroll = percentScroll;

          // show only when required
          if (barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true, true).fadeIn('fast');
          if (o.railVisible) {
            rail.stop(true, true).fadeIn('fast');
          }
        }

        function hideBar() {
          // only hide when options allow it
          if (!o.alwaysVisible) {
            queueHide = setTimeout(function () {
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                bar.fadeOut('slow');
                rail.fadeOut('slow');
              }
            }, 1000);
          }
        }
      });

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });
})(jQuery);

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
	'use strict';

	/**
  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
  *
  * @codingstandard ftlabs-jsv2
  * @copyright The Financial Times Limited [All Rights Reserved]
  * @license MIT License (see LICENSE.txt)
  */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/

	/**
  * Instantiate fast-clicking listeners on the specified layer.
  *
  * @constructor
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */

	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
   * Whether a click is currently being tracked.
   *
   * @type boolean
   */
		this.trackingClick = false;

		/**
   * Timestamp for when click tracking started.
   *
   * @type number
   */
		this.trackingClickStart = 0;

		/**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
		this.targetElement = null;

		/**
   * X-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartX = 0;

		/**
   * Y-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartY = 0;

		/**
   * ID of the last touch, retrieved from Touch.identifier.
   *
   * @type number
   */
		this.lastTouchIdentifier = 0;

		/**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
		this.touchBoundary = options.touchBoundary || 10;

		/**
   * The FastClick layer.
   *
   * @type Element
   */
		this.layer = layer;

		/**
   * The minimum time between tap(touchstart and touchend) events
   *
   * @type number
   */
		this.tapDelay = options.tapDelay || 200;

		/**
   * The maximum time for a tap
   *
   * @type number
   */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function () {
				return method.apply(context, arguments);
			};
		}

		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function (type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function (type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function (event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
 *
 * @type boolean
 */
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
  * Android requires exceptions.
  *
  * @type boolean
  */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	/**
  * iOS requires exceptions.
  *
  * @type boolean
  */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	/**
  * iOS 4 requires an exception for select elements.
  *
  * @type boolean
  */
	var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	/**
  * iOS 6.0-7.* requires the target element to be manually derived
  *
  * @type boolean
  */
	var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

	/**
  * BlackBerry requires exceptions.
  *
  * @type boolean
  */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
  * Determine whether a given element requires a native click.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element needs a native click
  */
	FastClick.prototype.needsClick = function (target) {
		switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if (deviceIsIOS && target.type === 'file' || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
		}

		return (/\bneedsclick\b/.test(target.className)
		);
	};

	/**
  * Determine whether a given element requires a call to focus to simulate click into element.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
  */
	FastClick.prototype.needsFocus = function (target) {
		switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
					case 'button':
					case 'checkbox':
					case 'file':
					case 'image':
					case 'radio':
					case 'submit':
						return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/.test(target.className)
				);
		}
	};

	/**
  * Send a click event to the specified element.
  *
  * @param {EventTarget|Element} targetElement
  * @param {Event} event
  */
	FastClick.prototype.sendClick = function (targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function (targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	/**
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.focus = function (targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

	/**
  * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
  *
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.updateScrollParent = function (targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};

	/**
  * @param {EventTarget} targetElement
  * @returns {Element|EventTarget}
  */
	FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

	/**
  * On touch start, record the position and scroll offset.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchStart = function (event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};

	/**
  * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.touchHasMoved = function (event) {
		var touch = event.changedTouches[0],
		    boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};

	/**
  * Update the last position.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchMove = function (event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};

	/**
  * Attempt to find the labelled control for the given label element.
  *
  * @param {EventTarget|HTMLLabelElement} labelElement
  * @returns {Element|null}
  */
	FastClick.prototype.findControl = function (labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};

	/**
  * On touch end, determine whether to send a click event at once.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchEnd = function (event) {
		var forElement,
		    trackingClickStart,
		    targetTagName,
		    scrollParent,
		    touch,
		    targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};

	/**
  * On touch cancel, stop tracking the click.
  *
  * @returns {void}
  */
	FastClick.prototype.onTouchCancel = function () {
		this.trackingClick = false;
		this.targetElement = null;
	};

	/**
  * Determine mouse events which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onMouse = function (event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};

	/**
  * On actual clicks, determine whether this is a touch-generated click, a click action occurring
  * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
  * an actual click which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onClick = function (event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};

	/**
  * Remove all FastClick's event listeners.
  *
  * @returns {void}
  */
	FastClick.prototype.destroy = function () {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};

	/**
  * Check whether FastClick is needed.
  *
  * @param {Element} layer The layer to listen on
  */
	FastClick.notNeeded = function (layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

				// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};

	/**
  * Factory method for creating a FastClick object
  *
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */
	FastClick.attach = function (layer, options) {
		return new FastClick(layer, options);
	};

	if ("function" === 'function' && _typeof(__webpack_require__(11)) === 'object' && __webpack_require__(11)) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return FastClick;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
})();

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//[Master Javascript]

//Project:	Superieur Admin - Responsive Admin Template
//Primary use:	Superieur Admin - Responsive Admin Template

//should be included in all pages. It controls some layout


// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
  throw new Error('template requires jQuery');
}

// Layout()

//  Implements layout.
//  Fixes the layout height in case min-height fails.

//  @usage activated automatically upon window load.
//  Configure any options by passing data-option="value"
//  to the body tag.


+function ($) {
  'use strict';

  var DataKey = 'fabadmin.layout';

  var Default = {
    slimscroll: true,
    resetHeight: true
  };

  var Selector = {
    wrapper: '.wrapper',
    contentWrapper: '.content-wrapper',
    layoutBoxed: '.layout-boxed',
    mainFooter: '.main-footer',
    mainHeader: '.main-header',
    sidebar: '.sidebar',
    controlSidebar: '.control-sidebar',
    fixed: '.fixed',
    sidebarMenu: '.sidebar-menu',
    logo: '.main-header .logo'
  };

  var ClassName = {
    fixed: 'fixed',
    holdTransition: 'hold-transition'
  };

  var Layout = function Layout(options) {
    this.options = options;
    this.bindedResize = false;
    this.activate();
  };

  Layout.prototype.activate = function () {
    this.fix();
    this.fixSidebar();

    $('body').removeClass(ClassName.holdTransition);

    if (this.options.resetHeight) {
      $('body, html, ' + Selector.wrapper).css({
        'height': 'auto',
        'min-height': '100%'
      });
    }

    if (!this.bindedResize) {
      $(window).resize(function () {
        this.fix();
        this.fixSidebar();

        $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          this.fix();
          this.fixSidebar();
        }.bind(this));
      }.bind(this));

      this.bindedResize = true;
    }

    $(Selector.sidebarMenu).on('expanded.tree', function () {
      this.fix();
      this.fixSidebar();
    }.bind(this));

    $(Selector.sidebarMenu).on('collapsed.tree', function () {
      this.fix();
      this.fixSidebar();
    }.bind(this));
  };

  Layout.prototype.fix = function () {
    // Remove overflow from .wrapper if layout-boxed exists
    $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');

    // Get window height and the wrapper height
    var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
    var neg = $(Selector.mainHeader).outerHeight() + footerHeight;
    var windowHeight = $(window).height();
    var sidebarHeight = $(Selector.sidebar).height() || 0;

    // Set the min-height of the content and sidebar based on
    // the height of the document.
    if ($('body').hasClass(ClassName.fixed)) {
      $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
    } else {
      var postSetHeight;

      if (windowHeight >= sidebarHeight) {
        $(Selector.contentWrapper).css('min-height', windowHeight - neg);
        postSetHeight = windowHeight - neg;
      } else {
        $(Selector.contentWrapper).css('min-height', sidebarHeight);
        postSetHeight = sidebarHeight;
      }

      // Fix for the control sidebar height
      var $controlSidebar = $(Selector.controlSidebar);
      if (typeof $controlSidebar !== 'undefined') {
        if ($controlSidebar.height() > postSetHeight) $(Selector.contentWrapper).css('min-height', $controlSidebar.height());
      }
    }
  };

  Layout.prototype.fixSidebar = function () {
    // Make sure the body tag has the .fixed class
    if (!$('body').hasClass(ClassName.fixed)) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        $(Selector.sidebar).slimScroll({ destroy: true }).height('auto');
      }
      return;
    }

    // Enable slimscroll for fixed layout
    if (this.options.slimscroll) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        // Destroy if it exists
        $(Selector.sidebar).slimScroll({ destroy: true }).height('auto');

        // Add slimscroll
        $(Selector.sidebar).slimScroll({
          height: $(window).height() - $(Selector.mainHeader).height() + 'px',
          color: 'rgba(0,0,0,0.2)',
          size: '3px'
        });
      }
    }
  };

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);
        $this.data(DataKey, data = new Layout(options));
      }

      if (typeof option == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option);
        }
        data[option]();
      }
    });
  }

  var old = $.fn.layout;

  $.fn.layout = Plugin;
  $.fn.layout.Constuctor = Layout;

  // No conflict mode
  $.fn.layout.noConflict = function () {
    $.fn.layout = old;
    return this;
  };

  // Layout DATA-API
  $(window).on('load', function () {
    Plugin.call($('body'));
  });
}(jQuery) // End of use strict

/* PushMenu()
 * Adds the push menu functionality to the sidebar.
 *
 * @usage: $('.btn').pushMenu(options)
 *          or add [data-toggle="push-menu"] to any button
 *          Pass any option as data-option="value"
 */
+ function ($) {
  'use strict';

  var DataKey = 'fabadmin.pushmenu';

  var Default = {
    collapseScreenSize: 767,
    expandOnHover: false,
    expandTransitionDelay: 200
  };

  var Selector = {
    collapsed: '.sidebar-collapse',
    open: '.sidebar-open',
    mainSidebar: '.main-sidebar',
    contentWrapper: '.content-wrapper',
    searchInput: '.sidebar-form .form-control',
    button: '[data-toggle="push-menu"]',
    mini: '.sidebar-mini',
    expanded: '.sidebar-expanded-on-hover',
    layoutFixed: '.fixed'
  };

  var ClassName = {
    collapsed: 'sidebar-collapse',
    open: 'sidebar-open',
    mini: 'sidebar-mini',
    expanded: 'sidebar-expanded-on-hover',
    expandFeature: 'sidebar-mini-expand-feature',
    layoutFixed: 'fixed'
  };

  var Event = {
    expanded: 'expanded.pushMenu',
    collapsed: 'collapsed.pushMenu'

    // PushMenu Class Definition
  };var PushMenu = function PushMenu(options) {
    this.options = options;
    this.init();
  };

  PushMenu.prototype.init = function () {
    if (this.options.expandOnHover || $('body').is(Selector.mini + Selector.layoutFixed)) {
      this.expandOnHover();
      $('body').addClass(ClassName.expandFeature);
    }

    $(Selector.contentWrapper).on(function () {
      // Enable hide menu when clicking on the content-wrapper on small screens
      if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
        this.close();
      }
    }.bind(this));

    // __Fix for android devices
    $(Selector.searchInput).on(function (e) {
      e.stopPropagation();
    });
  };

  PushMenu.prototype.toggle = function () {
    var windowWidth = $(window).width();
    var isOpen = !$('body').hasClass(ClassName.collapsed);

    if (windowWidth <= this.options.collapseScreenSize) {
      isOpen = $('body').hasClass(ClassName.open);
    }

    if (!isOpen) {
      this.open();
    } else {
      this.close();
    }
  };

  PushMenu.prototype.open = function () {
    var windowWidth = $(window).width();

    if (windowWidth > this.options.collapseScreenSize) {
      $('body').removeClass(ClassName.collapsed).trigger($.Event(Event.expanded));
    } else {
      $('body').addClass(ClassName.open).trigger($.Event(Event.expanded));
    }
  };

  PushMenu.prototype.close = function () {
    var windowWidth = $(window).width();
    if (windowWidth > this.options.collapseScreenSize) {
      $('body').addClass(ClassName.collapsed).trigger($.Event(Event.collapsed));
    } else {
      $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed).trigger($.Event(Event.collapsed));
    }
  };

  PushMenu.prototype.expandOnHover = function () {
    $(Selector.mainSidebar).hover(function () {
      if ($('body').is(Selector.mini + Selector.collapsed) && $(window).width() > this.options.collapseScreenSize) {
        this.expand();
      }
    }.bind(this), function () {
      if ($('body').is(Selector.expanded)) {
        this.collapse();
      }
    }.bind(this));
  };

  PushMenu.prototype.expand = function () {
    setTimeout(function () {
      $('body').removeClass(ClassName.collapsed).addClass(ClassName.expanded);
    }, this.options.expandTransitionDelay);
  };

  PushMenu.prototype.collapse = function () {
    setTimeout(function () {
      $('body').removeClass(ClassName.expanded).addClass(ClassName.collapsed);
    }, this.options.expandTransitionDelay);
  };

  // PushMenu Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);
        $this.data(DataKey, data = new PushMenu(options));
      }

      if (option == 'toggle') data.toggle();
    });
  }

  var old = $.fn.pushMenu;

  $.fn.pushMenu = Plugin;
  $.fn.pushMenu.Constructor = PushMenu;

  // No Conflict Mode
  $.fn.pushMenu.noConflict = function () {
    $.fn.pushMenu = old;
    return this;
  };

  // Data API
  $(document).on('click', Selector.button, function (e) {
    e.preventDefault();
    Plugin.call($(this), 'toggle');
  });
  $(window).on('load', function () {
    Plugin.call($(Selector.button));
  });
}(jQuery) // End of use strict


/* Tree()
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */
+ function ($) {
  'use strict';

  var DataKey = 'fabadmin.tree';

  var Default = {
    animationSpeed: 500,
    accordion: true,
    followLink: false,
    trigger: '.treeview a'
  };

  var Selector = {
    tree: '.tree',
    treeview: '.treeview',
    treeviewMenu: '.treeview-menu',
    open: '.menu-open, .active',
    li: 'li',
    data: '[data-widget="tree"]',
    active: '.active'
  };

  var ClassName = {
    open: 'menu-open',
    tree: 'tree'
  };

  var Event = {
    collapsed: 'collapsed.tree',
    expanded: 'expanded.tree'

    // Tree Class Definition
  };var Tree = function Tree(element, options) {
    this.element = element;
    this.options = options;

    $(this.element).addClass(ClassName.tree);

    $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

    this._setUpListeners();
  };

  Tree.prototype.toggle = function (link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi = link.parent();
    var isOpen = parentLi.hasClass(ClassName.open);

    if (!parentLi.is(Selector.treeview)) {
      return;
    }

    if (!this.options.followLink || link.attr('href') == '#') {
      event.preventDefault();
    }

    if (isOpen) {
      this.collapse(treeviewMenu, parentLi);
    } else {
      this.expand(treeviewMenu, parentLi);
    }
  };

  Tree.prototype.expand = function (tree, parent) {
    var expandedEvent = $.Event(Event.expanded);

    if (this.options.accordion) {
      var openMenuLi = parent.siblings(Selector.open);
      var openTree = openMenuLi.children(Selector.treeviewMenu);
      this.collapse(openTree, openMenuLi);
    }

    parent.addClass(ClassName.open);
    tree.slideDown(this.options.animationSpeed, function () {
      $(this.element).trigger(expandedEvent);
    }.bind(this));
  };

  Tree.prototype.collapse = function (tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed);

    tree.find(Selector.open).removeClass(ClassName.open);
    parentLi.removeClass(ClassName.open);
    tree.slideUp(this.options.animationSpeed, function () {
      tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
      $(this.element).trigger(collapsedEvent);
    }.bind(this));
  };

  // Private

  Tree.prototype._setUpListeners = function () {
    var that = this;

    $(this.element).on('click', this.options.trigger, function (event) {
      that.toggle($(this), event);
    });
  };

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);
        $this.data(DataKey, new Tree($this, options));
      }
    });
  }

  var old = $.fn.tree;

  $.fn.tree = Plugin;
  $.fn.tree.Constructor = Tree;

  // No Conflict Mode
  $.fn.tree.noConflict = function () {
    $.fn.tree = old;
    return this;
  };

  // Tree Data API
  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this));
    });
  });
}(jQuery) // End of use strict


/* ControlSidebar()
 * Toggles the state of the control sidebar
 *
 * @Usage: $('#control-sidebar-trigger').controlSidebar(options)
 *         or add [data-toggle="control-sidebar"] to the trigger
 *         Pass any option as data-option="value"
 */
+ function ($) {
  'use strict';

  var DataKey = 'fabadmin.controlsidebar';

  var Default = {
    slide: true
  };

  var Selector = {
    sidebar: '.control-sidebar',
    data: '[data-toggle="control-sidebar"]',
    open: '.control-sidebar-open',
    bg: '.control-sidebar-bg',
    wrapper: '.wrapper',
    content: '.content-wrapper',
    boxed: '.layout-boxed'
  };

  var ClassName = {
    open: 'control-sidebar-open',
    fixed: 'fixed'
  };

  var Event = {
    collapsed: 'collapsed.controlsidebar',
    expanded: 'expanded.controlsidebar'

    // ControlSidebar Class Definition
  };var ControlSidebar = function ControlSidebar(element, options) {
    this.element = element;
    this.options = options;
    this.hasBindedResize = false;

    this.init();
  };

  ControlSidebar.prototype.init = function () {
    // Add click listener if the element hasn't been
    // initialized using the data API
    if (!$(this.element).is(Selector.data)) {
      $(this).on('click', this.toggle);
    }

    this.fix();
    $(window).resize(function () {
      this.fix();
    }.bind(this));
  };

  ControlSidebar.prototype.toggle = function (event) {
    if (event) event.preventDefault();

    this.fix();

    if (!$(Selector.sidebar).is(Selector.open) && !$('body').is(Selector.open)) {
      this.expand();
    } else {
      this.collapse();
    }
  };

  ControlSidebar.prototype.expand = function () {
    if (!this.options.slide) {
      $('body').addClass(ClassName.open);
    } else {
      $(Selector.sidebar).addClass(ClassName.open);
    }

    $(this.element).trigger($.Event(Event.expanded));
  };

  ControlSidebar.prototype.collapse = function () {
    $('body, ' + Selector.sidebar).removeClass(ClassName.open);
    $(this.element).trigger($.Event(Event.collapsed));
  };

  ControlSidebar.prototype.fix = function () {
    if ($('body').is(Selector.boxed)) {
      this._fixForBoxed($(Selector.bg));
    }
  };

  // Private

  ControlSidebar.prototype._fixForBoxed = function (bg) {
    bg.css({
      position: 'absolute',
      height: $(Selector.wrapper).height()
    });
  };

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);
        $this.data(DataKey, data = new ControlSidebar($this, options));
      }

      if (typeof option == 'string') data.toggle();
    });
  }

  var old = $.fn.controlSidebar;

  $.fn.controlSidebar = Plugin;
  $.fn.controlSidebar.Constructor = ControlSidebar;

  // No Conflict Mode
  $.fn.controlSidebar.noConflict = function () {
    $.fn.controlSidebar = old;
    return this;
  };

  // ControlSidebar Data API
  $(document).on('click', Selector.data, function (event) {
    if (event) event.preventDefault();
    Plugin.call($(this), 'toggle');
  });
}(jQuery) // End of use strict


/* BoxWidget()
 * Adds box widget functions to boxes.
 *
 * @Usage: $('.my-box').boxWidget(options)
 *         This plugin auto activates on any element using the `.box` class
 *         Pass any option as data-option="value"
 */
+ function ($) {
  'use strict';

  var DataKey = 'fabadmin.boxwidget';

  var Default = {
    animationSpeed: 500,
    collapseTrigger: '[data-widget="collapse"]',
    removeTrigger: '[data-widget="remove"]',
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    removeIcon: 'fa-times'
  };

  var Selector = {
    data: '.box',
    collapsed: '.collapsed-box',
    body: '.box-body',
    footer: '.box-footer',
    tools: '.box-tools'
  };

  var ClassName = {
    collapsed: 'collapsed-box'
  };

  var Event = {
    collapsed: 'collapsed.boxwidget',
    expanded: 'expanded.boxwidget',
    removed: 'removed.boxwidget'

    // BoxWidget Class Definition
  };var BoxWidget = function BoxWidget(element, options) {
    this.element = element;
    this.options = options;

    this._setUpListeners();
  };

  BoxWidget.prototype.toggle = function () {
    var isOpen = !$(this.element).is(Selector.collapsed);

    if (isOpen) {
      this.collapse();
    } else {
      this.expand();
    }
  };

  BoxWidget.prototype.expand = function () {
    var expandedEvent = $.Event(Event.expanded);
    var collapseIcon = this.options.collapseIcon;
    var expandIcon = this.options.expandIcon;

    $(this.element).removeClass(ClassName.collapsed);

    $(this.element).find(Selector.tools).find('.' + expandIcon).removeClass(expandIcon).addClass(collapseIcon);

    $(this.element).find(Selector.body + ', ' + Selector.footer).slideDown(this.options.animationSpeed, function () {
      $(this.element).trigger(expandedEvent);
    }.bind(this));
  };

  BoxWidget.prototype.collapse = function () {
    var collapsedEvent = $.Event(Event.collapsed);
    var collapseIcon = this.options.collapseIcon;
    var expandIcon = this.options.expandIcon;

    $(this.element).find(Selector.tools).find('.' + collapseIcon).removeClass(collapseIcon).addClass(expandIcon);

    $(this.element).find(Selector.body + ', ' + Selector.footer).slideUp(this.options.animationSpeed, function () {
      $(this.element).addClass(ClassName.collapsed);
      $(this.element).trigger(collapsedEvent);
    }.bind(this));
  };

  BoxWidget.prototype.remove = function () {
    var removedEvent = $.Event(Event.removed);

    $(this.element).slideUp(this.options.animationSpeed, function () {
      $(this.element).trigger(removedEvent);
      $(this.element).remove();
    }.bind(this));
  };

  // Private

  BoxWidget.prototype._setUpListeners = function () {
    var that = this;

    $(this.element).on('click', this.options.collapseTrigger, function (event) {
      if (event) event.preventDefault();
      that.toggle();
    });

    $(this.element).on('click', this.options.removeTrigger, function (event) {
      if (event) event.preventDefault();
      that.remove();
    });
  };

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);
        $this.data(DataKey, data = new BoxWidget($this, options));
      }

      if (typeof option == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option);
        }
        data[option]();
      }
    });
  }

  var old = $.fn.boxWidget;

  $.fn.boxWidget = Plugin;
  $.fn.boxWidget.Constructor = BoxWidget;

  // No Conflict Mode
  $.fn.boxWidget.noConflict = function () {
    $.fn.boxWidget = old;
    return this;
  };

  // BoxWidget Data API
  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this));
    });
  });
}(jQuery) // End of use strict


/* TodoList()
 * Converts a list into a todoList.
 *
 * @Usage: $('.my-list').todoList(options)
 *         or add [data-widget="todo-list"] to the ul element
 *         Pass any option as data-option="value"
 */
+ function ($) {
  'use strict';

  var DataKey = 'fabadmin.todolist';

  var Default = {
    iCheck: false,
    onCheck: function onCheck() {},
    onUnCheck: function onUnCheck() {}
  };

  var Selector = {
    data: '[data-widget="todo-list"]'
  };

  var ClassName = {
    done: 'done'

    // TodoList Class Definition
  };var TodoList = function TodoList(element, options) {
    this.element = element;
    this.options = options;

    this._setUpListeners();
  };

  TodoList.prototype.toggle = function (item) {
    item.parents(Selector.li).first().toggleClass(ClassName.done);
    if (!item.prop('checked')) {
      this.unCheck(item);
      return;
    }

    this.check(item);
  };

  TodoList.prototype.check = function (item) {
    this.options.onCheck.call(item);
  };

  TodoList.prototype.unCheck = function (item) {
    this.options.onUnCheck.call(item);
  };

  // Private

  TodoList.prototype._setUpListeners = function () {
    var that = this;
    $(this.element).on('change ifChanged', 'input:checkbox', function () {
      that.toggle($(this));
    });
  };

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);
        $this.data(DataKey, data = new TodoList($this, options));
      }

      if (typeof data == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option);
        }
        data[option]();
      }
    });
  }

  var old = $.fn.todoList;

  $.fn.todoList = Plugin;
  $.fn.todoList.Constructor = TodoList;

  // No Conflict Mode
  $.fn.todoList.noConflict = function () {
    $.fn.todoList = old;
    return this;
  };

  // TodoList Data API
  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this));
    });
  });
}(jQuery) // End of use strict


/* DirectChat()
 * Toggles the state of the control sidebar
 *
 * @Usage: $('#my-chat-box').directChat()
 *         or add [data-widget="direct-chat"] to the trigger
 */
+ function ($) {
  'use strict';

  var DataKey = 'fabadmin.directchat';

  var Selector = {
    data: '[data-widget="chat-pane-toggle"]',
    box: '.direct-chat'
  };

  var ClassName = {
    open: 'direct-chat-contacts-open'

    // DirectChat Class Definition
  };var DirectChat = function DirectChat(element) {
    this.element = element;
  };

  DirectChat.prototype.toggle = function ($trigger) {
    $trigger.parents(Selector.box).first().toggleClass(ClassName.open);
  };

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        $this.data(DataKey, data = new DirectChat($this));
      }

      if (typeof option == 'string') data.toggle($this);
    });
  }

  var old = $.fn.directChat;

  $.fn.directChat = Plugin;
  $.fn.directChat.Constructor = DirectChat;

  // No Conflict Mode
  $.fn.directChat.noConflict = function () {
    $.fn.directChat = old;
    return this;
  };

  // DirectChat Data API
  $(document).on('click', Selector.data, function (event) {
    if (event) event.preventDefault();
    Plugin.call($(this), 'toggle');
  });

  // Slim scrolling

  $('.inner-content-div').slimScroll({
    height: '200'
  });

  $('.sm-scrol').slimScroll({
    height: '250'
  });

  $('.direct-chat-messages').slimScroll({
    height: '310'
  });

  $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
    $(".app-search").toggle(200);
  });

  // Close
  //
  $(document).on('click', '.box-btn-close', function () {
    $(this).parents('.box').fadeOut(600, function () {
      if ($(this).parent().children().length == 1) {
        $(this).parent().remove();
      } else {
        $(this).remove();
      }
    });
  });

  // Slide up/down
  //
  $(document).on('click', '.box-btn-slide', function () {
    $(this).toggleClass('rotate-180').parents('.box').find('.box-content, .box-body').slideToggle();
  });

  // Maximize
  //
  $(document).on('click', '.box-btn-maximize', function () {
    $(this).parents('.box').toggleClass('box-maximize').removeClass('box-fullscreen');
  });

  // Fullscreen
  //
  $(document).on('click', '.box-btn-fullscreen', function () {
    $(this).parents('.box').toggleClass('box-fullscreen').removeClass('box-maximize');
  });

  // Disable demonstrative links!
  //
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

  // This is for the innerleft sidebar
  $(".open-left-block").on('click', function () {
    $('.left-block').toggleClass('open-panel');
    $('.open-left-block').toggleClass('mdi-menu');
  });

  // Upload
  //
  $(document).on('click', '.file-browser', function () {
    var $browser = $(this);
    if ($browser.hasClass('form-control')) {
      setTimeout(function () {
        $browser.closest('.file-group').find('[type="file"]').trigger('click');
      }, 300);
    } else {
      var file = $browser.closest('.file-group').find('[type="file"]');
      file.on('click', function (e) {
        e.stopPropagation();
      });
      file.trigger('click');
    }
  });

  // Event to change file name after file selection
  $(document).on('change', '.file-group [type="file"]', function () {
    var input = $(this)[0];
    var len = input.files.length;
    var filename = '';

    for (var i = 0; i < len; ++i) {
      filename += input.files.item(i).name + ', ';
    }
    filename = filename.substr(0, filename.length - 2);
    $(this).closest('.file-group').find('.file-value').val(filename).text(filename).focus();
  });

  // Update file name for bootstrap custom file upload
  $(document).on('change', '.custom-file-input', function () {
    var filename = $(this).val().split('\\').pop();
    $(this).next('.custom-file-control').attr('data-input-value', filename);
  });
  $('.custom-file-control:not([data-input-value])').attr('data-input-value', 'Choose file...');
}(jQuery); // End of use strict

/***/ })

/******/ });