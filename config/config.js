const Env = require('./env');
const { host, port } = require('./ip-port');
const path = require('path')

let config = {
  env: Env,
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/dist/',
    proxyTable: {
      '/**/*.json': {
        target: { host, protocol: 'http:', port: port.api },
        secure: false,
        changeOrigin: true
      }
    },
    host, // can be overwritten by process.env.HOST
    port: port.dev, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: '#source-map',
    cacheBusting: true,
    cssSourceMap: false
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: [ 'js', 'css' ],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};

module.exports = config;
