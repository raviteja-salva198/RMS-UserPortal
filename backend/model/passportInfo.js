const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema({
  passportNumber: {
    type: Number,
    trim: true,
  },
  passportImage: {
    type: String,
    trim: true,
  },
});

const JobPreferences = mongoose.model("passportInfo", passportSchema);

module.exports = JobPreferences;
