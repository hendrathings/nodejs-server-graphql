const mongoose = require("mongoose");
const { Comment } = require("../../models/Comment");
const { Post } = require("../../models/Post");
const validator = require("validator");

const createComment = async (root, args) => {
  if (!validator.isEmail(args.input.email))
    return new Error("email is not valid");

  const postCount = await Post.findById(args.input.postId).count();
  if (postCount == 0) return new Error("Post doesn't exist");

  const newComment = new Comment({
    postId: mongoose.Types.ObjectId(args.input.postId),
    email: args.input.email,
    name: args.input.name,
    content: args.input.content
  });

  newComment.save();
  return newComment;
};

const updateComment = async (root, args) => {
  const currentComment = await Comment.findByIdAndUpdate(
    args.id,
    { $set: args.input },
    { new: true }
  );
  return currentComment;
};

const deleteComment =  async (root, args) => {
  const currentComment = await Comment.findByIdAndRemove(
    args.id
  );
  return currentComment;
};

module.exports = { createComment, updateComment, deleteComment };
