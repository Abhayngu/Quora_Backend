const NotFound = require("../errors/notFound.error");
const BadRequest = require("../errors/badRequest.error");
const ConflictError = require("../errors/conflict.error");
const mongoose = require("mongoose");
const { User } = require("../models/index");

class UserRepository {
  async createUser(userBody) {
    const { username, email } = userBody;
    let user = await User.findOne({ username });
    if (user) {
      throw new ConflictError("User", "Username", username);
    }
    user = await User.findOne({ email });
    if (user) {
      throw new ConflictError("User", "Email", email);
    }
    return await User.create(userBody);
  }

  async getUser(userId) {
    try {
      userId = userId.toString();
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequest("user id");
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFound("User", "Id", userId);
      }
      return user;
    } catch (err) {
      console.log("user repo : ", err.message);
      throw err;
    }
  }

  async updateUser(userBody, userId) {
    try {
      userId = userId.toString();
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequest("user id");
      }
      const user = await User.findByIdAndUpdate(userId, userBody, {
        new: true,
      });
      if (!user) {
        throw NotFound("User", "Id", userId);
      }
      return user;
    } catch (err) {
      console.log("user repo : ", err.message);
      throw err;
    }
  }
}

module.exports = UserRepository;
