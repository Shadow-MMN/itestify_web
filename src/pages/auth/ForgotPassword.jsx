import React, { useEffect, useState } from "react";
import HeaderForAuth from "../../components/HeaderForAuth";
import { MdLockOutline, MdOutlineMailOutline } from "react-icons/md";
import OTPInput from "../../components/OTPInput";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { formatTime } from "../../utils/FormatTime";
const ForgotPassword = () => {
  const otpChecker = 4252;
  const timer = 3000;
  const [countDown, setCountDown] = useState(timer); //chikaamaka3007@gmail.com
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (showOtp) {
      if (countDown > 0) {
        const timer = setTimeout(() => {
          setCountDown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [countDown, showOtp]);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handleFormSubmitForEmail = (e) => {
    e.preventDefault();
    //Call Backend
    setShowOtp((prev) => !prev);
  };
  const handleResendEmail = () => {
    setShowOtp(false);
    setCountDown(timer);
  };
  const onOtpSubmit = (Otp) => {
    console.log("Login Succcessful", Otp);
    // check otp in from backend
    if (Otp == otpChecker) {
      setLoading(true);
    }
  };
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setIsOtpComplete(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);
  return (
    <>
      <HeaderForAuth />
      <main>
        {/* Forgot Password */}
        <div
          className={`${showOtp ? "hidden" : "block"} ${
            isOtpComplete ? "hidden" : "block"
          }`}
        >
          <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6 md:gap-12">
            <h1 className="text-center text-5xl mt-4 font-bold">
              Forgot Password
            </h1>
            <p className="text-secondary-50 text-center text-md">
              Enter your email below, and we will send you a one-time password
              (OTP) to reset your password.
            </p>
            <form
              onSubmit={(e) => handleFormSubmitForEmail(e)}
              className="flex flex-col gap-0 md:gap-12 justify-between h-[calc(100vh-300px)] md:h-auto"
            >
              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="text-xl text-[#1E1E1E] font-light"
                >
                  Email Address
                </label>
                <div className="relative w-full">
                  <MdOutlineMailOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    className="py-2 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                    required
                    value={email}
                    onChange={handleEmailInput}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-2 bg-primary-70 rounded-lg text-white"
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
        {/* Reset Password */}
        <div
          className={`${showOtp ? "block" : "hidden"}  ${
            isOtpComplete ? "hidden" : "block"
          }`}
        >
          <div className={`${loading ? "opacity-25" : "opacity-100"}`}>
            <div
              className={`px-6 max-w-[546px] mx-auto flex flex-col gap-6 md:gap-12`}
            >
              <h1 className="text-center text-5xl mt-4 font-bold">
                Reset Password
              </h1>
              <p className="text-secondary-50 text-center text-md">
                We sent a code to {email} kindly enter the code below.
              </p>
              <form className="flex flex-col gap-0 md:gap-12 text-center md:h-auto">
                <OTPInput
                  length={4}
                  onOtpSubmit={onOtpSubmit}
                  showOtp={showOtp}
                />
                {countDown > 0 ? (
                  <p className="text-center mt-12">
                    Code valid for{" "}
                    <span className="text-primary-70">
                      {formatTime(countDown)}
                    </span>
                  </p>
                ) : (
                  <p className="text-center mt-12">
                    Didn’t receive any mail?{" "}
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      className="text-primary-70"
                    >
                      Resend Mail
                    </button>
                  </p>
                )}
              </form>
            </div>
          </div>
          {loading && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
              <div className="relative w-20 h-20">
                {/* Spinning border */}
                <div className="absolute inset-0 w-20 h-20 rounded-full border-8 border-purple-200 border-t-purple-600 animate-spin"></div>

                {/* Static image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/Vector 2.png" alt="Logo" className="w-8 h-8" />
                </div>
              </div>
            </div>
          )}
        </div>
        {isOtpComplete && (
          <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
            <h1 className="text-center text-5xl mt-4 font-bold">
              New Password
            </h1>
            <p className="text-center text-lg">
              Create a secure password for your account
            </p>
            <form className="flex flex-col gap-5">
              {/* password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-xl text-[#1E1E1E] font-light"
                >
                  New Password
                </label>
                <div className="relative w-full">
                  <MdLockOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="py-2 pl-10 pr-10 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              {/* confirm password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-xl text-[#1E1E1E] font-light"
                >
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <MdLockOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Your Password"
                    className="py-2 pl-10 pr-10 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <p className="text-secondary-70">
                  Password should be up to 8 characters
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                type="submit"
                className="w-full py-3 px-2 bg-[#787878] rounded-lg text-white mt-12"
                disabled={true}
              >
                Create an account
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
};

export default ForgotPassword;
