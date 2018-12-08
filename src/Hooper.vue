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
    itemsToShow: {
      default: 3,
      type: Number
    },
    itemsToSlide: {
      default: 1,
      type: Number
    },
    infiniteScroll: {
      defulat: false,
      type: Boolean
    },
    centerMode: {
      default: false,
      type: Boolean
    },
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
      currentSlide: 0,
      delta: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    translate () {
      return {
        x: this.delta.x - (this.currentSlide * this.slideWidth),
        y: 0
      }
    }
  },
  methods: {
    updateWidth () {
      this.containerWidth = this.$el.offsetWidth;
      this.slideWidth = (this.containerWidth / this.$props.itemsToShow);
      this.slides.forEach(slide => {
        slide.style.width = `${this.slideWidth}px`;
      })
    },
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
    normalizeSlideIndex (index) {
      return Math.max(Math.min(index, this.slides.length - 1), 0)
    },
    slideTo (slideIndex) {
      const normalized = this.normalizeSlideIndex(slideIndex);
      if (this.isSliding || this.currentSlide === normalized) { 
        return;
      }
      this.$refs.track.style.transition = `${this.transition}ms`;
      this.currentSlide = normalized;
      this.isSliding = true;
    },
    slideNext () {
      this.slideTo(this.currentSlide + this.itemsToSlide);
    },
    slidePrev () {
      this.slideTo(this.currentSlide - this.itemsToSlide);
    }
  },
  mounted () {
    this.slides = Array.from(this.$refs.track.children);
    this.updateWidth();
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
