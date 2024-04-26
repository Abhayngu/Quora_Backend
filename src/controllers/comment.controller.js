const zod = require("zod");
const zodErrorHandler = require("../utils/zodErrorHandler");
const CommentRepository = require("../repositories/comment.repository");
const CommentService = require("../services/comment.service");
const { StatusCodes } = require("http-status-codes");
const commentService = new CommentService(new CommentRepository());
async function postCommentOnAnswer(req, res, next) {
  try {
    const answerId = req.params.answerId;
    const commentBody = req.body;
    const schema = zod.object({
      text: zod.string(),
    });
    const parsedResult = schema.safeParse(commentBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const comment = await commentService.postCommentOnAnswer(
      answerId,
      commentBody
    );
    res.status(StatusCodes.CREATED).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
}

async function postCommentOnComment(req, res, next) {
  try {
    const commentId = req.params.commentId;
    const commentBody = req.body;
    const schema = zod.object({
      text: zod.string(),
    });
    const parsedResult = schema.safeParse(commentBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const comment = await commentService.postCommentOnComment(
      commentId,
      commentBody
    );
    res.status(StatusCodes.CREATED).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
}

module.exports = { postCommentOnAnswer, postCommentOnComment };
