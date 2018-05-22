var log4js = require('log4js');

const isPublish = process.env.ENV_TYPE === 'publish';

log4js.configure({
  appenders: {
    out: {
      type: 'stdout'
    },
    app: {
      type: 'file',
      filename: 'application.log'
    }
  },
  categories: {
    default: {
      appenders: [ 'out', 'app' ],
      level: isPublish ? 'error' : 'debug'
      // level: 'debug'
    }
  }
});
global.logger = log4js.getLogger();
