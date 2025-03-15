import { NavLink } from "react-router-dom";
import img from "../Image/OBJECTS.png";
import { useDarkMood } from "../../context/ThemeContext";

const Navbar = () => {
  // Use the context instead of local state
  const { darkMode, setDarkMode } = useDarkMood();

  // Toggle dark mode using context
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-white dark:bg-gray-800">
      {/* Logo */}
      <div>
        <img src={img} className="h-16" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-3">
        <NavLink to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
          <h1 className="text-black dark:text-white">Home</h1>
        </NavLink>
        <NavLink to="/about" className="hover:text-gray-700 dark:hover:text-gray-300">
          <h1 className="text-black dark:text-white">About</h1>
        </NavLink>
        <NavLink to="/faq" className="hover:text-gray-700 dark:hover:text-gray-300">
          <h1 className="text-black dark:text-white">FAQ</h1>
        </NavLink>
        <NavLink to="/pricing" className="hover:text-gray-700 dark:hover:text-gray-300">
          <h1 className="text-black dark:text-white">Pricing</h1>
        </NavLink>
      </div>

      {/* Dark Mode Toggle and Auth Buttons */}
      <div className="flex items-center space-x-3">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="h-12 w-12 rounded-lg p-2 transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {/* Moon Icon (Light Mode) */}
          <svg
            className="fill-violet-700 block dark:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          {/* Sun Icon (Dark Mode) */}
          <svg
            className="fill-yellow-500 hidden dark:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* Sign In Button */}
        <NavLink to="/signin">
          <button className="px-5 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white">
            Sign in
          </button>
        </NavLink>

        {/* Sign Up Button */}
        <NavLink to="/signup">
          <button className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-800">
            Sign up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;