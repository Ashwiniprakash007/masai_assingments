// import React, { useState } from "react";
// import Main from "./contextApi/Main";
// import { ThemeProvider, useTheme } from "./Theme/ThemeContext";
// import Child from "./Theme/Child";

// const Content = ({ userName, setUserName }) => {
//   const { theme } = useTheme();

//   return (
//     <div
//       style={{
//         width: "500px",
//         height: "500px",
//         backgroundColor: theme === "light" ? "#fff" : "#222",
//         color: theme === "light" ? "#000" : "#fff",
//         padding: "20px",
//       }}
//     >
//       <Child />
//       <h3>Props Drilling</h3>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//       <Main userName={userName} />
//     </div>
//   );
// };

// const App = () => {
//   const [userName, setUserName] = useState("");

//   return (
//     <ThemeProvider>
//       <Content userName={userName} setUserName={setUserName} />
//     </ThemeProvider>
//   );
// };

// export default App;



import React from "react";
import { AuthProvider } from "./Authentication/AuthContext";
import Navbar from "./Authentication/Navbar";
import Footer from "./Authentication/Footer";
import Home from "./Authentication/Home";

const App = () => {
  return (
    <AuthProvider>
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <Navbar />
        <Home />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
