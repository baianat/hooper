<template>
  <div 
    class="hooper"
    :class="{
      'is-vertical': $settings.vertical,
      'is-rtl': $settings.rtl,
    }"
  >
    <div
      class="hooper-track"
      :class="{ 'is-dragging': isDraging }"
      ref="track"
      @transitionend="onTransitionend"
      :style="trackTransform"
    >
      <slot></slot>
    </div>
    <slot name="addons"></slot>
    <div 
      class="hopper-navigation"
      ref="nav"
    >
      <button
        class="hooper-next"
        :class="{ 'is-disabled': !$settings.infiniteScroll && currentSlide === slidesCount - 1 }"
        @click="slideNext"
        v-if="$slots['hooper-next']"
      >
        <slot name="hooper-next"></slot>
      </button>
      <button
        class="hooper-prev"
        :class="{ 'is-disabled': !$settings.infiniteScroll && currentSlide === 0 }"
        @click="slidePrev"
        v-if="$slots['hooper-prev']"
      >
        <slot name="hooper-prev"></slot>
      </button>
    </div>
  </div>
</template>

<script>
import { getInRange, now } from './utils';

export default {
  name: 'Hooper',
  provide () {
    return {
      hooper: this
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
      default: 3000,
      type: Number
    },
    // toggle mouse draging
    mouseDrag: {
      default: true,
      type: Boolean
    },
    // toggle touch draging
    touchDrag: {
      default: true,
      type: Boolean
    },
    // toggle mouse wheel sliding
    wheelControl: {
      default: false,
      type: Boolean
    },
    // toggle keyboard control
    keysControl: {
      default: false,
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
      slideWidth: 0,
      slideHeight: 0,
      slidesCount: 0,
      currentSlide: 0,
      trackOffset: 0,
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
    currentSlide (newVal, oldVal) {
      if (!this.$settings.infiniteScroll) {
        this.slides[newVal].classList.add('is-active');
        this.slides[oldVal].classList.remove('is-active');
        return;
      }
      this.allSlides[newVal + this.slidesCount].classList.add('is-active');
      this.allSlides[oldVal + this.slidesCount].classList.remove('is-active');
    }
  },
  methods: {
    // controling methods
    slideTo (slideIndex) {
      const index = this.$settings.infiniteScroll
        ? slideIndex 
        : getInRange(slideIndex, 0, this.slidesCount - 1);
      if (this.isSliding || this.currentSlide === index) { 
        return;
      }
      const previousSlide = this.currentSlide;
      this.$emit('beforeSlide', {
        currentSlide: this.currentSlide,
        slideTo: slideIndex
      });
      this.$refs.track.style.transition = `${this.$settings.transition}ms`;
      this.trackOffset = index;
      this.currentSlide = this.normalizeCurrentSlideIndex(index);
      this.isSliding = true;

      // show the onrignal slide instead of the cloned one
      if (this.$settings.infiniteScroll) {
        const temp = () => {
          this.trackOffset = this.normalizeCurrentSlideIndex(this.currentSlide);
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
      if (this.defaults !== null) {
        this.defaults.rtl = getComputedStyle(this.$el).direction === 'rtl';
      } 
      this.slides = Array.from(this.$refs.track.children);
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
        // todo: bind event ot carousel element
        document.addEventListener('keydown', this.onKeypress);
      }
      if (this.$settings.wheelControl) {
        this.lastScrollTime = now();
        this.$el.addEventListener('wheel', this.onWheel, { passive: false });
      }
    },
    initClones () {
      const slidesBefore = document.createDocumentFragment();
      const slidesAfter = document.createDocumentFragment();
      let before = [];
      let after = [];

      this.slides.forEach((slide) => {
        const elBefore = slide.cloneNode(true);
        const elAfter = slide.cloneNode(true);
        elBefore.classList.add('veer-clone');
        elAfter.classList.add('veer-clone');
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
      setInterval(() => {
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

    // events handlers
    onDragStart (event) {
      this.isTouch = event.type === 'touchstart';
      if (!this.isTouch && event.button !== 0) {
        return;
      }
      event.preventDefault();

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
      if (now() - this.lastScrollTime < 60) {
        return;
      }
      // get wheel direction
      const value = event.wheelDelta || -event.deltaY;
      const delta = Math.sign(value);
      if (delta === -1) {
        this.slideNext();
      }
      if (delta === 1) {
        this.slidePrev();
      }
    },

    // utitlite functions

    normalizeCurrentSlideIndex(index) {
      if (index >= this.slidesCount) {
        index = index - this.slidesCount;
        return this.normalizeCurrentSlideIndex(index);
      }
      if (index < 0) {
        index = index + this.slidesCount;
        return this.normalizeCurrentSlideIndex(index);
      }
      return index;
    }
  },
  created () {
    this.initDefaults();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.update);
    }
  },
  mounted () {
    this.init();
    this.$nextTick(() => {
      this.update();
      this.slides[this.currentSlide].classList.add('is-active');
    });
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.update);
  }
}
</script>

<style>
.hooper {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
}
.hooper * {
  box-sizing: border-box;
}
.hooper-track {
  display: flex;
  box-sizing: border-box;
  width: 100%;
}
.hooper-slide {
  flex-shrink: 0;
}

.hooper-next,
.hooper-prev {
  background-color: transparent;
  border: none;
  padding: 1em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.hooper-next.is-disabled,
.hooper-prev.is-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.hooper-next {
  right: 0;
}
.hooper-prev {
  left: 0;
}

.hooper.is-vertical .hooper-track {
  flex-direction: column;
  height: 200px;
}
.hooper.is-vertical .hooper-next {
  top: auto;
  bottom: 0;
  transform: initial;
}
.hooper.is-vertical .hooper-prev {
  top: 0;
  bottom: auto;
  right: 0;
  left: auto;
  transform: initial;
}

.hooper.is-rtl {
  direction: rtl;
}
.hooper.is-rtl .hooper-prev {
  left: auto;
  right: 0;
}
.hooper.is-rtl .hooper-next {
  right: auto;
  left: 0;
}
</style>
