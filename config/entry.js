/* eslint-disable */
const path = require('path');
const fs = require('fs');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const entryArr = fs.readdirSync(path.resolve(__dirname, '../src'));

const entry = Object.create(null);
const pages = [];

entryArr.forEach((item) => {
  entry[item] = path.resolve(__dirname, `../src/${item}/main.js`);

  pages.push(
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, `../src/${item}/index.html`),
      filename: `${item}/index.html`,
      // chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['manifest', 'vendor', `${item}`],
      // 要把script插入到标签里
      inject: 'body',
    })
  );
});

module.exports = {
  entry,
  pages,
};
