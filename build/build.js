/* eslint-disable */
require('shelljs/global');
env.NODE_ENV = 'production';

const path = require('path');
const ora = require('ora');
const webpack = require('webpack');

const webpackConfig = require('./webpack.prod.config');

const spinner = ora('building for production...');
spinner.start();

rm('-rf', path.resolve(__dirname, '../dist'));
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
