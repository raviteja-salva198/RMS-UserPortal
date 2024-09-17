const mongoose = require("mongoose");
const collegeInfo = new mongoose.Schema({
  collegeName: {
    type: String,
    trim: true,
  },
  degree: {
    type: String,
    trim: true,
  },
  yearofpassing: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  percentage: {
    type: String,
    trim: true,
  },
  fieldOfStudy: {
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

module.exports = mongoose.model("collegeInfo", collegeInfo);
