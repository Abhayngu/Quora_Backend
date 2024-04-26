const { StatusCodes } = require("http-status-codes");
const AnswerRepository = require("../repositories/answer.repository");
const AnswerService = require("../services/answer.service");
const zodErrorHandler = require("../utils/zodErrorHandler");
const zod = require("zod");

const answerService = new AnswerService(new AnswerRepository());

async function postAnswer(req, res, next) {
  try {
    const { questionId } = req.params;
    const ansBody = req.body;
    console.log(req.params, ansBody);
    const schema = zod.object({
      text: zod.string(),
    });
    const parsedResult = schema.safeParse(ansBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const ans = await answerService.postAnswer(questionId, ansBody);
    res.status(StatusCodes.CREATED).json({ success: true, data: ans });
  } catch (err) {
    next(err);
  }
}

async function editAnswer(req, res, next) {
  try {
    const { answerId } = req.params;
    const ansBody = req.body;
    const schema = zod.object({
      text: zod.string(),
    });
    const parsedResult = schema.safeParse(ansBody);
    if (!parsedResult.success) {
      zodErrorHandler(parsedResult);
      return;
    }
    const ans = await answerService.editAnswer(answerId, ansBody);
    res.status(StatusCodes.OK).json({
      success: true,
      data: ans,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postAnswer, editAnswer };
