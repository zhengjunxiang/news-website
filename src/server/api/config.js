var { host, port, hostPub } = require('../../../config/ip-port');

module.exports = {
  identityKey: 'news',
  port: port.api,
  root: __dirname,
  host,
  hostPub,
  mongodb: {
    username: 'zhengjx',
    pwd: 'z8820228',
    //address: 'localhost:27017',
    address: '172.16.41.37:27017',
    db: 'admin'
  }
}
