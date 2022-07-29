const mongoose = require("mongoose").set("debug", false);

mongoose
  .connect("mongodb://localhost:27017/grudgedb")
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.error("Cannot connecct to database");
  });

module.exports = mongoose;
