/**
 * Hopper 0.3.5
 * (c) 2021
 * @license MIT
 */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('vue'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'vue'], factory)
    : ((global = global || self), factory((global.Hooper = {}), global.Vue));
})(this, function(exports, Vue) {
  'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

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
    if ((typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) || iter['@@iterator'] != null)
      return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }

  function getInRange(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }
  function now() {
    return Date.now();
  }
  function Timer(callback, defaultTime) {
    this.create = function() {
      return window.setTimeout(callback, defaultTime);
    };

    this.stop = function() {
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    };

    this.start = function() {
      if (!this.timer) {
        this.timer = this.create();
      }
    };

    this.set = function(newTime) {
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
    var children = vNode.children || vNode.componentOptions.children || vNode.text;
    var tag = vNode.componentOptions.Ctor;
    return h(tag, vNode.data, children);
  } // IE11 :)

  function assignPoly(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    var to = Object(target);

    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];

      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      nextSource = Object(nextSource);
      var keysArray = Object.keys(Object(nextSource));

      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }

    return to;
  }

  var assign = Object.assign || assignPoly;

  function signPoly(value) {
    if (value < 0) {
      return -1;
    }

    return value > 0 ? 1 : 0;
  }

  var sign = Math.sign || signPoly;
  function normalizeChildren(context) {
    var slotProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (context.$scopedSlots.default) {
      return context.$scopedSlots.default(slotProps) || [];
    }

    return context.$slots.default || [];
  }

  var EMITTER = new Vue();
  var Carousel = {
    name: 'Hooper',
    provide: function provide() {
      return {
        $hooper: this
      };
    },
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
    data: function data() {
      return {
        isDragging: false,
        isSliding: false,
        isTouch: false,
        isHover: false,
        isFocus: false,
        initialized: false,
        slideWidth: 0,
        slideHeight: 0,
        slidesCount: 0,
        trimStart: 0,
        trimEnd: 1,
        currentSlide: null,
        timer: null,
        defaults: {},
        breakpoints: {},
        delta: {
          x: 0,
          y: 0
        },
        config: {}
      };
    },
    computed: {
      slideBounds: function slideBounds() {
        var config = this.config,
          currentSlide = this.currentSlide; // Because the "isActive" depends on the slides shown, not the number of slidable ones.
        // but upper and lower bounds for Next,Prev depend on whatever is smaller.

        var siblings = config.itemsToShow;
        var lower = config.centerMode ? Math.ceil(currentSlide - siblings / 2) : currentSlide;
        var upper = config.centerMode
          ? Math.floor(currentSlide + siblings / 2)
          : Math.floor(currentSlide + siblings - 1);
        return {
          lower: lower,
          upper: upper
        };
      },
      trackTransform: function trackTransform() {
        var _this$config = this.config,
          infiniteScroll = _this$config.infiniteScroll,
          vertical = _this$config.vertical,
          rtl = _this$config.rtl,
          centerMode = _this$config.centerMode;
        var direction = rtl ? -1 : 1;
        var slideLength = vertical ? this.slideHeight : this.slideWidth;
        var containerLength = vertical ? this.containerHeight : this.containerWidth;
        var dragDelta = vertical ? this.delta.y : this.delta.x;
        var clonesSpace = infiniteScroll ? slideLength * this.slidesCount : 0;
        var centeringSpace = centerMode ? (containerLength - slideLength) / 2 : 0; // calculate track translate

        var translate = dragDelta + direction * (centeringSpace - clonesSpace - this.currentSlide * slideLength);

        if (vertical) {
          return 'transform: translate(0, '.concat(translate, 'px);');
        }

        return 'transform: translate('.concat(translate, 'px, 0);');
      },
      trackTransition: function trackTransition() {
        if (this.initialized && this.isSliding) {
          return 'transition: '.concat(this.config.transition, 'ms');
        }

        return '';
      }
    },
    watch: {
      group: function group(val, oldVal) {
        if (val === oldVal) {
          return;
        }

        EMITTER.$off('slideGroup:'.concat(oldVal), this._groupSlideHandler);
        this.addGroupListeners();
      },
      autoPlay: function autoPlay(val, oldVal) {
        if (val === oldVal) {
          return;
        }

        this.restartTimer();
      }
    },
    methods: {
      // controlling methods
      slideTo: function slideTo(slideIndex) {
        var _this = this;

        var isSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (this.isSliding || slideIndex === this.currentSlide) {
          return;
        }

        this.$emit('beforeSlide', {
          currentSlide: this.currentSlide,
          slideTo: index
        });
        var _this$config2 = this.config,
          infiniteScroll = _this$config2.infiniteScroll,
          transition = _this$config2.transition;
        var previousSlide = this.currentSlide;
        var index = infiniteScroll
          ? slideIndex
          : getInRange(slideIndex, this.trimStart, this.slidesCount - this.trimEnd); // Notify others if in a group and is the slide event initiator.

        if (this.group && isSource) {
          EMITTER.$emit('slideGroup:'.concat(this.group), slideIndex);
        }

        this.currentSlide = index;
        this.isSliding = true;
        window.setTimeout(function() {
          _this.isSliding = false;
          _this.currentSlide = normalizeSlideIndex(index, _this.slidesCount);
        }, transition);
        this.$emit('slide', {
          currentSlide: this.currentSlide,
          slideFrom: previousSlide
        });
      },
      slideNext: function slideNext() {
        this.slideTo(this.currentSlide + this.config.itemsToSlide);
      },
      slidePrev: function slidePrev() {
        this.slideTo(this.currentSlide - this.config.itemsToSlide);
      },
      initEvents: function initEvents() {
        // get the element direction if not explicitly set
        if (this.defaults.rtl === null) {
          this.defaults.rtl = getComputedStyle(this.$el).direction === 'rtl';
        }

        if (this.$props.autoPlay) {
          this.initAutoPlay();
        }

        if (this.config.mouseDrag) {
          this.$refs.list.addEventListener('mousedown', this.onDragStart);
        }

        if (this.config.touchDrag) {
          this.$refs.list.addEventListener('touchstart', this.onDragStart, {
            passive: true
          });
        }

        if (this.config.keysControl) {
          this.$el.addEventListener('keydown', this.onKeypress);
        }

        if (this.config.wheelControl) {
          this.lastScrollTime = now();
          this.$el.addEventListener('wheel', this.onWheel, {
            passive: false
          });
        }

        window.addEventListener('resize', this.update);
      },
      getCurrentSlideTimeout: function getCurrentSlideTimeout() {
        var curIdx = normalizeSlideIndex(this.currentSlide, this.slidesCount);
        var children = normalizeChildren(this);
        return children[curIdx].componentOptions.propsData.duration;
      },
      // switched to using a timeout which defaults to the prop set on this component, but can be overridden on a per slide basis.
      initAutoPlay: function initAutoPlay() {
        var _this2 = this;

        this.timer = new Timer(function() {
          if (
            _this2.isSliding ||
            _this2.isDragging ||
            (_this2.isHover && _this2.config.hoverPause) ||
            _this2.isFocus ||
            !_this2.$props.autoPlay
          ) {
            _this2.timer.set(_this2.getCurrentSlideTimeout());

            return;
          }

          if (_this2.currentSlide === _this2.slidesCount - 1 && !_this2.config.infiniteScroll) {
            _this2.slideTo(0);

            _this2.timer.set(_this2.getCurrentSlideTimeout());

            return;
          }

          _this2.slideNext();

          _this2.timer.set(_this2.getCurrentSlideTimeout());
        }, this.getCurrentSlideTimeout());
      },
      initDefaults: function initDefaults() {
        this.breakpoints = this.settings.breakpoints;
        this.defaults = assign({}, this.$props, this.settings);
        this.config = assign({}, this.defaults);
      },
      // updating methods
      update: function update() {
        if (this.breakpoints) {
          this.updateConfig();
        }

        this.updateWidth();
        this.updateTrim();
        this.$emit('updated', {
          containerWidth: this.containerWidth,
          containerHeight: this.containerHeight,
          slideWidth: this.slideWidth,
          slideHeight: this.slideHeight,
          settings: this.config
        });
      },
      updateTrim: function updateTrim() {
        var _this$config3 = this.config,
          trimWhiteSpace = _this$config3.trimWhiteSpace,
          itemsToShow = _this$config3.itemsToShow,
          centerMode = _this$config3.centerMode,
          infiniteScroll = _this$config3.infiniteScroll;

        if (!trimWhiteSpace || infiniteScroll) {
          this.trimStart = 0;
          this.trimEnd = 1;
          return;
        }

        this.trimStart = centerMode ? Math.floor((itemsToShow - 1) / 2) : 0;
        this.trimEnd = centerMode ? Math.ceil(itemsToShow / 2) : itemsToShow;
      },
      updateWidth: function updateWidth() {
        var rect = this.$el.getBoundingClientRect();
        this.containerWidth = rect.width;
        this.containerHeight = rect.height;

        if (this.config.vertical) {
          this.slideHeight = this.containerHeight / this.config.itemsToShow;
          return;
        }

        this.slideWidth = this.containerWidth / this.config.itemsToShow;
      },
      updateConfig: function updateConfig() {
        var _this3 = this;

        var breakpoints = Object.keys(this.breakpoints).sort(function(a, b) {
          return b - a;
        });
        var matched;
        breakpoints.some(function(breakpoint) {
          matched = window.matchMedia('(min-width: '.concat(breakpoint, 'px)')).matches;

          if (matched) {
            _this3.config = assign({}, _this3.config, _this3.defaults, _this3.breakpoints[breakpoint]);
            return true;
          }
        });

        if (!matched) {
          this.config = assign(this.config, this.defaults);
        }
      },
      restartTimer: function restartTimer() {
        var _this4 = this;

        this.$nextTick(function() {
          if (_this4.timer === null && _this4.$props.autoPlay) {
            _this4.initAutoPlay();

            return;
          }

          if (_this4.timer) {
            _this4.timer.stop();

            if (_this4.$props.autoPlay) {
              _this4.timer.set(_this4.getCurrentSlideTimeout());

              _this4.timer.start();
            }
          }
        });
      },
      restart: function restart() {
        var _this5 = this;

        this.$nextTick(function() {
          _this5.update();
        });
      },
      // events handlers
      onDragStart: function onDragStart(event) {
        this.isTouch = event.type === 'touchstart';

        if (!this.isTouch && event.button !== 0) {
          return;
        }

        this.startPosition = {
          x: 0,
          y: 0
        };
        this.endPosition = {
          x: 0,
          y: 0
        };
        this.isDragging = true;
        this.startPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
        this.startPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;
        document.addEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.onDrag);
        document.addEventListener(this.isTouch ? 'touchend' : 'mouseup', this.onDragEnd);
      },
      isInvalidDirection: function isInvalidDirection(deltaX, deltaY) {
        if (!this.config.vertical) {
          return Math.abs(deltaX) <= Math.abs(deltaY);
        }

        if (this.config.vertical) {
          return Math.abs(deltaY) <= Math.abs(deltaX);
        }

        return false;
      },
      onDrag: function onDrag(event) {
        if (this.isSliding) {
          return;
        }

        this.endPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
        this.endPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;
        var deltaX = this.endPosition.x - this.startPosition.x;
        var deltaY = this.endPosition.y - this.startPosition.y; // Maybe scrolling.

        if (this.isInvalidDirection(deltaX, deltaY)) {
          return;
        }

        this.delta.y = deltaY;
        this.delta.x = deltaX;

        if (!this.isTouch) {
          event.preventDefault();
        }
      },
      onDragEnd: function onDragEnd() {
        var tolerance = this.config.shortDrag ? 0.5 : 0.15;
        this.isDragging = false;

        if (this.config.vertical) {
          var draggedSlides = Math.round(Math.abs(this.delta.y / this.slideHeight) + tolerance);
          this.slideTo(this.currentSlide - sign(this.delta.y) * draggedSlides);
        }

        if (!this.config.vertical) {
          var direction = (this.config.rtl ? -1 : 1) * sign(this.delta.x);

          var _draggedSlides = Math.round(Math.abs(this.delta.x / this.slideWidth) + tolerance);

          this.slideTo(this.currentSlide - direction * _draggedSlides);
        }

        this.delta.x = 0;
        this.delta.y = 0;
        document.removeEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.onDrag);
        document.removeEventListener(this.isTouch ? 'touchend' : 'mouseup', this.onDragEnd);
        this.restartTimer();
      },
      onTransitionend: function onTransitionend() {
        this.isSliding = false;
        this.$emit('afterSlide', {
          currentSlide: this.currentSlide
        });
      },
      onKeypress: function onKeypress(event) {
        var key = event.key;

        if (key.startsWith('Arrow')) {
          event.preventDefault();
        }

        if (this.config.vertical) {
          if (key === 'ArrowUp') {
            this.slidePrev();
          }

          if (key === 'ArrowDown') {
            this.slideNext();
          }

          return;
        }

        if (this.config.rtl) {
          if (key === 'ArrowRight') {
            this.slidePrev();
          }

          if (key === 'ArrowLeft') {
            this.slideNext();
          }

          return;
        }

        if (key === 'ArrowRight') {
          this.slideNext();
        }

        if (key === 'ArrowLeft') {
          this.slidePrev();
        }
      },
      onWheel: function onWheel(event) {
        event.preventDefault();

        if (now() - this.lastScrollTime < 200) {
          return;
        } // get wheel direction

        this.lastScrollTime = now();
        var event_delta;
        if (this.config.vertical) event_delta = event.wheelDeltaY || -event.deltaY;
        else event_delta = event.wheelDeltaX || -event.deltaX;
        var value = event_delta;
        var delta = sign(value);

        if (delta === -1) {
          this.slideNext();
        }

        if (delta === 1) {
          this.slidePrev();
        }
      },
      addGroupListeners: function addGroupListeners() {
        var _this6 = this;

        if (!this.group) {
          return;
        }

        this._groupSlideHandler = function(slideIndex) {
          // set the isSource to false to prevent infinite emitting loop.
          _this6.slideTo(slideIndex, false);
        };

        EMITTER.$on('slideGroup:'.concat(this.group), this._groupSlideHandler);
      }
    },
    created: function created() {
      this.initDefaults();
    },
    mounted: function mounted() {
      var _this7 = this;

      this.initEvents();
      this.addGroupListeners();
      this.$nextTick(function() {
        _this7.update();

        _this7.slideTo(_this7.config.initialSlide || 0);

        setTimeout(function() {
          _this7.$emit('loaded');

          _this7.initialized = true;
        }, _this7.transition);
      });
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('resize', this.update);

      if (this.group) {
        EMITTER.$off('slideGroup:'.concat(this.group), this._groupSlideHandler);
      }

      if (this.timer) {
        this.timer.stop();
      }
    },
    render: function render(h) {
      var _this8 = this;

      var body = renderBody.call(this, h);
      return h(
        'section',
        {
          class: {
            hooper: true,
            'is-vertical': this.config.vertical,
            'is-rtl': this.config.rtl
          },
          attrs: {
            tabindex: '0'
          },
          on: {
            focusin: function focusin() {
              return (_this8.isFocus = true);
            },
            focusout: function focusout() {
              return (_this8.isFocus = false);
            },
            mouseover: function mouseover() {
              return (_this8.isHover = true);
            },
            mouseleave: function mouseleave() {
              return (_this8.isHover = false);
            }
          }
        },
        body
      );
    }
  };
  /**
   * Renders additional slides for infinite slides mode.
   * By cloning Slides VNodes before and after either edges.
   */

  function renderBufferSlides(h, slides) {
    var before = [];
    var after = []; // reduce prop access

    var slidesCount = slides.length;

    for (var i = 0; i < slidesCount; i++) {
      var slide = slides[i];
      var clonedBefore = cloneNode(h, slide);
      var slideIndex = i - slidesCount;
      clonedBefore.data.key = 'before_'.concat(i);
      clonedBefore.key = clonedBefore.data.key;
      clonedBefore.componentOptions.propsData.index = slideIndex;
      clonedBefore.data.props = {
        index: slideIndex,
        isClone: true
      };
      before.push(clonedBefore);
      var clonedAfter = cloneNode(h, slide);
      slideIndex = i + slidesCount;
      clonedAfter.data.key = 'after_'.concat(slideIndex);
      clonedAfter.componentOptions.propsData.index = slideIndex;
      clonedAfter.key = clonedAfter.data.key;
      clonedAfter.data.props = {
        index: slideIndex,
        isClone: true
      };
      after.push(clonedAfter);
    }

    return [].concat(before, _toConsumableArray(slides), after);
  }
  /**
   * Produces the VNodes for the Slides.
   * requires {this} to be bound to hooper.
   * So use with .call or .bind
   */

  function renderSlides(h) {
    var children = normalizeChildren(this);
    var childrenCount = children.length;
    var idx = 0;
    var slides = [];

    for (var i = 0; i < childrenCount; i++) {
      var child = children[i];
      var ctor = child.componentOptions && child.componentOptions.Ctor;

      if (!ctor || ctor.options.name !== 'HooperSlide') {
        continue;
      } // give slide an index behind the scenes

      child.componentOptions.propsData.index = idx;
      child.data.key = idx;
      child.key = idx;
      child.data.props = _objectSpread2(
        _objectSpread2({}, child.data.props || {}),
        {},
        {
          isClone: false,
          index: idx++
        }
      );
      slides.push(child);
    } // update hooper's information of the slide count.

    this.slidesCount = slides.length;

    if (this.config.infiniteScroll) {
      slides = renderBufferSlides(h, slides);
    }

    return h(
      'ul',
      {
        class: {
          'hooper-track': true,
          'is-dragging': this.isDragging
        },
        style: this.trackTransform + this.trackTransition,
        ref: 'track',
        on: {
          transitionend: this.onTransitionend
        }
      },
      slides
    );
  }
  /**
   * Builds the VNodes for the hooper body.
   * Which is the slides, addons if available, and a11y stuff.
   * REQUIRES {this} to be bound to the hooper instance.
   * use with .call or .bind
   */

  function renderBody(h) {
    var slides = renderSlides.call(this, h);
    var addons = this.$slots['hooper-addons'] || [];
    var a11y = h(
      'div',
      {
        class: 'hooper-liveregion hooper-sr-only',
        attrs: {
          'aria-live': 'polite',
          'aria-atomic': 'true'
        }
      },
      'Item '.concat(this.currentSlide + 1, ' of ').concat(this.slidesCount)
    );
    var children = [slides].concat(_toConsumableArray(addons), [a11y]);
    return [
      h(
        'div',
        {
          class: 'hooper-list',
          ref: 'list'
        },
        children
      )
    ];
  }

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

        if (config.vertical) {
          return 'height: '.concat(slideHeight, 'px');
        }

        return 'width: '.concat(slideWidth, 'px');
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
    render: function render(h) {
      var classes = {
        'hooper-slide': true,
        'is-clone': this.isClone,
        'is-active': this.isActive,
        'is-prev': this.isPrev,
        'is-next': this.isNext,
        'is-current': this.isCurrent
      };
      var children = normalizeChildren(this);
      return h(
        'li',
        {
          class: classes,
          style: this.style,
          attrs: {
            'aria-hidden': !this.isActive
          }
        },
        children
      );
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
    render: function render(createElement, _ref) {
      var props = _ref.props;
      var icon = icons[props.name];
      var children = [];
      children.push(createElement('title', camelCaseToString(props.name)));
      children.push(
        createElement('path', {
          attrs: {
            d: 'M0 0h24v24H0z',
            fill: 'none'
          }
        })
      );
      children.push(
        createElement('path', {
          attrs: {
            d: icon
          }
        })
      );
      return createElement(
        'svg',
        {
          attrs: {
            class: 'icon icon-'.concat(props.name),
            viewBox: '0 0 24 24',
            width: '24px',
            height: '24px'
          }
        },
        children
      );
    }
  };

  var Progress = {
    inject: ['$hooper'],
    name: 'HooperProgress',
    computed: {
      currentSlide: function currentSlide() {
        return normalizeSlideIndex(this.$hooper.currentSlide, this.$hooper.slidesCount);
      },
      progress: function progress() {
        var range = this.$hooper.slidesCount - this.$hooper.trimStart - this.$hooper.trimEnd;
        return ((this.currentSlide - this.$hooper.trimStart) * 100) / range;
      }
    },
    render: function render(h) {
      return h(
        'div',
        {
          class: 'hooper-progress'
        },
        [
          h('div', {
            class: 'hooper-progress-inner',
            style: 'width: '.concat(this.progress, '%')
          })
        ]
      );
    }
  };

  function renderFraction(h, current, totalCount) {
    return [h('span', current + 1), h('span', '/'), h('span', totalCount)];
  }

  function renderIndicator(h, index, isCurrent, onClick) {
    return h('li', [
      h(
        'button',
        {
          class: {
            'hooper-indicator': true,
            'is-active': isCurrent
          },
          on: {
            click: onClick
          },
          attrs: {
            type: 'button'
          }
        },
        [
          h(
            'span',
            {
              class: 'hooper-sr-only'
            },
            'item '.concat(index)
          )
        ]
      )
    ]);
  }

  function renderDefault(h, current, totalCount, slideToIndex) {
    var children = [];

    var _loop = function _loop(i) {
      children.push(
        renderIndicator(h, i, i === current, function() {
          return slideToIndex(i);
        })
      );
    };

    for (var i = 0; i < totalCount; i++) {
      _loop(i);
    }

    return [
      h(
        'ol',
        {
          class: 'hooper-indicators'
        },
        children
      )
    ];
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
        return normalizeSlideIndex(this.$hooper.currentSlide, this.$hooper.slidesCount);
      },
      slides: function slides() {
        var slides = this.$hooper.slides.map(function(_, index) {
          return index;
        });
        return slides.slice(this.$hooper.trimStart, this.$hooper.slidesCount - this.$hooper.trimEnd + 1);
      }
    },
    render: function render(h) {
      var _this = this;

      var totalCount = this.$hooper.slidesCount;
      var children =
        this.mode === 'indicator'
          ? renderDefault(h, this.currentSlide, totalCount, function(index) {
              return _this.$hooper.slideTo(index);
            })
          : renderFraction(h, this.currentSlide, totalCount);
      return h(
        'div',
        {
          class: {
            'hooper-pagination': true,
            'is-vertical': this.$hooper.config.vertical
          }
        },
        children
      );
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
    var children =
      slot && slot.length
        ? slot
        : [
            h(Icon, {
              props: {
                name: iconName(isVertical, isRTL, isPrev)
              }
            })
          ];
    return h(
      'button',
      {
        class:
          ((_class = {}),
          _defineProperty(_class, 'hooper-'.concat(isPrev ? 'prev' : 'next'), true),
          _defineProperty(_class, 'is-disabled', disabled),
          _class),
        attrs: {
          type: 'button'
        },
        on: {
          click: onClick
        }
      },
      children
    );
  }

  var Navigation = {
    inject: ['$hooper'],
    name: 'HooperNavigation',
    computed: {
      isPrevDisabled: function isPrevDisabled() {
        if (this.$hooper.config.infiniteScroll) {
          return false;
        }

        return this.$hooper.currentSlide === 0;
      },
      isNextDisabled: function isNextDisabled() {
        if (this.$hooper.config.infiniteScroll) {
          return false;
        }

        if (this.$hooper.config.trimWhiteSpace) {
          return (
            this.$hooper.currentSlide ===
            this.$hooper.slidesCount - Math.min(this.$hooper.config.itemsToShow, this.$hooper.slidesCount)
          );
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
    render: function render(h) {
      var _this = this;

      var config = {
        isRTL: this.$hooper.config.rtl,
        isVertical: this.$hooper.config.vertical
      };
      var children = [
        renderButton(h, this.isPrevDisabled, this.$slots['hooper-prev'], true, config, function() {
          return _this.slidePrev();
        }),
        renderButton(h, this.isNextDisabled, this.$slots['hooper-next'], false, config, function() {
          return _this.slideNext();
        })
      ];
      return h(
        'div',
        {
          class: {
            'hooper-navigation': true,
            'is-vertical': this.$hooper.config.vertical,
            'is-rtl': this.$hooper.config.rtl
          }
        },
        children
      );
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
});
