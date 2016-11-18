/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const entryArr = fs.readdirSync(path.resolve(__dirname, '../src/pages'));

const entry = Object.create(null);
const plugins = [];

// 如果有参数，表示是单一模块

entryArr.forEach((item) => {
  entry[item] = path.resolve(__dirname, `../src/pages/${item}/main.js`);

  plugins.push(
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, `../src/pages/${item}/index.html`),
      filename: `pages/${item}/index.html`,
      // chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: [`${item}.vendor`, item],
      // 要把script插入到标签里
      inject: 'body',
    })
  );

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: `${item}.vendor`,
      filename: `assets/libs/${item}.vendor.js`,
      minChunks: function(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
           path.join(__dirname, '../node_modules')
          ) === 0
        );
      },
      // chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: [item],
    })
  );
});


module.exports = {
  entry,
  plugins,
};
