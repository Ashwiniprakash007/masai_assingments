import React, { useEffect, useState, useRef } from 'react';

function TodosPagination() {
  const [todos, setTodos] = useState([]);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPageRef = useRef(1);
  const todosPerPage = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTodos(data);
        const pages = Math.ceil(data.length / todosPerPage);
        setTotalPages(pages);
        setPaginatedTodos(data.slice(0, todosPerPage));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const updatePaginatedTodos = (pageNum) => {
    const start = (pageNum - 1) * todosPerPage;
    const end = start + todosPerPage;
    setPaginatedTodos(todos.slice(start, end));
  };

  const goToPage = (pageNum) => {
    currentPageRef.current = pageNum;
    updatePaginatedTodos(pageNum);
  };

  const handlePrevious = () => {
    if (currentPageRef.current > 1) {
      goToPage(currentPageRef.current - 1);
    }
  };

  const handleNext = () => {
    if (currentPageRef.current < totalPages) {
      goToPage(currentPageRef.current + 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todos List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {paginatedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #ddd',
              backgroundColor: todo.completed ? '#e0ffe0' : '#fff5f5',
              borderRadius: '4px',
              marginBottom: '8px',
            }}
          >
            <strong>#{todo.id}</strong> {todo.title}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPageRef.current === 1}
          style={{
            margin: '5px',
            padding: '10px 15px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPageRef.current === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPageRef.current === 1 ? 0.5 : 1,
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            style={{
              margin: '5px',
              padding: '10px 15px',
              backgroundColor: currentPageRef.current === num ? '#4caf50' : '#e0e0e0',
              color: currentPageRef.current === num ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPageRef.current === totalPages}
          style={{
            margin: '5px',
            padding: '10px 15px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPageRef.current === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPageRef.current === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodosPagination;
