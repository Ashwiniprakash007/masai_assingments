import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; 

const Navbar: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token bhej diya
        },
      });
  
      if (response.ok) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-md dark:from-gray-800 dark:to-black transition duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold text-white tracking-wide animate-pulse">
          Todo App
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/create-todo"
            className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Add Todo
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-white text-white text-yellow-400 transition-all duration-300"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out font-semibold"
          >
            Logout
          </button>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
