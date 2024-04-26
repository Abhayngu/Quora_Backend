class TopicService {
  constructor(topicRepository) {
    this.topicRepository = topicRepository;
  }
  async createTopic(topicBody) {
    return await this.topicRepository.createTopic(topicBody);
  }
  async getTopics() {
    return await this.topicRepository.getTopics();
  }
}

module.exports = TopicService;
