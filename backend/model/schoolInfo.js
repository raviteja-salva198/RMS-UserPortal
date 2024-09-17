const mongoose = require("mongoose");
const schoolInfo = new mongoose.Schema({
  schoolName: {
    type: String,
    trim: true,
  },
  yearofpassing: {
    type: String,
    trim: true,
  },
  standard: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  board: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  percentage: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    trim: true,
  },
  gaps: {
    type: String,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("schoolInfo", schoolInfo);
