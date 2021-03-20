const mongoose = require('mongoose');
const { ONE_DAY } = require('../utils/imports');

let user_schema = new mongoose.Schema({
    sur_name: {
        type: String,
        min: 2,
        max: 1100,
        required: true
    },
    other_names: {
        type: String,
        min: 2,
        max: 1100,
        required: true
    },
    user_name: {
        type: String,
        min: 5,
        max: 50,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    status: {
        type: String,
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
    }
}, { timestamps: true });

user_schema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            user_name: this.user_name,
            sur_name: this.sur_name,
            other_names: this.other_names,
            gender: this.gender,
            email: this.email
        }
        , process.env.KEY)
};

// validate user
exports.validateUser = (user, action = 'create') => {
    const schema = action === 'create' ? Joi.object({
        sur_name: Joi.string().min(3).required(),
        other_names: Joi.string().min(3).required(),
        user_name: Joi.string().min(5).max(50),
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        gender: Joi.string().min(4).max(6).valid('male', 'female').required()
    }) : Joi.object({
        sur_name: Joi.string().min(3),
        other_names: Joi.string().min(3),
        user_name: Joi.string().min(5).max(50),
        email: Joi.string().email(),
        phone: Joi.string().min(10).max(20),
        gender: Joi.string().min(4).max(6).valid('male', 'female'),
    })
    return schema.validate(user)
}

exports.validateUserPasswordUpdate = (data) => {
    const schema = Joi.object({
        current_password: Joi.string().min(8).required(),
        new_password: Joi.string().min(8).required(),
    })
    return schema.validate(data)
}

// create users model
exports.UserModel = mongoose.model('user', user_schema);