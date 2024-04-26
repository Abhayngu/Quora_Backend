const zod = require("zod");
const zodErrorHandler = require("../utils/zodErrorHandler");
const LikeService = require("../services/like.service");
const LikeRepository = require("../repositories/like.repository");
const { StatusCodes } = require("http-status-codes");
const likeService = new LikeService(new LikeRepository());
async function likeQuestionAnswerOrComment(req, res, next) {
  try {
    let { type, id } = req.params;
    type = type.trim();
    const { userId } = req.body;
    const body = {};
    body.type = type;
    body.userId = userId;
    const schema = zod.object({
      type: zod.enum(["question", "answer", "comment"]),
      userId: zod.string(),
    });
    const parsedResult = schema.safeParse(body);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    let data = await likeService.likeQuestionAnswerOrComment(type, id, userId);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: `Liked ${type} of id ${id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { likeQuestionAnswerOrComment };
