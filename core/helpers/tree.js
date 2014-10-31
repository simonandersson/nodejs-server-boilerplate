var _ = require('bluebird'),
    Promise = require('bluebird'),
    fs = require('fs'),
    path = require('path'),
    readDirAsync = Promise.promisify(fs.readdir),
    lstatAsync = Promise.promisify(fs.lstat);

var helpers = {
  readDir: function(dir, depth) {
    depth = depth || 0;

    if (depth > 1) {
      return Promise.resolve(null);
    }
    return readDirAsync(dir).then(function(files) {
      files = files || [];
      return Promise.reduce(files, function(results, file) {
        var fpath = path.join(dir, file);
        return lstatAsync(fpath).then(function(result) {
          if (result.isDirectory()) {
            return readDir(fpath, depth + 1);
          }
          else {
            return fpath;
          }
        }).then(function(result) {
          results[file] = result;
          return results;
        });
      }, {});
    });
  }
};

module.exports = helpers;
