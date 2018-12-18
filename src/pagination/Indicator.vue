<template functional>
  <ol class="hooper-pagination">
    <li v-for="n in props.totalCount" :key="n">
      <button
        @click="props.hooper.slideTo(n - 1)"
        class="hooper-indicator"
        :class="{ 'is-active': props.currentIdx === n - 1 }"
      ></button>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'HooperIndicatorPagination',
  props: {
    currentIdx: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    hooper: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
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
</style>
