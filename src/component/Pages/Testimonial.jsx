"use client"

import { useState } from "react"
import { useDarkMood } from "../../context/ThemeContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Testimonial = () => {
    const { darkMode } = useDarkMood()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Sample testimonial data
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            position: "CEO, TechCorp",
            image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png",
            text: "I'm extremely satisfied with this product. After months of looking, the AI-powered features genuinely saved me countless hours of work. And the real-time collaboration feature lets us make smarter decisions. Team collaboration is seamless, and we never miss a deadline thanks to automated notifications. It's a game-changer for our business.",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            position: "Marketing Director, Innovate Inc",
            image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
            text: "This platform has transformed how our marketing team operates. The intuitive interface and powerful analytics have helped us increase our campaign effectiveness by 40%. Customer support is also exceptional.",
        },
        {
            id: 3,
            name: "Michael Chen",
            position: "CTO, FutureTech",
            image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
            text: "As someone who values efficiency, I can confidently say this solution has exceeded all expectations. The integration capabilities are outstanding, and the performance improvements we've seen are remarkable.",
        },
    ]

    const nextTestimonial = () => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setDirection(-1)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    const goToTestimonial = (index) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    // Variants for the testimonial card animation
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.5,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.5,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        }),
    }

    return (
        <div
            className={`pt-10 px-4 sm:px-6 md:px-8 lg:px-10 ${darkMode ? "bg-black text-white" : "bg-white text-gray-800"
                } transition-colors duration-300`}
        >
            <h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r ${darkMode ? "from-white to-gray-500" : "from-black to-gray-100"
                    } text-transparent bg-clip-text font-bold pb-4 sm:pb-6 md:pb-8 lg:pb-10`}
            >
                Testimonial
            </h1>

            {/* Testimonial carousel */}
            <div className="relative max-w-[90%] sm:max-w-[85%] mx-auto pb-16">
                <div className="flex items-center justify-between">
                    {/* Left navigation arrow */}
                    <motion.button
                        onClick={prevTestimonial}
                        className={`absolute left-0 z-10 p-2 py-4 rounded-full cursor-pointer ${darkMode ? "text-white hover:bg-gray-800" : "text-gray-800 hover:bg-gray-200"
                            } focus:outline-none`}
                        aria-label="Previous testimonial"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="flex items-center -space-x-5">
                            <ChevronLeft size={24} className="w-6 h-6 sm:w-8 sm:h-8" />
                            <ChevronLeft size={24} className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                    </motion.button>

                    {/* Testimonial card with AnimatePresence for smooth transitions */}
                    <div className="w-full h-[350px] sm:h-[350px] max-w-5xl mx-auto pb-16 overflow-hidden border border-gray-500 dark:border-gray-400 rounded-xl">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`w-full ${darkMode ? "" : ""} rounded-lg p-4 sm:p-6 md:p-8`}
                            >
                                {/* Profile image with animation */}
                                <motion.div
                                    className="flex justify-center pb-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 cursor-pointer rounded-full overflow-hidden border-2 border-gray-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <img
                                            src={testimonials[currentIndex].image || "/placeholder.svg"}
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full object-cover border-4 rounded-full from-gray-200 to-gray-950  transition-colors duration-300"
                                        />

                                    </motion.div>
                                </motion.div>

                                {/* Testimonial text with animation */}
                                <motion.p
                                    className="text-center text-sm sm:text-base lg:mt-4 lg:px-20 px-10"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    {testimonials[currentIndex].text}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right navigation arrow */}
                    <motion.button
                        onClick={nextTestimonial}
                        className={`absolute right-0 z-10 p-2 py-4 rounded-full cursor-pointer ${darkMode ? "text-white hover:bg-gray-800" : "text-gray-800 hover:bg-gray-200"
                            } focus:outline-none`}
                        aria-label="Next testimonial"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="flex items-center -space-x-5">
                            <ChevronRight size={24} className="w-6 h-6 sm:w-8 sm:h-8" />
                            <ChevronRight size={24} className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                    </motion.button>
                </div>

                {/* Pagination dots with animation */}
                <div className="flex justify-center pt-6 space-x-2">
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? darkMode
                                    ? "bg-white"
                                    : "bg-gray-800"
                                : darkMode
                                    ? "bg-gray-600"
                                    : "bg-gray-300"
                                }`}
                            style={{ width: index === currentIndex ? 16 : 8 }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonial