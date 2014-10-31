var path = require('path'),
    appRoot = process.env.PWD,
    corePath = path.join(appRoot, '/core'),
    clientPath = path.join(corePath, '/client'),
    
    config;

config = {
  corePath: corePath,
  appRoot: appRoot,
  clientPath: clientPath,
  publicPath: path.join(clientPath, '/public'),
  viewsPath: path.join(clientPath, '/views'),
  partialsPath: path.join(clientPath, '/views/partials')
};

module.exports = config;