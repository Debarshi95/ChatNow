import React from 'react';

const Searchbar = () => {
  return (
    <div className="px-4 py-3 border-b-2">
      <input
        type="search"
        name="search"
        aria-label="Search.."
        placeholder="Search.."
        className="w-full outline-none font-medium"
      />
    </div>
  );
};

export default Searchbar;
