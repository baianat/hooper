import Vue from 'vue';
import { getInRange, now, Timer, normalizeSlideIndex, cloneNode, normalizeChildren, sign, assign } from './utils';
import './styles/carousel.css';

let EMITTER = new Vue();

export default {
  name: 'Hooper',
  provide() {
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
      default() {
        return {};
      },
      type: Object
    },
    group: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isDragging: false,
      isSliding: false,
      isTouch: false,
      isHover: false,
      isFocus: false,
      slideWidth: 0,
      slideHeight: 0,
      slidesCount: 0,
      trimStart: 0,
      trimEnd: 1,
      currentSlide: null,
      timer: null,
      defaults: {},
      breakpoints: {},
      delta: { x: 0, y: 0 },
      config: {}
    };
  },
  computed: {
    trackTransform() {
      const { infiniteScroll, vertical, rtl, centerMode } = this.config;

      const direction = rtl ? -1 : 1;
      const slideLength = vertical ? this.slideHeight : this.slideWidth;
      const containerLength = vertical ? this.containerHeight : this.containerWidth;
      const dragDelta = vertical ? this.delta.y : this.delta.x;
      const clonesSpace = infiniteScroll ? slideLength * this.slidesCount : 0;
      const centeringSpace = centerMode ? (containerLength - slideLength) / 2 : 0;

      // calculate track translate
      const translate = dragDelta + direction * (centeringSpace - clonesSpace - this.currentSlide * slideLength);

      if (vertical) {
        return `transform: translate(0, ${translate}px);`;
      }
      return `transform: translate(${translate}px, 0);`;
    },
    trackTransition() {
      if (this.isSliding) {
        return `transition: ${this.config.transition}ms`;
      }
      return '';
    }
  },
  watch: {
    group(val, oldVal) {
      if (val === oldVal) {
        return;
      }

      EMITTER.$off(`slideGroup:${oldVal}`, this._groupSlideHandler);
      this.addGroupListeners();
    }
  },
  methods: {
    // controlling methods
    slideTo(slideIndex, isSource = true) {
      if (this.isSliding || slideIndex === this.currentSlide) {
        return;
      }

      this.$emit('beforeSlide', {
        currentSlide: this.currentSlide,
        slideTo: index
      });

      const { infiniteScroll, transition } = this.config;
      const previousSlide = this.currentSlide;
      const index = infiniteScroll
        ? slideIndex
        : getInRange(slideIndex, this.trimStart, this.slidesCount - this.trimEnd);

      // Notify others if in a group and is the slide event initiator.
      if (this.group && isSource) {
        EMITTER.$emit(`slideGroup:${this.group}`, slideIndex);
      }

      this.currentSlide = index;
      this.isSliding = true;

      window.setTimeout(() => {
        this.isSliding = false;
        this.currentSlide = normalizeSlideIndex(index, this.slidesCount);
      }, transition);

      this.$emit('slide', {
        currentSlide: this.currentSlide,
        slideFrom: previousSlide
      });
    },
    slideNext() {
      this.slideTo(this.currentSlide + this.config.itemsToSlide);
    },
    slidePrev() {
      this.slideTo(this.currentSlide - this.config.itemsToSlide);
    },

    initEvents() {
      // get the element direction if not explicitly set
      if (this.defaults.rtl === null) {
        this.defaults.rtl = getComputedStyle(this.$el).direction === 'rtl';
      }

      if (this.config.autoPlay) {
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
        this.$el.addEventListener('wheel', this.onWheel, { passive: false });
      }
      window.addEventListener('resize', this.update);
    },
    initAutoPlay() {
      this.timer = new Timer(() => {
        if (this.isSliding || this.isDragging || (this.isHover && this.config.hoverPause) || this.isFocus) {
          return;
        }
        if (this.currentSlide === this.slidesCount - 1 && !this.config.infiniteScroll) {
          this.slideTo(0);
          return;
        }
        this.slideNext();
      }, this.config.playSpeed);
    },
    initDefaults() {
      this.breakpoints = this.settings.breakpoints;
      this.defaults = assign({}, this.$props, this.settings);
      this.config = assign({}, this.defaults);
    },
    // updating methods
    update() {
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
    updateTrim() {
      const { trimWhiteSpace, itemsToShow, centerMode, infiniteScroll } = this.config;
      if (!trimWhiteSpace || infiniteScroll) {
        this.trimStart = 0;
        this.trimEnd = 1;
        return;
      }
      this.trimStart = centerMode ? Math.floor((itemsToShow - 1) / 2) : 0;
      this.trimEnd = centerMode ? Math.ceil(itemsToShow / 2) : itemsToShow;
    },
    updateWidth() {
      const rect = this.$el.getBoundingClientRect();
      this.containerWidth = rect.width;
      this.containerHeight = rect.height;
      if (this.config.vertical) {
        this.slideHeight = this.containerHeight / this.config.itemsToShow;
        return;
      }
      this.slideWidth = this.containerWidth / this.config.itemsToShow;
    },
    updateConfig() {
      const breakpoints = Object.keys(this.breakpoints).sort((a, b) => b - a);
      let matched;
      breakpoints.some(breakpoint => {
        matched = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
        if (matched) {
          this.config = assign({}, this.config, this.defaults, this.breakpoints[breakpoint]);
          return true;
        }
      });
      if (!matched) {
        this.config = assign(this.config, this.defaults);
      }
    },
    restartTimer() {
      if (this.timer) {
        this.timer.restart();
      }
    },
    restart() {
      this.$nextTick(() => {
        this.update();
      });
    },
    // events handlers
    onDragStart(event) {
      this.isTouch = event.type === 'touchstart';
      if (!this.isTouch && event.button !== 0) {
        return;
      }

      this.startPosition = { x: 0, y: 0 };
      this.endPosition = { x: 0, y: 0 };
      this.isDragging = true;
      this.startPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
      this.startPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;

      document.addEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.onDrag);
      document.addEventListener(this.isTouch ? 'touchend' : 'mouseup', this.onDragEnd);
    },
    isInvalidDirection(deltaX, deltaY) {
      if (!this.config.vertical) {
        return Math.abs(deltaX) <= Math.abs(deltaY);
      }

      if (this.config.vertical) {
        return Math.abs(deltaY) <= Math.abs(deltaX);
      }

      return false;
    },
    onDrag(event) {
      if (this.isSliding) {
        return;
      }

      this.endPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
      this.endPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;
      const deltaX = this.endPosition.x - this.startPosition.x;
      const deltaY = this.endPosition.y - this.startPosition.y;
      // Maybe scrolling.
      if (this.isInvalidDirection(deltaX, deltaY)) {
        return;
      }

      this.delta.y = deltaY;
      this.delta.x = deltaX;

      if (!this.isTouch) {
        event.preventDefault();
      }
    },
    onDragEnd() {
      const tolerance = this.config.shortDrag ? 0.5 : 0.15;
      this.isDragging = false;

      if (this.config.vertical) {
        const draggedSlides = Math.round(Math.abs(this.delta.y / this.slideHeight) + tolerance);
        this.slideTo(this.currentSlide - sign(this.delta.y) * draggedSlides);
      }
      if (!this.config.vertical) {
        const direction = (this.config.rtl ? -1 : 1) * sign(this.delta.x);
        const draggedSlides = Math.round(Math.abs(this.delta.x / this.slideWidth) + tolerance);
        this.slideTo(this.currentSlide - direction * draggedSlides);
      }
      this.delta.x = 0;
      this.delta.y = 0;
      document.removeEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.onDrag);
      document.removeEventListener(this.isTouch ? 'touchend' : 'mouseup', this.onDragEnd);
      this.restartTimer();
    },
    onTransitionend() {
      this.isSliding = false;
      this.$emit('afterSlide', {
        currentSlide: this.currentSlide
      });
    },
    onKeypress(event) {
      const key = event.key;
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
    onWheel(event) {
      event.preventDefault();
      if (now() - this.lastScrollTime < 200) {
        return;
      }
      // get wheel direction
      this.lastScrollTime = now();
      const value = event.wheelDelta || -event.deltaY;
      const delta = sign(value);
      if (delta === -1) {
        this.slideNext();
      }
      if (delta === 1) {
        this.slidePrev();
      }
    },
    addGroupListeners() {
      if (!this.group) {
        return;
      }

      this._groupSlideHandler = slideIndex => {
        // set the isSource to false to prevent infinite emitting loop.
        this.slideTo(slideIndex, false);
      };
      EMITTER.$on(`slideGroup:${this.group}`, this._groupSlideHandler);
    }
  },
  created() {
    this.initDefaults();
  },
  mounted() {
    this.initEvents();
    this.addGroupListeners();
    this.$nextTick(() => {
      this.update();
      this.slideTo(this.config.initialSlide || 0);
      this.$emit('loaded');
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.update);
    if (this.group) {
      EMITTER.$off(`slideGroup:${this.group}`, this._groupSlideHandler);
    }

    if (this.timer) {
      this.timer.stop();
    }
  },
  render(h) {
    const body = renderBody.call(this, h);

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
          focusin: () => (this.isFocus = true),
          focusout: () => (this.isFocus = false),
          mouseover: () => (this.isHover = true),
          mouseleave: () => (this.isHover = false)
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
  const before = [];
  const after = [];
  // reduce prop access
  const slidesCount = slides.length;
  for (let i = 0; i < slidesCount; i++) {
    const slide = slides[i];
    const clonedBefore = cloneNode(h, slide);
    clonedBefore.data.key = `index-${i - slidesCount}`;
    clonedBefore.key = clonedBefore.data.key;
    clonedBefore.data.props = {
      index: i - slidesCount,
      isClone: true
    };

    before.push(clonedBefore);

    const clonedAfter = cloneNode(h, slide);
    clonedAfter.data.key = `index-${i + slidesCount}`;
    clonedAfter.key = clonedAfter.data.key;
    clonedAfter.data.props = {
      index: i + slidesCount,
      isClone: true
    };
    after.push(clonedAfter);
  }

  return [...before, ...slides, ...after];
}

/**
 * Produces the VNodes for the Slides.
 * requires {this} to be bound to hooper.
 * So use with .call or .bind
 */
function renderSlides(h) {
  const children = normalizeChildren(this);
  const childrenCount = children.length;
  let idx = 0;
  let slides = [];
  for (let i = 0; i < childrenCount; i++) {
    const child = children[i];
    const ctor = child.componentOptions && child.componentOptions.Ctor;
    if (!ctor || ctor.options.name !== 'HooperSlide') {
      continue;
    }

    // give slide an index behind the scenes
    child.componentOptions.propsData.index = idx;
    child.data.key = idx;
    child.key = idx;
    child.data.props = {
      ...(child.data.props || {}),
      isClone: false,
      index: idx++
    };

    slides.push(child);
  }

  // update hooper's information of the slide count.
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
  const slides = renderSlides.call(this, h);
  const addons = this.$slots['hooper-addons'] || [];
  const a11y = h(
    'div',
    {
      class: 'hooper-liveregion hooper-sr-only',
      attrs: {
        'aria-live': 'polite',
        'aria-atomic': 'true'
      }
    },
    `Item ${this.currentSlide + 1} of ${this.slidesCount}`
  );

  const children = [slides, ...addons, a11y];

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
