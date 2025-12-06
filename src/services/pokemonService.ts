// src/services/pokemonService.ts
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonFull {
  id: number;
  name: string;
  sprites: { front_default: string; other?: any };
  types: { slot: number; type: { name: string } }[];
  height: number;
  weight: number;
  stats?: { base_stat: number; stat: { name: string } }[];
}

export const getPokemons = async (limit = 151): Promise<{ results: PokemonListItem[] }> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Error fetching pokemons");
  return res.json();
};

export const getPokemonDetails = async (urlOrName: string): Promise<PokemonFull> => {
  const url = urlOrName.startsWith("http")
    ? urlOrName
    : `https://pokeapi.co/api/v2/pokemon/${urlOrName}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching pokemon details");
  return res.json();
};
