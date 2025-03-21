import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemon, isLoading, error }) {
  if (error) {
    return (
      <div className="col-span-full text-center py-6 text-red-200 text-xl">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="col-span-full text-center py-6 text-white text-xl">
        Cargando Pokémon...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ))}
    </div>
  );
}

export default PokemonList;
