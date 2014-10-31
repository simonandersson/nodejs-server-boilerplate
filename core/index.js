// # Bootloader

var server = require('./server');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function make(options) {
  options = options || {};
  return server(options);
}

module.exports = make;