import { NavLink } from "react-router-dom";
import img from "../Image/Group 1597882214.png";
import { useDarkMood } from "../../context/ThemeContext";

const PasswordChange = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black px-4 transition-colors">
            {/* Image Section */}
            <img src={img} className="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] mb-6" alt="Password Change" />

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#004290] dark:text-[#3b82f6] mb-4">
                Password Changed!
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
                Your password has been changed successfully.
            </p>

            {/* Button */}
            <NavLink to="/login">
                <button className="w-full sm:w-auto px-6 lg:px-64 py-3 bg-[#004290] dark:bg-[#3b82f6] text-white font-medium rounded-md hover:bg-[#001a90] dark:hover:bg-[#2563eb] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6] transition-colors">
                    Back to Login
                </button>
            </NavLink>
        </div>
    );
};

export default PasswordChange;