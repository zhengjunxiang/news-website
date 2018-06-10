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

const copyPlugin = isConsole ? new CopyWebpackPlugin([
  {
    from: 'src/console/views/my-components/tinymce'
  }
], {ignore: ['text-editor.vue']}) :
new CopyWebpackPlugin([])

module.exports = merge(webpackBaseConfig, {
  entry: {
    main: '@/main'
  },
  devtool: config.dev.devtool,
  output: {
    // publicPath: config.dev.assetsPublicPath,
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Antpool New',
      filename: 'index.html',
      template: isConsole ? 'src/console/index-sk.html' : 'src/client/index-sk.html',
      inject: true
    }),
    copyPlugin
  ]
});
