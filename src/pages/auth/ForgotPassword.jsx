import React, { useEffect, useState } from "react";
import HeaderForAuth from "../../components/HeaderForAuth";
import { MdOutlineMailOutline } from "react-icons/md";
import OTPInput from "../../components/OTPInput";

const ForgotPassword = () => {
  const [countDown, setCountDown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup on unmount or re-render
    }
  }, [countDown]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return (
    <>
      <HeaderForAuth />
      <main>
        {/* Forgot Password */}
        <div className="hidden">
          <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6 md:gap-12">
            <h1 className="text-center text-5xl mt-4 font-bold">
              Forgot Password
            </h1>
            <p className="text-secondary-50 text-center text-md">
              Enter your email below, and we will send you a one-time password
              (OTP) to reset your password.
            </p>
            <form className="flex flex-col gap-0 md:gap-12 justify-between h-[calc(100vh-300px)] md:h-auto">
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
        <div>
          <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6 md:gap-12">
            <h1 className="text-center text-5xl mt-4 font-bold">
              Reset Password
            </h1>
            <p className="text-secondary-50 text-center text-md">
              We sent a code to chikaamaka3007@gmail.com kindly enter the code
              below.
            </p>
            <form className="flex flex-col gap-0 md:gap-12 text-center md:h-auto">
              <OTPInput />
              <p className="text-center mt-12">
                Code valid for{" "}
                <span className="text-primary-70">{formatTime(countDown)}</span>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
