function BadRequestError(message) {
  this.message = message;
  this.stack = new Error().stack;
  this.code = 404;
  this.type = this.name;
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.name = 'NotFoundError';

module.exports = BadRequestError;
