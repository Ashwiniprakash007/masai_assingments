import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/EditModal";
import Navbar from "./Navbar";


type Todo = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

const Todo: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 6;
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");


  const token = localStorage.getItem("accessToken");

  const fetchTodos = async () => {
    const res = await axios.get(`${apiUrl}/api/todos`, {
        withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`${apiUrl}/api/todos/${id}`, {
        withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  const handleEditClick = (todo: Todo) => {
    setEditId(todo._id);
    setFormData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      status: todo.status,
    });
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setEditId(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${apiUrl}/api/todos/${editId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditModalOpen(false);
      setEditId(null);
      fetchTodos();
    }
  };


  const handleToggleStatus = async (todo: Todo) => {
    const updatedStatus = todo.status === "pending" ? "completed" : "pending";
  
    await axios.put(`${apiUrl}/api/todos/${todo._id}`, {
      ...todo,
      status: updatedStatus,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    fetchTodos(); // Refresh list
  };

  // Pagination Logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const filteredTodos = filter === "all"
  ? todos
  : todos.filter(todo => todo.status === filter);
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  // const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  // const totalPages = Math.ceil(todos.length / todosPerPage);
 
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-4/5 mx-auto my-8 rounded-lg shadow-2xl bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex justify-end mb-4">
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value as "all" | "pending" | "completed")}
    className="px-4 py-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-800 dark:text-white shadow"
  >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="completed">Completed</option>
  </select>
</div>
      <div className="overflow-x-auto p-6">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300 animate-fade-in">
          <thead className="text-xs uppercase bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody
          onDragOver={(e) => e.preventDefault()}
          >
            {currentTodos.map((todo) => (
              <tr
              
               key={todo._id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
               >
                <td className="px-6 py-4">{todo.title}</td>
                <td className="px-6 py-4">{todo.description}</td>
                <td className="px-6 py-4">{new Date(todo.dueDate).toLocaleDateString()}</td>
                <td className={`px-6 py-4 capitalize`}>
                  <span className={`px-2 py-1 rounded-full ${todo.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {todo.status}
                  </span>
                </td>
                <td>
                <button
  onClick={() => handleToggleStatus(todo)}
  className={`px-3 py-1 rounded transition ${
    todo.status === "pending" ? "bg-green-500 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-700"
  } text-white`}
>
  {todo.status === "pending" ? "Mark Done" : "Mark Pending"}
</button>
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="px-3 py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {todos.length > todosPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={handleModalClose}
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Todo;
