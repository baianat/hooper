<template functional>
  <li class="hooper-slide" tabindex="-1">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'HooperSlide'
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
