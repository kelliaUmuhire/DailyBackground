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


/***
 *  Get user by id
 * @param req
 * @param res
 */
exports.getUserById = async (req, res) => {
    try {
        if (!validateObjectId(req.params.id))
            return res.send(formatResult(400, 'Invalid id'))

        const user = await UserModel.findById(req.params.id);
        if (!user)
            return res.send(formatResult(404, 'User not found'));

        return res.send(formatResult(200, undefined, user));

    } catch (e) {
        return res.send(formatResult(500, e))
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
        if (error) return res.send(formatResult(400, error.details[0].message));

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
            return res.send(formatResult(400, `User with same ${emailFound ? 'email ' : 'user_name'} arleady exist`))
        }

        req.body.password = await hashPassword(req.body.password);

        const newUser = new UserModel(req.body);

        const result = await newUser.save();

        return res.send(formatResult(201, 'CREATED', result));
    } catch
    (e) {
        return res.send(formatResult(500, e))
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
        if (error) return res.status(400).send(error.details[0].message);

        const user = await UserModel.findOne({
            $or: [{
                email: req.body.email_user_name
            }, {
                user_name: req.body.email_user_name
            }]
        });
        if (!user) return res.send(formatResult(404, 'Invalid credentials'));

        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword) return res.send(formatResult(404, 'Invalid credentials'));
        return res.status(200).send(formatResult(200, 'OK', await user.generateAuthToken()));

    } catch (e) {
        return res.send(formatResult(500, e))
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
        if (error) return res.send(formatResult(400, error.details[0].message));

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
            return res.send(formatResult(400, `User with same ${emailFound ? 'email ' : 'user_name'} arleady exist`))
        }

        const result = await UserModel.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });

        return res.send(formatResult(200, 'UPDATED', result));
    } catch
    (e) {
        return res.send(formatResult(500, e))
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
        if (error) return res.send(formatResult(400, error.details[0].message));

        const user = await UserModel.findById(req.user._id);
        if (!user) return res.send(formatResult(404, 'User not found'));

        const validPassword = await compare(req.body.current_password, user.password);
        if (!validPassword) return res.send(formatResult(400, 'Invalid password'));

        const hashedPassword = await hashPassword(req.body.new_password);
        user.password = hashedPassword
        const updated = await user.save();

        return res.send(formatResult(201, "UPDATED", updated));

    } catch (err) {
        return res.send(formatResult(500, err));
    }
};

/***
 *  updates's a new user
 * @param req
 * @param res
 */
exports.deleteUser = async (req, res) => {
    try {

        const result = await UserModel.findOneAdDelete({ _id: req.user._id });
        if (!result)
            return res.send(formatResult(404, 'User not found'));

        return res.send(formatResult(200, 'DELETED'));
    } catch
    (e) {
        return res.send(formatResult(500, e))
    }
}




