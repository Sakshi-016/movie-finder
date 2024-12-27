import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5"; // CiSearch icon
import { BiCameraMovie } from "react-icons/bi"; 

const SearchBar = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  return (
    <nav className="bg-[#243642] p-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="relative w-[700px]">

          <BiCameraMovie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
          
          <input
            type="text"
            placeholder="Search for more movies"
            className="p-2 pl-10 pr-12 w-full rounded-3xl text-black outline-none focus:ring-2 focus:ring-[#D3F1DF]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {/* Right Icon: CiSearch */}
          <div
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-14 text-[#243642] bg-[#D3F1DF] p-1 rounded-full cursor-pointer hover:bg-[#243642] hover:text-[#D3F1DF] transition-all duration-300 flex items-center justify-center">

            <IoSearch  className="text-2xl" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
