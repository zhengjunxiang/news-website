var { host, port, hostPub } = require('../../../config/ip-port');

module.exports = {
  identityKey: 'news',
  port: port.api,
  root: __dirname,
  host,
  hostPub,
  mongodb: {
    // username: 'zhengjx',
    // pwd: 'z8820228',
    username: 'antpool',
    pwd: 'antpool',
    address: '127.0.0.1:27017',
    db: 'admin'
  }
}
