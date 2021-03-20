const express = require('express');
const { getAllUsers, searchUser, getUserById, createUser, checkEmailExistance, checkUsernameExistence, getUsersByCategory, updateUser, updateUserPassword, updateUserCategory, deleteUser, updateUserProfile, createPasswordReset, updatePasswordReset, userLogin } = require('../../controllers/user/user.controller');
const { auth } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.route('/')
    .post(createUser)
    .put([auth, updateUser])
    .delete([auth, deleteUser])


router.route('/search')
    .get(searchUser)

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