<template>
  <div 
    class="hooper-navigation"
    :class="{
      'is-vertical': $hooper.$settings.vertical,
      'is-rtl': $hooper.$settings.rtl,
    }"
  >
    <button
      type="button"
      class="hooper-prev"
      :class="{ 'is-disabled': isPrevDisabled }"
      @click="slidePrev"
    >
      <slot name="hooper-prev">
        <icons name="arrowLeft"/>
      </slot>
    </button>
    <button
      type="button"
      class="hooper-next"
      :class="{ 'is-disabled': isNextDisabled  }"
      @click="slideNext"
    >
      <slot name="hooper-next">
        <icons name="arrowRight"/>
      </slot>
    </button>
  </div>
</template>

<script>
import Icons from './Icons';

export default {
  inject: ['$hooper'],
  name: 'HooperNavigation',
  components: {
    Icons
  },
  computed: {
    isPrevDisabled () {
      if (this.$hooper.$settings.infiniteScroll) {
        return false;
      }
      return this.$hooper.currentSlide === 0;
    },
    isNextDisabled () {
      if (this.$hooper.$settings.infiniteScroll) {
        return false;
      }
      return this.$hooper.currentSlide === this.$hooper.slidesCount - 1;
    }
  },
  methods: {
    slideNext () {
      this.$hooper.slideNext();
      this.$hooper.restartTiemr();
    },
    slidePrev () {
      this.$hooper.slidePrev();
      this.$hooper.restartTiemr();
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