const mongoose = require("./config");
const { v4 } = require("uuid");
const Notes = require("./Notes");
const User = require("./User");
const Genre = require("./Genre");

module.exports = { Notes, User, Genre, mongoose };
