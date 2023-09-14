const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    villege: { type: String },
    dis: { type: String },
    pinCode: { type: Number },
  },
  role: {
    type: String,
    required: true,
    default: "author",
  },
  password: {
    type: String,
    required: true,
  },
  booksId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"books",
  },
});

module.exports = mongoose.model("author", authorSchema);
