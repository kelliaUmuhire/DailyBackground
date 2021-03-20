const express = require("express")
const router = express.Router()
const PictureController = require("../controllers/PictureController")

//get random picture
router.get("/", PictureController.getRandomPicture)

module.exports = router;