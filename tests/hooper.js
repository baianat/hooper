/**
 * @jest-environment jsdom
 */
import { mount } from '@vue/test-utils';
import { Hooper, Slide, Navigation } from '../src/index';

describe('Testing hooper component', () => {
  const wrapper = mount(
    {
      components: { Hooper, Slide, Navigation },
      template: `
      <hooper>
        <slide>slide 1</slide>
        <slide>slide 2</slide>
        <slide>slide 3</slide>

        <template v-slot:hooper-addons>
          <navigation />
        </template>
      </hooper>
    `
    },
    {
      global: {
        components: {
          Hooper,
          Slide,
          Navigation
        }
      }
    }
  );

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
