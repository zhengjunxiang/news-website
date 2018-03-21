const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');
const config = require('../config/config')

fs.open('./config/env.js', 'w', function(err, fd) {
  const buf = 'module.exports = "development";';
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = merge(webpackBaseConfig, {
  devtool: config.dev.devtool,
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
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
      name: [
        'vender-exten', 'vender-base'
      ],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: 'iView admin v' + package.version,
      filename: '../index.html',
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/console/views/main-components/theme-switch/theme'
      }, {
        from: 'src/console/views/my-components/text-editor/tinymce'
      }
    ], {ignore: ['text-editor.vue']})
  ]
});
