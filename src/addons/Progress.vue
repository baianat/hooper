<script>
import addonMixin from './mixin';

export default {
  name: 'HooperProgress',
  mixins: [addonMixin],
  render (h) {
    const progressNode = h('div', {
      staticClass: 'hooper-progress-inner',
      style: {
        width: `${this.hooper.currentSlide * 100 / (this.hooper.slidesCount - 1)}%`
      }
    });    

    return h('div', {
      staticClass: 'hooper-progress'
    }, [progressNode]);
  }
}
</script>

<style>
.hooper-progress {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
  background-color: #efefef;
}
.hooper-progress-inner {
  height: 100%;
  background-color: #4285f4;
  transition: 300ms;
}
</style>
