import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { SlPresent } from "react-icons/sl";
import { LuHistory } from "react-icons/lu";
import { BsPersonCheck } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
const navigationLinks = [
  { name: "Create an account", path: "/sign-up", icon: undefined },
  { name: "Log in", path: "/login", icon: undefined },
  { name: "Home", path: "/", icon: AiOutlineHome },
  { name: "Category", path: "/category", icon: BiCategoryAlt },
  { name: "Add Testimony", path: "/add-testimony", icon: FaPlus },
  { name: "Favorites", path: "/favorites", icon: FaRegHeart },
  { name: "Donations", path: "/donations", icon: SlPresent },
  { name: "Donation History", path: "/donation-history", icon: LuHistory },
  { name: "Follow @iTestified", path: "/follow", icon: BsPersonCheck },
  { name: "About", path: "/about", icon: RiInformationLine },
  { name: "Help", path: "/help", icon: IoMdHelpCircleOutline },
];

const Header = () => {
  const [isDropdownOpenForMobile, setIsDropdownOpenForMobile] =
    React.useState(false);
  const [isDropdownOpenForDesktop, setIsDropdownOpenForDesktop] =
    React.useState(false);
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutsideForMobile(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpenForMobile(false);
      }
    }

    if (isDropdownOpenForMobile) {
      document.addEventListener("mousedown", handleClickOutsideForMobile);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideForMobile);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForMobile);
    };
  }, [isDropdownOpenForMobile]);
  React.useEffect(() => {
    function handleClickOutsideForDesktop(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpenForDesktop(false);
      }
    }

    if (isDropdownOpenForDesktop) {
      document.addEventListener("mousedown", handleClickOutsideForDesktop);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideForDesktop);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForDesktop);
    };
  }, [isDropdownOpenForDesktop]);
  return (
    <header className="flex justify-between py-5 px-6 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#9966cc] py-3 px-3 flex items-center justify-center rounded-full">
          <img src="/Logo.png" alt="Itestify Logo" className="w-4 h-4" />
        </div>
        <span className="font-openSans font-bold text-xl text-[#0B0B0B]">
          iTestified
        </span>
      </div>
      <nav className="hidden lg:flex">
        <ul className="flex gap-12 ">
          {navigationLinks
            .map((link) => {
              return (
                <li
                  key={link.name}
                  className="flex items-center text-[#1E1E1E] font-openSans font-medium"
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              );
            })
            .slice(2, 6)}
        </ul>
      </nav>
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="flex items-center justify-center bg-[#F5F5F5] rounded-full size-9 lg:size-12">
          <IoSearchSharp className="text-[#1E1E1E] md:size-5" />
        </div>
        <div className="flex items-center justify-center bg-[#F5F5F5] rounded-full size-9 lg:size-12">
          <IoMdNotificationsOutline className="text-[#1E1E1E] md:size-5" />
        </div>

        <button
          className="flex items-center justify-center w-9 h-9 relative lg:hidden"
          onClick={() => setIsDropdownOpenForMobile(!isDropdownOpenForMobile)}
        >
          <IoMenuOutline className="text-[#1E1E1E] w-6 h-6" />
        </button>
        {isDropdownOpenForMobile && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-0 mt-2 w-2/3 md:w-1/3 bg-white shadow-lg z-40 py-4 max-h-screen rounded-xl"
          >
            <ul>
              {navigationLinks.map((link) => {
                return (
                  <li
                    key={link.name}
                    onClick={() => setIsDropdownOpenForMobile(false)}
                    className={`backdrop:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors ${
                      link.name === "Log in" || link.name === "Favorites"
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <Link
                      to={link.path}
                      className={`text-[#1E1E1E] font-openSans font-medium flex items-center gap-2 `}
                    >
                      {link.icon && <link.icon className="text-lg" />}
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <button
          className="hidden lg:block text-white py-3 px-4 bg-primary-70 rounded-lg"
          onClick={() => setIsDropdownOpenForDesktop(!isDropdownOpenForDesktop)}
        >
          Log in/Create an Account
        </button>
        {isDropdownOpenForDesktop && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-0 mt-2 w-1/3 bg-white shadow-lg z-40 py-4 max-h-screen rounded-xl"
          >
            <ul>
              {navigationLinks
                .filter(
                  (link) =>
                    link.name === "Create an account" ||
                    link.name === "Log in" ||
                    [
                      "Donations",
                      "Donation History",
                      "Follow @iTestified",
                      "About",
                      "Help",
                    ].includes(link.name)
                )
                .map((link) => (
                  <li
                    key={link.name}
                    onClick={() => setIsDropdownOpenForDesktop(false)}
                    className={`backdrop:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors ${
                      link.name === "Log in" ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <Link
                      to={link.path}
                      className="text-[#1E1E1E] font-openSans font-medium flex items-center gap-2"
                    >
                      {link.icon && <link.icon className="text-lg" />}
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
