var log4js = require('log4js');

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
      level: 'debug'
      // level: 'off'
    }
  }
});
global.logger = log4js.getLogger();
