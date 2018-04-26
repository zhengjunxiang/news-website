require('babel-core/register')
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var helmet = require('helmet');
var { host, port, identityKey } = require('./config');
var routes = require('./routes');
var app = express();

require('./middleware/log/index')
require('./mongodb')

app.use('/resouce', express.static(path.join(__dirname, 'resouce')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.set('trust proxy', 1)
app.use(session({
  name: identityKey,
  secret: Math.floor(Math.random() * 9999) + '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000 * 60 * 8
  }
}));

routes(app);

app.listen(port, host, () => {
  global.logger.info(`访问：http://${host}:${port}`);
});
