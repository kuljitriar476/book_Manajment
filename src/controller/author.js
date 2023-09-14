const mongoose = require("mongoose");
const authorModel = require("../model/author");
const author = require("../model/author");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    const data = req.body;
    const {
      title,
      name,
      lastName,
      email,
      mobileNumber,
      address,
      role,
      password,
      booksId,
    } = data;
    // regex 22 line
    const checkmobileNumber = /^[1-9]\d{9}$/.test(mobileNumber);
    console.log("checkmobileNumber", checkmobileNumber);
    if (!checkmobileNumber) {
      return res.send({ message: "mobile number is not valid" });
    }

    const existEmail = await authorModel.findOne({ email: email });
    if (existEmail) {
      return res.send({ message: `${email} already exist` });
    }

    const existMobileNumber = await authorModel.findOne({
      mobileNumber: mobileNumber,
    });
    if (existMobileNumber) {
      return res.send({ message: `${mobileNumber} already exist` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const authorData = new authorModel({
      title,
      name,
      lastName,
      email,
      mobileNumber,
      address,
      role,
      password: hashPassword,
      booksId,
    });
    await authorData.save();
    res.status(200).send({
      message: "author data  created successfully",
      data: authorData,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginAuthor = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;
    console.log("data", data);
    const authorData = await authorModel.findOne({ email: email });
    console.log("authorData", authorData);

    if (!authorData) {
      return res.status(400).send({ message: ` this ${email} dosn't exist` });
    }

    if (authorData?.role != "author") {
      return res.status(200).send({ message: " this author dosn't exist" });
    }
    const chackPassword = await bcrypt.compare(password, authorData?.password);
    if (!chackPassword) {
      return res
        .status(400)
        .send({ message: "wrong password plesse try again" });
    }
    console.log(chackPassword);

    const token = jwt.sign(
      {
        name: authorData.name,
        lastName: authorData.lastName,
        email: authorData.email,
        role: authorData.role,
        _id: authorData._id,
      },
      "secrete key",
      { expiresIn: "1h" }
    );
    res.status(200).send({
      message: "login successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllAuthor = async function (req, res) {
  try {
    //const authorData = await authorModel.find();
    const authorData = await authorModel.aggregate([
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "books",
                localField: "booksId",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      name: 1,
                    },
                  },

                ],
                as: "booksDetails",
              },
            },
            {
              $unwind: {
                path: "$booksDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);
    res.status(200).send({
      message: "get All author fetch successfully",
      count: authorData[0]?.count[0]?.total,
      data: authorData[0]?.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleAuthor = async function (req, res) {
  try {
    const { id } = req.params;
    const author = await authorModel.findOne({ _id: new ObjectId(id) });
    res.status(200).send({
      message: "single author created successfully",
      data: author,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateAuthor = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const {
      title,
      name,
      lastName,
      email,
      mobileNumber,
      address,
      role,
      password,
      booksId,
    } = data;

    const authorData = await authorModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        title,
        name,
        lastName,
        email,
        mobileNumber,
        address,
        role,
        password,
        booksId,
      },
      { new: true }
    );
    res.status(200).send({
      message: "author data update successfully",
      data: authorData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAuthor = async function (req, res) {
  try {
    const { id } = req.params;
    const author = await authorModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({
      message: "author data deleted successfully",
      data: author,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAuthor,
  getAllAuthor,
  singleAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
};
