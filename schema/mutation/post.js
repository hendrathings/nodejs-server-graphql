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

module.exports = { createPost };
