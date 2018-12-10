<template>
  <div class="hooper">
    <div
      class="hooper-track"
      :class="{ 'is-dragging': isDraging }"
      ref="track"
      @mousedown="downHandler"
      @transitionend="transitionEndHandler"
      :style="`transform: translateX(${translate.x}px)`"
    >
      <slot></slot>
    </div>
    <div 
      class="hopper-navigation"
      ref="nav"
    >
      <ol class="hooper-pagination">
        <li v-for="(slide, index) in slides" :key="index">
          <button
            @click="slideTo(index)"
            class="hooper-indicator"
            :class="{ 'is-active': currentSlide === index }"
          ></button>
        </li>
      </ol>
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
    // sliding transition time in ms
    transition: {
      default: 300,
      type: Number
    }
  },
  data () {
    return {
      isDraging: false,
      isSliding: false,
      slideWidth: 0,
      slides: [],
      slidesCount: 0,
      currentSlide: 0,
      delta: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    translate () {
      const centeringSpace = this.centerMode ? (this.containerWidth - this.slideWidth) / 2 : 0;
      return {
        x: this.delta.x + centeringSpace - (this.currentSlide * this.slideWidth),
        y: 0
      }
    }
  },
  methods: {
    // controling methods
    updateWidth () {
      this.containerWidth = this.$el.offsetWidth;
      this.slideWidth = (this.containerWidth / this.$props.itemsToShow);
      this.allSlides.forEach(slide => {
        slide.style.width = `${this.slideWidth}px`;
      });
      if (this.infiniteScroll) {
        this.$refs.track.style.marginLeft = `-${this.slideWidth * this.slides.length}px`;
      }
    },
    slideTo (slideIndex) {
      const normalized = this.normalizeSlideIndex(slideIndex);
      if (this.isSliding || this.currentSlide === normalized) { 
        return;
      }
      this.$refs.track.style.transition = `${this.transition}ms`;
      this.currentSlide = normalized;
      this.isSliding = true;

      // show the onrignal slide instead of the clone
      if (this.infiniteScroll) {
        const temp = () => {
          this.normalizeCurrentSlideIndex();
          this.$refs.track.addEventListener('transitionend', temp);
        }
        this.$refs.track.addEventListener('transitionend', temp);
      }
    },
    slideNext () {
      this.slideTo(this.currentSlide + this.itemsToSlide);
    },
    slidePrev () {
      this.slideTo(this.currentSlide - this.itemsToSlide);
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
    normalizeSlideIndex (index) {
      if (this.infiniteScroll) {
        return index;
      }
      return Math.max(Math.min(index, this.slides.length - 1), 0)
    },
    normalizeCurrentSlideIndex() {
      if (this.currentSlide >= this.slidesCount) {
        this.currentSlide = this.currentSlide - this.slidesCount;
        return this.normalizeCurrentSlideIndex();
      }
      if (this.currentSlide < 0) {
        this.currentSlide = this.currentSlide + this.slidesCount;
        return this.normalizeCurrentSlideIndex();
      }
    }
  },
  created () {
    if (typeof window !== undefined) {
      window.addEventListener('resize', this.updateWidth);
    }
  },
  mounted () {
    this.slides = Array.from(this.$refs.track.children);
    this.allSlides = Array.from(this.slides);
    this.slidesCount = this.slides.length;
    this.updateWidth();
    if(this.infiniteScroll) {
      console.log('dda');
      this.initClones();
    }
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
}
.hooper-slide {
  flex-shrink: 0;
}
.hooper-pagination {
  position: absolute;
  margin: 10px 0;
  padding: 0;
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
</style>
