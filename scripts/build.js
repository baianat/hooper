const fs = require('fs');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const path = require('path');
const chalk = require('chalk');
const uglify = require('uglify-js');
const mkdirpNode = require('mkdirp');
const { rollup } = require('rollup');
const { promisify } = require('util');
const { configs, paths, common } = require('./config');

const mkdirp = promisify(mkdirpNode);

build('umd');
build('esm');

async function build (build) {
  await mkdirp(paths.dist);
  const config = configs[build]; 
  console.log(chalk.cyan(`Generating ${build} build...`));
  const bundle = await rollup(config.input);
  const { output } = await bundle.generate(config.output);
  const code = output[0].code;
  
  let fileName = `${common.name}${config.ext}.js`;
  let outputPath = path.join(paths.dist, fileName);

  fs.writeFileSync(outputPath, code);
  let stats = getStats({ code, path: outputPath });
  console.log(`${chalk.green(`Output File: ${fileName}`).padEnd(40, ' ')} ${stats}`);

  if (!config.minify) {
    return;
  }
  fileName = fileName.replace('.js', '') + '.min.js';
  outputPath = path.join(paths.dist, fileName);

  fs.writeFileSync(outputPath, uglify.minify(code, common.uglifyOptions).code);
  stats = getStats({ code, path: outputPath });
  console.log(`${chalk.green(`Output File: ${fileName}`).padEnd(40, ' ')} ${stats}`);
}

function getStats ({ path, code }) {
  const { size } = fs.statSync(path);
  const gzipped = gzipSize.sync(code);

  return `Size: ${filesize(size)} | Gzip: ${filesize(gzipped)}`;
}

module.exports = {
  build
};