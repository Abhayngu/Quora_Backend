const BadRequest = require("../errors/badRequest.error");

function zodErrorHandler(parsedResult) {
  try {
    const issues = parsedResult.error.issues;
    const issueKeys = issues.map((issue) => issue.path[0]);
    throw new BadRequest(
      issueKeys,
      issues.map((issue) =>
        !issue.validation
          ? `${issue.message}${
              issue.path.length > 0
                ? ` at path ${issue.path.map((p) => p)}`
                : ""
            }`
          : `${issue.message}`
      )
    );
  } catch (err) {
    throw err;
  }
}

module.exports = zodErrorHandler;
