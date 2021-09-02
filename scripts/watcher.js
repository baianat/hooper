const { paths } = require('./config');
const { build } = require('./build');
const bs = require('browser-sync').create();

bs.init({
  open: false,
  ui: false,
  files: [
    paths.dist,
    {
      match: paths.src,
      fn(event, file) {
        build('umd');
        build('esm');
      }
    }
  ]
});
