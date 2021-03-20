const express = require("express")
const router = express.Router()
const PictureController = require("../controllers/PictureContoller")

//get random picture
router.get("/",PictureController.getRandomPicture);

//get picture by tag
router.get("/:tag",PictureController.getImageByTag)

module.exports = router;