const { default: mongoose } = require("mongoose");


const Genre = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Genre", Genre);
