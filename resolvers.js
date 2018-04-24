const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const writers = [
  {
    name: "Michael Crichton",
    email: "crchton@mail.com"
  },
  {
    name: "J.K. Rowling",
    email: "rowling@mail.com"
  }
];

const resolvers = {
  Query: {
    books: () => books,
    writers: () => writers
  }
};

module.exports = resolvers;
