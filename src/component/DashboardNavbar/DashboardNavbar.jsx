import { useDarkMood } from "../../context/ThemeContext";

const DashboardNavbar = () => {
    const { darkMode, setDarkMode } = useDarkMood();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <div className='flex justify-end items-center w-full h-16 '>
            <div className='fixed top-0 w-full left-[calc(100%-160px)] flex items-center '>

                <button
                    onClick={toggleDarkMode}
                    className="h-14 w-14 rounded-lg p-2 transition duration-300 cursor-pointer"
                >
                    <svg
                        className="fill-gray-500 block dark:hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                        className="fill-gray-200 hidden dark:block"
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
                {/* <img
                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
                    className='h-[50px] mb-2 my-2'  // 'mb-2' for bottom margin if needed
                    alt="Logo"
                /> */}
            </div>
        </div>
    );
}

export default DashboardNavbar;
