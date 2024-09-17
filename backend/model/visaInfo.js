const mongoose = require("mongoose");
const visaSchema = new mongoose.Schema({
  country: {
    type: String,
    trim: true,
  },
  visaType: {
    type: String,
    trim: true,
  },
  visaNumber: {
    type: String,
    trim: true,
  },
  visaImage: {
    type: String,
    trim: true,
  },
});

const visaPreferences = mongoose.model("visaInfo", visaSchema);

module.exports = visaPreferences;
