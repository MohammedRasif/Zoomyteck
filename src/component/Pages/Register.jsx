import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import img from "../Image/western-chinese-business-hong-kong.png";
import img1 from "../Image/OBJECTS.png";
import { FcGoogle } from "react-icons/fc";
import { useDarkMood } from "../../context/ThemeContext";

const Register = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Password Validation
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setError("Passwords do not match!");
        } else {
            setError("");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-white dark:bg-black transition-colors">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-20 lg:px-36 py-10 lg:py-0">
                <div className="flex justify-center mb-6">
                    <img src={img1} className="h-20 sm:h-24 w-40 sm:w-48" alt="Logo" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-medium text-center text-[#004290] dark:text-[#3b82f6]">Welcome Back</h1>
                <p className="text-sm sm:text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
                    Please enter your details below
                </p>
                <form className="mt-8 sm:mt-10">
                    {/* First Name */}
                    <div>
                        <h1 className="text-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">First Name</h1>
                        <input
                            type="text"
                            className="w-full bg-white dark:bg-gray-800 h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 pl-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Enter your first name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                        <h1 className="text-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">Email</h1>
                        <input
                            type="email"
                            className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 pl-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative mt-4">
                        <h1 className="text-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">Password</h1>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[60px] transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative mt-4">
                        <h1 className="text-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">Confirm Password</h1>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full h-12 border bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Re-enter password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[60px] transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        >
                            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="mt-8 sm:mt-10 w-full px-7 rounded-md h-12 text-lg font-medium text-[#FAF1E6] bg-[#004290] hover:bg-[#001a90] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] transition cursor-pointer"
                    >
                        SIGN UP
                    </button>
                </form>

                <div className="flex mt-4 space-x-4 justify-center">
                    <h1 className="text-gray-800 dark:text-gray-200">Don't have an account?</h1>
                    <NavLink to="/login">
                        <h1 className="text-[#004290] dark:text-[#3b82f6] hover:text-[#001a90] dark:hover:text-[#2563eb]">SIGN UP</h1>
                    </NavLink>
                </div>

                <div className="flex justify-center mt-3 cursor-pointer">
                    <FcGoogle className="text-[50px] border p-1 rounded-full border-gray-500 dark:border-gray-600" />
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-1/2 h-20 lg:h-full hidden md:block">
                <img src={img} className="w-full h-screen object-cover" alt="Login Image" />
            </div>
        </div>
    );
};

export default Register;