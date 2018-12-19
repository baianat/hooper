<template>
  <ol class="hooper-pagination">
    <li v-for="n in hooper.slidesCount" :key="n">
      <button
        @click="hooper.slideTo(n - 1)"
        class="hooper-indicator"
        :class="{ 'is-active': hooper.currentSlide === n - 1 }"
      ></button>
    </li>
  </ol>
</template>

<script>
import addonMixin from './mixin';

export default {
  name: 'HooperIndicator',
  mixins: [addonMixin]
}
</script>

<style>
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
