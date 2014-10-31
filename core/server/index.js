var express = require('express'),
    Promise = require('bluebird'),
    Server = require('./server'),
    init;

init = function(options) {
  var app = express();
  
  return Promise.resolve().then(function() {
    return new Server(app);
  });
};

module.exports = init;