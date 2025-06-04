import React from "react";
import { useAuth } from "./AuthContext";

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer style={{ padding: "10px", backgroundColor: "#eee" , width:"700px" }}>
      {isLoggedIn ? "Welcome, User" : "Please log in"}
    </footer>
  );
};

export default Footer;
