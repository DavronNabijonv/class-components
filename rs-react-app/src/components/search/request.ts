interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  abilities: {
    ability: { name: string };
    is_hidden: boolean;
  }[];
}

export async function request(query: string): Promise<PokemonResponse> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`);

  if (!response.ok) {
    throw new Error(`Pokemon "${query}" not found`);
  }

  return response.json();
}