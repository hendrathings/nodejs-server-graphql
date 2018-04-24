const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: null
  },
  modifiedAt: {
    type: Date,
    default: null
  },
  author: {
    type: String,
    default: null
  }
});

module.exports = {Post};