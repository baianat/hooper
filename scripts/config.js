const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const css = require('rollup-plugin-css-only');
const vue = require('rollup-plugin-vue');
const commonjs = require('rollup-plugin-commonjs');
const version = process.env.VERSION || require('../package.json').version;

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  outputFolder: path.join(__dirname, '../dist'),
}

const common = {
  name: 'hooper',
  input: path.join(paths.src, 'index.js'),
  uglifyOptions: {
    toplevel: true,
    compress: true,
    mangle: true
  },
  banner:
    `/**
  * Hopper ${version}
  * (c) ${new Date().getFullYear()}
    * @license MIT
    */`,
  plugins: [
    replace({ __VERSION__: version }),
    css({ output: 'dist/hooper.css' }),
    commonjs(),
    vue({ css: false }),
    babel(),
    resolve()
  ]
}
const builds = {
  umd: {
    format: 'umd',
    name: 'Hooper',
    ext: ''
  },
  esm: {
    format: 'es',
    ext: '.esm'
  },
  old: {
    format: 'umd',
    name: 'Hooper',
    ext: '.old'
  },
  oldEsm: {
    format: 'es',
    ext: '.old.esm'
  },
}

function getConfig (key) {
  const build = builds[key];
  const config = {
    ...build,
    input: {
      input: build.input || common.input,
      plugins: build.plugins || common.plugins,
    },
    output: {
      name: build.name || common.name,
      banner: common.banner,
      format: build.format,
      exports: 'named'
    }
  }
  return config;
}

const configs = Object.keys(builds).reduce((acc, build) => {
  acc[build] = getConfig(build);
  return acc;
}, {})

module.exports = {
  paths,
  configs,
  common
};