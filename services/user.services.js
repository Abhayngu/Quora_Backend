class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userBody) {
    try {
      return await this.userRepository.createUser(userBody);
    } catch (err) {
      console.log("user services : ", err.message);
      throw err;
    }
  }

  async getUser(userId) {
    try {
      return await this.userRepository.getUser(userId);
    } catch (err) {
      console.log("user services : ", err.message);
      throw err;
    }
  }

  async updateUser(userBody, userId) {
    try {
      return await this.userRepository.updateUser(userBody, userId);
    } catch (err) {
      console.log("user services : ", err.message);
      throw err;
    }
  }
}

module.exports = UserService;
