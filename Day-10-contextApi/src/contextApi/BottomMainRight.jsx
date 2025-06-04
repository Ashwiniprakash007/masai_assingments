import React from "react";

const BottomMainRight = ({ userName }) => {
  return (
    <div>
      {/* <h4>BottomMainRight Component</h4> */}
      <p>Hello, <strong>{userName || "Guest"}</strong>!</p>
    </div>
  );
};

export default BottomMainRight;
