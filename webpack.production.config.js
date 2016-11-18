/* eslint-disable */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.config');

module.exports = merge(config, {
  devtool: 'source-map',

  output: {
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[id].[chunkhash:8].js',
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
});
