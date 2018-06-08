const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const isConsole = process.env.ENV_TYPE === 'console'

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  target: 'node',
  entry: {
    skeleton: '@/skeleton/index.js'
  },
  output: {
    path: path.resolve(__dirname, `../src/${isConsole ? 'console' : 'client'}/skeleton`),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
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
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader!css-loader',
            less: 'vue-style-loader!css-loader!less-loader'
          }
        }
      }
    ]
  },
  externals: nodeExternals({
    whitelist: [/\.css$/, /\.less$/]
  }),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': isConsole ? resolve('../src/console') : resolve('../src/client')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueSSRServerPlugin({
      filename: 'skeleton.json'
    })
  ]
}
