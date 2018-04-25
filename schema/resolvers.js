const { posts } = require("./query/post");
const { users } = require("./query/user");
const { postComments } = require("./query/comment");
const { createPost } = require("./mutation/post");
const {
  createUser,
  updateUser,
  updateUsername,
  updatePassword,
  deleteUser
} = require("./mutation/user");
const { createComment } = require("./mutation/comment");

const resolvers = {
  Query: {
    posts,
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
    deleteUser
  }
};

module.exports = { resolvers };
