import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img1 from "../Image/OBJECTS.png";
import img2 from "../Image/OBJECTS (2).png";
import { useDarkMood } from "../../context/ThemeContext";
import { useConfrimPasswordMutation } from "../../Redux/feature/authApi";

const SetNewPassword = () => {
    const { darkMode } = useDarkMood();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const navigate = useNavigate();
    const [confromPassword, { isLoading }] = useConfrimPasswordMutation();

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (newPassword !== e.target.value) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!newPassword || !confirmPassword) {
            setError("Please fill in both fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const email = localStorage.getItem("email");
        if (!email) {
            setError("Email not found. Please request a new reset link.");
            return;
        }

        try {
            // Send email and new_password to the API
            await confromPassword({
                email,
                new_password: newPassword,
            }).unwrap();

            // Show success popup for 2 seconds
            setShowSuccessPopup(true);
            setTimeout(() => {
                setShowSuccessPopup(false);
                localStorage.removeItem("email"); // Clear email from localStorage
                navigate("/login");
            }, 1300);
        } catch (err) {
            // Extract and display the dynamic error message from the API
            const errorMessage = err?.data?.detail || "Failed to change password. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-black transition-colors z-50 pt-20">
            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold text-[#004290] dark:text-[#3b82f6]">
                            Congratulations!
                        </h2>
                        <p className="text-gray-800 dark:text-gray-200 mt-2">
                            Successfully changed password
                        </p>
                    </div>
                </div>
            )}

            {/* Form Section */}
            <div className="w-full max-w-5xl flex flex-col justify-center items-center px-6 sm:px-20 lg:px-36 py-10 mx-auto">
                <div className="flex justify-center mb-6">
                    <img
                        src={darkMode ? img2 : img1}
                        className="h-24 sm:h-28 w-48 sm:w-56"
                        alt="Logo"
                    />
                </div>
                <h1 className="text-4xl font-semibold text-center text-[#004290] dark:text-[#3b82f6]">
                    Set New Password
                </h1>
                <p className="text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
                    Create a new password. Ensure it differs from the previous one.
                </p>
                <form onSubmit={handleSubmit} className="mt-10 w-full">
                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="new-password"
                            className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200 block"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="new-password"
                                className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <label
                            htmlFor="confirm-password"
                            className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200 block"
                        >
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">
                            {error}
                        </p>
                    )}

                    {/* Confirm Button */}
                    <button
                        type="submit"
                        disabled={isLoading || showSuccessPopup}
                        className="mt-10 w-full px-7 rounded-md h-12 text-xl font-medium text-[#FAF1E6] bg-[#004290] hover:bg-[#001a90] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Changing password..." : "Confirm Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetNewPassword;