<template>
  <div 
    class="hooper-pagination"
    :class="{ 'is-vertical': $hooper.$settings.vertical }"
  >
    <ol class="hooper-indicators" v-if="mode === 'indicator'">
      <li v-for="(slide, index) in $hooper.slides" :key="index">
        <button
          @click="$hooper.slideTo(index)"
          class="hooper-indicator"
          :class="{ 'is-active': $hooper.currentSlide === index }"
        >
          <span class="hooper-sr-only">item {{ index }}</span>
        </button>
      </li>
    </ol>
    <template  v-if="mode === 'fraction'">
      <span>{{ $hooper.currentSlide + 1 }}</span>
      <span>/</span>
      <span>{{ $hooper.slidesCount }}</span>
    </template>
  </div>
</template>

<script>
export default {
  inject: ['$hooper'],
  name: 'HooperPagination',
  props: {
    mode: {
      default: 'indicator',
      type: String
    }
  },
}
</script>

<style>
.hooper-pagination {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  padding: 5px 10px;
}
.hooper-indicators {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
.hooper-indicator:hover,
.hooper-indicator.is-active {
  background-color: #4285f4;
}
.hooper-indicator {
  margin: 0 2px;
  width: 12px;
  height: 4px;
  border-radius: 4px;
  border: none;
  padding: 0;
  background-color: #fff;
  cursor: pointer;
}
.hooper-pagination.is-vertical {
  bottom: auto;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.hooper-pagination.is-vertical .hooper-indicators {
  flex-direction: column;
}
.hooper-pagination.is-vertical .hooper-indicator{
  width: 6px;
}
</style>