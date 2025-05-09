import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../Image/OBJECTS.png";
import img2 from "../Image/OBJECTS (2).png";
import { FcGoogle } from "react-icons/fc";
import { useDarkMood } from "../../context/ThemeContext";
import { useRegisterMutation } from "../../Redux/feature/authApi";

const Register = () => {
    const { darkMode } = useDarkMood();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState("");
    const [RegisterData, { isLoading, error: mutationError }] = useRegisterMutation();

    const nagivation = useNavigate()

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate passwords
        if (name === "confirm_password" || name === "password") {
            if (name === "confirm_password" && formData.password !== value) {
                setError("Passwords do not match!");
            } else if (name === "password" && formData.confirm_password && formData.confirm_password !== value) {
                setError("Passwords do not match!");
            } else {
                setError("");
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match!");
            return;
        }

        try {
            // Send data to the API using the mutation
            const response = await RegisterData({
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password,
            }).unwrap();

            // Handle successful registration
            console.log("Registration successful:", response);
            nagivation("/verification_register")
            // Optionally, redirect or show a success message
        } catch (err) {
            // Handle errors from the API
            setError(err?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-black transition-colors z-50 pt-10">
            {/* Form Section */}
            <div className="w-full max-w-5xl flex flex-col justify-center items-center px-6 sm:px-20 lg:px-36 py-10 mx-auto">
                <div className="flex justify-center mb-6">
                    <img
                        src={darkMode ? img2 : img1}
                        className="ext-[16px] sm:text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200"
                        alt="Logo"
                    />
                </div>
                <h1 className="text-4xl font-medium text-center text-[#004290] dark:text-[#3b82f6]">
                    Create Account
                </h1>
                <p className="text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
                    Please enter your details below
                </p>
                <form className="mt-10 w-full" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div>
                        <h1 className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
                            First Name
                        </h1>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className="w-full bg-white dark:bg-gray-800 h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 pl-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                        <h1 className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
                            Email
                        </h1>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 pl-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative mt-4">
                        <h1 className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
                            Password
                        </h1>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Enter password"
                            required
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
                        <h1 className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
                            Confirm Password
                        </h1>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                            className="w-full h-12 border bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 pl-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
                            placeholder="Re-enter password"
                            required
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
                        disabled={isLoading}
                        className="mt-10 w-full px-7 rounded-md h-12 text-xl font-medium text-[#FAF1E6] bg-[#004290] hover:bg-[#001a90] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] transition cursor-pointer disabled:opacity-50"
                    >
                        {isLoading ? "SIGNING UP..." : "SIGN UP"}
                    </button>
                </form>

                <div className="flex mt-4 space-x-4 justify-center">
                    <h1 className="text-gray-800 dark:text-gray-200">Already have an account?</h1>
                    <NavLink to="/login">
                        <h1 className="text-[#004290] dark:text-[#3b82f6] hover:text-[#001a90] dark:hover:text-[#2563eb]">
                            SIGN IN
                        </h1>
                    </NavLink>
                </div>

                <div className="flex justify-center mt-3 cursor-pointer">
                    <FcGoogle
                        className="text-[50px] border p-1 rounded-full border-gray-500 dark:border-gray-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;