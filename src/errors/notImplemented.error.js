const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class NotImplemented extends BaseError {
  constructor(resourceName, details) {
    super(
      "Not Implemented",
      StatusCodes.NOT_IMPLEMENTED,
      `${resourceName} is not implemented`,
      details
    );
  }
}

module.exports = NotImplemented;
