var Promise = require('bluebird'),
    _ = require('lodash'),
    errors = require('../errors'),
    BadRequestError = require('../errors/badrequesterror'),
    ValidatorError = require('../errors/validatorerror'),
    config = require('../config'),

    generic;


generic = {
  resolve: function(req, options) {
    return new Promise(function(resolve, reject) {
      resolve({ status: "OK" });
    });
  }
};

module.exports = generic;