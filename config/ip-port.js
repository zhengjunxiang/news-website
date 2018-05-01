const ip = require('ip');

module.exports = {
  host: ip.address(),
  hostPub: '0.0.0.0',
  port: {
    dev: {
      cli: 8080,
      con: 8081
    },
    dist: {
      cli: 8090,
      con: 8091
    },
    pub: {
      cli: 80,
      con: 8080
    },
    api: 9000
  }
};
