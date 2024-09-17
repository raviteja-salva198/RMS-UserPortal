const mongoose = require("mongoose");
const jobInfo = new mongoose.Schema({
  Jobtitle: {
    type: String,
    trim: true,
  },
  employmentType: {
    type: String,
    trim: true,
  },
  Company: {
    type: String,
    trim: true,
  },
  startDate: {
    type: String,
    trim: true,
  },
  endDate: {
    type: String,
    trim: true,
  },
  achivements: {
    type: String,
    trim: true,
  },
  reasonforLeavingPreviousJob: {
    type: String,
    trim: true,
  },
  previousSalary: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("jobInfo", jobInfo);
