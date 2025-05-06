import img from "../Image/hello.gif"; // Adjusted path, removed special character
import { useDarkMood } from "../../context/ThemeContext";
import { FiSearch } from "react-icons/fi";

const Banner = () => {
  const { darkMode } = useDarkMood(); // Get darkMode state from context

  return (
    <div
      className={`w-full ${darkMode ? "bg-black" : "bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB]"} py-6 sm:py-10 md:py-12 lg:py-16`}
    >
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center justify-between lg:px-0 md:px-0 px-5   ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {/* Left Section - Text and Form */}
        <div className="w-full lg:w-1/2 mb-6 sm:mb-8 md:mb-10 lg:mb-0 lg:pr-6 xl:pr-10">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r ${
              darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
            } text-transparent bg-clip-text`}
          >
            Find Contracts & <br /> Win Deals
          </h1>
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } mb-4 sm:mb-6 md:mb-8`}
          >
            Your all-in-one platform to discover contracts, generate AI-powered
            proposals, and submit bids—all in one seamless workflow.
          </p>
          <div className="relative w-full max-w-[90%] sm:max-w-[50vh] md:max-w-[60vh] lg:max-w-[50vh] mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Search"
              className={`w-full h-10 sm:h-12 md:h-14 border ${
                darkMode
                  ? "border-gray-600 bg-black text-gray-200 placeholder-gray-400"
                  : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
              } rounded-full pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500`}
            />
            <FiSearch
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={18}
            />
          </div>
        </div>

        {/* Right Section - Image with SVG */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 sm:mt-8 lg:mt-0">
          <img
            src={img}
            alt="Banner Illustration"
            className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

