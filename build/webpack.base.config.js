const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isConsole = process.env.ENV_TYPE === 'console';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    main: ['@/main']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader!css-loader',
            less: 'vue-style-loader!css-loader!less-loader'
          }
        }
      }, {
        test: /iview.src.*?js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules')]
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize', 'autoprefixer-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize', 'autoprefixer-loader', 'less-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': isConsole ? resolve('src/console') : resolve('src/client'),
      '#': resolve('config'),
      '~': resolve('')
    }
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
