/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs').argv;

let entryArr = fs.readdirSync(path.resolve(__dirname, '../src/pages'));

// 单页面启动传参 eg: npm run dev -- --page=demo
if (argv.page) {
  entryArr = [argv.page];
}

const entry = Object.create(null);
const plugins = [];

// 如果有参数，表示是单一模块

entryArr.forEach((item) => {
  const vendor = `${item}.vendor`;
  entry[item] = path.resolve(__dirname, `../src/pages/${item}/main.js`);

  plugins.push(
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, `../src/pages/${item}/index.html`),
      filename: `pages/${item}/index.html`,
      // chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: [vendor, item],
      // 要把script插入到标签里
      inject: 'body',
    })
  );

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: vendor,
      filename: `assets/libs/${vendor}.js`,
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
