import { useDarkMood } from "../../context/ThemeContext";

const Streamlined = () => {
    const { darkMode } = useDarkMood(); // Get darkMode state from context

    const steps = [
        {
            id: 1,
            title: "Discover Contracts",
            description: "Search And Filter Through Thousands Of Contracts From Multiple Sources In Our Unified Platform",
            position: "right",
        },
        {
            id: 2,
            title: "Generate Proposals",
            description: "Use Our AI To Create Detailed Proposals Based On Contract Requirements And Your Company Profile.",
            position: "left",
        },
        {
            id: 3,
            title: "Analyze Proposal",
            description: "Use Our AI To Analyze And Optimize Your Proposals For Maximum Success",
            position: "right",
        },
        {
            id: 4,
            title: "Submit & Track",
            description: "Submit Your Proposals And Track Progress With Real-Time Updates",
            position: "left",
        },
    ];

    return (
        <div
            id="about"
            className={`pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-4 sm:px-6 md:px-8 lg:px-10 ${darkMode ? "bg-black text-white" : " text-gray-800"
                } transition-colors`}
        >
            <h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-100"
                    } text-transparent bg-clip-text font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10`}
            >
                Streamlined Proposal Creation
            </h1>
            <p
                className={`text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-500"
                    } text-transparent bg-clip-text font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto`}
            >
                Our platform guides you through a simple process to find contracts and create winning proposals.
            </p>

            <div className="p-4 sm:p-6 md:p-8 lg:p-10 relative">
                {/* Vertical Line */}
                <div
                    className={`absolute left-1/2 top-0 bottom-0 w-[1px] ${darkMode ? "bg-white/30" : "bg-gray-300"
                        } transform -translate-x-1/2 hidden md:block`} // Hide on small screens
                />

                <div className="container mx-auto relative">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex flex-col md:flex-row items-center md:items-stretch"
                        >
                            {/* Connection Dot */}
                            <div
                                className={`absolute left-1/2 top-1/2 w-2 sm:w-5 h-3 sm:h-5  ${darkMode ? "bg-white" : "bg-gray-800"
                                    } rounded-full  transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_10px_4px_rgba(255,255,255,0.3)] hidden md:block`} // Hide on small screens
                            />

                            {/* Horizontal Dashed Connection Line */}
                            {index < steps.length - 0 && ( // Line appears between all cards except after the last one
                                <div
                                    className={`absolute fiexd top-1/2  w-[125px]  h-[3px] ${darkMode ? "bg-white/50" : "bg-gray-500"
                                        } border-dashed border-[1px] transform -translate-y-1/2 ${step.position === "left" ? "right-1/2" : "left-1/2"
                                        } hidden md:block`}
                                    style={{ zIndex: 5 }} // Ensure line is above other elements
                                >
                                    {/* Debug: Check if this line renders */}
                                    <span className="text-xs text-red-500 hidden">
                                        Line for step {index} to {index + 1}
                                    </span>
                                </div>
                            )}

                            {/* Card */}
                            <div
                                className={`relative w-full sm:w-[80%] md:w-[32%] rounded-xl inset-0 bg-gradient-to-r ${darkMode
                                    ? "from-white via-gray-900 to-black"
                                    : "from-gray-800/40 via-gray-100 to-white"
                                    } p-[2px] sm:p-[3px] md:p-[4px] ${step.position === "left"
                                        ? "md:mr-auto md:ml-0"
                                        : "md:ml-auto md:mr-0"
                                    } mx-auto order-2 md:order-none`}
                            >
                                <div className="relative group transition-all duration-500">
                                    {/* Glowing border effect */}
                                    <div
                                        className={`absolute -inset-[1px] bg-gradient-to-r ${darkMode
                                            ? "from-white/40 via-white/20 to-white/100"
                                            : "from-gray-800/40 via-gray-800/20 to-gray-100/100"
                                            } rounded-xl blur-[2px] opacity-20 group-hover:opacity-200 group-hover:blur-[10px] transition-all duration-500`}
                                    />
                                    {/* Additional glow layers for more intense effect */}
                                    <div
                                        className={`absolute -inset-[2px] bg-gradient-to-r ${darkMode
                                            ? "from-white/20 via-white/100 to-white/20"
                                            : "from-gray-100/10 via-gray-500/100 to-gray-800/100"
                                            } rounded-xl blur-[4px] opacity-0 group-hover:opacity-200 transition-all duration-500`}
                                    />

                                    {/* Card content */}
                                    <div
                                        className={`relative bg-opacity-80 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 cursor-pointer ${darkMode
                                                ? "bg-gradient-to-b from-zinc-900 to-black border-white/10" // Light at top to black at bottom
                                                : "bg-gradient-to-b from-gray-100 to-white border-gray-200"   // Light at top to black at bottom
                                            }`}
                                    >
                                        <h3
                                            className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-white to-white/90" : "from-gray-800 to-gray-400"
                                                } mb-2 sm:mb-3 md:mb-4`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className={`text-xs sm:text-sm md:text-base lg:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"
                                                } leading-relaxed`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Streamlined;