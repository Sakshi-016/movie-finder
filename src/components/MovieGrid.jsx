import React from 'react';

const MovieGrid = ({ movies, status }) => {
  if (status === 'loading') {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-xl text-red-500">Failed to fetch movies. Please try again.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {movies.map((movie) => (
        <div
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col items-center"
          key={movie.imdbID}
        >
          <img
    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
    alt={movie.Title}
    className="w-full h-64 object-cover"
  />
          <div className="p-4 text-center flex-grow">
    <h3 className="text-lg font-bold">{movie.Title}</h3>
    <p className="text-sm text-gray-400">{movie.Year}</p>
  </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
