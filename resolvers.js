var { mongoose } = require("./db/moongose");
const { Post } = require("./models/Post");

const resolvers = {
  Query: {
    posts: () =>
      Post.find().then(
        _posts => _posts,
        e => {
          console.log("Error:", e);
        }
      )
  },
  Mutation: {
    createPost: (obj, args, context) => {
      const mypost = new Post({
        title: args.input.title,
        content: args.input.content,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: args.input.author
      });

      mypost.save();
      return mypost;
    }
  }
};

module.exports = { resolvers };
