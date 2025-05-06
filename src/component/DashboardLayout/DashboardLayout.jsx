import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Sidebar Toggle Icons
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useDarkMood } from "../../context/ThemeContext";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { darkMode } = useDarkMood(); // Get dark mode state from context

    return (
        <div className={`flex h-screen transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB] text-black"}`}>
            {/* Sidebar */}
            <div
                className={`h-full fixed border-r-[1px] border-gray-500 transition-all duration-300 ease-in-out ${darkMode ? "bg-black text-white" : " text-black"} ${isSidebarOpen ? "w-[280px]" : "w-16"}`}
            >
                <div className="h-full flex flex-col justify-between">
                    {/* Sidebar Content */}
                    {isSidebarOpen && <DashboardSidebar />}

                    {/* Toggle Button */}
                    <button
                        className={`absolute top-4 right-[16px] rounded-full shadow-md p-1 cursor-pointer transition ${
                            darkMode ? "bg-black text-white hover:bg-gray-700" : " text-black hover:bg-gray-300"
                        }`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={24} /> : <TbLayoutSidebarLeftExpandFilled size={24} />}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className={`flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? "ml-[280px] w-[calc(100%-280px)]" : "ml-16 w-[calc(100%-64px)]"
                }`}
            >
                {/* Navbar - Fixed & Only Navbar BG White */}
                <div
                    className={`fixed top-0 z-50 w-full transition-all duration-300 border-b border-gray-500 ${
                        darkMode ? "bg-black text-white" : " text-black"
                    }`}
                    style={{
                        left: isSidebarOpen ? "280px" : "64px",
                        width: isSidebarOpen ? "calc(100%-280px)" : "calc(100%-64px)",
                    }}
                >
                    <DashboardNavbar />
                </div>

                {/* Outlet (Main Content) */}
                <div className="h-full mt-16 overflow-auto transition-colors duration-300 " >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
