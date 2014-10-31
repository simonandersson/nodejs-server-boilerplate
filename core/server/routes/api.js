var express = require('express'),
    api = require('../api'),
    apiRoutes;

apiRoutes = function(middleware) {
  var router = express.Router();
  router.del = router.delete;
  router.get('/', api.http(api.generics.resolve));
  return router;
};

module.exports = apiRoutes;
