const express = require("express");
const PictureController = require("../../controllers/picture.contoller");
const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  checkEmailExistance,
  checkUsernameExistence,
  userLogin,
  updateUserPassword,
} = require("../../controllers/user/user.controller");
const {
  LoadNewImage,
} = require("../../controllers/user_pictures/user_pictures.controller");
const { auth } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.route("/:id").get(getUserById);

exports.UserRoutes = router;
