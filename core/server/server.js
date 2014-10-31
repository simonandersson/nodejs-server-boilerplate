var middleware = require('./middleware'),
    Promise = require('bluebird');

function Server(app) {
  this.app = app;
  this.server = null;
}

Server.prototype.start = function() {
  var self = this,
      app = self.app;

  return new Promise(function(resolve) {
    var port = process.env.PORT || 3000;
    var server = app.listen(port, function() {
      middleware.init(app).then(function() {
        resolve(self);
      });
    });

    self.server = server;
  });
};

Server.prototype.stop = function() {
  var self = this;
  return new Promise(function(resolve) {
    if (self.server === null) {
      resolve(self);
    }
    else {
      self.server.close(function() {
        self.server = null;
        resolve(self);
      });
    }
  });
};

module.exports = Server;