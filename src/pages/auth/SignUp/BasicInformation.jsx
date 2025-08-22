import { MdOutlineMailOutline, MdOutlinePerson } from "react-icons/md";
import { PiWarningCircleBold } from "react-icons/pi";

const BasicInformation = ({
  handleContinueBasicInfo,
  nameValue,
  setNameValue,
  emailValue,
  setEmailValue,
  disabledContinueBasicInformation,
  loading,
  handleGoogleSignUp,
  handleAppleSignUp,
  isValidEmail,
}) => {
  return (
    <form onSubmit={handleContinueBasicInfo}>
      <section className="flex flex-col gap-5">
        <h1 className="font-bold text-[28px] lg:text-[40px] text-center">
          Create An Account
        </h1>
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-xl text-[#1E1E1E] font-semibold"
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
            className="text-xl text-[#1E1E1E] font-semibold"
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
            <div className="text-red-500 text-sm flex items-center gap-2">
              <PiWarningCircleBold className="text-red-500 size-[13.33px]" />
              <span>Wrong Email Format</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-2 mt-4 lg:mt-16 rounded-lg text-white flex items-center justify-center ${
            disabledContinueBasicInformation || loading
              ? "bg-[#787878] cursor-not-allowed"
              : "bg-primary-70 hover:bg-primary-80"
          }`}
          disabled={disabledContinueBasicInformation || loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Sending...</span>
            </div>
          ) : (
            "Continue"
          )}
        </button>

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
      </section>
    </form>
  );
};

export default BasicInformation;
