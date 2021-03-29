// import dependencies
const { verify } = require('jsonwebtoken')
const { UserModel } = require('../models/User.model')
const { formatResult } = require('../utils/imports')

async function auth(req, res, next) {
    console.log("here");
    const header = req.header('authorization')
    if (!header)
        return res.send(formatResult({ status: 401, message: 'No Token Found' }))
    const token = header.split(' ')[1]

    if (!token)
        return res.send(formatResult({ status: 401, message: 'No Token Found' }))
    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findOne({
            user_name: decoded.user_name
        })
        if (!user)
            return res.send(formatResult({ status: 401, message: 'Invalid Token' }))
        req.user = user
        next()
    }
    catch (err) {
        return res.send(formatResult({ status: 401, message: 'Invalid Token' }))
    }
}
module.exports.auth = auth