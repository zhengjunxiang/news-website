var express = require('express');
var mongoose = require('mongoose');
var log4js = require('log4js');
var bluebird = require('bluebird');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var { host, port } = require('../config');
var routes = require('./routes');
var app = express();

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
    }
  }
});
global.logger = log4js.getLogger();
global.db = mongoose.connect('mongodb://localhost:27017/antpoolblog');
mongoose.Promise = bluebird;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'antpoolblog', resave: false, saveUninitialized: true}));

routes(app);

var server = app.listen(port.api, host, () => {
  global.logger.info(`访问：http://${host}:${port.api}`);
});

global.users = {};

module.exports = {
  close: () => {
    server.close();
  }
};
