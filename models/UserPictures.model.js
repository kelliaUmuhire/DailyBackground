const mongoose = require("mongoose");
const Joi = require("joi");
const { createApi } = require("unsplash-js");

const UserPicturesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  last_pics: [
    {
      date: {
        type: Date,
        required: true,
      },
      regular: {
        type: String,
        required: true,
      },
      small: {
        type: String,
        required: true,
      },
      thumb: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports.UserPicture = mongoose.model(
  "user_pictures",
  UserPicturesSchema
);
exports.Unsplash = () => {
  const dotenv = require("dotenv");
  dotenv.config();

  return new createApi({
    accessKey: process.env.ACCESS_KEY,
  });
};
