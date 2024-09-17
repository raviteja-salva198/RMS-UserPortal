const mongoose=require('mongoose')

const applicationSchema = new mongoose.Schema({
    date: { type: String, required: true },
    jobPosition: { type: String, required: true },
    status: { type: String, required: true },
    totalApplications: { type: Number, required: true }
  });

  module.exports = mongoose.model('Application', applicationSchema);