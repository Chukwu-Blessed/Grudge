const express = require("express");
const router = express.Router();
const { Genre } = require("../../../models");
const isLoadedIn = require("../../../middleware/isLoadedIn");

router.post("/add-genre", isLoadedIn, async (req, res, next) => {
  const { name } = req.body;
  const genre = new Genre({
    name,
  });
  await genre.save();
  return res.json({ message: "Genre saved 💽" });
});

router.get("/get-genre/:id", isLoadedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findOne({ _id: Object(id) });
    if (genre) {
      return res.json({ genre });
    } else {
      return res.json({ message: "Genre not found" });
    }
  } catch {
    return res.json({ message: "Genre not found" });
  }
});

router.get("/get-genres", isLoadedIn, async (req, res, next) => {
  const genres = await Genre.find({ users: req.user }).exec();
  return res.json({ genres });
});

router.get("/get-genre", isLoadedIn, async (req, res, next) => {
  const { s } = req.query;
  const genres = await Genre.find({
    name: { $regex: `.*${s}.*`, $options: 'i' },
  });
  return res.json({ genres });
});

router.put("/edit-genre/:id", isLoadedIn, async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const genre = await Genre.findOne({ users: req.user, _id: Object(id) });
  if (genre == null) {
    return res.status(404).json({ message: "Genre not found" });
  }
  genre.name = name;
  genre.save();
  return res.json({ message: "Genre Updated 🥳" });
});

router.delete("/delete-genre/:id", isLoadedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findOneAndDelete({
      users: req.user,
      _id: Object(id),
    });
    if (genre) {
      return res.status(200).json({ message: "Genre Deleted 🗑️" });
    } else {
      return res.status(404).json({ message: "Genre not found" });
    }
  } catch {
    return res.status(404).json({ message: "Genre not found" });
  }
});

module.exports = router;
