const mongoose = require("mongoose");
const company = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  countryCode: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSchema",
    },
  ],
});

module.exports = mongoose.model("companySchema", company);
