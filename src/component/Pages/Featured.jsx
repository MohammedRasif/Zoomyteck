import { Building2, Calendar, DollarSign } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useDarkMood } from "../../context/ThemeContext";

// Project data object
const projects = [
   {
    id: 1,
    title: "Cloud Migration Initiative",
    type: "Federal",
    amount: "$750,000",
    department: "Department of Homeland Security",
    dueDate: "2/28/2025",
    budget: "$800,000",
  },
  {
    id: 2,
    title: "Cybersecurity Enhancement",
    type: "State",
    amount: "$1,200,000",
    department: "Department of Transportation",
    dueDate: "3/15/2025",
    budget: "$1,500,000",
  },
  {
    id: 3,
    title: "Data Center Optimization",
    type: "Commercial",
    amount: "$450,000",
    department: "Private Sector IT Services",
    dueDate: "4/10/2025",
    budget: "$500,000",
  },
  {
    id: 4,
    title: "AI-Powered Analytics Platform",
    type: "Federal",
    amount: "$2,000,000",
    department: "Department of Health and Human Services",
    dueDate: "5/20/2025",
    budget: "$2,200,000",
  },
  {
    id: 5,
    title: "Network Infrastructure Upgrade",
    type: "State",
    amount: "$900,000",
    department: "Department of Education",
    dueDate: "6/30/2025",
    budget: "$1,000,000",
  },
  {
    id: 6,
    title: "Smart City IoT Deployment",
    type: "Municipal",
    amount: "$1,500,000",
    department: "City of San Francisco",
    dueDate: "7/15/2025",
    budget: "$1,800,000",
  },
];

const Featured = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context

    return (
        <div
        id="Feature"
            className={`pt-10   ${darkMode ? "bg-black text-white" : " text-gray-800"
                }`}
        >
            <h1
                className={`text-3xl sm:text-4xl md:text-5xl text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
                    } text-transparent bg-clip-text font-bold mb-4 sm:mb-6`}
            >
                Featured Opportunities
            </h1>
            <p
                className={`text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-500"
                    } text-transparent bg-clip-text font-bold text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto`}
            >
                Discover top contract opportunities tailored for you. Explore, apply, and secure the best deals effortlessly.
            </p>

            {/* React Marquee Section */}
            <div className="sm:py-8 md:py-10 overflow-hidden">
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
                            className={`rounded-lg border overflow-hidden h-56 sm:h-60 md:h-64 transition-shadow duration-300 hover:shadow-2xl ${
                                darkMode
                                    ? "bg-gradient-to-b from-zinc-900 to-black border-zinc-800 text-white shadow-gray-500/50"
                                    : "bg-gradient-to-b from-gray-100 to-white border-gray-200 text-gray-800 shadow-gray-300"
                            }`}
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 pb-2">
                                {/* Custom Badge */}
                                <div
                                    className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${
                                        darkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-gray-800"
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
                                    className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${
                                        darkMode ? "text-zinc-400" : "text-gray-500"
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