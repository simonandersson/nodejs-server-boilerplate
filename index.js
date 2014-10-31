var core = require('./core'),
    log = require('./core/helpers/log');

process.env.PWD = process.cwd();

core().then(function(server) {
  server.start().then(function() {
    log.logExceptTest("Server running");
  });
}).catch(function(error) {
  console.log("Error", error);
});