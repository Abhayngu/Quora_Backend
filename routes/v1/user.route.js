const { user, follow } = require("../../controllers/index");

const userRouter = require("express").Router();

userRouter.post("/:userId/follow/:targetUserId", follow.followUser);
userRouter.post("/", user.createUser);
userRouter.get("/:userId", user.getUser);
userRouter.put("/:userId", user.updateUser);

module.exports = userRouter;
