const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config/config')

const isConsole = process.env.ENV_TYPE === 'console'

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    skeleton: '@/skeleton/index.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': isConsole ? resolve('../src/console') : resolve('../src/client')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: config.dev.host,
    port: 8888,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Antpool New',
      filename: 'index.html',
      template: isConsole ? 'src/console/index.html' : 'src/client/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}
