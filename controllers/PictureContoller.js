import { createApi } from 'unsplash-js';

const unsplash = new createApi({
    accessKey: process.env.ACCESS_KEY,
});

const PictureController = {
    getRandomPicture(req, res) {
        unsplash.photos
            .getRandom({})
            .then((data) => {
                res.status(200).send({ urls: data.response.urls })
            })
            .catch((err) => console.log(err));
    },
    getImageByTag(req, res) {
        unsplash.search
            .getPhotos({
                query: req.params.tag,
                page: 1,
                perPage: 10,
            })
            .then((data) => {
                res.status(200).send({ urls: data.response.results[0].urls })
            })
            .catch((err) => console.log(err));
    }


}

module.exports = PictureController