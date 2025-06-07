import { useEffect, useRef, useState } from "react";

const OTPInput = ({ length = 4, onOtpSubmit = () => {}, showOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (showOtp) {
      inputRefs.current[0]?.focus();
    }
  }, [showOtp]);

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

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

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
