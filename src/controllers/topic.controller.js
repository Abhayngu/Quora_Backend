const TopicRepository = require("../repositories/topic.repository");
const TopicService = require("../services/topic.service");
const zod = require("zod");
const zodErrorHandler = require("../utils/zodErrorHandler");
const { StatusCodes } = require("http-status-codes");
const topicService = new TopicService(new TopicRepository());

async function createTopic(req, res, next) {
  try {
    const topicBody = req.body;
    const schema = zod.object({
      name: zod.string(),
    });
    const parsedResult = schema.safeParse(topicBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const topic = await topicService.createTopic(topicBody);
    res.status(StatusCodes.CREATED).json({ success: false, data: topic });
  } catch (err) {
    next(err);
  }
}

async function getTopics(req, res, next) {
  try {
    const topics = await topicService.getTopics();
    res.status(StatusCodes.OK).json({ success: true, data: topics });
  } catch (err) {
    next(err);
  }
}

module.exports = { createTopic, getTopics };
