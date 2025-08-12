import { useEffect, useState } from "react";
import HeaderForAuth from "../../../components/HeaderForAuth";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
import SuccessModal from "./SuccessModal";
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Auto-hide success messages after 5 seconds
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
          formatTime={formatTime}
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
