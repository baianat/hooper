<template>
  <div class="hooper-progress">
    <div
      class="hooper-progress-inner"
      :style="`width: ${progress}%`"
    >
    </div>
  </div>
</template>

<script>
import { normalizeSlideIndex } from '../utils';

export default {
  inject: ['$hooper'],
  name: 'HooperProgress',
  computed: {
    currentSlide() {
      return normalizeSlideIndex(
        this.$hooper.currentSlide,
        this.$hooper.slidesCount
      );
    },
    progress() {
      return this.currentSlide * 100 / (this.$hooper.slidesCount - 1);
    }
  }
}
</script>

<style>
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
</style>