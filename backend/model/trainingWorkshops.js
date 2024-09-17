const mongoose = require("mongoose");
const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const workshop = mongoose.model("workshopInfo", workshopSchema);

module.exports = workshop;
