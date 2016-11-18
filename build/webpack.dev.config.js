/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },

  devtool: 'eval-source-map',
});
