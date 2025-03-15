import { useDarkMood } from "../../context/ThemeContext";

const Testimonial = () => {
    const { darkMode } = useDarkMood();

    return (
        <div
            className={`pt-10 px-4 sm:px-6 md:px-8 lg:px-10 ${
                darkMode ? "bg-black text-white" : "bg-white text-gray-800"
            } transition-colors duration-300`}
        >
            <h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r ${
                    darkMode ? "from-white to-gray-500" : "from-black to-gray-100"
                } text-transparent bg-clip-text font-bold pb-4 sm:pb-6 md:pb-8 lg:pb-10`}
            >
                Testimonial
            </h1>
            {/* cart */}
            <div>
                
            </div>
        </div>
    );
};

export default Testimonial;