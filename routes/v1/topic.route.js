const topicRouter = require("express").Router();
const { topic } = require("../../controllers/index");

topicRouter.post("/", topic.createTopic);
topicRouter.get("/", topic.getTopics);

module.exports = topicRouter;
