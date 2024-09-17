const mongoose = require("mongoose");
const Job = new mongoose.Schema({
  company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companySchema",
    },
  ],
  skills: [
    {
      type: String,
      require: true,
    },
  ],
  package: {
    type: Number,
    require: true,
  },
  verdict: {
    type: String,
  },
  jobLocation: [
    {
      type: String,
      require: true,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dataandtime: [
    {
      type: Date,
      require: true,
    },
  ],
});
module.exports = mongoose.model("JobSchema", Job);
