const followRouter = require("express").Router();
const { follow } = require("../../controllers/index");

followRouter.post("/", follow.followUser);

module.exports = followRouter;
