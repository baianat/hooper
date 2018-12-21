import { mount, createLocalVue } from '@vue/test-utils';
import { Hooper, Slide } from '../src/index';

const Vue = createLocalVue();
Vue.component('Hooper', Hooper);
Vue.component('Slide', Slide);
describe('Testing hooper component', () => {
  test('default slots', () => {
    const wrapper = mount({
      template: `
        <hooper>
          <slide>slide 1</slide>
        </hooper>
      `
    }, { localVue: Vue });
    expect(wrapper.html()).toMatch(/<div class="hooper-slide">slide 1<\/div>/);;
  })
})