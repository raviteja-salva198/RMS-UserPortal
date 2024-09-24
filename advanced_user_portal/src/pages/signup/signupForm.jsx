import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputContainerWithOutIcon,
  InputContainerWithIcon,
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

const SignUpForm = ({ setIsOtpSend, setSignUpData }) => {
  //TODO: I have to re-think on it
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryCode: "+91",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCopyPaste = (event) => {
    event.preventDefault();
  };

  const validatePassword = {
    isNumberPresend: (v) =>
      /(?=.*\d)/.test(v) || "Password must contain 1 digit",
    isSpecialChar: (v) =>
      /(?=.*[@$!%*?&])/.test(v) || "Password must contain 1 special Charater",
    isUpperCase: (v) =>
      /(?=.*[A-Z])/.test(v) || "Password must contain 1 Upper Case Letter",
    isLowerCase: (v) =>
      /(?=.*[a-z])/.test(v) || "Password must contain 1 Lower Case Letter",
    isLengthOk: (v) => v.length >= 8 || "At least 8 charater in password",
  };

  const getOtp = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match");
      setFocus("confirmPassword");
      return;
    }
    // Start loading indicator
    setLoading(true);
    const toastId = toast.loading("Please wait...");
    try {
      await axios.post(`http://localhost:23000/api/v1/user/otp`, {
        email: data.email,
      });
      // OTP sent successfully
      toast.success("OTP sent successfully");
      setSignUpData(data);
      setIsOtpSend(true);
    } catch (otpError) {
      // Error while sending OTP
      toast.error("Could not send OTP");
      console.error("Error sending OTP:", otpError);
    } finally {
      // Stop loading indicator
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(getOtp)} className="form">
        <div className="form__container">
          <div className="two_column">
            <div className="input_container class__one">
              <label htmlFor="firstName">First Name</label>
              <InputContainerWithOutIcon>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  {...register("firstName", { required: true })}
                />
              </InputContainerWithOutIcon>
              {errors.firstName && (
                <div className="warning__text">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>Please enter First Name</p>
                </div>
              )}
            </div>
            <div className="input_container class__two">
              <label htmlFor="lastName">Last Name</label>
              <InputContainerWithOutIcon>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  {...register("lastName", { required: true })}
                />
              </InputContainerWithOutIcon>

              {errors.lastName && (
                <div className="warning__text">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>Please enter your last name</p>
                </div>
              )}
            </div>
          </div>
          {/* FIXME: is college name required here */}
          {/* <div className="grid_layout">
                <div className="input_container">
                  <label htmlFor="collegename">College Name</label>
                  <InputContainerWithIcon $isRight>
                    <select
                      id="collegename"
                      name="collegename"
                      placeholder="college Name"
                      {...register("collegename", { required: true })}
                    >
                      {existingCollegeNames &&
                        existingCollegeNames.length > 0 &&
                        existingCollegeNames.map((item, index) => {
                          return (
                            <option key={index} value={item.collegeName}>
                              {item.collegeName}
                            </option>
                          );
                        })}
                    </select>
                    <div className="icon">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                  </InputContainerWithIcon>
                </div>
              </div> */}
          <div className="two_column">
            <div className="input_container  class__three">
              <label htmlFor="email">Email</label>
              <InputContainerWithOutIcon>
                <input
                  autoComplete="true"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  {...register("email", { required: true })}
                />
              </InputContainerWithOutIcon>
              {errors.email && (
                <div className="warning__text">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>Please enter your Email</p>
                </div>
              )}
            </div>
            <div className="input_container">
              <label htmlFor="mobile">Mobile</label>
              <div className="input_container ">
                <div className="phone_number_container">
                  <InputContainerWithIcon>
                    <select
                      name="countryCode"
                      placeholder="Code"
                      {...register("countryCode", { required: true })}
                    >
                      {countryCodeData.map((item, index) => {
                        return (
                          <option key={index} value={item.code}>
                            {item.short}
                          </option>
                        );
                      })}
                    </select>
                  </InputContainerWithIcon>
                  <InputContainerWithOutIcon>
                    <input
                      type="number"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter Mobile number"
                      {...register("mobile", {
                        required: {
                          value: true,
                          message: "Please enter your mobile number",
                        },
                        maxLength: {
                          value: 12,
                          message: "Invalid phone number",
                        },
                        minLength: {
                          value: 10,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                  </InputContainerWithOutIcon>
                </div>
              </div>

              {errors.mobile && (
                <div className="warning__text">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>Please enter your Mobile Number</p>
                </div>
              )}
            </div>
            <div className="input_container"></div>
          </div>

          <div className="two_column">
            <div className="input_container  class__one">
              <div className="label_with_icon">
                <label htmlFor="password">Password</label>
                <div
                  className="hide_show"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <>
                      {/* hide */}
                      <FontAwesomeIcon icon={faEyeSlash} size="xs" />
                      <p>Hide</p>{" "}
                    </>
                  ) : (
                    <>
                      {/* show */}
                      <FontAwesomeIcon icon={faEye} size="xs" />
                      <p>Show</p>
                    </>
                  )}
                </div>
              </div>
              <InputContainerWithIcon className="input_field">
                <input
                  autoComplete="true"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onCopy={handleCopyPaste}
                  onPaste={handleCopyPaste}
                  placeholder="Enter the password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This is required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    },
                    validate: validatePassword,
                  })}
                />
                <div className="icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
              </InputContainerWithIcon>
              {errors?.password && (
                <div className="warning__text">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>{errors?.password?.message}</p>
                </div>
              )}
            </div>
            <div className="input_container  class__two">
              <div className="label_with_icon">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div
                  className="hide_show"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <>
                      {/* hide */}
                      <FontAwesomeIcon icon={faEyeSlash} size="xs" />
                      <p>Hide</p>{" "}
                    </>
                  ) : (
                    <>
                      {/* show */}
                      <FontAwesomeIcon icon={faEye} size="xs" />
                      <p>Show</p>
                    </>
                  )}
                </div>
              </div>
              <InputContainerWithIcon className="input_field">
                <input
                  autoComplete="true"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  onCopy={handleCopyPaste}
                  onPaste={handleCopyPaste}
                  placeholder="Enter the confirm password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "This is required",
                    },
                    validate: validatePassword,
                  })}
                />
                <div className="icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
              </InputContainerWithIcon>

              {errors?.confirmPassword && (
                <div className="warning__text">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>{errors?.confirmPassword.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="two_column span_end">
          {/* below div is required to give button desired position */}
          <div></div>
          <Button type="submit" $primary disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;