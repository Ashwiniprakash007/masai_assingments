import React from "react";
import BottomMainRight from "./BottomMainRight";

const Main = ({ userName }) => {
  return (
    <div>
      {/* <h2>Main Component</h2> */}
      <BottomMainRight userName={userName} />
    </div>
  );
};

export default Main;
