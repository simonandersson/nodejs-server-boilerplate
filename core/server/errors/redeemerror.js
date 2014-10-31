function RedeemError(message) {
  this.message = message;
  this.stack = new Error().stack;
  this.code = 403;
  this.type = this.name;
}

RedeemError.prototype = Object.create(Error.prototype);
RedeemError.prototype.name = 'RedeemError';

module.exports = RedeemError;
