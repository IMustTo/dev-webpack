/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs').argv;

const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const PRO_HASH = process.env.NODE_ENV === 'production'
    ? '.[chunkhash:8]'
    : '';

// 多页面数组，如果传参则使用单页面 eg: npm run dev -- --page=demo
const pagesArr = argv.page
    ? [argv.page]
    : fs.readdirSync(path.resolve(ROOT_PATH, 'src/pages'));

const entry = Object.create(null);
const plugins = [];

pagesArr.forEach((item) => {
  const vendor = `${item}.vendor`;
  entry[item] = path.resolve(ROOT_PATH, `src/pages/${item}/main.js`);

  plugins.push(
    new HtmlwebpackPlugin({
      template: path.resolve(ROOT_PATH, `src/pages/${item}/index.html`),
      filename: `pages/${item}/index.html`,
      // chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: [vendor, item],
      // 要把script插入到body标签里
      inject: 'body',
    })
  );

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: vendor,
      filename: `assets/libs/${vendor}${PRO_HASH}.js`,
      minChunks: function(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
           path.join(ROOT_PATH, 'node_modules')
          ) === 0
        );
      },
      chunks: [item],
    })
  );
});

module.exports = {
  entry,
  plugins,

  output: {
    path: BUILD_PATH,
    filename: `assets/js/[name]${PRO_HASH}.js`,
    chunkFilename: `assets/js/[id]${PRO_HASH}.js`,
  },

  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(ROOT_PATH, 'node_modules')],
    alias: {
      'assets': path.resolve(APP_PATH, 'assets'),
      'components': path.resolve(APP_PATH, 'components'),
    },
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: APP_PATH,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: APP_PATH,
        exclude: /node_modules/
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: APP_PATH,
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: APP_PATH,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
        },
      },
    ],
  },

  eslint: {
    formatter: require('eslint-friendly-formatter'),
  },
  vue: {
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%']
      })
    ],
  },
};
