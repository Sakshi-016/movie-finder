import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';
import MovieGrid from './components/MovieGrid';
import SortFilter from './components/SortFilter';  // Import SortFilter component

const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [initialLoad, setInitialLoad] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterDecade, setFilterDecade] = useState('');

  const popularQueries = ['action', 'comedy', 'drama', 'horror', 'romance', 'thriller', 'adventure', 'animation'];

  const fetchMovies = async (query, page = 1, loadAll = false) => {
    setStatus('loading');
    try {
      let allMovies = [];
      let currentPage = page;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=${currentPage}&apikey=ab7585e4`);
        const data = response.data;

        if (data.Response === 'True') {
          allMovies = [...allMovies, ...data.Search];
          hasMorePages = data.Search.length > 0 && (!loadAll ? allMovies.length < 20 : true);
          currentPage++;
        } else {
          hasMorePages = false;
        }
      }

      setMovies(allMovies);
      setStatus('succeeded');
    } catch (error) {
      setStatus('failed');
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    fetchMovies(query, 1, true);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleFilterChange = (decade) => {
    setFilterDecade(decade);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOrder === 'asc') {
      return parseInt(a.Year) - parseInt(b.Year);
    } else {
      return parseInt(b.Year) - parseInt(a.Year);
    }
  });

  const filteredMovies = sortedMovies.filter((movie) => {
    if (filterDecade === '') return true;
    const year = parseInt(movie.Year);
    const startYear = parseInt(filterDecade.split('s')[0]);
    const endYear = startYear + 9;
    return year >= startYear && year <= endYear;
  });

  useEffect(() => {
    if (initialLoad) {
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      fetchMovies(randomQuery, 1, false);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  return (
    <div className="min-h-screen bg-[#243642] text-[#D3F1DF]">
      <HomePage fetchMovies={handleSearch} />
      <SortFilter onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 py-6">
        <MovieGrid movies={filteredMovies} status={status} />
      </div>
    </div>
  );
};

export default App;
