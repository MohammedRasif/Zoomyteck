import { useDarkMood } from "../../context/ThemeContext"

const Proposals = () => {
  const { darkMode } = useDarkMood()

  return (
    <div className={`w-full py-10 relative transition-colors duration-300 ${darkMode ? "bg-black text-white" : " text-black"}`}>
      {/* Top dashed line */}
      <div className={`absolute top-0 left-0 w-full h-px border-t-2 border-dashed ${darkMode ? "border-gray-600" : "border-gray-300"}`}></div>

      <div className="flex flex-col items-center justify-center space-y-6 px-4">
        <h2 className="md:text-3xl text-xl font-[500] text-center max-w-3xl">
          What Are You Waiting For? Start Finding Contracts and Winning Proposals Today!
        </h2>
        <button className={`font-medium py-3 px-16 rounded-full transition-colors ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}>
          Get Started
        </button>
      </div>

      {/* Bottom dashed line */}
      <div className={`absolute bottom-0 left-0 w-full h-px border-t-2 border-dashed ${darkMode ? "border-gray-600" : "border-gray-300"}`}></div>
    </div>
  )
}

export default Proposals
