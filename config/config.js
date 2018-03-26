const Env = require('./env');
const { host, port } = require('./ip-port');

let config = {
  env: Env,
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
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
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: false
  },
  build: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/src/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: [ 'js', 'css' ],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};

module.exports = config;
