<template>
  <div class="hooper-pagination">
    <span>{{ hooper.currentSlide + 1 }}</span>
    <span>/</span>
    <span>{{ hooper.slidesCount }}</span>
  </div>
</template>

<script>
export default {
  name: 'HooperFraction',
  inject: ['hooper']
};
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

.hooper.is-vertical .hooper-pagination {
  bottom: auto;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}
</style>
