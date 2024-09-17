const mongoose = require("mongoose");
const Address = new mongoose.Schema({
  houseAddress: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  zipcode: {
    type: Number,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("Address", Address);
