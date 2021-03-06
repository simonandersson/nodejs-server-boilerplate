/*jshint -W079 */

var _ = require('lodash'),
    Promise = require('bluebird'),
    generics = require('./generic'),
    Errors = require('../errors'),
    log = require('../../helpers/log'),

    http;


http = function(method) {
  return function(req, res) {
    var object = req.body,
        response;
    
    object.files = req.files;
    object.params = req.params;
    object.query = req.query;

    return method(req, object).then(function onSuccess(result) {
      response = result;
      // Add custom headers
      return;
    }).then(function() {
      res.json(response || {});
    }).catch(function onError(err) {
      // Handle error
      var errors = Errors.formatErrorToJSON(err);
      res.status(errors.statusCode).json({ errors: errors.errors });
    });
  };
};

module.exports = {
  http: http,
  generics: generics
};