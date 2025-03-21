import React from "react";

function Header() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        Pokedex
      </h1>
      <p className="text-white text-sm md:text-base">
        Encuentra información sobre tus Pokémon favoritos
      </p>
    </header>
  );
}

export default Header;
