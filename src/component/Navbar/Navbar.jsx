
import { NavLink, useNavigate } from "react-router-dom";
import img from "../Image/OBJECTS.png";
import img1 from "../Image/OBJECTS (2).png";
import { useDarkMood } from "../../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GoChevronRight } from "react-icons/go";
import { useGetProfileQuery } from "../../Redux/feature/ApiSlice";

const Navbar = () => {
  const { darkMode, setDarkMode } = useDarkMood();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [hasTokens, setHasTokens] = useState(!!localStorage.getItem("access_token"));
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Monitor tokens in localStorage
  useEffect(() => {
    const checkTokens = () => {
      const token = localStorage.getItem("access_token");
      setHasTokens(!!token);
    };

    checkTokens();
    // Optionally, listen for storage changes (e.g., cross-tab logout)
    window.addEventListener("storage", checkTokens);
    return () => window.removeEventListener("storage", checkTokens);
  }, []);

  // Fetch profile data, skip if no tokens
  const { data: profile } = useGetProfileQuery(undefined, { skip: !hasTokens });
  console.log(profile?.full_name, "profile");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close mobile menu and dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isMenuOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isDropdownOpen]);

  // Scroll to section with offset
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 50;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle navigation link click
  const handleNavClick = (id) => {
    setActiveLink(id);
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  // Logout handler
  const handleDelete = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setHasTokens(false);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`px-4 py-5 ${darkMode
          ? "bg-black"
          : "bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB]"
        } lg:border-b ${darkMode ? "lg:border-gray-700" : "lg:border-gray-200"}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Full Name */}
        <div className="flex items-center space-x-4">
          <img
            src={darkMode ? img1 : img}
            className="h-12 md:h-16"
            alt="Logo"
          />
          
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-black dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation and Buttons */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <NavLink
            to="/"
            className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-lg"
            onClick={() => handleNavClick("home")}
          >
            Home
          </NavLink>
          <div className="relative group">
            <NavLink
              to="/feature"
              className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-lg"
              onClick={() => handleNavClick("Feature")}
            >
              <div className="flex items-center space-x-1">
                <h1>Feature</h1>
                <IoIosArrowDown className="text-black dark:text-white mt-1" />
              </div>
            </NavLink>
            <div className="absolute left-0 mt-2 w-44 bg-gradient-to-b from-white to-gray-200 dark:from-[#3C3C3C] dark:to-[#1A1A1A] text-black dark:text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <p className="p-2 text-[12px]">
                Your all-in-one platform to discover contracts, generate
                AI-powered proposals, and submit bids—all in one seamless
                workflow.
              </p>
            </div>
          </div>
          <div className="relative group">
            <NavLink
              to="/about"
              className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-lg"
              onClick={() => handleNavClick("about")}
            >
              <div className="flex items-center space-x-1">
                <h1>About</h1>
                <IoIosArrowDown className="text-black dark:text-white mt-1" />
              </div>
            </NavLink>
            <div className="absolute left-0 mt-2 w-44 bg-gradient-to-b from-white to-gray-200 dark:from-[#3C3C3C] dark:to-[#1A1A1A] text-black dark:text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <p className="p-2 text-[12px]">
                Your all-in-one platform to discover contracts, generate
                AI-powered proposals, and submit bids—all in one seamless
                workflow.
              </p>
            </div>
          </div>
          <div className="relative group">
            <NavLink
              to="/pricing"
              className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-lg"
              onClick={() => handleNavClick("pricing")}
            >
              <div className="flex items-center space-x-1">
                <h1>Pricing</h1>
                <IoIosArrowDown className="text-black dark:text-white mt-1" />
              </div>
            </NavLink>
            <div className="absolute left-0 mt-2 w-44 bg-gradient-to-b from-white to-gray-200 dark:from-[#3C3C3C] dark:to-[#1A1A1A] text-black dark:text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <p className="p-2 text-[12px]">
                Your all-in-one platform to discover contracts, generate
                AI-powered proposals, and submit bids—all in one seamless
                workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle and Conditional Auth Buttons/Full Name */}
        <div className="hidden md:block">
          <div className="space-x-5 flex items-center">
            <button
              onClick={toggleDarkMode}
              className="h-14 w-14 rounded-lg p-2 transition duration-300 cursor-pointer"
            >
              <svg
                className="fill-gray-500 block dark:hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg
                className="fill-gray-200 hidden dark:block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {profile?.full_name ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <span className="text-black dark:text-white font-bold text-lg">
                  {profile.full_name}
                </span>
                <button
                  onClick={toggleDropdown}
                  className="ml-2 text-black dark:text-white focus:outline-none"
                >
                  <GoChevronRight className="w-5 h-5" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-gradient-to-b from-white to-gray-200 dark:from-[#3C3C3C] dark:to-[#1A1A1A] text-black dark:text-white shadow-lg rounded-md z-50">
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black text-black dark:text-white text-base cursor-pointer">
                    Sign in
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black text-black dark:text-white text-base cursor-pointer">
                    Sign up
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Modal (only for < md) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 mt-7 bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        >
          <div
            ref={menuRef}
            className="absolute top-16 left-0 right-0 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 p-4 mx-4 rounded-lg shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/"
                className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-base border py-2 px-2 rounded-md"
                onClick={() => handleNavClick("home")}
              >
                Home
              </NavLink>
              <NavLink
                to="/feature"
                className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-base border py-2 px-2 rounded-md"
                onClick={() => handleNavClick("Feature")}
              >
                Feature
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-base border py-2 px-2 rounded-md"
                onClick={() => handleNavClick("about")}
              >
                About
              </NavLink>
              <NavLink
                to="/pricing"
                className="hover:text-gray-700 dark:hover:text-gray-300 text-black dark:text-white font-[500] text-base border py-2 px-2 rounded-md"
                onClick={() => handleNavClick("pricing")}
              >
                Pricing
              </NavLink>
              <button
                onClick={toggleDarkMode}
                className="h-10 w-10 rounded-lg p-2 cursor-pointer transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 mx-auto my-4"
              >
                <svg
                  className="fill-violet-700 block dark:hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg
                  className="fill-yellow-500 hidden dark:block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {!profile?.full_name && (
                <>
                  <NavLink to="/signin" className="w-full" onClick={toggleMenu}>
                    <button className="w-full px-4 py-2 border rounded-md hover:bg-black dark:hover:bg-gray-700 text-black dark:text-white text-base">
                      Sign in
                    </button>
                  </NavLink>
                  <NavLink to="/signup" className="w-full" onClick={toggleMenu}>
                    <button className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-950 dark:hover:bg-black text-base">
                      Sign up
                    </button>
                  </NavLink>
                </>
              )}
              {profile?.full_name && (
                <span className="text-black dark:text-white font-medium text-base border py-2 px-2 rounded-md text-center">
                  {profile.full_name}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
