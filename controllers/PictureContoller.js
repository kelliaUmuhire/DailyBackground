import { createApi } from 'unsplash-js';

const unsplash = new createApi({
    accessKey: process.env.,
});

const PictureController = {
    getRandomPicture(req,res){
    unsplash.photos
    .getRandom({})
    .then((data) => {
    console.log(data);
    })
    .catch((err) => console.log(err));
    }

}
