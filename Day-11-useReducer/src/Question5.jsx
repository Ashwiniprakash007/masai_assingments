import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: ""
    }
  },
  courses_offered: []
};

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };

    case "establishment_year":
      return { ...state, establishment_year: action.payload };

    case "building":
      return { ...state, address: { ...state.address, building: action.payload } };

    case "street":
      return { ...state, address: { ...state.address, street: action.payload } };

    case "city_name":
      return {
        ...state,
        address: {
          ...state.address,
          city: { ...state.address.city, name: action.payload }
        }
      };

    case "pinCode":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: { ...state.address.city.locality, pinCode: action.payload }
          }
        }
      };

    case "landmark":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: { ...state.address.city.locality, landmark: action.payload }
          }
        }
      };

    case "state":
      return { ...state, address: { ...state.address, state: action.payload } };

    case "latitude":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: { ...state.address.coordinates, latitude: action.payload }
        }
      };

    case "longitude":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: { ...state.address.coordinates, longitude: action.payload }
        }
      };

    case "courses_offered":
      const coursesArray = action.payload
        .split(",")
        .map((course) => course.trim())
        .filter((course) => course.length > 0);
      return { ...state, courses_offered: coursesArray };

    case "reset":
      return initialState;

    default:
      throw new Error("invalid action type");
  }
}
const Question5 = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
    setError(null);
  };

  // Wrapper dispatch with try/catch for error handling
  const safeDispatch = (action) => {
    try {
      dispatch(action);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Add College Form</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <label>
            College Name:{" "}
            <input
              type="text"
              value={state.name}
              onChange={(e) => safeDispatch({ type: "name", payload: e.target.value })}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Establishment Year:{" "}
            <input
              type="number"
              value={state.establishment_year}
              onChange={(e) =>
                safeDispatch({ type: "establishment_year", payload: e.target.value })
              }
              required
            />
          </label>
        </div>

        <fieldset style={{ marginTop: 10 }}>
          <legend>Address Details</legend>

          <div>
            <label>
              Building:{" "}
              <input
                type="text"
                value={state.address.building}
                onChange={(e) => safeDispatch({ type: "building", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              Street:{" "}
              <input
                type="text"
                value={state.address.street}
                onChange={(e) => safeDispatch({ type: "street", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              City Name:{" "}
              <input
                type="text"
                value={state.address.city.name}
                onChange={(e) => safeDispatch({ type: "city_name", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              Pincode:{" "}
              <input
                type="text"
                value={state.address.city.locality.pinCode}
                onChange={(e) => safeDispatch({ type: "pinCode", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              Landmark:{" "}
              <input
                type="text"
                value={state.address.city.locality.landmark}
                onChange={(e) => safeDispatch({ type: "landmark", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              State:{" "}
              <input
                type="text"
                value={state.address.state}
                onChange={(e) => safeDispatch({ type: "state", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              Latitude:{" "}
              <input
                type="text"
                value={state.address.coordinates.latitude}
                onChange={(e) => safeDispatch({ type: "latitude", payload: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              Longitude:{" "}
              <input
                type="text"
                value={state.address.coordinates.longitude}
                onChange={(e) => safeDispatch({ type: "longitude", payload: e.target.value })}
              />
            </label>
          </div>
        </fieldset>

        <div style={{ marginTop: 10 }}>
          <label>
            Courses Offered (comma separated):{" "}
            <input
              type="text"
              value={state.courses_offered.join(", ")}
              onChange={(e) => safeDispatch({ type: "courses_offered", payload: e.target.value })}
            />
          </label>
        </div>

        <div style={{ marginTop: 15 }}>
          <button type="submit" style={{ marginRight: 10 }}>
            Submit
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {error && (
          <div style={{ marginTop: 10, color: "red" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </form>

      {submitted && !error && (
        <div>
          <h3>Submitted College Details</h3>
          <pre
            style={{
              background: "#f0f0f0",
              padding: 10,
              borderRadius: 5,
              whiteSpace: "pre-wrap"
            }}
          >
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Question5
