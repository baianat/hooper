import { normalizeChildren } from './utils';
import './styles/slide.css';

export default {
  name: 'HooperSlide',
  inject: ['$hooper'],
  props: {
    isClone: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    style() {
      const { config, slideHeight, slideWidth } = this.$hooper || {};
      if (config.vertical) {
        return `height: ${slideHeight}px`;
      }

      return `width: ${slideWidth}px`;
    },
    isActive() {
      const { upper, lower } = this.$hooper.slideBounds;

      return this.index >= lower && this.index <= upper;
    },
    isPrev() {
      const { lower } = this.$hooper.slideBounds;
      const { itemsToSlide } = this.$hooper.config;

      return this.index < lower && this.index >= lower - itemsToSlide;
    },
    isNext() {
      const { upper } = this.$hooper.slideBounds;
      const { itemsToSlide } = this.$hooper.config;

      return this.index > upper && this.index <= upper + itemsToSlide;
    },
    isCurrent() {
      return this.index === this.$hooper.currentSlide;
    }
  },
  render(h) {
    const classes = {
      'hooper-slide': true,
      'is-clone': this.isClone,
      'is-active': this.isActive,
      'is-prev': this.isPrev,
      'is-next': this.isNext,
      'is-current': this.isCurrent
    };

    const children = normalizeChildren(this);

    return h(
      'li',
      {
        class: classes,
        style: this.style,
        attrs: {
          'aria-hidden': !this.isActive
        }
      },
      children
    );
  }
};
