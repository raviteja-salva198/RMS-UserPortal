const mongoose = require('mongoose');

const NotificationEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['recruiter', 'candidate', 'both'],
    required: true,
  },
  notificationTypes: {
    type: [String],
    enum: ['email', 'sms', 'in-app'],
    required: true,
  },
});

module.exports = mongoose.model('NotificationEvent', NotificationEventSchema);