// src/utils/typeColors.ts
export const typeColor = (type: string) => {
  const map: Record<string, string> = {
    fire: "linear-gradient(135deg,#ff9a76,#ff6b6b)",
    water: "linear-gradient(135deg,#76b9ff,#4ea8ff)",
    grass: "linear-gradient(135deg,#b1f28f,#4caf50)",
    electric: "linear-gradient(135deg,#ffd166,#ffb84d)",
    bug: "linear-gradient(135deg,#cbe86b,#8ac926)",
    normal: "linear-gradient(135deg,#dcdcdc,#b7b7b7)",
    flying: "linear-gradient(135deg,#c7d2fe,#7c9eff)",
    poison: "linear-gradient(135deg,#d29cff,#a56dff)",
    ground: "linear-gradient(135deg,#e5c07b,#c49a6c)",
    rock: "linear-gradient(135deg,#c7c7c7,#8b8b8b)",
    fighting: "linear-gradient(135deg,#f7a072,#f58a4c)",
    psychic: "linear-gradient(135deg,#ff9ac4,#ff6bbd)",
    ice: "linear-gradient(135deg,#bff0ff,#9fe8ff)",
    ghost: "linear-gradient(135deg,#9b9bff,#6d6dff)",
    dragon: "linear-gradient(135deg,#a29bff,#6e7bff)",
    dark: "linear-gradient(135deg,#717171,#3a3a3a)",
    steel: "linear-gradient(135deg,#d7d7d7,#9e9e9e)",
    fairy: "linear-gradient(135deg,#ffd6f0,#ffb3e0)",
  };
  return map[type] ?? "linear-gradient(135deg,#7f8c8d,#6c7a89)";
};
