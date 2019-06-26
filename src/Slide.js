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
      default: 0,
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
    lower() {
      const { config, currentSlide } = this.$hooper || {};
      const siblings = config.itemsToShow;
      return config.centerMode ? Math.ceil(currentSlide - siblings / 2) : currentSlide;
    },
    upper() {
      const { config, currentSlide } = this.$hooper || {};
      const siblings = config.itemsToShow;

      return config.centerMode ? Math.floor(currentSlide + siblings / 2) : Math.floor(currentSlide + siblings - 1);
    },
    isActive() {
      return this.index >= this.lower && this.index <= this.upper;
    },
    isPrev() {
      return this.index <= this.lower - 1;
    },
    isNext() {
      return this.index >= this.upper + 1;
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
