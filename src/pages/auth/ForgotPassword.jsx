import React, { useEffect, useState } from "react";
import HeaderForAuth from "../../components/HeaderForAuth";
import { MdOutlineMailOutline } from "react-icons/md";
import OTPInput from "../../components/OTPInput";

const ForgotPassword = () => {
  const timer = 10;
  const [countDown, setCountDown] = useState(timer); // 5 minutes in seconds We sent a code to chikaamaka3007@gmail.com kindly enter the code below
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);

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

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
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
  };
  return (
    <>
      <HeaderForAuth />
      <main>
        {/* Forgot Password */}
        <div className={`${showOtp ? "hidden" : "block"}`}>
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
        <div className={`${showOtp ? "block" : "hidden"}`}>
          <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6 md:gap-12">
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
      </main>
    </>
  );
};

export default ForgotPassword;
