import React, { useReducer } from 'react'

const initialState = {
  theme: "light"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light"
      };
    default:
      return state;
  }
};

const Question1 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme } = state;

  const appStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme === "light" ? "#f5f5f5" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    transition: "all 0.3s ease"
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "20px",
    cursor: "pointer",
    backgroundColor: theme === "light" ? "#000" : "#fff",
    color: theme === "light" ? "#fff" : "#000",
    border: "none",
    borderRadius: "5px"
  };

  return (
    <div style={appStyle}>
      <h3>Current Theme: {theme.toUpperCase()}</h3>
      <button style={buttonStyle} onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </div>
  );
}

export default Question1
