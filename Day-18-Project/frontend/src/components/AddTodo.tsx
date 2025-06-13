import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTodo: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/todos`, formData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to create todo");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
    <div style={{marginTop:"50px"}} className="max-w-xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          required
        />
       <input
  type="date"
  name="dueDate"
  value={formData.dueDate}
  onChange={handleChange}
  className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
  required
/>

<select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
>
  <option value="pending">Pending</option>
  <option value="completed">Completed</option>
</select>

<div className="flex gap-4">
  <button 
    type="submit" 
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Add Todo
  </button>

  <button 
    type="button" 
    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    onClick={() => navigate("/dashboard")}
  >
    Cancel
  </button>
</div>
      </form>
    </div>
    </div>
  );
};

export default AddTodo;
