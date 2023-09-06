const mongoose = require("mongoose");

const bookRevewsSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewBy: {
    type: String,
    default: "guest",
  },
  Comment: {
    type: String,
  },
});

module.exports = mongoose.model("bookRevews", bookRevewsSchema);
