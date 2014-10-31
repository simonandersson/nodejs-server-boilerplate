var _ = require('lodash'),
    helpers = require('../../helpers/tree.js'),
    Promise = require('bluebird'),
    models;

models = {
  excludeFiles: ['index.js'],
  init: function() {
    var self = this;
    return helpers.readDir(__dirname).then(function(files) {
      _.each(files, function(path, fileName) {
        if (_.contains(self.excludeFiles, fileName)) {
          return;
        }

        var file = require(path);
        _.extend(self, file);
      });
      return;
    });
  }
};

module.exports = models;