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
const config = require('../config/config');

const isConsole = process.env.ENV_TYPE === 'console';

const copyPlugin = isConsole ? new CopyWebpackPlugin([
  {
    from: 'ant_icon.ico',
    to: '../'
  }, {
    from: 'src/console/styles/fonts',
    to: 'fonts'
  }, {
    from: 'src/console/views/main-components/theme-switch/theme'
  }, {
    from: 'src/console/views/my-components/tinymce'
  }
], {ignore: ['text-editor.vue']}) :
new CopyWebpackPlugin([{
  from: 'ant_icon.ico',
  to: '../'
}])

module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.resolve(__dirname, `../dist/${isConsole ? 'console/src' : 'client/src'}`),
    publicPath: config.build.assetsPublicPath,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new cleanWebpackPlugin([`dist/${isConsole ? 'console' : 'client'}/*`], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true}),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'vender-exten', 'vender-base' ],
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      async: 'vendor-async',
      children: true,
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
    copyPlugin,
    new HtmlWebpackPlugin({
      title: 'Antpool News',
      filename: path.resolve(__dirname, `../dist/${isConsole ? 'console' : 'client'}/index.html`),
      template: `!!ejs-loader!./src/${isConsole ? 'console' : 'client'}/template/index.ejs`,
      inject: true
    })
  ]
});
