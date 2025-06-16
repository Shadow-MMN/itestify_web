import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLockOutline, MdOutlineMailOutline } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import HeaderForAuth from "../../components/HeaderForAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({ email: "", password: "" });

    try {
      const response = await fetch(
        "https://itestify-backend-38u1.onrender.com/auths/login/password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Handle successful login - store user data in localStorage
        const userData = {
          name: data.data.full_name,
          email: data.data.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.data.token.access);

        console.log("Login successful:", data);
        navigate("/");
      } else {
        // Handle error response from API
        if (
          data.message &&
          data.message.toLowerCase().includes("user not found")
        ) {
          setErrors((prev) => ({ ...prev, email: "User not found" }));
        } else if (
          data.message &&
          data.message.toLowerCase().includes("password")
        ) {
          setErrors((prev) => ({ ...prev, password: "Incorrect password" }));
        } else if (data.email) {
          setErrors((prev) => ({ ...prev, email: "User not found" }));
        } else if (data.password) {
          setErrors((prev) => ({ ...prev, password: "Incorrect password" }));
        } else {
          // Default fallback - if we can't determine the specific error, show generic messages
          setErrors((prev) => ({
            ...prev,
            email: "Login failed. Please check your credentials.",
          }));
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        email: "Network error. Please check your connection and try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder function for Google login
    console.log("Google login clicked");
    alert("Google login functionality will be implemented soon!");
  };

  const handleAppleLogin = () => {
    // Placeholder function for Apple login
    console.log("Apple login clicked");
    alert("Apple login functionality will be implemented soon!");
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <>
      <HeaderForAuth />
      <main className="px-6 max-w-[546px] mx-auto flex flex-col gap-6">
        <h1 className="text-center text-5xl mt-4 font-bold">Welcome Back </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* General Error Message */}
          {errors.general && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {errors.general}
            </div>
          )}

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
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email Address"
                className="py-2 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <FiAlertCircle className="w-4 h-4 text-red-500" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* password */}
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
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Your Password"
                className="py-2 pl-10 pr-10 bg-[#F5F5F5] w-full rounded-md focus:outline-none"
                disabled={isLoading}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {errors.password && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <FiAlertCircle className="w-4 h-4 text-red-500" />
                <span>{errors.password}</span>
              </div>
            )}
            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-primary-70 text-right"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-2 bg-primary-70 rounded-lg text-white flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading && <LoadingSpinner />}
            Login
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
            onClick={handleGoogleLogin}
            className="p-3 border-secondary-30 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src="/flat-color-icons_google.png"
              alt="Google Icon"
              className="w-8 h-8"
            />
          </button>
          <button
            type="button"
            onClick={handleAppleLogin}
            className="p-3 border-secondary-30 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src="/ic_baseline-apple.png"
              alt="Apple Icon"
              className="w-8 h-8"
            />
          </button>
        </div>
      </main>
      <p className="text-center mt-40 md:mt-12">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-primary-70 cursor-pointer">
          Create account
        </Link>
      </p>
    </>
  );
};

export default Login;
