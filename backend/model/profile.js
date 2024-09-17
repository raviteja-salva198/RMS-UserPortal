const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  image: String,
  videoLink: String,
});

module.exports = mongoose.model("profile", profileSchema);
