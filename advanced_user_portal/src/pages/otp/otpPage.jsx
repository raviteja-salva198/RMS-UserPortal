import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { OtpPageStyle } from "./otpPageStyle";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const maskedEmail = (email) => {
  const [mail, domain] = email.split("@");
  if (mail.length <= 2) {
    return mail + "@" + domain;
  }
  let halfMail = mail.length / 2;
  const newMail = mail.substring(0, halfMail);
  return newMail + "...@" + domain;
};

const OtpPageComponent = ({ signUpData, setSignUpData, setIsOtpSend }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Start loading indicator
    if (otp.length != 6) {
      toast.error("Enter 6 digits");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Please up...");

    try {
      // Sign up the user
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/signup`,
        { ...signUpData, otp: otp }
      );
      toast.dismiss(toastId);
      setLoading(false);
      toast.success("signup successful");
      navigate("/login");
    } catch (error) {
      // Handle sign-up errors
      console.error("Sign-up error:", error);
      toast.dismiss(toastId);
      setLoading(false);
      toast.error("An error occurred during sign-up. Please try again.");
    }
  };

  //TODO: Re-Thing about it signUpData ;

  // its necessary to get email in below path (state.data.email);
  return (
    <>
      <OtpPageStyle>
        <div className="container">
          <h2>Authentication</h2>
          <div className="form__element">
            <p className="description">
              Hello! Your one-time password has been sent to your email address.
              Enter the code here to complete the verification process.
            </p>
            <div className="otp-container">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="number"
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="button-container">
              <button
                type="submit"
                disabled={loading}
                onClick={() => handleSubmit()}
                className="primary-btn"
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
              </button>
              <button
                onClick={() => {
                  setSignUpData(null);
                  setIsOtpSend(false);
                }}
                className="secondary-btn"
              >
                Back
              </button>
            </div>
          </div>
          {/* Uncomment when ready to implement resend OTP functionality
        <div
          onClick={() => {
            resendDisabled === false && handleResendAndValidate();
          }}
          className="resend-otp"
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} color="#0b5fff" />{" "}
          <p>
            {resendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
          </p>
        </div>
        */}
        </div>
      </OtpPageStyle>
    </>
  );
};
export default OtpPageComponent;