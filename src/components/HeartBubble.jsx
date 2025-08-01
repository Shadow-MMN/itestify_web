import React from "react";
import { LuHeart } from "react-icons/lu";
const HeartBubble = ({ className }) => {
  return (
    <div
      className={`bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-2 ${className}`}
    >
      <LuHeart className="text-[#1E1E1E] w-6 h-6" />
    </div>
  );
};

export default HeartBubble;
