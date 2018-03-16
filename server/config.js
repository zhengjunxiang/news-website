const ip = require('ip');

module.exports = {
  host: ip.address(),
  port: {
    dist: 8090,
    api: 8091
  }
};
