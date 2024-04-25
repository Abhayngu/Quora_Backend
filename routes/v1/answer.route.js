const answerRouter = require("express").Router();
const { answer, comment } = require("../../controllers/index");
const commentRouter = require("./comment.route");

answerRouter.post("/:questionId/answers", answer.postAnswer);
answerRouter.put("/:answerId", answer.editAnswer);
answerRouter.post("/:answerId/comments", comment.postCommentOnAnswer);

module.exports = answerRouter;
