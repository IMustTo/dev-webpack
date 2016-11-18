/* eslint-disable */
const path = require('path');
const config = require('./webpack.config');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(config, {
  devtool: 'source-map',

  output: {
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[id].[chunkhash:8].js'
  },
});
