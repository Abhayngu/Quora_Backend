class QuestionService {
  constructor(questionRepository) {
    this.questionRepository = questionRepository;
  }
  async postQuestion(questionBody) {
    questionBody.user_id = questionBody.userId;
    delete questionBody.userId;
    return await this.questionRepository.postQuestion(questionBody);
  }

  async searchQuestion(text, tag) {
    text = text && text.trim();
    tag = tag && tag.trim();
    return await this.questionRepository.searchQuestion(text, tag);
  }
}

module.exports = QuestionService;
