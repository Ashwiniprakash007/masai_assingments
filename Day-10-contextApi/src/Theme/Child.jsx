import React from 'react'
import { ThemeProvider, useTheme } from "./ThemeContext";

const Child = () => {
   const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};


export default Child
