const answerRouter = require("./answer.route");
const commentRouter = require("./comment.route");
const followRouter = require("./follow.route");
const likeRouter = require("./like.route");
const questionRouter = require("./question.route");
const topicRouter = require("./topic.route");
const userRouter = require("./user.route");
const v1Router = require("express").Router();

// v1Router.use("/users/:userId/follow/:targetUserId", followRouter);
// v1Router.use("/questions/:questionId/answers", answerRouter);
// v1Router.use("/answers/:answerId/comments", commentRouter);
v1Router.use("/users", userRouter);
v1Router.use("/questions", questionRouter);
v1Router.use("/answers", answerRouter);
v1Router.use("/comments", commentRouter);
v1Router.use("/topics", topicRouter);
v1Router.use("/", likeRouter);
module.exports = v1Router;
