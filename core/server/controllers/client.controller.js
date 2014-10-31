var _ = require('lodash'),
    url = require('url'),
    express = require('express'),
    Promise = require('bluebird'),
    controller;

controller = function() {
  var router = express.Router();

  router.get('/', function(req, res) {
    res.render("main.ejs");
  });

  return router;
};

module.exports = controller;