const registrationSchema = require('../model/registrationForCertification')
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

exports.createOrder = async (req, res) => {
    const { amount, currency, receipt } = req.body;
  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        submissionData,
      } = req.body;
    
      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest("hex");
    
      if (generatedSignature === razorpay_signature) {
        try {
          // Save registration details with the transaction ID
          const newRegistration = new Registration({
            ...submissionData,
            transactionId: razorpay_payment_id,
          });
    
          await newRegistration.save();
    
          // Create email content
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: submissionData.email,
            subject: "Exam Registration Confirmation",
            html: `
              <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #0056b3;">Exam Registration Confirmation</h2>
                    <p>Dear <strong>${submissionData.fullName}</strong>,</p>
          
                    <p>We are pleased to inform you that your exam registration has been successfully completed. Thank you for your payment.</p>
          
                    <h3>Registration Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile Number:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date of Birth:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.dateOfBirth}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Gender:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.gender}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Education Level:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.educationLevel}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Specialization:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.specialization}</td>
                      </tr>
                    </table>
          
                    <h3>Exam Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Title:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examTitle}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Category:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examCategory}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Code:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examCode}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Duration:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examDuration} minutes</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Marks:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.totalMarks}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Passing Criteria:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.passingCriteria}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Type:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examType}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Attempts Allowed:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.attemptsAllowed}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Fee:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examFee}</td>
                      </tr>
                    </table>
          
                    <p>Your transaction ID is: <strong>${razorpay_payment_id}</strong>.</p>
          
                    <p>Please note that you will receive further instructions regarding the exam schedule and any preparatory materials via email.</p>
          
                    <p>If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
          
                    <p>Best regards,<br><strong>The Aptitude Guru Hem Team</strong></p>
          
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Please do not reply to this email. This is an automated message.</p>
                  </div>
                </body>
              </html>
            `,
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
    
          res.json({
            message: "Payment verified and registration saved successfully!",
          });
        } catch (error) {
          res.status(500).json({ error: "Failed to save registration details." });
        }
      } else {
        res.status(400).json({ error: "Invalid signature" });
      }
}


exports.registerExam = async (req, res) => {
    const { submissionData } = req.body;

  try {
    // Save registration details without payment
    const newRegistration = new Registration({
      ...submissionData,
      transactionId: "N/A",
    });

    await newRegistration.save();

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: submissionData.email,
      subject: "Exam Registration Confirmation",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="color: #0056b3;">Exam Registration Confirmation</h2>
              <p>Dear <strong>${submissionData.fullName}</strong>,</p>
    
              <p>We are pleased to inform you that your exam registration has been successfully completed.</p>
    
              <h3>Registration Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile Number:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.mobileNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date of Birth:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.dateOfBirth}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Gender:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.gender}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Education Level:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.educationLevel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Specialization:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.specialization}</td>
                </tr>
              </table>
    
              <h3>Exam Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Title:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Category:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examCategory}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Code:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examCode}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Duration:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examDuration} minutes</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Marks:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.totalMarks}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Passing Criteria:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.passingCriteria}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Type:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Attempts Allowed:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.attemptsAllowed}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Exam Fee:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${submissionData.examFee}</td>
                </tr>
              </table>
    
              <p>Please note that you will receive further instructions regarding the exam schedule and any preparatory materials via email.</p>
    
              <p>If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
    
              <p>Best regards,<br><strong>The Aptitude Guru Hem Team</strong></p>
    
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #777;">Please do not reply to this email. This is an automated message.</p>
            </div>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({
      message: "Registration saved successfully and confirmation email sent!",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save registration details." });
  }
}