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

