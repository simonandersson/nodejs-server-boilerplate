var core = require('../');

before(function(done) {
  core().then(function(server) {
    server.start().then(function() {
      done();
    });
  }).catch(function(error) {
    log.warning("Error", error);
  });
});

require('./integration').init();
