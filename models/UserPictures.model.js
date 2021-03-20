const mongoose = require('mongoose');
const Joi = require('joi')

const UserPicturesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    last_pics: [{
        date: {
            type: Date,
            required: true
        },
        regular: {
            type: String,
            required: true
        },
        small: {
            type: String,
            required: true
        },
        thumb: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model("user_pictures", UserPicturesSchema)
