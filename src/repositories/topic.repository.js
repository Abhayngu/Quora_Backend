const { Topic } = require("../models/index");
class TopicRepository {
  async createTopic(topicBody) {
    console.log(topicBody);
    const topic = await Topic.create(topicBody);
    return topic;
  }
  async getTopics() {
    return await Topic.find({});
  }
}

module.exports = TopicRepository;
