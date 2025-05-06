import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import img from "../Image/western-chinese-business-hong-kong.png";
import img1 from "../Image/OBJECTS.png";
import img2 from "../Image/OBJECTS (2).png";

import { FcGoogle } from "react-icons/fc";
import { useDarkMood } from "../../context/ThemeContext";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useDarkMood();

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-white dark:bg-black z-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-20 lg:px-36 py-10 lg:py-0">
        <div className="flex justify-center mb-6">
             <img src={darkMode ? img2 : img1} className="h-20 sm:h-24 w-40 sm:w-48" alt="Logo" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium text-center text-[#004290] dark:text-[#3b82f6]">
          Welcome Back
        </h1>
        <p className="text-sm sm:text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
          Please enter your details below
        </p>
        <form className="mt-8 sm:mt-10">
          <div>
            <h1 className="text-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
              Email
            </h1>
            <input
              type="email"
              className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative mt-4">
            <h1 className="text-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
              Password
            </h1>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="****************"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[60px] transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <div className="flex justify-end items-center mt-5">
            <NavLink
              to="/forgetPassword"
              className="text-sm sm:text-base text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Forgot password?
            </NavLink>
          </div>
          <button
            type="submit"
            className="mt-8 sm:mt-10 w-full px-7 rounded-md h-12 text-lg font-medium text-[#FAF1E6] bg-[#004290] hover:bg-[#001a90] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] transition cursor-pointer"
          >
            SIGN IN
          </button>
        </form>

        <div className="flex mt-4 space-x-4 justify-center">
          <h1 className="text-gray-800 dark:text-gray-200">Don't have an account?</h1>
          <NavLink to="/register">
            <h1 className="text-[#004290] dark:text-[#3b82f6] hover:text-[#001a90] dark:hover:text-[#2563eb]">
              SIGN UP
            </h1>
          </NavLink>
        </div>

        <div className="flex justify-center mt-3 cursor-pointer">
          <FcGoogle
            className="text-[50px] border p-1 rounded-full border-gray-500 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 h-20 lg:h-full hidden md:block">
        <img src={img} className="w-full h-full object-cover" alt="Login Image" />
      </div>
    </div>
  );
};

export default Login;