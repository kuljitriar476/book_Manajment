const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authorModel = require("../model/author");
const { ObjectId } = require("mongoose").Types;

const authenticationMiddleware = async function (req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(404).send({
      message: "token is not found",
    });
  }

  jwt.verify(token, "secrete key", function (error, decoded) {
    if (error) {
      return res.status(400).send({ message: error.message });
    } else {
      decodedToken = decoded;
      //console.log("decoded", decodedToken);
    }
  });
  next();
};

const authorizationMiddleware = async function (req, res, next) {
  const authorId = decodedToken._id;
  //console.log("auther", authorId);
  const { id } = req.params;
  // console.log("param", id);

  const chackId = await authorModel.findOne({ _id: new ObjectId(id) });
  // console.log(chackId);
  if (!chackId) {
    return res.status(404).send({
      message: "author id is not found",
    });
  }

 console.log("authorId", authorId.toString());
  console.log("chackId?._id", chackId._id.toString());

  if (authorId.toString() !== chackId._id.toString()) {
    return res.status(400).send({ message: "authorization faild" });
  }
  next();
};

module.exports = {
  authenticationMiddleware,
  authorizationMiddleware,
};
