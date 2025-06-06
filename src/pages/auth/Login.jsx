import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLockOutline, MdOutlineMailOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import HeaderForAuth from "../../components/HeaderForAuth";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <HeaderForAuth />
      <main className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
        <h1 className="text-center text-5xl mt-4 font-bold">Welcome Back </h1>
        <form className="flex flex-col gap-5">
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
            <Link to="/forgot-password" className="text-primary-70 text-right">
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={() => navigate("/")}
            type="submit"
            className="w-full py-3 px-2 bg-primary-70 rounded-lg text-white"
          >
            Login
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
      </main>
      <p className="text-center mt-40 md:mt-12">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-primary-70 cursor-pointer">
          Create account
        </Link>
      </p>
    </>
  );
};

export default Login;
