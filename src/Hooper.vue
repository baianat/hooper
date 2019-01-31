<template>
  <section
    class="hooper"
    tabindex="0"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @focusin="isFocus = true"
    @focusout="isFocus = false"
    :class="{
      'is-vertical': $settings.vertical,
      'is-rtl': $settings.rtl,
    }"
  >
    <div class="hooper-list">
      <ul
        class="hooper-track"
        :class="{ 'is-dragging': isDraging }"
        ref="track"
        @transitionend="onTransitionend"
        :style="trackTransform"
      >
        <slot></slot>
      </ul>
    </div>
    <slot name="hooper-addons"></slot>
    <div class="hooper-liveregion hooper-sr-only" aria-live="polite" aria-atomic="true">
      {{ `Item ${currentSlide + 1} of ${slidesCount}` }}
    </div>
  </section>
</template>

<script>
import { getInRange, now, Timer, normalizeSlideIndex } from './utils';

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
    // enable auto sliding to carousal
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
      isDraging: false,
      isSliding: false,
      isTouch: false,
      isHover: false,
      isFocus: false,
      slideWidth: 0,
      slideHeight: 0,
      slidesCount: 0,
      currentSlide: 0,
      trackOffset: 0,
      timer: null,
      slides: [],
      allSlides: [],
      defaults: {},
      breakpoints:{},
      delta: { x: 0, y: 0 },
      $settings: {}
    }
  },
  computed: {
    trackTransform () {
      const { infiniteScroll, vertical, rtl, centerMode } = this.$settings;
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
        translate = this.delta.y + direction * (centeringSpace - this.trackOffset * this.slideHeight);
        return `transform: translate(0, ${translate - clonesSpace}px);`
      }
      if (!vertical) {
        translate = this.delta.x + direction * (centeringSpace - this.trackOffset * this.slideWidth);
        return `transform: translate(${translate - clonesSpace}px, 0);`
      }
    }
  },
  watch: {
    trackOffset (val) {
      this.updateSlidesStatus(val);
    }
  },
  methods: {
    // controling methods
    slideTo (slideIndex, mute = false) {
      const previousSlide = this.currentSlide;
      const index = this.$settings.infiniteScroll
        ? slideIndex
        : getInRange(slideIndex, 0, this.slidesCount - 1);

      this.$emit('beforeSlide', {
        currentSlide: this.currentSlide,
        slideTo: index
      });
      if (this.syncEl && !mute) {
        this.syncEl.slideTo(slideIndex, true);
      }
      this.$refs.track.style.transition = `${this.$settings.transition}ms`;
      this.trackOffset = index;
      this.currentSlide = normalizeSlideIndex(index, this.slidesCount);
      this.isSliding = true;
      window.setTimeout(() => {
        this.$refs.track.style.transition = '';
        this.isSliding = false;
      }, this.$settings.transition);

      // show the onrignal slide instead of the cloned one
      if (this.$settings.infiniteScroll) {
        const temp = () => {
          this.trackOffset = normalizeSlideIndex(this.currentSlide, this.slidesCount);
          this.$refs.track.removeEventListener('transitionend', temp);
        }
        this.$refs.track.addEventListener('transitionend', temp);
      }

      this.$emit('slide', {
        currentSlide: this.currentSlide,
        slideFrom: previousSlide
      });
    },
    slideNext () {
      this.slideTo(this.currentSlide + this.$settings.itemsToSlide);
    },
    slidePrev () {
      this.slideTo(this.currentSlide - this.$settings.itemsToSlide);
    },

    // init methods
    init () {
      // get the element direction if not explicitly set
      if (this.defaults.rtl === null) {
        this.defaults.rtl = getComputedStyle(this.$el).direction === 'rtl';
      }
      this.slides = Array.from(this.$refs.track.children);
      console.log(this.slides);
      this.allSlides = Array.from(this.slides);
      this.slidesCount = this.slides.length;
      if (this.$settings.infiniteScroll) {
        this.initClones();
      }
      if (this.$settings.autoPlay) {
        this.initAutoPlay();
      }
      if (this.$settings.mouseDrag) {
        this.$refs.track.addEventListener('mousedown', this.onDragStart);
      }
      if (this.$settings.touchDrag) {
        this.$refs.track.addEventListener('touchstart', this.onDragStart, { passive: true });
      }
      if (this.$settings.keysControl) {
        this.$el.addEventListener('keydown', this.onKeypress);
      }
      if (this.$settings.wheelControl) {
        this.lastScrollTime = now();
        this.$el.addEventListener('wheel', this.onWheel, { passive: false });
      }
      if (this.$settings.sync) {
        const el = this.$parent.$refs[this.$settings.sync]

        if (!el) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`Hooper: expects an element with attribute ref="${this.$settings.sync}", but found none.`);
          }
          return;
        }
        this.syncEl = this.$parent.$refs[this.$settings.sync];
        this.syncEl.syncEl = this;
      }
      window.addEventListener('resize', this.update);
    },
    initClones () {
      const slidesBefore = document.createDocumentFragment();
      const slidesAfter = document.createDocumentFragment();
      let before = [];
      let after = [];

      this.slides.forEach((slide) => {
        const elBefore = slide.cloneNode(true);
        const elAfter = slide.cloneNode(true);
        elBefore.classList.add('hooper-clone');
        elAfter.classList.add('hooper-clone');
        slidesBefore.appendChild(elBefore);
        slidesAfter.appendChild(elAfter);
        before.push(elBefore);
        after.push(elAfter);
      });
      this.allSlides.push(...after);
      this.allSlides.unshift(...before);
      this.$refs.track.appendChild(slidesAfter);
      this.$refs.track.insertBefore(slidesBefore, this.$refs.track.firstChild);
    },
    initAutoPlay () {
      this.timer = new Timer(() => {
        if (
          this.isSliding ||
          this.isDraging ||
          this.isHover ||
          this.isFocus
        ) {
          return;
        }
        if (
          this.currentSlide === this.slidesCount - 1 &&
          !this.$settings.infiniteScroll
        ) {
          this.slideTo(0);
          return;
        }
        this.slideNext();
      }, this.$settings.playSpeed);
    },
    initDefaults () {
      this.breakpoints = this.settings.breakpoints;
      this.defaults = {...this.$props, ...this.settings};
      this.$settings = this.defaults;
    },

    // updating methods
    update () {
      this.updateBreakpoints();
      this.updateWidth();
      this.updateSlidesStatus(this.currentSlide);
      this.$emit('updated', {
        containerWidth: this.containerWidth,
        containerHeight: this.containerHeight,
        slideWidth: this.slideWidth,
        slideHeight: this.slideHeight,
        settings: this.$settings
      });
    },
    updateWidth () {
      const rect = this.$el.getBoundingClientRect();
      this.containerWidth = rect.width;
      this.containerHeight = rect.height;
      this.slideWidth = (this.containerWidth / this.$settings.itemsToShow);
      this.slideHeight = (this.containerHeight / this.$settings.itemsToShow);
      this.allSlides.forEach(slide => {
        if (this.$settings.vertical) {
          slide.style.height = `${this.slideHeight}px`;
          return;
        }
        slide.style.width = `${this.slideWidth}px`;
      });
    },
    updateBreakpoints () {
      if (!this.breakpoints) {
        return;
      }
      const breakpoints = Object.keys(this.breakpoints).sort((a, b) => a - b);
      let matched;
      breakpoints.forEach(breakpoint => {
        if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches) {
          this.$settings = Object.assign({}, this.defaults, this.breakpoints[breakpoint]);
          matched = breakpoint;
          return;
        }
      });
      if (!matched) {
        this.$settings = this.defaults;
      }
    },
    updateSlidesStatus (index) {
      const indexShift = this.$settings.infiniteScroll ? this.slidesCount : 0;
      const current = index + indexShift;
      const siblings = this.$settings.itemsToShow;

      this.allSlides.forEach((slide, index) => {
        const lower = this.$settings.centerMode ? Math.ceil(current - siblings / 2) : current
        const upper = this.$settings.centerMode ? Math.floor(current + siblings / 2) : Math.floor(current + siblings - 1)
        if (index >= lower  && index <= upper) {
          slide.classList.remove('is-prev', 'is-next');
          slide.classList.add('is-active');
          slide.removeAttribute('aria-hidden');
          return;
        }
        slide.classList.remove('is-active', 'is-prev', 'is-next');
        slide.setAttribute('aria-hidden', true);
        if (index <= lower - 1) {
          slide.classList.add('is-prev');
        }
        if (index >= upper + 1) {
          slide.classList.add('is-next');
        }
      });
    },
    restartTiemr () {
      if (this.timer) {
        this.timer.restart();
      }
    },

    // events handlers
    onDragStart (event) {
      this.isTouch = event.type === 'touchstart';
      if (!this.isTouch && event.button !== 0) {
        return;
      }

      this.startPosition = { x: 0, y: 0 };
      this.endPosition = { x: 0, y: 0 };
      this.isDraging = true;
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
    },
    onDrag (event) {
      if (this.isSliding) {
        return;
      }
      this.endPosition.x = this.isTouch ? event.touches[0].clientX : event.clientX;
      this.endPosition.y = this.isTouch ? event.touches[0].clientY : event.clientY;
      this.delta.x = this.endPosition.x - this.startPosition.x;
      this.delta.y = this.endPosition.y - this.startPosition.y;
    },
    onDragEnd () {
      const tolerance = this.$settings.shortDrag ? 0.5 : 0.15;
      if (this.$settings.vertical) {
        const draggedSlides = Math.round(Math.abs(this.delta.y / this.slideHeight) + tolerance);
        this.slideTo(this.currentSlide - Math.sign(this.delta.y) * draggedSlides);
      }
      if (!this.$settings.vertical) {
        const direction = (this.$settings.rtl ? -1 : 1) * Math.sign(this.delta.x);
        const draggedSlides = Math.round(Math.abs(this.delta.x / this.slideWidth) + tolerance);
        this.slideTo(this.currentSlide - direction * draggedSlides);
      }
      this.isDraging = false;
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
      this.restartTiemr();
    },
    onTransitionend () {
      this.$refs.track.style.transition = '';
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
      if (this.$settings.vertical) {
        if (key === 'ArrowUp') {
          this.slidePrev();
        }
        if (key === 'ArrowDown') {
          this.slideNext();
        }
        return;
      }
      if (this.$settings.rtl) {
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
    }
  },
  created () {
    this.initDefaults();
  },
  mounted () {
    this.init();
    this.$nextTick(() => {
      this.update();
      this.slideTo(this.initialSlide);
      this.slides[this.currentSlide].classList.add('is-active');
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
