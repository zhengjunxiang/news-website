require('babel-core/register')
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var { host, port } = require('./config');
var routes = require('./routes');
var app = express();

require('./middleware/log/index')
require('./mongodb')

app.use('/resouce', express.static(path.join(__dirname, 'resouce')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'antpoolblog', resave: false, saveUninitialized: true}));

routes(app);

app.listen(port, host, () => {
  global.logger.info(`访问：http://${host}:${port}`);
});
