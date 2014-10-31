var expect = require('expect.js'),
    request = require('superagent'),
    expect = require('expect.js'),
    querystring = require('querystring'),
    crypto = require('crypto'),
    integrations;

process.env.PORT = 3001;

integrations = {
  init: function() {
    describe('tests', function() {
      it('Should complete', function(done) {
        done();
      });
    });
  }
};

module.exports = integrations;

