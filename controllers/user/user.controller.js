const { formatResult, validateObjectId, upload_single_image, hashPassword, ONE_DAY } = require("../../utils/imports");
const { compare } = require('bcryptjs');
const { UserModel, validateUser, validateUserPasswordUpdate, validateUserLogin } = require("../../models/User.model");


/**
 * Check Email Existence
 * @param req
 * @param res
 */
exports.checkEmailExistance = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.email, status: 'ACTIVE' });
        if (user) return res.send(formatResult({ status: 200, message: 'Email Already Taken', data: { exists: true } }));
        return res.send(formatResult({ status: 200, message: 'Email Available', data: { exists: false } }));
    } catch (err) {
        return res.send(formatResult({ status: 500, message: err }));
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
        if (user) return res.send(formatResult({ status: 200, message: 'Username Already Taken', data: { exists: true } }));
        return res.send(formatResult({ status: 200, message: 'Username Available', data: { exists: false } }));
    } catch (err) {
        return res.send(formatResult({ status: 500, message: err }));
    }
};


/***
 *  Get user by id
 * @param req
 * @param res
 */
exports.getUserById = async (req, res) => {
    try {
        if (!validateObjectId(req.params.id))
            return res.send(formatResult({ status: 400, message: 'Invalid id' }))

        const user = await UserModel.findById(req.params.id);
        if (!user)
            return res.send(formatResult({ status: 404, message: 'User not found' }));

        return res.send(formatResult({ status: 200, data: user }));

    } catch (e) {
        return res.send(formatResult({ status: 500, message: e }))
    }
}

/***
 *  Create's a new user
 * @param req
 * @param res
 */
exports.createUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.send(formatResult({ status: 400, message: error.details[0].message }));

        let { email, user_name } = req.body

        let user = await UserModel.findOne({
            $or: [{
                email: email ? email : ''
            }, {
                user_name: user_name ? user_name : ''
            }],
        })

        if (user) {
            const emailFound = email == user.email
            return res.send(formatResult({ status: 400, message: `User with same ${emailFound ? 'email ' : 'user_name'} arleady exist`)))
        }

        req.body.password = await hashPassword(req.body.password);

        const newUser = new UserModel(req.body);

        const result = await newUser.save();

        return res.send(formatResult({ status: 201, message: 'CREATED', data: result }));
    } catch
    (e) {
        return res.send(formatResult({ status: 500, message: e }))
    }
}

/**
 * Login User
 * @param req
 * @param res
 */
exports.userLogin = async (req, res) => {
    try {
        const { error } = validateUserLogin(req.body);
        if (error) return res.send(formatResult({ status: 400, message: error.details[0].message }));

        const user = await UserModel.findOne({
            $or: [{
                email: req.body.email_user_name
            }, {
                user_name: req.body.email_user_name
            }]
        });
        if (!user) return res.send(formatResult({ status: 404, message: 'Invalid credentials' }));

        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword) return res.send(formatResult({ status: 404, message: 'Invalid credentials' }));
        return res.status(200).send(formatResult({ status: 200, message: 'OK', data: await user.generateAuthToken() }));

    } catch (e) {
        return res.send(formatResult({ status: 500, message: e }))
    }
}

/***
 *  updates's a new user
 * @param req
 * @param res
 */
exports.updateUser = async (req, res) => {
    try {

        const { error } = validateUser(req.body, 'update');
        if (error) return res.send(formatResult({ status: 400, message: error.details[0].message }));

        let { email, national_id, phone, category, user_name } = req.body

        let dupplicate_user = await UserModel.findOne({
            _id: {
                $ne: req.user._id
            },
            $or: [{
                email: email
            }, {
                user_name: user_name
            }],
        })

        if (dupplicate_user) {
            const emailFound = email == user.email
            return res.send(formatResult({ status: 400, message: `User with same ${emailFound ? 'email ' : 'user_name'} arleady exist` }))
        }

        const result = await UserModel.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });

        return res.send(formatResult({ status: 200, message: 'UPDATED', data: result }));
    } catch
    (e) {
        return res.send(formatResult({ status: 500, message: e }))
    }
}

/**
 * Update User Passwords
 * @param req
 * @param res
 */
exports.updateUserPassword = async (req, res) => {
    try {

        const { error } = validateUserPasswordUpdate(req.body);
        if (error) return res.send(formatResult({ status: 400, message: error.details[0].message }));

        const user = await UserModel.findById(req.user._id);
        if (!user) return res.send(formatResult({ status: 404, message: 'User not found' }));

        const validPassword = await compare(req.body.current_password, user.password);
        if (!validPassword) return res.send(formatResult({ status: 400, message: 'Invalid password' }));

        const hashedPassword = await hashPassword(req.body.new_password);
        user.password = hashedPassword
        const updated = await user.save();

        return res.send(formatResult({ status: 201, message: "UPDATED", data: updated }));

    } catch (err) {
        return res.send(formatResult({ status: 500, message: err }));
    }
};

/***
 *  updates's a new user
 * @param req
 * @param res
 */
exports.deleteUser = async (req, res) => {
    try {

        const result = await UserModel.findOneAndDelete({ _id: req.user._id });
        if (!result)
            return res.send(formatResult({ status: 404, message: 'User not found' }));

        return res.send(formatResult({ status: 200, message: 'DELETED' }));
    } catch
    (e) {
        return res.send(formatResult({ status: 500, message: e }))
    }
}




