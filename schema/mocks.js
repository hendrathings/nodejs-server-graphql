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
    posts: () =>
      new MockList(3, () => ({
        id: new ObjectID(),
        title: casual.title,
        content: casual.text,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: casual.name
      })),
    postComments: () =>
      new MockList(3, () => ({
        id: new ObjectID(),
        postId: new ObjectID(),
        email: casual.email,
        content: casual.text,
        name: casual.name
      })),
    users: () => new MockList(3, () =>({
      id: new ObjectID(),
      username: casual.username,
      password: casual.password,
      email: casual.email,
      fullname: casual.full_name
    }))
  }),
  Mutation: () => ({
    createUser: (root, args) => "hello world",
    updateUser: (root, args) => "hello world",
    updateUsername: (root, args) => "hello world",
    updatePassword: (root, args) => "hello world",
    deleteUser: (root, args) => "hello world",
    createPost: (root, args) => "hello world",
    updatePost: (root, args) => "hello world",
    deletePost: (root, args) => "hello world",
    createComment: (root, args) => "hello world",
    updateComment: (root, args) => "hello world",
    deleteComment: (root, args) => "hello world"
  })
};

module.exports = { mocks };
