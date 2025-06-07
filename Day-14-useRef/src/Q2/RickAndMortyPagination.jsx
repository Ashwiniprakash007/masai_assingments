import React, { useEffect, useRef, useState } from 'react';

function RickAndMortyPagination() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const currentPageRef = useRef(1);
  const charactersPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let allCharacters = [];
        let page = 1;
        let totalPages;

        while (true) {
          const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
          const data = await response.json();
          allCharacters = [...allCharacters, ...data.results];

          if (!totalPages) totalPages = data.info.pages;
          if (page >= totalPages) break;
          page++;
        }

        setCharacters(allCharacters);
        const pages = Math.ceil(allCharacters.length / charactersPerPage);
        setTotalPages(pages);
        setPaginatedCharacters(allCharacters.slice(0, charactersPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const updatePaginatedCharacters = (pageNum) => {
    const startIndex = (pageNum - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    setPaginatedCharacters(characters.slice(startIndex, endIndex));
  };

  const handlePrevious = () => {
    if (currentPageRef.current > 1) {
      currentPageRef.current -= 1;
      updatePaginatedCharacters(currentPageRef.current);
    }
  };

  const handleNext = () => {
    if (currentPageRef.current < totalPages) {
      currentPageRef.current += 1;
      updatePaginatedCharacters(currentPageRef.current);
    }
  };

  if (loading) return <p>Loading characters...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Rick and Morty Characters</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '1rem',
        }}
      >
        {paginatedCharacters.map((char) => (
          <div
            key={char.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
            }}
          >
            <img src={char.image} alt={char.name} style={{ width: '100%', borderRadius: '4px' }} />
            <p>{char.name}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPageRef.current === 1}
          style={{
            marginRight: '10px',
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

        <span>
          Page <strong>{currentPageRef.current}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={handleNext}
          disabled={currentPageRef.current === totalPages}
          style={{
            marginLeft: '10px',
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

export default RickAndMortyPagination;
