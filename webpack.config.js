/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { entry, plugins } = require('./config');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: entry,
  output: {
    path: BUILD_PATH,
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[id].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      'assets': path.resolve(APP_PATH, 'assets'),
      'components': path.resolve(APP_PATH, 'components')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: APP_PATH,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: APP_PATH,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: APP_PATH,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=2048',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015'],
        }
      },
    ],
  },

  vue: {
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },

  eslint: {
    formatter: require('eslint-friendly-formatter')
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
  ].concat(plugins),

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/core-web/*': {
          target: 'http://manager.i3618.com.cn',
          secure: false,
      },
    },
  },

  devtool: 'eval-source-map',
};
