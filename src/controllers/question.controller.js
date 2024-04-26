const zod = require("zod");
const zodErrorHandler = require("../utils/zodErrorHandler.js");
const QuestionService = require("../services/question.service.js");
const QuestionRepository = require("../repositories/question.repository.js");
const { StatusCodes } = require("http-status-codes");

const questionService = new QuestionService(new QuestionRepository());

async function postQuestion(req, res, next) {
  try {
    const quesBody = req.body;
    console.log("body : ", quesBody);
    const schema = zod.object({
      userId: zod.string(),
      title: zod.string(),
      body: zod.string(),
      topics: zod.array(zod.string()).optional(),
    });
    const parsedResult = schema.safeParse(quesBody);
    console.log(parsedResult);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const question = await questionService.postQuestion(quesBody);
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
}

async function searchQuestion(req, res, next) {
  try {
    const { text, tags } = req.query;
    console.log(req.query);
    const questions = await questionService.searchQuestion(text, tags);
    res.status(StatusCodes.OK).json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
}

module.exports = { postQuestion, searchQuestion };
