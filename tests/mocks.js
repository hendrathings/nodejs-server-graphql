const casual = require("casual");
const { MockList } = require("graphql-tools");
const { ObjectID } = require("mongodb");

const mocks = {
  Query: () => ({
    post: () => ({
      id: new ObjectID(),
      title: casual.title,
      content: casual.text,
      createdAt: new Date(),
      modifiedAt: new Date(),
      author: casual.name
    }),
    posts: () => "hello",
    postComments: () => "hello",
    users: () => "hello"
  }),
  Mutation: () => ({
    createUser: () => "hello",
    updateUser: () => "hello",
    updateUsername: () => "hello",
    updatePassword: () => "hello",
    deleteUser: () => "hello",
    createPost: () => "hello",
    updatePost: () => "hello",
    deletePost: () => "hello",
    createComment: () => "hello",
    updateComment: () => "hello",
    deleteComment: () => "hello"
  })
};

module.exports = { mocks };
