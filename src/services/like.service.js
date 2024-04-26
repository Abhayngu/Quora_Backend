class LikeService {
  constructor(likeRepository) {
    this.likeRepository = likeRepository;
  }
  async likeQuestionAnswerOrComment(type, id, userId) {
    return await this.likeRepository.likeQuestionAnswerOrComment(
      type,
      id,
      userId
    );
  }
}

module.exports = LikeService;
