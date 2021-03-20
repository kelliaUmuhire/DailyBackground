const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
