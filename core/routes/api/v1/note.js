const express = require("express");
const router = express.Router();
const { Notes } = require("../../../models");
const isLoadedIn = require("../../../middleware/isLoadedIn");

router.post("/add-note", isLoadedIn, async (req, res, next) => {
  const { title, details } = req.body;
  const note = new Notes({
    title,
    details,
    users: req.user,
  });
  await note.save();
  return res.json({ message: "Note saved 💽" });
});

router.get("/get-note/:id", isLoadedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Notes.findOne({ _id: Object(id) });
    if (note) {
      return res.json({ note });
    } else {
      return res.status(404).json({ message: "Note not found" });
    }
  } catch {
    return res.status(404).json({ message: "Note not found" });
  }
});

router.get("/get-notes", isLoadedIn, async (req, res, next) => {
  const { page } = req.query;
  let page_;
  if (page) {
    page_ = parseInt(page);
  } else {
    page_ = 1;
  }
  const pageLength = 2;
  let skip = (page_ - 1) * pageLength;
  console.log(skip);
  const length = await Notes.countDocuments();
  console.log(length)
  if (skip > length) {
    skip = 0;
  }
  const notes = await Notes.find({ users: req.user }).skip(skip).limit(pageLength);
  return res.json({ notes, length });
});

router.get("/get-note", isLoadedIn, async (req, res, next) => {
  const { s, page } = req.query;
  let page_;
  if (page) {
    page_ = parseInt(page);
  } else {
    page_ = 1;
  }
  const pageLength = 50;
  const skip = (page_ - 1) * pageLength;
  const length = await Notes.countDocuments();
  const notes = await Notes.find({
    users: req.user,
    details: { $regex: `.*${s}.*`, $options: "i" },
  })
    .skip(skip)
    .limit(pageLength);

  return res.json({ notes, length });
});

router.put("/edit-note/:id", isLoadedIn, async (req, res, next) => {
  const { title, details } = req.body;
  const { id, page } = req.params;
  const note = await Notes.findOne({ users: req.user, _id: Object(id) });
  if (note == null) {
    return res.status(404).json({ message: "Note not found 🥳" });
  }
  note.title = title;
  note.details = details;
  note.save();
  return res.json({ message: "Note Updated 🥳" });
});

router.delete("/delete-note/:id", isLoadedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Notes.findOneAndDelete({
      users: req.user,
      _id: Object(id),
    });
    if (note) {
      return res.status(200).json({ message: "Note Deleted 🗑️" });
    } else {
      return res.status(404).json({ message: "Note not found" });
    }
  } catch {
    return res.status(404).json({ message: "Note not found" });
  }
});

module.exports = router;
