import React from 'react';

const SortFilterBar = ({ onSort, onFilter }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
          onClick={() => onSort('asc')}
        >
          Sort by Year (Asc)
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => onSort('desc')}
        >
          Sort by Year (Desc)
        </button>
      </div>
      <div>
        <select
          className="px-4 py-2 rounded-lg bg-gray-800 text-white"
          onChange={(e) => onFilter(parseInt(e.target.value, 10))}
        >
          <option value="">Filter by Decade</option>
          <option value="1980">1980s</option>
          <option value="1990">1990s</option>
          <option value="2000">2000s</option>
          <option value="2010">2010s</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilterBar;
