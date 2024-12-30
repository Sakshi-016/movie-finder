import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5"; // CiSearch icon
import { IoMdClose } from "react-icons/io"; // Close icon
import { BiCameraMovie } from "react-icons/bi"; 

const SearchBar = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false); // Track focus state

  const handleSearch = () => {
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  const handleClear = () => {
    setQuery(''); // Clear the input when the close icon is clicked
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
            onFocus={() => setFocused(true)} // Set focus when the input is focused
            onBlur={() => setFocused(false)} // Set focus to false when input is blurred
          />

          {/* Icons Container */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Close Icon */}
            {query && (
              <IoMdClose
                className="text-gray-400 text-2xl cursor-pointer"
                onClick={handleClear} // Clear input when clicked
              />
            )}
            {/* Search Icon */}
            <div
              onClick={handleSearch}
              className="w-14 text-[#243642] bg-[#D3F1DF] p-1 rounded-full cursor-pointer hover:bg-[#243642] hover:text-[#D3F1DF] transition-all duration-300 flex items-center justify-center">
              <IoSearch className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
