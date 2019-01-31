const fs = require('fs');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const path = require('path');
const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { rollup } = require('rollup');
const { promisify } = require('util');
const { configs, paths, common } = require('./config');

const mkdirp = promisify(mkdirpNode);

build('umd');
build('esm');

async function build (build) {
  await mkdirp(paths.dist);
  console.log(chalk.cyan(`Generating ${build} build...`));
  const bundle = await rollup(configs[build].input);
  const { output } = await bundle.generate(configs[build].output);
  const code = output[0].code;
  
  const outputPath = path.join(paths.dist, `${common.name}${configs[build].ext}.js`);
  fs.writeFile(outputPath, code, (err) => {
    if (err) {
      throw err;
    }
    let stats = getStats({ code, path: outputPath });
    console.log(`${chalk.green(`Output File: hooper ${build}`).padEnd(35, ' ')} ${stats}`);
  });
}

function getStats ({ path, code }) {
  const { size } = fs.statSync(path);
  const gzipped = gzipSize.sync(code);

  return `Size: ${filesize(size)} | Gzip: ${filesize(gzipped)}`;
}

module.exports = {
  build
};