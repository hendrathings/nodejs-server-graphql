const typeDefs = `
  type Query { posts: [Post] }
  type Mutation { createPost(input: PostInput): Post }
  type Post { id: String!, title: String!, content: String, createdAt: String, modifiedAt: String, author: String }
  input PostInput { title: String!, content: String, author: String }
`;

module.exports = { typeDefs };
