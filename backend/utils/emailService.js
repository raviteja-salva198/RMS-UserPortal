const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "gade.manicharan12@gmail.com",
    pass: "eghd jrrw awkt iate",
  },
});

exports.sendEmail = async (to, subject, text) => {
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

exports.sendOTP = async (email, otp) => {
  const mailOptions = {
    from: "noreply@recruiterportal.com",
    to: email,
    subject: "Your OTP for login",
    html: `<p>Your OTP is: ${otp}</p>`,
  };

  await transporter.sendMail(mailOptions);
};
