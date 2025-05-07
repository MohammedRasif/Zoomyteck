import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../Image/OBJECTS.png";
import img2 from "../Image/OBJECTS (2).png";
import { useDarkMood } from "../../context/ThemeContext";

const Verification = () => {
    const { darkMode } = useDarkMood();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);
    const navigate = useNavigate();

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value !== "" && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pastedValue = e.clipboardData.getData("Text");
        const numericValue = pastedValue.replace(/\D/g, "").slice(0, 6);
        setOtp(numericValue.split(""));
        setTimeout(() => inputs.current[5].focus(), 100);
    };

    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            console.log("OTP Verified:", otpValue);
            navigate("/success");
        } else {
            alert("Please enter a valid 6-digit OTP");
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
                <h2 className="text-4xl font-semibold text-center text-[#364636] dark:text-gray-200">
                    Verification Code
                </h2>
                <p className="text-base font-medium text-center text-[#364636] dark:text-gray-300 mt-3">
                    Please enter the 6-digit code sent to your email.
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center pt-10 space-x-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center border border-gray-400 dark:border-gray-600 rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6] bg-white dark:bg-gray-800 text-[#364636] dark:text-gray-200"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    className="w-full mt-6 h-12 rounded-md bg-[#004290] dark:bg-[#3b82f6] text-[#FAF1E6] font-medium text-xl hover:bg-[#001a90] dark:hover:bg-[#2563eb] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004290] dark:focus:ring-[#3b82f6] transition-colors"
                >
                    VERIFY
                </button>

                {/* Resend Option */}
                <p className="text-center text-base mt-5 text-[#364636] dark:text-gray-300">
                    Didn’t receive the email?{" "}
                    <NavLink
                        to="/forgetPassword"
                        className="text-[#004290] dark:text-[#3b82f6] hover:text-[#001a90] dark:hover:text-[#2563eb] hover:underline cursor-pointer"
                    >
                        Resend
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Verification;