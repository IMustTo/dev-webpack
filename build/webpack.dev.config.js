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
    // proxy: {
    //   '/core-web/*': {
    //       target: 'http://manager.i3618.com.cn',
    //       secure: false,
    //   },
    // },
  },

  devtool: 'eval-source-map',
});
