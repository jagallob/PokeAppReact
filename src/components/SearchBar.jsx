import React from "react";

function SearchBar({ onSearch }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
