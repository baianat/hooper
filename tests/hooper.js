import { mount, createLocalVue } from '@vue/test-utils';
import { Hooper, Slide, Navigation } from '../src/index';

const localVue = createLocalVue();
localVue.component('Hooper', Hooper);
localVue.component('Slide', Slide);
localVue.component('Navigation', Navigation);
describe('Testing hooper component', () => {
  const wrapper = mount({
    template: `
      <hooper>
        <slide>slide 1</slide>
        <slide>slide 2</slide>
        <slide>slide 3</slide>
        <navigation slot="hooper-addons"></navigation>
      </hooper>
    `
  }, { localVue });

  test('default slot', () => {
    const slides = wrapper.findAll('.hooper-slide');
    expect(slides.length).toEqual(3);
  });
  test('addons slot', () => {
    expect(wrapper.find('.hooper-navigation').exists()).toBe(true);
    expect(wrapper.find('.hooper-next').exists()).toBe(true);
    expect(wrapper.find('.hooper-prev').exists()).toBe(true);
  });
});
