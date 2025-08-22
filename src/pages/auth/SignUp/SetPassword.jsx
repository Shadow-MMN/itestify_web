import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { PiWarningCircleBold } from "react-icons/pi";

const SetPassword = ({
  handleCreateAccount,
  showPassword,
  passwordValue,
  setPasswordValue,
  setShowPassword,
  showConfirm,
  confirmPasswordValue,
  setConfirmPasswordValue,
  setShowConfirm,
  disabledContinuePassword,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleCreateAccount}>
      <section className="flex flex-col gap-5">
        <h1 className="font-bold text-[28px] lg:text-[40px] text-center">
          Set Password
        </h1>
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-xl text-[#1E1E1E] font-semibold"
          >
            Password
          </label>
          <div className="relative w-full">
            <MdLockOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="Enter Your Password"
              className="py-2 pl-10 pr-10 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
              required
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-xl text-[#1E1E1E] font-semibold"
          >
            Re-enter Password
          </label>
          <div className="relative w-full">
            <MdLockOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              placeholder="Confirm Your Password"
              className="py-2 pl-10 pr-10 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
              required
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {passwordValue &&
            confirmPasswordValue &&
            passwordValue !== confirmPasswordValue && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <PiWarningCircleBold className="text-red-500 size-[13.33px]" />
                <span>Passwords do not match</span>
              </div>
            )}
          <p className="text-secondary-70">
            Password should be up to 8 characters and should match
          </p>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-2 mt-4 lg:mt-16 rounded-lg text-white flex items-center justify-center ${
            disabledContinuePassword || isSubmitting
              ? "bg-[#787878] cursor-not-allowed"
              : "bg-primary-70 hover:bg-primary-80"
          }`}
          disabled={disabledContinuePassword || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </section>
    </form>
  );
};

export default SetPassword;
