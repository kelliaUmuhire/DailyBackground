const { formatResult } = require("../../utils/imports");
const { createApi } = require("unsplash-js");

const dotenv = require("dotenv");
const { UserPicture } = require("../../models/UserPictures.model");
dotenv.config();

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
    let user_pic = await UserPicture.findOne({ user: req.user._id });
    res.status(200).send({ user_pic: user_pic });
  } catch (err) {
    return res.send(formatResult(500, err));
  }
};

/**
 * Load new image
 * @param req
 * @param res
 */
exports.LoadNewImage = async function (req, res) {
  try {
    const { data } = await unsplash.photos.getRandom({});
    let user_pic = await UserPicture.findOne({ user: req.user._id });
    const today = new Date().toISOString().split("T")[0];
    const new_pic = {
      date: today,
      regular: data.urls.regular,
      small: data.urls.small,
      thumb: data.urls.thumb,
    };

    if (!user_pic) {
      user_pic = new UserPicture({
        user: req.user._id,
        last_pics: [new_pic],
      });
    } else {
      const isThisDayFound = user_pic.last_pics.filter((e) => e.data == today);
      if (!isThisDayFound.length) {
        if (user_pic.last_pics.length < 7) {
          user_pic.last_pics.push(new_pic);
        }
      } else {
        const index = user_pic.last_pics.indexOf(isThisDayFound[0]);
        user_pic.last_pics[index] = new_pic;
      }
    }
    await user_pic.save();
    res.status(200).send({ urls: user_pic });
  } catch (err) {
    return res.send(formatResult(500, err));
  }
};
