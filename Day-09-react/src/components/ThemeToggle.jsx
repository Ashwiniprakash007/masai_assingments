import React from "react";

export default function ThemeToggle({ toggleTheme, isDark }) {
  return (
    <button onClick={toggleTheme} className="ml-2">
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
