const { default: mongoose } = require("mongoose");
const NotFound = require("../errors/notFound.error");
const { User } = require("../models/index");
const BadRequest = require("../errors/badRequest.error");
class FollowRepository {
  async followUser(userId, targetUserId) {
    try {
      userId = userId.toString();
      targetUserId = targetUserId.toString();
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequest("User Id");
      }
      if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
        throw new BadRequest("Target user Id");
      }
      let user = await User.findById(userId);
      if (!user) {
        throw new NotFound("User", "Id", userId);
      }
      let targetUser = await User.findById(targetUserId);
      if (!targetUser) {
        throw new NotFound("Target User", "Id", targetUserId);
      }
      if (userId == targetUserId) {
        throw new BadRequest(
          "User Id",
          undefined,
          `User can not follow himself`
        );
      }
      if (targetUser.followedBy.includes(userId)) {
        throw new BadRequest(
          "User Id",
          undefined,
          "User is already following the target user"
        );
      }
      targetUser = await User.findByIdAndUpdate(
        targetUserId,
        {
          $push: {
            followedBy: userId,
          },
        },
        { new: true }
      );
      return targetUser;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = FollowRepository;
