import { h } from 'vue';
import { normalizeSlideIndex } from '../utils';
import '../styles/progress.css';

export default {
  inject: ['$hooper'],
  name: 'HooperProgress',
  computed: {
    currentSlide() {
      return normalizeSlideIndex(this.$hooper.currentSlide.value, this.$hooper.slidesCount.value);
    },
    progress() {
      const range = this.$hooper.slidesCount.value - this.$hooper.trimStart.value - this.$hooper.trimEnd.value;
      return ((this.currentSlide - this.$hooper.trimStart.value) * 100) / range;
    }
  },
  render() {
    return h('div', { class: 'hooper-progress' }, [
      h('div', { class: 'hooper-progress-inner', style: `width: ${this.progress}%` })
    ]);
  }
};
