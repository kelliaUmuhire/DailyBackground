import { createApi } from 'unsplash-js';

const serverApi = createApi({
    accessKey: process.env.ACCESS_KEY,
    //...other fetch options
  });

