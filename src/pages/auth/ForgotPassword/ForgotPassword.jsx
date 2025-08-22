import { useEffect, useState } from "react";
import HeaderForAuth from "../../../components/HeaderForAuth";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
import SuccessModal from "./SuccessModal";
import getBaseUrl from "../../../utils/baseURL";
import axios from "axios";
const ForgotPassword = () => {
  const timer = 300; // 5 minutes for OTP validity
  const [countDown, setCountDown] = useState(timer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // showOtp: Controls whether the OTP input and related UI are shown. Set to true after successful OTP request in handleFormSubmitForEmail. Used in ForgotPasswordForm and ResetPassword components.
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // useEffect: Auto-hide success messages after 1 second. Used for temporary feedback after actions like OTP sent/verified. Used in the main render for showing success messages.
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  // useEffect: Handles OTP countdown timer when showOtp is true. Used for OTP validity and resend logic in ResetPassword component.
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

  // handleEmailInput: Updates email state and clears error. Used as onChange handler for email input in ForgotPasswordForm.
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  // handlePasswordInput: Updates password state and clears error. Used as onChange handler for password input in NewPassword.
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  // handleConfirmPasswordInput: Updates confirmPassword state and clears error. Used as onChange handler for confirm password input in NewPassword.
  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  // handleFormSubmitForEmail: Handles submitting the email to request OTP. Sets showOtp to true on success. Used as onSubmit handler in ForgotPasswordForm.
  const handleFormSubmitForEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${getBaseUrl()}/auths/password-reset-otp`,
        { email }
      );

      const data = response.data;

      if (response.status === 200) {
        setShowOtp(true); // showOtp set to true here after successful OTP request
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

  // handleResendEmail: Handles resending the OTP email. Used as onClick handler for resend button in ResetPassword.
  const handleResendEmail = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${getBaseUrl()}/auths/password-reset-otp`,
        { email }
      );

      const data = response.data;

      if (response.status === 200) {
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

  // onOtpSubmit: Handles OTP verification. Sets isOtpComplete to true on success. Used as onSubmit handler for OTP input in ResetPassword.
  const onOtpSubmit = async (otp) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${getBaseUrl()}/auths/verify-otp`, {
        email,
        otp: otp.toString(),
      });

      const data = response.data;

      if (response.status === 200) {
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

  // handlePasswordReset: Handles password reset form submission. Shows success modal on success. Used as onSubmit handler in NewPassword.
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
      const response = await axios.post(
        `${getBaseUrl()}/auths/reset-password`,
        {
          email,
          password,
          password2: confirmPassword,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        // Show modal instead of success message
        setShowSuccessModal(true);
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

  // handleModalOkay: Handles closing the success modal and navigating to login. Used as onClick handler in SuccessModal.
  const handleModalOkay = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <>
      <HeaderForAuth />
      <main className="relative">
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
        <ForgotPasswordForm
          showOtp={showOtp}
          isOtpComplete={isOtpComplete}
          handleFormSubmitForEmail={handleFormSubmitForEmail}
          email={email}
          handleEmailInput={handleEmailInput}
          loading={loading}
        />

        {/* Reset Password */}
        <ResetPassword
          showOtp={showOtp}
          isOtpComplete={isOtpComplete}
          loading={loading}
          email={email}
          onOtpSubmit={onOtpSubmit}
          countDown={countDown}
          handleResendEmail={handleResendEmail}
        />

        {/* New Password Section */}
        {isOtpComplete && !showSuccessModal && (
          <NewPassword
            handlePasswordReset={handlePasswordReset}
            showPassword={showPassword}
            password={password}
            handlePasswordInput={handlePasswordInput}
            loading={loading}
            setShowPassword={setShowPassword}
            showConfirm={showConfirm}
            confirmPassword={confirmPassword}
            handleConfirmPasswordInput={handleConfirmPasswordInput}
            setShowConfirm={setShowConfirm}
          />
        )}

        {/* Success Modal */}
        {showSuccessModal && <SuccessModal handleModalOkay={handleModalOkay} />}
      </main>
    </>
  );
};

export default ForgotPassword;
