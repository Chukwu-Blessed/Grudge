const express = require("express");
const router = express.Router();
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      var token = jwt.sign({ user: user.publicId }, "12345");
      return res.status(200).json({
        message: "Login successfull",
        data: { id: user.publicId, token },
      });
    } else {
      return res.status(400).json({ message: "Password is incorrect" });
    }
  } else {
    return res.status(404).json({ message: "Email not registered" });
  }
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      username: username,
      email: email,
      password: passwordHash,
    });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch {
    return res.status(400).json({ message: "Cannot create user" });
  }
});

router.get("/refresh-token", async (req, res, next) => {
  res.json({});
});

module.exports = router;
