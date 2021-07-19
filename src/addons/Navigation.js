import { h } from 'vue';
import Icon from './Icon';
import '../styles/navigation.css';

function iconName(isVertical, isRTL, isPrev) {
  if (isPrev) {
    return isVertical ? 'arrowUp' : isRTL ? 'arrowRight' : 'arrowLeft';
  }

  return isVertical ? 'arrowDown' : isRTL ? 'arrowLeft' : 'arrowRight';
}

function renderButton(h, disabled, slot, isPrev, { isVertical, isRTL }, onClick) {
  const children =
    slot && slot() && slot().length
      ? slot()
      : [
          h(Icon, {
            name: iconName(isVertical, isRTL, isPrev)
          })
        ];

  return h(
    'button',
    {
      class: {
        [`hooper-${isPrev ? 'prev' : 'next'}`]: true,
        'is-disabled': disabled
      },
      type: 'button',
      onClick: onClick
    },
    children
  );
}

export default {
  inject: ['$hooper'],
  name: 'HooperNavigation',
  computed: {
    isPrevDisabled() {
      if (this.$hooper.config.value.infiniteScroll) {
        return false;
      }
      return this.$hooper.currentSlide.value === 0;
    },
    isNextDisabled() {
      if (this.$hooper.config.value.infiniteScroll) {
        return false;
      }

      if (this.$hooper.config.value.trimWhiteSpace) {
        return (
          this.$hooper.currentSlide.value ===
          this.$hooper.slidesCount.value -
            Math.min(this.$hooper.config.value.itemsToShow, this.$hooper.slidesCount.value)
        );
      }

      return this.$hooper.currentSlide.value === this.$hooper.slidesCount.value - 1;
    }
  },
  methods: {
    slideNext() {
      this.$hooper.slideNext();
      this.$hooper.restartTimer();
    },
    slidePrev() {
      this.$hooper.slidePrev();
      this.$hooper.restartTimer();
    }
  },
  render() {
    const config = {
      isRTL: this.$hooper.config.value.rtl,
      isVertical: this.$hooper.config.value.vertical
    };

    const children = [
      renderButton(h, this.isPrevDisabled, this.$slots['hooper-prev'], true, config, () => this.slidePrev()),
      renderButton(h, this.isNextDisabled, this.$slots['hooper-next'], false, config, () => this.slideNext())
    ];

    return h(
      'div',
      {
        class: {
          'hooper-navigation': true,
          'is-vertical': this.$hooper.config.value.vertical,
          'is-rtl': this.$hooper.config.value.rtl
        }
      },
      children
    );
  }
};
