const typeDefs = `
  type Query { posts: [Post] }
  type Post { title: String!, content: String, createdAt: String, modifiedAt: String, author: String }
`;

module.exports = { typeDefs };
