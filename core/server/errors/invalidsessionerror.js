function InvalidSessionError() {
  this.message = "Invalid Session";
  this.stack = new Error().stack;
  this.code = 403;
  this.type = this.name;
}

InvalidSessionError.prototype = Object.create(Error.prototype);
InvalidSessionError.prototype.name = 'InvalidSessionError';

module.exports = InvalidSessionError;
