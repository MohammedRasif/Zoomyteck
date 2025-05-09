import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../Image/OBJECTS.png";
import img2 from "../Image/OBJECTS (2).png";
import { FcGoogle } from "react-icons/fc";
import { useDarkMood } from "../../context/ThemeContext";
import { useLoginMutation } from "../../Redux/feature/authApi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useDarkMood();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [useLogin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Send login data to the API
      const response = await useLogin({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Store access_token and refresh_token in localStorage
      if (response.access_token && response.refresh_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
      }

      // Handle successful login
      console.log("Login successful:", response);
      navigate("/");
    } catch (err) {
      // Extract and display the dynamic error message from the API
      const errorMessage = err?.data?.detail || "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB] dark:from-[#000000] dark:via-[#000000] dark:to-[#000000] dark:bg-black z-50 pt-10">
      {/* Form Section */}
      <div className="w-full max-w-5xl flex flex-col justify-center items-center px-6 sm:px-20 lg:px-36 py-10 mx-auto">
        <div className="flex justify-center mb-6">
          <img
            src={darkMode ? img2 : img1}
            className="h-24 sm:h-28 w-48 sm:w-56"
            alt="Logo"
          />
        </div>
        <h1 className="text-4xl font-medium text-center text-[#004290] dark:text-[#3b82f6]">
          Welcome Back
        </h1>
        <p className="text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
          Please enter your details below
        </p>
        <form className="mt-10 w-full" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-[18px] font-medium mb-2 text-gray-800 dark:text-gray-200">
              Email
            </h1>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full h-12 border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-gray-800 pl-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6]"
              placeholder="Enter your email"
              required
            />
          </div>
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
              placeholder="****************"
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
          <div className="flex justify-end items-center mt-5">
            <NavLink
              to="/forgetPassword"
              className="text-base text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Forgot password?
            </NavLink>
          </div>
          {/* Error Message */}
          {error && <p className="text-red-600 dark:text-red-400 text-sm mt-3">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-10 w-full px-7 rounded-md h-12 text-xl font-medium text-[#FAF1E6] bg-[#004290] hover:bg-[#001a90] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] transition cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
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
    </div>
  );
};

export default Login;