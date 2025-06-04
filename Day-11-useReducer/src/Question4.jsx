import React, { useReducer, useState } from "react";

const initialState = {
  email: "",
  password: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}
const Question4 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>User Form with useReducer</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              value={state.email}
              onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
              value={state.password}
              onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "10px 15px", marginRight: "10px" }}>
          Submit
        </button>
        <button type="button" onClick={handleReset} style={{ padding: "10px 15px" }}>
          Reset
        </button>
      </form>

      {!submitted && <div>No details found</div>}

      {submitted && (
        <div>
          <div>User Email: {state.email}</div>
          <div>User Password: {state.password}</div>
        </div>
      )}
    </div>
  );
}

export default Question4
