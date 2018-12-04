const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const version = process.env.VERSION || require('../package.json').version;

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
}
const builds = {
  input: {
    input: path.join(paths.src, 'hooper.js'),
    plugins: [
      replace({ __VERSION__: version }),
      babel(),
      resolve()
    ]
  },
  output: {
    name: 'hooper',
    banner:
      `/**
    * Hopper ${version}
    * (c) ${new Date().getFullYear()}
      * @license MIT
      */`,
      outputFolder: path.join(__dirname, '../dist'),
  }
};

const uglifyOptions = {
  toplevel: true,
  compress: true,
  mangle: true
}

module.exports = {
  paths,
  builds,
  uglifyOptions
};