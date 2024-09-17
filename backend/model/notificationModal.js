const mongoose = require("mongoose");
const notificationModal = new mongoose.Schema({
  company: {
    ref: "companySchema",
    type: String,
  },
  role: {
    type: String,
  },
  salary: {
    type: String,
  },
});
module.exports = mongoose.model("NotificationModal", notificationModal);
