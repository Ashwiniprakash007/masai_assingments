import React from "react";

export default function QuoteButton({ text, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }}
    >
      {text}
    </button>
  );
}
