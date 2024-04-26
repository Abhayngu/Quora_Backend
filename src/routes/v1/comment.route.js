const commentRouter = require("express").Router();
const { comment } = require("../../controllers/index");
commentRouter.post("/:commentId/comments", comment.postCommentOnComment);
module.exports = commentRouter;
