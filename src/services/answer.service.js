class AnswerService {
  constructor(answerRepository) {
    this.answerRepository = answerRepository;
  }
  async postAnswer(questionId, reqBody) {
    const ansBody = {};
    ansBody.question_id = questionId;
    ansBody.user_id = reqBody.userId;
    ansBody.text = reqBody.text;
    return await this.answerRepository.postAnswer(ansBody);
  }
  async editAnswer(answerId, ansBody) {
    ansBody.text = ansBody.text.trim();
    return await this.answerRepository.editAnswer(answerId, ansBody);
  }
}

module.exports = AnswerService;
