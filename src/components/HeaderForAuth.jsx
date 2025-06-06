import React from "react";
import { useNavigate } from "react-router-dom";
const HeaderForAuth = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-center py-5 px-6 shadow-lg relative">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#9966cc] py-3 px-3 flex items-center justify-center rounded-full">
          <img src="/Logo.png" alt="Itestify Logo" className="w-4 h-4" />
        </div>
        <span className="font-openSans font-bold text-xl text-[#0B0B0B]">
          iTestified
        </span>
      </div>
      <div className="bg-white shadow-md  p-4 absolute top-4 left-6">
        <button onClick={() => navigate(-1)}>
          <img src="/Vector.png" alt="Cancel" className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default HeaderForAuth;
