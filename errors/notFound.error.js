const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class NotFound extends BaseError {
  constructor(key, resourceName, resourceValue) {
    super(
      "Not found",
      StatusCodes.NOT_FOUND,
      `Requested ${key} for ${resourceName} '${resourceValue}' not found`,
      {
        "Resource Name": resourceName,
        "Resource Value": resourceValue,
      }
    );
  }
}

module.exports = NotFound;
