<template functional>
  <div class="hooper-pagination">
    <span>{{ props.currentIdx + 1 }}</span>
    <span>/</span>
    <span>{{ props.totalCount }}</span>
  </div>
</template>

<script>
export default {
  name: 'HooperFractionPagination',
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
};
</script>
