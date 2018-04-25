const { posts, post } = require("./query/post");
const { users } = require("./query/user");
const { postComments } = require("./query/comment");
const { createPost, deletePost, updatePost } = require("./mutation/post");
const {
  createUser,
  updateUser,
  updateUsername,
  updatePassword,
  deleteUser
} = require("./mutation/user");
const {
  createComment,
  updateComment,
  deleteComment
} = require("./mutation/comment");

const resolvers = {
  Query: {
    posts,
    post,
    users,
    postComments
  },
  Mutation: {
    createPost,
    createUser,
    createComment,
    updateUser,
    updateUsername,
    updatePassword,
    deleteUser,
    updateComment,
    deleteComment,
    deletePost,
    updatePost
  }
};

module.exports = { resolvers };
