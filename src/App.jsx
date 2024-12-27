import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage.jsx';
import MovieGrid from './components/MovieGrid.jsx';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Fetch initial movies for the homepage
    const fetchInitialMovies = async () => {
      setStatus('loading');
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=movie&apikey=ab7585e4`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search.slice(0, 12)); // Display 12 movies
          setStatus('succeeded');
        } else {
          setMovies([]);
          setStatus('failed');
        }
      } catch (error) {
        setStatus('failed');
        console.error(error);
      }
    };

    fetchInitialMovies();
  }, []);

  const fetchMovies = async (query) => {
    setStatus('loading');
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=ab7585e4`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setStatus('succeeded');
      } else {
        setMovies([]);
        setStatus('failed');
      }
    } catch (error) {
      setStatus('failed');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#243642] text-[#D3F1DF]">
      <HomePage fetchMovies={fetchMovies} />
      <div className="container mx-auto px-4 py-6">
        <MovieGrid movies={movies} status={status} />
      </div>
    </div>
  );
};

export default App;
