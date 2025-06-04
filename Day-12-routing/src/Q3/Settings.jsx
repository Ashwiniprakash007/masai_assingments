import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    alert("User info updated!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Settings Page</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};

export default Settings;
