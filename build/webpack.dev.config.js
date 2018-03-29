const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const config = require('../config/config')

const isConsole = process.env.ENV_TYPE === 'console'

fs.open('./config/env.js', 'w', function(err, fd) {
  const buf = 'module.exports = "development";';
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: config.dev.devtool,
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: config.dev.host,
    port: config.dev.port[`${isConsole ? 'con' : 'cli'}`],
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'vender-exten', 'vender-base' ],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: 'Antpool Blogs',
      filename: 'index.html',
      template: isConsole ? 'src/console/index.html' : 'src/client/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/console/views/main-components/theme-switch/theme'
      }, {
        from: 'src/console/views/my-components/tinymce'
      }
    ], {ignore: ['text-editor.vue']})
  ]
});
