const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "parentModelName",
  },
  parentModelName: {
    type: String,
    enum: ["answer", "comment"],
    required: true,
  },
  text: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("comment", CommentSchema);
