const express = require('express');
const PictureController = require('../../controllers/picture.contoller');
const { createUser, updateUser, deleteUser, getUserById, checkEmailExistance, checkUsernameExistence, userLogin, updateUserPassword } = require('../../controllers/user/user.controller');
const { LoadNewImage } = require('../../controllers/user_pictures/user_pictures.controller');
const { auth } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.route('/')
    .post(createUser)
    .put([auth, updateUser])
    .delete([auth, deleteUser])

router.route('/load_new_image')
    .get([auth, LoadNewImage])

router.route('/:id')
    .get(getUserById)

router.route('/checkEmailExistance/:email')
    .get(checkEmailExistance)

router.route('/checkUsernameExistance/:user_name')
    .get(checkUsernameExistence)


router.route('/login')
    .post(userLogin)

router.route('/updatePassword')
    .put([auth, updateUserPassword])

exports.UserRoutes = router