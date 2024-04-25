const mongoose = require("mongoose");
const BadRequest = require("../errors/badRequest.error");
const { User, Answer, Comment } = require("../models");
const NotFound = require("../errors/notFound.error");

class CommentRepository {
  async postCommentOnAnswer(commentBody) {
    try {
      const user_id = commentBody.user_id.toString();
      const parent_id = commentBody.parent_id.toString();
      if (!mongoose.Types.ObjectId.isValid(user_id))
        throw new BadRequest("User Id");
      if (!mongoose.Types.ObjectId.isValid(parent_id))
        throw new BadRequest(`Answer Id`);
      const user = await User.findById(user_id);
      if (!user) throw new NotFound("User", "Id", user_id);
      const parent = await Answer.findById(parent_id);
      if (!parent) throw new NotFound("Answer", "Id", parent_id);
      const comment = await Comment.create(commentBody);
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async postCommentOnComment(commentBody) {
    try {
      const user_id = commentBody.user_id.toString();
      const parent_id = commentBody.parent_id.toString();
      if (!mongoose.Types.ObjectId.isValid(user_id))
        throw new BadRequest("User Id");
      if (!mongoose.Types.ObjectId.isValid(parent_id))
        throw new BadRequest(`Comment Id`);
      const user = await User.findById(user_id);
      if (!user) throw new NotFound("User", "Id", user_id);
      const parent = await Comment.findById(parent_id);
      if (!parent) throw new NotFound("Comment", "Id", parent_id);
      const comment = await Comment.create(commentBody);
      return comment;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentRepository;
