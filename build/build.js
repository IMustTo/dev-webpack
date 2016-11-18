/* eslint-disable */
const path = require('path');
const ora = require('ora');
const webpack = require('webpack');
process.env.NODE_ENV = 'production';

// const webpackConfig = require('./webpack.prod.config');
const webpackConfig = require('./webpack.prod.config');

const spinner = ora('building for production...');
spinner.start();

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
