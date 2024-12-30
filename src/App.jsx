// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import HomePage from './components/HomePage';
// import MovieGrid from './components/MovieGrid';
// import SortFilter from './components/SortFilter';  // Import SortFilter component

// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [status, setStatus] = useState('idle');
//   const [page, setPage] = useState(1);  // Track the current page
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [filterDecade, setFilterDecade] = useState('');

//   const popularQueries = ['action', 'comedy', 'drama', 'horror', 'romance', 'thriller', 'adventure', 'animation'];

//   const fetchMovies = async (query, page = 1) => {
//     setStatus('loading');
//     try {
//       const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=ab7585e4`);
//       const data = response.data;

//       if (data.Response === 'True') {
//         setMovies((prevMovies) => [...prevMovies, ...data.Search]);  // Append new movies to existing list
//         setStatus('succeeded');
//       } else {
//         setStatus('failed');
//       }
//     } catch (error) {
//       setStatus('failed');
//       console.error(error);
//     }
//   };

//   const handleSearch = (query) => {
//     setMovies([]);  // Reset movie list on new search
//     setPage(1);  // Reset page count
//     fetchMovies(query, 1);
//   };

//   const handleSortChange = (order) => {
//     setSortOrder(order);
//   };

//   const handleFilterChange = (decade) => {
//     setFilterDecade(decade);
//   };

//   const sortedMovies = [...movies].sort((a, b) => {
//     if (sortOrder === 'asc') {
//       return parseInt(a.Year) - parseInt(b.Year);
//     } else {
//       return parseInt(b.Year) - parseInt(a.Year);
//     }
//   });

//   const filteredMovies = sortedMovies.filter((movie) => {
//     if (filterDecade === '') return true;
//     const year = parseInt(movie.Year);
//     const startYear = parseInt(filterDecade.split('s')[0]);
//     const endYear = startYear + 9;
//     return year >= startYear && year <= endYear;
//   });

//   const loadMoreMovies = useCallback(() => {
//     setPage((prevPage) => {
//       const newPage = prevPage + 1;
//       const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
//       fetchMovies(randomQuery, newPage);
//       return newPage;
//     });
//   }, []);

//   const handleScroll = (event) => {
//     const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
//     if (bottom && status !== 'loading') {
//       loadMoreMovies();
//     }
//   };

//   const handleNextPage = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
//     fetchMovies(randomQuery, nextPage);
//   };

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       const prevPage = page - 1;
//       setPage(prevPage);
//       const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
//       fetchMovies(randomQuery, prevPage);
//     }
//   };

//   useEffect(() => {
//     if (movies.length === 0) {
//       const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
//       fetchMovies(randomQuery, 1);
//     }
//   }, [movies]);

//   return (
//     <div className="min-h-screen bg-[#243642] text-[#D3F1DF]" onScroll={handleScroll}>
//       <HomePage fetchMovies={handleSearch} />
//       <SortFilter onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
//       <div className="container mx-auto px-4 py-6">
//         <MovieGrid movies={filteredMovies} status={status} />
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex justify-center gap-4 py-4">
//         <button
//           onClick={handlePreviousPage}
//           className="bg-[#D3F1DF] text-[#243642] px-4 py-2 rounded disabled:opacity-50"
//           disabled={page === 1}
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNextPage}
//           className="bg-[#D3F1DF] text-[#243642] px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;






import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';  // Import arrow icons
import HomePage from './components/HomePage';
import MovieGrid from './components/MovieGrid';
import SortFilter from './components/SortFilter';  // Import SortFilter component

const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);  // Track the current page
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterDecade, setFilterDecade] = useState('');

  const popularQueries = ['action', 'comedy', 'drama', 'horror', 'romance', 'thriller', 'adventure', 'animation'];

  const fetchMovies = async (query, page = 1) => {
    setStatus('loading');
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=ab7585e4`);
      const data = response.data;

      if (data.Response === 'True') {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);  // Append new movies to existing list
        setStatus('succeeded');
      } else {
        setStatus('failed');
      }
    } catch (error) {
      setStatus('failed');
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    setMovies([]);  // Reset movie list on new search
    setPage(1);  // Reset page count
    fetchMovies(query, 1);
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

  const loadMoreMovies = useCallback(() => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      fetchMovies(randomQuery, newPage);
      return newPage;
    });
  }, []);

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom && status !== 'loading') {
      loadMoreMovies();
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
    fetchMovies(randomQuery, nextPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      fetchMovies(randomQuery, prevPage);
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      fetchMovies(randomQuery, 1);
    }
  }, [movies]);

  return (
    <div className="min-h-screen bg-[#243642] text-[#D3F1DF]" onScroll={handleScroll}>
      <HomePage fetchMovies={handleSearch} />
      <SortFilter onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 py-6">
        <MovieGrid movies={filteredMovies} status={status} />
      </div>

      {/* Pagination Buttons with Icons */}
      <div className="flex justify-center gap-4 py-4">
        <button
          onClick={handlePreviousPage}
          className="bg-[#D3F1DF] text-[#243642] px-4 py-2 rounded disabled:opacity-50"
          disabled={page === 1}
        >
          <FaArrowLeft /> {/* Left Arrow Icon */}
        </button>
        <button
          onClick={handleNextPage}
          className="bg-[#D3F1DF] text-[#243642] px-4 py-2 rounded"
        >
          <FaArrowRight /> {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
};

export default App;
