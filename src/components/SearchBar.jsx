import React, { useState } from 'react';

const SearchBar = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Movie Finder</h1> */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for movies..."
            className="p-2 rounded-lg text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
