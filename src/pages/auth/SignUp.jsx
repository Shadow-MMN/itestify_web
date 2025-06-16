import { useEffect, useState } from "react";
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
  const timerDuration = 60;
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [disabledSendOtp, setDisabledSendOtp] = useState(true);
  const [countDown, setCountDown] = useState(timerDuration);
  const [timerActive, setTimerActive] = useState(false);
  const [disabledCreateAccount, setDisabledCreateAccount] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isRequestingOtp, setIsRequestingOtp] = useState(false); // New state for OTP loading

  useEffect(() => {
    if (infoMessage) {
      const timeout = setTimeout(() => setInfoMessage(""), 2000);
      return () => clearTimeout(timeout);
    }
  }, [infoMessage]);

  const navigate = useNavigate();
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!timerActive) {
      setDisabledSendOtp(
        !(nameValue.trim() && emailValue.trim() && isValidEmail(emailValue)) ||
          isRequestingOtp
      );
    }
  }, [nameValue, emailValue, timerActive, isRequestingOtp]);

  useEffect(() => {
    const allFieldsFilled =
      nameValue.trim() &&
      emailValue.trim() &&
      isValidEmail(emailValue) &&
      passwordValue.trim() &&
      confirmPasswordValue.trim() &&
      otpValue.trim() &&
      passwordValue === confirmPasswordValue;

    setDisabledCreateAccount(!allFieldsFilled);
  }, [nameValue, emailValue, passwordValue, confirmPasswordValue, otpValue]);

  useEffect(() => {
    if (confirmPasswordValue.trim() && passwordValue.trim()) {
      setPasswordMismatch(passwordValue !== confirmPasswordValue);
    } else {
      setPasswordMismatch(false);
    }
  }, [passwordValue, confirmPasswordValue]);

  useEffect(() => {
    if (!timerActive) return;
    if (countDown > 0) {
      const id = setTimeout(() => setCountDown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    }
    setTimerActive(false);
    setDisabledSendOtp(
      !(nameValue.trim() && isValidEmail(emailValue)) || isRequestingOtp
    );
    setCountDown(timerDuration);
  }, [countDown, timerActive, nameValue, emailValue, isRequestingOtp]);

  const handleSendOtp = async () => {
    setDisabledSendOtp(true);
    setIsRequestingOtp(true); // Start loading state

    try {
      const apiUrl = otpSent
        ? "https://itestify-backend-38u1.onrender.com/auths/resend-email-verification-token"
        : "https://itestify-backend-38u1.onrender.com/auths/send-otp/";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to ${otpSent ? "resend" : "send"} verification code`
        );
      }

      const data = await response.json();
      console.log(`Verification code ${otpSent ? "resent" : "sent"}:`, data);

      setOtpSent(true);
      setInfoMessage(
        `Verification code ${otpSent ? "resent" : "sent"} to your email`
      );
      setCountDown(timerDuration);
      setTimerActive(true);
    } catch (error) {
      setTimerActive(false);
      setDisabledSendOtp(!(nameValue.trim() && isValidEmail(emailValue)));
      setCountDown(timerDuration);
      setInfoMessage(
        `Failed to ${otpSent ? "resend" : "send"} verification code: ${
          error.message
        }`
      );
    } finally {
      setIsRequestingOtp(false); // End loading state
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://itestify-backend-38u1.onrender.com/auths/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            full_name: nameValue,
            password: passwordValue,
            password2: confirmPasswordValue,
            otp: otpValue,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }

      const data = await response.json();
      console.log("Account created successfully:", data);

      // Store user data in localStorage
      const userData = {
        name: nameValue,
        email: emailValue,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      alert(`Failed to create account: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Placeholder for Google sign up functionality
  };

  const handleAppleSignUp = () => {
    // Placeholder for Apple sign up functionality
  };

  // Function to get button text based on current state
  const getOtpButtonText = () => {
    if (isRequestingOtp) {
      return otpSent ? "Resending..." : "Requesting...";
    }
    if (timerActive) {
      return formatTime(countDown);
    }
    return otpSent ? "Resend OTP" : "Request OTP";
  };

  return (
    <>
      <HeaderForAuth />
      <main className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
        {infoMessage && (
          <div className="max-w-[546px] mx-auto px-6 mb-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {infoMessage}
            </div>
          </div>
        )}
        <h1 className="text-center text-5xl mt-4 font-bold">
          Create an account{" "}
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleCreateAccount}>
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
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="Enter Your Full Name"
                className="py-2 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                required
              />
            </div>
          </div>

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
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="Enter Your Email Address"
                className="py-2 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                required
              />
            </div>
            {emailValue && !isValidEmail(emailValue) && (
              <p className="text-red-500 text-sm">
                Please enter a valid email address
              </p>
            )}
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
              <div className="flex w-full gap-2">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={4}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="Enter OTP"
                  className="py-2 px-4 bg-[#F5F5F5] rounded-md focus:outline-none w-2/3"
                  required
                />

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={disabledSendOtp}
                  className={`w-1/3 py-3 px-2 rounded-lg text-white ${
                    disabledSendOtp ? "bg-[#787878]" : "bg-primary-70"
                  }`}
                >
                  {getOtpButtonText()}
                </button>
              </div>
            </div>
          </div>

          {/* Password */}
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
            {passwordMismatch && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-2 rounded-lg text-white ${
              disabledCreateAccount || isSubmitting
                ? "bg-[#787878] cursor-not-allowed"
                : "bg-primary-70 hover:bg-primary-80"
            }`}
            disabled={disabledCreateAccount || isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create an account"}
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
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="p-3 border-secondary-30 border rounded-lg"
          >
            <img
              src="/flat-color-icons_google.png"
              alt="Google Icon"
              className="w-8 h-8"
            />
          </button>
          <button
            type="button"
            onClick={handleAppleSignUp}
            className="p-3 border-secondary-30 border rounded-lg"
          >
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
