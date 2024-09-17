const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});
async function sendVerification(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<p> This is you opt ${otp}</p>`
    );
  } catch (error) {
    console.log("Error occured while sending the mail pre", error);
    throw error;
  }
}
OtpSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      await sendVerification(this.email, this.otp);
    }
    next();
  } catch (error) {
    // thorwn by sendVerification
    console.log("Error in pre of mongoose", error);
  }
});
module.exports = mongoose.model("otp", OtpSchema);
