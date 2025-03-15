import { Building2, Calendar, DollarSign } from "lucide-react"
import Marquee from "react-fast-marquee"
import { useDarkMood } from "../../context/ThemeContext"

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
]

const Featured = () => {
  const { darkMode } = useDarkMood() // Get darkMode state from context

  return (
    <div className={`pt-20 ${darkMode ? "bg-black text-white" : "bg-white text-gray-800"} transition-colors`}>
      <h1
        className={`text-5xl text-center bg-gradient-to-r ${
          darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
        } text-transparent bg-clip-text font-bold`}
      >
        Featured Opportunities
      </h1>
      <p
        className={`text-center bg-gradient-to-r ${
          darkMode ? "from-white to-gray-500" : "from-black to-gray-50"
        } text-transparent bg-clip-text font-bold text-base sm:text-lg md:text-xl mb-10`}
      >
        Discover top contract opportunities tailored for you. Explore, apply, and secure the best deals effortlessly.
      </p>

      {/* react marquee section */}
      <div className="py-10 overflow-hidden">
        <Marquee speed={70} pauseOnHover={true} gradient={false} delay={2}>
          {projects.map((project) => (
            <div key={project.id} className="mx-8" style={{ width: "28vw", minWidth: "380px", maxWidth: "450px" }}>
              {/* Custom Card Component */}
              <div
                className={`rounded-lg border shadow-sm overflow-hidden h-64 ${
                  darkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-gray-100 border-gray-200 text-gray-800"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between p-5 pb-2">
                  {/* Custom Badge */}
                  <div
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      darkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {project.type}
                  </div>
                  <span className="text-lg font-semibold">{project.amount}</span>
                </div>

                {/* Card Content */}
                <div className="p-5 pt-3 space-y-5">
                  <h3 className="text-2xl font-semibold mt-2">{project.title}</h3>

                  <div className={`space-y-4 text-sm ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <span className="text-base">{project.department}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-base">Due: {project.dueDate}</span>
                      <DollarSign className="w-5 h-5 ml-3" />
                      <span className="text-base">{project.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default Featured

