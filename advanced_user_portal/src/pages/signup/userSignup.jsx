import React, { useEffect, useState } from "react";

// import { UserSignupStyle } from "./user-signup-style";

import {
  UserLoginStyle,
  Note,
  Button,
  InputContainerWithOutIcon,
  InputContainerWithIcon,
  PasswordErrors,
} from "../login/userLoginStyle";
import { countryCodeData } from "../../data/country-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUpForm from "./signupForm";
import OtpPageComponent from "../otp/otpPage";

const UserSignupComponent = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [signUpData, setSignUpData] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <UserLoginStyle>
        <div className="container max_w_760">
          <h1 className="heading">
            <span className="blue">Welcome to</span>
            <br />
            Aptitude Guru Hem <span className="red">RMS</span>
          </h1>

          {isOtpSend ? (
            <div>
              <OtpPageComponent
                signUpData={signUpData}
                setSignUpData={setSignUpData}
                setIsOtpSend={setIsOtpSend}
              />
            </div>
          ) : (
            <SignUpForm
              setIsOtpSend={setIsOtpSend}
              setSignUpData={setSignUpData}
            />
          )}

          <Note>
            Already have an Account Go to{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </span>
          </Note>
        </div>
      </UserLoginStyle>
    </>
  );
};
export default UserSignupComponent;