import React, { useReducer } from "react";

const initialState = { isVisible: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible };
    default:
      return state;
  }
};
const Question3 = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px",
      fontFamily: "Arial"
    }}>
      <h1>useReducer  Visibility</h1>
      
      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Toggle Message
      </button>

      {state.isVisible && <h2>Hello Masai!</h2>}
    </div>
  );
}

export default Question3
