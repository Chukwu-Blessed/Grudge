const express = require("express");
const app = express();
var cors = require("cors");
require('dotenv')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));


const PORT = process.env.PORT || 3000;

// Route Setup
const apiAuthv1 = require("./routes/api/v1/auth");
const apiNotesv1 = require("./routes/api/v1/note");
const apiGenrev1 = require("./routes/api/v1/genre");

app.use((req, res, next) => {
  if (req.url.substring(0, 4) !== "/api") {
    return res.sendFile(__dirname + "/dist/index.html");
  }
  next();
});

app.use("/api/v1", apiNotesv1);
app.use("/api/v1", apiGenrev1);
app.use("/api/v1/account", apiAuthv1);


// Server listening to port 3000
app.listen(PORT, () => {
  console.log("REST API is Running on", PORT);
  app.set("LISTENING", PORT);
});

module.exports = app