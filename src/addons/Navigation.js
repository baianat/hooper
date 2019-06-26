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
    slot && slot.length
      ? slot
      : h(Icon, {
          props: {
            name: iconName(isVertical, isRTL, isPrev)
          }
        });

  return h(
    'button',
    {
      class: {
        [`hooper-${isPrev ? 'prev' : 'next'}`]: true,
        'is-disabled': disabled
      },
      attrs: {
        type: 'button'
      },
      on: {
        click: onClick
      }
    },
    children
  );
}

export default {
  inject: ['$hooper'],
  name: 'HooperNavigation',
  computed: {
    isPrevDisabled() {
      if (this.$hooper.config.infiniteScroll) {
        return false;
      }
      return this.$hooper.currentSlide === 0;
    },
    isNextDisabled() {
      if (this.$hooper.config.infiniteScroll) {
        return false;
      }
      return this.$hooper.currentSlide === this.$hooper.slidesCount - 1;
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
  render(h) {
    const config = {
      isRTL: this.$hooper.config.rtl,
      isVertical: this.$hooper.config.vertical
    };

    const children = [
      renderButton(h, this.isPrevDisabled, this.$slots['hooper-prev'], true, config, () => this.slidePrev()),
      renderButton(h, this.isNextDisabled, this.$slots['hooper-next'], true, config, () => this.slideNext())
    ];

    return h(
      'div',
      {
        class: {
          'hooper-navigation': true,
          'is-vertical': this.$hooper.config.vertical,
          'is-rtl': this.$hooper.config.rtl
        }
      },
      children
    );
  }
};
