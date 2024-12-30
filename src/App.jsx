// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Importing Axios
// import HomePage from './components/HomePage';
// import MovieGrid from './components/MovieGrid';

// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [status, setStatus] = useState('idle');
//   const [initialLoad, setInitialLoad] = useState(true);

//   const fetchMovies = async (query, page = 1, loadAll = false) => {
//     setStatus('loading');
//     try {
//       let allMovies = [];
//       let currentPage = page;
//       let hasMorePages = true;

//       while (hasMorePages) {
//         const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=${currentPage}&apikey=ab7585e4`);
//         const data = response.data;

//         if (data.Response === 'True') {
//           allMovies = [...allMovies, ...data.Search];
//           hasMorePages = data.Search.length > 0 && (!loadAll ? allMovies.length < 20 : true);
//           currentPage++;
//         } else {
//           hasMorePages = false;
//         }
//       }

//       setMovies(allMovies);
//       setStatus('succeeded');
//     } catch (error) {
//       setStatus('failed');
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (initialLoad) {
//       fetchMovies('movie', 1, false);
//       setInitialLoad(false);
//     }
//   }, [initialLoad]);

//   const handleSearch = (query) => {
//     fetchMovies(query, 1, true);
//   };

//   return (
//     <div className="min-h-screen bg-[#243642] text-[#D3F1DF]">
//       <HomePage fetchMovies={handleSearch} />
//       <div className="container mx-auto px-4 py-6">
//         <MovieGrid movies={movies} status={status} />
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing Axios
import HomePage from './components/HomePage';
import MovieGrid from './components/MovieGrid';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [initialLoad, setInitialLoad] = useState(true);

  // List of popular queries for random movie fetching
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

  useEffect(() => {
    if (initialLoad) {
      // Pick a random query from the list
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      fetchMovies(randomQuery, 1, false);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  const handleSearch = (query) => {
    fetchMovies(query, 1, true);
  };

  return (
    <div className="min-h-screen bg-[#243642] text-[#D3F1DF]">
      <HomePage fetchMovies={handleSearch} />
      <div className="container mx-auto px-4 py-6">
        <MovieGrid movies={movies} status={status} />
      </div>
    </div>
  );
};

export default App;
