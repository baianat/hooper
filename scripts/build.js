const fs = require('fs');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const path = require('path');
const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { rollup } = require('rollup');
const { promisify } = require('util');
const { builds, paths } = require('./config');

const mkdirp = promisify(mkdirpNode);

build('umd');
build('es');

async function build (format) {
  await mkdirp(paths.dist);
  console.log(chalk.cyan(`Generating ${format} build...`));

  const bundle = await rollup(builds.input);
  const { output } = await bundle.generate({
    format,
    ...builds.output
  });

  const code = output[0].code;
  let extensions = format === 'es' ? '.esm' : '';
  const outputPath = path.join(paths.dist, `hooper${extensions}.js`);
  fs.writeFile(outputPath, code, (err) => {
    if (err) {
      throw err;
    }
    let stats = getStats({ code, path: outputPath });
    console.log(`${chalk.green(`Output File: hooper ${format}`).padEnd(35, ' ')} ${stats}`);
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