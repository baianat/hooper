<template>
  <div class="hooper" :class="{ 'is-vertical': $settings.vertical }">
    <div
      class="hooper-track"
      :class="{ 'is-dragging': isDraging }"
      ref="track"
      @mousedown="downHandler"
      @transitionend="transitionEndHandler"
      :style="trackStyle"
    >
      <slot></slot>
    </div>
    <div class="hooper-progress" v-if="$settings.progress">
      <div class="hooper-progress-inner" :style="`width: ${getInRange(currentSlide) * 100 / (slidesCount - 1)}%`"></div>
    </div>
    <ol class="hooper-pagination" v-if="$settings.pagination === 'indecator'">
      <li v-for="(slide, index) in slides" :key="index">
        <button
          @click="slideTo(index)"
          class="hooper-indicator"
          :class="{ 'is-active': getInRange(currentSlide) === index }"
        ></button>
      </li>
    </ol>
    <div class="hooper-pagination" v-if="$settings.pagination === 'fraction'">
      <span>{{ getInRange(currentSlide) + 1 }}</span>
      <span>/</span>
      <span>{{ slidesCount }}</span>
    </div>
    <div 
      class="hopper-navigation"
      ref="nav"
    >
      <button
        class="hooper-next"
        @click="slideNext"
        v-if="$slots['hooper-next']"
      >
        <slot name="hooper-next"></slot>
      </button>
      <button
        class="hooper-prev"
        @click="slidePrev"
        v-if="$slots['hooper-prev']"
      >
        <slot name="hooper-prev"></slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hooper',
  props: {
    // count of items to showen per view
    itemsToShow: {
      default: 1,
      type: Number
    },
    // conut of items to slide when use navigation buttons
    itemsToSlide: {
      default: 1,
      type: Number
    },
    // enable infinite scrolling mode
    infiniteScroll: {
      default: false,
      type: Boolean
    },
    // enable center mode
    centerMode: {
      default: false,
      type: Boolean
    },
    // enable progress slider
    progress: {
      default: false,
      type: Boolean
    },
    // enable auto sliding to carosaul
    autoPlay: {
      default: false,
      type: Boolean
    },
    // speed of auto play to trigger slide
    playSpeed: {
      default: 3000,
      type: Number
    },
    // sliding transition time in ms
    transition: {
      default: 300,
      type: Number
    },
    // the type of pagination indecator, progress or fraction
    pagination: {
      default: 'indecator',
      type: String
    },
    // vertical sliding mode
    vertical: {
      default: false,
      type: Boolean
    },
    // an object to pass all settings
    settings: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      isDraging: false,
      isSliding: false,
      slideWidth: 0,
      slideHeight: 0,
      slides: [],
      slidesCount: 0,
      currentSlide: 0,
      $settings: {},
      $defaults: {},
      $breakpoints:{},
      delta: { x: 0, y: 0 }
    }
  },
  computed: {
    translate () {
      const centeringSpace = this.$settings.centerMode ? (this.containerWidth - this.slideWidth) / 2 : 0;
      if (this.$settings.vertical) {
        return {
          x: 0,
          y: this.delta.y - (this.currentSlide * this.slideHeight)
        }
      }
      return {
        x: this.delta.x + centeringSpace - (this.currentSlide * this.slideWidth),
        y: 0
      }
    },
    trackStyle () {
      const { infiniteScroll, vertical } = this.$settings;
      let marginLeft = 0;
      let marginTop = 0;
      if (infiniteScroll && !vertical) {
        marginLeft = this.slideWidth * this.slidesCount;
      }
      if (infiniteScroll && vertical) {
        marginTop = this.slideHeight * this.slidesCount;
      }
      return `transform: translate(${this.translate.x - marginLeft}px, ${this.translate.y - marginTop}px);`
    }
  },
  methods: {
    // controling methods
    slideTo (slideIndex) {
      const index = this.$settings.infiniteScroll ? slideIndex :this.getInRange(slideIndex);
      if (this.isSliding || this.currentSlide === index) { 
        return;
      }
      this.$refs.track.style.transition = `${this.$settings.transition}ms`;
      this.currentSlide = index;
      this.isSliding = true;

      // show the onrignal slide instead of the clone
      if (this.$settings.infiniteScroll) {
        const temp = () => {
          this.currentSlide = this.normalizeCurrentSlideIndex(this.currentSlide);
          this.$refs.track.addEventListener('transitionend', temp);
        }
        this.$refs.track.addEventListener('transitionend', temp);
      }
    },
    slideNext () {
      this.slideTo(this.currentSlide + this.$settings.itemsToSlide);
    },
    slidePrev () {
      this.slideTo(this.currentSlide - this.$settings.itemsToSlide);
    },

    // init methods
    initClones () {
      const slidesBefore = document.createDocumentFragment();
      const slidesAfter = document.createDocumentFragment();
      this.slides.forEach((slide) => {
        const before = slide.cloneNode(true);
        const after = slide.cloneNode(true);
        before.classList.add('veer-clone');
        after.classList.add('veer-clone');
        slidesBefore.appendChild(before);
        slidesAfter.appendChild(after);
        this.allSlides.push(before, after);
      });
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
      this.$breakpoints = this.settings.breakpoints;
      this.$defaults = {...this.$props, ...this.settings};
      this.$settings = this.$defaults;
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
      if (!this.$breakpoints) {
        return;
      }
      const breakpoints = Object.keys(this.$breakpoints).sort((a, b) => a - b);
      let matched;
      breakpoints.forEach(breakpoint => {
        if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches) {
          this.$settings = Object.assign({}, this.$defaults, this.$breakpoints[breakpoint]);
          matched = breakpoint;
          return;
        }
      });
      if (!matched) {
        this.$settings = this.$defaults;
      }
    },

    // events handlers
    downHandler (event) {
      if (event.button !== 0) return;
      event.preventDefault();

      this.startPosition = { x: 0, y: 0 };
      this.endPosition = { x: 0, y: 0 };
      this.isDraging = true;
      this.startPosition.x = event.clientX;
      this.startPosition.y = event.clientY;

      document.addEventListener('mousemove', this.moveHandler);
      document.addEventListener('mouseup', this.upHandler);
    },
    moveHandler (event) {
      this.endPosition.x = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
      this.endPosition.y = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
      this.delta.x = this.endPosition.x - this.startPosition.x;
      this.delta.y = this.endPosition.y - this.startPosition.y;
    },
    upHandler () {
      document.removeEventListener('mousemove', this.moveHandler);
      document.removeEventListener('mouseup', this.upHandler);
      document.removeEventListener('touchmove', this.moveHandler);
      document.removeEventListener('touchend', this.upHandler);

      const draggedSlides = Math.round(Math.abs(this.delta.x / this.slideWidth) + 0.5);
      this.slideTo(this.currentSlide - Math.sign(this.delta.x) * draggedSlides);
      this.isDraging = false;
      this.delta.x = 0;
      this.delta.y = 0;
    },
    transitionEndHandler () {
      this.$refs.track.style.transition = '';
      this.isSliding = false;
    },

    // utitlite functions
    getInRange (index) {
      return Math.max(Math.min(index, this.slides.length - 1), 0)
    },
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
    if (typeof window !== undefined) {
      window.addEventListener('resize', this.update);
    }
  },
  mounted () {
    this.slides = Array.from(this.$refs.track.children);
    this.allSlides = Array.from(this.slides);
    this.slidesCount = this.slides.length;
    if(this.$settings.infiniteScroll) {
      this.initClones();
    }
    if(this.$settings.autoPlay) {
      this.initAutoPlay();
    }
    this.$nextTick(() => {
      this.update();
    });
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
.hooper-pagination {
  position: absolute;
  margin: 0;
  padding: 5px 10px;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  list-style: none;
}
.hooper-indicator {
  margin: 0 2px;
  width: 12px;
  height: 4px;
  border-radius: 2px;
  border: none;
  padding: 0;
  background-color: #fff;
  cursor: pointer;
}
.hooper-indicator:hover,
.hooper-indicator.is-active {
  background-color: #4285f4;
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
.hooper-next {
  right: 0;
}
.hooper-prev {
  left: 0;
}
.hooper-progress {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
  background-color: #efefef;
}
.hooper-progress-inner {
  height: 100%;
  background-color: #4285f4;
  transition: 300ms;
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
.hooper.is-vertical .hooper-pagination {
  bottom: auto;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}
.hooper.is-vertical .hooper-indicator {
  width: 4px;
}
</style>
