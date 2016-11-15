const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const { entry } = require('./config');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: entry,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
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
      {
        test: /\.vue$/,
        loader: 'vue',
      },
    ],
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },

  plugins: [
    // 自动生成一个html文件
    new HtmlwebpackPlugin({
      title: 'Hello World app',
    }),

    // 注册全局变量
    /*
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
    */
  ],

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
