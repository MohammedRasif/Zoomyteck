import { NavLink } from "react-router-dom";
import img from "../Image/Star 1.png";
import { useDarkMood } from "../../context/ThemeContext";
import { FiSearch } from "react-icons/fi";

const Banner = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context

    return (
        <div className={`flex flex-col lg:flex-row items-center justify-between  px-4 sm:px-6 md:px-8 lg:px-20 py-10 ${darkMode ? "bg-black text-gray-200" : "bg-white text-gray-800"} `}>
            {/* Left Section - Text and Form */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
                <h1
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4 sm:mb-6 bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
                        } text-transparent bg-clip-text`}
                >
                    Find Contracts & <br /> Win Deals
                </h1>
                <p className={`text-base sm:text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} mb-6 sm:mb-8`}>
                    Your all-in-one platform to discover contracts, generate AI-powered proposals, and submit bids—all in one seamless workflow.
                </p>
                <div className="relative w-full max-w-[50vh]">
                    <input
                        type="text"
                        placeholder="Search"
                        className={`w-full h-12 sm:h-14 border ${darkMode ? "border-gray-600 bg-black text-gray-200 placeholder-gray-400" : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"} rounded-full pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-grebg-green-500 `}
                    />
                    <FiSearch
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                        size={20}
                    />
                </div>
                {/* <NavLink to="/register">
                    <button
                        className={`mt-6 text-xl sm:mt-8 w-full sm:w-[180px] md:w-[200px] h-12 sm:h-14 font-medium rounded-full ${darkMode ? "bg-green-500 text-gray-900 hover:bg-green-600" : "bg-green-600 text-white hover:bg-[#b3a002]"}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 dark:focus:ring-grebg-green-500`}
                    >
                        Get Started
                    </button>
                </NavLink> */}
            </div>

            {/* Right Section - Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <img
                    src={img}
                    alt="Banner Illustration"
                    className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default Banner;