const mongoose = require("mongoose");
const educationalInfo = new mongoose.Schema({
  schoolInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schoolInfo",
    },
  ],
  collegeInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collegeInfo",
    },
  ],
  educationLevel: {
    type: String,
    default: false,
  },
  haveGaps: {
    type: Boolean,
    default: false,
  },
  haveGapsAfter12th: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("educationalInfo", educationalInfo);
