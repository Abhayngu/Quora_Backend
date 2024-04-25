const zod = require("zod");
const zodErrorHandler = require("../utils/zodErrorHandler");
const FollowService = require("../services/follow.service");
const FollowRepository = require("../repositories/follow.repository");
const { StatusCodes } = require("http-status-codes");
const followService = new FollowService(new FollowRepository());
async function followUser(req, res, next) {
  try {
    const followBody = req.params;
    const { userId, targetUserId } = followBody;
    // console.log(req.body, req.query, req.params);
    const schema = zod.object({
      userId: zod.string(),
      targetUserId: zod.string(),
    });
    const parsedResult = schema.safeParse(followBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const user = await followService.followUser(userId, targetUserId);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: `User with Id ${userId} successfully followed user with Id ${targetUserId}`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { followUser };
