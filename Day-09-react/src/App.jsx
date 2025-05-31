import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "./components/QuoteCard";
import QuoteButton from "./components/QuoteButton";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [liked, setLiked] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState("20px");

  const lightTheme = {
    background: "#ffffff",
    color: "#222222",
    buttonBg: "#007BFF",
    buttonColor: "#ffffff",
  };

  const darkTheme = {
    background: "#1e1e1e",
    color: "#ffffff",
    buttonBg: "#FF9500",
    buttonColor: "#000000",
  };

  const theme = isDark ? darkTheme : lightTheme;

  const fetchQuote = async () => {
  try {
    const res = await axios.get(
      "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random")
    );

    const data = JSON.parse(res.data.contents);
    setQuote(data[0].q);
    setAuthor(data[0].a);
    setLiked(false);
  } catch (error) {
    console.log("Failed to fetch quote", error);
  }
};

useEffect(() => {
  fetchQuote();
}, []);


  const handleLike = () => {
    if (liked === false) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  const handleFontChange = (e) => {
    setFontSize(e.target.value);
  };

  const toggleTheme = () => {
    if (isDark === false) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  };

  return (
    <div
      className="app-container"
      style={{ backgroundColor: theme.background, color: theme.color }}
    >
      <div className="app-header">
        <h1>React Quote App</h1>
        <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
      </div>

      <QuoteCard
        quote={quote}
        author={author}
        fontSize={fontSize}
        theme={theme}
      />

      <div className="controls">
        <QuoteButton text="New Quote" onClick={fetchQuote} theme={theme} />

        <button className="like-btn" onClick={handleLike}>
          {liked ? "LIKE" : "DISLIKE"}
        </button>

        <select className="font-select" value={fontSize} onChange={handleFontChange}>
          <option value="16px">Small</option>
          <option value="20px">Medium</option>
          <option value="24px">Large</option>
        </select>
      </div>
    </div>
  );
}

export default App;
