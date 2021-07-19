/**
  * Hopper 0.3.4
  * (c) 2021
    * @license MIT
    */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('mitt')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'mitt'], factory) :
  (global = global || self, factory(global.Hooper = {}, global.Vue, global.mitt));
}(this, (function (exports, vue, mitt) { 'use strict';

  mitt = mitt && Object.prototype.hasOwnProperty.call(mitt, 'default') ? mitt['default'] : mitt;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function getInRange(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }
  function now() {
    return Date.now();
  }
  function Timer(callback, defaultTime) {
    this.create = function () {
      return window.setTimeout(callback, defaultTime);
    };

    this.stop = function () {
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    };

    this.start = function () {
      if (!this.timer) {
        this.timer = this.create();
      }
    };

    this.set = function (newTime) {
      var timeout = newTime || defaultTime;
      this.timer = window.setTimeout(callback, timeout);
    };

    this.timer = this.create();
  }
  function camelCaseToString(camelCase) {
    camelCase = camelCase.replace(/([A-Z]+)/g, ' $1');
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }
  function normalizeSlideIndex(index, slidesCount) {
    var realIndex;

    if (index < 0) {
      realIndex = (index + slidesCount) % slidesCount;
    } else {
      realIndex = index % slidesCount;
    } // Test for NaN


    if (realIndex !== realIndex) {
      return 0;
    }

    return realIndex;
  }
  function cloneNode(h, vNode) {
    // use the context that the original vnode was created in.
    var children = vNode.children || vNode.text;
    return h(vNode.type, vNode.data, children);
  }

  var EMITTER = mitt();
  var Carousel = {
    name: 'Hooper',
    props: {
      // count of items to showed per view
      itemsToShow: {
        default: 1,
        type: Number
      },
      // count of items to slide when use navigation buttons
      itemsToSlide: {
        default: 1,
        type: Number
      },
      // index number of initial slide
      initialSlide: {
        default: 0,
        type: Number
      },
      // control infinite scrolling mode
      infiniteScroll: {
        default: false,
        type: Boolean
      },
      // control center mode
      centerMode: {
        default: false,
        type: Boolean
      },
      // vertical sliding mode
      vertical: {
        default: false,
        type: Boolean
      },
      // enable rtl mode
      rtl: {
        default: null,
        type: Boolean
      },
      // enable auto sliding to carousel
      autoPlay: {
        default: false,
        type: Boolean
      },
      // speed of auto play to trigger slide
      playSpeed: {
        default: 2000,
        type: Number
      },
      // toggle mouse dragging
      mouseDrag: {
        default: true,
        type: Boolean
      },
      // toggle touch dragging
      touchDrag: {
        default: true,
        type: Boolean
      },
      // toggle mouse wheel sliding
      wheelControl: {
        default: true,
        type: Boolean
      },
      // toggle keyboard control
      keysControl: {
        default: true,
        type: Boolean
      },
      // enable any move to commit a slide
      shortDrag: {
        default: true,
        type: Boolean
      },
      // sliding transition time in ms
      transition: {
        default: 300,
        type: Number
      },
      // pause autoPlay on mousehover
      hoverPause: {
        default: true,
        type: Boolean
      },
      // remove empty space around slides
      trimWhiteSpace: {
        default: false,
        type: Boolean
      },
      // an object to pass all settings
      settings: {
        default: function _default() {
          return {};
        },
        type: Object
      },
      group: {
        type: String,
        default: null
      }
    },
    setup: function setup(props, context) {
      var isDragging = vue.ref(false);
      var isSliding = vue.ref(false);
      var isTouch = vue.ref(false);
      var isHover = vue.ref(false);
      var isFocus = vue.ref(false);
      var initialized = vue.ref(false);
      var slideWidth = vue.ref(0);
      var slideHeight = vue.ref(0);
      var slidesCount = vue.ref(0);
      var trimStart = vue.ref(0);
      var trimEnd = vue.ref(1);
      var currentSlide = vue.ref(null);
      var timer = vue.ref(null);
      var defaults = vue.ref({});
      var breakpoints = vue.ref({});
      var delta = vue.ref({
        x: 0,
        y: 0
      });
      var config = vue.ref({});
      var containerHeight = vue.ref(null);
      var containerWidth = vue.ref(null);
      var lastScrollTime = vue.ref(null);
      var startPosition = vue.ref(null);
      var endPosition = vue.ref(null);
      var hooperCarousel = vue.ref(null);
      var list = vue.ref(null);
      var track = vue.ref(null);
      var slideBounds = vue.computed(function () {
        // Because the "isActive" depends on the slides shown, not the number of slidable ones.
        // but upper and lower bounds for Next,Prev depend on whatever is smaller.
        var siblings = config.value.itemsToShow;
        var lower = config.value.centerMode ? Math.ceil(currentSlide.value - siblings / 2) : currentSlide.value;
        var upper = config.value.centerMode ? Math.floor(currentSlide.value + siblings / 2) : Math.floor(currentSlide.value + siblings - 1);
        return {
          lower: lower,
          upper: upper
        };
      });
      var trackTransform = vue.computed(function () {
        var _config$value = config.value,
            infiniteScroll = _config$value.infiniteScroll,
            vertical = _config$value.vertical,
            rtl = _config$value.rtl,
            centerMode = _config$value.centerMode;
        var direction = rtl ? -1 : 1;
        var slideLength = vertical ? slideHeight.value : slideWidth.value;
        var containerLength = vertical ? containerHeight.value : containerWidth.value;
        var dragDelta = vertical ? delta.value.y : delta.value.x;
        var clonesSpace = infiniteScroll ? slideLength * slidesCount.value : 0;
        var centeringSpace = centerMode ? (containerLength - slideLength) / 2 : 0; // calculate track translate

        var translate = dragDelta + direction * (centeringSpace - clonesSpace - currentSlide.value * slideLength);

        if (vertical) {
          return "transform: translate(0, ".concat(translate, "px);");
        }

        return "transform: translate(".concat(translate, "px, 0);");
      });
      var trackTransition = vue.computed(function () {
        if (initialized.value && isSliding.value) {
          return "transition: ".concat(config.value.transition, "ms");
        }

        return '';
      }); // controlling methods

      var slideTo = function slideTo(slideIndex) {
        var isSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (isSliding.value || slideIndex === currentSlide.value) {
          return;
        }

        var _config$value2 = config.value,
            infiniteScroll = _config$value2.infiniteScroll,
            transition = _config$value2.transition;
        var previousSlide = currentSlide.value;
        var index = infiniteScroll ? slideIndex : getInRange(slideIndex, trimStart.value, slidesCount.value - trimEnd.value);
        context.emit('beforeSlide', {
          currentSlide: currentSlide.value,
          slideTo: index
        }); // Notify others if in a group and is the slide event initiator.

        if (props.group && isSource) {
          EMITTER.emit("slideGroup:".concat(props.group), slideIndex);
        }

        currentSlide.value = index;
        isSliding.value = true;
        window.setTimeout(function () {
          isSliding.value = false;
          currentSlide.value = normalizeSlideIndex(index, slidesCount.value);
        }, transition);
        context.emit('slide', {
          currentSlide: currentSlide.value,
          slideFrom: previousSlide
        });
      };

      var slideNext = function slideNext() {
        slideTo(currentSlide.value + config.value.itemsToSlide);
      };

      var slidePrev = function slidePrev() {
        slideTo(currentSlide.value - config.value.itemsToSlide);
      };

      var initEvents = function initEvents() {
        // get the element direction if not explicitly set
        if (defaults.value.rtl === null) {
          defaults.value.rtl = getComputedStyle(hooperCarousel.value).direction === 'rtl';
        }

        if (props.autoPlay) {
          initAutoPlay();
        }

        if (config.value.mouseDrag) {
          list.value.addEventListener('mousedown', onDragStart);
        }

        if (config.value.touchDrag) {
          list.value.addEventListener('touchstart', onDragStart, {
            passive: true
          });
        }

        if (config.value.keysControl) {
          hooperCarousel.value.addEventListener('keydown', onKeypress);
        }

        if (config.value.wheelControl) {
          lastScrollTime.value = now();
          hooperCarousel.value.addEventListener('wheel', onWheel, {
            passive: false
          });
        }

        window.addEventListener('resize', update);
      };

      var getCurrentSlideTimeout = function getCurrentSlideTimeout() {
        var _children$curIdx$prop, _children$curIdx, _children$curIdx$prop2;

        var curIdx = normalizeSlideIndex(currentSlide.value, slidesCount.value);
        var children = context.slots.default();
        return (_children$curIdx$prop = (_children$curIdx = children[curIdx]) === null || _children$curIdx === void 0 ? void 0 : (_children$curIdx$prop2 = _children$curIdx.props) === null || _children$curIdx$prop2 === void 0 ? void 0 : _children$curIdx$prop2.duration) !== null && _children$curIdx$prop !== void 0 ? _children$curIdx$prop : props.playSpeed;
      }; // switched to using a timeout which defaults to the prop set on this component, but can be overridden on a per slide basis


      var initAutoPlay = function initAutoPlay() {
        timer.value = new Timer(function () {
          if (isSliding.value || isDragging.value || isHover.value && props.hoverPause || isFocus.value || !props.autoPlay) {
            timer.value.set(getCurrentSlideTimeout());
            return;
          }

          if (currentSlide.value === slidesCount.value - 1 && !config.value.infiniteScroll) {
            slideTo(0);
            timer.value.set(getCurrentSlideTimeout());
            return;
          }

          slideNext();
          timer.value.set(getCurrentSlideTimeout());
        }, getCurrentSlideTimeout());
      };

      var initDefaults = function initDefaults() {
        breakpoints.value = props.settings.breakpoints;
        defaults.value = Object.assign({}, props, props.settings);
        config.value = Object.assign({}, defaults.value);
      }; // updating methods


      var update = function update() {
        if (breakpoints.value) {
          updateConfig();
        }

        updateWidth();
        updateTrim();
        context.emit('updated', {
          containerWidth: containerWidth,
          containerHeight: containerHeight,
          slideWidth: slideWidth,
          slideHeight: slideHeight,
          settings: config
        });
      };

      var updateTrim = function updateTrim() {
        var _config$value3 = config.value,
            trimWhiteSpace = _config$value3.trimWhiteSpace,
            itemsToShow = _config$value3.itemsToShow,
            centerMode = _config$value3.centerMode,
            infiniteScroll = _config$value3.infiniteScroll;

        if (!trimWhiteSpace || infiniteScroll) {
          trimStart.value = 0;
          trimEnd.value = 1;
          return;
        }

        trimStart.value = centerMode ? Math.floor((itemsToShow - 1) / 2) : 0;
        trimEnd.value = centerMode ? Math.ceil(itemsToShow / 2) : itemsToShow;
      };

      var updateWidth = function updateWidth() {
        var rect = hooperCarousel.value.getBoundingClientRect();
        containerWidth.value = rect.width;
        containerHeight.value = rect.height;

        if (config.value.vertical) {
          slideHeight.value = containerHeight.value / config.value.itemsToShow;
          return;
        }

        slideWidth.value = containerWidth.value / config.value.itemsToShow;
      };

      var updateConfig = function updateConfig() {
        var breakpointsConfig = Object.keys(breakpoints.value).sort(function (a, b) {
          return b - a;
        });
        var matched;
        breakpointsConfig.some(function (breakpoint) {
          matched = window.matchMedia("(min-width: ".concat(breakpoint, "px)")).matches;

          if (matched) {
            config.value = Object.assign({}, config.value, defaults.value, breakpoints.value[breakpoint]);
            return true;
          }
        });

        if (!matched) {
          config.value = Object.assign(config.value, defaults.value);
        }
      };

      var restartTimer = function restartTimer() {
        vue.nextTick(function () {
          if (timer.value === null && props.autoPlay) {
            initAutoPlay();
            return;
          }

          if (timer.value) {
            timer.value.stop();

            if (props.autoPlay) {
              timer.value.set(getCurrentSlideTimeout());
              timer.value.start();
            }
          }
        });
      };

      var restart = function restart() {
        vue.nextTick(function () {
          update();
        });
      }; // events handlers


      var onDragStart = function onDragStart(event) {
        isTouch.value = event.type === 'touchstart';

        if (!isTouch.value && event.button !== 0) {
          return;
        }

        startPosition.value = {
          x: 0,
          y: 0
        };
        endPosition.value = {
          x: 0,
          y: 0
        };
        isDragging.value = true;
        startPosition.value.x = isTouch.value ? event.touches[0].clientX : event.clientX;
        startPosition.value.y = isTouch.value ? event.touches[0].clientY : event.clientY;
        document.addEventListener(isTouch.value ? 'touchmove' : 'mousemove', onDrag);
        document.addEventListener(isTouch.value ? 'touchend' : 'mouseup', onDragEnd);
      };

      var isInvalidDirection = function isInvalidDirection(deltaX, deltaY) {
        if (!config.value.vertical) {
          return Math.abs(deltaX) <= Math.abs(deltaY);
        }

        if (config.value.vertical) {
          return Math.abs(deltaY) <= Math.abs(deltaX);
        }

        return false;
      };

      var onDrag = function onDrag(event) {
        if (isSliding.value) {
          return;
        }

        endPosition.value.x = isTouch.value ? event.touches[0].clientX : event.clientX;
        endPosition.value.y = isTouch.value ? event.touches[0].clientY : event.clientY;
        var deltaX = endPosition.value.x - startPosition.value.x;
        var deltaY = endPosition.value.y - startPosition.value.y; // Maybe scrolling.

        if (isInvalidDirection(deltaX, deltaY)) {
          return;
        }

        delta.value.y = deltaY;
        delta.value.x = deltaX;

        if (!isTouch.value) {
          event.preventDefault();
        }
      };

      var onDragEnd = function onDragEnd() {
        var tolerance = config.value.shortDrag ? 0.5 : 0.15;
        isDragging.value = false;

        if (config.value.vertical) {
          var draggedSlides = Math.round(Math.abs(delta.value.y / slideHeight.value) + tolerance);
          slideTo(currentSlide.value - Math.sign(delta.value.y) * draggedSlides);
        }

        if (!config.value.vertical) {
          var direction = (config.value.rtl ? -1 : 1) * Math.sign(delta.value.x);

          var _draggedSlides = Math.round(Math.abs(delta.value.x / slideWidth.value) + tolerance);

          slideTo(currentSlide.value - direction * _draggedSlides);
        }

        delta.value.x = 0;
        delta.value.y = 0;
        document.removeEventListener(isTouch.value ? 'touchmove' : 'mousemove', onDrag);
        document.removeEventListener(isTouch.value ? 'touchend' : 'mouseup', onDragEnd);
        restartTimer();
      };

      var onTransitionend = function onTransitionend() {
        isSliding.value = false;
        context.emit('afterSlide', {
          currentSlide: currentSlide.value
        });
      };

      var onKeypress = function onKeypress(event) {
        var key = event.key;

        if (key.startsWith('Arrow')) {
          event.preventDefault();
        }

        if (config.value.vertical) {
          if (key === 'ArrowUp') {
            slidePrev();
          }

          if (key === 'ArrowDown') {
            slideNext();
          }

          return;
        }

        if (config.value.rtl) {
          if (key === 'ArrowRight') {
            slidePrev();
          }

          if (key === 'ArrowLeft') {
            slideNext();
          }

          return;
        }

        if (key === 'ArrowRight') {
          slideNext();
        }

        if (key === 'ArrowLeft') {
          slidePrev();
        }
      };

      var onWheel = function onWheel(event) {
        event.preventDefault();

        if (now() - lastScrollTime.value < 200) {
          return;
        } // get wheel direction


        lastScrollTime.value = now();
        var value = event.wheelDelta || -event.deltaY;
        var delta = Math.sign(value);

        if (delta === -1) {
          slideNext();
        }

        if (delta === 1) {
          slidePrev();
        }
      };

      var _groupSlideHandler = function _groupSlideHandler(slideIndex) {
        // set the isSource to false to prevent infinite emitting loop.
        slideTo(slideIndex, false);
      };

      var addGroupListeners = function addGroupListeners() {
        if (!props.group) {
          return;
        }

        EMITTER.on("slideGroup:".concat(props.group), _groupSlideHandler);
      };

      vue.watch(function () {
        return props.group;
      }, function (val, oldVal) {
        if (val === oldVal) {
          return;
        }

        EMITTER.off("slideGroup:".concat(oldVal), _groupSlideHandler);
        addGroupListeners();
      });
      vue.watch(function () {
        return props.autoPlay;
      }, function (val, oldVal) {
        if (val === oldVal) {
          return;
        }

        restartTimer();
      });
      initDefaults();
      vue.onMounted(function () {
        vue.nextTick(function () {
          initEvents();
          addGroupListeners();
          update();
          slideTo(config.value.initialSlide || 0);
          setTimeout(function () {
            context.emit('loaded');
            initialized.value = true;
          }, props.transition);
        });
      });
      vue.onBeforeUnmount(function () {
        window.removeEventListener('resize', update);

        if (props.group) {
          EMITTER.off("slideGroup:".concat(props.group), _groupSlideHandler);
        }

        if (timer.value) {
          timer.value.stop();
        }
      });
      vue.provide('$hooper', {
        config: config,
        slidesCount: slidesCount,
        slideHeight: slideHeight,
        slideWidth: slideWidth,
        slideBounds: slideBounds,
        trimStart: trimStart,
        trimEnd: trimEnd,
        currentSlide: currentSlide,
        slideNext: slideNext,
        slidePrev: slidePrev,
        restartTimer: restartTimer
      });
      context.expose({
        slideTo: slideTo,
        slideNext: slideNext,
        slidePrev: slidePrev,
        restart: restart
      });
      /**
       * Renders additional slides for infinite slides mode.
       * By cloning Slides VNodes before and after either edges.
       */

      var renderBufferSlides = function renderBufferSlides(slides) {
        var before = [];
        var after = []; // reduce prop access

        var slidesCount = slides.length;

        for (var i = 0; i < slidesCount; i++) {
          var slide = slides[i];
          var clonedBefore = cloneNode(vue.h, slide);
          var slideIndex = i - slidesCount;
          clonedBefore.type.props.index = slideIndex;
          clonedBefore.type.key = "before_".concat(i);
          clonedBefore.key = clonedBefore.type.key;
          before.push(clonedBefore);
          var clonedAfter = cloneNode(vue.h, slide);
          slideIndex = i + slidesCount;
          clonedAfter.type.props.index = slideIndex;
          clonedAfter.type.key = "after_".concat(i);
          clonedAfter.key = clonedAfter.type.key;
          after.push(clonedAfter);
        }

        return [].concat(before, _toConsumableArray(slides), after);
      };

      var renderSlides = function renderSlides(children) {
        var _children$;

        var childrenCount = children.length;
        var idx = 0;
        var slides = [];

        for (var i = 0; i < childrenCount; i++) {
          var _child$type;

          var child = children[i];

          if (!child || (child === null || child === void 0 ? void 0 : (_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.name) !== 'HooperSlide') {
            continue;
          } // give slide an index behind the scenes


          child.type.props.index = idx;
          child.type.key = idx;
          child.key = idx;
          slides.push(child);
        } // update hooper's information of the slide count.


        slidesCount.value = slides.length;

        if (config.value.infiniteScroll) {
          slides = renderBufferSlides(slides);
        } // When no slides are found try to find them in the child (<slides v-for=... use case)


        if (slides.length === 0 && (_children$ = children[0]) !== null && _children$ !== void 0 && _children$.children) {
          slides = renderSlides(children[0].children);
        }

        return slides;
      };

      var renderAddons = function renderAddons(slots) {
        return slots['hooper-addons'] ? slots['hooper-addons']() : [];
      };

      return function () {
        return vue.h('section', {
          ref: hooperCarousel,
          class: {
            hooper: true,
            'is-vertical': config.value.vertical,
            'is-rtl': config.value.rtl
          },
          tabindex: '0',
          onFocusin: function onFocusin() {
            return isFocus.value = true;
          },
          onFocusout: function onFocusout() {
            return isFocus.value = false;
          },
          onMouseover: function onMouseover() {
            return isHover.value = true;
          },
          onMouseleave: function onMouseleave() {
            return isHover.value = false;
          }
        }, [vue.h('div', {
          class: 'hooper-list',
          ref: list
        }, [vue.h('ul', {
          class: {
            'hooper-track': true,
            'is-dragging': isDragging.value
          },
          style: trackTransform.value + trackTransition.value,
          ref: track,
          onTransitionend: onTransitionend
        }, renderSlides(context.slots.default())), vue.h('div', {
          class: 'hooper-liveregion hooper-sr-only',
          'aria-live': 'polite',
          'aria-atomic': 'true'
        }, "Item ".concat(currentSlide.value + 1, " of ").concat(slidesCount.value)), renderAddons(context.slots)])]);
      };
    }
  };

  var Slide = {
    name: 'HooperSlide',
    inject: ['$hooper'],
    props: {
      isClone: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        default: null
      }
    },
    computed: {
      style: function style() {
        var _ref = this.$hooper || {},
            config = _ref.config,
            slideHeight = _ref.slideHeight,
            slideWidth = _ref.slideWidth;

        if (config.value.vertical) {
          return "height: ".concat(slideHeight.value, "px");
        }

        return "width: ".concat(slideWidth.value, "px");
      },
      isActive: function isActive() {
        var _this$$hooper$slideBo = this.$hooper.slideBounds,
            upper = _this$$hooper$slideBo.upper,
            lower = _this$$hooper$slideBo.lower;
        return this.index >= lower && this.index <= upper;
      },
      isPrev: function isPrev() {
        var lower = this.$hooper.slideBounds.lower;
        var itemsToSlide = this.$hooper.config.itemsToSlide;
        return this.index < lower && this.index >= lower - itemsToSlide;
      },
      isNext: function isNext() {
        var upper = this.$hooper.slideBounds.upper;
        var itemsToSlide = this.$hooper.config.itemsToSlide;
        return this.index > upper && this.index <= upper + itemsToSlide;
      },
      isCurrent: function isCurrent() {
        return this.index === this.$hooper.currentSlide;
      }
    },
    render: function render() {
      var classes = {
        'hooper-slide': true,
        'is-clone': this.isClone,
        'is-active': this.isActive,
        'is-prev': this.isPrev,
        'is-next': this.isNext,
        'is-current': this.isCurrent
      };
      var children = this.$slots.default();
      return vue.h('li', {
        class: classes,
        style: this.style,
        attrs: {
          'aria-hidden': !this.isActive
        }
      }, children);
    }
  };

  var Mixin = {
    inject: ['$hooper']
  };

  var icons = {
    arrowUp: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
    arrowDown: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
    arrowRight: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
    arrowLeft: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'
  };
  var Icon = {
    name: 'HooperIcon',
    functional: true,
    inheritAttrs: true,
    props: {
      name: {
        type: String,
        required: true,
        validator: function validator(val) {
          return val in icons;
        }
      }
    },
    render: function render(props) {
      var icon = icons[props.name];
      var children = [];
      children.push(vue.h('title', camelCaseToString(props.name)));
      children.push(vue.h('path', {
        d: 'M0 0h24v24H0z',
        fill: 'none'
      }));
      children.push(vue.h('path', {
        d: icon
      }));
      return vue.h('svg', {
        class: "icon icon-".concat(props.name),
        viewBox: '0 0 24 24',
        width: '24px',
        height: '24px'
      }, children);
    }
  };

  var Progress = {
    inject: ['$hooper'],
    name: 'HooperProgress',
    computed: {
      currentSlide: function currentSlide() {
        return normalizeSlideIndex(this.$hooper.currentSlide.value, this.$hooper.slidesCount.value);
      },
      progress: function progress() {
        var range = this.$hooper.slidesCount.value - this.$hooper.trimStart.value - this.$hooper.trimEnd.value;
        return (this.currentSlide - this.$hooper.trimStart.value) * 100 / range;
      }
    },
    render: function render() {
      return vue.h('div', {
        class: 'hooper-progress'
      }, [vue.h('div', {
        class: 'hooper-progress-inner',
        style: "width: ".concat(this.progress, "%")
      })]);
    }
  };

  function renderFraction(h, current, totalCount) {
    return [h('span', current + 1), h('span', '/'), h('span', totalCount)];
  }

  function renderIndicator(h, index, isCurrent, onClick) {
    return h('li', [h('button', {
      class: {
        'hooper-indicator': true,
        'is-active': isCurrent
      },
      onClick: onClick,
      type: 'button'
    }, [h('span', {
      class: 'hooper-sr-only'
    }, "item ".concat(index))])]);
  }

  function renderDefault(h, current, totalCount, slideToIndex) {
    var children = [];

    var _loop = function _loop(i) {
      children.push(renderIndicator(h, i, i === current, function () {
        return slideToIndex(i);
      }));
    };

    for (var i = 0; i < totalCount; i++) {
      _loop(i);
    }

    return [h('ol', {
      class: 'hooper-indicators'
    }, children)];
  }

  var Pagination = {
    inject: ['$hooper'],
    name: 'HooperPagination',
    props: {
      mode: {
        default: 'indicator',
        type: String
      }
    },
    computed: {
      currentSlide: function currentSlide() {
        return normalizeSlideIndex(this.$hooper.currentSlide.value, this.$hooper.slidesCount.value);
      },
      slides: function slides() {
        var slides = this.$hooper.slides.value.map(function (_, index) {
          return index;
        });
        return slides.slice(this.$hooper.trimStart.value, this.$hooper.slidesCount.value - this.$hooper.trimEnd.value + 1);
      }
    },
    render: function render() {
      var _this = this;

      var totalCount = this.$hooper.slidesCount.value;
      var children = this.mode === 'indicator' ? renderDefault(vue.h, this.currentSlide, totalCount, function (index) {
        return _this.$hooper.slideTo(index);
      }) : renderFraction(vue.h, this.currentSlide, totalCount);
      return vue.h('div', {
        class: {
          'hooper-pagination': true,
          'is-vertical': this.$hooper.config.value.vertical
        }
      }, children);
    }
  };

  function iconName(isVertical, isRTL, isPrev) {
    if (isPrev) {
      return isVertical ? 'arrowUp' : isRTL ? 'arrowRight' : 'arrowLeft';
    }

    return isVertical ? 'arrowDown' : isRTL ? 'arrowLeft' : 'arrowRight';
  }

  function renderButton(h, disabled, slot, isPrev, _ref, onClick) {
    var _class;

    var isVertical = _ref.isVertical,
        isRTL = _ref.isRTL;
    var children = slot && slot() && slot().length ? slot() : [h(Icon, {
      name: iconName(isVertical, isRTL, isPrev)
    })];
    return h('button', {
      class: (_class = {}, _defineProperty(_class, "hooper-".concat(isPrev ? 'prev' : 'next'), true), _defineProperty(_class, 'is-disabled', disabled), _class),
      type: 'button',
      onClick: onClick
    }, children);
  }

  var Navigation = {
    inject: ['$hooper'],
    name: 'HooperNavigation',
    computed: {
      isPrevDisabled: function isPrevDisabled() {
        if (this.$hooper.config.value.infiniteScroll) {
          return false;
        }

        return this.$hooper.currentSlide === 0;
      },
      isNextDisabled: function isNextDisabled() {
        if (this.$hooper.config.value.infiniteScroll) {
          return false;
        }

        if (this.$hooper.config.value.trimWhiteSpace) {
          return this.$hooper.currentSlide === this.$hooper.slidesCount - Math.min(this.$hooper.config.value.itemsToShow, this.$hooper.slidesCount);
        }

        return this.$hooper.currentSlide === this.$hooper.slidesCount - 1;
      }
    },
    methods: {
      slideNext: function slideNext() {
        this.$hooper.slideNext();
        this.$hooper.restartTimer();
      },
      slidePrev: function slidePrev() {
        this.$hooper.slidePrev();
        this.$hooper.restartTimer();
      }
    },
    render: function render() {
      var _this = this;

      var config = {
        isRTL: this.$hooper.config.value.rtl,
        isVertical: this.$hooper.config.value.vertical
      };
      var children = [renderButton(vue.h, this.isPrevDisabled, this.$slots['hooper-prev'], true, config, function () {
        return _this.slidePrev();
      }), renderButton(vue.h, this.isNextDisabled, this.$slots['hooper-next'], false, config, function () {
        return _this.slideNext();
      })];
      return vue.h('div', {
        class: {
          'hooper-navigation': true,
          'is-vertical': this.$hooper.config.value.vertical,
          'is-rtl': this.$hooper.config.value.rtl
        }
      }, children);
    }
  };

  exports.Hooper = Carousel;
  exports.Icon = Icon;
  exports.Navigation = Navigation;
  exports.Pagination = Pagination;
  exports.Progress = Progress;
  exports.Slide = Slide;
  exports.addonMixin = Mixin;
  exports.default = Carousel;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
