const jwt = require("jsonwebtoken");
const { User } = require("../models");

const isLoadedIn = async (req, res, next) => {
  const bearerHearder = req.headers["authorization"];
  // console.log(bearerHearder);
  // console.log(bearerHearder);
  // console.log(bearerHearder);
  // console.log(bearerHearder);
  // console.log(bearerHearder);
  if (bearerHearder != "") {
    const token = jwt.verify(bearerHearder, "12345");
    const user = await User.findOne({ publicId: token.user });
    req.user = user;
    next();
  } else {
    return res.status(403).json({ message: "Login Reqired" });
  }
};

module.exports = isLoadedIn;
