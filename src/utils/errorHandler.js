const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/base.error");
function errorHandler(err, req, res, next) {
  console.log("-------!!!!!!!error handler!!!!--------");
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      name: err.name,
      message: err.message,
      details: err.details,
      data: {},
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    name: "Internal Server Error",
    message: "Something went wrong",
    error: err.message,
    data: {},
  });
}

module.exports = errorHandler;
