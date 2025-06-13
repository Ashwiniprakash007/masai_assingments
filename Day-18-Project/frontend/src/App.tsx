import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Todo from './components/Todo';
import PrivateRoute from './components/PrivateRoute';
import AddTodo from './components/AddTodo';
import EditModal from './components/EditModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open/close state
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: '' });

  // Modal close function
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle input change in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit form
    console.log(formData);
    handleCloseModal();  // Close modal after submission
  };
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-todo"
          element={
            <PrivateRoute>
              <AddTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-todo/:id" 
          element={
          <PrivateRoute>
            <EditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            />
          </PrivateRoute>}

        />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
