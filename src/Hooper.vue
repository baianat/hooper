<template>
  <section
    class="hooper"
    tabindex="0"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @focusin="isFocus = true"
    @focusout="isFocus = false"
    :class="{
      'is-vertical': config.vertical,
      'is-rtl': config.rtl,
    }"
  >
    <div class="hooper-list">
      <ul
        class="hooper-track"
        :class="{ 'is-dragging': isDragging }"
        ref="track"
        @transitionend="onTransitionend"
        :style="trackTransform + trackTransition"
      >
        <slot name="clone-before"></slot>
        <slot></slot>
        <slot name="clone-after"></slot>

      </ul>
    </div>
    <slot name="hooper-addons"></slot>
    <div class="hooper-liveregion hooper-sr-only" aria-live="polite" aria-atomic="true">
      {{ `Item ${currentSlide + 1} of ${slidesCount}` }}
    </div>
  </section>
</template>

<script>
import { getInRange, now, Timer, normalizeSlideIndex, cloneSlide } from './utils';

export default {
  name: 'Hooper',
  provide () {
    return {
      $hooper: this
    }
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
    // sync two carousels to slide together
    sync: {
      default: '',
      type: String
    },
    // pause autoPlay on mousehover
    hoverPause : {
        default: true,
        type: Boolean
    },
    // an object to pass all settings
    settings: {
      default() {
        return {};
      },
      type: Object
    }
  },
  data () {
    return {
      isDragging: false,
      isSliding: false,
      isTouch: false,
      isHover: false,
      isFocus: false,
      slideWidth: 0,
      slideHeight: 0,
      slidesCount: 0,
      currentSlide: 0,
      timer: null,
      slides: [],
      defaults: {},
      breakpoints:{},
      delta: { x: 0, y: 0 },
      config: {}
    }
  },
  computed: {
    trackTransform () {
      const { infiniteScroll, vertical, rtl, centerMode } = this.config;
      const direction = rtl ? -1 : 1;
      let clonesSpace = 0;
      let centeringSpace = 0;
      let translate = 0;
      if (centerMode) {
        centeringSpace = vertical
        ? (this.containerHeight - this.slideHeight) / 2
        : (this.containerWidth - this.slideWidth) / 2;
      }
      if (infiniteScroll) {
        clonesSpace = vertical
        ? this.slideHeight * this.slidesCount
        : this.slideWidth * this.slidesCount * direction;
      }
      if (vertical) {
        translate = this.delta.y + direction * (centeringSpace - this.currentSlide * this.slideHeight);
        return `transform: translate(0, ${translate - clonesSpace}px);`
      }
      if (!vertical) {
        translate = this.delta.x + direction * (centeringSpace - this.currentSlide * this.slideWidth);
        return `transform: translate(${translate - clonesSpace}px, 0);`
      }
    },
    trackTransition() {
      if (this.isSliding) {
        return `transition: ${this.config.transition}ms`;
      }
      return '';
    }
  },
  methods: {
    // controlling methods
    slideTo (slideIndex, mute = false) {
      if (this.isSliding || slideIndex === this.currentSlide) {
        return;
      }

      this.$emit('beforeSlide', {
        currentSlide: this.currentSlide,
        slideTo: index
      });

      const previousSlide = this.currentSlide;
      const index = this.config.infiniteScroll
        ? slideIndex
        : getInRange(slideIndex, 0, this.slidesCount - 1);
      if (this.syncEl && !mute) {
        this.syncEl.slideTo(slideIndex, true);
      }
      this.currentSlide = index;
      this.isSliding = true;

      window.setTimeout(() => {
        this.isSliding = false;
        this.currentSlide = normalizeSlideIndex(index, this.slidesCount);
      }, this.config.transition);

      this.$emit('slide', {
        currentSlide: this.currentSlide,
        slideFrom: previousSlide
      });
    },
    slideNext () {
      this.slideTo(this.currentSlide + this.config.itemsToSlide);
    },
    slidePrev () {
      this.slideTo(this.currentSlide - this.config.itemsToSlide);
    },

    initEvents () {
      // get the element direction if not explicitly set
      if (this.defaults.rtl === null) {
        this.defaults.rtl = getComputedStyle(this.$el).direction === 'rtl';
      }

      if (this.config.autoPlay) {
        this.initAutoPlay();
      }
      if (this.config.mouseDrag) {
        this.$refs.track.addEventListener('mousedown', this.onDragStart);
      }
      if (this.config.touchDrag) {
        this.$refs.track.addEventListener('touchstart', this.onDragStart, { passive: true });
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
    initSync () {
      if (this.config.sync) {
        const el = this.$parent.$refs[this.config.sync];

        if (!el && process && process.env.NODE_ENV !== 'production') {
          console.warn(`Hooper: expects an element with attribute ref="${this.config.sync}", but found none.`);
          return;
        }

        this.syncEl = this.$parent.$refs[this.config.sync];
        this.syncEl.syncEl = this;
      }
    },
    getCurrentSlideTimeout() {
        var curIdx = normalizeSlideIndex(this.currentSlide, this.slidesCount);
        return this.slides[curIdx].componentOptions.propsData.duration;
    }, // switched to using a timeout which defaults to the prop set on this component, but can be overridden on a per slide basis.
    initAutoPlay () {
        this.timer = new Timer(() => {
          if (this.isSliding
                  || this.isDragging
                  || (this.isHover && this.hoverPause)
                  || this.isFocus)
          {
            this.timer.set(this.getCurrentSlideTimeout());
            return;
          }

          if (this.currentSlide === this.slidesCount - -1 && !this.config.infiniteScroll ){
            this.slideTo(0);
            this.timer.set(this.getCurrentSlideTimeout());
            return;
          }
          this.slideNext();
          this.timer.set(this.getCurrentSlideTimeout());
        }, this.config.playSpeed);
    },
    initDefaults () {
      this.breakpoints = this.settings.breakpoints;
      this.defaults = Object.assign({}, this.$props, this.settings);
      this.config = Object.assign({}, this.defaults);
    },
    initSlides () {
      this.slides = this.filteredSlides();
      this.slidesCount = this.slides.length;
      this.slides.forEach((slide, indx) => {
        slide.componentOptions.propsData.index = indx;
      });
      if (this.config.infiniteScroll) {
        const before = [];
        const after = [];
        this.slides.forEach((slide, indx) => {
          before.push(cloneSlide(slide, indx - this.slidesCount));
          after.push(cloneSlide(slide, indx + this.slidesCount));
        });
        this.$slots['clone-before'] = before;
        this.$slots['clone-after'] = after;
      }
    },

    // updating methods
    update () {
      if (this.breakpoints) {
        this.updateConfig();
      }
      this.updateWidth();
      this.$emit('updated', {
        containerWidth: this.containerWidth,
        containerHeight: this.containerHeight,
        slideWidth: this.slideWidth,
        slideHeight: this.slideHeight,
        settings: this.config
      });
    },
    updateWidth () {
      const rect = this.$el.getBoundingClientRect();
      this.containerWidth = rect.width;
      this.containerHeight = rect.height;
      if (this.config.vertical) {
        this.slideHeight = (this.containerHeight / this.config.itemsToShow);
        return;
      }
      this.slideWidth = (this.containerWidth / this.config.itemsToShow);
    },
    updateConfig () {
      const breakpoints = Object.keys(this.breakpoints).sort((a, b) => b - a);
      let matched;
      breakpoints.some(breakpoint => {
        matched = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
        if (matched) {
          this.config = Object.assign(
            {},
            this.config,
            this.defaults,
            this.breakpoints[breakpoint]
          );
          return true;
        }
      });
      if (!matched) {
        this.config = Object.assign(this.config, this.defaults);
      }
    },
    restartTimer () {
      if (this.timer) {
        this.timer.restart();
      }
    },
    restart () {
      this.initSlides();
      this.$nextTick(() => {
        this.update();
      });
    },

    // events handlers
    onDragStart (event) {
      this.isTouch = event.type === 'touchstart';
      if (!this.isTouch && event.button !== 0) {
        return;
      }

      this.startPosition = { x: 0, y: 0 };
      this.endPosition = { x: 0, y: 0 };
      this.isDragging = true;
      this.startPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
      this.startPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;

      document.addEventListener(
        this.isTouch ? 'touchmove' : 'mousemove',
        this.onDrag
      );
      document.addEventListener(
        this.isTouch ? 'touchend' : 'mouseup',
        this.onDragEnd
      );

      e.preventDefault();
    },
    onDrag (event) {
      if (this.isSliding) {
        return;
      }
      this.endPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
      this.endPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;
      this.delta.x = this.endPosition.x - this.startPosition.x;
      this.delta.y = this.endPosition.y - this.startPosition.y;

      e.preventDefault();
    },
    onDragEnd () {
      const tolerance = this.config.shortDrag ? 0.5 : 0.15;
      this.isDragging = false;

      if (this.config.vertical) {
        const draggedSlides = Math.round(Math.abs(this.delta.y / this.slideHeight) + tolerance);
        this.slideTo(this.currentSlide - Math.sign(this.delta.y) * draggedSlides);
      }
      if (!this.config.vertical) {
        const direction = (this.config.rtl ? -1 : 1) * Math.sign(this.delta.x);
        const draggedSlides = Math.round(Math.abs(this.delta.x / this.slideWidth) + tolerance);
        this.slideTo(this.currentSlide - direction * draggedSlides);
      }
      this.delta.x = 0;
      this.delta.y = 0;
      document.removeEventListener(
        this.isTouch ? 'touchmove' : 'mousemove',
        this.onDrag
      );
      document.removeEventListener(
        this.isTouch ? 'touchend' : 'mouseup',
        this.onDragEnd
      );
      this.restartTimer();
    },
    onTransitionend () {
      this.isSliding = false;
      this.$emit('afterSlide', {
        currentSlide: this.currentSlide
      });
    },
    onKeypress (event) {
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
    onWheel (event) {
      event.preventDefault();
      if (now() - this.lastScrollTime < 200) {
        return;
      }
      // get wheel direction
      this.lastScrollTime = now();
      const value = event.wheelDelta || -event.deltaY;
      const delta = Math.sign(value);
      if (delta === -1) {
        this.slideNext();
      }
      if (delta === 1) {
        this.slidePrev();
      }
    },

    filteredSlides() {
      return this.$slots.default.filter(el => {
        if (!el.componentOptions || !el.componentOptions.Ctor) {
          return false;
        }
        return el.componentOptions.Ctor.options.name === 'HooperSlide';
      });
    }
  },
  beforeUpdate () {
    const isForcUpdated =
      this.config.infiniteScroll &&
      (
        !this.$slots['clone-before'] ||
        !this.$slots['clone-after']
      );
    const isSlidesUpdated = this.filteredSlides().length !== this.slidesCount;


    if (isForcUpdated || isSlidesUpdated) {
      this.initSlides();
    }
  },
  created () {
    this.initDefaults();
    this.initSlides();
  },
  mounted () {
    this.initEvents();
    this.$nextTick(() => {
      this.initSync();
      this.update();
      this.slideTo(this.config.initialSlide);
      this.$emit('loaded');
    });
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.update);
    if (this.timer) {
      this.timer.stop();
    }
  }
}
</script>

<style>
.hooper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
}
.hooper * {
  box-sizing: border-box;
}
.hooper-list {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.hooper-track {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.hooper.is-vertical .hooper-track {
  flex-direction: column;
  height: 200px;
}

.hooper.is-rtl {
  direction: rtl;
}

.hooper-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

</style>
