import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setTimeout(()=>{
      onSearch(e.target.value)
    },1000)
  };

 
  return (
    <div className="flex items-center mb-4 max-w-3xl w-full mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded p-2 w-full"
        placeholder="Search events..."
      />

    </div>
  );
};

export default SearchBar;
