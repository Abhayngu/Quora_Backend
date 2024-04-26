class FollowService {
  constructor(followRepository) {
    this.followRepository = followRepository;
  }
  async followUser(userId, targetUserId) {
    return await this.followRepository.followUser(userId, targetUserId);
  }
}

module.exports = FollowService;
