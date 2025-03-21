import React, { useState, useEffect } from "react";
import { typeColors, evolutionMap } from "../data/pokemonData";

function PokemonCard({ pokemon }) {
  const [isHovering, setIsHovering] = useState(false);
  const [evolutionData, setEvolutionData] = useState(null);
  const mainType = pokemon.types[0].type.name;
  const cardColor = typeColors[mainType] || "#A8A878";

  useEffect(() => {
    const fetchEvolution = async () => {
      if (evolutionMap[pokemon.name]) {
        const evolutionId = evolutionMap[pokemon.name].id;
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${evolutionId}`
          );
          const data = await response.json();
          setEvolutionData(data);
        } catch (error) {
          console.error(
            `Error al obtener evolución para ${pokemon.name}:`,
            error
          );
        }
      }
    };

    fetchEvolution();
  }, [pokemon.name]);

  return (
    <div
      className="rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 duration-300"
      style={{
        backgroundColor: cardColor,
        position: "relative",
        overflow: "visible",
        paddingTop: "5px",
        marginBottom: "30px",
        marginRight: "10px",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`pokemon-normal-state ${isHovering ? "hidden" : ""}`}>
        <div className="flex p-4 text-white">
          <div className="flex-1">
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            <div className="mt-1 text-sm">
              {pokemon.types.map((type, index) => (
                <span key={index} className="block">
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <img
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          style={{
            width: "120px",
            height: "auto",
            position: "absolute",
            top: "-20px",
            right: "-10px",
            transform: "scale(1.2)",
          }}
        />
      </div>

      <div
        className={`pokemon-hover-state ${isHovering ? "" : "hidden"}`}
        style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
      >
        {evolutionData ? (
          <>
            <div className="flex p-4 text-gray-800">
              <div className="flex-1 ml-auto text-right">
                <h2 className="text-xl font-bold capitalize">Evoluciona a:</h2>
                <h3 className="text-lg font-semibold capitalize">
                  {evolutionData.name}
                </h3>
                <div className="mt-1 text-sm">
                  {evolutionData.types.map((type, index) => (
                    <span key={index} className="block text-right">
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <img
              src={
                evolutionData.sprites.other["official-artwork"].front_default ||
                evolutionData.sprites.front_default
              }
              alt={evolutionData.name}
              style={{
                width: "120px",
                height: "auto",
                position: "absolute",
                top: "-20px",
                left: "-10px",
                transform: "scale(1.2)",
              }}
            />
          </>
        ) : (
          <div className="flex p-4 text-gray-800 justify-center items-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-semibold capitalize">
                Sin evolución
              </h3>
              <p className="text-sm mt-1">Este Pokémon no evoluciona</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
