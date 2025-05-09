import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../Image/OBJECTS.png";
import img2 from "../Image/OBJECTS (2).png";
import { useDarkMood } from "../../context/ThemeContext";
import { useForgetPasswordMutation } from "../../Redux/feature/authApi";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { darkMode } = useDarkMood();
    const [forgerPassword, { isLoading }] = useForgetPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate email
        if (!email) {
            setError("Please enter your email!");
            return;
        }

        try {
            // Send email to the API
            await forgerPassword({ email }).unwrap();

            // Store email in localStorage
            localStorage.setItem("email", email);

            // Navigate to verification_forget route
            navigate("/verification_forget");
        } catch (err) {
            // Extract and display the dynamic error message from the API
            const errorMessage = err?.data?.detail || "Failed to send reset link. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-black transition-colors z-50 pt-20">
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
                    Forgot Password
                </h1>
                <p className="text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
                    Kindly enter your email to receive a verification code.
                </p>
                <form onSubmit={handleSubmit} className="mt-10 w-full">
                    <label className="text-[18px] font-medium block mb-2 text-gray-800 dark:text-gray-200">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 px-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                        placeholder="Enter your email"
                        required
                    />

                    {/* Show error message */}
                    {error && (
                        <p className="text-red-500 dark:text-red-400 mt-2 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 w-full px-7 rounded-md h-12 text-xl font-medium text-[#FAF1E6] bg-[#004290] hover:bg-[#001a90] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Sending..." : "Confirm"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;