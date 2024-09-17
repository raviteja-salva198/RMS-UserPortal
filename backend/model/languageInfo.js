const mongoose = require("mongoose");
const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    trim: true,
  },
  reading: {
    type: String,
    trim: true,
  },
  writing: {
    type: String,
    trim: true,
  },
  speaking: {
    type: String,
    trim: true,
  },
});

const languageInfo = mongoose.model("languageInfo", languageSchema);

module.exports = languageInfo;
