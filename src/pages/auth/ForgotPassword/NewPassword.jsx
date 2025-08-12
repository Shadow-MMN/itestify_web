import { FaEye, FaEyeSlash } from "react-icons/fa6";

const NewPassword = ({
  handlePasswordReset,
  showPassword,
  password,
  handlePasswordInput,
  loading,
  setShowPassword,
  showConfirm,
  confirmPassword,
  handleConfirmPasswordInput,
  setShowConfirm,
}) => {
  return (
    <div className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
      <h1 className="text-center text-5xl mt-4 font-bold">New Password</h1>
      <p className="text-center text-lg">
        Create a secure password for your account
      </p>
      <form onSubmit={handlePasswordReset} className="flex flex-col gap-5">
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
  );
};

export default NewPassword;
