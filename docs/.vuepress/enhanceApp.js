import { Hooper, Fraction, Progress, Indicator } from '../../src';


export default ({ Vue }) => {
  Vue.component('Hooper', Hooper);
  Vue.component('HooperProgress', Progress);
  Vue.component('HooperFraction', Fraction);
  Vue.component('HooperIndicator', Indicator);
};
