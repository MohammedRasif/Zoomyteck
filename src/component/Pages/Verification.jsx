import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img from "../Image/western-chinese-business-hong-kong.png";
import img1 from "../Image/OBJECTS.png";

const Verification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 OTP inputs
    const inputs = useRef([]);
    const navigate = useNavigate();

    // Handle OTP input change
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return; // Only allow numbers
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Move to the next input field
        if (value !== "" && index < 5) { // Update to 5 as we now have 6 inputs
            inputs.current[index + 1].focus();
        }
    };

    // Handle keydown event (for navigation and backspace)
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            inputs.current[index - 1].focus();
        }
    };

    // Handle paste event for OTP
    const handlePaste = (e) => {
        const pastedValue = e.clipboardData.getData("Text");
        const numericValue = pastedValue.replace(/\D/g, "").slice(0, 6); // Only take the first 6 digits
        setOtp(numericValue.split("")); // Set OTP digits
        setTimeout(() => inputs.current[5].focus(), 100); // Focus the last input field
    };

    // Handle verification
    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 6) { // Check for 6 digits
            console.log("OTP Verified:", otpValue);
            navigate("/success"); // Redirect after successful verification
        } else {
            alert("Please enter a valid 6-digit OTP");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 px-8 lg:px-28 py-8 lg:mt-44 md:mt-32 mt-20 ">
                <div>
                    <div className="flex justify-center mb-6">
                        <img src={img1} className="h-20 sm:h-24 w-40 sm:w-48" alt="Logo" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#364636]">
                        Verification Code
                    </h2>
                    <p className="text-center mt-4 text-gray-600">
                        Please enter the 6-digit code sent to your email.
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-center mt-8 space-x-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)} // Store refs
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 text-center border border-gray-400 rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#8CAB91] bg-gray-200"
                            />
                        ))}
                    </div> 

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        className="w-full mt-8 h-12 rounded-md bg-[#004290] text-[#FAF1E6] font-medium text-lg hover:opacity-90 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        VERIFY
                    </button>

                    {/* Resend Option */}
                    <p className="text-center text-sm mt-5">
                        Didn’t receive the email?{" "}
                        <NavLink to="/forgetPassword" className="text-blue-400 hover:underline cursor-pointer">
                            Resend
                        </NavLink>
                    </p>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="w-full lg:w-1/2 hidden lg:block">
                <img src={img} className="w-full h-full object-cover" alt="Login Image" />
            </div>
        </div>
    );
};

export default Verification;
