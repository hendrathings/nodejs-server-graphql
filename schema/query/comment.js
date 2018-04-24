const { Comment } = require("../../models/Comment");

const postComments = (obj, args, context) =>
  Comment.find({ postId: args.postId }).then(
    _comments => _comments,
    e => console.log("Error:", e)
  );

module.exports = { postComments };
