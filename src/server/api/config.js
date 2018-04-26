var { host, port } = require('../../../config/ip-port');

module.exports = {
  identityKey: 'news',
  port: port.api,
  root: __dirname,
  host,
  mongodb: {
    username: 'cd',
    pwd: 123456,
    address: 'localhost:27017',
    db: 'antpoolblog'
  }
}
