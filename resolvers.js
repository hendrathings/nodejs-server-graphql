const { mongoose } = require("./db/moongose");
const { Post } = require("./models/Post");
const { User } = require("./models/User");
const { Comment } = require("./models/Comment");
const { SHA256 } = require("crypto-js");
const validator = require("validator");

const resolvers = {
  Query: {
    posts: () =>
      Post.find().then(_posts => _posts, e => console.log("Error:", e)),
    users: () =>
      User.find().then(_users => _users, e => console.log("Error:", e)),
    postComments: (obj, args, context) =>
      Comment.find({ postId: args.postId }).then(
        _comments => _comments,
        e => console.log("Error:", e)
      )
  },
  Mutation: {
    createPost: (obj, args, context) => {
      const newPost = new Post({
        title: args.input.title,
        content: args.input.content,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: args.input.author
      });

      newPost.save();
      return newPost;
    },
    createUser: async (obj, args, context) => {
      if (!validator.isEmail(args.input.email))
        return new Error("email is not valid");

      if (
        !validator.isByteLength(args.input.username, { min: 8, max: undefined })
      )
        return new Error("username min length 8");

      const users = await User.find({username: args.input.username});
      if(users.length > 0) return new Error("username already taken");

      const newUser = new User({
        username: args.input.username,
        password: SHA256(args.input.password),
        email: args.input.email,
        fullname: args.input.fullname
      });

      newUser.save();
      return newUser;
    },
    createComment: (obj, args, context) => {
      if (!validator.isEmail(args.input.email))
        return new Error("email is not valid");

      const newComment = new Post({
        postId: mongoose.Types.ObjectId(args.input.postId),
        email: args.input.email,
        name: args.input.name,
        content: args.input.content
      });

      newComment.save();
      return newComment;
    }
  }
};

module.exports = { resolvers };
