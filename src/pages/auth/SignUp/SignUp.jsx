import { useEffect, useState } from "react";
import HeaderForAuth from "../../../components/HeaderForAuth";
import { PiWarningCircleBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import getBaseUrl from "../../../utils/baseURL";
import axios from "axios";
import { isValidEmail } from "../../../utils/isValidEmail";
import { useAuth } from "../../../context/AuthContext";
import VerifyEmail from "./VerifyEmail";
import BasicInformation from "./BasicInformation";
import SetPassword from "./SetPassword";

const SignUp = () => {
  const timer = 60;
  const [countDown, setCountDown] = useState(timer);
  const [step, setStep] = useState(1);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [
    disabledContinueBasicInformation,
    setDisabledCreateAccountBasicInformation,
  ] = useState(true);
  const [disabledContinuePassword, setDisabledCreateAccountPassword] =
    useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const currentStep = {
    1: "Basic Information",
    2: "Verification",
    3: "Password",
  }[step];
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  // Clear success/error messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timeout = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, error]);

  useEffect(() => {
    const allFieldsFilled =
      nameValue.trim() && emailValue.trim() && isValidEmail(emailValue);
    setDisabledCreateAccountBasicInformation(!allFieldsFilled);
  }, [nameValue, emailValue]);

  useEffect(() => {
    const allFieldsFilled =
      nameValue.trim() &&
      emailValue.trim() &&
      isValidEmail(emailValue) &&
      passwordValue.trim() &&
      confirmPasswordValue.trim() &&
      passwordValue === confirmPasswordValue;

    setDisabledCreateAccountPassword(!allFieldsFilled);
  }, [nameValue, emailValue, passwordValue, confirmPasswordValue]);

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

  const handleContinueBasicInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = `${getBaseUrl()}/auths/send-otp/`;

      const { data } = await axios.post(apiUrl, { email: emailValue });

      if (currentUser) {
        currentUser.email = emailValue;
      }

      setShowOtp(data.success || true);
      nextStep();
      setSuccess("Verification code sent to your email");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while sending verification code"
      );
      console.error("An error has occurred", error);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (otp) => {
    setLoading(true);
    setError("");

    try {
      // WARNING: The /auths/verify-email API is currently having issues from the backend.
      const { data } = await axios.post(`${getBaseUrl()}/auths/verify-email`, {
        email: emailValue,
        otp: otp.toString(),
      });

      console.log(data);
      setOtpValue(otp);
      setSuccess("OTP verified successfully!");
      setTimeout(() => {
        setIsOtpComplete(true);
        nextStep();
        setShowOtp(false);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Incorrect OTP");
      setLoading(false);
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // WARNING: The /auths/resend-email-verification-token API is currently having issues from the backend.
      const response = await axios.post(
        `${getBaseUrl()}/auths/resend-email-verification-token`,
        { email: emailValue }
      );

      const data = response?.data;

      if (!data || !data.success) {
        setError(data?.message || "Failed to resend OTP. Please try again.");
        return;
      }

      setCountDown(timer || 60); // fallback if timer is undefined
      setSuccess(data.message || "OTP resent successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to resend OTP. Please try again."
      );
      console.error("Error resending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // WARNING: The /auths/register API is currently having issues from the backend.
      const { data } = await axios.post(`${getBaseUrl()}/auths/register`, {
        email: emailValue,
        full_name: nameValue,
        password: passwordValue,
        password2: confirmPasswordValue,
        otp: otpValue,
      });

      console.log("Account created successfully:", data);

      localStorage.setItem(
        "user",
        JSON.stringify({ name: nameValue, email: emailValue })
      );

      setSuccess("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create account"
      );
      console.error("Failed to create account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const data = await signInWithGoogle();
      const tokenId = data.user.getIdToken();
      navigate("/");
      const response = await axios.post(`${getBaseUrl()}/auths/google-login/`, {
        id_token: tokenId,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to sign up with Google", error);
    }
    // Placeholder for Google sign up functionality
  };

  const handleAppleSignUp = () => {};

  return (
    <>
      <HeaderForAuth />

      <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6 mt-6 lg:mt-10">
        {error && (
          <div className="max-w-[546px] flex justify-center px-6 mb-4">
            <div className="w-full max-w-[361px] bg-[#E53935] h-12 p-3 rounded-lg flex items-center gap-[2.5px]">
              <div className="bg-white rounded-full p-[1.4px] flex items-center justify-center gap-2">
                <PiWarningCircleBold className="text-red-500 size-[14.12px]" />
              </div>
              <p className="text-white text-[14px]">{error}</p>
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

        {/*Progress holder */}
        <div className="flex flex-col gap-[6px] w-full">
          <div className="flex justify-between items-center w-full gap-36 lg:gap-72 text-nowrap">
            <p>Step {step} of 3</p>
            <p>{currentStep}</p>
          </div>
          <div className="bg-[#F5F5F5] h-2 w-full rounded-full">
            <div
              className="bg-primary-70 rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/*Basic Information */}
        {step === 1 && (
          <BasicInformation
            handleContinueBasicInfo={handleContinueBasicInfo}
            nameValue={nameValue}
            setNameValue={setNameValue}
            emailValue={emailValue}
            setEmailValue={setEmailValue}
            disabledContinueBasicInformation={disabledContinueBasicInformation}
            loading={loading}
            handleGoogleSignUp={handleGoogleSignUp}
            handleAppleSignUp={handleAppleSignUp}
            isValidEmail={isValidEmail}
          />
        )}

        {/*Verification */}
        {step === 2 && showOtp && (
          <VerifyEmail
            loading={loading}
            onOtpSubmit={onOtpSubmit}
            showOtp={showOtp}
            countDown={countDown}
            handleResendOtp={handleResendOtp}
            emailValue={emailValue}
          />
        )}

        {/*Password */}
        {step === 3 && isOtpComplete && (
          <SetPassword
            handleCreateAccount={handleCreateAccount}
            showPassword={showPassword}
            passwordValue={passwordValue}
            setPasswordValue={setPasswordValue}
            setShowPassword={setShowPassword}
            showConfirm={showConfirm}
            confirmPasswordValue={confirmPasswordValue}
            setConfirmPasswordValue={setConfirmPasswordValue}
            setShowConfirm={setShowConfirm}
            disabledContinuePassword={disabledContinuePassword}
            isSubmitting={isSubmitting}
          />
        )}

        <p className="text-center mt-10">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-70 cursor-pointer font-semibold text-xl"
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
