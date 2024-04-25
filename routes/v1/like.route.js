const likeRouter = require("express").Router();
const { like } = require("../../controllers/index");

likeRouter.post("/:type/:id/likes", like.likeQuestionAnswerOrComment);

module.exports = likeRouter;
