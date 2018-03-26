var mongoose = require('mongoose')
var conf = require('./config')
var bluebird = require('bluebird');

mongoose.Promise = bluebird;

const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`
// const DB_URL = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}`; // 账号登陆
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, err => {
  if (err) global.logger.error('数据库连接失败！')
  else global.logger.info('数据库连接成功！')
})
