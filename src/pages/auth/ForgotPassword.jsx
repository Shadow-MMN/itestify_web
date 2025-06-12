import React, { useEffect, useState } from "react";
import HeaderForAuth from "../../components/HeaderForAuth";
import { MdLockOutline, MdOutlineMailOutline } from "react-icons/md";
import OTPInput from "../../components/OTPInput";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const timer = 300; // 5 minutes for OTP validity
  const [countDown, setCountDown] = useState(timer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Auto-hide success messages after 5 seconds
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success]);

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
    setError(""); // Clear error when user starts typing
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleFormSubmitForEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://itestify-backend-38u1.onrender.com/auths/password-reset-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowOtp(true);
        setCountDown(timer); // Reset countdown
        setSuccess("OTP sent successfully to your email!");
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://itestify-backend-38u1.onrender.com/auths/password-reset-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCountDown(timer);
        setSuccess("OTP resent successfully!");
      } else {
        setError(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      console.error("Error resending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (otp) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://itestify-backend-38u1.onrender.com/auths/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otp.toString(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          setLoading(false);
          setIsOtpComplete(true);
        }, 1000);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
      console.error("Error verifying OTP:", error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://itestify-backend-38u1.onrender.com/auths/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            password2: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to home...");
        setTimeout(() => {
          navigate("/"); // Navigate to home page
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderForAuth />
      <main>
        {/* Error/Success Messages */}
        {error && (
          <div className="max-w-[546px] mx-auto px-6 mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}
        {success && (
          <div className="max-w-[546px] mx-auto px-6 mb-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          </div>
        )}

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
              onSubmit={handleFormSubmitForEmail}
              className="flex flex-col gap-0 md:gap-12 justify-between h-[calc(100vh-300px)] md:h-auto"
            >
              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
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
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-2 rounded-lg text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-70 hover:bg-primary-80"
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
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
                    Didn't receive any mail?{" "}
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={loading}
                      className={`${
                        loading
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary-70 hover:text-primary-80"
                      }`}
                    >
                      {loading ? "Resending..." : "Resend Mail"}
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

        {/* New Password Section */}
        {isOtpComplete && (
          <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
            <h1 className="text-center text-5xl mt-4 font-bold">
              New Password
            </h1>
            <p className="text-center text-lg">
              Create a secure password for your account
            </p>
            <form
              onSubmit={handlePasswordReset}
              className="flex flex-col gap-5"
            >
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
                    required
                    value={password}
                    onChange={handlePasswordInput}
                    disabled={loading}
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
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordInput}
                    disabled={loading}
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <p className="text-secondary-70">
                  Password should be at least 8 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !password || !confirmPassword}
                className={`w-full py-3 px-2 rounded-lg text-white mt-12 ${
                  loading || !password || !confirmPassword
                    ? "bg-[#787878] cursor-not-allowed"
                    : "bg-primary-70 hover:bg-primary-80"
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
};

export default ForgotPassword;
