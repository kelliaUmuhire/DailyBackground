const { formatResult, validateObjectId, upload_single_image, hashPassword, ONE_DAY } = require("../../utils/imports");
const { compare } = require('bcryptjs');
const { UserModel } = require("../../models/User.model");


/**
 * Check Email Existence
 * @param req
 * @param res
 */
exports.checkEmailExistance = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.email, status: 'ACTIVE' });
        if (user) return res.send(formatResult(200, 'Email Already Taken', { exists: true }));
        return res.send(formatResult(200, 'Email Available', { exists: false }));
    } catch (err) {
        return res.send(formatResult(500, err));
    }
};


/**
 * Check Username Existence
 * @param req
 * @param res
 */
exports.checkUsernameExistence = async (req, res) => {
    try {
        const user = await UserModel.findOne({ user_name: req.params.user_name, status: 'ACTIVE' });
        if (user) return res.send(formatResult(200, 'Username Already Taken', { exists: true }));
        return res.send(formatResult(200, 'Username Available', { exists: false }));
    } catch (err) {
        return res.send(formatResult(500, err));
    }
};







