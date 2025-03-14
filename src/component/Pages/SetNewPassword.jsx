import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import img from "../Image/western-chinese-business-hong-kong.png";
import img1 from "../Image/OBJECTS.png";

const SetNewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        // Simulate password change logic (replace with actual API call)
        setTimeout(() => {
            setLoading(false);
            // Redirect or show success message after password change
            console.log("Password changed successfully!");
        }, 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 px-6 py-10 lg:px-20 lg:py-12 flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                    <img src={img1} className="h-20 sm:h-24 w-40 sm:w-48" alt="Logo" />
                </div>
                {/* Title */}
                <h1 className="lg:text-4xl md:text-4xl text-3xl font-medium text-center mb-4 text-[#004290]">Set New Password</h1>
                <p className="font-medium lg:text-xl text-center mb-6">
                    Create a new password. <br /> Ensure it differs from the previous one.
                </p>

                {/* Password Fields */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="new-password" className="block text-base font-[500] mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="w-full h-[50px] border border-gray-300 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="****************"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-base  mb-2 font-[500]">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full h-[50px] border border-gray-300 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="****************"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Error message */}
                {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

                {/* Confirm Button */}
                <button
                    onClick={handlePasswordChange}
                    disabled={loading}
                    className={`w-full h-[48px] mt-6 bg-[#004290] text-[#FAF1E6] font-medium text-base rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Changing password..." : "Confirm Password"}
                </button>
            </div>

            {/* Right Section (Image) */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full hidden lg:block">
                <img src={img} className="w-full h-full object-cover" alt="Login Image" />
            </div>
        </div>
    );
};

export default SetNewPassword;
