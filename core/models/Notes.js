const { default: mongoose } = require("mongoose");
const { v4 } = require("uuid");

const Notes = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    details: {
      type: String,
    },
    publicId: {
      type: String,
      default: v4()
    },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", Notes);
