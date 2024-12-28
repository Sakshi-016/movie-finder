import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import MovieGrid from './components/MovieGrid';
import SortFilterBar from './components/SortFilterBar';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterDecade, setFilterDecade] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (query, page = 1) => {
    setStatus('loading');
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=ab7585e4`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]));
        setHasMore(data.Search.length > 0);
        setStatus('succeeded');
      } else {
        setMovies([]);
        setHasMore(false);
        setStatus('failed');
      }
    } catch (error) {
      setStatus('failed');
      console.error(error);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...movies].sort((a, b) =>
      order === 'asc' ? a.Year - b.Year : b.Year - a.Year
    );
    setFilteredMovies(sorted);
  };

  const handleFilter = (decade) => {
    console.log("Filtering by Decade:", decade); // Log the selected decade
    setFilterDecade(decade);
    if (!decade) {
      setFilteredMovies(movies); // If no filter, show all movies
    } else {
      const filtered = movies.filter((movie) => {
        const year = parseInt(movie.Year, 10);
        console.log("Movie Year:", year); // Log the year of each movie
        return year >= decade && year < decade + 10;
      });
      console.log("Filtered Movies:", filtered); // Log filtered results
      setFilteredMovies(filtered); // Apply the filter
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchMovies('movie', currentPage);
  }, [currentPage]);

  useEffect(() => {
    console.log("Fetched Movies:", movies);
    setFilteredMovies(movies); // Ensure the filteredMovies is updated when movies change
  }, [movies]);

  useEffect(() => {
    handleFilter(filterDecade); // Apply the filter when filterDecade changes
  }, [filterDecade]); // Only rerun when filterDecade changes

  return (
    <div className="min-h-screen bg-[#243642] text-[#D3F1DF]">
      <HomePage fetchMovies={fetchMovies} />
      <div className="container mx-auto px-4 py-6">
        <SortFilterBar onSort={handleSort} onFilter={handleFilter} />
        <MovieGrid movies={filteredMovies} status={status} loadMore={loadMore} />
      </div>
    </div>
  );
};

export default App;
