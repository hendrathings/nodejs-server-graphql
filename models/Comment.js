const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = { Comment };
