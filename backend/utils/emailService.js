const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service here
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'your-email@example.com',
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };