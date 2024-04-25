class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async postCommentOnAnswer(answerId, commentBody) {
    commentBody.user_id = commentBody.userId;
    delete commentBody.userId;
    commentBody.parent_id = answerId;
    commentBody.parentModelName = "answer";
    console.log("Comment body : ", commentBody);
    return await this.commentRepository.postCommentOnAnswer(commentBody);
  }

  async postCommentOnComment(commentId, commentBody) {
    commentBody.user_id = commentBody.userId;
    delete commentBody.userId;
    commentBody.parent_id = commentId;
    commentBody.parentModelName = "comment";
    console.log("Comment body : ", commentBody);
    return await this.commentRepository.postCommentOnComment(commentBody);
  }
}

module.exports = CommentService;
