<template>
  <div 
    class="hooper-navigation"
    :class="{
      'is-vertical': $hooper.$settings.vertical,
      'is-rtl': $hooper.$settings.rtl,
    }"
  >
    <button
      class="hooper-next"
      :class="{ 'is-disabled': isNextDisabled  }"
      @click="$hooper.slideNext"
      v-if="$slots['hooper-next']"
    >
      <slot name="hooper-next"></slot>
    </button>
    <button
      class="hooper-prev"
      :class="{ 'is-disabled': isPrevDisabled }"
      @click="$hooper.slidePrev"
      v-if="$slots['hooper-prev']"
    >
      <slot name="hooper-prev"></slot>
    </button>
  </div>
</template>

<script>
export default {
  inject: ['$hooper'],
  name: 'HooperNavigation',
  computed: {
    isPrevDisabled () {
      if (this.$hooper.$settings.infiniteScroll) {
        return false;
      }
      return this.$hooper.tcurrentSlide === 0;
    },
    isNextDisabled () {
      if (this.$hooper.$settings.infiniteScroll) {
        return false;
      }
      return this.$hooper.currentSlide === this.$hooper.slidesCount - 1;
    }
  }
}
</script>

<style>
.hooper-next,
.hooper-prev {
  background-color: transparent;
  border: none;
  padding: 1em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.hooper-next.is-disabled,
.hooper-prev.is-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.hooper-next {
  right: 0;
}
.hooper-prev {
  left: 0;
}
.hooper-navigation.is-vertical .hooper-next {
  top: auto;
  bottom: 0;
  transform: initial;
}
.hooper-navigation.is-vertical .hooper-prev {
  top: 0;
  bottom: auto;
  right: 0;
  left: auto;
  transform: initial;
}
.hooper-navigation.is-rtl .hooper-prev {
  left: auto;
  right: 0;
}
.hooper-navigation.is-rtl .hooper-next {
  right: auto;
  left: 0;
}
</style>