const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const config = require('../config/config');

const isConsole = process.env.ENV_TYPE === 'console';

fs.open('./config/env.js', 'w', function(err, fd) {
  const buf = 'module.exports = "production";';
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.resolve(__dirname, `../dist/${isConsole ? 'console/src' : 'client/src'}`),
    publicPath: config.build.assetsPublicPath,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    new cleanWebpackPlugin([`dist/${isConsole ? 'console' : 'client'}/*`], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendors',
      // filename: 'vendors.[hash].js'
      name: [ 'vender-exten', 'vender-base' ],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'td_icon.ico',
        to: '../'
      }, {
        from: 'src/console/styles/fonts',
        to: 'fonts'
      }, {
        from: 'src/console/views/main-components/theme-switch/theme'
      }, {
        from: 'src/console/views/my-components/text-editor/tinymce'
      }
    ], {ignore: ['text-editor.vue']}),
    new HtmlWebpackPlugin({
      title: 'iView admin v' + package.version,
      filename: path.resolve(__dirname, `../dist/${isConsole ? 'console' : 'client'}/index.html`),
      template: '!!ejs-loader!./src/console/template/index.ejs',
      inject: false
    })
  ]
});
