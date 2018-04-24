const { Post } = require("../../models/Post");

const posts = () =>
  Post.find().then(_posts => _posts, e => console.log("Error:", e));

module.exports = { posts };
