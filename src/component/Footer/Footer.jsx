import { useDarkMood } from "../../context/ThemeContext"

const Footer = () => {
  const { darkMode } = useDarkMood()

  return (
    <footer className={`pt-32 transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Top border */}
      <div className={`h-px w-full ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}></div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <img src="" alt="" />
            <h1 className={`text-4xl font-semibold pb-5  ${darkMode ? "text-white" : "text-black"}`}>Zoomytech</h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Win Government Contracts with AI-Powered Proposals
            </p>
          </div>

          {/* Company links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["Home", "About us", "FAQS", "Pricing"].map((item, index) => (
                <li key={index}>
                  <a href="#" className={`transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              {["Terms & Conditions", "Privacy Policy"].map((item, index) => (
                <li key={index}>
                  <a href="#" className={`transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
            <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Aliquet dignissim erat habitasse aliquet tincidunt phasellus ultrices, aenean sed elit mattis sagittis id
              velit sed scelerisque.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email.."
                className={`bg-transparent border rounded-full px-4 py-2 w-full text-sm focus:outline-none transition-colors ${darkMode ? "border-gray-700 text-white focus:border-gray-500" : "border-gray-400 text-black focus:border-gray-600"}`}
              />
              <button className={`font-medium text-sm px-6 py-2 rounded-full -ml-8 transition-colors ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className={`h-px w-full ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}></div>

      {/* Copyright */}
      <div className="py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm">Copyright © 2023 Tokematic</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
