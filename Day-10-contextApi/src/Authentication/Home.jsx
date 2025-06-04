import React from "react";
import { useAuth } from "./AuthContext";

const Home = () => {
   const { isLoggedIn } = useAuth();

  return (
    <div style={{ padding: "20px" , width:"700px"}}>
      <h2>{isLoggedIn ? "You are logged in!" : "Please log in to continue."}</h2>
    </div>
  );
}

export default Home
