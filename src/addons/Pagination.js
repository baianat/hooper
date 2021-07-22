import { h } from 'vue';
import { normalizeSlideIndex } from '../utils';
import '../styles/pagination.css';

function renderFraction(h, current, totalCount) {
  return [h('span', current + 1), h('span', '/'), h('span', totalCount)];
}

function renderIndicator(h, index, isCurrent, onClick) {
  return h('li', [
    h(
      'button',
      {
        class: { 'hooper-indicator': true, 'is-active': isCurrent },
        onClick: onClick,
        type: 'button'
      },
      [h('span', { class: 'hooper-sr-only' }, `item ${index}`)]
    )
  ]);
}

function renderDefault(h, current, totalCount, slideToIndex) {
  const children = [];
  for (let i = 0; i < totalCount; i++) {
    children.push(renderIndicator(h, i, i === current, () => slideToIndex(i)));
  }

  return [
    h(
      'ol',
      {
        class: 'hooper-indicators'
      },
      children
    )
  ];
}

export default {
  inject: ['$hooper'],
  name: 'HooperPagination',
  props: {
    mode: {
      default: 'indicator',
      type: String
    }
  },
  computed: {
    currentSlide() {
      return normalizeSlideIndex(this.$hooper.currentSlide.value, this.$hooper.slidesCount.value);
    },
    slides() {
      const slides = this.$hooper.slides.value.map((_, index) => index);
      return slides.slice(
        this.$hooper.trimStart.value,
        this.$hooper.slidesCount.value - this.$hooper.trimEnd.value + 1
      );
    }
  },
  render() {
    const totalCount = this.$hooper.slidesCount.value;
    const children =
      this.mode === 'indicator'
        ? renderDefault(h, this.currentSlide, totalCount, index => this.$hooper.slideTo(index))
        : renderFraction(h, this.currentSlide, totalCount);

    return h(
      'div',
      {
        class: {
          'hooper-pagination': true,
          'is-vertical': this.$hooper.config.value.vertical
        }
      },
      children
    );
  }
};
