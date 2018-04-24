var { mongoose } = require("./db/moongose");
const { Post } = require("./models/Post");

// const mypost = new Post({
//   title: "merdeka indonesia",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   createdAt: new Date(),
//   modifiedAt: new Date(),
//   author: "Gusti Mahendra"
// });

// mypost.save()

const resolvers = {
  Query: {
    posts: (obj, args, context) => {
      return Post.find().then(
        _posts => _posts,
        e => {
          console.log("Error:", e);
        }
      );
    }
  }
};

module.exports = { resolvers };
