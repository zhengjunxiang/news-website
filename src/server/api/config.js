var { host, port } = require('../../../config/ip-port');

module.exports = {
  identityKey: 'news',
  port: port.api,
  root: __dirname,
  host,
  mongodb: {
    username: 'zhengjx',
    pwd: 'z8820228',
    address: 'localhost:27017',
    db: 'admin'
  }
}
