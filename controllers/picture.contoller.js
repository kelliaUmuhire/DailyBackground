const { createApi } = require("unsplash-js");

const dotenv = require("dotenv");
dotenv.config();

const unsplash = new createApi({
  accessKey: process.env.ACCESS_KEY,
  // headers: {
  //   Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
  // },
  // query: {
  //   client_id: process.env.ACCESS_KEY,
  // },
});

const PictureController = {
  getRandomPicture(req, res) {
    console.log(
      "dt3llEYAVbaWKe2TkN6M4LSv-JoXLFHyAMk2vLeLWvI" == process.env.ACCESS_KEY
    );
    unsplash.photos
      .getRandom({})
      .then((data) => {
        console.log(data);
        res.status(200).send({ urls: data.response.urls });
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
        res.status(200).send({ urls: data.response.results[0].urls });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = PictureController;

/**
 *
 * doc
 * {
 *      user_id
 *      last_pics:[
 *          { pic_url * 5, date  }
 *          // size ni 7
 *      ]
 * }
 *
 */
