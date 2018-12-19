<template>
  <div class="hooper-progress">
    <div
      class="hooper-progress-inner"
      :style="`width: ${$hooper.currentSlide * 100 / ($hooper.slidesCount - 1)}%`"
    >
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$hooper'],
  name: 'HooperProgress'
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