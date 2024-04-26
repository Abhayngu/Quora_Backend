const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends BaseError {
  constructor(propertyName, details, message) {
    super(
      "Bad request",
      StatusCodes.BAD_REQUEST,
      message ? message : `Invalid structure for ${propertyName} provided`,
      details
    );
  }
}

module.exports = BadRequest;
