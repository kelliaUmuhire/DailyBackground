const express = require("express");
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");
global.fetch = fetch;

app.use(cors());

const dotenv = require("dotenv");
const { UserRoutes } = require("./routes/user/user.route");
dotenv.config();

require('./models/db')

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", UserRoutes);
app.get("/", (req, res) => {
    res.send("Welcome");
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
