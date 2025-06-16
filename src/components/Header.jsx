import { useState, useEffect, useRef } from "react";
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
import { HiOutlineUser } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
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

const loggedInNavigationLinkDesktop = [
  { name: "Profile", path: "/profile", icon: HiOutlineUser },
];

const Header = () => {
  // Parse user data from localStorage
  const userImage = localStorage.getItem("userImage");
  const getUserData = () => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        return JSON.parse(userDataString);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  };

  const [userData, setUserData] = useState(getUserData());
  const [isDropdownOpenForMobile, setIsDropdownOpenForMobile] = useState(false);
  const [isDropdownOpenForDesktop, setIsDropdownOpenForDesktop] =
    useState(false);
  const [
    isLoggedInDropdownOpenForDesktop,
    setIsLoggedInDropdownOpenForDesktop,
  ] = useState(false);

  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const loggedInDropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userImage"); // Also remove userImage on logout
    setUserData(null);
    setIsDropdownOpenForMobile(false);
    setIsLoggedInDropdownOpenForDesktop(false);
    // You can add additional logout logic here (e.g., redirect to login page)
  };

  // Handle click outside for mobile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpenForMobile(false);
      }
    }

    if (isDropdownOpenForMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpenForMobile]);

  // Handle click outside for desktop dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpenForDesktop(false);
      }
    }

    if (isDropdownOpenForDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpenForDesktop]);

  // Handle click outside for logged in desktop dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        loggedInDropdownRef.current &&
        !loggedInDropdownRef.current.contains(event.target)
      ) {
        setIsLoggedInDropdownOpenForDesktop(false);
      }
    }

    if (isLoggedInDropdownOpenForDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoggedInDropdownOpenForDesktop]);

  // Filter navigation links based on user login status
  const getFilteredNavigationLinks = () => {
    if (userData) {
      // If user is logged in, exclude "Create an account" and "Log in"
      return navigationLinks.filter(
        (link) => link.name !== "Create an account" && link.name !== "Log in"
      );
    }
    return navigationLinks;
  };

  // Helper function to render user avatar
  const renderUserAvatar = (size = "size-12") => {
    if (userData) {
      // Check if userImage exists and is not empty
      if (userImage && userImage.trim() !== "") {
        return (
          <img
            src={userImage}
            alt="User avatar"
            className={`rounded-full ${size} flex-shrink-0 object-cover`}
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        );
      } else {
        // Show icon if no userImage or userImage is empty
        return (
          <div
            className={`${size} bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0`}
          >
            <HiOutlineUser className="text-gray-600 text-xl" />
          </div>
        );
      }
    }
    return null;
  };

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
        <ul className="flex gap-12">
          {navigationLinks
            .filter((link) =>
              ["Home", "Category", "Add Testimony", "Favorites"].includes(
                link.name
              )
            )
            .map((link) => (
              <li
                key={link.name}
                className="flex items-center text-[#1E1E1E] font-openSans font-medium"
              >
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2 lg:gap-4">
        <button className="flex items-center justify-center bg-[#F5F5F5] rounded-full size-9 lg:size-12">
          <IoSearchSharp className="text-[#1E1E1E] md:size-5" />
        </button>
        <button className="flex items-center justify-center bg-[#F5F5F5] rounded-full size-9 lg:size-12">
          <IoMdNotificationsOutline className="text-[#1E1E1E] md:size-5" />
        </button>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center w-9 h-9 relative lg:hidden"
          onClick={() => setIsDropdownOpenForMobile(!isDropdownOpenForMobile)}
        >
          <IoMenuOutline className="text-[#1E1E1E] w-6 h-6" />
        </button>

        {/* Mobile Dropdown */}
        {isDropdownOpenForMobile && (
          <div
            ref={mobileDropdownRef}
            className="absolute right-0 top-0 mt-2 w-2/3 md:w-1/3 bg-white shadow-lg z-40 py-4 max-h-screen rounded-xl"
          >
            {userData && (
              <div className="flex gap-2 border-b border-gray-100 px-4 py-2 mb-2">
                {renderUserAvatar()}
                <div className="flex flex-col">
                  <span className="font-semibold text-left">
                    {userData.name}
                  </span>
                  <span className="text-left text-xs">{userData.email}</span>
                </div>
              </div>
            )}
            <ul>
              {getFilteredNavigationLinks().map((link) => (
                <li
                  key={link.name}
                  onClick={() => setIsDropdownOpenForMobile(false)}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors ${
                    link.name === "Favorites" ? "border-b border-gray-100" : ""
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
              {userData && (
                <>
                  <li
                    onClick={() => setIsDropdownOpenForMobile(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <Link
                      to="/profile"
                      className="text-[#1E1E1E] font-openSans font-medium flex items-center gap-2"
                    >
                      <HiOutlineUser className="text-lg" />
                      Profile
                    </Link>
                  </li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                    <button
                      onClick={handleLogout}
                      className="text-[#1E1E1E] font-openSans font-medium flex items-center gap-2 w-full text-left"
                    >
                      <FiLogOut className="text-lg" />
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Desktop User Section */}
        {userData ? (
          <button
            onClick={() =>
              setIsLoggedInDropdownOpenForDesktop(
                !isLoggedInDropdownOpenForDesktop
              )
            }
            className="hidden lg:flex gap-2 min-w-0 max-w-xs items-center"
          >
            {renderUserAvatar()}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-left truncate">
                {userData.name}
              </span>
              <span className="text-left text-sm break-words">
                {userData.email}
              </span>
            </div>
          </button>
        ) : (
          <button
            className="hidden lg:block text-white py-3 px-4 bg-primary-70 rounded-lg"
            onClick={() =>
              setIsDropdownOpenForDesktop(!isDropdownOpenForDesktop)
            }
          >
            Log in/Create an Account
          </button>
        )}

        {/* Logged In Desktop Dropdown */}
        {isLoggedInDropdownOpenForDesktop && (
          <div
            ref={loggedInDropdownRef}
            className="absolute right-0 top-0 mt-2 w-2/3 md:w-1/3 bg-white shadow-lg z-40 py-4 max-h-screen rounded-xl"
          >
            <div className="flex gap-2 border-b border-gray-100 px-4 py-2">
              {renderUserAvatar()}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-semibold text-left truncate">
                  {userData.name}
                </span>
                <span className="text-left text-sm break-words">
                  {userData.email}
                </span>
              </div>
            </div>
            <ul>
              {loggedInNavigationLinkDesktop.map((link) => (
                <li
                  key={link.name}
                  onClick={() => setIsLoggedInDropdownOpenForDesktop(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
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
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                <button
                  onClick={handleLogout}
                  className="text-[#1E1E1E] font-openSans font-medium flex items-center gap-2 w-full text-left"
                >
                  <FiLogOut className="text-lg" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Desktop Not Logged In Dropdown */}
        {isDropdownOpenForDesktop && (
          <div
            ref={desktopDropdownRef}
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
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors ${
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
