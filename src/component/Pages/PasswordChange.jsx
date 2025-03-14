import { NavLink } from "react-router-dom";
import img from "../Image/Group 1597882214.png";

const PasswordChange = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            {/* Image Section */}
            <img src={img} className="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] mb-6" alt="Password Change" />

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#004290] mb-4">
                Password Changed!
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-center text-gray-600 mb-8">
                Your password has been changed successfully.
            </p>

            {/* Button */}
            <NavLink to="/login">
            <button className="w-full sm:w-auto px-6 lg:px-64 py-3 bg-[#004290] text-white font-medium rounded-md hover:bg-blue-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400">
                Back to Login
            </button>
            </NavLink>
        </div>
    );
};

export default PasswordChange;
