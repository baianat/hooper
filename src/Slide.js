import { normalizeChildren, focusableHTMLElements } from './utils';
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
    },
    duration: {
      type: Number,
      default: null
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
  methods: {
    removeTabindex(node) {
      if (focusableHTMLElements.includes(node.tag)) {
        node.data.attrs.tabindex = -1;
      }
    },
    disableFocusIfInactive(children) {
      console.log(children);

      // children may be undefined when called recursively
      if (children) {
        for (const child of children) {
          this.removeTabindex(child);

          // Recursively disable every focusable and inactive element of this child's children
          if (child.children) {
            for (const innerChild of child.children) {
              this.removeTabindex(innerChild);
              if (innerChild.children) {
                this.disableFocusIfInactive(innerChild.children);
              }
            }
          }
        }
      }
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

    if (!this.isActive) {
      this.disableFocusIfInactive(children);
    }

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
