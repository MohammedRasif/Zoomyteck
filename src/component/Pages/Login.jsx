import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import img from "../Image/western-chinese-business-hong-kong.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Left Side - Form */}
            <div className="w-1/2 flex flex-col justify-center px-36">
                <h1 className="text-[48px] font-[500] text-center text-[#004290]">Welcome Back</h1>
                <p className="text-[14px] font-[500] text-center  text-[#364636]">
                Please enter your details below
                </p>
                <form className="mt-10">
                    <div>
                        <h1 className="text-[18px] font-[500] mb-2">Email</h1>
                        <input
                            type="email"
                            className="w-full h-[50px] border border-gray-400 rounded-md text-[#364636] pl-3"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="relative mt-4">
                        <h1 className="text-[18px] font-[500] mb-2">Password</h1>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full h-[50px] border border-gray-400 rounded-md text-[#364636] pl-3 pr-10"
                            placeholder="****************"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3  top-[70%] transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <div className="flex items-center">
                            {/* <input
                                type="checkbox"
                                id="remember"
                                className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 font-[500] cursor-pointer">
                                Remember me
                            </label> */}
                        </div>
                        <NavLink to="/forgetPassword" className="text-sm text-red-600 hover:text-red-700">
                            Forgot password?
                        </NavLink>
                    </div>
                    <button
                        type="submit"
                        className="mt-10 w-full px-7 rounded-full h-12 text-[16px] text-[#FAF1E6] bg-[#004290] font-[500] hover:bg-[#001a90] transition cursor-pointer"
                    >
                        SIGN IN
                    </button>
                </form>
            </div>

            {/* Right Side - Image */}
            <div className="w-1/2">
                <img src={img} className="w-full h-screen " alt="Login Image" />
            </div>
        </div>
    );
};

export default Login;
