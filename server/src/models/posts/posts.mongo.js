const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    default: null,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
    required: false,
  },
  dislikes: {
    type: Number,
    default: 0,
    required: false,
  },
  likedBy: {
    type: Array,
    default: [],
    required: false,
  },
  dislikedBy: {
    type: Array,
    default: [],
    required: false,  
  },
});

module.exports = mongoose.model("Post", postSchema);
