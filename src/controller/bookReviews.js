const mongoose = require("mongoose");
const bookReviesModel = require("../model/bookReviews");
const bookReviews = require("../model/bookReviews");
const { ObjectId } = require("mongoose").Types;

const createBookReview = async function (req, res) {
  try {
    const data = req.body;
    const { bookId, rating, reviewBy, Comment } = data;

    // const bookreviesRating = /^[1-5]$/.test(rating);
    // if (!bookreviesRating) {
    //   return res.status(400).send({ message: " rating ios a not valid" });
    // }

    if (rating > 5) {
      return res.status(400).send({ message: " rating is a not valid" });  
    }
    const bookRevews = new bookReviesModel({
      bookId,
      rating,
      reviewBy,
      Comment,
    });
    await bookRevews.save();
    res.status(200).send({
      message: "bookrevies  created successfuly",
      data: bookRevews,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllBookReview = async function (req, res) {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBookReview,
};
