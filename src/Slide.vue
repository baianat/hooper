<template>
  <li
    class="hooper-slide"
    :class="{'hooper-clone': isClone}"
    tabindex="-1"
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
      }
    },
    computed: {
      style() {
        if (this.$hooper.$settings.vertical) {
          return `height: ${this.$hooper.slideHeight}px`
        }
        return `width: ${this.$hooper.slideWidth}px`
      }
    }
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
