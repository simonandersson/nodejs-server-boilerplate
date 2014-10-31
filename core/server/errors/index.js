var _ = require('lodash'),
    BadRequestError = require('../errors/badrequesterror'),
    ValidatorError = require('../errors/validatorerror'),

    errors;

errors = {
  formatErrorToJSON: function(error) {
    var statusCode = 500,
        errors = [];

    if (!_.isArray(error)) {
      error = [].concat(error);
    }

    _.each(error, function(errorItem) {
      var errorContent = {};
      statusCode = errorItem.code || 500; // Faulty
      errorContent.message = _.isString(errorItem) ? errorItem : (_.isObject(errorItem) ? errorItem.message : 'Unknown API Error');
      errorContent.type = errorItem.type || 'InternalServerError';
      errors.push(errorContent);
    });
    return { errors: errors, statusCode: statusCode };
  },
  logAndExit: function(message) {
    console.log(message);
    process.exit(0);
  },
  formatValidateJSError: function(err) {
    if (err) {
      var errors = [];
      for (var key in err) {
        var vals = err[key];
        for (var val in vals) {
          errors.push(new ValidatorError(key, vals[val]));
        }
      }
      return errors;
    }
  },
  formatValidationError: function(err) {
    if (err) {
      switch (err.name) {
        case 'ValidationError':
          var errors = [];
          for (var field in err.errors) {
            switch (err.errors[field].type) {
              case 'exists':
                errors.push(new ValidatorError(field, 'already exists'));
                break;
              case 'invalid':
                errors.push(new ValidatorError(field, 'is invalid'));
                break;
              case 'required':
                errors.push(new ValidatorError(field, 'is required'));
                break;
              case 'Error, expected `{PATH}` to be unique. Value: `{VALUE}`':
                errors.push(new ValidatorError(field, 'is already taken'));
                break;
              default:
                console.log(field);
                break;
            }
          }
          return errors;
        default:
          return new BadRequestError(err.message);
      }
    }
  }
};

module.exports = errors;