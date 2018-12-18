<template functional>
  <div class="hooper-progress">
    <div class="hooper-progress-inner" :style="`width: ${props.currentIdx * 100 / (props.totalCount - 1)}%`"></div>
  </div>
</template>

<script>
export default {
  name: 'HooperProgress',
  props: {
    currentIdx: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
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
