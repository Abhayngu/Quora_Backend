const { Question, User } = require("../models/index");
const NotFound = require("../errors/notFound.error");
const mongoose = require("mongoose");
const BadRequest = require("../errors/badRequest.error");
const ConflictError = require("../errors/conflict.error");
class QuestionRepository {
  async postQuestion(questionBody) {
    try {
      const user_id = questionBody.user_id.toString();
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new BadRequest("User Id");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new NotFound("user", "Id", user_id);
      }
      const { title } = questionBody;
      let question = await Question.findOne({ title });
      if (question) {
        throw new ConflictError("Question", "title", title);
      }
      return await Question.create(questionBody);
    } catch (err) {
      throw err;
    }
  }

  async searchQuestion(text, tag) {
    try {
      const query = [];
      let hasOneQueryAtLeast = false;
      if (text) {
        query.push({ title: { $regex: text } });
        query.push({ body: { $regex: text } });
        hasOneQueryAtLeast = true;
      }
      if (tag) {
        query.push({
          topics: {
            $in: tag,
          },
        });
        hasOneQueryAtLeast = true;
      }
      console.log(query);
      const questions = await Question.find(
        hasOneQueryAtLeast ? { $or: query } : {}
      );
      return questions;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = QuestionRepository;
