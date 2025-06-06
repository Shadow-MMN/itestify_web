import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import HeaderForAuth from "../../components/HeaderForAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [isNameInputed, setIsNameInputed] = useState(false);
  // const [isEmailInputed,setIsEmailInputed] = useState(false)
  // const [isVerificationInputed,setIsVerificationInputed] = useState(false)
  // const [isPasswordInputed,setIsPasswordInputed] = useState(false)
  // const [isConfirmPasswordInputed,setIsConfirmPasswordInputed] = useState(false)
  // const [isAllFieldsCompleted, setIsAllFieldsCompleted] = useState(false)
  const navigate = useNavigate();
  return (
    <>
      <HeaderForAuth />
      <main className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
        <h1 className="text-center text-5xl mt-4 font-bold">
          Create an account{" "}
        </h1>
        <form className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-xl text-[#1E1E1E] font-light"
            >
              Full Name
            </label>
            <div className="relative w-full">
              <MdOutlinePerson className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter Your Full Name"
                className="py-2 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
              />
            </div>
          </div>
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
          {/* Verification Code */}
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="otp"
                className="text-xl text-[#1E1E1E] font-light"
              >
                Verification Code
              </label>
              <div className="flex  gap-2">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="py-2 px-4 bg-[#F5F5F5] rounded-md focus:outline-none w-2/3"
                />
                <button className="w-1/3 py-3 px-2 bg-[#787878] rounded-lg text-white">
                  Send OTP
                </button>
              </div>
            </div>
          </div>
          {/* password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xl text-[#1E1E1E] font-light"
            >
              Password
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
            <p className="text-secondary-70">
              Password should be up to 8 characters
            </p>
          </div>
          {/* confirm password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-xl text-[#1E1E1E] font-light"
            >
              Re-enter Password
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
          </div>
          <button
            onClick={() => navigate("/")}
            type="submit"
            className="w-full py-3 px-2 bg-[#787878] rounded-lg text-white"
            disabled={true}
          >
            Create an account
          </button>
        </form>
        {/* OR */}
        <div className="flex items-center gap-2">
          <hr className="w-1/2 bg-secondary-30 h-[1px]" />
          <span className="text-secondary-30">OR</span>
          <hr className="w-1/2 bg-secondary-30 h-[1px]" />
        </div>
        {/* Google and Apple */}
        <div className="flex items-center justify-center gap-4">
          <button className="p-3 border-secondary-30 border rounded-lg">
            <img
              src="/flat-color-icons_google.png"
              alt="Google Icon"
              className="w-8 h-8"
            />
          </button>
          <button className="p-3 border-secondary-30 border rounded-lg">
            <img
              src="/ic_baseline-apple.png"
              alt="Apple Icon"
              className="w-8 h-8"
            />
          </button>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-70 cursor-pointer">
            Log in
          </Link>
        </p>
      </main>
    </>
  );
};

export default SignUp;
