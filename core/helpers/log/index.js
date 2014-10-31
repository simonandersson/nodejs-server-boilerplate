var colors = require('colors'),
    logs,
    getArgs;

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

getArgs = function(args, color) {
  var argss = [].slice.apply(args);
  return argss.map(function(obj) { return applyColor(obj, color); });
};

function applyColor(strOrObj, color) {
  if (typeof strOrObj === 'string') {
    return color(strOrObj);
  }
  else {
    return color(JSON.stringify(strOrObj));
  }
}

logs = {
  log: function() {
    console.log.apply(console, arguments);
  },
  logExceptTest: function() {
    if (process.env.NODE_ENV !== 'test') {
      var args = getArgs(arguments, colors.white);
      console.log.apply(console, args);
    }
  },
  warning: function() {
    var args = getArgs(arguments, colors.warn);
    console.log.apply(console, args);
  },
  requestLogger: function(req, res, next) {
    logs.logExceptTest('%s %s %s', req.method, req.url, req.path);
    next();
  }
};

module.exports = logs;