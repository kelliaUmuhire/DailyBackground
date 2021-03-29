const { formatResult } = require("../../utils/imports");
const { createApi } = require('unsplash-js');

const unsplash = new createApi({
    accessKey: process.env.ACCESS_KEY,
});

/**
 * Load new image
 * @param req
 * @param res
 */
exports.getUserLatestImage = async (req, res) => {
    try {

        unsplash.photos
            .getRandom({})
            .then((data) => {
                res.status(200).send({ urls: data.response.urls })
            })
            .catch((err) => console.log(err));
    } catch (err) {
        return res.send(formatResult(500, err));
    }
};

/**
 * Load new image
 * @param req
 * @param res
 */
exports.LoadNewImage = function (req, res) {
    try {
        unsplash.photos
            .getRandom({})
            .then((data) => {
                console.log(data)
                res.status(200).send({ urls: data.response.urls })
            })
            .catch((err) => console.log(err));
    } catch (err) {
        return res.send(formatResult(500, err));
    }
};