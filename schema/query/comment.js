const { Comment } = require("../../models/Comment");

const postComments = (root, args) =>
  Comment.find({ postId: args.postId }).then(
    _comments => _comments,
    e => console.log("Error:", e)
  );

module.exports = { postComments };
