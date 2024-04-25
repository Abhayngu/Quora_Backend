const mongoose = require("mongoose");
const BadRequest = require("../errors/badRequest.error");
const NotFound = require("../errors/notFound.error");
const { User, Answer, Question } = require("../models/index");

class AnswerRepository {
  async postAnswer(ansBody) {
    const user_id = ansBody.user_id.toString();
    const question_id = ansBody.question_id.toString();
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw new BadRequest("User Id");
    }
    if (!mongoose.Types.ObjectId.isValid(question_id)) {
      throw new BadRequest("Question Id");
    }
    const user = await User.findById(user_id);
    if (!user) {
      throw new NotFound("User", "Id", user_id);
    }
    const question = await Question.findById(question_id);
    if (!question) {
      throw new NotFound("Question", "Id", question_id);
    }
    const answer = await Answer.create(ansBody);
    return answer;
  }

  async editAnswer(answerId, ansBody) {
    answerId = answerId.toString();
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      throw new BadRequest("Answer Id");
    }
    let ans = await Answer.findById(answerId);
    if (!ans) {
      throw new NotFound("Answer", "Id", answerId);
    }
    ans = await Answer.findByIdAndUpdate(answerId, ansBody, { new: true });
    return ans;
  }
}

module.exports = AnswerRepository;
