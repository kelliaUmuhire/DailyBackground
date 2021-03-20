const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
