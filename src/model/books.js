const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  categary: {
    type: String,
    required: true,
    uppercase: true,
  },
  subCategary: [
    {
      type: String,
      required: true,
    },
  ],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("books", booksSchema);
