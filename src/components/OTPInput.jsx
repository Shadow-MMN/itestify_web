import React, { useRef } from "react";

function OTPInput() {
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      {inputRefs.current.map((ref, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          ref={ref}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-16 h-16 md:w-28 md:h-28 text-center border rounded-lg border-secondary-30 focus:outline-none text-4xl"
        />
      ))}
    </div>
  );
}

export default OTPInput;
