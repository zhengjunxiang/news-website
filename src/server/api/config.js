var { host, port } = require('../../../config/ip-port');

const auth = {
  admin_secret: 'admin-token',
  tokenKey: 'Token-Auth'
}

module.exports = {
  port: port.api,
  host,
  auth,
  mongodb: {
    username: 'cd',
    pwd: 123456,
    address: 'localhost:27017',
    db: 'antpoolblog'
  }
}
