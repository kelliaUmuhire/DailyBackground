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

exports.PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

/***
 * @param status
 * @param message
 * @param data
 * @returns {{data: *, message: string, status: number}}
 */
exports.formatResult = ({status = 200, message = 'OK', data}) => {
    return {
        status: status,
        message: message.toString().split('\"').join(''),
        data: data
    }
}

/***
 * Validate objectId
 * @param id
 * @returns {*}
 */
 exports.validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

 /**
  * One Day in Milliseconds
  * @type {number}
  */
  exports.ONE_DAY = 1 * 24 * 60 * 60 * 1000;