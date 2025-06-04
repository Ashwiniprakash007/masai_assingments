import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Question2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px",
      fontFamily: "Arial",
    }}>
      <h1>useReducer Counter</h1>
      <h2>Count: {state.count}</h2>
      <div>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          Increment
        </button>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => dispatch({ type: "DECREMENT" })}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Question2
