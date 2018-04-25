const { Post } = require("../../models/Post");

const createPost = (obj, args, context) => {
  const newPost = new Post({
    title: args.input.title,
    content: args.input.content,
    createdAt: new Date(),
    modifiedAt: new Date(),
    author: args.input.author
  });

  newPost.save();
  return newPost;
};

const updatePost = async (obj, args, context) => {
  const currentPost = await Post.findByIdAndUpdate(
    args.id,
    { $set: {
      title: args.input.title,
      content: args.input.content,
      author: args.input.author,
      modifiedAt: new Date()
    } },
    { new: true }
  );

  return currentPost;
};

const deletePost = async (obj, args, context) => {
  const currentPost = await Post.findByIdAndRemove(args.id);

  return currentPost;
};

module.exports = { createPost, updatePost, deletePost };
