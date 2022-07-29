const { default: mongoose } = require("mongoose");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt")

const User = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  publicId: {
    type: String,
    default: v4(),
  },
}).pre("save", async (next) => {
  const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", User);
