import React from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    title: string;
    description: string;
    dueDate: string;
    status: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, formData, onChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        {/* <div className="bg-white dark:bg-gray-900 text-black dark:text-white"> */}
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-lg dark:bg-gray-900 text-black dark:text-white">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Title"
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Description"
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={onChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default EditModal;
