var mongoose = require('mongoose')
var { mongodb } = require('./config')

const options = {
  db: { native_parser: true },
  auth: {
    user: mongodb.username,
    password: mongodb.pwd
  }
}

const DB_URL = `mongodb://${mongodb.address}/${mongodb.db}`
// const DB_URL = `mongodb://${mongodb.username}:${mongodb.pwd}@${mongodb.address}/${mongodb.db}?authSource=${mongodb.db}`; // 账号登陆
mongoose.connect(DB_URL, options, err => {
  if (err) global.logger.error('数据库连接失败！')
  else global.logger.info('数据库连接成功！')
})
