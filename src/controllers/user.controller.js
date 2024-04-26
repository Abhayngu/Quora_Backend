const BadRequest = require("../errors/badRequest.error");
const NotImplemented = require("../errors/notImplemented.error");
const zod = require("zod");
const { UserService } = require("../services/index");
const { UserRepository } = require("../repositories/index");
const { StatusCodes } = require("http-status-codes");
const zodErrorHandler = require("../utils/zodErrorHandler");

const userService = new UserService(new UserRepository());

async function createUser(req, res, next) {
  try {
    const userBody = req.body;
    const schema = zod.object({
      username: zod.string(),
      email: zod.string().email(),
    });
    const parsedResult = schema.safeParse(userBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const user = await userService.createUser(userBody);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUser(userId);
    res.status(StatusCodes.OK).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const userBody = req.body;
    const schema = zod.object({
      username: zod.string().optional(),
      email: zod.string().email().optional(),
      bio: zod.string().optional(),
    });
    if (!userBody.username && !userBody.email && !userBody.bio)
      throw new BadRequest("username, email, bio", [
        "At least one of username, email or bio should be passed",
      ]);
    const parsedResult = schema.safeParse(userBody);
    if (!parsedResult.success) {
      const issues = parsedResult.error.issues;
      const issueKeys = issues.map((issue) => issue.path[0]);
      throw new BadRequest(
        issueKeys,
        issues.map((issue) =>
          !issue.validation
            ? `Expected ${issue.path[0]} to be ${issue.expected}, but found to be ${issue.received}`
            : `${issue.message}`
        )
      );
    }
    const user = await userService.updateUser(userBody, userId);
    res.status(StatusCodes.OK).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, getUser, updateUser };
