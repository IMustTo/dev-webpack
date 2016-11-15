/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const { entry, pages } = require('./config');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: entry,
  output: {
    path: BUILD_PATH,
    filename: '[name].[chunkhash].js',
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
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, 'node_modules')
          ) === 0
        )
      }
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // 自动生成一个html文件
    // new HtmlwebpackPlugin({
    //   template: path.resolve(__dirname, `src/demo/index.html`),
    //   filename: 'index.html',
    //   // chunks这个参数告诉插件要引用entry里面的哪几个入口
    //   chunks: ['manifest', 'vendor', 'demo'],
    //   // 要把script插入到标签里
    //   inject: 'body',
    // }),

    // 注册全局变量
    /*
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
    */
  ].concat(pages),

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
