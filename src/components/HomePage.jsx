import React from 'react';
import SearchBar from './SearchBar';

const HomePage = ({ fetchMovies }) => {
  return (
    <div className="min-h-screen">
      <header className="text-centerpy-6">
        <h1 className="text-6xl font-extrabold">Movie Finder</h1>
      </header>
      <SearchBar fetchMovies={fetchMovies} />
    </div>
  );
};

export default HomePage;
