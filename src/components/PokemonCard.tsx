// src/components/PokemonCard.tsx
import React from "react";
import { PokemonFull } from "../services/pokemonService";
import { typeColor } from "../utils/typeColors";

interface Props {
  pokemon: PokemonFull;
  onClick: (p: PokemonFull) => void;
}

export const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
  const mainType = pokemon.types[0]?.type.name ?? "normal";
  return (
    <div
      className="card poke-card text-white"
      style={{ background: typeColor(mainType) }}
      onClick={() => onClick(pokemon)}
    >
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="poke-image mb-3"
        />
        <h6 className="card-title text-capitalize mb-1">{pokemon.name}</h6>
        <div className="d-flex gap-2">
          {pokemon.types.map((t) => (
            <span key={t.slot} className="poke-type" style={{ background: "rgba(255,255,255,0.85)" }}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
