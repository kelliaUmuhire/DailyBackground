const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/**
 *  Encrypt password
 * @param {String} password 
 */
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed;
}

/***
 * @param status
 * @param message
 * @param data
 * @returns {{data: *, message: string, status: number}}
 */
exports.formatResult = (status = 200, message = 'OK', data) => {
    return {
        status: status,
        message: message.toString().split('\"').join(''),
        data: data
    }
}

/***
 * @param id
 * @returns {*}
 */
 exports.validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

