import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonList from "./components/PokemonList";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setIsLoading(true);
      try {
        let allPokemon = [];

        // Cargar Pokémon en lotes para mejorar el rendimiento
        for (let batch = 1; batch <= 151; batch += 20) {
          const promises = [];
          for (let i = batch; i < batch + 20 && i <= 151; i++) {
            promises.push(
              fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) =>
                res.json()
              )
            );
          }

          const pokemonBatch = await Promise.all(promises);
          allPokemon = [...allPokemon, ...pokemonBatch];
        }

        setPokemon(allPokemon);
      } catch (error) {
        console.error("Error al obtener Pokemon:", error);
        setError("Error al cargar los Pokémon. Intenta recargar la página.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredPokemon = pokemon.filter((p) => p.name.includes(searchTerm));

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-red-500 min-h-screen flex flex-col items-center p-4 md:p-8">
      <main className="w-full max-w-6xl">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <PokemonList
          pokemon={filteredPokemon}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
