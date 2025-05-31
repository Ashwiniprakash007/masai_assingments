import React from "react";

export default function QuoteCard({ quote, author, fontSize, theme }) {
  return (
    <div style={{ color: theme.textColor, fontSize: fontSize }} className="p-4 border rounded shadow">
      <p>"{quote}"</p>
      <p className="text-right font-semibold mt-2">- {author}</p>
    </div>
  );
}
