import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../Image/western-chinese-business-hong-kong.png";
import img1 from "../Image/OBJECTS.png";
import { useDarkMood } from "../../context/ThemeContext";

const ForgetPassword = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email!");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Simulate an API request (Replace with real API call)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log("Password reset email sent:", email);
            localStorage.setItem("email", email);
            navigate("/verification");
        } catch (err) {
            console.error("Error sending reset email:", err);
            setError("Failed to send reset link. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center h-screen bg-white dark:bg-gray-900 transition-colors">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-20">
                <div className="flex justify-center mb-6">
                    <img src={img1} className="h-20 sm:h-24 w-40 sm:w-48" alt="Logo" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center text-[#004290] dark:text-[#3b82f6] font-semibold">Forgot Password</h1>
                <p className="text-center mt-3 text-gray-600 dark:text-gray-300 lg:px-20">
                    Kindly click the button and enter the information. A verification code will be sent to you via email for you to enter.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
                    <label className="text-base sm:text-lg font-medium block mb-2 text-gray-800 dark:text-gray-200">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 px-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                        placeholder="Enter your email"
                        required
                    />

                    {/* Show error message */}
                    {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 bg-[#004290] dark:bg-[#3b82f6] w-full px-6 sm:px-7 rounded-md h-12 text-base sm:text-lg font-medium text-[#FAF1E6] uppercase cursor-pointer hover:bg-[#001a90] dark:hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Sending..." : "Confirm"}
                    </button>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 h-20 lg:h-full hidden md:block">
                <img src={img} className="w-full h-full object-cover" alt="Login Image" />
            </div>
        </div>
    );
};

export default ForgetPassword;