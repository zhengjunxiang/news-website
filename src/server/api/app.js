// require('babel-core/register')
var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var helmet = require('helmet');
const MongoStore = require('connect-mongo')(session)
var { host, port, identityKey, mongodb, hostPub } = require('./config');
var routes = require('./routes');
var app = express();

const h = process.env.ENV_TYPE === 'publish' ? hostPub : host;

require('./middleware/log/index')
require('./mongodb')

fs.stat(path.join(__dirname, 'resouce'), (err, stats) => {
  if (err) global.logger.error(err);
  if (!stats) {
    fs.mkdir(path.resolve(__dirname, 'resouce'), '0777', function (err) {
      if (err) global.logger.error(err);
    });
  }
});

// const DB_URL = `mongodb://${mongodb.address}/${mongodb.db}`
const DB_URL = `mongodb://${mongodb.username}:${mongodb.pwd}@${mongodb.address}/${mongodb.db}`; // 账号登陆

app.use('/resouce', express.static(path.join(__dirname, 'resouce')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.set('trust proxy', 1)
app.use(session({
  name: identityKey,
  secret: Math.floor(Math.random() * 9999) + '',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: DB_URL // mongodb 地址
  }),
  cookie: {
    maxAge: 60 * 1000 * 60 * 8
  }
}));

routes(app);

app.listen(port, h, () => {
  global.logger.info(`访问：http://${h}:${port}`);
});
