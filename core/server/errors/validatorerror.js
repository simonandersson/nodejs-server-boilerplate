function ValidatorError(field, description) {
  this.message = ['The field', "`"+ field +"`", description].join(' ');
  this.stack = new Error().stack;
  this.code = 400;
  this.type = this.name;
}

ValidatorError.prototype = Object.create(Error.prototype);
ValidatorError.prototype.name = 'ValidatorError';

module.exports = ValidatorError;
