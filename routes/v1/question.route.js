const questionRouter = require("express").Router();
const { question } = require("../../controllers/index");
const answerRouter = require("./answer.route");

questionRouter.post("/", question.postQuestion);
questionRouter.get("/search", question.searchQuestion);
questionRouter.use("/", answerRouter);

module.exports = questionRouter;
