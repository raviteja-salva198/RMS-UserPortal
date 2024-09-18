import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  UserLoginStyle,
  Note,
  Button,
  InputContainerWithIcon,
  InputContainerWithOutIcon,
} from "./userLoginStyle";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/reducers/authSlice";
const UserLoginComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn, status, error } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to home page after successful login
    }
  }, [isLoggedIn, navigate]);

  const forgotPasswordFunction = () => {
    navigate("/forgot-password", { state: { type: "User" } });
  };
  return (
    <>
      <UserLoginStyle>
        <div className="container max_w_380">
          <h1 className="heading">
            <span className="blue">Welcome to</span>
            <br />
            Aptitude Guru Hem <span className="red">RMS</span>
          </h1>
          <form onSubmit={handleSubmit(handleLogin)} className="form">
            <div className="form__container">
              <div className="input_container">
                <label htmlFor="email">Email</label>
                <InputContainerWithIcon>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="linda@framcreative.com"
                    {...register("email", { required: true })}
                  />
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </InputContainerWithIcon>

                {errors.email && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>Please enter your Email</p>
                  </div>
                )}
              </div>
              <div className="input_container">
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
                <InputContainerWithIcon>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Your Password"
                    {...register("password", { required: true })}
                  />
                  <div className="icon">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                </InputContainerWithIcon>
                {errors.password && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>Please enter your password</p>
                  </div>
                )}
              </div>
            </div>

            <p className="forget_password" onClick={forgotPasswordFunction}>
              Forgot password
            </p>

            <div className="button_Container">
              <Button $primary type="submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Login"
                )}
              </Button>
              {/* <p>OR</p>
              <Button
                onClick={() => {
                  navigate("/userSignup");
                }}
              >
                Create Account
              </Button> */}
            </div>
          </form>
          <Note>
            If you don't have an account yet, you can create by click{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create Account
            </span>{" "}
            Button.
          </Note>
        </div>
      </UserLoginStyle>
    </>
  );
};
export default UserLoginComponent;