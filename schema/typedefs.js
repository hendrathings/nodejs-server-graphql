const typeDefs = `
  type Query { posts: [Post], users: [User], postComments(postId: String!): [Comment] }
  type Mutation {
    createPost(input: PostInput): Post,
    createUser(input: UserInput): User,
    createComment(input: CommentInput): Comment
  }

  type Post { id: String!, title: String!, content: String, createdAt: String, modifiedAt: String, author: String }
  input PostInput { title: String!, content: String, author: String }

  type User { id: String!, username: String!, password: String!, email: String!, fullname: String }
  input UserInput { username: String!, password: String!, email: String!, fullname: String }

  type Comment { id: String!, postId: String!, email: String!, name: String!, content: String! }
  input CommentInput { postId: String!, email: String!, name: String!, content: String! }
`;

module.exports = { typeDefs };
