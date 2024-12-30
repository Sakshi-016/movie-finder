
import React, { useState } from 'react';
import Modal from './Modal';

const MovieGrid = ({ movies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-[#243642]/80 text-[#D3F1DF] rounded-lg overflow-hidden shadow-lg flex flex-col items-center transition-transform transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            onClick={() => handleOpenModal(movie)}
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300?text=No+Image'}
              alt={movie.Title || 'Movie Poster'}
              className="w-full h-96 object-cover"
            />
            <div className="p-4 text-center oldenburg-regular flex-grow">
              <h3 className="text-lg font-bold">{movie.Title || 'Untitled'}</h3>
              <p className="text-sm">{movie.Year || 'Year Unknown'}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} movie={selectedMovie} />
    </div>
  );
};

export default MovieGrid;
