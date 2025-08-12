import OTPInput from "../../../components/OTPInput";

const ResetPassword = ({
  showOtp,
  isOtpComplete,
  loading,
  email,
  onOtpSubmit,
  countDown,
  formatTime,
  handleResendEmail,
}) => {
  return (
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
            <OTPInput length={4} onOtpSubmit={onOtpSubmit} showOtp={showOtp} />
            {countDown > 0 ? (
              <p className="text-center mt-12">
                Code valid for{" "}
                <span className="text-primary-70">{formatTime(countDown)}</span>
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
  );
};

export default ResetPassword;
