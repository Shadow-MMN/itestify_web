import { useEffect, useRef, useState } from "react";

// showOtp: When true, focuses the first OTP input. Controlled by parent (e.g., ForgotPassword) to show/hide OTP UI and trigger focus.
const OTPInput = ({ length = 4, onOtpSubmit = () => {}, showOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // useEffect: Focuses the first OTP input when showOtp becomes true. Used for improved UX when OTP UI is shown.
  useEffect(() => {
    if (showOtp) {
      inputRefs.current[0]?.focus();
    }
  }, [showOtp]);

  // handleChange: Handles input change for each OTP field, updates OTP state, auto-focuses next, and submits when complete. Used as onChange handler for each input.
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // handlePaste: Handles pasting into OTP fields, fills values, focuses next, and submits if complete. Used as onPaste handler for each input.
  const handlePaste = (index, e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");

    // Extract only numeric characters from the pasted text
    const numericPaste = paste.replace(/\D/g, "");

    if (numericPaste.length === 0) return;

    const newOtp = [...otp];

    // Fill the OTP array starting from the current index
    for (let i = 0; i < numericPaste.length && index + i < length; i++) {
      newOtp[index + i] = numericPaste[i];
    }

    setOtp(newOtp);

    // Focus on the next empty field or the last field if all are filled
    const nextIndex = Math.min(index + numericPaste.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    // Submit if OTP is complete
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  };

  // handleClick: Ensures correct focus and selection when an input is clicked. Used as onClick handler for each input.
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  // handleKeyDown: Handles backspace navigation between OTP fields. Used as onKeyDown handler for each input.
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-between">
      {otp.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => {
              handleChange(index, e);
            }}
            onPaste={(e) => handlePaste(index, e)}
            className="w-16 h-16 md:w-28 md:h-28 text-center border rounded-lg border-secondary-30 focus:outline-none text-4xl"
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        );
      })}
    </div>
  );
};
export default OTPInput;
