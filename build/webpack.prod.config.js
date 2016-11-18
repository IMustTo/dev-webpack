/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
});
