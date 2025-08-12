import { MdOutlineMailOutline } from "react-icons/md";

const ForgotPasswordForm = ({
  showOtp,
  isOtpComplete,
  handleFormSubmitForEmail,
  email,
  handleEmailInput,
  loading,
}) => {
  return (
    <div
      className={`${showOtp ? "hidden" : "block"} ${
        isOtpComplete ? "hidden" : "block"
      }`}
    >
      <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6 md:gap-12">
        <h1 className="text-center text-5xl mt-4 font-bold">Forgot Password</h1>
        <p className="text-secondary-50 text-center text-md">
          Enter your email below, and we will send you a one-time password (OTP)
          to reset your password.
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
  );
};

export default ForgotPasswordForm;
