import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 p-6 md:py-12 md:px-20 bg-[#F5F5F5] text-[#0B0B0B] font-openSans">
      <div className="flex justify-between gap-8 border-b border-gray-300 pb-6">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#9966cc] flex items-center justify-center rounded-full">
              <img src="/Logo.png" alt="Itestify Logo" className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl">iTestified</span>
          </div>
          <p>
            Edifying believers through real testimonies, revealing what God can
            do, building faith, and reminding us that He can do it again.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Useful Links</h2>
          <Link to="/donations">Donate</Link>
          <Link to="/help">Help</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Ministry</h2>
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <div className="text-center">
        <p>© {new Date().getFullYear()} iTestified. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
