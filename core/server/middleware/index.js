
var routes = require('../routes'),
    express = require('express'),
    Promise = require('bluebird'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressLayouts = require('express-ejs-layouts'),
    session = require('express-session'),
    fs = require('fs'),
    log = require('../../helpers/log'),
    BadRequestError = require('../errors/badrequesterror'),
    NotFoundError = require('../errors/notfounderror'),
    Config = require('../config'),
    Errors = require('../errors'),
    _ = require('lodash'),

    middlewares;

function init(app) {
  var self = this;
  return new Promise(function(resolve) {


    app.use(log.requestLogger);

    app.use('/public', express.static(Config.publicPath));
    
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    app.set('views', Config.viewsPath);
    app.get('/partials/*', function(req, res) {
      var filename = req.path.replace(/^\/partials\//, '');
      res.render('partials/'+filename, {
        layout: false
      });
    });
    
    app.use(cookieParser());
    app.use(session({
        secret: '96aa6e80167f1d57c92436f5b042d3a4',
        resave: true,
        saveUninitialized: true
      }
    )); // session secret
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(routes.apiBaseUri, routes.api(middlewares)); // Set up api routes
    
    app.use('/', require('../controllers/client.controller')(middlewares));

    resolve(self);
  });
}

middlewares = {
  multiparty: require('connect-multiparty'),
  init: init
};

module.exports = middlewares;