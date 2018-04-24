const typeDefs = `
  type Query { books: [Book], writers: [Writer] }
  type Book { title: String, author: String }
  type Writer { name: String, email: String }
`;

module.exports = typeDefs;