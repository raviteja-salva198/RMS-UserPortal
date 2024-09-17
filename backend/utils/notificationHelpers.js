
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');

const sendNotification = async (event, user) => {
  const { notificationTypes } = event;

  if (notificationTypes.includes('email')) {
    await sendEmail(user.email, event.name, event.description);
  }

  if (notificationTypes.includes('sms')) {
    await sendSMS(user.phone, `${event.name}: ${event.description}`);
  }

  if (notificationTypes.includes('in-app')) {
    // Implement in-app notification logic here
    console.log('Sending in-app notification:', event.name);
  }
};

module.exports = { sendNotification };