<template>
  <li
    class="hooper-slide"
    :class="{
      'is-clone': isClone, 
      'is-active': state === 'active',
      'is-prev': state === 'prev',
      'is-next': state === 'next'
    }"
    :aria-hidden="state !== 'active'"
    :style="style"
  >
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'HooperSlide',
    inject: ['$hooper'],
    props: {
      isClone: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      }
    },

    computed: {
      style() {
        if (this.$hooper.$settings.vertical) {
          return `height: ${this.$hooper.slideHeight}px`;
        }
        return `width: ${this.$hooper.slideWidth}px`;
      },
      state() {
        const { $settings, currentSlide, slidesCount } = this.$hooper || {};
        const siblings = $settings.itemsToShow;

        const lower = $settings.centerMode
          ? Math.ceil(currentSlide - siblings / 2)
          : currentSlide;
        const upper = $settings.centerMode
          ? Math.floor(currentSlide + siblings / 2)
          : Math.floor(currentSlide + siblings - 1);

        if (this.index >= lower  && this.index <= upper) {
          return 'active';
        }
        if (this.index <= lower - 1) {
          return 'prev';
        }
        if (this.index >= upper + 1) {
          return 'next';
        }
        return '';
      }
    },
  }
</script>

<style>
.hooper-slide {
  flex-shrink: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
