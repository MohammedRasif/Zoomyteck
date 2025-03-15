import { Building2, Calendar, DollarSign } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useDarkMood } from "../../context/ThemeContext";

// Project data object
const projects = [
    {
        id: 1,
        title: "IT Infrastruct Upgrade",
        type: "Federal",
        amount: "$500,00",
        department: "Department Of Defense",
        dueDate: "1/16/2025",
        budget: "$500.00",
    },
    {
        id: 2,
        title: "IT Infrastruct Upgrade",
        type: "Federal",
        amount: "$500,00",
        department: "Department Of Defense",
        dueDate: "1/16/2025",
        budget: "$500.00",
    },
    {
        id: 3,
        title: "IT Infrastruct Upgrade",
        type: "Federal",
        amount: "$500,00",
        department: "Department Of Defense",
        dueDate: "1/16/2025",
        budget: "$500.00",
    },
    {
        id: 4,
        title: "IT Infrastruct Upgrade",
        type: "Federal",
        amount: "$500,00",
        department: "Department Of Defense",
        dueDate: "1/16/2025",
        budget: "$500.00",
    },
    {
        id: 5,
        title: "IT Infrastruct Upgrade",
        type: "Federal",
        amount: "$500,00",
        department: "Department Of Defense",
        dueDate: "1/16/2025",
        budget: "$500.00",
    },
    {
        id: 6,
        title: "IT Infrastruct Upgrade",
        type: "Federal",
        amount: "$500,00",
        department: "Department Of Defense",
        dueDate: "1/16/2025",
        budget: "$500.00",
    },
];

const Featured = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context

    return (
        <div
            className={`pt-10 sm:pt-16 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-10 ${darkMode ? "bg-black text-white" : "bg-white text-gray-800"
                } transition-colors`}
        >
            <h1
                className={`text-3xl sm:text-4xl md:text-5xl text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
                    } text-transparent bg-clip-text font-bold mb-4 sm:mb-6`}
            >
                Featured Opportunities
            </h1>
            <p
                className={`text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
                    } text-transparent bg-clip-text font-bold text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto`}
            >
                Discover top contract opportunities tailored for you. Explore, apply, and secure the best deals effortlessly.
            </p>

            {/* React Marquee Section */}
            <div className="py-6 sm:py-8 md:py-10 overflow-hidden">
                <Marquee
                    speed={100}
                    pauseOnHover={true}
                    gradient={false}
                    delay={2}
                    className="flex items-center"
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 cursor-pointer pb-20"
                            style={{
                                width: "clamp(300px, 28vw, 450px)", // Responsive width using clamp
                            }}
                        >
                            {/* Custom Card Component */}
                            <div
                                className={`rounded-lg border shadow-xl overflow-hidden h-56 sm:h-60 md:h-64   ${darkMode
                                        ? "bg-zinc-900 border-zinc-800 text-white shadow-gray-500/50"
                                        : "bg-gray-100 border-gray-200 text-gray-800 shadow-gray-300"
                                    } transition-shadow duration-300 hover:shadow-2xl`}
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 pb-2">
                                    {/* Custom Badge */}
                                    <div
                                        className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${darkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {project.type}
                                    </div>
                                    <span className="text-sm sm:text-base md:text-lg font-semibold">
                                        {project.amount}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="p-3 sm:p-4 md:p-5 pt-2 sm:pt-3 space-y-3 sm:space-y-4">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1 sm:mt-2">
                                        {project.title}
                                    </h3>

                                    <div
                                        className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-500"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-xs sm:text-sm md:text-base">
                                                {project.department}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-xs sm:text-sm md:text-base">
                                                Due: {project.dueDate}
                                            </span>
                                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                                            <span className="text-xs sm:text-sm md:text-base">
                                                {project.budget}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default Featured;