const { Post } = require("../../models/Post");

const posts = (root) =>
  Post.find().then(_posts => _posts, e => console.log("Error:", e));

const post = (root, args) =>
  Post.findById(args.id).then(_post => _post, e => console.log("Error:", e));

module.exports = { posts, post };
