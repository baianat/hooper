import { defineClientAppEnhance } from '@vuepress/client';
import { Hooper, Slide, Progress, Pagination, Navigation } from '../../src/index.js';

export default defineClientAppEnhance(({ app }) => {
  app.component('Hooper', Hooper);
  app.component('Slide', Slide);
  app.component('HooperProgress', Progress);
  app.component('HooperPagination', Pagination);
  app.component('HooperNavigation', Navigation);
});
