const typeDefs = `
  type Query {
    posts: [Post],
    post(id: String!): Post,
    users: [User],
    postComments(postId: String!): [Comment]
  }
  type Mutation {
    createPost(input: PostInput): Post,
    createUser(input: UserInput): User,
    createComment(input: CommentInput): Comment,
    updateUser(id: String!, input: UserUpdateInput): User,
    updateUsername(id: String!, input: UsernameUpdateInput!): User,
    updatePassword(id: String!, input: PasswordUpdateInput!): User
    deleteUser(id: String!): User
    updateComment(id: String!, input: CommentUpdateInput!): Comment,
    deleteComment(id: String!): Comment,
    updatePost(id: String!, input: PostUpdateInput!): Post,
    deletePost(id: String!): Post
  }

  type Post { id: String!, title: String!, content: String, createdAt: String, modifiedAt: String, author: String }
  input PostInput { title: String!, content: String, author: String }
  input PostUpdateInput { title: String!, content: String, author: String }

  type User { id: String!, username: String!, password: String!, email: String!, fullname: String }
  input UserInput { username: String!, password: String!, email: String!, fullname: String }
  input UserUpdateInput { email: String!, fullname: String }
  input UsernameUpdateInput { username: String! }
  input PasswordUpdateInput { password: String! }

  type Comment { id: String!, postId: String!, email: String!, name: String!, content: String! }
  input CommentInput { postId: String!, email: String!, name: String!, content: String! }
  input CommentUpdateInput { content: String! }
`;

module.exports = { typeDefs };
