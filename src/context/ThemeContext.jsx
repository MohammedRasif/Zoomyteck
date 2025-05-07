import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true); // Always start with dark mode

    useEffect(() => {
        // Set localStorage to "dark" on first load
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");

        // Cleanup to ensure consistent state on subsequent renders
        return () => {
            document.documentElement.classList.remove("dark");
        };
    }, []); // Empty dependency array for initial load only

    useEffect(() => {
        // Update classes and localStorage when darkMode changes
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useDarkMood = () => useContext(ThemeContext);