const ip = require('ip');

module.exports = {
  host: ip.address(),
  port: {
    dev: {
      cli: 8080,
      con: 8081
    },
    dist: {
      cli: 8090,
      con: 8091
    },
    api: 9000
  }
};
