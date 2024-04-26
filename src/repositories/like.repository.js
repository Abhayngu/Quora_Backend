const { Question, Answer, Comment, User } = require("../models/index");
const BadRequest = require("../errors/badRequest.error");
const mongoose = require("mongoose");
const NotFound = require("../errors/notFound.error");

class LikeRepository {
  async likeQuestionAnswerOrComment(type, id, userId) {
    try {
      id = id.toString();
      userId = userId.toString();
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequest(`${type} id`);
      }
      console.log(type, id, userId);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequest(`User id`);
      }
      let Model = undefined;
      switch (type) {
        case "question":
          Model = Question;
          break;
        case "answer":
          Model = Answer;
          break;
        case "comment":
          Model = Comment;
          break;
        default:
          throw new Error("Type has to be one of [question, answer, comment]");
      }
      let entity = await Model.findById(id);
      if (!entity) {
        throw new NotFound(type, "Id", id);
      }
      let user = await User.findById(userId);
      if (!user) {
        throw new NotFound("User", "Id", userId);
      }
      if (entity.likedBy.includes(userId)) {
        throw new BadRequest(
          "User Id",
          undefined,
          `User already likes the ${type}`
        );
      }
      entity = await Model.findByIdAndUpdate(
        id,
        {
          $push: { likedBy: userId },
        },
        { new: true }
      );
      return entity;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = LikeRepository;
